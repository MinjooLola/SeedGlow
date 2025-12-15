import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@assets/generated_images/modern_startup_team_collaboration.png";

interface HeroSectionProps {
  onContactClick?: () => void;
  onSuccessStoriesClick?: () => void;
}

export default function HeroSection({
  onContactClick,
  onSuccessStoriesClick,
}: HeroSectionProps) {
  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      const element = document.querySelector("#contact");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSuccessClick = () => {
    if (onSuccessStoriesClick) {
      onSuccessStoriesClick();
    } else {
      const element = document.querySelector("#success");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-32 md:py-40 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-primary font-semibold text-sm md:text-base tracking-wide uppercase mb-4">
            Startup Growth Partner
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            스타트업 성장의
            <br />
            <span className="text-primary">파트너</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            전국 300팀 이상의 로컬 스타트업 컨설팅 및 26팀 투자 유치 성공 경험을
            기반으로 지역 스타트업의 성장을 지원합니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={handleContactClick}
              className="gap-2 px-8"
              data-testid="button-hero-contact"
            >
              상담 신청하기
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleSuccessClick}
              className="gap-2 px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              data-testid="button-hero-success"
            >
              <Play className="w-4 h-4" />
              성공 사례 보기
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
