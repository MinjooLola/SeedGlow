import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { historicalArchiveIds, archivePostId } from "../server/home-content/archive-history";

const url = process.env.REPLIT_DEV_DOMAIN && `https://${process.env.REPLIT_DEV_DOMAIN}`;
assert.ok(url, "개발 미리보기 주소가 필요합니다.");
const browser = await chromium.launch({ args: ["--no-sandbox"], executablePath: process.env.BROWSER_EXECUTABLE });
try {
  for (const viewport of [{ width: 1280, height: 900 }, { width: 402, height: 874 }]) {
    const page = await browser.newPage({ viewport });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(url, { waitUntil: "networkidle" });
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
    assert.equal(await page.locator('[data-testid^="card-testimonial-"]').count(), content.reviews.items.length);
    assert.equal(await page.getByText("지속적 파트너십", { exact: true }).count(), 1);
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
      reviews: content.reviews.items.length, fixedPartnership: 1, expandedArchive: postIds.length,
      olderArchivePresent: historicalArchiveIds.length, photosUncropped: true, collapsedArchive: 6, errors }));
    await page.close();
  }
} finally { await browser.close(); }
