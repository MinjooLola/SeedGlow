import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Lightbulb,
  Palette,
  TrendingUp,
  MapPin,
  Network,
  Rocket,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const roadmapSteps = [
  {
    step: 1,
    icon: Lightbulb,
    title: "BM 확립 및 고도화",
    description: "비즈니스 모델을 체계적으로 정립하고, 시장 적합성을 검증하여 투자 유치가 가능한 수준으로 고도화합니다.",
    details: ["시장 분석 및 고객 검증", "수익 모델 설계", "경쟁력 분석 및 차별화 전략"],
  },
  {
    step: 2,
    icon: Palette,
    title: "로컬 브랜딩",
    description: "지역의 고유한 자원과 문화를 반영한 브랜드 아이덴티티를 수립하고, 로컬 시장에 최적화된 브랜딩 전략을 구축합니다.",
    details: ["로컬 스토리텔링 개발", "지역 특화 브랜드 포지셔닝", "로컬 마케팅 전략 수립"],
  },
  {
    step: 3,
    icon: TrendingUp,
    title: "IR 전략 수립 및 투자 연계",
    description: "투자자가 이해하고 매력을 느끼는 IR 자료와 피칭 전략을 수립하고, 적합한 투자자를 연결합니다.",
    details: ["IR 덱 작성 및 스토리텔링", "투자 포인트 도출 및 피칭 코칭", "투자자 네트워크 연결"],
  },
];

const coreActivities = [
  {
    icon: MapPin,
    title: "로컬 시장/자원 분석",
    description: "지역별 시장 특성, 소비자 행동 패턴, 로컬 자원을 심층 분석하여 맞춤형 전략의 기반을 마련합니다.",
  },
  {
    icon: Network,
    title: "로컬 네트워크 연결",
    description: "지자체, 지역 기업, 대학, 투자자 등 로컬 생태계 내 핵심 파트너와 연결하여 성장 기반을 확보합니다.",
  },
  {
    icon: Rocket,
    title: "초기 실행 전략 수립",
    description: "MVP 개발부터 초기 고객 확보까지, 실행 가능한 단계별 전략을 수립하고 함께 실행합니다.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            서비스 / 전략
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            로컬 스타트업의 성장 단계에 맞춘 체계적인 3단계 로드맵과 핵심 활동을 제공합니다.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-xl font-bold mb-8 text-center">
            <Badge variant="secondary" className="mr-2">3단계</Badge>
            성장 로드맵
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {roadmapSteps.map((step, index) => (
              <Card
                key={index}
                className="relative group hover-elevate transition-transform duration-200"
                data-testid={`card-roadmap-${index}`}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                      {step.step}
                    </div>
                    <div className="p-2 rounded-md bg-primary/10">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                {index < roadmapSteps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-8 text-center">
            <Badge variant="secondary" className="mr-2">3대</Badge>
            핵심 활동
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {coreActivities.map((activity, index) => (
              <Card
                key={index}
                className="text-center hover-elevate transition-transform duration-200"
                data-testid={`card-activity-${index}`}
              >
                <CardContent className="pt-8 pb-6">
                  <div className="mx-auto p-4 rounded-full bg-primary/10 w-fit mb-4">
                    <activity.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-bold text-lg mb-3">{activity.title}</h4>
                  <p className="text-muted-foreground text-sm">{activity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
