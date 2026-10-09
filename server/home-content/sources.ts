import { XMLParser, XMLValidator } from "fast-xml-parser";
import { z } from "zod";
import type { ArchiveItem, HistoryItem, PartnerItem, ReviewItem } from "../../shared/homeContent";
import { readProjectedCsv } from "./csv";
import { fetchSource, readLimitedBytes, type Fetcher } from "./network";

export const RSS_URL = "https://rss.blog.naver.com/minjoo_lola.xml";
export const historySchema = z.object({ period: z.string(), text: z.string(), category: z.string() }).strict();
export const reviewSchema = z.object({ keyword: z.string(), body: z.string(), display: z.string() }).strict();
export const partnerSchema = z.object({ name: z.string(), excludedFromCount: z.boolean().nullable() }).strict();
export const archiveSchema = z.object({ title: z.string(), date: z.string(), imageUrl: z.string().nullable(), url: z.string() }).strict();

const isTrue = (text: string) => text.trim().toUpperCase() === "TRUE";
const isFalse = (text: string) => text.trim().toUpperCase() === "FALSE";
export class CategoryMismatchError extends Error {
  constructor(public readonly categories: string[]) {
    super("RSS에서 seedglow 카테고리를 찾지 못했습니다. 카테고리 확인이 필요합니다.");
  }
}

async function csvRows<T>(
  url: string, columns: number[], headers: Record<number, string>,
  transform: (row: string[]) => T | null, fetcher: Fetcher,
) {
  const response = await fetchSource(url, "csv", fetcher);
  const items: T[] = [];
  let hasHeader = false;
  await readProjectedCsv(response, columns, (row) => {
    if (!hasHeader) {
      for (const column of columns) {
        if (row[column]?.replace(/^\uFEFF/, "").trim() !== headers[column]) throw new Error("CSV 열 이름 또는 순서가 요청한 양식과 다릅니다.");
      }
      hasHeader = true;
      return;
    }
    if (columns.some((column) => row[column] === undefined)) throw new Error("CSV에 필수 열이 누락된 행이 있습니다.");
    const item = transform(row);
    if (item !== null) items.push(item);
  });
  if (!hasHeader) throw new Error("CSV에 열 이름이 없습니다.");
  return items;
}

export const loadHistory = (url: string, fetcher: Fetcher = fetch): Promise<HistoryItem[]> =>
  csvRows(url, [0, 1, 2, 3], { 0: "기간", 1: "내용", 2: "구분", 3: "게시" }, (row) =>
    isTrue(row[3]) ? { period: row[0], text: row[1], category: row[2] } : null, fetcher);

export const loadReviews = (url: string, fetcher: Fetcher = fetch): Promise<ReviewItem[]> =>
  csvRows(url, [0, 1, 2, 3], { 0: "키워드", 1: "후기 본문(게시용)", 2: "표기", 3: "게시" }, (row) => {
    if (!isTrue(row[3])) return null;
    // Reject an unsafe publication instead of modifying or truncating the review.
    if (row.slice(0, 3).some((text) => /[\w.+-]+@[\w.-]+\.[a-z]{2,}|\b01[016789][ -]?\d{3,4}[ -]?\d{4}\b|\+82[ -]?\d{1,2}[ -]?\d{3,4}[ -]?\d{4}/i.test(text))) {
      throw new Error("후기 게시용 열에 연락처가 포함되어 있습니다. 시트에서 익명화가 필요합니다.");
    }
    return { keyword: row[0], body: row[1], display: row[2] };
  }, fetcher);

export const loadPartners = (url: string, fetcher: Fetcher = fetch): Promise<PartnerItem[]> =>
  csvRows(url, [0, 1, 3], { 0: "기관명", 1: "게시", 3: "집계제외" }, (row) =>
    isTrue(row[1]) ? { name: row[0], excludedFromCount: isTrue(row[3]) ? true : isFalse(row[3]) ? false : null } : null, fetcher);

function xmlText(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (value && typeof value === "object" && "#text" in value) return xmlText(value["#text"]);
  return "";
}

const decodeXml = (value: string) => value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (raw, entity: string) => {
  if (entity.startsWith("#")) {
    const number = entity[1].toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
    return number > 0 && number <= 0x10ffff ? String.fromCodePoint(number) : raw;
  }
  return ({ amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" } as Record<string, string>)[entity.toLowerCase()] ?? raw;
});

function representativeImage(item: Record<string, unknown>) {
  const thumbnail = item["thumbnail"] as Record<string, unknown> | undefined;
  const media = item["content"] as Record<string, unknown> | undefined;
  const enclosure = item.enclosure as Record<string, unknown> | undefined;
  const description = xmlText(item.description);
  const candidate = xmlText(thumbnail?.["@_url"]) || xmlText(media?.["@_url"]) ||
    (xmlText(enclosure?.["@_type"]).startsWith("image/") ? xmlText(enclosure?.["@_url"]) : "") ||
    description.match(/<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/i)?.[1] || "";
  if (!candidate) return null;
  try {
    const url = new URL(decodeXml(candidate));
    if (url.protocol === "http:") url.protocol = "https:";
    if (url.protocol !== "https:" || url.username || url.password || (url.port && url.port !== "443") ||
      !(url.hostname.endsWith(".pstatic.net") || url.hostname.endsWith(".naver.net"))) return null;
    return url.toString();
  } catch { return null; }
}

export async function loadArchive(url: string = RSS_URL, fetcher: Fetcher = fetch): Promise<ArchiveItem[]> {
  const response = await fetchSource(url, "rss", fetcher);
  const xml = new TextDecoder("utf-8", { fatal: true }).decode(await readLimitedBytes(response, 8 * 1024 * 1024));
  if (/<!DOCTYPE|<!ENTITY/i.test(xml) || XMLValidator.validate(xml) !== true) throw new Error("RSS XML 형식이 올바르지 않습니다.");
  const parsed = new XMLParser({
    ignoreAttributes: false, removeNSPrefix: true, parseTagValue: false,
    parseAttributeValue: false, processEntities: false, trimValues: false,
    isArray: (name) => name === "item" || name === "category",
  }).parse(xml);
  const rawItems = parsed?.rss?.channel?.item;
  if (!Array.isArray(rawItems)) throw new Error("RSS 글 목록을 찾지 못했습니다.");
  const categories = Array.from(new Set<string>(rawItems.flatMap((item) =>
    (Array.isArray(item.category) ? item.category : [item.category]).map((value: unknown) => decodeXml(xmlText(value)).trim()).filter(Boolean),
  )));
  if (!categories.some((name) => name.toLowerCase() === "seedglow")) throw new CategoryMismatchError(categories);
  return rawItems.filter((item) =>
    (Array.isArray(item.category) ? item.category : [item.category]).some((value: unknown) => decodeXml(xmlText(value)).trim().toLowerCase() === "seedglow"),
  ).map((item) => {
    const link = decodeXml(xmlText(item.link)).trim();
    const target = new URL(link);
    if (target.protocol !== "https:" || !["blog.naver.com", "m.blog.naver.com"].includes(target.hostname)) throw new Error("RSS 글의 원문 링크가 올바르지 않습니다.");
    // The public cache holds metadata only, never descriptions or article bodies.
    return { title: decodeXml(xmlText(item.title)), date: xmlText(item.pubDate).trim(), imageUrl: representativeImage(item), url: link };
  });
}
