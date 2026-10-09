import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import ContentFeedStatus from "@/components/ContentFeedStatus";
import { useHomeContent } from "@/hooks/use-home-content";
import { ExternalLink } from "lucide-react";

export default function ArchiveSection() {
  const { data, isLoading, isError } = useHomeContent();
  const archive = data?.archive;

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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {archive.items.map((item, index) => (
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
                        <div className="relative h-32 overflow-hidden bg-muted">
                          <img
                            src={item.imageUrl}
                            alt=""
                            loading="lazy"
                            onError={(event) => { event.currentTarget.hidden = true; }}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                          <ExternalLink className="absolute top-3 right-3 w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
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
            )}
          </>
        )}
      </div>
    </section>
  );
}
