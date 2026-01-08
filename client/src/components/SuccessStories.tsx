import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "해외 시장 진출에 있어 막막한 부분을 잘 상기 시켜주셨습니다!",
    highlight: "해외 시장 진출",
  },
  {
    quote: "스타트업이라서 IR을 하고 다니는데, 계속 떨어졌거든요. 부족한 저의 IR을 현재 합격한 기업과 비교해서 잘 얘기해주시니 도움이 많이 되었어요.",
    highlight: "IR 합격",
  },
  {
    quote: "해당 사업 포션에 대한 깊은 인사이트와 날카로운 피드백 덕분에 IR에 우리의 강점을 자연스럽게 녹여낼 수 있었습니다.",
    highlight: "IR 전략 강화",
  },
  {
    quote: "잘 몰랐던 자금 조달 부분에 대해 단계 별로 알 수 있었습니다.",
    highlight: "자금 조달 전략",
  },
  {
    quote: "추상적일수있는 것들을 잘 정리해주셔서 좀더 구체적으로 생각해볼수있게되었어요.",
    highlight: "전략 구체화",
  },
  {
    quote: "실제 IR을 많이 들어가보셔서 어떤 부분을 전략으로 나가야 할 지 잘 알려주셨어요!!",
    highlight: "실전 IR 노하우",
  },
  {
    quote: "투자자 관점에서 우리의 강점을 어떻게 강조해야 하는지, 또 그것을 어떻게 장표화해야 할지 명확히 구조화해주셨습니다.",
    highlight: "투자자 관점 분석",
  },
  {
    quote: "poc, pmf 등 수치적으로 감을 잡기 어려운 부분을 논리적으로 잘 설명해주셔서 좋았습니다.",
    highlight: "PMF 검증",
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
    <section id="success" className="py-20 md:py-28 lg:py-36 bg-zinc-900 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16 md:mb-20">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/10">
            PERFORMANCE
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            컨설팅 후기
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
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
                <div className="h-full p-8 rounded-md bg-zinc-800/50 border border-zinc-700">
                  <div className="flex items-start gap-3 mb-4">
                    <Quote className="w-6 h-6 text-primary flex-shrink-0" />
                    <Badge variant="secondary" className="text-xs">
                      {testimonial.highlight}
                    </Badge>
                  </div>
                  <blockquote className="text-white leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
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
              className="bg-zinc-800 border-zinc-700 text-white disabled:opacity-30"
              data-testid="button-prev-testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="bg-zinc-800 border-zinc-700 text-white disabled:opacity-30"
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
