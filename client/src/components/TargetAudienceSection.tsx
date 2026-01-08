import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Package, MapPin, FileText, Building } from "lucide-react";

const targetAudiences = [
  {
    icon: Target,
    title: "BM 정체형",
    description: "지역 기반으로 사업을 시작했지만 BM이 '로컬 지원사업용' 수준에 머물러 있는 팀",
  },
  {
    icon: Package,
    title: "시장 불명확형",
    description: "제품·서비스는 있으나 시장 정의와 고객 세분화가 불명확한 팀",
  },
  {
    icon: MapPin,
    title: "스토리 단절형",
    description: "지역 자원·스토리는 있지만 사업성과 투자 논리로 연결되지 않는 팀",
  },
  {
    icon: FileText,
    title: "IR 미설득형",
    description: "IR 자료는 만들었으나 왜 투자받아야 하는지 설명되지 않는 팀",
  },
  {
    icon: Building,
    title: "전략 부재형",
    description: "지자체·기관 사업은 반복 참여하지만 스스로 성장 전략을 만들지 못한 팀",
  },
];

export default function TargetAudienceSection() {
  const scrollToServices = () => {
    const element = document.getElementById("services");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28 lg:py-36 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16 md:mb-20">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/10">
            PAIN POINTS
          </Badge>
          <p className="text-muted-foreground mb-2">300+ 로컬 스타트업을 심사하고 컨설팅하며 구조적으로 분해한</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            5가지 성장 정체 유형
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {targetAudiences.map((item, index) => (
            <div
              key={index}
              className="group p-6 rounded-md bg-card border border-border hover-elevate text-center"
              data-testid={`card-target-${index}`}
            >
              <div className="mx-auto p-4 rounded-full bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-foreground">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center p-8 rounded-md bg-card border border-border">
          <p className="text-lg md:text-xl mb-6">
            SeedGlow는 '아이디어를 다듬는 컨설팅'이 아니라<br />
            <span className="font-bold text-primary">성장과 투자로 이어지는 구조</span>를 만드는 컨설팅을 합니다.
          </p>
          <Button onClick={scrollToServices} className="gap-2" data-testid="button-view-services">
            성장 로드맵 보기
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
