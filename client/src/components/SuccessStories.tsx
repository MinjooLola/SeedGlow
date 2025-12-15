import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote, TrendingUp, Building2 } from "lucide-react";

// todo: remove mock functionality - replace with real testimonial data
const testimonials = [
  {
    quote: "SeedGlow와 함께 IR 피칭을 준비하면서 투자자가 무엇을 원하는지 명확히 이해하게 되었습니다. 덕분에 시드 투자를 성공적으로 유치할 수 있었습니다.",
    author: "A 스타트업 대표",
    company: "AgriTech 스타트업",
    region: "제주",
    highlight: "IR 전문성",
  },
  {
    quote: "로컬 시장에 대한 깊은 이해와 네트워크가 정말 큰 도움이 되었습니다. 지역 특화 사업 모델을 수립하는 데 결정적인 인사이트를 얻었습니다.",
    author: "B 스타트업 대표",
    company: "로컬 F&B 플랫폼",
    region: "부산",
    highlight: "로컬 전문성",
  },
  {
    quote: "사업 구조화 능력이 탁월합니다. 막연하게 생각했던 비즈니스 모델이 체계적으로 정리되었고, 투자자들도 명확히 이해할 수 있게 되었습니다.",
    author: "C 스타트업 대표",
    company: "ESG 솔루션",
    region: "대구",
    highlight: "사업 구조화",
  },
  {
    quote: "실행 가능성에 초점을 맞춘 전략 덕분에 빠르게 시장 검증을 마칠 수 있었습니다. 이론이 아닌 실전에서 바로 적용할 수 있는 조언을 받았습니다.",
    author: "D 스타트업 대표",
    company: "HealthTech",
    region: "울산",
    highlight: "실행 가능성",
  },
];

const successCases = [
  { company: "제주 AgriTech A사", region: "제주", role: "BM 고도화 및 IR 컨설팅", result: "시드 투자 유치" },
  { company: "부산 물류 플랫폼 B사", region: "부산", role: "투자 전략 수립", result: "Pre-A 투자 유치" },
  { company: "대구 ESG 솔루션 C사", region: "대구", role: "사업 구조화 및 IR 지원", result: "시리즈 A 투자 유치" },
  { company: "울산 헬스케어 D사", region: "울산", role: "BM 고도화 컨설팅", result: "시드 투자 유치" },
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
            Success Stories & Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            성공 사례 & 멘토링 후기
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            SeedGlow와 함께 성장하고 투자를 유치한 26팀의 이야기를 확인하세요.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-xl font-bold mb-8 text-center">멘토링 후기</h3>
          <div className="relative max-w-3xl mx-auto">
            <Card className="bg-card">
              <CardContent className="p-8 md:p-12">
                <div className="flex justify-center mb-6">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Quote className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <blockquote className="text-lg md:text-xl text-center mb-6 leading-relaxed">
                  "{testimonials[currentSlide].quote}"
                </blockquote>
                <div className="text-center">
                  <Badge className="mb-3">{testimonials[currentSlide].highlight}</Badge>
                  <p className="font-semibold">{testimonials[currentSlide].author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentSlide].company} | {testimonials[currentSlide].region}
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

        <div>
          <h3 className="text-xl font-bold mb-8 text-center">투자 유치 성공 사례</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {successCases.map((caseItem, index) => (
              <Card
                key={index}
                className="hover-elevate transition-transform duration-200"
                data-testid={`card-case-${index}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-md bg-primary/10">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h4 className="font-bold">{caseItem.company}</h4>
                        <Badge variant="outline">{caseItem.region}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        SeedGlow 역할: {caseItem.role}
                      </p>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="text-primary font-semibold">{caseItem.result}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
