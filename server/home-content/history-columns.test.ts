import { test } from "node:test";
import assert from "node:assert/strict";
import { historyColumnRow } from "./rows";
import { loadSheetHistoryColumns, type SheetsProxy } from "./sheets";

test("three-column view uses explicit columns, removes dates only and ignores sheet totals", () => {
  assert.deepEqual(historyColumnRow(["29건", "23건", "19건"]), []);
  assert.deepEqual(historyColumnRow([
    "강의  원문  [2026.09~12]", "2026 임팩트 컨설팅 [2026.10]", "심사 [2026.04-12]",
  ]), [
    { text: "강의  원문", category: "강의", period: "" },
    { text: "2026 임팩트 컨설팅", category: "컨설팅", period: "" },
    { text: "심사", category: "심사", period: "" },
  ]);
  assert.deepEqual(historyColumnRow(["강의 [교육 과정]", "", ""]), [
    { text: "강의 [교육 과정]", category: "강의", period: "" },
  ]);
});

test("authenticated history view reads only A:C and preserves each column's row order", async () => {
  const requests: string[] = [];
  const json = (value: unknown) => new Response(JSON.stringify(value), { status: 200 });
  const proxy: SheetsProxy = async (endpoint) => {
    requests.push(endpoint);
    if (!endpoint.includes("/values:")) return json({
      sheets: [{ properties: { title: "이력_3열보기", gridProperties: { rowCount: 120 } } }],
    });
    const ranges = new URL(`https://sheets.googleapis.com${endpoint}`).searchParams.getAll("ranges");
    assert.equal(ranges.length, 1);
    assert.match(ranges[0], /^'이력_3열보기'!A\d+:C\d+$/);
    if (ranges[0].endsWith("A1:C1")) return json({ valueRanges: [{ values: [["강의", "컨설팅", "심사"]] }] });
    return json({ valueRanges: [{ values: [
      ["2건", "1건", "1건"],
      ["첫 강의 [2026.10]", "컨설팅 원문 [2026.10]", "심사 원문 [2026.08~09]"],
      ["다음 강의 [2026.09]"],
    ] }] });
  };
  const result = await loadSheetHistoryColumns("https://docs.google.com/spreadsheets/d/example/edit", proxy);
  assert.equal(requests.length, 3);
  assert.deepEqual(result.filter(item => item.category === "강의").map(item => item.text), ["첫 강의", "다음 강의"]);
  assert.deepEqual(result.map(item => item.category), ["강의", "컨설팅", "심사", "강의"]);
  assert.ok(result.every(item => item.period === ""));
});

test("a missing three-column view fails explicitly rather than using old inferred history", async () => {
  await assert.rejects(loadSheetHistoryColumns("https://docs.google.com/spreadsheets/d/example/edit", async () =>
    new Response(JSON.stringify({ sheets: [{ properties: { title: "홈_이력", gridProperties: { rowCount: 120 } } }] })),
  ), /이력_3열보기/);
});
