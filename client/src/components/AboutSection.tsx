import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, GraduationCap, Mic, Users } from "lucide-react";
import profileImage from "@assets/김민주_프로필_240525_1765811099605.png";

const currentRole = {
  title: "대표/컨설턴트",
  company: "시드글로우(SeedGlow)",
  period: "2025.02 ~ 현재",
  responsibilities: [
    "로컬 스타트업 비즈니스모델(BM) 고도화, 브랜딩, IR 전문 컨설팅 및 강의",
    "스타트업 IR 심사 및 투자 연계",
  ],
};

const previousRole = {
  title: "팀장/선임연구원",
  company: "엠와이소셜컴퍼니(MYSC)",
  period: "2021.01 ~ 2025.02",
  responsibilities: [
    "액셀러레이팅 프로그램 기획 및 운영 총괄(Project Manager)",
    "스타트업 컨설팅 및 투자심사 (예비~Series A)",
    "BM고도화, IR 피칭, 투자 전략, 디자인씽킹, ESG 강의 진행",
    "기관협력 오픈이노베이션 프로그램 기획 및 운영",
  ],
};

const recentActivities = [
  { name: "SK하이닉스 하이로컬이천 프로그램", type: "강연/심사", date: "2025.12" },
  { name: "해양수산부 해양수산 액셀러레이팅 프로그램", type: "컨설팅", date: "2025.12" },
  { name: "경상북도경제진흥원 경북 창업기업 IR 피칭데이", type: "심사/컨설팅", date: "2025.12" },
  { name: "제주대학교 학생창업팀 로컬 창업 BM 개발 전략", type: "강의", date: "2025.12" },
  { name: "동국대학교 학생창업팀 BM 고도화", type: "강연/심사", date: "2025.11" },
  { name: "울산문화관광재단 비즈니스모델 개발 전략", type: "강의", date: "2025.11" },
];

const acceleratingPrograms = [
  { name: "제주국제자유도시개발센터 Route330 ICT 액셀러레이팅", role: "총괄 PM", period: "2021~2025" },
  { name: "부산창조경제혁신센터 소셜벤처 글로벌 진출 지원사업", role: "총괄 PM", period: "2024" },
  { name: "제주도청 청년창업스케일업 액셀러레이팅", role: "총괄 PM", period: "2024" },
  { name: "한국예탁결제원 K-Camp 제주 액셀러레이팅", role: "총괄 PM", period: "2022~2024" },
];

const judgingExperience = [
  "한국외국어대학교 벤처스타트업아카데미 해커톤 심사위원",
  "서울시립대학교 글로벌 임팩트업 데모데이 심사위원",
  "제주창조경제혁신센터 아이디어피칭데이 심사위원",
  "현대모비스 ESG아이디어톤, 임팩트아이디어챌린지 심사위원",
  "대구콘텐츠기업지원센터 투자유치 스킬업 IR 인베스트콘 심사위원",
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
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            SeedGlow는 'Seed(씨앗)'와 'Glow(빛나다)'의 합성어로,
            로컬 스타트업이 성장할 수 있도록 씨앗에서부터 함께 빛나게 하는 것을 의미합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
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
                      <h4 className="font-bold text-lg">{currentRole.title}</h4>
                      <Badge variant="secondary">{currentRole.period}</Badge>
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
                      <h4 className="font-bold text-lg">{previousRole.title}</h4>
                      <Badge variant="outline">{previousRole.period}</Badge>
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

            <Tabs defaultValue="recent" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="recent" className="gap-2">
                  <Mic className="w-4 h-4" />
                  최근 활동
                </TabsTrigger>
                <TabsTrigger value="accelerating" className="gap-2">
                  <GraduationCap className="w-4 h-4" />
                  액셀러레이팅
                </TabsTrigger>
                <TabsTrigger value="judging" className="gap-2">
                  <Users className="w-4 h-4" />
                  심사 경력
                </TabsTrigger>
              </TabsList>

              <TabsContent value="recent">
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {recentActivities.map((activity, i) => (
                        <div key={i} className="flex items-center justify-between gap-4 py-2 border-b border-border last:border-0">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{activity.name}</p>
                            <Badge variant="secondary" className="mt-1">{activity.type}</Badge>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.date}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="accelerating">
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {acceleratingPrograms.map((program, i) => (
                        <div key={i} className="flex items-center justify-between gap-4 py-2 border-b border-border last:border-0">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{program.name}</p>
                            <Badge variant="secondary" className="mt-1">{program.role}</Badge>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{program.period}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="judging">
                <Card>
                  <CardContent className="p-4">
                    <ul className="space-y-2">
                      {judgingExperience.map((item, i) => (
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
