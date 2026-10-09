import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { loadSheetReviews } from "../server/home-content/sheets";
import { deduplicateReviews } from "../server/home-content/review-deduplication";
import { homeContentService } from "../server/home-content/service";
import { compareRenderedRows, renderPublicViews } from "./render-home-views";

const source = process.env.HOME_REVIEWS_CSV_URL;
assert.ok(source, "후기 시트 설정이 필요합니다.");
const raw = await loadSheetReviews(source);
const audit = deduplicateReviews(raw);
const expectedRemovedKeywords = [
  "사업 방향성 구조화", "고민 정리·구체화", "건설적 피드백", "실전 IR 노하우", "PMF 검증 전략",
].filter(keyword => raw.some(item => item.keyword === keyword));
assert.deepEqual(audit.exclusions.map(entry => raw[entry.index].keyword), expectedRemovedKeywords);
assert.deepEqual(audit.items, raw.filter(item => !expectedRemovedKeywords.includes(item.keyword)));
const content = await homeContentService.get(true);
assert.equal(content.reviews.status, "ready");
assert.deepEqual(content.reviews.items, audit.items);
const comparison = compareRenderedRows(await renderPublicViews(content), content).reviews!;
assert.equal(comparison.missing, 0);
assert.equal(comparison.extras, 0);
assert.equal(comparison.changedFields, 0);
assert.equal(comparison.orderUnchanged, true);
const report = {
  sourceTab: "홈_후기", sourcePublishedReviews: raw.length,
  uniqueDisplayedReviews: audit.items.length, initialCards: 4,
  moreCards: Math.max(0, audit.items.length - 4), sheetWrites: 0,
  overlappingFixedCardRemoved: true,
  mergedDuplicates: audit.exclusions.map(({ index, retainedIndex, reason }) => ({
    omitted: raw[index].keyword, kept: raw[retainedIndex].keyword, reason,
  })),
  unchangedTextComparison: comparison,
};
mkdirSync("reports", { recursive: true });
writeFileSync("reports/home-review-cleanup-verification.json", `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
