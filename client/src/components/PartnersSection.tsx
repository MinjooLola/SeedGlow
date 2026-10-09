import { Badge } from "@/components/ui/badge";
import ContentFeedStatus from "@/components/ContentFeedStatus";
import { useHomeContent } from "@/hooks/use-home-content";

export default function PartnersSection() {
  const { data, isLoading, isError } = useHomeContent();
  const partners = data?.partners;
  const roundedCount = data?.stats.partnersRounded;

  return (
    <section className="py-16 md:py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/10">
            PARTNERS
          </Badge>
          <h3 className="text-2xl md:text-3xl font-bold">
            {roundedCount == null ? "연결 준비 중" : `${roundedCount}+ 협력기관과 함께합니다`}
          </h3>
        </div>

        {isLoading && (
          <div className="flex flex-wrap justify-center gap-3" aria-label="협력기관을 불러오는 중" aria-busy="true">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="h-9 w-28 rounded-md bg-muted/60 animate-pulse" />
            ))}
          </div>
        )}

        {!isLoading && !partners && (
          <p role="status" className="text-center text-sm text-muted-foreground">
            협력기관 연결을 준비 중입니다. 잠시 후 다시 확인해 주세요.
          </p>
        )}

        {!isLoading && partners && (
          <>
            <ContentFeedStatus feed={partners} isError={isError} />
            {(partners.status === "ready" || partners.status === "stale") && partners.items.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3">
                {partners.items.map((partner, index) => (
                  <div
                    key={`${partner.name}-${index}`}
                    className="px-4 py-2 rounded-md bg-background border border-border text-sm font-medium text-muted-foreground"
                    data-testid={`partner-${index}`}
                  >
                    <span data-home-field="name" className="whitespace-pre-wrap">{partner.name}</span>
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
