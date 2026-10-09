import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import sharp from "sharp";

type Photo = {
  name: string;
  source: string;
  originalBytes: number;
  originalWidth: number;
  originalHeight: number;
  originalSha256: string;
  variants: { file: string; width: number; height: number; bytes: number }[];
};
const photos: Photo[] = JSON.parse(await readFile("reports/home-image-assets.json", "utf8"));

test("all eleven existing photos have three or more responsive sizes", () => {
  assert.equal(photos.length, 11);
  assert.deepEqual(photos.filter((p) => p.name.startsWith("slide")).map((p) => p.name),
    Array.from({ length: 9 }, (_, i) => `slide${i + 1}`));
  for (const photo of photos) assert.ok(photo.variants.length >= 3);
});

for (const photo of photos) {
  test(`${photo.name}: original preserved, variants decodable, full aspect ratio and small payload`, async () => {
    const original = await readFile(photo.source);
    assert.equal(createHash("sha256").update(original).digest("hex"), photo.originalSha256);
    const widths: number[] = [];
    for (const variant of photo.variants) {
      const buffer = await readFile(variant.file);
      const metadata = await sharp(buffer).metadata();
      assert.equal(metadata.format, "webp");
      assert.equal(metadata.width, variant.width);
      assert.equal(metadata.height, variant.height);
      assert.equal(buffer.length, variant.bytes);
      assert.ok(variant.width <= photo.originalWidth, "no enlargement");
      assert.ok(Math.abs(variant.height - variant.width * photo.originalHeight / photo.originalWidth) <= 1,
        "no recropping or aspect ratio change");
      assert.ok(buffer.length < 250_000, "each photo variant under 250 KB");
      assert.ok(buffer.length < photo.originalBytes, "smaller than original");
      await sharp(buffer).raw().toBuffer(); // Fully decode, not just inspect headers.
      widths.push(variant.width);
    }
    assert.deepEqual(widths, [...new Set(widths)].sort((a, b) => a - b));
  });
}

test("components keep responsive slots and loading priorities, without original asset imports", async () => {
  const [hero, about, slider] = await Promise.all(
    ["HeroSection", "AboutSection", "ImageSlider"].map((name) =>
      readFile(`client/src/components/${name}.tsx`, "utf8")));
  for (const component of [hero, about, slider]) {
    assert.ok(component.includes("srcSet="));
    assert.ok(component.includes("sizes="));
    assert.ok(!component.includes("@assets/"));
  }
  assert.ok(hero.includes('loading="eager"'));
  assert.ok(hero.includes('fetchpriority: "high"'));
  assert.ok(hero.includes('object-[50%_20%]'));
  assert.ok(about.includes('loading="lazy"'));
  assert.ok(slider.includes('loading="lazy"'));
  assert.ok(slider.includes('sizes="300px"'));
});
