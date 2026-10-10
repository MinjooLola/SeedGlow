import assert from "node:assert/strict";
import test from "node:test";
import { createHash } from "node:crypto";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { z } from "zod";
import { LastGoodCache, CACHE_TTL_MS, type PackagedSnapshot } from "./cache";
import { createHomeContentService } from "./service";
import type { Fetcher } from "./network";

const url = "https://docs.google.com/spreadsheets/d/e/cache-test/pub?output=csv";
const hash = createHash("sha256").update(url).digest("hex");
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const schema = z.object({ text: z.string() });
const seed = (updatedAt = 100): PackagedSnapshot => ({
  kind: "test", sourceHash: hash, updatedAt, items: [{ text: "실제 마지막 정상 기록" }],
});

test("stuck refresh is bounded, remains single-flight and accepts a late successful response", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "seedglow-stuck-"));
  let calls = 0;
  let clock = 1000;
  let resolve!: (items: { text: string }[]) => void;
  const cache = new LastGoodCache("test", () => url, () => {
    calls++;
    return new Promise(done => { resolve = done; });
  }, schema, directory, () => clock, { timeoutMs: 25, responseWaitMs: 5 });
  try {
    const started = Date.now();
    const [first, concurrent] = await Promise.all([cache.get(), cache.get()]);
    assert.equal(first.status, "unavailable");
    assert.match(first.message!, /응답 시간이 초과/);
    assert.deepEqual(first, concurrent);
    assert.ok(Date.now() - started < 500);
    clock += 120_000;
    await cache.get();
    await cache.getFast();
    assert.equal(calls, 1, "A still-active SDK call must not be duplicated after timeout");
    resolve([{ text: "늦게 도착한 정상 기록" }]);
    await wait(20);
    assert.equal(cache.peek().status, "ready");
    assert.equal(cache.peek().items[0].text, "늦게 도착한 정상 기록");
  } finally { await rm(directory, { recursive: true, force: true }); }
});

test("cold server returns packaged last-good immediately during a stall, and empty success replaces it", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "seedglow-seeded-"));
  let resolve!: (items: { text: string }[]) => void;
  const cache = new LastGoodCache("test", () => url,
    () => new Promise(done => { resolve = done; }), schema, directory,
    () => CACHE_TTL_MS + 1000, { initialSnapshot: seed(), timeoutMs: 25 });
  try {
    assert.equal(cache.peek().items.length, 1);
    const fast = await cache.getFast();
    assert.equal(fast.status, "stale");
    assert.equal(fast.items[0].text, "실제 마지막 정상 기록");
    await wait(35);
    assert.match(cache.peek().message!, /응답 시간이 초과/);
    resolve([]);
    await wait(20);
    assert.equal(cache.peek().status, "ready");
    assert.deepEqual(cache.peek().items, [], "Unpublishing all rows must not restore old content");
  } finally { await rm(directory, { recursive: true, force: true }); }
});

test("newest valid success wins; wrong-source seeds never appear", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "seedglow-restore-"));
  const cacheFile = path.join(directory, `test-${hash}.json`);
  try {
    await mkdir(directory, { recursive: true });
    await writeFile(cacheFile, JSON.stringify({ updatedAt: 50, items: [{ text: "오래된 디스크" }] }));
    const make = (initialSnapshot = seed()) => new LastGoodCache(
      "test", () => url, async () => [], schema, directory, () => 1000, { initialSnapshot });
    assert.equal((await make().getFast()).items[0].text, "실제 마지막 정상 기록");
    await writeFile(cacheFile, JSON.stringify({ updatedAt: 200, items: [] }));
    assert.deepEqual((await make().getFast()).items, []);
    await rm(cacheFile);
    const wrong = make({ ...seed(), sourceHash: "different-sheet" });
    assert.equal(wrong.peek().updatedAt, null);
  } finally { await rm(directory, { recursive: true, force: true }); }
});

test("one stalled source does not block healthy feeds or the content response", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "seedglow-partial-"));
  const sources = (kind: string) => `${url}&gid=${kind}`;
  const service = createHomeContentService({
    directory, url: sources, loadTimeoutMs: 40, responseWaitMs: 10,
    historicalArchive: async () => [],
    fetcher: (async target => {
      const request = String(target);
      if (request.includes("gid=history")) return new Promise<Response>(() => {});
      if (request.includes("gid=reviews")) return new Response("키워드,후기 본문(게시용),표기,게시\n도움,후기 원문,익명,TRUE");
      if (request.includes("gid=partners")) return new Response("기관명,게시,구분,집계제외\n기관,TRUE,,FALSE");
      return new Response(`<rss><channel><item><title>기록</title><category>SeedGlow</category>
        <link>https://blog.naver.com/minjoo_lola/123</link>
        <pubDate>Tue, 29 Sep 2026 23:49:41 +0900</pubDate>
        <description>공개 기록</description></item></channel></rss>`,
        { headers: { "content-type": "application/xml" } });
    }) as Fetcher,
  });
  try {
    const start = Date.now();
    const response = await service.getFast();
    assert.ok(Date.now() - start < 500);
    assert.equal(response.reviews.status, "ready");
    assert.equal(response.reviews.items[0].body, "후기 원문");
    assert.equal(response.partners.status, "ready");
    assert.equal(response.archive.status, "ready");
    assert.equal(response.history.status, "unavailable");
    await wait(45);
    assert.match((await service.getFast()).history.message!, /응답 시간이 초과/);
  } finally {
    await wait(60);
    await rm(directory, { recursive: true, force: true, maxRetries: 3, retryDelay: 10 });
  }
});
