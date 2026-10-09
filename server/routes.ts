import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { resumeSiteDescription } from "../client/src/data/resumeExperiences";
import { escapeHtml } from "../client/src/data/resumeMarkup";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get("/robots.txt", (_req, res) => {
    const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://seedglow.co.kr/sitemap.xml`;
    res.set("Content-Type", "text/plain");
    res.send(robotsTxt);
  });

  app.get("/sitemap.xml", (_req, res) => {
    const today = new Date().toISOString().split("T")[0];
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://seedglow.co.kr/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://seedglow.co.kr/#services</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://seedglow.co.kr/#about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://seedglow.co.kr/#success</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://seedglow.co.kr/#archive</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://seedglow.co.kr/#contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`;
    res.set("Content-Type", "application/xml");
    res.send(sitemap);
  });

  app.get("/rss.xml", (_req, res) => {
    const now = new Date().toUTCString();
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>시드글로우 | 로컬 스타트업 전문 컨설팅</title>
    <link>https://seedglow.co.kr</link>
    <description>${escapeHtml(resumeSiteDescription)}</description>
    <language>ko</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="https://seedglow.co.kr/rss.xml" rel="self" type="application/rss+xml"/>
    <item>
      <title>BM 확립 및 고도화 컨설팅</title>
      <link>https://seedglow.co.kr/#services</link>
      <description>좋은 아이디어를 사라지지 않는 사업으로 바꿉니다. 시장·고객·문제 정의 재정의, 수익 구조 및 단가 설계, 경쟁 구조 분석·차별화 포인트 도출.</description>
      <guid isPermaLink="false">seedglow-service-bm</guid>
    </item>
    <item>
      <title>로컬 브랜딩 컨설팅</title>
      <link>https://seedglow.co.kr/#services</link>
      <description>로컬을 스토리를 넘어 전략으로 씁니다. 지역 자원의 사업적 활용 방식 설계, 로컬 정체성 기반 브랜드 포지셔닝.</description>
      <guid isPermaLink="false">seedglow-service-branding</guid>
    </item>
    <item>
      <title>IR 전략 및 투자 연계</title>
      <link>https://seedglow.co.kr/#services</link>
      <description>투자자가 원하는 IR 언어로 재설계합니다. IR 덱 구조 설계 및 스토리라인 정리, 투자 포인트 및 리스크 정리, 단계·분야별 투자자 연결.</description>
      <guid isPermaLink="false">seedglow-service-ir</guid>
    </item>
  </channel>
</rss>`;
    res.set("Content-Type", "application/rss+xml; charset=utf-8");
    res.send(rss);
  });

  return httpServer;
}
