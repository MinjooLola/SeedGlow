import { Badge } from "@/components/ui/badge";
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
  "제주도시재생지원센터 청년인사이트 로컬·소셜임팩트 강연",
  "행정안전부 청년마을(의성) 로컬러닝랩 강연",
  "의성군 Us:Code 컨퍼런스 로컬 창업 세션 모더레이터",
  "로컬임팩트세미나 「Z세대가 성장하는 로컬」 모더레이터",
  "그외 각종 기관 창업 강연/모더레이팅 이력 다수",
];

const consulting = [
  "제주대학교 RISE사업단 예비창업 BM 컨설팅",
  "해양수산부 해양수산 액셀러레이팅 프로그램 창업기업 컨설팅",
  "경상북도경제진흥원 경북 창업기업 IR 컨설팅",
  "안동시 창업경진대회 예비·초기창업자 컨설팅",
  "대구광역시·대구테크노파크 로컬벤처 컨설팅",
  "사회적협동조합 menTory 실전 IR 피칭 컨설팅",
  "서울시립대학교 기후테크 해커톤 외국인 창업팀 컨설팅",
  "한국외국어대학교 글로벌창업지원단 입주기업 컨설팅",
  "제주대학교 초기창업패키지 기업진단 컨설팅",
  "신한스퀘어브릿지 제주 집합적임팩트 연합팀 컨설팅",
  "행정안전부 청년마을(부안·의성) BM 컨설팅",
  "한국엔젤투자협회 Be 글로컬 히어로 로컬크리에이터 IR 컨설팅",
  "제주국제자유도시개발센터 Route330 ICT 액셀러레이팅 1~3기 참여기업 컨설팅",
  "제주도청 청년창업 스케일업 액셀러레이팅 참여기업 컨설팅",
  "한국예탁결제원 K-Camp 제주 액셀러레이팅 1~3기 참여기업 컨설팅",
  "그외 각종 기관 창업 컨설팅/기업 개별 컨설팅 이력 다수",
];

const judging = [
  "창업진흥원 사업계획서 작성 스프린트캠프 IR 심사 및 멘토링",
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
  "제주국제자유도시개발센터 Route330 ICT 액셀러레이팅 1~4기 선발심사",
  "한국예탁결제원 K-Camp 제주 액셀러레이팅 1~3기 선발 심사",
  "그외 각종 기관 투자 심사 및 지원사업 심사 다수",
];

const coreWork = [
  "BM 고도화",
  "로컬 브랜딩",
  "IR 전략",
  "투자 연계",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 lg:py-36 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/10">
            ABOUT SEEDGLOW
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            회사 소개
          </h2>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 break-keep">
            SeedGlow는 '씨앗(seed)'과 '빛(glow)'을 결합한 이름입니다.
          </p>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 break-keep">
            스타트업의 시드 단계(seed stage)를 의미하는 동시에,<br />
            지역 곳곳에서 자라나는 작은 혁신의 씨앗들이<br />
            스스로 빛날 수 있도록 돕는다는 뜻을 담고 있습니다.
          </p>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed break-keep">
            SeedGlow는 단순히 자문을 넘어,<br />
            스타트업이 지역이라는 토양 안에서 빛날 수 있도록<br />
            성장 구조를 설계하며 함께 걸어가는 파트너가 되고자 합니다.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 mb-20">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <img
              src={profileImage}
              alt="김민주 대표"
              className="w-full max-w-xs mx-auto rounded-md object-cover"
            />
          </div>

          <div className="w-full md:w-2/3 space-y-3">
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">Founder</p>
              <h3 className="text-2xl md:text-3xl font-bold">김민주</h3>
            </div>
            
            <div className="space-y-2">
              <p className="text-primary font-semibold text-lg">시드글로우(SeedGlow) 대표 / 컨설턴트</p>
              <p className="text-muted-foreground">(前) 스타트업 투자사·액셀러레이터 팀장</p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">핵심 분야</h4>
              <div className="flex flex-wrap gap-2">
                {coreWork.map((work, i) => (
                  <Badge key={i} variant="secondary">{work}</Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-border/50">
              <p className="text-muted-foreground text-sm leading-relaxed break-keep">
                제주, 대구, 부산, 경주, 의성, 광주, 안동, 울릉, 부안, 이천 등 지역의 문제를 해결하는 300개 이상의 스타트업이 고객의 진짜 니즈를 바탕으로 아이템을 찾고 이를 비즈니스로 만들어가는 여정을 함께 해왔습니다.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed break-keep">
                일회성 컨설팅보다는 제로투원을 함께 하는 페이스메이커로서, 혼자서 가기 힘든 길을 같이 걸으며 문제를 해결해 나갑니다.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6">
            <h4 className="font-bold text-base mb-4">강의</h4>
            <ul className="space-y-1.5">
              {lectures.map((item, i) => (
                <li key={i} className="text-xs text-muted-foreground leading-relaxed break-keep">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6">
            <h4 className="font-bold text-base mb-4">컨설팅</h4>
            <ul className="space-y-1.5">
              {consulting.map((item, i) => (
                <li key={i} className="text-xs text-muted-foreground leading-relaxed break-keep">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6">
            <h4 className="font-bold text-base mb-4">심사</h4>
            <ul className="space-y-1.5">
              {judging.map((item, i) => (
                <li key={i} className="text-xs text-muted-foreground leading-relaxed break-keep">
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
