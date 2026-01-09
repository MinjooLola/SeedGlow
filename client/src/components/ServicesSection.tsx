import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Network,
  Rocket,
} from "lucide-react";

const roadmapSteps = [
  {
    step: "01",
    title: "BM 확립 및 고도화",
    subtitleLines: ["좋은 아이디어를,", "사라지지 않는 사업으로 바꿉니다"],
    details: [
      "시장·고객·문제 정의 재정의",
      "수익 구조 및 단가 설계",
      "경쟁 구조 분석·차별화 포인트 도출",
      "지원사업용 BM → 투자 가능한 BM",
    ],
    results: [
      "구조화된 BM 캔버스",
      "핵심 가설 및 검증 전략",
      "투자자 관점 사업 설명 구조",
    ],
  },
  {
    step: "02",
    title: "로컬 브랜딩",
    subtitleLines: ["로컬을 '스토리'를 넘어", "'전략'으로 씁니다"],
    details: [
      "지역 자원의 사업적 활용 방식 설계",
      "로컬 정체성 기반 브랜드 포지셔닝",
      "타깃 고객 관점 메시지 정리",
      "로컬 시장 맞춤 마케팅 구조 설계",
    ],
    results: [
      "브랜드 핵심 메시지",
      "로컬 차별화 포인트 정의",
      "시장 진입 전략",
    ],
  },
  {
    step: "03",
    title: "IR 전략 및 투자 연계",
    subtitleLines: ["투자자가 원하는", "IR 언어로 재설계합니다"],
    details: [
      "IR 덱 구조 설계 및 스토리라인 정리",
      "투자 포인트 및 리스크 정리",
      "피칭 코칭 및 질의응답 대응 전략",
      "단계·분야별 투자자 연결",
    ],
    results: [
      "IR Deck (투자자 기준)",
      "피칭 스크립트",
      "투자자 미팅 전략",
    ],
  },
];

const coreActivities = [
  {
    icon: MapPin,
    title: "로컬 시장·자원 분석",
    description: "지역별 산업 구조와 소비자 특성,\n정책 환경과 주요 자원을 분석해\n'지속가능한 성장 경로'를 정의합니다.",
  },
  {
    icon: Network,
    title: "로컬 생태계 연결",
    description: "지자체·기관·대학·투자자와의\n실제 작동하는 네트워크를\n연결하고 협력합니다.",
  },
  {
    icon: Rocket,
    title: "실행 중심 컨설팅",
    description: "보고서로 끝나지 않고\nMVP·고객검증·IR까지\n실행하는 과정을 함께합니다.",
  },
];

function GrowthGraphHorizontal() {
  return (
    <div className="mb-16">
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-4xl">
          <svg viewBox="0 0 600 100" className="w-full h-auto">
            <defs>
              <linearGradient id="graphGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(43, 96%, 56%)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(43, 96%, 56%)" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            
            <path
              d="M 50 80 Q 150 70 200 55 Q 300 35 400 25 L 550 10"
              fill="none"
              stroke="hsl(43, 96%, 56%)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            
            <path
              d="M 50 80 Q 150 70 200 55 Q 300 35 400 25 L 550 10 L 550 80 L 50 80 Z"
              fill="url(#graphGradient)"
            />
            
            <circle cx="150" cy="65" r="10" fill="hsl(43, 96%, 56%)" />
            <circle cx="300" cy="40" r="10" fill="hsl(43, 96%, 56%)" />
            <circle cx="480" cy="15" r="10" fill="hsl(43, 96%, 56%)" />
            
            <text x="150" y="95" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">01</text>
            <text x="300" y="95" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">02</text>
            <text x="480" y="95" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">03</text>
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roadmapSteps.map((step, index) => (
          <div
            key={index}
            className="text-center p-6 rounded-md bg-amber-900/30 border border-amber-700/30"
            data-testid={`card-roadmap-${index}`}
          >
            <div className="flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-primary">{step.step}</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
            <div className="text-primary/80 text-sm mb-4">
              {step.subtitleLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < step.subtitleLines.length - 1 && <br />}
                </span>
              ))}
            </div>
            
            <ul className="text-left space-y-1 mb-4">
              {step.details.map((detail, i) => (
                <li key={i} className="text-xs text-amber-100/80 flex items-start gap-2">
                  <span className="text-primary mt-0.5">-</span>
                  {detail}
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-amber-700/30 text-left">
              <p className="text-xs font-medium text-white mb-2">결과물</p>
              <ul className="space-y-1">
                {step.results.map((result, i) => (
                  <li key={i} className="text-xs text-amber-200/60">
                    - {result}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="bg-gradient-to-b from-amber-950 to-amber-900">
      <div className="py-20 md:py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/10">
              GROWTH ROADMAP
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              로컬 스타트업 성장 로드맵
            </h2>
            <p className="text-amber-200/80 text-base md:text-lg max-w-2xl mx-auto break-keep">
              SeedGlow는 스타트업의 단계에 따라 3단계 성장 구조로 개입합니다.
            </p>
          </div>

          <GrowthGraphHorizontal />

          <div className="text-center mb-8 mt-20">
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/10">
              CORE APPROACH
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              SeedGlow의 핵심 접근 방식
            </h3>
            <div className="max-w-3xl mx-auto space-y-3 mb-12">
              <p className="text-amber-200/80 text-sm md:text-base break-keep">
                서울의 공식은 로컬에서 통하지 않습니다.<br />
                지역마다 산업 구조도, 시장 규모도, 성장 속도도 다릅니다.
              </p>
              <p className="text-amber-200/80 text-sm md:text-base break-keep">
                SeedGlow는 지역별 시장과 자원을 분석해 BM을 재설계하고<br />
                투자 및 오픈이노베이션 연계를 통해 실질적 결과를 만들어내며<br />
                모든 실행 과정에 지속적으로 함께 합니다.
              </p>
              <p className="text-amber-200/80 text-sm md:text-base break-keep">
                로컬 스타트업이 '지원사업 이후'에도<br />
                스스로 살아남는 구조를 만듭니다.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreActivities.map((activity, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-md bg-amber-900/50 border border-amber-700/50 hover-elevate"
                data-testid={`card-activity-${index}`}
              >
                <div className="mx-auto p-4 rounded-full bg-primary/10 w-fit mb-5">
                  <activity.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-bold text-lg text-white mb-3">{activity.title}</h4>
                <p className="text-amber-200/70 text-xs md:text-sm leading-relaxed whitespace-pre-line">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
