import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

const interviews = [
  {
    publisher: "비로컬",
    headline: "기존의 방식과 공식을 뒤집는 로컬 스타트업 전문 컨설팅 기업, 시드글로우 김민주 대표",
    href: "https://www.belocal.kr/news/articleView.html?idxno=2244496",
    image: "/images/interviews/belocal.webp",
    imageAlt: "비로컬 인터뷰에 실린 김민주 대표 사진",
  },
  {
    publisher: "소셜임팩트뉴스",
    headline: "서울에 있었다면 알지 못했을 기회들…제주에서 초고속 성장한 ‘일잘러’",
    href: "https://www.socialimpactnews.net/news/articleView.html?idxno=6939",
    image: "/images/interviews/socialimpact.webp",
    imageAlt: "소셜임팩트뉴스 기사에 실린 강연 사진",
  },
];

export default function InterviewSection() {
  return (
    <section id="interviews" className="scroll-mt-24 bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 text-center md:mb-12">
          <Badge variant="outline" className="mb-4 border-primary/50 bg-primary/10 text-primary">
            INTERVIEWS
          </Badge>
          <h2 className="text-3xl font-bold md:text-4xl">인터뷰</h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {interviews.map((article, index) => (
            <a
              key={article.href}
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`link-interview-${index}`}
              aria-label={`${article.publisher}: ${article.headline} — 새 창에서 열기`}
              className="group flex min-w-0 flex-col overflow-hidden rounded-md border border-border/70 bg-card transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-muted/50">
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-1 items-start justify-between gap-4 p-5 md:p-6">
                <div className="min-w-0">
                  <p className="mb-2 text-sm font-medium text-primary">{article.publisher}</p>
                  <h3 className="break-keep text-base font-semibold leading-relaxed text-foreground md:text-lg">
                    {article.headline}
                  </h3>
                </div>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
