import { Badge } from "@/components/ui/badge";
import ContentFeedStatus from "@/components/ContentFeedStatus";
import { isFeaturedReview, presentReviews } from "@/data/reviewPresentation";
import { useHomeContent } from "@/hooks/use-home-content";
import { Quote } from "lucide-react";
import { useRef, useState } from "react";

const INITIAL_REVIEW_COUNT = 5;

export default function SuccessStories({ defaultExpanded = false }: { defaultExpanded?: boolean }) {
  const { data, isLoading, isError } = useHomeContent();
  const reviews = data?.reviews;
  const presentedReviews = presentReviews(reviews?.items ?? []);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const visibleReviews = isExpanded ? presentedReviews : presentedReviews.slice(0, INITIAL_REVIEW_COUNT);
  const hasMoreReviews = presentedReviews.length > INITIAL_REVIEW_COUNT;

  const toggleReviews = () => {
    if (isExpanded) {
      setIsExpanded(false);
      requestAnimationFrame(() => {
        toggleRef.current?.focus();
        toggleRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      return;
    }
    setIsExpanded(true);
  };

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
          <p className="text-amber-200/80 text-[15px] md:text-lg max-w-2xl mx-auto break-keep">
            SeedGlow와 함께 성장하고 있는 팀들의 이야기
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-label="후기를 불러오는 중" aria-busy="true">
            {[0, 1, 2, 3, 4].map((item) => (
              <div key={item} className={`h-64 rounded-md bg-amber-900/50 border border-amber-700/40 animate-pulse ${item === 0 ? "md:col-span-2" : ""}`} />
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
              <div id="consulting-reviews" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visibleReviews.map((review, index) => (
                  <article
                    key={`${review.display}-${index}`}
                    className={`min-w-0${index === 0 && isFeaturedReview(review) ? " md:col-span-2" : ""}`}
                    data-testid={`card-testimonial-${index}`}
                  >
                    <div className="h-full p-8 rounded-md bg-amber-900/50 border border-amber-700/50 flex flex-col">
                      <div className="flex items-start gap-3 mb-4">
                        <Quote className="w-6 h-6 text-primary flex-shrink-0" aria-hidden="true" />
                        {review.keyword && (
                          <Badge data-home-field="keyword" variant="secondary" className="text-sm whitespace-pre-wrap">{review.keyword}</Badge>
                        )}
                      </div>
                      <blockquote className="text-white leading-relaxed text-[15px] flex-1 whitespace-pre-wrap break-keep">
                        "<span data-home-field="body">{review.body}</span>"
                      </blockquote>
                      <p className="text-amber-300/80 text-sm mt-5 pt-4 border-t border-amber-700/30 italic">
                        <cite data-home-field="display" className="whitespace-pre-wrap">{review.display}</cite>
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
            {(reviews.status === "ready" || reviews.status === "stale") && hasMoreReviews && (
              <div className="mt-8 flex justify-center">
                <button
                  ref={toggleRef}
                  type="button"
                  onClick={toggleReviews}
                  data-testid="button-reviews-toggle"
                  aria-expanded={isExpanded}
                  aria-controls="consulting-reviews"
                  className="rounded-md border border-amber-700/70 bg-amber-900/40 px-5 py-2.5 text-sm font-medium text-amber-50 transition-colors hover:border-amber-500/70 hover:bg-amber-900/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-amber-950"
                >
                  {isExpanded ? "접기" : `더보기 (${presentedReviews.length - INITIAL_REVIEW_COUNT})`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
