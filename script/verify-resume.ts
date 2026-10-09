import { strict as assert } from "node:assert";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync, rmSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import { build } from "esbuild";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  consulting, existingConsulting, existingJudging, existingLectures, founderIntro,
  historyAdditions, judging, lectures, pendingHistory,
} from "../client/src/data/aboutHistory";
import { escapeHtml, resumeProfileHtml } from "../client/src/data/resumeMarkup";

async function verify() {
  const root = process.cwd();
  const history = execFileSync("git", ["log", "--format=%H", "--", "client/src/components/AboutSection.tsx"], { encoding: "utf8" }).trim().split("\n");
  const previous = history.map((revision) =>
    execFileSync("git", ["show", `${revision}:client/src/components/AboutSection.tsx`], { encoding: "utf8" }),
  ).find((text) => text.includes("const lectures = ["));
  assert.ok(previous, "The original three-category layout must be available for comparison");
  const oldRows = (name: string) => {
    const body = previous.match(new RegExp(`const ${name} = \\[([\\s\\S]*?)\\];`))?.[1];
    assert.ok(body, `Missing original ${name} list`);
    return [...body.matchAll(/"([^"]*)"/g)].map((match) => match[1]);
  };
  assert.deepEqual(existingLectures, oldRows("lectures"));
  assert.deepEqual(existingConsulting, oldRows("consulting"));
  assert.deepEqual(existingJudging, oldRows("judging"));
  for (const text of [founderIntro.name, founderIntro.title, founderIntro.previousTitle, ...founderIntro.paragraphs, ...founderIntro.coreWork]) {
    assert.ok(previous.includes(text), `The founder introduction changed: ${text}`);
  }
  const source = readFileSync("attached_assets/Pasted--Kim-Minjoo-82-10-6597-1543-minjoo-kim-biz-gmail-com-li_1791537681068.txt", "utf8");
  for (const item of historyAdditions) assert.ok(source.includes(item.text), `Addition not found verbatim in the supplied resume: ${item.text}`);
  const groups = [
    { name: "강의", category: "lecture", rows: lectures, existing: existingLectures },
    { name: "컨설팅", category: "consulting", rows: consulting, existing: existingConsulting },
    { name: "심사", category: "judging", rows: judging, existing: existingJudging },
  ] as const;
  for (const group of groups) {
    const newRows = historyAdditions.filter((item) => item.categories.includes(group.category)).map((item) => item.text);
    assert.deepEqual(group.rows, [...newRows, ...group.existing], `${group.name} has missing, extra, or reordered entries`);
    assert.equal(new Set(group.rows).size, group.rows.length, `${group.name} contains duplicates`);
  }

  // Check the real React component, not only the dataset or the noscript version.
  const temporary = mkdtempSync(path.join(tmpdir(), "seedglow-about-"));
  try {
    const result = await build({
      entryPoints: [path.join(root, "client/src/components/AboutSection.tsx")],
      bundle: true,
      platform: "node",
      format: "cjs",
      jsx: "automatic",
      write: false,
      outdir: temporary,
      outExtension: { ".js": ".cjs" },
      loader: { ".png": "file" },
      alias: { "@": path.join(root, "client/src"), "@assets": path.join(root, "attached_assets") },
      logLevel: "silent",
    });
    const output = result.outputFiles.find((file) => file.path.endsWith(".cjs"));
    assert.ok(output);
    writeFileSync(output.path, output.contents);
    const AboutSection = createRequire(import.meta.url)(output.path).default;
    const rendered = renderToStaticMarkup(createElement(AboutSection));
    const listBlocks = [...rendered.matchAll(/<ul aria-label="([^"]*)"[^>]*>([\s\S]*?)<\/ul>/g)];
    assert.equal(listBlocks.length, 3);
    for (const group of groups) {
      const block = listBlocks.find((match) => match[1] === group.name);
      assert.ok(block, `Rendered category missing: ${group.name}`);
      const items = [...block[2].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((match) => match[1]);
      assert.deepEqual(items, group.rows.map(escapeHtml), `${group.name} rendered text differs`);
    }
    for (const text of [founderIntro.name, founderIntro.title, founderIntro.previousTitle, ...founderIntro.paragraphs, ...founderIntro.coreWork]) {
      assert.ok(rendered.includes(escapeHtml(text)));
    }
    for (const removed of ["WORK EXPERIENCE", "EDUCATION", "SKILLS", "2025.02~현재", "2021.01~2025.02", "김민주(Kim Minjoo)"]) {
      assert.ok(!rendered.includes(removed), `Full-resume content is still rendered: ${removed}`);
    }
    assert.ok(rendered.includes('grid grid-cols-1 md:grid-cols-3 gap-8'));

    const noscript = resumeProfileHtml();
    const builtHtml = readFileSync("dist/public/index.html", "utf8");
    assert.ok(builtHtml.includes(noscript), "Built homepage does not contain the current categorized content");
    assert.ok(!builtHtml.includes("__RESUME_SITE_DESCRIPTION__"));
    const report = {
      originalEntriesPreserved: groups.reduce((sum, group) => sum + group.existing.length, 0),
      newActivities: historyAdditions.length,
      categories: groups.map((group) => ({
        name: group.name, previousRows: group.existing.length,
        addedRows: group.rows.length - group.existing.length, currentRows: group.rows.length,
      })),
      missing: 0, extra: 0, originalWordingChanges: 0,
      founderIntroductionRestored: true,
      renderedThreeCategoryLayout: true,
      pendingClassification: pendingHistory,
    };
    mkdirSync("reports", { recursive: true });
    writeFileSync("reports/about-history-verification.json", JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
}

verify().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
