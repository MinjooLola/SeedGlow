import { strict as assert } from "node:assert";
import { test } from "node:test";
import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createHomeContentService } from "./service";
import { CACHE_TTL_MS } from "./cache";
import { loadArchive, loadHistory, loadPartners, loadReviews, CategoryMismatchError } from "./sources";
import { ProjectedCsvParser } from "./csv";
import { contentFallbackHtml } from "./html";
import type { Fetcher } from "./network";

const cell = (value: string) => `"${value.replaceAll('"', '""')}"`;
const csv = (rows: string[][]) => rows.map((row) => row.map(cell).join(",")).join("\r\n");
const csvUrl = (kind: string) => `https://docs.google.com/spreadsheets/d/e/example/pub?output=csv&gid=${kind}`;
const rss = (category = "SeedGlow") => `<?xml version="1.0"?>
<rss version="2.0"><channel><item><title><![CDATA[첫 글 & 내용]]></title>
<category><![CDATA[${category}]]></category><pubDate>Tue, 29 Sep 2026 23:49:41 +0900</pubDate>
<link>https://blog.naver.com/minjoo_lola/123</link>
<description><![CDATA[<p>RSS_BODY_PRIVATE_MARKER</p><img src="https://blogfiles.pstatic.net/example/image.jpg">]]></description>
</item><item><title>다른 글</title><category>Work</category>
<link>https://blog.naver.com/minjoo_lola/124</link><pubDate>Mon, 28 Sep 2026 10:00:00 +0900</pubDate>
<description>ANOTHER_BODY_MARKER</description></item></channel></rss>`;
const textFetcher = (text: string, type = "text/csv") => (async () =>
  new Response(text, { headers: { "content-type": type } })) as Fetcher;

test("projected CSV preserves quotes, spaces and embedded newlines without capturing omitted columns", () => {
  const rows: string[][] = [];
  const parser = new ProjectedCsvParser(new Set([0, 1, 3]), (row) => rows.push(row));
  const source = csv([[" 첫째 ", '줄1\n줄2, "인용"', "IGNORED_METADATA_MARKER\nmore", "TRUE"]]);
  for (let index = 0; index < source.length; index += 3) parser.push(source.slice(index, index + 3));
  parser.end();
  assert.equal(rows[0][0], " 첫째 ");
  assert.equal(rows[0][1], '줄1\n줄2, "인용"');
  assert.equal(rows[0][2], undefined);
  assert.equal(rows[0][3], "TRUE");
  assert.ok(!JSON.stringify(rows).includes("IGNORED_METADATA_MARKER"));
});

test("history uses only TRUE rows in exact source order and wording", async () => {
  const rows = await loadHistory(csvUrl("history"), textFetcher(csv([
    ["기간", "내용", "구분", "게시"],
    ["2026.04-12", "  첫 번째  활동\n둘째 줄", "강의", "TRUE"],
    ["2026.03", "숨김", "심사", "FALSE"],
    ["2026.02", "숨김 빈칸", "강의", ""],
    ["2025.08-10", "다음 활동", "컨설팅", "TRUE"],
  ])));
  assert.deepEqual(rows, [
    { period: "2026.04-12", text: "  첫 번째  활동\n둘째 줄", category: "강의" },
    { period: "2025.08-10", text: "다음 활동", category: "컨설팅" },
  ]);
});

test("reviews contain exactly three public fields; ignored metadata and hidden rows never reach results", async () => {
  const body = ` 앞 공백  유지\n${"긴 후기 ".repeat(1500)}마지막 문장 `;
  const rows = await loadReviews(csvUrl("reviews"), textFetcher(csv([
    ["키워드", "후기 본문(게시용)", "표기", "게시", "날짜", "도움된 점(원문)", "한줄평(원문)", "원본행", "메모"],
    ["", body, "익명 창업가", "TRUE", "DATE_MARKER", "PRIVATE_ORIGINAL_MARKER", "PRIVATE_SUMMARY_MARKER", "ROW_MARKER", "NOTE_MARKER"],
    ["숨김", "HIDDEN_REVIEW_MARKER", "숨김", "FALSE", "", "", "", "", ""],
    ["둘째", "두 번째 후기", "익명", "TRUE", "", "", "", "", ""],
  ])));
  assert.equal(rows[0].body, body);
  assert.equal(rows[0].keyword, "");
  assert.deepEqual(Object.keys(rows[0]), ["keyword", "body", "display"]);
  const serialized = JSON.stringify(rows);
  for (const marker of ["DATE_MARKER", "PRIVATE_ORIGINAL_MARKER", "PRIVATE_SUMMARY_MARKER", "ROW_MARKER", "NOTE_MARKER", "HIDDEN_REVIEW_MARKER"]) {
    assert.ok(!serialized.includes(marker));
  }
  assert.equal(rows[1].body, "두 번째 후기");
});

test("unsafe public contact text is rejected rather than rewritten or published", async () => {
  const address = ["PRIVATE_CONTACT", "example.invalid"].join("@");
  await assert.rejects(loadReviews(csvUrl("reviews"), textFetcher(csv([
    ["키워드", "후기 본문(게시용)", "표기", "게시"],
    ["", address, "익명", "TRUE"],
  ]))), /익명화/);
});

test("partner chips preserve source order and publish filter with explicit count exclusions", async () => {
  const rows = await loadPartners(csvUrl("partners"), textFetcher(csv([
    ["기관명", "게시", "구분", "집계제외", "메모"],
    [" 첫 기관 ", "TRUE", "IGNORE_TYPE", "FALSE", "IGNORE_NOTE"],
    ["그외 다수", "TRUE", "", "TRUE", ""],
    ["숨김", "FALSE", "", "FALSE", ""],
    ["제외 설정 빈칸", "TRUE", "", "", ""],
  ])));
  assert.deepEqual(rows, [
    { name: " 첫 기관 ", excludedFromCount: false },
    { name: "그외 다수", excludedFromCount: true },
    { name: "제외 설정 빈칸", excludedFromCount: null },
  ]);
  assert.equal(rows.filter((row) => row.excludedFromCount === false).length, 1);
  assert.ok(!JSON.stringify(rows).includes("IGNORE"));
});

test("RSS filters case-insensitively, keeps metadata only and refuses arbitrary alternative categories", async () => {
  const items = await loadArchive(undefined, textFetcher(rss("sEeDgLoW"), "application/xml"));
  assert.equal(items.length, 1);
  assert.equal(items[0].title, "첫 글 & 내용");
  assert.deepEqual(Object.keys(items[0]), ["title", "date", "imageUrl", "url"]);
  assert.ok(!JSON.stringify(items).includes("PRIVATE_MARKER"));
  await assert.rejects(loadArchive(undefined, textFetcher(rss("Book"), "application/xml")), (error) => {
    assert.ok(error instanceof CategoryMismatchError);
    assert.deepEqual(error.categories, ["Book", "Work"]);
    return true;
  });
});

test("archive keeps previously seen records when they leave the latest RSS window", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "seedglow-archive-retention-"));
  let newest = "123";
  const fetcher = (async () => new Response(rss().replace("/minjoo_lola/123", `/minjoo_lola/${newest}`))) as Fetcher;
  try {
    const service = createHomeContentService({
      url: () => undefined, directory, fetcher, historicalArchive: async () => [],
    });
    assert.equal((await service.get()).archive.items.length, 1);
    newest = "125";
    const updated = (await service.get(true)).archive.items;
    assert.deepEqual(updated.map((item) => new URL(item.url).pathname), ["/minjoo_lola/125", "/minjoo_lola/123"]);
  } finally { await rm(directory, { recursive: true, force: true }); }
});

test("one-hour cache, counters, FALSE updates, outage fallback, disk restore, and privacy", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "seedglow-test-cache-"));
  let clock = 1_700_000_000_000;
  let publishedHistoryRows = 72;
  let failing = false;
  const calls: Record<string, number> = {};
  const fetcher = (async (input: URL | RequestInfo) => {
    const url = new URL(input instanceof Request ? input.url : String(input));
    const kind = url.hostname === "rss.blog.naver.com" ? "archive" : url.searchParams.get("gid")!;
    calls[kind] = (calls[kind] ?? 0) + 1;
    if (failing) throw new Error("Fixture upstream failure");
    if (kind === "archive") return new Response(rss(), { headers: { "content-type": "application/xml" } });
    if (kind === "history") return new Response(csv([
      ["기간", "내용", "구분", "게시"],
      ...Array.from({ length: 72 }, (_, index) => ["2026.04-12", `활동 ${index}`, "강의", index < publishedHistoryRows ? "TRUE" : "FALSE"]),
    ]));
    if (kind === "partners") return new Response(csv([
      ["기관명", "게시", "구분", "집계제외", "메모"],
      ...Array.from({ length: 62 }, (_, index) => [`기관 ${index}`, "TRUE", "PRIVATE_CATEGORY_MARKER", "FALSE", "PRIVATE_NOTE_MARKER"]),
      ["그외 다수", "TRUE", "", "TRUE", ""], ["비공개 기관", "FALSE", "", "FALSE", ""],
    ]));
    return new Response(csv([
      ["키워드", "후기 본문(게시용)", "표기", "게시", "날짜", "도움된 점(원문)", "한줄평(원문)", "원본행", "메모"],
      ["좋은 점", "후기 전문\n공백  유지", "익명", "TRUE", "PRIVATE_DATE_MARKER", "PRIVATE_RAW_MARKER", "PRIVATE_LINE_MARKER", "PRIVATE_ROW_MARKER", "PRIVATE_NOTE_MARKER"],
    ]));
  }) as Fetcher;
  const options = { url: (kind: string) => csvUrl(kind), directory, fetcher, now: () => clock, historicalArchive: async () => [] };
  try {
    const service = createHomeContentService(options);
    const first = await service.get();
    assert.equal(first.stats.historyCount, 72);
    assert.equal(first.stats.historyRounded, 70);
    assert.equal(first.partners.items.length, 63);
    assert.equal(first.stats.partnersCount, 62);
    assert.equal(first.stats.partnersRounded, 60);
    assert.ok(first.archive.items[0].imageUrl?.startsWith("/api/archive-image?post="));
    const fallback = contentFallbackHtml(first);
    assert.ok(fallback.includes("누적 72건"));
    assert.ok(fallback.includes("60+ 협력기관과 함께합니다"));
    assert.ok(!fallback.includes("PRIVATE"));

    publishedHistoryRows = 71;
    await service.get();
    assert.equal(calls.history, 1);
    assert.equal(service.peek().stats.historyCount, 72);
    clock += CACHE_TTL_MS + 1;
    const changed = await service.get();
    assert.equal(changed.stats.historyCount, 71);
    assert.equal(changed.history.items.length, 71);
    assert.ok(!changed.history.items.some((item) => item.text === "활동 71"));
    clock += CACHE_TTL_MS + 1;
    failing = true;
    const stale = await service.get();
    assert.equal(stale.history.status, "stale");
    assert.equal(stale.stats.historyCount, 71);
    const failedCalls = calls.history;
    await service.get();
    assert.equal(calls.history, failedCalls);

    const restored = await createHomeContentService(options).get();
    assert.equal(restored.history.status, "stale");
    assert.equal(restored.stats.historyCount, 71);
    for (const file of await readdir(directory)) {
      const stored = await readFile(path.join(directory, file), "utf8");
      assert.ok(!stored.includes("PRIVATE") && !stored.includes("RSS_BODY") && !stored.includes("ANOTHER_BODY"));
    }
    const unconfigured = await createHomeContentService({ ...options, url: () => undefined }).get();
    assert.equal(unconfigured.history.status, "unconfigured");
    assert.equal(unconfigured.stats.historyCount, null);
    assert.equal(unconfigured.stats.partnersCount, null);
  } finally { await rm(directory, { recursive: true, force: true }); }
});

test("requests cannot be redirected to a private or unrelated host", async () => {
  const redirecting = (async () => new Response(null, { status: 302, headers: { location: "http://127.0.0.1/private" } })) as Fetcher;
  await assert.rejects(loadHistory(csvUrl("history"), redirecting), /허용되지 않은/);
});
