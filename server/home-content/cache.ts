import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ZodType } from "zod";
import type { ContentFeed } from "../../shared/homeContent";
import { CategoryMismatchError } from "./sources";
import { PublicSourceError } from "./rows";

export const CACHE_TTL_MS = 60 * 60 * 1000;
const RETRY_MS = 60_000;
interface Slot<T> {
  items?: T[];
  updatedAt?: number;
  retryAt: number;
  error?: string;
  categories?: string[];
  restored: boolean;
  pending?: Promise<ContentFeed<T>>;
}

export class LastGoodCache<T> {
  private slots = new Map<string, Slot<T>>();
  constructor(
    private readonly kind: string,
    private readonly url: () => string | undefined,
    private readonly loader: (url: string) => Promise<T[]>,
    private readonly itemSchema: ZodType<T>,
    private readonly directory: string,
    private readonly now = Date.now,
  ) {}

  private key(url: string) { return createHash("sha256").update(url).digest("hex"); }
  private file(key: string) { return path.join(this.directory, `${this.kind}-${key}.json`); }
  private snapshot(slot?: Slot<T>): ContentFeed<T> {
    if (slot?.items && slot.updatedAt !== undefined) return {
      items: slot.items, status: slot.error ? "stale" : "ready",
      updatedAt: new Date(slot.updatedAt).toISOString(), message: slot.error, categories: slot.categories,
    };
    return { items: [], status: "unavailable", updatedAt: null, message: slot?.error ?? "데이터를 불러오는 중입니다.", categories: slot?.categories };
  }

  peek(): ContentFeed<T> {
    const url = this.url();
    return url ? this.snapshot(this.slots.get(this.key(url))) :
      { items: [], status: "unconfigured", updatedAt: null, message: "구글 시트 CSV 주소가 아직 설정되지 않았습니다." };
  }

  async get(refresh = false): Promise<ContentFeed<T>> {
    const url = this.url();
    if (!url) return this.peek();
    const key = this.key(url);
    let slot = this.slots.get(key);
    if (!slot) {
      slot = { retryAt: 0, restored: false };
      this.slots.set(key, slot);
    }
    if (slot.pending) return slot.pending;
    if (!refresh && slot.restored && ((slot.updatedAt !== undefined && this.now() - slot.updatedAt < CACHE_TTL_MS) || this.now() < slot.retryAt)) return this.snapshot(slot);
    const current = slot;
    current.pending = this.refresh(url, key, current, refresh);
    try { return await current.pending; } finally { current.pending = undefined; }
  }

  private async refresh(url: string, key: string, slot: Slot<T>, refresh: boolean): Promise<ContentFeed<T>> {
    if (!slot.restored) {
      slot.restored = true;
      try {
        if ((await stat(this.file(key))).size > 12 * 1024 * 1024) throw new Error("Oversized cache");
        const saved = JSON.parse(await readFile(this.file(key), "utf8"));
        const checked = this.itemSchema.array().safeParse(saved.items);
        if (checked.success && typeof saved.updatedAt === "number" && Number.isFinite(saved.updatedAt)) {
          slot.items = checked.data;
          slot.updatedAt = saved.updatedAt;
        }
      } catch { /* A missing or invalid cache does not replace live source data. */ }
      if (!refresh && slot.updatedAt !== undefined && this.now() - slot.updatedAt < CACHE_TTL_MS) return this.snapshot(slot);
    }
    try {
      const items = this.itemSchema.array().parse(await this.loader(url));
      slot.items = items;
      slot.updatedAt = this.now();
      slot.retryAt = 0;
      slot.error = undefined;
      slot.categories = undefined;
      try {
        await mkdir(this.directory, { recursive: true });
        const temporary = `${this.file(key)}.${randomUUID()}.tmp`;
        await writeFile(temporary, JSON.stringify({ updatedAt: slot.updatedAt, items }), { mode: 0o600 });
        await rename(temporary, this.file(key));
      } catch {
        console.warn(`[home-content] ${this.kind}: disk cache unavailable; last successful data remains in memory.`);
      }
    } catch (error) {
      const reason = error instanceof CategoryMismatchError || error instanceof PublicSourceError ? error.message : "외부 데이터를 갱신하지 못했습니다.";
      slot.error = slot.items ? `${reason} 마지막 성공 데이터를 유지합니다.` : reason;
      slot.categories = error instanceof CategoryMismatchError ? error.categories : undefined;
      slot.retryAt = this.now() + RETRY_MS;
    }
    return this.snapshot(slot);
  }
}
