export type FeedStatus = "ready" | "stale" | "unconfigured" | "unavailable";

export interface ContentFeed<T> {
  items: T[];
  status: FeedStatus;
  updatedAt: string | null;
  message?: string;
  categories?: string[];
}

export interface HistoryItem {
  period: string;
  text: string;
  category: string;
}

export interface ReviewItem {
  keyword: string;
  body: string;
  display: string;
}

export interface PartnerItem {
  name: string;
  excludedFromCount: boolean | null;
}

export interface ArchiveItem {
  title: string;
  date: string;
  imageUrl: string | null;
  url: string;
}

export interface HomeContent {
  history: ContentFeed<HistoryItem>;
  reviews: ContentFeed<ReviewItem>;
  partners: ContentFeed<PartnerItem>;
  archive: ContentFeed<ArchiveItem>;
  stats: {
    historyCount: number | null;
    historyRounded: number | null;
    partnersCount: number | null;
    partnersRounded: number | null;
  };
}

export const roundDownToTens = (value: number) => Math.floor(value / 10) * 10;

export function performanceDescription(historyRounded: number | null) {
  const fixed = "전국 300팀 이상의 로컬 스타트업 컨설팅, 26팀 투자 유치 성공, 누적 50억 원 이상의 투자 유치 연계";
  return historyRounded === null ? `${fixed} 실적을 보유하고 있습니다.` :
    `${fixed}, ${historyRounded}회 이상의 창업 강의 및 IR 심사 실적을 보유하고 있습니다.`;
}
