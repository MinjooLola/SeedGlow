import { Badge } from "@/components/ui/badge";
import ContentFeedStatus from "@/components/ContentFeedStatus";
import { useHomeContent } from "@/hooks/use-home-content";
import { groupHistory } from "@/data/historyPresentation";

export default function HistorySection({ embedded = false }: { embedded?: boolean }) {
  const { data, isLoading, isError } = useHomeContent();
  const history = data?.history;

  return (
    <section id="history" className={embedded ? "scroll-mt-24" : "scroll-mt-24 py-20 md:py-28 bg-card"}>
      <div className={embedded ? "" : "max-w-7xl mx-auto px-4 md:px-6"}>
        <div className={embedded ? "sr-only" : "text-center mb-12"}>
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/10">
            HISTORY
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">이력</h2>
          <p className="text-sm text-muted-foreground">
            누적 {data?.stats.historyCount ?? "—"}건
          </p>
        </div>

        {isLoading && (
          <div className="space-y-3" aria-label="이력을 불러오는 중" aria-busy="true">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="h-16 rounded-md bg-muted/60 animate-pulse" />
            ))}
          </div>
        )}

        {!isLoading && !history && (
          <p role="status" className="rounded-md border border-border/60 bg-background/70 px-4 py-8 text-center text-sm text-muted-foreground">
            이력 연결을 준비 중입니다. 잠시 후 다시 확인해 주세요.
          </p>
        )}

        {!isLoading && history && (
          <>
            <ContentFeedStatus feed={history} isError={isError} />
            {(history.status === "ready" || history.status === "stale") && history.items.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {groupHistory(history.items).map(({ label, items }) => (
                  <div key={label} className="p-6" data-history-group={label}>
                    <h3 className="font-bold text-base mb-4">{label}</h3>
                    <div aria-label={label} className="space-y-1.5">
                      {items.map(({ item, index }) => (
                        <article key={index} data-testid={`history-item-${index}`}
                          className="text-sm text-muted-foreground leading-relaxed break-keep">
                          <span data-home-field="text" className="whitespace-pre-wrap">{item.text}</span>
                          <span data-home-field="category" className="sr-only whitespace-pre-wrap">{item.category}</span>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
