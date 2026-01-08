import { Badge } from "@/components/ui/badge";
import { Sparkles, Target, CheckCircle, Mic, GraduationCap, ClipboardCheck } from "lucide-react";
import profileImage from "@assets/김민주_프로필_240525_1765811099605.png";

const lectures = [
  "SK하이닉스 하이로컬 이천 프로그램 로컬 창업 강연",
  "제주대학교 학생창업팀 로컬 창업 비즈니스모델 개발 전략 강의",
  "동국대학교 학생창업팀 비즈니스모델 고도화 강연",
  "연세대학교 글로벌 MBA 제주 스타트업 투자전략 강연",
  "동덕여자대학교 학생창업팀 비즈니스모델 고도화 강연",
  "울산문화관광재단 비즈니스모델 개발 전략 강의",
  "대구창조경제혁신센터 로컬 창업 비즈니스 전략 강의",
  "대구대학교 학생창업팀 인큐베이팅 캠프 강연",
  "경북경제진흥원 K-로컬창업스쿨 사업기획 및 BM 고도화 특강",
  "중소벤처기업부 장인학교(1~2기) IR 피칭 특강",
  "중소벤처기업부 강한소상공인 OT 사업기획 고도화 강연",
  "안산시 공무원 디자인씽킹 문제해결 워크숍 강연",
  "제주도시재생지원센터 청년인사이트 로컬·소셜임팩트 강연",
  "고려대학교 캠퍼스타운 디자인씽킹 워크숍 강연",
  "제2회 국제 Smart 농업엑스포 한국ESG학회 강연",
  "행정안전부 청년마을(의성) 로컬러닝랩 강연",
  "기업가정신재단 임팩트 스트리밍 캠퍼스 강연",
  "제주대학교 기후위기와 ESG 강연",
  "제주더큰내일센터 문제정의 해커톤 강연",
  "부산지역사회보장협의체 디자인씽킹 워크숍 강연",
  "의성군 Us:Code 청년개발자 컨퍼런스 로컬 창업 강연",
  "로컬임팩트세미나 「Z세대가 성장하는 로컬」 강연",
];

const consulting = [
  "해양수산부 해양수산 액셀러레이팅 프로그램 창업기업 컨설팅",
  "경상북도경제진흥원 경북 창업기업 IR 컨설팅",
  "안동시 창업경진대회 예비·초기창업자 컨설팅",
  "대구광역시·대구테크노파크 로컬벤처 컨설팅",
  "사회적협동조합 menTory 실전 IR 피칭 컨설팅",
  "서울시립대학교 기후테크 해커톤 외국인 창업팀 컨설팅",
  "한국외국어대학교 글로벌창업지원단 입주기업 컨설팅",
  "제주대학교 초기창업패키지 기업진단 컨설팅",
  "신한스퀘어브릿지 제주 집합적임팩트 연합팀 컨설팅",
  "카카오 제주임팩트챌린지 디자인씽킹 컨설팅",
  "행정안전부 청년마을(부안·의성) BM 컨설팅",
  "제주도청 청년업토링 프로그램 소셜임팩트 분야 컨설팅",
  "한국엔젤투자협회 Be 글로컬 히어로 로컬크리에이터 IR 컨설팅",
  "제주국제자유도시개발센터 Route330 ICT 액셀러레이팅 기획·운영",
  "부산창조경제혁신센터 소셜벤처 글로벌 진출 지원 액셀러레이팅 기획·운영",
  "제주도청 청년창업 스케일업 액셀러레이팅 기획·운영",
  "제주창조경제혁신센터 ESG 오픈이노베이션 액셀러레이팅 기획·운영",
  "한국예탁결제원 K-Camp 제주 액셀러레이팅 기획·운영",
  "메트라이프 Inclusion Plus 액셀러레이팅 운영",
];

const judging = [
  "SK하이닉스 하이로컬 이천 프로그램 IR 심사",
  "경상북도경제진흥원 경북 창업기업 IR 피칭데이 심사",
  "제주창조경제혁신센터 인베스터데이 IR 심사",
  "제주창조경제혁신센터 아이디어 피칭데이 심사",
  "한국외국어대학교 벤처스타트업아카데미 해커톤 심사",
  "서울시립대학교 글로벌 임팩트업 데모데이 심사",
  "사회적협동조합 menTory 성과공유회 심사",
  "산학연협력 선도대학 LINC3.0 SAH4차 미래상상대회 심사",
  "대구콘텐츠기업지원센터 IR 인베스트콘 심사",
  "현대모비스 ESG 아이디어톤·임팩트 아이디어 챌린지 심사",
  "한국임업진흥원 포레스트 소셜챌린저 심사",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 lg:py-36 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16 md:mb-20">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/10">
            ABOUT SEEDGLOW
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            회사 소개
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          <div className="flex flex-col items-center lg:items-start order-2 lg:order-1">
            <div className="relative w-full max-w-md">
              <img
                src={profileImage}
                alt="김민주 대표"
                className="w-full rounded-md object-cover aspect-[4/5]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-md">
                <h3 className="text-2xl font-bold text-white mb-1">김민주</h3>
                <p className="text-primary font-medium">대표 / 컨설턴트</p>
              </div>
            </div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="p-8 rounded-md bg-background border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold">시드글로우(SeedGlow)</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                'Seed(씨앗)'와 'Glow(빛나다)'의 결합입니다. 시드 단계의 스타트업이 지역이라는 토양 안에서 스스로 빛날 수 있도록 성장 구조를 설계하는 파트너가 되고자 합니다.
              </p>
              <div className="pt-4 border-t border-border">
                <p className="text-muted-foreground text-sm">(전) 스타트업 투자사/액셀러레이터 팀장</p>
              </div>
            </div>

            <div className="p-8 rounded-md bg-background border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold">우리가 하는 일의 기준</h3>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  지역마다 산업 구조도, 시장 규모도, 성장 속도도 다릅니다. 서울의 공식은 로컬에서 통하지 않습니다.
                </p>
                <p className="font-medium text-foreground">SeedGlow는</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    지역 시장 구조 분석
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    로컬 자원 기반 BM 설계
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    실행 가능한 성장 전략
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    투자로 이어지는 IR 구조
                  </li>
                </ul>
                <p>
                  를 통해 로컬 스타트업이 '지원사업 이후'에도 살아남는 구조를 만듭니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-md bg-background border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-md bg-primary/10">
                <Mic className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-bold text-lg">강의</h4>
            </div>
            <ul className="space-y-2 max-h-80 overflow-y-auto">
              {lectures.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-md bg-background border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-md bg-primary/10">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-bold text-lg">컨설팅</h4>
            </div>
            <ul className="space-y-2 max-h-80 overflow-y-auto">
              {consulting.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-md bg-background border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-md bg-primary/10">
                <ClipboardCheck className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-bold text-lg">심사</h4>
            </div>
            <ul className="space-y-2 max-h-80 overflow-y-auto">
              {judging.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
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
