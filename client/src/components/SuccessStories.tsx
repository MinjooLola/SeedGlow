import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "해외 시장 진출에 있어 막막한 부분을 잘 상기 시켜주셨습니다!",
  },
  {
    quote: "스타트업이라서 IR을 하고 다니는데, 계속 떨어졌거든요. 그래서 부족한 저의 IR을 현재 합격한 기업과 비교해서 잘 얘기해주시니 도움이 많이 되었어요.",
  },
  {
    quote: "해당 사업 포션에 대한 깊은 인사이트와 날카로운 피드백 덕분에 IR에 우리의 강점을 자연스럽게 녹여낼 수 있었고, 전략의 방향성까지 한층 더 선명해졌습니다.",
  },
  {
    quote: "잘 몰랐던 자금 조달 부분에 대해 단계 별로 알 수 있었습니다.",
  },
  {
    quote: "추상적일수있는 것들을 잘 정리해주셔서 좀더 구체적으로 생각해볼수있게되었어요. 새로 스타트업을 시작하고 새로운 곳에서 피칭을 할때 여러가지 보완하고 보강해야할 건설적인 피드백이 많아서 좋았습니다.",
  },
  {
    quote: "실제 IR을 많이 들어가보셔서 어떤 부분을 전략으로 나가야 할 지 잘 알려주셨어요!!",
  },
  {
    quote: "이번 코칭에서 가장 크게 느낀 점은 단순히 조언을 주시는 차원을 넘어, 해당 사업 영역에 대한 깊은 이해와 날카로운 시각으로 방향성을 짚어주셨다는 점입니다. 특히 저희가 고민하던 정책 데이터 플랫폼의 확장성과 투자자 관점에서의 설득 포인트를 명확히 구조화해 주셔서 많은 인사이트를 얻을 수 있었습니다.",
  },
  {
    quote: "poc, pmf 등 수치적으로 감을 잡기 어려운 부분, 투자 유치 시점 등 정성적으로 감을 잡기 어려운 부분을 논리적으로 잘 설명해주셔서 좋았습니다. 다양한 대안을 들어서 알려주셔서 그 중 저에게 맞는 대안이 무엇일지 고민해보는 계기가 되었습니다.",
  },
  {
    quote: "방향과 컨텐츠등 지금하려는것에 대한 고민을얘기하고 내가원하는걸생각하고 또 그걸잘정리해주시는게 너무 좋았어요.",
  },
  {
    quote: "투자자 관점에서 우리의 강점을 어떻게 강조해야 하는지, 또 그것을 어떻게 장표화해야 할지 명확히 구조화해주셔서 큰 인사이트를 얻을 수 있었습니다. 덕분에 당장 실행해야 할 것과 방향성, 그리고 우리의 IR을 어떻게 매력적으로 만들지 정리할 수 있었고, 더 잘 어필할 수 있다는 자신감도 많이 얻었습니다!",
  },
];

export default function SuccessStories() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="success" className="py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            컨설팅 후기
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            SeedGlow와 함께 성장하고 있는 팀들의 이야기를 확인하세요.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <Card className="bg-card">
            <CardContent className="p-8 md:p-12">
              <div className="flex justify-center mb-6">
                <div className="p-3 rounded-full bg-primary/10">
                  <Quote className="w-8 h-8 text-primary" />
                </div>
              </div>
              <blockquote className="text-lg md:text-xl text-center mb-6 leading-relaxed min-h-[120px] flex items-center justify-center">
                "{testimonials[currentSlide].quote}"
              </blockquote>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  - 컨설팅 참여 스타트업
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              data-testid="button-prev-testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentSlide ? "bg-primary" : "bg-muted"
                  }`}
                  data-testid={`button-testimonial-dot-${i}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
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
