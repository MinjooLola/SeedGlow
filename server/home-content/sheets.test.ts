import { strict as assert } from "node:assert";
import { test } from "node:test";
import { isAuthenticatedSheetUrl, loadSheetHistory, loadSheetPartners, loadSheetReviews, type SheetsProxy } from "./sheets";

const url = "https://docs.google.com/spreadsheets/d/example/edit#gid=0";
const json = (data: unknown) => new Response(JSON.stringify(data), { headers: { "content-type": "application/json" } });

test("authenticated reviews request only A:D, preserve strings and ignore FALSE/blank rows", async () => {
  const endpoints: string[] = [];
  const body = ` 긴 문구  그대로\n${"절삭하지 않는 후기 ".repeat(1200)}마지막`;
  const proxy: SheetsProxy = async (endpoint) => {
    endpoints.push(endpoint);
    const query = new URL(endpoint, "https://sheets.googleapis.com");
    if (!endpoint.includes("values:batchGet")) return json({ sheets: [{ properties: { title: "홈_후기", gridProperties: { rowCount: 10 } } }] });
    const ranges = query.searchParams.getAll("ranges");
    assert.equal(ranges.length, 1);
    assert.ok(ranges[0].startsWith("'홈_후기'!A") && ranges[0].includes(":D"));
    assert.equal(query.searchParams.get("valueRenderOption"), "FORMATTED_VALUE");
    if (ranges[0].endsWith("D1")) return json({ valueRanges: [{ values: [["키워드", "후기 본문(게시용)", "표기", "게시"]] }] });
    return json({ valueRanges: [{ values: [
      ["", body, "- 익명 창업가", true],
      ["숨김", "숨긴 본문", "익명", false],
      ["숨김 빈칸", "본문"],
      ["다음 키워드", "다음 후기", "익명", "TRUE"],
    ] }] });
  };
  const items = await loadSheetReviews(url, proxy);
  assert.equal(items.length, 2);
  assert.equal(items[0].body, body);
  assert.equal(items[0].display, "- 익명 창업가");
  assert.deepEqual(Object.keys(items[0]), ["keyword", "body", "display"]);
  assert.equal(endpoints.length, 3);
});

test("partners request A:B and D only, preserve blank exclusion and excluded chips", async () => {
  const proxy: SheetsProxy = async (endpoint) => {
    if (!endpoint.includes("values:batchGet")) return json({ sheets: [{ properties: { title: "홈_협력기관", gridProperties: { rowCount: 10 } } }] });
    const ranges = new URL(endpoint, "https://sheets.googleapis.com").searchParams.getAll("ranges");
    assert.equal(ranges.length, 2);
    assert.ok(/!A\d+:B\d+$/.test(ranges[0]) && /!D\d+:D\d+$/.test(ranges[1]));
    if (ranges[0].endsWith("B1")) return json({ valueRanges: [{ values: [["기관명", "게시"]] }, { values: [["집계제외"]] }] });
    return json({ valueRanges: [
      { values: [["첫 기관", true], ["그외 다수", true], ["빈칸 제외", true], ["숨김", false]] },
      { values: [[false], [true], [], [false]] },
    ] });
  };
  assert.deepEqual(await loadSheetPartners(url, proxy), [
    { name: "첫 기관", excludedFromCount: false },
    { name: "그외 다수", excludedFromCount: true },
    { name: "빈칸 제외", excludedFromCount: null },
  ]);
});

test("wrong header stops before any content-row request and missing target tab is not guessed", async () => {
  let requests = 0;
  const proxy: SheetsProxy = async (endpoint) => {
    requests++;
    if (!endpoint.includes("values:batchGet")) return json({ sheets: [{ properties: { title: "홈_이력", gridProperties: { rowCount: 1000 } } }] });
    return json({ valueRanges: [{ values: [["다른 열", "내용", "구분", "게시"]] }] });
  };
  await assert.rejects(loadSheetHistory(url, proxy), /필수 열/);
  assert.equal(requests, 2);
  await assert.rejects(loadSheetReviews(url, async () => json({ sheets: [{ properties: { title: "다른 탭" } }] })), /홈_후기/);
  assert.ok(isAuthenticatedSheetUrl(url));
  assert.ok(!isAuthenticatedSheetUrl("http://127.0.0.1/spreadsheets/d/example/edit"));
  assert.ok(!isAuthenticatedSheetUrl("https://docs.google.com/spreadsheets/d/e/example/pub?output=csv"));
});
