import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@assets/hero-image.jpg";

const metrics = [
  { value: "300+", label: "로컬 스타트업 컨설팅" },
  { value: "26팀", label: "투자 유치 성공" },
  { value: "50억+", label: "누적 투자 유치 연계" },
  { value: "40+", label: "창업 강의·IR 심사" },
];

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-violet-950 via-purple-900 to-violet-900">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-950/95 via-purple-900/80 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 lg:w-2/5">
          <img
            src={heroImage}
            alt="김민주 대표"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-violet-950 via-purple-900/60 to-transparent" />
        </div>
      </div>

      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 z-5">
        <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
      </div>

      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-32 md:py-40 w-full">
          <div className="max-w-2xl">
            <p className="text-lg md:text-xl text-violet-200 mb-4" data-testid="text-hero-tagline">
              지역 비즈니스 성장 파트너
            </p>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" data-testid="text-hero-title">
              <span className="text-primary">씨드글로우</span> 김민주
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8" data-testid="text-hero-description">
              나다운 <span className="text-primary">비즈니스</span>에<br />
              <span className="text-primary">브릿지</span>가 되어드립니다.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                onClick={scrollToContact}
                className="gap-2"
                data-testid="button-hero-contact"
              >
                문의하기
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-auto">
        <div className="bg-violet-950/80 backdrop-blur-sm border-t border-violet-800/50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-violet-700/50">
              {metrics.map((metric, index) => (
                <div 
                  key={index} 
                  className="py-8 px-4 md:px-8 text-center"
                  data-testid={`metric-${index}`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-violet-300">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
