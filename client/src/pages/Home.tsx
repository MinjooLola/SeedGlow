import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TargetAudienceSection from "@/components/TargetAudienceSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import PartnersSection from "@/components/PartnersSection";
import SuccessStories from "@/components/SuccessStories";
import ImageSlider from "@/components/ImageSlider";
import ArchiveSection from "@/components/ArchiveSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "시드글로우 (SeedGlow)",
    "url": "https://lolaum.kr",
    "description": "전국 300팀 이상의 로컬 스타트업 컨설팅 및 26팀 투자 유치 성공. SeedGlow는 지역 스타트업의 성장을 함께합니다.",
    "inLanguage": "ko",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "홈",
        "item": "https://lolaum.kr",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "서비스",
        "item": "https://lolaum.kr/#services",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "회사 소개",
        "item": "https://lolaum.kr/#about",
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "파트너",
        "item": "https://lolaum.kr/#partners",
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "고객 후기",
        "item": "https://lolaum.kr/#stories",
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "문의",
        "item": "https://lolaum.kr/#contact",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "시드글로우 (SeedGlow)",
    "url": "https://lolaum.kr",
    "logo": "https://lolaum.kr/favicon.png",
    "image": "https://lolaum.kr/favicon.png",
    "description": "로컬 스타트업 전문 컨설팅 - BM 고도화, 로컬 브랜딩, IR 전략, 투자 연계",
    "email": "minjoo.kim.biz@gmail.com",
    "founder": {
      "@type": "Person",
      "name": "김민주",
      "jobTitle": "대표 / 컨설턴트",
    },
    "areaServed": {
      "@type": "Country",
      "name": "대한민국",
    },
    "serviceType": [
      "비즈니스 모델(BM) 고도화",
      "로컬 브랜딩",
      "IR 전략 수립",
      "투자 연계",
      "스타트업 컨설팅",
      "창업 강의",
      "IR 심사",
    ],
    "sameAs": [
      "https://www.linkedin.com/in/lolajjoo/",
      "https://www.instagram.com/seedglow_/",
    ],
    "knowsAbout": [
      "로컬 스타트업",
      "투자 유치",
      "비즈니스 모델 개발",
      "IR 피칭",
      "로컬 브랜딩",
      "액셀러레이팅",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "김민주",
    "jobTitle": "시드글로우(SeedGlow) 대표 / 컨설턴트",
    "worksFor": {
      "@type": "Organization",
      "name": "시드글로우 (SeedGlow)",
    },
    "description": "전 스타트업 투자사·액셀러레이터 팀장. 제주, 대구, 부산, 경주, 의성, 광주, 안동, 울릉, 부안, 이천 등 지역의 300개 이상의 스타트업 컨설팅 경험.",
    "knowsAbout": [
      "BM 고도화",
      "로컬 브랜딩",
      "IR 전략",
      "투자 연계",
    ],
    "sameAs": [
      "https://www.linkedin.com/in/lolajjoo/",
      "https://www.instagram.com/seedglow_/",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "시드글로우 컨설팅 서비스",
    "itemListElement": [
      {
        "@type": "Service",
        "position": 1,
        "name": "BM 확립 및 고도화",
        "description": "좋은 아이디어를 사라지지 않는 사업으로 바꿉니다. 시장·고객·문제 정의 재정의, 수익 구조 및 단가 설계, 경쟁 구조 분석·차별화 포인트 도출.",
      },
      {
        "@type": "Service",
        "position": 2,
        "name": "로컬 브랜딩",
        "description": "로컬을 '스토리'를 넘어 '전략'으로 씁니다. 지역 자원의 사업적 활용 방식 설계, 로컬 정체성 기반 브랜드 포지셔닝.",
      },
      {
        "@type": "Service",
        "position": 3,
        "name": "IR 전략 및 투자 연계",
        "description": "투자자가 원하는 IR 언어로 재설계합니다. IR 덱 구조 설계, 투자 포인트 정리, 피칭 코칭, 단계·분야별 투자자 연결.",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "itemReviewed": {
      "@type": "ProfessionalService",
      "name": "시드글로우 (SeedGlow)",
    },
    "ratingValue": "5",
    "bestRating": "5",
    "ratingCount": "9",
    "reviewCount": "9",
  },
];

export default function Home() {
  useEffect(() => {
    schemaData.forEach((schema, index) => {
      const id = `schema-${index}`;
      if (!document.getElementById(id)) {
        const script = document.createElement("script");
        script.id = id;
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
      }
    });
    return () => {
      schemaData.forEach((_, index) => {
        const el = document.getElementById(`schema-${index}`);
        if (el) el.remove();
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <TargetAudienceSection />
        <ServicesSection />
        <AboutSection />
        <ImageSlider />
        <PartnersSection />
        <SuccessStories />
        <ArchiveSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
