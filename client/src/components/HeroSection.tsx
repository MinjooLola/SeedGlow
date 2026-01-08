import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play } from "lucide-react";

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

  const scrollToSuccess = () => {
    const element = document.getElementById("success");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="/attached_assets/추가_김민주대표_1765920434120.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-32 md:py-40">
        <div className="max-w-3xl">
          <Badge variant="outline" className="mb-6 border-primary/50 text-primary bg-primary/10" data-testid="text-hero-tagline">
            Local Startup Growth Partner
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6" data-testid="text-hero-title">
            지역 스타트업의<br />
            <span className="text-primary">비즈니스 성장</span>을<br />
            구조화합니다
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-10 max-w-2xl" data-testid="text-hero-description">
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
              variant="outline" 
              size="lg"
              onClick={scrollToSuccess}
              className="gap-2 bg-white/10 backdrop-blur-sm border-white/20 text-white"
              data-testid="button-hero-cases"
            >
              <Play className="w-4 h-4" />
              컨설팅 사례 보기
            </Button>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-auto">
        <div className="bg-zinc-900/90 backdrop-blur-sm border-t border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-700">
              {metrics.map((metric, index) => (
                <div 
                  key={index} 
                  className="py-8 px-4 md:px-8 text-center"
                  data-testid={`metric-${index}`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-zinc-400">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
