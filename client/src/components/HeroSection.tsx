import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "wouter";
import slide1 from "@assets/3_1765811788897.jpg";
import slide2 from "@assets/KakaoTalk_20250523_104833739_03_1765811788918.jpg";
import slide3 from "@assets/KakaoTalk_20250523_104936309_01_1765811788920.jpg";
import slide4 from "@assets/KakaoTalk_20250523_104936309_03_1765811788922.jpg";
import slide5 from "@assets/M4J01787_1765811788923.jpg";

const heroImages = [
  slide1,
  slide2,
  slide3,
  slide4,
  slide5,
  "/attached_assets/DSC01771_1765811788912.JPG",
  "/attached_assets/DSC03786_1765811788914.JPG",
  "/attached_assets/DSC09875_1765811788916.JPG",
  "/attached_assets/TalkMedia_i_a41z74.jpg_1765811788925.jpg",
  "/attached_assets/모더레이터(4)_1765811788926.jpg",
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {heroImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`SeedGlow 활동 ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black/75" />

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
            <Link href="/contact">
              <Button
                size="lg"
                className="gap-2 px-8"
                data-testid="button-hero-contact"
              >
                문의하기
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/testimonials">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                data-testid="button-hero-success"
              >
                <Play className="w-4 h-4" />
                컨설팅 후기 보기
              </Button>
            </Link>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-primary w-6" : "bg-white/40"
                }`}
                data-testid={`button-hero-dot-${index}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
