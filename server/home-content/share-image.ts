import path from "node:path";
import sharp from "sharp";
import { homeContentService } from "./service";

const original = path.resolve(process.env.NODE_ENV === "production" ? "dist/public/og-image.jpg" : "client/public/og-image.jpg");
let cached: { label: string; body: Buffer } | undefined;

export async function shareImage() {
  const content = await homeContentService.get();
  const label = content.stats.historyRounded === null ? "—" : `${content.stats.historyRounded}+`;
  if (cached?.label === label) return cached.body;
  const image = sharp(original);
  const { width, height } = await image.metadata();
  if (width !== 1200 || height !== 630) throw new Error("공유 이미지 기준 크기를 확인해야 합니다.");
  // Preserve the original photograph, copy and other three numbers. Replace only
  // the former 40+ region using an adjacent background strip from this same image.
  const left = 916, top = 570, boxWidth = 116, boxHeight = 35;
  const background = await image.clone().extract({ left, top: top - 1, width: boxWidth, height: 1 })
    .resize(boxWidth, boxHeight, { kernel: "nearest" }).png().toBuffer();
  const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <text x="974" y="598" text-anchor="middle" font-family="DejaVu Sans,sans-serif"
      font-weight="700" font-size="29" fill="rgb(244,199,84)">${label}</text></svg>`);
  const body = await image.composite([{ input: background, left, top }, { input: text, left: 0, top: 0 }])
    .png().toBuffer();
  cached = { label, body };
  return body;
}
