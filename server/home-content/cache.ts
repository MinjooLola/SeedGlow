import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ZodType } from "zod";
import type { ContentFeed } from "../../shared/homeContent";
import { CategoryMismatchError } from "./sources";
import { PublicSourceError } from "./rows";

export const CACHE_TTL_MS = 60 * 60 * 1000;
const RETRY_MS = 60_000;
export const SOURCE_REFRESH_TIMEOUT_MS = 15_000;
export const CONTENT_RESPONSE_WAIT_MS = 2_000;
export interface PackagedSnapshot {
  kind: string;
  sourceHash: string;
  updatedAt: number;
  items: unknown[];
}
interface Slot<T> {
  items?: T[];
  updatedAt?: number;
  retryAt: number;
  error?: string;
  categories?: string[];
  restored: boolean;
  pending?: Promise<ContentFeed<T>>;
  running?: Promise<void>;
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
    private readonly options: {
      initialSnapshot?: PackagedSnapshot;
      timeoutMs?: number;
      responseWaitMs?: number;
    } = {},
  ) {}

  private key(url: string) { return createHash("sha256").update(url).digest("hex"); }
  private file(key: string) { return path.join(this.directory, `${this.kind}-${key}.json`); }
  private slot(url: string): Slot<T> {
    const key = this.key(url);
    let slot = this.slots.get(key);
    if (!slot) {
      slot = { retryAt: 0, restored: false };
      const saved = this.options.initialSnapshot;
      if (saved?.kind === this.kind && saved.sourceHash === key) this.acceptSaved(slot, saved);
      this.slots.set(key, slot);
    }
    return slot;
  }

  private acceptSaved(slot: Slot<T>, saved: { updatedAt?: unknown; items?: unknown }) {
    const checked = this.itemSchema.array().safeParse(saved.items);
    if (checked.success && typeof saved.updatedAt === "number" && Number.isFinite(saved.updatedAt) &&
        saved.updatedAt >= 0 && (slot.updatedAt === undefined || saved.updatedAt > slot.updatedAt)) {
      slot.items = checked.data;
      slot.updatedAt = saved.updatedAt;
    }
  }

  private async restore(key: string, slot: Slot<T>) {
    if (slot.restored) return;
    slot.restored = true;
    try {
      if ((await stat(this.file(key))).size > 12 * 1024 * 1024) throw new Error("Oversized cache");
      this.acceptSaved(slot, JSON.parse(await readFile(this.file(key), "utf8")));
    } catch { /* Keep the validated packaged snapshot when local storage is absent. */ }
  }

  private snapshot(slot?: Slot<T>): ContentFeed<T> {
    if (slot?.items && slot.updatedAt !== undefined) return {
      items: slot.items, status: slot.error ? "stale" : "ready",
      updatedAt: new Date(slot.updatedAt).toISOString(), message: slot.error, categories: slot.categories,
    };
    return { items: [], status: "unavailable", updatedAt: null, message: slot?.error ?? "데이터를 불러오는 중입니다.", categories: slot?.categories };
  }

  peek(): ContentFeed<T> {
    const url = this.url();
    return url ? this.snapshot(this.slot(url)) :
      { items: [], status: "unconfigured", updatedAt: null, message: "구글 시트 CSV 주소가 아직 설정되지 않았습니다." };
  }

  async get(refresh = false): Promise<ContentFeed<T>> {
    const url = this.url();
    if (!url) return this.peek();
    const key = this.key(url);
    const slot = this.slot(url);
    await this.restore(key, slot);
    if (slot.pending) return slot.pending;
    // The SDK does not support aborting proxy requests. An expired request may
    // still be running: don't start another request on every browser poll.
    if (slot.running) return this.snapshot(slot);
    if (!refresh && slot.restored && ((slot.updatedAt !== undefined && this.now() - slot.updatedAt < CACHE_TTL_MS) || this.now() < slot.retryAt)) return this.snapshot(slot);
    const current = slot;
    current.pending = this.refresh(url, key, current);
    try { return await current.pending; } finally { current.pending = undefined; }
  }

  async getFast(): Promise<ContentFeed<T>> {
    const url = this.url();
    if (!url) return this.peek();
    const slot = this.slot(url);
    await this.restore(this.key(url), slot);
    if (slot.items !== undefined && slot.updatedAt !== undefined) {
      if (this.now() - slot.updatedAt >= CACHE_TTL_MS && !slot.error) {
        slot.error = "새 콘텐츠를 갱신하는 동안 마지막 성공 데이터를 보여드립니다.";
      }
      void this.get();
      return this.snapshot(slot);
    }
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      return await Promise.race([
        this.get(),
        new Promise<ContentFeed<T>>(resolve => {
          timer = setTimeout(() => resolve({
            ...this.snapshot(slot),
            message: slot.error ?? "외부 연결 응답이 지연되고 있습니다. 잠시 후 자동으로 다시 확인합니다.",
          }), this.options.responseWaitMs ?? CONTENT_RESPONSE_WAIT_MS);
        }),
      ]);
    } finally { if (timer) clearTimeout(timer); }
  }

  private async refresh(url: string, key: string, slot: Slot<T>): Promise<ContentFeed<T>> {
    const running = this.load(url, key, slot);
    slot.running = running;
    void running.finally(() => { if (slot.running === running) slot.running = undefined; });
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      await Promise.race([
        running,
        new Promise<void>(resolve => {
          timer = setTimeout(() => {
            slot.error = `외부 연결 응답 시간이 초과되었습니다.${slot.items !== undefined ? " 마지막 성공 데이터를 유지합니다." : ""}`;
            slot.retryAt = this.now() + RETRY_MS;
            console.warn(`[home-content] ${this.kind}: refresh deadline exceeded; keeping last successful content.`);
            resolve();
          }, this.options.timeoutMs ?? SOURCE_REFRESH_TIMEOUT_MS);
        }),
      ]);
    } finally { if (timer) clearTimeout(timer); }
    return this.snapshot(slot);
  }

  private async load(url: string, key: string, slot: Slot<T>): Promise<void> {
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
      console.warn(`[home-content] ${this.kind}: refresh failed; ${reason}`);
    }
  }
}
