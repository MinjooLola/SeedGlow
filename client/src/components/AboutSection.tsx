import { Badge } from "@/components/ui/badge";
import profileImage from "@assets/김민주_프로필_240525_1765811099605.png";
import {
  myscAcceleratingExperiences,
  myscJudgingExperiences,
  myscTeachingConsultingExperiences,
  resumeRoleDetails,
  seedGlowExperiences,
  type ResumeExperience,
} from "@/data/resumeExperiences";

function ExperienceList({
  items,
  label,
}: {
  items: ResumeExperience[];
  label: string;
}) {
  return (
    <ol
      aria-label={label}
      className="grid grid-cols-1 lg:grid-cols-2 gap-x-8"
    >
      {items.map((item, index) => (
        <li
          key={`${item.period}-${item.text}-${index}`}
          className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3 border-b border-border/50 py-2 text-xs leading-relaxed"
        >
          <span className="text-muted-foreground tabular-nums">{item.period}</span>
          <span className="break-keep">{item.text}</span>
        </li>
      ))}
    </ol>
  );
}

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
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 break-keep">
            SeedGlow는 '씨앗(seed)'과 '빛(glow)'을 결합한 이름입니다.
          </p>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 break-keep">
            스타트업의 시드 단계(seed stage)를 의미하는 동시에,<br />
            지역 곳곳에서 자라나는 작은 혁신의 씨앗들이<br />
            스스로 빛날 수 있도록 돕는다는 뜻을 담고 있습니다.
          </p>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed break-keep">
            SeedGlow는 단순히 자문을 넘어,<br />
            스타트업이 지역이라는 토양 안에서 빛날 수 있도록<br />
            성장 구조를 설계하며 함께 걸어가는 파트너가 되고자 합니다.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 mb-20">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <img
              src={profileImage}
              alt="시드글로우 김민주 대표 프로필 사진 - 로컬 스타트업 컨설턴트"
              loading="lazy"
              className="w-full max-w-xs mx-auto rounded-md object-cover"
            />
          </div>

          <div className="w-full md:w-2/3 space-y-3">
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">Founder</p>
              <h3 className="text-2xl md:text-3xl font-bold">김민주</h3>
            </div>
            
            <div className="space-y-2">
              <p className="text-primary font-semibold text-lg">시드글로우(SeedGlow) 대표 / 컨설턴트</p>
              <p className="text-muted-foreground">(前) 스타트업 투자사·액셀러레이터 팀장</p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">핵심 분야</h4>
              <div className="flex flex-wrap gap-2">
                {coreWork.map((work, i) => (
                  <Badge key={i} variant="secondary">{work}</Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-border/50">
              <p className="text-muted-foreground text-sm leading-relaxed break-keep">
                제주, 대구, 부산, 경주, 의성, 광주, 안동, 울릉, 부안, 이천 등 지역의 문제를 해결하는 300개 이상의 스타트업이 고객의 진짜 니즈를 바탕으로 아이템을 찾고 이를 비즈니스로 만들어가는 여정을 함께 해왔습니다.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed break-keep">
                일회성 컨설팅보다는 제로투원을 함께 하는 페이스메이커로서, 혼자서 가기 힘든 길을 같이 걸으며 문제를 해결해 나갑니다.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6">
            <h4 className="font-bold text-base mb-4">강의</h4>
            <ul className="space-y-1.5">
              {lectures.map((item, i) => (
                <li key={i} className="text-xs text-muted-foreground leading-relaxed break-keep">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6">
            <h4 className="font-bold text-base mb-4">컨설팅</h4>
            <ul className="space-y-1.5">
              {consulting.map((item, i) => (
                <li key={i} className="text-xs text-muted-foreground leading-relaxed break-keep">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6">
            <h4 className="font-bold text-base mb-4">심사</h4>
            <ul className="space-y-1.5">
              {judging.map((item, i) => (
                <li key={i} className="text-xs text-muted-foreground leading-relaxed break-keep">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
