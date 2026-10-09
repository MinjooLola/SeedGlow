import { Badge } from "@/components/ui/badge";
import HistorySection from "@/components/HistorySection";
import { profile as profileImage } from "@/assets/home/images";
import { founderIntro } from "@/data/founderIntro";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 lg:py-36 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/10">
            ABOUT SEEDGLOW
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            회사 소개
          </h2>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-muted-foreground text-[15px] md:text-base leading-relaxed mb-6 break-keep">
            SeedGlow는 '씨앗(seed)'과 '빛(glow)'을 결합한 이름입니다.
          </p>
          <p className="text-muted-foreground text-[15px] md:text-base leading-relaxed mb-6 break-keep">
            스타트업의 시드 단계(seed stage)를 의미하는 동시에,<br />
            지역 곳곳에서 자라나는 작은 혁신의 씨앗들이<br />
            스스로 빛날 수 있도록 돕는다는 뜻을 담고 있습니다.
          </p>
          <p className="text-muted-foreground text-[15px] md:text-base leading-relaxed break-keep">
            SeedGlow는 단순히 자문을 넘어,<br />
            스타트업이 지역이라는 토양 안에서 빛날 수 있도록<br />
            성장 구조를 설계하며 함께 걸어가는 파트너가 되고자 합니다.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 mb-20">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <img
              src={profileImage.src}
              srcSet={profileImage.srcSet}
              sizes="(min-width: 1024px) 320px, (min-width: 768px) calc((100vw - 48px) / 3), (min-width: 352px) 320px, calc(100vw - 32px)"
              width={profileImage.width}
              height={profileImage.height}
              alt="시드글로우 김민주 대표 프로필 사진 - 로컬 스타트업 컨설턴트"
              loading="lazy"
              decoding="async"
              className="w-full max-w-xs mx-auto rounded-md object-cover"
            />
          </div>

          <div className="w-full md:w-2/3 space-y-3">
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">Founder</p>
              <h3 className="text-2xl md:text-3xl font-bold">{founderIntro.name}</h3>
            </div>
            
            <div className="space-y-2">
              <p className="text-primary font-semibold text-lg">{founderIntro.title}</p>
              <p className="text-muted-foreground">{founderIntro.previousTitle}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">핵심 분야</h4>
              <div className="flex flex-wrap gap-2">
                {founderIntro.coreWork.map((work) => (
                  <Badge key={work} variant="secondary">{work}</Badge>
                ))}
              </div>
            </div>
            <div className="space-y-3 pt-3 border-t border-border/50">
              {founderIntro.paragraphs.map((text) => (
                <p key={text} className="text-muted-foreground text-[15px] leading-relaxed break-keep">
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
        <HistorySection embedded />
      </div>
    </section>
  );
}
