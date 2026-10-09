import { strict as assert } from "node:assert";
import { test } from "node:test";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { tmpdir } from "node:os";
import { createRequire } from "node:module";
import { build } from "esbuild";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { HomeContent } from "../../shared/homeContent";
import { escapeHtml } from "../../client/src/data/resumeMarkup";

test("real React views match published rows, counts, ordering and unabridged reviews", async () => {
  const root = process.cwd();
  const temporary = await mkdtemp(path.join(tmpdir(), "seedglow-view-"));
  const require = createRequire(import.meta.url);
  const longBody = `공백  유지\n${"후기 전문을 그대로 표시 ".repeat(1000)}마지막 문장 & 인용 "그대로"`;
  const content: HomeContent = {
    history: { status: "ready", updatedAt: new Date().toISOString(), items: Array.from({ length: 72 }, (_, index) => ({
      period: "2026.04-12", text: `활동 ${index}`, category: ["강의", "컨설팅", "심사"][index % 3],
    })) },
    reviews: { status: "ready", updatedAt: new Date().toISOString(), items: [
      { keyword: "", body: longBody, display: "익명 창업가" },
      { keyword: "실행 전략", body: "두 번째 후기\n문장 그대로", display: "익명 참여자" },
    ] },
    partners: { status: "ready", updatedAt: new Date().toISOString(), items: [
      ...Array.from({ length: 62 }, (_, index) => ({ name: `기관 ${index}`, excludedFromCount: false })),
      { name: "그외 다수", excludedFromCount: true },
    ] },
    archive: { status: "ready", updatedAt: new Date().toISOString(), items: [
      { title: "네이버 글", date: "Tue, 29 Sep 2026 23:49:41 +0900", url: "https://blog.naver.com/minjoo_lola/123", imageUrl: "/api/archive-image?post=123" },
    ] },
    stats: { historyCount: 72, historyRounded: 70, partnersCount: 62, partnersRounded: 60 },
  };
  try {
    const result = await build({
      stdin: {
        resolveDir: root,
        contents: `
          import React from "react";
          import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
          import History from "./client/src/components/HistorySection";
          import Reviews from "./client/src/components/SuccessStories";
          import Partners from "./client/src/components/PartnersSection";
          import Archive from "./client/src/components/ArchiveSection";
          import Hero from "./client/src/components/HeroSection";
          export default function Views({content,expanded=false}) {
            const client = new QueryClient({defaultOptions:{queries:{retry:false,staleTime:Infinity}}});
            client.setQueryData(["/api/home-content"],content);
            return React.createElement(QueryClientProvider,{client},React.createElement("main",null,
              React.createElement(Hero),React.createElement(History),React.createElement(Reviews,{defaultExpanded:expanded}),
              React.createElement(Partners),React.createElement(Archive)));
          }`,
      },
      bundle: true, format: "cjs", platform: "node", jsx: "automatic", write: false,
      outdir: temporary, outExtension: { ".js": ".cjs" }, loader: { ".png": "file", ".webp": "file" },
      alias: { "@": path.join(root, "client/src"), "@shared": path.join(root, "shared"), "@assets": path.join(root, "attached_assets") },
      plugins: [{
        name: "shared-react-runtime",
        setup(context) {
          context.onResolve({ filter: /^(react($|\/)|@tanstack\/react-query$)/ }, (args) => ({
            path: require.resolve(args.path), external: true,
          }));
        },
      }],
      logLevel: "silent",
    });
    const output = result.outputFiles.find((file) => file.path.endsWith(".cjs"));
    assert.ok(output);
    await writeFile(output.path, output.contents);
    const Views = require(output.path).default;
    const rendered = renderToStaticMarkup(createElement(Views, { content }));
    assert.equal((rendered.match(/data-testid="history-item-/g) ?? []).length, 72);
    assert.equal((rendered.match(/data-testid="partner-/g) ?? []).length, 63);
    assert.equal((rendered.match(/data-testid="card-testimonial-/g) ?? []).length, 2);
    assert.equal((rendered.match(/data-testid="link-archive-/g) ?? []).length, 1);
    assert.ok(rendered.includes("누적 72건") && rendered.includes("70+") && rendered.includes("60+ 협력기관과 함께합니다"));
    assert.ok(rendered.includes(escapeHtml(longBody)));
    assert.ok(rendered.includes("마지막 문장") && !rendered.includes("지속적 파트너십"));
    const history = rendered.match(/<section id="history"[\s\S]*?<\/section>/)?.[0] ?? "";
    assert.ok(!history.includes('data-home-field="period"') && !history.includes("2026.04-12"));
    content.history.items.forEach((item, index) => {
      const position = history.indexOf(`data-testid="history-item-${index}"`);
      assert.ok(position >= 0, `History missing at ${index}`);
      assert.ok(history.includes(escapeHtml(item.text)));
    });
    for (const label of ["강의", "컨설팅", "심사"]) {
      const indices = content.history.items.flatMap((item, index) => item.category === label ? [index] : []);
      const section = history.split(`data-history-group="${label}"`)[1].split('data-history-group=')[0];
      let previous = -1;
      indices.forEach((index) => {
        const position = section.indexOf(`data-testid="history-item-${index}"`);
        assert.ok(position > previous, `History order within ${label} changed`);
        previous = position;
      });
    }
    const reviews = rendered.match(/<section id="success"[\s\S]*?<\/section>/)?.[0] ?? "";
    assert.ok(!/line-clamp|truncate|더보기/.test(reviews));
    assert.ok(reviews.includes("md:grid-cols-2") && !reviews.includes("lg:grid-cols-3") && reviews.includes("whitespace-pre-wrap"));
    const firstCard = reviews.match(/data-testid="card-testimonial-0"[\s\S]*?<\/article>/)?.[0] ?? "";
    assert.ok(!firstCard.includes('data-slot="badge"') && !firstCard.includes("실행 전략"));
    assert.ok(reviews.indexOf(escapeHtml(longBody)) < reviews.indexOf("두 번째 후기"));
    assert.ok(!/[\w.+-]+@[\w.-]+\.[a-z]{2,}|\b01[016789][ -]?\d{3,4}[ -]?\d{4}\b/i.test(reviews));
    assert.ok(!rendered.includes("https://blogfiles.") && rendered.includes("/api/archive-image?post=123"));

    const manyReviews = structuredClone(content);
    manyReviews.reviews.items = Array.from({ length: 9 }, (_, index) => ({
      keyword: `키워드 ${index}`, body: `후기 ${index} 원문 그대로`, display: "익명 참여자",
    }));
    const folded = renderToStaticMarkup(createElement(Views, { content: manyReviews }));
    assert.equal((folded.match(/data-testid="card-testimonial-/g) ?? []).length, 5);
    assert.ok(folded.includes('aria-expanded="false"') && folded.includes('aria-controls="consulting-reviews"'));
    assert.ok(!folded.includes("후기 8 원문 그대로"));
    const expanded = renderToStaticMarkup(createElement(Views, { content: manyReviews, expanded: true }));
    assert.equal((expanded.match(/data-testid="card-testimonial-/g) ?? []).length, 9);
    assert.ok(expanded.includes("후기 8 원문 그대로") && !expanded.includes("지속적 파트너십"));

    manyReviews.reviews.items[7].display = "- 8년차 GovTech 스타트업, 투자 IR 준비 중";
    const featuredView = renderToStaticMarkup(createElement(Views, { content: manyReviews }));
    const featuredCard = featuredView.match(/data-testid="card-testimonial-0"[\s\S]*?<\/article>/)?.[0] ?? "";
    assert.ok(featuredCard.includes("후기 7 원문 그대로"));
    assert.equal((featuredView.match(/후기 7 원문 그대로/g) ?? []).length, 1);
    assert.equal((featuredView.match(/data-testid="card-testimonial-/g) ?? []).length, 5);

    const unavailable = structuredClone(content);
    unavailable.history = { status: "unconfigured", updatedAt: null, items: [] };
    unavailable.partners = { status: "unconfigured", updatedAt: null, items: [] };
    unavailable.stats = { historyCount: null, historyRounded: null, partnersCount: null, partnersRounded: null };
    const initial = renderToStaticMarkup(createElement(Views, { content: unavailable }));
    assert.ok(initial.includes("누적 —건") && initial.includes("연결 준비 중"));
    assert.ok(!initial.includes("40+") && !initial.includes("누적 0건"));
  } finally { await rm(temporary, { recursive: true, force: true }); }
});
