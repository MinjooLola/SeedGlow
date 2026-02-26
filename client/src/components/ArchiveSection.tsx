import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

interface ArchiveItem {
  category: string;
  title: string;
  url: string;
  image: string;
}

const archiveItems: ArchiveItem[] = [
  { category: "강의", title: "로컬에서 창업하면 망한다?", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=224140176030&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop&q=80" },
  { category: "강의&심사", title: "AI 시대의 창업 마인드셋: 무료로, 빠르게 실패하기", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=224135981717&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&q=80" },
  { category: "컨퍼런스", title: "지역 생태계 설계 원칙: De-Risking과 Re-Risking의 균형", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=224115990311&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=300&fit=crop&q=80" },
  { category: "컨설팅", title: "'투자 언어'를 배워야 한다", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=224105341988&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&q=80" },
  { category: "강의", title: "반려동물 스타트업, 5,680억 달러 시장에서 살아남는 법", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=224097733932&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop&q=80" },
  { category: "강의", title: "로컬 F&B 스타트업 투자 전략", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=224088060632&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&q=80" },
  { category: "강의", title: "지역의 고유성을 찾아서, 로컬 창업의 A-Z", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=224085069143&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop&q=80" },
  { category: "컨설팅", title: "고객 개발 없는 기획서는 시장으로 가지 못한다", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=224080654830&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&q=80" },
  { category: "컨설팅", title: "'문제의 깊이'가 없는 기술은 매력이 없다", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=224074316632&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=400&h=300&fit=crop&q=80" },
  { category: "심사", title: "AI 전환(AX) 시대, 제주 창업생태계의 도전과 기회", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=224072062205&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop&q=80" },
  { category: "컨설팅", title: "로컬창업가/1인브랜드 비즈니스모델 고도화", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=224056086100&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=300&fit=crop&q=80" },
  { category: "강의&컨설팅", title: "시장으로 투자자를 설득하는 법", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=224048238330&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=400&h=300&fit=crop&q=80" },
  { category: "강의", title: "투자자를 사로잡는 IR 피칭 전략", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=224040470814&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop&q=80" },
  { category: "모더레이터", title: "로컬이 만드는 새로운 가능성", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=223980324962&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop&q=80" },
  { category: "강의", title: "지역사회 문제해결 워크숍", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=223963766832&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop&q=80" },
  { category: "강의", title: "AC가 보는 스타트업의 본질", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=223963766832&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&q=80" },
  { category: "강의", title: "로컬 예비창업가 사업 기획 및 비즈니스 모델(BM) 고도화", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=223892968987&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop&q=80" },
  { category: "강의", title: "제주 로컬 스타트업의 성장과 투자 전략", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=223868229706&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&q=80" },
  { category: "컨설팅", title: "한국에서 창업하기, 외국인 예비 창업팀 대상 창업 멘토링", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=223851274688&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop&q=80" },
  { category: "강의", title: "비즈니스 모델 정립/사업기획 고도화 워크숍", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=223827944431&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop&q=80" },
  { category: "심사&멘토링", title: "지역 문제를 비즈니스로 해결하는 로컬임팩트캠퍼스", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=223673051592&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop&q=80" },
  { category: "심사", title: "스페인에서 창업하기, 글로벌 진출 전략", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=223671799877&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop&q=80" },
  { category: "강연", title: "로컬에서 만드는 소셜임팩트", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=223665777553&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop&q=80" },
  { category: "포럼&사회", title: "로컬브랜딩과 지역활력타운", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=223664542880&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop&q=80" },
  { category: "강의", title: "로컬에서 창업하기 : 사업계획서 작성법", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=223208973374&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop&q=80" },
  { category: "컨퍼런스", title: "지역의 변화를 이끌어나가는 사람들", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=222951578589&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=&from=postList", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop&q=80" },
  { category: "모더레이터", title: "도시에 살지만 지역을 사랑하는 '관계 인구'입니다", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=222933952447&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=7&postListTopCurrentPage=1&from=postView", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop&q=80" },
  { category: "포럼", title: "로컬의 혁신가가 주도하여 혁신하는 도시재생의 발전방향에 대하여", url: "https://blog.naver.com/PostView.naver?blogId=minjoo_lola&logNo=222884164080&categoryNo=120&parentCategoryNo=0&viewDate=&currentPage=7&postListTopCurrentPage=1&from=postView", image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=300&fit=crop&q=80" },
];

const getCategoryColor = (category: string) => {
  if (category.includes("강의") || category.includes("강연")) return "bg-blue-500/20 text-blue-400 border-blue-500/30";
  if (category.includes("컨설팅") || category.includes("멘토링")) return "bg-amber-500/20 text-amber-400 border-amber-500/30";
  if (category.includes("심사")) return "bg-purple-500/20 text-purple-400 border-purple-500/30";
  if (category.includes("컨퍼런스")) return "bg-green-500/20 text-green-400 border-green-500/30";
  if (category.includes("모더레이터")) return "bg-pink-500/20 text-pink-400 border-pink-500/30";
  if (category.includes("포럼") || category.includes("사회")) return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
  return "bg-gray-500/20 text-gray-400 border-gray-500/30";
};

export default function ArchiveSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedItems = isExpanded ? archiveItems : archiveItems.slice(0, 6);

  return (
    <section id="archive" className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4" data-testid="badge-archive">
            Archive
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 break-keep" data-testid="text-archive-title">
            강의 · 컨설팅 · 심사 아카이브
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto break-keep" data-testid="text-archive-description">
            SeedGlow가 진행한 다양한 활동 기록들을 확인하세요
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {displayedItems.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              data-testid={`link-archive-${index}`}
            >
              <Card className="h-full overflow-hidden hover-elevate transition-all duration-200 border-border/50 hover:border-primary/30">
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={`시드글로우 ${item.category} - ${item.title}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge 
                    variant="outline" 
                    className={`absolute top-3 left-3 text-xs ${getCategoryColor(item.category)}`}
                  >
                    {item.category}
                  </Badge>
                  <ExternalLink className="absolute top-3 right-3 w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-foreground break-keep line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </div>
              </Card>
            </a>
          ))}
        </div>

        {archiveItems.length > 6 && (
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              onClick={() => setIsExpanded(!isExpanded)}
              className="gap-2"
              data-testid="button-archive-toggle"
            >
              {isExpanded ? (
                <>
                  접기
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  더보기
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
