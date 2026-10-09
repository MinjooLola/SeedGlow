import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import ContentFeedStatus from "@/components/ContentFeedStatus";
import { useHomeContent } from "@/hooks/use-home-content";
import { ExternalLink } from "lucide-react";

export default function ArchiveSection() {
  const { data, isLoading, isError } = useHomeContent();
  const archive = data?.archive;
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleArchiveItems = archive?.items
    ? isExpanded ? archive.items : archive.items.slice(0, 6)
    : [];
  const hasMoreItems = (archive?.items.length ?? 0) > 6;

  return (
    <section id="archive" className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4" data-testid="badge-archive">
            Archive
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 break-keep" data-testid="text-archive-title">
            강의 · 컨설팅 · 심사 아카이브
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto break-keep" data-testid="text-archive-description">
            SeedGlow가 진행한 다양한 활동 기록들을 확인하세요
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" aria-label="아카이브를 불러오는 중" aria-busy="true">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="h-56 rounded-md bg-card border border-border/50 animate-pulse" />
            ))}
          </div>
        )}

        {!isLoading && !archive && (
          <p role="status" className="rounded-md border border-border/60 bg-background/70 px-4 py-8 text-center text-sm text-muted-foreground">
            아카이브 연결을 준비 중입니다. 잠시 후 다시 확인해 주세요.
          </p>
        )}

        {!isLoading && archive && (
          <>
            <ContentFeedStatus
              feed={archive}
              isError={isError}
              emptyLabel="아직 공개된 아카이브가 없습니다."
            />
            {(archive.status === "ready" || archive.status === "stale") && archive.items.length > 0 && (
              <>
                <div id="archive-records" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {visibleArchiveItems.map((item, index) => (
                    <a
                      key={`${item.url}-${index}`}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                      data-testid={`link-archive-${index}`}
                      aria-label={`${item.title} - ${item.date}, 새 창에서 열기`}
                    >
                      <Card className="h-full overflow-hidden hover-elevate transition-all duration-200 border-border/50 hover:border-primary/30">
                        {item.imageUrl && (
                          <div className="relative h-48 md:h-56 overflow-hidden bg-muted/60">
                            <img
                              src={item.imageUrl}
                              alt=""
                              loading="lazy"
                              onError={(event) => { event.currentTarget.hidden = true; }}
                              className="w-full h-full object-contain"
                            />
                            <ExternalLink className="absolute top-3 right-3 w-4 h-4 text-foreground/65 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                          </div>
                        )}
                        <div className="p-4 flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="text-sm font-medium text-foreground break-keep group-hover:text-primary transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-2">
                              {Number.isNaN(Date.parse(item.date)) ? item.date :
                                new Date(item.date).toLocaleDateString("ko-KR", { timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit" })}
                            </p>
                          </div>
                          {!item.imageUrl && (
                            <ExternalLink className="w-4 h-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                          )}
                        </div>
                      </Card>
                    </a>
                  ))}
                </div>

                {hasMoreItems && (
                  <div className="mt-8 flex flex-col items-center gap-4 text-center">
                    <button
                      type="button"
                      onClick={() => setIsExpanded((expanded) => !expanded)}
                      data-testid="button-archive-toggle"
                      aria-expanded={isExpanded}
                      aria-controls="archive-records"
                      className="rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {isExpanded ? "접기" : `더보기 (${archive.items.length - 6})`}
                    </button>
                    {isExpanded && (
                      <div className="max-w-xl text-sm text-muted-foreground">
                        <p>사이트의 기존 기록과 최신 기록을 함께 표시했습니다. 블로그의 다른 기록도 아래에서 확인할 수 있습니다.</p>
                        <a
                          href="https://blog.naver.com/PostList.naver?blogId=minjoo_lola&categoryNo=120&from=postList&parentCategoryNo=120"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 font-medium text-primary underline underline-offset-4 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          SeedGlow 블로그의 이전 기록 보기
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}
