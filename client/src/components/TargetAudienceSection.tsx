import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const targetAudiences = [
  {
    title: "BM 정체형",
    descriptionLines: [
      "지역 기반으로 사업을 시작했지만",
      "BM이 '로컬 지원사업용' 수준에",
      "머물러 있는 팀"
    ],
  },
  {
    title: "시장 불명확형",
    descriptionLines: [
      "제품·서비스는 있으나",
      "시장과 고객 세분화가",
      "불명확한 팀"
    ],
  },
  {
    title: "스토리 단절형",
    descriptionLines: [
      "지역 자원·스토리는 있지만",
      "사업성과 투자 논리로",
      "연결되지 않는 팀"
    ],
  },
  {
    title: "IR 미설득형",
    descriptionLines: [
      "IR 자료는 만들었으나",
      "왜 투자받아야 하는지",
      "설명되지 않는 팀"
    ],
  },
  {
    title: "전략 부재형",
    descriptionLines: [
      "지자체·기관 사업은",
      "반복 참여하지만",
      "스스로 성장 전략을 만들지 못한 팀"
    ],
  },
];

function PentagonWithLabels() {
  const centerX = 300;
  const centerY = 210;
  const outerRadius = 95;
  const labelDistance = 50;
  
  const getPoint = (index: number, radius: number) => {
    const angle = (index * 72 - 90) * (Math.PI / 180);
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  const pentagonPoints = Array.from({ length: 5 }, (_, i) => getPoint(i, outerRadius));
  const pentagonPath = pentagonPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  const labelConfigs = [
    { align: "center", xOffset: -80, yOffset: -labelDistance - 50 },
    { align: "left", xOffset: labelDistance, yOffset: -25 },
    { align: "left", xOffset: labelDistance - 10, yOffset: 5 },
    { align: "right", xOffset: -labelDistance - 160, yOffset: 5 },
    { align: "right", xOffset: -labelDistance - 160, yOffset: -25 },
  ];

  return (
    <div className="flex justify-center mb-12">
      <div className="relative w-full max-w-2xl">
        <svg viewBox="0 0 600 420" className="w-full h-auto">
          <defs>
            <linearGradient id="pentagonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(43, 96%, 56%)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="hsl(43, 96%, 56%)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          <path
            d={pentagonPath}
            fill="url(#pentagonGradient)"
            stroke="hsl(43, 96%, 56%)"
            strokeWidth="2"
            strokeOpacity="0.5"
          />
          
          {pentagonPoints.map((point, index) => {
            const config = labelConfigs[index];
            return (
              <g key={index}>
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={point.x}
                  y2={point.y}
                  stroke="hsl(43, 96%, 56%)"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                />
                
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="28"
                  fill="hsl(var(--card))"
                  stroke="hsl(43, 96%, 56%)"
                  strokeWidth="2"
                />
                
                <text
                  x={point.x}
                  y={point.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="hsl(43, 96%, 56%)"
                  fontSize="10"
                  fontWeight="bold"
                >
                  {targetAudiences[index].title}
                </text>
                
                <foreignObject
                  x={point.x + config.xOffset}
                  y={point.y + config.yOffset}
                  width="160"
                  height="60"
                >
                  <div 
                    className="text-muted-foreground"
                    style={{ 
                      fontSize: '11px',
                      lineHeight: '1.4',
                      textAlign: config.align as "left" | "right" | "center"
                    }}
                  >
                    {targetAudiences[index].descriptionLines.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < targetAudiences[index].descriptionLines.length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </foreignObject>
              </g>
            );
          })}
          
          <circle
            cx={centerX}
            cy={centerY}
            r="32"
            fill="hsl(43, 96%, 56%)"
            fillOpacity="0.5"
            stroke="hsl(43, 96%, 56%)"
            strokeWidth="3"
          />
          <text
            x={centerX}
            y={centerY - 8}
            textAnchor="middle"
            fill="hsl(43, 96%, 35%)"
            fontSize="12"
            fontWeight="bold"
          >
            성장
          </text>
          <text
            x={centerX}
            y={centerY + 10}
            textAnchor="middle"
            fill="hsl(43, 96%, 35%)"
            fontSize="12"
            fontWeight="bold"
          >
            정체
          </text>
        </svg>
      </div>
    </div>
  );
}

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

        <PentagonWithLabels />

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
