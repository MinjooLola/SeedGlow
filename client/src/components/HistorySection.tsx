import { Badge } from "@/components/ui/badge";
import ContentFeedStatus from "@/components/ContentFeedStatus";
import { useHomeContent } from "@/hooks/use-home-content";

export default function HistorySection() {
  const { data, isLoading, isError } = useHomeContent();
  const history = data?.history;

  return (
    <section id="history" className="py-20 md:py-28 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
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
              <div className="divide-y divide-border/70 border-y border-border/70">
                {history.items.map((item, index) => (
                  <article
                    key={`${item.period}-${item.text}-${index}`}
                    className="grid grid-cols-1 gap-2 py-4 md:grid-cols-[8rem_minmax(0,1fr)_auto] md:items-center md:gap-6"
                    data-testid={`history-item-${index}`}
                  >
                    <p data-home-field="period" className="text-xs font-medium text-muted-foreground whitespace-pre-wrap">{item.period}</p>
                    <p data-home-field="text" className="text-sm leading-relaxed text-foreground break-keep whitespace-pre-wrap">{item.text}</p>
                    <Badge data-home-field="category" variant="secondary" className="w-fit text-xs whitespace-pre-wrap">{item.category}</Badge>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
