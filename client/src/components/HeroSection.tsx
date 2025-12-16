import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/attached_assets/추가_김민주대표_1765920434120.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-32 md:py-40 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-primary font-semibold text-sm md:text-base tracking-wide uppercase mb-4">
            Local Startup Growth Partner
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            지역의 혁신을
            <br />
            <span className="text-primary">빛나게 합니다</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            전국 300팀 이상의 로컬 스타트업 컨설팅 경험과 26팀 투자 유치 성공을 기반으로,
            BM 고도화부터 로컬 브랜딩, IR 전략, 투자 연결까지 로컬 맞춤형 성장 전략을 제공합니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="gap-2 px-8"
              onClick={() => scrollToSection("#contact")}
              data-testid="button-hero-contact"
            >
              문의하기
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              onClick={() => scrollToSection("#success")}
              data-testid="button-hero-success"
            >
              <Play className="w-4 h-4" />
              컨설팅 후기 보기
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
