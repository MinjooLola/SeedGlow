import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Building2, Briefcase } from "lucide-react";

// todo: remove mock functionality - replace with real data from API
interface SuccessStory {
  company: string;
  industry: string;
  description: string;
  investment: string;
  growth: string;
  stage: string;
}

const successStories: SuccessStory[] = [
  {
    company: "테크스타트",
    industry: "AI/ML",
    description:
      "AI 기반 물류 최적화 솔루션을 개발하는 스타트업. SeedGlow와 함께 시리즈 A 투자 유치에 성공했습니다.",
    investment: "15억",
    growth: "300%",
    stage: "Series A",
  },
  {
    company: "그린에너지",
    industry: "CleanTech",
    description:
      "친환경 에너지 관리 플랫폼을 운영. 비즈니스 모델 피벗 후 성공적인 투자 유치를 달성했습니다.",
    investment: "8억",
    growth: "250%",
    stage: "Pre-A",
  },
  {
    company: "헬스케어플러스",
    industry: "HealthTech",
    description:
      "디지털 헬스케어 솔루션을 제공하는 스타트업. 해외 투자자로부터 투자 유치에 성공했습니다.",
    investment: "20억",
    growth: "400%",
    stage: "Series A",
  },
  {
    company: "에듀테크원",
    industry: "EdTech",
    description:
      "AI 기반 맞춤형 학습 플랫폼을 개발. 빠른 성장과 함께 시드 투자를 유치했습니다.",
    investment: "5억",
    growth: "200%",
    stage: "Seed",
  },
];

export default function SuccessStories() {
  return (
    <section id="success" className="py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">
            Success Stories
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            함께 성장한 스타트업들
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            SeedGlow와 함께 성장하고 투자를 유치한 스타트업들의 이야기를
            확인하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {successStories.map((story, index) => (
            <Card
              key={index}
              className="group hover-elevate transition-transform duration-200"
              data-testid={`card-success-${index}`}
            >
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant="secondary">{story.industry}</Badge>
                  <Badge variant="outline">{story.stage}</Badge>
                </div>

                <h3 className="text-xl font-bold mb-3">{story.company}</h3>
                <p className="text-muted-foreground mb-6">{story.description}</p>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-lg font-bold text-primary">
                      {story.investment}
                    </p>
                    <p className="text-xs text-muted-foreground">투자 유치</p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-lg font-bold text-primary">
                      {story.growth}
                    </p>
                    <p className="text-xs text-muted-foreground">매출 성장</p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <Building2 className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-lg font-bold text-primary">
                      {story.stage}
                    </p>
                    <p className="text-xs text-muted-foreground">투자 단계</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
