import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import heroImage from "@assets/hero-image.jpg";

const metrics = [
  { value: "300+", label: "로컬 스타트업 컨설팅" },
  { value: "26팀", label: "투자 유치 성공" },
  { value: "50억+", label: "누적 투자 유치 연계" },
  { value: "40+", label: "창업 강의/IR 심사" },
];

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-amber-950 via-amber-900 to-amber-800">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-950/95 via-amber-900/80 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 lg:w-2/5">
          <img
            src={heroImage}
            alt="김민주 대표"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-950 via-amber-900/60 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-32 md:py-40 w-full">
          <div className="max-w-2xl">
            <p className="text-sm md:text-base text-primary font-medium tracking-wide uppercase mb-4" data-testid="text-hero-tagline">
              Local Startup Growth Partner
            </p>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" data-testid="text-hero-title">
              <span className="text-primary">SeedGlow</span><br />
              지역 스타트업의<br />
              비즈니스 성장을 구조화합니다
            </h1>
            
            <p className="text-lg md:text-xl text-amber-100/90 leading-relaxed mb-8" data-testid="text-hero-description">
              서울 중심의 일반론이 아닌,<br />
              지역의 산업 구조·시장 규모·자원 흐름을 기준으로<br />
              로컬 스타트업의 BM, 실행 전략, IR, 투자 연결까지 설계합니다.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                onClick={scrollToContact}
                className="gap-2"
                data-testid="button-hero-contact"
              >
                상담 문의하기
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={scrollToAbout}
                className="gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20"
                data-testid="button-hero-history"
              >
                <FileText className="w-4 h-4" />
                강의/컨설팅/심사 이력
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-auto">
        <div className="bg-amber-950/80 backdrop-blur-sm border-t border-amber-800/50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-amber-700/50">
              {metrics.map((metric, index) => (
                <div 
                  key={index} 
                  className="py-8 px-4 md:px-8 text-center"
                  data-testid={`metric-${index}`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-amber-300">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
