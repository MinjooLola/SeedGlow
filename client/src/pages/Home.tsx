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
import { resumeSiteDescription } from "@/data/resumeExperiences";
import { founderIntro } from "@/data/founderIntro";
import HistorySection from "@/components/HistorySection";
import { useHomeContent } from "@/hooks/use-home-content";
import { performanceDescription } from "@shared/homeContent";

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "시드글로우 (SeedGlow)",
    "url": "https://seedglow.co.kr",
    "description": resumeSiteDescription,
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
        "item": "https://seedglow.co.kr",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "서비스",
        "item": "https://seedglow.co.kr/#services",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "회사 소개",
        "item": "https://seedglow.co.kr/#about",
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "파트너",
        "item": "https://seedglow.co.kr/#partners",
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "고객 후기",
        "item": "https://seedglow.co.kr/#stories",
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "문의",
        "item": "https://seedglow.co.kr/#contact",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "시드글로우 (SeedGlow)",
    "url": "https://seedglow.co.kr",
    "logo": "https://seedglow.co.kr/favicon.png",
    "image": "https://seedglow.co.kr/og-image.jpg",
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
      "https://www.instagram.com/lola_minjoo/",
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
    "jobTitle": founderIntro.title,
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
      "https://www.instagram.com/lola_minjoo/",
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
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "시드글로우는 어떤 컨설팅 서비스를 제공하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "시드글로우는 BM(비즈니스 모델) 확립 및 고도화, 로컬 브랜딩, IR 전략 수립 및 투자 연계 등 3단계 성장 로드맵을 기반으로 로컬 스타트업 전문 컨설팅을 제공합니다.",
        },
      },
      {
        "@type": "Question",
        "name": "시드글로우의 컨설팅 실적은 어떻게 되나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": performanceDescription(null),
        },
      },
      {
        "@type": "Question",
        "name": "시드글로우에 상담 문의는 어떻게 하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "이메일(minjoo.kim.biz@gmail.com)로 문의하시거나 LinkedIn, Instagram을 통해 연락하실 수 있습니다. BM 고도화, 로컬 브랜딩, IR 전략, 투자 연계 등 현재 상황에 맞는 성장 방향을 함께 정리해드립니다.",
        },
      },
    ],
  },
];

export default function Home() {
  const { data } = useHomeContent();
  useEffect(() => {
    document.getElementById("schema-live-content")?.remove();
    const schemas = structuredClone(schemaData);
    const faq = schemas.find((schema) => schema["@type"] === "FAQPage");
    if (faq?.mainEntity) {
      const question = faq.mainEntity.find((entry) => entry.name === "시드글로우의 컨설팅 실적은 어떻게 되나요?");
      if (question) question.acceptedAnswer.text = performanceDescription(data?.stats.historyRounded ?? null);
    }
    schemas.forEach((schema, index) => {
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
      schemas.forEach((_, index) => {
        const el = document.getElementById(`schema-${index}`);
        if (el) el.remove();
      });
    };
  }, [data?.stats.historyRounded]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <TargetAudienceSection />
        <ServicesSection />
        <AboutSection />
        <HistorySection />
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
