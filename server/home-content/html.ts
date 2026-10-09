import { escapeHtml } from "../../client/src/data/resumeMarkup";
import { performanceDescription, type HomeContent } from "../../shared/homeContent";
import { homeContentService } from "./service";

export function contentFallbackHtml(content: HomeContent) {
  const history = content.history.items.map((item) =>
    `<li>${escapeHtml(item.period)} ${escapeHtml(item.category)} ${escapeHtml(item.text)}</li>`,
  ).join("");
  const reviews = content.reviews.items.map((item) =>
    `<article><p>${escapeHtml(item.keyword)}</p><blockquote style="white-space:pre-wrap">"${escapeHtml(item.body)}"</blockquote><cite>${escapeHtml(item.display)}</cite></article>`,
  ).join("");
  const partners = content.partners.items.map((item) => `<li>${escapeHtml(item.name)}</li>`).join("");
  const archive = content.archive.items.map((item) =>
    `<li><a href="${escapeHtml(item.url)}">${escapeHtml(item.title)}</a><time>${escapeHtml(item.date)}</time>${item.imageUrl ? `<img src="${escapeHtml(item.imageUrl)}" alt="" loading="lazy">` : ""}</li>`,
  ).join("");
  return `<h2>이력</h2>${content.stats.historyCount === null ? "<p>구글시트 연결 준비 중</p>" : `<p>누적 ${content.stats.historyCount}건</p>`}<ul>${history}</ul>
<h2>컨설팅 후기</h2>${reviews}<h2>${content.stats.partnersRounded === null ? "" : `${content.stats.partnersRounded}+ `}협력기관과 함께합니다</h2><ul>${partners}</ul>
<h2>아카이브 글</h2><ul>${archive}</ul>`;
}

export function renderServerHome(template: string) {
  const content = homeContentService.peek();
  void homeContentService.get();
  const schema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: [{
      "@type": "Question", name: "시드글로우의 컨설팅 실적은 어떻게 되나요?",
      acceptedAnswer: { "@type": "Answer", text: performanceDescription(content.stats.historyRounded) },
    }],
  };
  const structuredData = JSON.stringify(schema).replace(/</g, "\\u003c");
  return template.replace(/(content="[^"]*\/og-image\.png)(?:\?[^"]*)?(")/g, `$1?history=${content.stats.historyRounded ?? "pending"}$2`)
    .replace('<div id="home-content-fallback"></div>', contentFallbackHtml(content))
    .replace("</head>", `<script type="application/ld+json" id="schema-live-content">${structuredData}</script></head>`);
}
