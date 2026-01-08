import { Badge } from "@/components/ui/badge";

const partners = [
  "SK하이닉스",
  "해양수산부",
  "경상북도경제진흥원",
  "제주대학교",
  "동국대학교",
  "동덕여자대학교",
  "울산문화관광재단",
  "대구창조경제혁신센터",
  "안동시",
  "제주창조경제혁신센터",
  "대구광역시",
  "대구테크노파크",
  "사회적협동조합 menTory",
  "중소벤처기업부",
  "안산시",
  "대구대학교",
  "경북경제진흥원",
  "연세대학교",
  "서울시립대학교",
  "엠와이소셜컴퍼니(MYSC)",
  "한국외국어대학교",
  "대구콘텐츠기업지원센터",
  "현대모비스",
  "한국임업진흥원",
  "제주도시재생지원센터",
  "고려대학교",
  "행정안전부",
  "제주더큰내일센터",
  "유디임팩트",
  "창업진흥원",
];

export default function PartnersSection() {
  return (
    <section className="py-16 md:py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/10">
            PARTNERS
          </Badge>
          <h3 className="text-2xl md:text-3xl font-bold">30+ 협력기관과 함께합니다</h3>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="px-4 py-2 rounded-md bg-background border border-border text-sm font-medium text-muted-foreground"
              data-testid={`partner-${index}`}
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
