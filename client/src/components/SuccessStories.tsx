import { Badge } from "@/components/ui/badge";
import ContentFeedStatus from "@/components/ContentFeedStatus";
import { useHomeContent } from "@/hooks/use-home-content";
import { Quote } from "lucide-react";

const partnershipQuote = {
  body: "투자자 관점에서 우리의 강점을 어떻게 강조해야 하는지, 또 그것을 어떻게 장표화해야 할지 명확히 구조화해주셔서 큰 인사이트를 얻을 수 있었습니다. 덕분에 당장 실행해야 할 것과 방향성, 그리고 우리의 IR을 어떻게 매력적으로 만들지 정리할 수 있었고, 더 잘 어필할 수 있다는 자신감도 많이 얻었습니다! 무엇보다 발표 이후에도 지속적으로 업데이트되는 내용과 고민들을 함께 점검하며 관계를 이어가고자 하시는 모습에서 큰 감동을 받았습니다. 혹시 IR을 준비하고 계시다면, 꼭 한 번 의견 들어보시길 추천드립니다.",
  display: "8년차 GovTech 스타트업, 투자 IR 준비 중",
};

export default function SuccessStories() {
  const { data, isLoading, isError } = useHomeContent();
  const reviews = data?.reviews;

  return (
    <section id="success" className="py-20 md:py-28 lg:py-36 bg-gradient-to-b from-amber-900 to-amber-950">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/10">
            TESTIMONIALS
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            컨설팅 후기
          </h2>
          <p className="text-amber-200/80 text-sm md:text-lg max-w-2xl mx-auto break-keep">
            SeedGlow와 함께 성장하고 있는 팀들의 이야기
          </p>
        </div>

        <article className="max-w-4xl mx-auto mb-10 md:mb-14">
          <div className="p-7 md:p-9 rounded-md bg-amber-900/50 border border-amber-700/50 flex flex-col">
            <div className="flex items-start gap-3 mb-4">
              <Quote className="w-6 h-6 text-primary flex-shrink-0" aria-hidden="true" />
              <Badge variant="secondary" className="text-xs">지속적 파트너십</Badge>
            </div>
            <blockquote className="text-white leading-relaxed text-sm md:text-base whitespace-pre-wrap break-keep">
              "{partnershipQuote.body}"
            </blockquote>
            <p className="text-amber-300/70 text-xs mt-5 pt-4 border-t border-amber-700/30 italic">
              <cite>- {partnershipQuote.display}</cite>
            </p>
          </div>
        </article>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="후기를 불러오는 중" aria-busy="true">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-64 rounded-md bg-amber-900/50 border border-amber-700/40 animate-pulse" />
            ))}
          </div>
        )}

        {!isLoading && !reviews && (
          <p role="status" className="rounded-md border border-amber-700/50 bg-amber-900/50 px-4 py-8 text-center text-sm text-amber-200/80">
            후기 연결을 준비 중입니다. 잠시 후 다시 확인해 주세요.
          </p>
        )}

        {!isLoading && reviews && (
          <>
            <ContentFeedStatus
              feed={reviews}
              isError={isError}
              emptyLabel="아직 공개된 후기가 없습니다."
            />
            {(reviews.status === "ready" || reviews.status === "stale") && reviews.items.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.items.map((review, index) => (
                  <article
                    key={`${review.display}-${index}`}
                    className="min-w-0"
                    data-testid={`card-testimonial-${index}`}
                  >
                    <div className="h-full p-8 rounded-md bg-amber-900/50 border border-amber-700/50 flex flex-col">
                      <div className="flex items-start gap-3 mb-4">
                        <Quote className="w-6 h-6 text-primary flex-shrink-0" aria-hidden="true" />
                        {review.keyword && (
                          <Badge variant="secondary" className="text-xs whitespace-pre-wrap">{review.keyword}</Badge>
                        )}
                      </div>
                      <blockquote className="text-white leading-relaxed text-sm flex-1 whitespace-pre-wrap break-keep">
                        "{review.body}"
                      </blockquote>
                      <p className="text-amber-300/70 text-xs mt-5 pt-4 border-t border-amber-700/30 italic">
                        <cite className="whitespace-pre-wrap">- {review.display}</cite>
                      </p>
                    </div>
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
