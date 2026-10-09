import assert from "node:assert/strict";
import test from "node:test";
import { deduplicateReviews, reviewFingerprint } from "./review-deduplication";
import type { ReviewItem } from "../../shared/homeContent";
import { presentReviews, featuredReviewDisplay } from "../../client/src/data/reviewPresentation";

const canonical: ReviewItem = { keyword: "완전한 후기", body: "정확한 방향과 실행 계획을 모두 얻었습니다.", display: "- 익명 참여자" };
const excerpt: ReviewItem = { keyword: "발췌본", body: "정확한 방향을 얻었습니다.", display: "익명 참여자" };
const rules = [{
  duplicateKeyword: excerpt.keyword, canonicalKeyword: canonical.keyword,
  duplicateHash: reviewFingerprint(excerpt.body), canonicalHash: reviewFingerprint(canonical.body),
}];

test("verified overlapping versions retain exact canonical text and source order", () => {
  const distinct = { ...canonical, body: "다른 고객이 다른 방식으로 도움을 받았습니다." };
  const source = [excerpt, distinct, canonical];
  const before = structuredClone(source);
  const result = deduplicateReviews(source, rules);
  assert.deepEqual(result.items, [distinct, canonical]);
  assert.deepEqual(result.exclusions, [{ index: 0, retainedIndex: 2, reason: "reviewed_overlap" }]);
  assert.deepEqual(source, before);
});

test("missing, hidden or edited canonical feedback never hides the other review", () => {
  assert.deepEqual(deduplicateReviews([excerpt], rules).items, [excerpt]);
  const edited = { ...canonical, body: "새롭게 작성한 다른 후기입니다." };
  assert.deepEqual(deduplicateReviews([excerpt, edited], rules).items, [excerpt, edited]);
  const newExcerpt = { ...excerpt, body: "새로운 별도 의견입니다." };
  assert.deepEqual(deduplicateReviews([newExcerpt, canonical], rules).items, [newExcerpt, canonical]);
});

test("exact repeated content ignores harmless spacing but not different authors or topics", () => {
  const repeated = { ...canonical, keyword: "다른 키워드", body: ` ${canonical.body}\n`, display: "익명 참여자" };
  const otherAuthor = { ...canonical, display: "다른 익명 참여자" };
  const sameTopic = { ...canonical, body: "실행 계획 외에도 다른 것을 배웠습니다." };
  assert.deepEqual(deduplicateReviews([canonical, repeated, otherAuthor, sameTopic]).items,
    [canonical, otherAuthor, sameTopic]);
});

test("featured GovTech review moves first without duplicates, rewriting or disturbing other order", () => {
  const other = { ...canonical, body: "다른 후기" };
  const featured = { ...canonical, display: `- ${featuredReviewDisplay}` };
  const source = [excerpt, other, featured, canonical];
  assert.deepEqual(presentReviews(source), [featured, excerpt, other, canonical]);
  assert.deepEqual(source, [excerpt, other, featured, canonical]);
  assert.deepEqual(presentReviews([canonical]), [canonical]);
  assert.deepEqual(presentReviews([featured, canonical]), [featured, canonical]);
});
