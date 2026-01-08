import { Badge } from "@/components/ui/badge";
import {
  Lightbulb,
  Palette,
  TrendingUp,
  MapPin,
  Network,
  Rocket,
  CheckCircle,
  FileText,
} from "lucide-react";

const roadmapSteps = [
  {
    step: "01",
    icon: Lightbulb,
    title: "BM 확립 및 고도화",
    subtitle: "\"이 사업은 왜 존재하는가\"를 구조화합니다",
    details: [
      "시장·고객·문제 정의 재정의",
      "수익 구조 및 단가 설계",
      "경쟁 구조 분석 및 차별화 포인트 도출",
      "지원사업용 BM → 투자 가능한 BM 전환",
    ],
    results: [
      "구조화된 BM 캔버스",
      "핵심 가설 및 검증 전략",
      "투자자 관점 사업 설명 구조",
    ],
  },
  {
    step: "02",
    icon: Palette,
    title: "로컬 브랜딩",
    subtitle: "로컬을 '스토리'가 아닌 '전략'으로 씁니다",
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
    icon: TrendingUp,
    title: "IR 전략 및 투자 연계",
    subtitle: "투자자가 이해하는 언어로 바꿉니다",
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
    description: "지역별 산업 구조, 소비자 특성, 정책 환경을 분석해 '이 지역에서 가능한 성장 경로'를 정의합니다.",
  },
  {
    icon: Network,
    title: "로컬 생태계 연결",
    description: "지자체·기관·대학·로컬 투자자와의 실제 작동하는 네트워크를 연결합니다.",
  },
  {
    icon: Rocket,
    title: "실행 중심 컨설팅",
    description: "보고서로 끝나지 않고 MVP·고객·IR까지 실행 가능한 단계로 함께 만듭니다.",
  },
];

function GrowthGraph() {
  return (
    <div className="flex justify-center mb-16">
      <div className="relative w-full max-w-2xl">
        <svg viewBox="0 0 400 120" className="w-full h-auto">
          <defs>
            <linearGradient id="graphGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(43, 96%, 56%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(43, 96%, 56%)" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          
          <path
            d="M 20 100 Q 80 95 120 80 Q 160 65 200 55 Q 260 40 320 25 L 380 15"
            fill="none"
            stroke="hsl(43, 96%, 56%)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          <path
            d="M 20 100 Q 80 95 120 80 Q 160 65 200 55 Q 260 40 320 25 L 380 15 L 380 100 L 20 100 Z"
            fill="url(#graphGradient)"
          />
          
          <circle cx="120" cy="80" r="8" fill="hsl(43, 96%, 56%)" />
          <circle cx="200" cy="55" r="8" fill="hsl(43, 96%, 56%)" />
          <circle cx="320" cy="25" r="8" fill="hsl(43, 96%, 56%)" />
          
          <text x="120" y="110" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">01</text>
          <text x="200" y="110" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">02</text>
          <text x="320" y="110" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">03</text>
        </svg>
        
        <div className="flex justify-between px-8 mt-2">
          <div className="text-center flex-1">
            <p className="text-xs text-amber-200/70">BM 확립</p>
          </div>
          <div className="text-center flex-1">
            <p className="text-xs text-amber-200/70">로컬 브랜딩</p>
          </div>
          <div className="text-center flex-1">
            <p className="text-xs text-amber-200/70">IR/투자</p>
          </div>
        </div>
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
            <p className="text-amber-200/80 text-lg max-w-2xl mx-auto">
              SeedGlow는 스타트업의 단계에 따라 3단계 성장 구조로 개입합니다.
            </p>
          </div>

          <GrowthGraph />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 md:mb-28">
            {roadmapSteps.map((step, index) => (
              <div
                key={index}
                className="group relative"
                data-testid={`card-roadmap-${index}`}
              >
                <div className="p-8 rounded-md bg-amber-900/50 border border-amber-700/50 hover-elevate h-full">
                  <div className="flex items-start gap-4 mb-6">
                    <span className="text-5xl font-bold text-primary/80">{step.step}</span>
                    <div className="p-3 rounded-md bg-primary/10 mt-2">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-primary/80 text-sm mb-4">{step.subtitle}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-amber-100">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-amber-700/50">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-white">결과물</span>
                    </div>
                    <ul className="space-y-1">
                      {step.results.map((result, i) => (
                        <li key={i} className="text-sm text-amber-200/70">
                          • {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/10">
              CORE APPROACH
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              SeedGlow의 핵심 접근 방식
            </h3>
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
                <p className="text-amber-200/70 text-sm leading-relaxed">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
