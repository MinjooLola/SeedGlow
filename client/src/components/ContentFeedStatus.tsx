import type { ContentFeed } from "@shared/homeContent";

interface ContentFeedStatusProps {
  feed: ContentFeed<unknown>;
  isError?: boolean;
  emptyLabel?: string;
}

export default function ContentFeedStatus({
  feed,
  isError = false,
  emptyLabel = "아직 공개된 내용이 없습니다.",
}: ContentFeedStatusProps) {
  if (isError || feed.status === "unavailable" || feed.status === "unconfigured") {
    return (
      <p
        role="status"
        className="rounded-md border border-border/60 bg-background/70 px-4 py-3 text-center text-sm text-muted-foreground"
      >
        {feed.message || "콘텐츠 연결을 준비 중입니다. 잠시 후 다시 확인해 주세요."}
        {feed.categories && <span className="block mt-2">RSS 카테고리: {feed.categories.join(", ") || "없음"}</span>}
      </p>
    );
  }

  if (feed.status === "stale") {
    return (
      <p
        role="status"
        className="mb-5 text-center text-xs text-muted-foreground"
      >
        {feed.message || "최근 업데이트가 지연되고 있어 이전에 공개된 내용을 보여드립니다."}
        {feed.categories && <span className="block mt-2">RSS 카테고리: {feed.categories.join(", ") || "없음"}</span>}
      </p>
    );
  }

  if (feed.items.length === 0) {
    return (
      <p
        role="status"
        className="rounded-md border border-border/60 bg-background/70 px-4 py-8 text-center text-sm text-muted-foreground"
      >
        {emptyLabel}
      </p>
    );
  }

  return null;
}
