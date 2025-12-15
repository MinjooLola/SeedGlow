import { Card, CardContent } from "@/components/ui/card";

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
];

export default function PartnersSection() {
  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide">
            Trusted Partners
          </p>
          <h3 className="text-xl font-bold mt-2">{partners.length}+ 협력 기관과 함께합니다</h3>
        </div>

        <div className="overflow-hidden relative">
          <div className="flex animate-scroll gap-6">
            {[...partners, ...partners].map((partner, index) => (
              <Card
                key={index}
                className="flex-shrink-0 bg-background/80"
              >
                <CardContent className="px-6 py-4 flex items-center justify-center min-w-[180px]">
                  <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                    {partner}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 60s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
}
