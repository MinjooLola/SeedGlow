import { strict as assert } from "node:assert";
import { test } from "node:test";
import { historicalArchiveIds, historicalMetadata, loadHistoricalArchive, mergeArchive } from "./archive-history";
import { fetchSource, type Fetcher } from "./network";
import { presentationGroups, groupHistory } from "../../client/src/data/historyPresentation";

const blogHtml = `<meta property="og:title" content="원문 &amp; 제목">
<meta content="https://blogthumb.pstatic.net/actual.png" property="og:image">
<p class="blog_date"><span class="txt">2022. 9. 26. 0:13</span></p>
<div>PRIVATE_ARTICLE_BODY_DO_NOT_CACHE</div>`;

test("historical archive metadata keeps actual title, date and photo, never bodies", () => {
  const item = historicalMetadata(blogHtml, "222884164080", "이전 제목");
  assert.equal(item.title, "원문 & 제목");
  assert.equal(item.date, "2022-09-26T00:13:00+09:00");
  assert.equal(item.imageUrl, "https://blogthumb.pstatic.net/actual.png");
  assert.ok(!JSON.stringify(item).includes("PRIVATE_ARTICLE"));
  assert.equal(historicalMetadata('<meta property="og:image" content="https://example.com/private.png">', "123", "기존 제목").imageUrl, null);
});

test("all previously linked historical posts are fetched with bounded concurrency and deduplicated", async () => {
  let active = 0;
  let maximum = 0;
  const urls: string[] = [];
  const fetcher = (async (input: URL | RequestInfo) => {
    active++;
    maximum = Math.max(maximum, active);
    urls.push(String(input));
    await new Promise((resolve) => setTimeout(resolve, 1));
    active--;
    return new Response(blogHtml);
  }) as Fetcher;
  const historical = await loadHistoricalArchive(fetcher);
  assert.equal(historical.length, historicalArchiveIds.length);
  assert.ok(maximum <= 4);
  assert.ok(urls.every((url) => /^https:\/\/m\.blog\.naver\.com\/minjoo_lola\/\d+$/.test(url)));
  const recent = { ...historical[0], title: "최신 RSS 제목", url: `https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=${historicalArchiveIds[0]}` };
  const merged = mergeArchive([recent], historical);
  assert.equal(merged.length, historical.length);
  assert.equal(merged[0].title, "최신 RSS 제목");
  await assert.rejects(fetchSource("https://m.blog.naver.com/another_owner/123", "blog", fetcher), /허용되지/);
});

test("old history presentation preserves known groups and does not guess unknown activities", () => {
  const item = { period: "2026.06", text: "SK하이닉스 하이로컬이천 로컬 기업 투자 사례 및 LIPS 전략", category: "강의" };
  assert.deepEqual(presentationGroups(item), ["강의"]);
  assert.deepEqual(presentationGroups({ ...item, text: "새로운 미분류 항목", category: "강의·컨설팅·심사" }), []);
  const groups = groupHistory([item, { ...item, text: "컨설팅 사례", category: "컨설팅" }, item]);
  assert.deepEqual(groups[0].items.map((record) => record.index), [0, 2]);
  assert.equal(groups[1].label, "컨설팅");
});
