import { Badge } from "@/components/ui/badge";
import {
  Lightbulb,
  Palette,
  TrendingUp,
  MapPin,
  Network,
  Rocket,
  CheckCircle,
} from "lucide-react";

const roadmapSteps = [
  {
    step: "01",
    icon: Lightbulb,
    title: "BM 확립 및 고도화",
    description: "비즈니스 모델을 체계적으로 정립하고 투자 유치가 가능한 수준으로 고도화합니다.",
    details: ["시장 분석 및 고객 검증", "수익 모델 설계", "경쟁력 분석 및 차별화 전략"],
  },
  {
    step: "02",
    icon: Palette,
    title: "로컬 브랜딩",
    description: "지역의 고유한 자원과 문화를 반영한 브랜드 아이덴티티를 수립합니다.",
    details: ["로컬 스토리텔링 개발", "지역 특화 브랜드 포지셔닝", "로컬 마케팅 전략 수립"],
  },
  {
    step: "03",
    icon: TrendingUp,
    title: "IR 전략 및 투자 연계",
    description: "투자자가 매력을 느끼는 IR 자료와 피칭 전략을 수립하고 투자자를 연결합니다.",
    details: ["IR 덱 작성 및 스토리텔링", "투자 포인트 도출 및 피칭 코칭", "투자자 네트워크 연결"],
  },
];

const coreActivities = [
  {
    icon: MapPin,
    title: "로컬 시장/자원 분석",
    description: "지역별 시장 특성과 로컬 자원을 심층 분석하여 맞춤형 전략의 기반을 마련합니다.",
  },
  {
    icon: Network,
    title: "로컬 네트워크 연결",
    description: "지자체, 지역 기업, 대학, 투자자 등 로컬 생태계 내 핵심 파트너와 연결합니다.",
  },
  {
    icon: Rocket,
    title: "초기 실행 전략 수립",
    description: "MVP 개발부터 초기 고객 확보까지 실행 가능한 단계별 전략을 함께 실행합니다.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-zinc-900 dark:bg-zinc-950">
      <div className="py-20 md:py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16 md:mb-20">
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/10">
              CONSULTING
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              3단계 성장 로드맵
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              로컬 스타트업의 성장 단계에 맞춘 체계적인 컨설팅을 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 md:mb-28">
            {roadmapSteps.map((step, index) => (
              <div
                key={index}
                className="group p-8 rounded-md bg-zinc-800/50 border border-zinc-700 hover-elevate"
                data-testid={`card-roadmap-${index}`}
              >
                <div className="flex items-start gap-4 mb-6">
                  <span className="text-5xl font-bold text-primary/80">{step.step}</span>
                  <div className="p-3 rounded-md bg-primary/10 mt-2">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-zinc-400 mb-6">{step.description}</p>
                <ul className="space-y-3">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/10">
              CORE ACTIVITIES
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              3대 핵심 활동
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreActivities.map((activity, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-md bg-zinc-800/50 border border-zinc-700 hover-elevate"
                data-testid={`card-activity-${index}`}
              >
                <div className="mx-auto p-4 rounded-full bg-primary/10 w-fit mb-5">
                  <activity.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-bold text-lg text-white mb-3">{activity.title}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
