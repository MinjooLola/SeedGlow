import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const url = process.env.IMAGE_TEST_URL ??
  (process.env.REPLIT_DEV_DOMAIN ? `https://${process.env.REPLIT_DEV_DOMAIN}` : undefined);
assert.ok(url, "Set IMAGE_TEST_URL to the running app URL.");
const browser = await chromium.launch({
  executablePath: process.env.BROWSER_EXECUTABLE,
  args: ["--no-sandbox"],
});
const results = [];
await mkdir("reports", { recursive: true });
try {
  for (const screen of [
    { name: "mobile", width: 390, height: 844, dpr: 3 },
    { name: "desktop", width: 1440, height: 1000, dpr: 1 },
    { name: "desktop-retina", width: 1440, height: 1000, dpr: 2 },
  ]) {
    const context = await browser.newContext({
      viewport: { width: screen.width, height: screen.height },
      deviceScaleFactor: screen.dpr,
    });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(url, { waitUntil: "networkidle" });
    const hero = page.locator("#hero img");
    await hero.evaluate((image: HTMLImageElement) => image.decode());
    assert.equal(await hero.getAttribute("fetchpriority"), "high");
    assert.equal(await hero.getAttribute("loading"), "eager");
    await page.screenshot({ path: `reports/images-after-${screen.name}-hero.jpg` });
    const initialSources = await page.evaluate(() =>
      performance.getEntriesByType("resource").filter((entry) => entry.initiatorType === "img").map((entry) => entry.name));
    const profile = page.locator("#about img");
    await profile.scrollIntoViewIfNeeded();
    await profile.evaluate((image: HTMLImageElement) => image.decode());
    assert.equal(await profile.getAttribute("loading"), "lazy");
    await profile.screenshot({ path: `reports/images-after-${screen.name}-profile.jpg` });
    const sliderImages = page.locator('img[alt*="컨설팅 및 강의 활동 사진"]');
    const slider = sliderImages.first().locator("../..");
    await slider.scrollIntoViewIfNeeded();
    const before = await slider.getAttribute("style");
    await page.waitForTimeout(1200);
    assert.notEqual(await slider.getAttribute("style"), before, "slider still moves");
    await page.screenshot({ path: `reports/images-after-${screen.name}-slider.jpg` });
    const pictures = await page.locator('#hero img, #about img, img[alt*="컨설팅 및 강의 활동 사진"]').evaluateAll((images) =>
      images.map((image: HTMLImageElement) => {
        const rect = image.getBoundingClientRect();
        return {
          alt: image.alt, source: image.currentSrc, complete: image.complete,
          naturalWidth: image.naturalWidth, renderedWidth: rect.width, renderedHeight: rect.height,
          visible: rect.right > 0 && rect.left < innerWidth && rect.bottom > 0 && rect.top < innerHeight,
        };
      }));
    for (const image of pictures) {
      if (image.visible) assert.ok(image.complete && image.naturalWidth > 0, "visible image decodes");
      if (image.source) assert.ok(image.source.includes(".webp"), "only optimized photos");
    }
    const assets = [];
    for (const source of new Set(pictures.map((p) => p.source).filter(Boolean))) {
      const response = await context.request.get(source);
      assert.equal(response.status(), 200);
      const buffer = await response.body();
      const metadata = await sharp(buffer).metadata();
      assert.equal(metadata.format, "webp");
      assert.ok(buffer.length < 100_000, "photo request below 100 KB");
      assets.push({ source: new URL(source).pathname, width: metadata.width, height: metadata.height, bytes: buffer.length });
    }
    const slideWidth = screen.dpr === 3 ? 900 : screen.dpr === 2 ? 600 : 300;
    for (const asset of assets.filter((asset) => asset.source.includes("slide"))) {
      assert.equal(asset.width, slideWidth);
    }
    const resources = await page.evaluate(() =>
      performance.getEntriesByType("resource")
        .filter((entry) => entry.initiatorType === "img")
        .map((entry: PerformanceResourceTiming) => ({
          source: new URL(entry.name).pathname, encodedBodySize: entry.encodedBodySize, transferSize: entry.transferSize,
        })));
    assert.ok(!resources.some((entry) => /176789085|1765811099605|1767953447116/.test(entry.source)), "no original photo requests");
    assert.deepEqual(errors, []);
    results.push({
      screen,
      initiallyRequestedImages: initialSources.map((source) => new URL(source).pathname),
      pictures: pictures.map((p) => ({ ...p, source: p.source ? new URL(p.source).pathname : "" })),
      assets, resources, errors,
    });
    await context.close();
    console.log(`${screen.name}: responsive selection, decode, lazy loading and slider checks passed.`);
  }
  await writeFile("reports/home-image-browser-verification.json", JSON.stringify(results, null, 2) + "\n");
} finally {
  await browser.close();
}
