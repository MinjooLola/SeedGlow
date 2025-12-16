import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, GraduationCap, Mic, ClipboardCheck } from "lucide-react";
import profileImage from "@assets/김민주_프로필_240525_1765811099605.png";

const currentRole = {
  title: "대표/컨설턴트",
  badge: "현",
  company: "시드글로우(SeedGlow)",
  responsibilities: [
    "로컬 스타트업 비즈니스모델(BM) 고도화, 브랜딩, IR 전문 컨설팅 및 강의",
    "스타트업 IR 심사 및 투자 연계",
  ],
};

const previousRole = {
  title: "팀장/선임연구원",
  badge: "전",
  company: "엠와이소셜컴퍼니(MYSC)",
  responsibilities: [
    "액셀러레이팅 프로그램 기획 및 운영 총괄(Project Manager)",
    "스타트업 컨설팅 및 투자심사 (예비~Series A)",
    "BM고도화, IR 피칭, 투자 전략, 디자인씽킹, ESG 강의 진행",
    "기관협력 오픈이노베이션 프로그램 기획 및 운영",
  ],
};

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
    <section id="about" className="py-16 md:py-24 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">
            About SeedGlow
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            회사 소개
          </h2>
        </div>

        <div className="max-w-4xl mx-auto mb-16 space-y-8">
          <Card>
            <CardContent className="p-6 md:p-8">
              <h3 className="text-xl font-bold mb-4 text-primary">SeedGlow의 의미</h3>
              <p className="text-muted-foreground leading-relaxed">
                SeedGlow는 '씨앗(seed)'과 '빛(glow)'을 결합한 이름입니다. 이는 스타트업의 시드 단계(seed stage)를 의미하는 동시에, 지역 곳곳에서 자라나는 작은 혁신의 씨앗들이 스스로 빛날 수 있도록 돕는다는 뜻을 담고 있습니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 md:p-8">
              <h3 className="text-xl font-bold mb-4 text-primary">미션과 전략</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  각 지역은 고유의 산업 구조, 인재 풀, 소비 문화가 다릅니다. 서울의 전략을 그대로 적용해서는 지속가능한 성장을 만들 수 없습니다.
                </p>
                <p>
                  SeedGlow는 로컬의 산업·문화적 특성을 기반으로 비즈니스 모델 확립 및 고도화 → 로컬 브랜딩 → IR 전략 → 투자 연결까지 지역 맞춤형 성장 로드맵을 함께 설계합니다.
                </p>
                <div className="pl-4 border-l-2 border-primary my-6">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      각 로컬의 시장 구조와 자원 흐름을 분석하고,
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      로컬 투자자·기관과의 네트워크를 연결하며,
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      초기 스타트업이 반드시 점검해야 할 실행 전략을 함께 수립합니다.
                    </li>
                  </ul>
                </div>
                <p className="font-medium text-foreground">
                  SeedGlow는 단순히 자문을 넘어 로컬 스타트업이 스스로 빛날 수 있는 생태계를 만드는 플랫폼이 되고자 합니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="relative mb-6">
                <img
                  src={profileImage}
                  alt="김민주 대표"
                  className="w-full max-w-sm mx-auto rounded-md object-cover aspect-[3/4]"
                />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-1">김민주</h3>
                <p className="text-primary font-medium mb-2">대표 / 컨설턴트</p>
                <p className="text-sm text-muted-foreground">
                  로컬 스타트업 BM 고도화 및 IR 전문가
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 rounded-md bg-primary/10">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Badge variant="default">{currentRole.badge}</Badge>
                      <h4 className="font-bold text-lg">{currentRole.title}</h4>
                    </div>
                    <p className="text-primary font-medium mb-3">{currentRole.company}</p>
                    <ul className="space-y-2">
                      {currentRole.responsibilities.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-md bg-muted">
                    <Briefcase className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Badge variant="outline">{previousRole.badge}</Badge>
                      <h4 className="font-bold text-lg">{previousRole.title}</h4>
                    </div>
                    <p className="text-muted-foreground font-medium mb-3">{previousRole.company}</p>
                    <ul className="space-y-2">
                      {previousRole.responsibilities.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="lectures" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="lectures" className="gap-2">
                  <Mic className="w-4 h-4" />
                  강의
                </TabsTrigger>
                <TabsTrigger value="consulting" className="gap-2">
                  <GraduationCap className="w-4 h-4" />
                  컨설팅
                </TabsTrigger>
                <TabsTrigger value="judging" className="gap-2">
                  <ClipboardCheck className="w-4 h-4" />
                  심사
                </TabsTrigger>
              </TabsList>

              <TabsContent value="lectures">
                <Card>
                  <CardContent className="p-4 max-h-80 overflow-y-auto">
                    <ul className="space-y-2">
                      {lectures.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm py-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="consulting">
                <Card>
                  <CardContent className="p-4 max-h-80 overflow-y-auto">
                    <ul className="space-y-2">
                      {consulting.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm py-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="judging">
                <Card>
                  <CardContent className="p-4 max-h-80 overflow-y-auto">
                    <ul className="space-y-2">
                      {judging.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm py-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
