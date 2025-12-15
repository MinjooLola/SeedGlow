import { Card, CardContent } from "@/components/ui/card";

// todo: remove mock functionality - replace with real partner logos
const partners = [
  "SK하이닉스",
  "해양수산부",
  "경상북도경제진흥원",
  "제주대학교",
  "동국대학교",
  "동덕여자대학교",
  "울산문화관광재단",
  "대구창조경제혁신센터",
  "제주창조경제혁신센터",
  "부산창조경제혁신센터",
  "중소벤처기업부",
  "한국예탁결제원",
  "현대모비스",
  "연세대학교",
  "고려대학교",
  "서울시립대학교",
  "한국외국어대학교",
  "제주국제자유도시개발센터",
  "대구테크노파크",
  "한국엔젤투자협회",
  "메트라이프",
  "한국임업진흥원",
  "제주도청",
  "안동시",
  "안산시",
  "의성군",
  "부안군",
  "카카오",
  "신한스퀘어브릿지",
  "행정안전부",
];

export default function PartnersSection() {
  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide">
            Trusted Partners
          </p>
          <h3 className="text-xl font-bold mt-2">40+ 협력 기관과 함께합니다</h3>
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
            animation: scroll 40s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
}
