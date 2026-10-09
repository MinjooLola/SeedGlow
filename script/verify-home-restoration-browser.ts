import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { historicalArchiveIds, archivePostId } from "../server/home-content/archive-history";
import { ReplitConnectors } from "@replit/connectors-sdk";

const url = process.env.REPLIT_DEV_DOMAIN && `https://${process.env.REPLIT_DEV_DOMAIN}`;
assert.ok(url, "개발 미리보기 주소가 필요합니다.");
const connectors = new ReplitConnectors();
const sheetResponse = await connectors.proxy("google-sheet",
  "/v4/spreadsheets/1U6U0zdHF8Pm8xAIZXhuhtnDHS49hqqNCRU6ovV2s4qw/values/" + encodeURIComponent("'이력_3열보기'!A1:C120"),
  { method: "GET" });
assert.ok(sheetResponse.ok, "원본 3열 이력 시트 조회 실패");
const sheetRows: string[][] = (await sheetResponse.json()).values;
assert.deepEqual(sheetRows[0], ["강의", "컨설팅", "심사"]);
const expectedGroups = sheetRows[0].map((category, column) => ({
  category, texts: sheetRows.slice(2).map(row => row[column] ?? "").filter(text => text.trim())
    .map(text => text.replace(/\s*\[(?:19|20)\d{2}(?:\.\d{1,2})?(?:[~-]\d{1,2})?\]\s*$/, "")),
}));
const browser = await chromium.launch({ args: ["--no-sandbox"], executablePath: process.env.BROWSER_EXECUTABLE });
try {
  for (const viewport of [{ width: 1280, height: 900 }, { width: 768, height: 1024 }, { width: 402, height: 874 }, { width: 360, height: 800 }]) {
    const page = await browser.newPage({ viewport });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(url, { waitUntil: "networkidle" });
    // The development-domain banner is injected by the host, outside the app.
    // Keep it visible but prevent it intercepting homepage navigation clicks.
    await page.addStyleTag({ content: "#replit-dev-banner { pointer-events: none !important; }" });
    const response = await page.request.get(`${url}/api/home-content`);
    const content = await response.json();
    assert.equal(content.history.status, "ready");
    assert.equal(content.reviews.status, "ready");
    assert.equal(content.archive.status, "ready");
    assert.equal(await page.locator("#about #history").count(), 1);
    assert.deepEqual(await page.locator("#history [data-history-group]").evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute("data-history-group"))), ["강의", "컨설팅", "심사"]);
    const sourceIndices = await page.locator('[data-testid^="history-item-"]').evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute("data-testid")!.split("-").at(-1)));
    assert.equal(new Set(sourceIndices).size, content.history.items.length);
    for (const { category, texts } of expectedGroups) {
      assert.deepEqual(await page.locator(`#history [data-history-group="${category}"] [data-home-field="text"]`).allTextContents(), texts);
    }
    assert.equal(await page.locator('#history [data-home-field="period"]').count(), 0);
    assert.ok(content.history.items.every((item: { period: string }) => item.period === ""));
    const historyText = page.locator('#history [data-home-field="text"]').first();
    assert.ok(await historyText.evaluate(node => parseFloat(getComputedStyle(node).fontSize) >= 14));
    assert.equal(await page.locator('[data-testid^="card-testimonial-"]').count(), Math.min(4, content.reviews.items.length));
    const reviewToggle = page.getByTestId("button-reviews-toggle");
    await reviewToggle.click();
    assert.equal(await reviewToggle.getAttribute("aria-expanded"), "true");
    assert.equal(await page.locator('[data-testid^="card-testimonial-"]').count(), content.reviews.items.length);
    assert.deepEqual(await page.locator('#consulting-reviews [data-home-field="body"]').allTextContents(),
      content.reviews.items.map((item: { body: string }) => item.body));
    assert.equal(await page.getByText("지속적 파트너십", { exact: true }).count(), 0);
    await reviewToggle.click();
    assert.equal(await page.locator('[data-testid^="card-testimonial-"]').count(), 4);
    assert.equal(await reviewToggle.getAttribute("aria-expanded"), "false");

    const interviewLinks = page.locator('[data-testid^="link-interview-"]');
    assert.deepEqual(await interviewLinks.evaluateAll(nodes => nodes.map(node => (node as HTMLAnchorElement).href)), [
      "https://www.belocal.kr/news/articleView.html?idxno=2244496",
      "https://www.socialimpactnews.net/news/articleView.html?idxno=6939",
    ]);
    for (const card of await interviewLinks.all()) {
      assert.equal(await card.getAttribute("target"), "_blank");
      assert.ok((await card.getAttribute("rel"))?.includes("noopener"));
      const image = card.locator("img");
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((node: HTMLImageElement) => node.decode());
      assert.ok(await image.evaluate((node: HTMLImageElement) => node.naturalWidth > 0));
      assert.equal(await image.evaluate(node => getComputedStyle(node).objectFit), "contain");
    }
    if (viewport.width < 768) await page.getByTestId("button-mobile-menu").click();
    const interviewNav = page.locator('header a[href="#interviews"]:visible');
    await interviewNav.click();
    await page.waitForTimeout(550);
    assert.ok((await page.locator("#interviews").boundingBox())!.y >= 0);
    assert.equal(await page.locator('[data-testid^="link-archive-"]').count(), Math.min(6, content.archive.items.length));
    await page.getByTestId("button-archive-toggle").click();
    const links = page.locator('[data-testid^="link-archive-"]');
    assert.equal(await links.count(), content.archive.items.length);
    const postIds = (await links.evaluateAll((nodes) => nodes.map((node) => (node as HTMLAnchorElement).href))).map(archivePostId);
    assert.ok(historicalArchiveIds.every((id) => postIds.includes(id)));
    const image = links.last().locator("img");
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((node: HTMLImageElement) => node.decode());
    assert.ok(await image.evaluate((node: HTMLImageElement) => node.naturalWidth > 0));
    assert.equal(await image.evaluate((node) => getComputedStyle(node).objectFit), "contain");
    assert.ok(await image.evaluate((node) => node.getBoundingClientRect().height >= 192));
    await page.getByTestId("button-archive-toggle").click();
    assert.equal(await page.locator('[data-testid^="link-archive-"]').count(), 6);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ viewport, historyRows: new Set(sourceIndices).size,
      reviews: content.reviews.items.length, collapsedReviews: 4, fixedPartnership: 0,
      historyColumnCounts: expectedGroups.map(group => ({ category: group.category, count: group.texts.length })),
      historyDatesHidden: true, interviews: 2, expandedArchive: postIds.length,
      olderArchivePresent: historicalArchiveIds.length, photosUncropped: true, collapsedArchive: 6, errors }));
    await page.close();
  }
} finally { await browser.close(); }
