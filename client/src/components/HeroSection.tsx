import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const metrics = [
  { value: "300+", label: "컨설팅" },
  { value: "26팀", label: "투자 유치" },
  { value: "50억+", label: "투자 연계" },
  { value: "40+", label: "강연/심사" },
];

export default function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/attached_assets/추가_김민주대표_1765920434120.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="text-primary font-semibold text-sm md:text-base tracking-widest uppercase mb-6" data-testid="text-hero-tagline">
            Local Startup Growth Partner
          </p>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight" data-testid="text-hero-title">
            지역의 혁신을
            <br />
            <span className="text-primary">빛나게 합니다</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl leading-relaxed" data-testid="text-hero-description">
            BM 고도화부터 로컬 브랜딩, IR 전략, 투자 연결까지
            <br className="hidden md:block" />
            로컬 맞춤형 성장 전략을 제공합니다.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <Button
              size="lg"
              className="gap-2 px-8 text-base"
              onClick={() => scrollToSection("#contact")}
              data-testid="button-hero-contact"
            >
              상담 신청하기
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 px-8 text-base bg-white/5 backdrop-blur-sm border-white/20 text-white"
              onClick={() => scrollToSection("#services")}
              data-testid="button-hero-services"
            >
              서비스 보기
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-6 md:gap-10 pt-8 border-t border-white/20">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center md:text-left" data-testid={`hero-metric-${index}`}>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
                  {metric.value}
                </div>
                <div className="text-xs md:text-sm text-white/60">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
