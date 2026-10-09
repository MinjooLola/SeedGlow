import type { HistoryItem } from "@shared/homeContent";
import { existingLectures, existingConsulting, existingJudging, historyAdditions } from "./aboutHistory";

export const historyGroups = ["강의", "컨설팅", "심사"] as const;
type Group = typeof historyGroups[number];
const normalize = (text: string) => text.replace(/[\s·,]/g, "");
const known = new Map<string, Group[]>();
const add = (text: string, groups: Group[]) => {
  const key = normalize(text);
  known.set(key, Array.from(new Set([...(known.get(key) ?? []), ...groups])));
};
existingLectures.forEach((text) => add(text, ["강의"]));
existingConsulting.forEach((text) => add(text, ["컨설팅"]));
existingJudging.forEach((text) => add(text, ["심사"]));
const labels = { lecture: "강의", consulting: "컨설팅", judging: "심사" } as const;
historyAdditions.forEach(({ text, categories }) => add(text, categories.map((category) => labels[category])));

// Combined source wording for activities already placed in the old three lists.
// This is presentation taxonomy, not a rewrite of the sheet's category cell.
[
  ["제주더큰내일센터 컨설팅, 13기 역량UP교육 변화이론 강의", ["강의", "컨설팅"]],
  ["농림축산식품부한국농어촌공사 농촌창업경진대회 심사, 현장실사, 멘토링", ["심사"]],
  ["충북글로벌창업이민센터 한국 비즈니스 문화 및 창업 전략 강의 및 멘토링", ["강의"]],
  ["중소벤처기업부 강한소상공인 지원사업 로컬 분과 심사 및 IR 강의", ["강의", "심사"]],
  ["중소벤처기업부 모두의창업 로컬 트랙 심사 및 멘토링 (제주, 대구경북, 서울)", ["컨설팅", "심사"]],
  ["대구대학교 로컬창업지원센터 CEO끝장내기 캠프 강의 및 심사", ["강의", "심사"]],
  ["대구대학교 사업계획서 작성 스프린트캠프 멘토링 및 심사", ["강의", "심사"]],
  ["SK하이닉스 하이로컬이천 프로그램 로컬 창업 강연 및 IR 심사", ["강의", "심사"]],
  ["경상북도경제진흥원 경북 창업기업 IR 피칭데이 심사 및 컨설팅", ["컨설팅", "심사"]],
  ["동국대학교 학생창업팀 비즈니스모델 고도화 강연 및IR 심사", ["강의", "심사"]],
  ["안동시 창업경진대회 예비초기창업자 컨설팅", ["컨설팅"]],
  ["대구광역시대구테크노파크 로컬벤처 멘토링", ["컨설팅"]],
  ["사회적협동조합 menTory 실전 IR 피칭 강연 및 컨설팅", ["강의", "컨설팅"]],
  ["중소벤처기업부 장인학교 1~2기 IR피칭 강연 및 컨설팅", ["강의", "컨설팅"]],
] .forEach(([text, groups]) => add(text as string, groups as Group[]));

export function presentationGroups(item: HistoryItem): readonly Group[] {
  // Real specific categories take precedence over legacy presentation mappings.
  if (item.category !== "강의·컨설팅·심사") {
    const explicit = historyGroups.filter((group) => item.category.includes(group));
    if (explicit.length) return explicit;
  }
  return known.get(normalize(item.text)) ?? [];
}

export function groupHistory(items: HistoryItem[]) {
  return [...historyGroups, "구분 확인 필요"].map((label) => ({
    label,
    items: items.map((item, index) => ({ item, index })).filter(({ item }) => {
      const groups = presentationGroups(item);
      return label === "구분 확인 필요" ? groups.length === 0 : groups.includes(label as Group);
    }),
  })).filter((group) => group.items.length > 0);
}
