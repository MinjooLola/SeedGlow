import type { HistoryItem, PartnerItem, ReviewItem } from "../../shared/homeContent";

export type SheetKind = "history" | "reviews" | "partners";
export const sheetLayouts = {
  history: { title: "홈_이력", columns: [0, 1, 2, 3], headers: { 0: "기간", 1: "내용", 2: "구분", 3: "게시" } },
  reviews: { title: "홈_후기", columns: [0, 1, 2, 3], headers: { 0: "키워드", 1: "후기 본문(게시용)", 2: "표기", 3: "게시" } },
  partners: { title: "홈_협력기관", columns: [0, 1, 3], headers: { 0: "기관명", 1: "게시", 3: "집계제외" } },
};

export class PublicSourceError extends Error {}
export const isTrue = (text: string) => text.trim().toUpperCase() === "TRUE";
const isFalse = (text: string) => text.trim().toUpperCase() === "FALSE";

export function validateHeaders(row: string[], columns: number[], headers: Record<number, string>) {
  for (const column of columns) {
    if (row[column]?.replace(/^\uFEFF/, "").trim() !== headers[column]) {
      throw new PublicSourceError("이력·후기·협력기관의 필수 열 이름 또는 순서가 요청한 양식과 다릅니다.");
    }
  }
}

export const historyRow = (row: string[]): HistoryItem | null =>
  isTrue(row[3]) ? { period: row[0], text: row[1], category: row[2] } : null;

export const historyColumnsLayout = {
  title: "이력_3열보기",
  columns: [0, 1, 2],
  headers: { 0: "강의", 1: "컨설팅", 2: "심사" },
};

// Only remove the sheet's trailing date annotation, not years in course names
// or other bracketed wording. Display and counts come from actual cells.
export function historyColumnRow(row: string[]): HistoryItem[] {
  const categories = ["강의", "컨설팅", "심사"];
  return categories.flatMap((category, index) => {
    const raw = row[index] ?? "";
    if (!raw.trim() || /^\s*\d+\s*건\s*$/.test(raw)) return [];
    const text = raw.replace(/\s*\[(?:19|20)\d{2}(?:\.\d{1,2})?(?:[~-]\d{1,2})?\]\s*$/, "");
    return [{ text, period: "", category }];
  });
}

export function reviewRow(row: string[]): ReviewItem | null {
  if (!isTrue(row[3])) return null;
  if (row.slice(0, 3).some((text) => /[\w.+-]+@[\w.-]+\.[a-z]{2,}|\b01[016789][ -]?\d{3,4}[ -]?\d{4}\b|\+82[ -]?\d{1,2}[ -]?\d{3,4}[ -]?\d{4}/i.test(text))) {
    throw new PublicSourceError("후기 게시용 열에 연락처가 포함되어 있습니다. 시트에서 익명화가 필요합니다.");
  }
  return { keyword: row[0], body: row[1], display: row[2] };
}

export const partnerRow = (row: string[]): PartnerItem | null =>
  isTrue(row[1]) ? { name: row[0], excludedFromCount: isTrue(row[3]) ? true : isFalse(row[3]) ? false : null } : null;
