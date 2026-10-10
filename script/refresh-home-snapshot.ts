import { createHash } from "node:crypto";
import { readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { archiveSchema, historySchema, partnerSchema, reviewSchema, RSS_URL } from "../server/home-content/sources";
import { reviewRow } from "../server/home-content/rows";
import type { PackagedSnapshot } from "../server/home-content/cache";

// Package only already-successful, schema-checked public cache entries.
// Never contact Google/OAuth in the deployment build, or copy private columns.
export async function refreshPackagedSnapshots() {
  const file = path.resolve("server/home-content/last-good.json");
  const previous = JSON.parse(await readFile(file, "utf8"));
  const sources: PackagedSnapshot[] = previous.sources ?? [];
  const specifications = [
    { kind: "history-three-columns", url: process.env.HOME_HISTORY_CSV_URL, schema: historySchema },
    { kind: "reviews", url: process.env.HOME_REVIEWS_CSV_URL, schema: reviewSchema },
    { kind: "partners", url: process.env.HOME_PARTNERS_CSV_URL, schema: partnerSchema },
    { kind: "archive", url: RSS_URL, schema: archiveSchema },
  ];
  for (const { kind, url, schema } of specifications) {
    if (!url) continue;
    const sourceHash = createHash("sha256").update(url).digest("hex");
    const cacheFile = path.resolve(".cache/home-content", `${kind}-${sourceHash}.json`);
    let saved;
    try {
      if ((await stat(cacheFile)).size > 12 * 1024 * 1024) throw new Error("Cache exceeds snapshot limit");
      saved = JSON.parse(await readFile(cacheFile, "utf8"));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") continue;
      throw error;
    }
    const items = schema.array().parse(saved.items);
    if (!Number.isFinite(saved.updatedAt) || saved.updatedAt < 0) throw new Error(`Invalid ${kind} snapshot timestamp`);
    if (kind === "reviews") {
      for (const item of reviewSchema.array().parse(items)) {
        reviewRow([item.keyword, item.body, item.display, "TRUE"]);
      }
    }
    const previousIndex = sources.findIndex(entry => entry.kind === kind && entry.sourceHash === sourceHash);
    if (previousIndex >= 0 && sources[previousIndex].updatedAt >= saved.updatedAt) continue;
    const entry = { kind, sourceHash, updatedAt: saved.updatedAt, items };
    // Keep only one source per feed; changing URLs must not revive an old feed.
    for (let index = sources.length - 1; index >= 0; index--) {
      if (sources[index].kind === kind) sources.splice(index, 1);
    }
    sources.push(entry);
  }
  const result = `${JSON.stringify({ schemaVersion: 1, sources }, null, 2)}\n`;
  if (Buffer.byteLength(result) > 1024 * 1024) throw new Error("Public snapshots are too large to bundle");
  await writeFile(file, result);
  console.log("[home-content] packaged public snapshots:", sources.map(entry => `${entry.kind}=${entry.items.length}`).join(", "));
}
