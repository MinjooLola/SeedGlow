import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  TrendingUp,
  Users,
  Target,
  Rocket,
  Handshake,
  ArrowRight,
} from "lucide-react";

interface Service {
  icon: typeof Lightbulb;
  title: string;
  description: string;
  features: string[];
}

const services: Service[] = [
  {
    icon: Lightbulb,
    title: "비즈니스 컨설팅",
    description:
      "사업 모델 검증부터 성장 전략 수립까지 스타트업의 모든 단계를 지원합니다.",
    features: ["시장 분석", "비즈니스 모델 개선", "성장 전략 수립"],
  },
  {
    icon: TrendingUp,
    title: "투자 유치 지원",
    description:
      "IR 자료 작성, 투자자 네트워킹, 협상 지원 등 투자 유치의 전 과정을 함께합니다.",
    features: ["IR 자료 작성", "투자자 매칭", "딜 클로징 지원"],
  },
  {
    icon: Users,
    title: "팀 빌딩",
    description:
      "핵심 인재 채용부터 조직 문화 구축까지 강한 팀을 만드는 것을 돕습니다.",
    features: ["인재 채용 전략", "조직 문화 설계", "리더십 코칭"],
  },
  {
    icon: Target,
    title: "마케팅 전략",
    description:
      "타겟 고객 분석부터 브랜딩, 디지털 마케팅까지 효과적인 성장을 지원합니다.",
    features: ["고객 분석", "브랜드 전략", "디지털 마케팅"],
  },
  {
    icon: Rocket,
    title: "스케일업 지원",
    description:
      "성장 단계의 스타트업을 위한 확장 전략과 운영 효율화를 지원합니다.",
    features: ["확장 전략", "운영 최적화", "해외 진출 지원"],
  },
  {
    icon: Handshake,
    title: "네트워킹",
    description:
      "업계 전문가, 잠재 파트너, 투자자 등과의 연결을 통해 성장 기회를 만듭니다.",
    features: ["투자자 네트워크", "파트너십 연결", "멘토링 프로그램"],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            스타트업 성장을 위한 전문 서비스
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            300팀 이상의 컨설팅 경험을 바탕으로 각 스타트업에 최적화된 맞춤
            솔루션을 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover-elevate transition-transform duration-200"
              data-testid={`card-service-${index}`}
            >
              <CardHeader>
                <div className="p-3 rounded-md bg-primary/10 w-fit mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="ghost"
                  className="gap-2 p-0 h-auto text-primary"
                  data-testid={`button-service-detail-${index}`}
                  onClick={() =>
                    console.log(`Learn more about ${service.title}`)
                  }
                >
                  자세히 보기
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
