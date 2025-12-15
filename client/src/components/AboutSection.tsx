import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import teamImage from "@assets/generated_images/seedglow_team_professional_photo.png";

const values = [
  {
    title: "지역 기반 전문성",
    description: "전국 각 지역의 스타트업 생태계를 깊이 이해하고 있습니다.",
  },
  {
    title: "실전 경험",
    description:
      "300팀 이상의 컨설팅과 26팀 투자 유치 성공 경험을 보유하고 있습니다.",
  },
  {
    title: "맞춤형 솔루션",
    description: "각 스타트업의 단계와 상황에 맞는 최적의 전략을 제시합니다.",
  },
  {
    title: "지속적 파트너십",
    description: "일회성 컨설팅이 아닌 장기적인 성장 파트너로 함께합니다.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">
              About SeedGlow
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              지역 스타트업의
              <br />
              <span className="text-primary">성장 파트너</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              SeedGlow는 2017년 설립 이후, 지역 스타트업의 성장을 지원하는 것을
              사명으로 삼아 왔습니다. 우리는 스타트업이 직면하는 다양한 도전을
              함께 극복하고, 지속 가능한 성장을 이끌어내는 것에 집중합니다.
            </p>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              단순한 조언을 넘어, 실제 결과를 만들어내는 파트너가 되기 위해
              노력합니다. 우리의 경험과 네트워크를 바탕으로, 스타트업이 다음
              단계로 도약할 수 있도록 돕습니다.
            </p>

            <div className="space-y-4 mb-8">
              {values.map((value, index) => (
                <div key={index} className="flex gap-3" data-testid={`value-${index}`}>
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {value.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              className="gap-2"
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              data-testid="button-about-contact"
            >
              함께 성장하기
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="relative">
            <div className="relative rounded-md overflow-hidden">
              <img
                src={teamImage}
                alt="SeedGlow 팀"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-md hidden md:block">
              <p className="text-4xl font-bold">8+</p>
              <p className="text-sm opacity-90">Years of Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
