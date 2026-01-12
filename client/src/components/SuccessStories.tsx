import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "이번 컨설팅에서 가장 크게 느낀 점은 단순히 조언을 주시는 차원을 넘어, 해당 사업 영역에 대한 깊은 이해와 날카로운 시각으로 방향성을 짚어주셨다는 점입니다. 특히 저희가 고민하던 정책 데이터 플랫폼의 확장성과 투자자 관점에서의 설득 포인트를 명확히 구조화해 주셔서 많은 인사이트를 얻을 수 있었습니다.",
    author: "8년차 GovTech 스타트업, 투자 IR 준비 중",
    highlight: "사업 방향성 구조화",
  },
  {
    quote: "방향과 컨텐츠등 지금 하려는 것에 대한 고민을 잘 들어주시고 구체적인 실행 전략을 정리해주시는 게 너무 좋았어요. 어떤 부분이 강점이 되고, 어떤 부분은 보완해야 하는지를 현실적으로 제시해주셔서 바로 실행 가능한 과제들을 도출할 수 있었던 것이 큰 도움이 되었습니다. 추상적일 수 있는 것들을 잘 정리해주셔서 좀더 구체적으로 생각해볼 수 있게 되었어요.",
    author: "2년차 Lifestyle 스타트업, 제품 피봇 진행 중",
    highlight: "실행 과제 도출",
  },
  {
    quote: "해외 시장 진출에 있어 막막한 부분을 잘 상기 시켜주셨습니다. 새로 스타트업을 시작하고 새로운 곳에서 피칭을 할 때 여러가지 보완하고 보강해야할 건설적인 피드백이 많아서 좋았습니다.",
    author: "1년차 Contents 스타트업, 미국 VC 투자 IR 준비 중",
    highlight: "건설적 피드백",
  },
  {
    quote: "최근 IR을 많이 하고 다니는데, 계속 좋은 결과를 얻지 못했거든요. 부족한 저의 IR을 현재 합격한 기업과 비교해서 잘 얘기해주시니 도움이 많이 되었어요. 실제 IR을 많이 들어가보셔서 어떤 부분을 전략으로 나가야 할 지 잘 알려주셨어요!!",
    author: "1년차 HealthTech 스타트업, IR 및 정부지원사업 준비 중",
    highlight: "실전 IR 노하우",
  },
  {
    quote: "잘 몰랐던 자금 조달 부분에 대해 단계별로 알 수 있었고, poc, pmf 등 수치적으로 감을 잡기 어려운 부분, 투자 유치 시점 등 정성적으로 감을 잡기 어려운 부분을 논리적으로 잘 설명해주셔서 좋았습니다. 다양한 대안을 들어서 알려주셔서 그 중 저에게 맞는 대안이 무엇일지 고민해보는 계기가 되었습니다.",
    author: "1년차 Sports 스타트업, 정부지원사업 참여 중",
    highlight: "PMF 검증 전략",
  },
  {
    quote: "사실 신청 전까지 고민을 많이 했는데요. 오늘 대표님의 이야기가 제가 브랜드를 고도화하는데 많은 도움이 될 것 같아 잘한 선택이라고 제 스스로를 칭찬해 주고 싶습니다.",
    author: "로컬 Lifestyle 분야 예비 창업가",
    highlight: "브랜드 고도화",
  },
  {
    quote: "짧은 상담 시간에도 불구하고 저희 스타트업의 핵심을 꿰뚫는 진심 어린 조언을 해주셔서 진심으로 감사드립니다. 당시 제가 가진 방향성에 대한 질문에 대표님의 조언은 마치 '파란 지시등'처럼 명확한 길을 제시해주셨습니다. 덕분에 저희 솔루션이 글로벌 마켓을 대상으로 하는 콘텐츠인 만큼 해외 시장으로 '직진'해야겠다는 확신을 얻게 되었습니다.",
    author: "1년차 에듀테크 스타트업, 이전 회사 Exit 후 신규 비즈니스 IR 준비 중",
    highlight: "글로벌 진출 전략",
  },
  {
    quote: "투자자 관점에서 우리의 강점을 어떻게 강조해야 하는지, 또 그것을 어떻게 장표화해야 할지 명확히 구조화해주셔서 큰 인사이트를 얻을 수 있었습니다. 덕분에 당장 실행해야 할 것과 방향성, 그리고 우리의 IR을 어떻게 매력적으로 만들지 정리할 수 있었고, 더 잘 어필할 수 있다는 자신감도 많이 얻었습니다! 무엇보다 발표 이후에도 지속적으로 업데이트되는 내용과 고민들을 함께 점검하며 관계를 이어가고자 하시는 모습에서 큰 감동을 받았습니다. 혹시 IR을 준비하고 계시다면, 꼭 한 번 의견 들어보시길 추천드립니다.",
    author: "8년차 GovTech 스타트업, 투자 IR 준비 중",
    highlight: "지속적 파트너십",
  },
];

export default function SuccessStories() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => scrollElement.removeEventListener("scroll", updateScrollButtons);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth / 3;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="success" className="py-20 md:py-28 lg:py-36 bg-gradient-to-b from-amber-900 to-amber-950">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16 md:mb-20">
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

        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="w-[85%] md:w-[45%] lg:w-[32%] flex-shrink-0 snap-start"
                data-testid={`card-testimonial-${index}`}
              >
                <div className="h-full p-8 rounded-md bg-amber-900/50 border border-amber-700/50 flex flex-col">
                  <div className="flex items-start gap-3 mb-4">
                    <Quote className="w-6 h-6 text-primary flex-shrink-0" />
                    <Badge variant="secondary" className="text-xs">
                      {testimonial.highlight}
                    </Badge>
                  </div>
                  <blockquote className="text-white leading-relaxed text-sm flex-1 break-keep">
                    "{testimonial.quote}"
                  </blockquote>
                  <p className="text-amber-300/70 text-xs mt-4 pt-4 border-t border-amber-700/30">
                    - {testimonial.author}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="bg-amber-900/50 border-amber-700/50 text-white disabled:opacity-30"
              data-testid="button-prev-testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="bg-amber-900/50 border-amber-700/50 text-white disabled:opacity-30"
              data-testid="button-next-testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
