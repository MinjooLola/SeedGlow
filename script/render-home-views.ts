import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { build } from "esbuild";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { HomeContent } from "../shared/homeContent";

export async function renderPublicViews(content: HomeContent) {
  const root = process.cwd();
  const temporary = await mkdtemp(path.join(tmpdir(), "seedglow-actual-view-"));
  const require = createRequire(import.meta.url);
  try {
    const result = await build({
      stdin: {
        resolveDir: root,
        contents: `
          import React from "react";
          import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
          import History from "./client/src/components/HistorySection";
          import Reviews from "./client/src/components/SuccessStories";
          import Partners from "./client/src/components/PartnersSection";
          import Archive from "./client/src/components/ArchiveSection";
          import Hero from "./client/src/components/HeroSection";
          export default function Views({content}) {
            const client=new QueryClient({defaultOptions:{queries:{retry:false,staleTime:Infinity}}});
            client.setQueryData(["/api/home-content"],content);
            return React.createElement(QueryClientProvider,{client},React.createElement("main",null,
              React.createElement(Hero),React.createElement(History),React.createElement(Reviews),
              React.createElement(Partners),React.createElement(Archive)));
          }`,
      },
      bundle: true, format: "cjs", platform: "node", jsx: "automatic", write: false,
      outdir: temporary, outExtension: { ".js": ".cjs" },
      loader: { ".png": "file", ".webp": "file", ".jpg": "file", ".jpeg": "file" },
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
    if (!output) throw new Error("실제 UI 렌더 검증 모듈을 생성하지 못했습니다.");
    await writeFile(output.path, output.contents);
    return renderToStaticMarkup(createElement(require(output.path).default, { content }));
  } finally { await rm(temporary, { recursive: true, force: true }); }
}

function textContent(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (raw, entity: string) => {
    if (entity.startsWith("#")) {
      const code = entity[1].toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
      return String.fromCodePoint(code);
    }
    return ({ amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" } as Record<string, string>)[entity.toLowerCase()] ?? raw;
  });
}

export function compareRenderedRows(rendered: string, content: HomeContent) {
  function compare<T extends object>(prefix: string, source: T[], fields: (keyof T)[]) {
    const records = Array.from(rendered.matchAll(new RegExp(
      `<(article|div)\\b[^>]*data-testid="${prefix}-(\\d+)"[^>]*>([\\s\\S]*?)<\\/\\1>`, "g",
    )));
    let missing = 0;
    let changedFields = 0;
    source.forEach((item, index) => {
      const record = records.find((match) => Number(match[2]) === index);
      if (!record) { missing++; return; }
      fields.forEach((field) => {
        const expected = item[field];
        const value = record[3].match(new RegExp(`data-home-field="${String(field)}"[^>]*>([\\s\\S]*?)<\\/[^>]+>`))?.[1];
        const actual = value === undefined ? "" : textContent(value);
        if (actual !== expected) changedFields++;
      });
    });
    const extras = records.filter((record) => Number(record[2]) >= source.length).length;
    const orderUnchanged = records.every((record, index) => Number(record[2]) === index);
    return { sourceRows: source.length, renderedRows: records.length, missing, extras, changedFields, orderUnchanged };
  }
  return {
    history: content.history.updatedAt === null ? null : compare("history-item", content.history.items, ["period", "text", "category"]),
    reviews: content.reviews.updatedAt === null ? null : compare("card-testimonial", content.reviews.items, ["keyword", "body", "display"]),
    partners: content.partners.updatedAt === null ? null : compare("partner", content.partners.items, ["name"]),
  };
}
