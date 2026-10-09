import { createHash } from "node:crypto";
import type { ReviewItem } from "../../shared/homeContent";

export interface ReviewOverlap {
  duplicateKeyword: string;
  canonicalKeyword: string;
  duplicateHash: string;
  canonicalHash: string;
}

export const reviewFingerprint = (body: string) =>
  createHash("sha256").update(body.normalize("NFC").replace(/\s+/g, "").toLowerCase()).digest("hex");

// Individually checked against the public 홈_후기 columns. These are alternate
// versions of the same feedback, not simply reviews about similar topics.
// Both complete texts must still match: edited or missing canonical feedback
// must never cause a different/new review to disappear.
const reviewedOverlaps: ReviewOverlap[] = [
  {
    duplicateKeyword: "사업 방향성 구조화", canonicalKeyword: "투자자 설득 구조화",
    duplicateHash: "ede7813acf318d5fc509a44dba17877d2138774e846d484a5c1ef670396710b9",
    canonicalHash: "a384126f247bcd8bef7c1c46e6ec97ce70e46e458d1b2077e68c8cd92bb68058",
  },
  {
    duplicateKeyword: "고민 정리·구체화", canonicalKeyword: "실행 과제 도출",
    duplicateHash: "27853aff949f10df5b2d23f967ef2bc5b42b3b8ebda24349c917a8ab684e94d1",
    canonicalHash: "c87fc5b2b6454daf525cf3f94036ab0b448944b0b9895e17b19b92b41a2ac326",
  },
  {
    duplicateKeyword: "건설적 피드백", canonicalKeyword: "피칭 보완점 진단",
    duplicateHash: "f134109359c4c0e24ef4991543b09ce9906ae018dd112b021b59ce479660f407",
    canonicalHash: "4f8eedd28b9d74348f7d647cf36a70face6bc9d1f46b897d5d919c0eb40f8cb4",
  },
  {
    duplicateKeyword: "실전 IR 노하우", canonicalKeyword: "IR 전략 비교 분석",
    duplicateHash: "c8bf2658bea54f9d0c6a934811bde7bd9d01c01a350964a79e1ba1fe04c08c5e",
    canonicalHash: "e86c89701fbaad84afcc99205fcfc1aa50a17d475b295cbd68ccd280b86ca3b6",
  },
  {
    duplicateKeyword: "PMF 검증 전략", canonicalKeyword: "투자·자금조달 단계 이해",
    duplicateHash: "4abfce4640e197cd6e393c89cb450d3e125a06820edda58217d6190f932ec281",
    canonicalHash: "0552aa42666215dac9ec2b2111b5a0b690ffbc2405faf87fdb1c979af8f21f5b",
  },
];

export function deduplicateReviews(items: ReviewItem[], overlaps = reviewedOverlaps) {
  const hashes = items.map(item => reviewFingerprint(item.body));
  const excluded = new Map<number, { index: number; retainedIndex: number; reason: string }>();
  for (const rule of overlaps) {
    const retainedIndex = items.findIndex((item, index) =>
      item.keyword === rule.canonicalKeyword && hashes[index] === rule.canonicalHash);
    if (retainedIndex < 0 || excluded.has(retainedIndex)) continue;
    items.forEach((item, index) => {
      if (index !== retainedIndex && item.keyword === rule.duplicateKeyword && hashes[index] === rule.duplicateHash) {
        excluded.set(index, { index, retainedIndex, reason: "reviewed_overlap" });
      }
    });
  }
  const seen = new Map<string, number>();
  items.forEach((item, index) => {
    if (excluded.has(index)) return;
    const display = item.display.normalize("NFC").replace(/^[\s\-–—]+/, "").replace(/\s+/g, "").toLowerCase();
    const identity = `${hashes[index]}:${display}`;
    const retainedIndex = seen.get(identity);
    if (retainedIndex !== undefined) excluded.set(index, { index, retainedIndex, reason: "exact_repeat" });
    else seen.set(identity, index);
  });
  const exclusions = Array.from(excluded.values()).sort((a, b) => a.index - b.index).map(entry => {
    let retainedIndex = entry.retainedIndex;
    while (excluded.has(retainedIndex)) retainedIndex = excluded.get(retainedIndex)!.retainedIndex;
    return { ...entry, retainedIndex };
  });
  return { items: items.filter((_, index) => !excluded.has(index)), exclusions };
}
