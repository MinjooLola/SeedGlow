import path from "node:path";
import type { ArchiveItem, ContentFeed, HomeContent } from "../../shared/homeContent";
import { roundDownToTens } from "../../shared/homeContent";
import { LastGoodCache, CACHE_TTL_MS } from "./cache";
import {
  archiveSchema, historySchema, partnerSchema, reviewSchema, RSS_URL,
  loadArchive, loadHistory, loadPartners, loadReviews,
} from "./sources";
import { fetchSource, readLimitedBytes, type Fetcher } from "./network";
import { isAuthenticatedSheetUrl, loadSheetHistoryColumns, loadSheetReviews, loadSheetPartners, type SheetsProxy } from "./sheets";
import { loadHistoricalArchive, mergeArchive } from "./archive-history";

type SourceKind = "history" | "reviews" | "partners";
const keys: Record<SourceKind, string> = {
  history: "HOME_HISTORY_CSV_URL", reviews: "HOME_REVIEWS_CSV_URL", partners: "HOME_PARTNERS_CSV_URL",
};

export function createHomeContentService(options: {
  url?: (kind: SourceKind) => string | undefined;
  directory?: string;
  fetcher?: Fetcher;
  now?: () => number;
  sheetsProxy?: SheetsProxy;
  historicalArchive?: () => Promise<ArchiveItem[]>;
} = {}) {
  const url = options.url ?? ((kind: SourceKind) => process.env[keys[kind]]);
  const directory = options.directory ?? path.resolve(".cache/home-content");
  const fetcher = options.fetcher ?? fetch;
  const now = options.now ?? Date.now;
  // A different sheet/layout must not restore the old auto-classified snapshot.
  const history = new LastGoodCache("history-three-columns", () => url("history"), (source) => isAuthenticatedSheetUrl(source) ?
    loadSheetHistoryColumns(source, options.sheetsProxy) : loadHistory(source, fetcher), historySchema, directory, now);
  const reviews = new LastGoodCache("reviews", () => url("reviews"), (source) => isAuthenticatedSheetUrl(source) ?
    loadSheetReviews(source, options.sheetsProxy) : loadReviews(source, fetcher), reviewSchema, directory, now);
  const partners = new LastGoodCache("partners", () => url("partners"), (source) => isAuthenticatedSheetUrl(source) ?
    loadSheetPartners(source, options.sheetsProxy) : loadPartners(source, fetcher), partnerSchema, directory, now);
  const archive: LastGoodCache<ArchiveItem> = new LastGoodCache("archive", () => RSS_URL, async (source) => {
    const [recent, historical] = await Promise.all([
      loadArchive(source, fetcher),
      options.historicalArchive ? options.historicalArchive() : loadHistoricalArchive(fetcher),
    ]);
    // RSS is a moving window: preserve previously observed public records too.
    return mergeArchive(recent, mergeArchive(archive.peek().items, historical));
  }, archiveSchema, directory, now);
  const imageCache = new Map<string, { body: Buffer; type: string; updatedAt: number }>();

  function compose(
    h: HomeContent["history"], r: HomeContent["reviews"],
    p: HomeContent["partners"], a: ContentFeed<ArchiveItem>,
  ): HomeContent {
    const historyCount = h.updatedAt === null ? null : h.items.length;
    const partnersCount = p.updatedAt === null ? null : p.items.filter((item) => item.excludedFromCount === false).length;
    return {
      history: h, reviews: r, partners: p,
      archive: { ...a, items: a.items.map((item) => ({
        ...item, imageUrl: item.imageUrl ? `/api/archive-image?post=${encodeURIComponent(item.url)}` : null,
      })) },
      stats: {
        historyCount, historyRounded: historyCount === null ? null : roundDownToTens(historyCount),
        partnersCount, partnersRounded: partnersCount === null ? null : roundDownToTens(partnersCount),
      },
    };
  }

  return {
    peek() { return compose(history.peek(), reviews.peek(), partners.peek(), archive.peek()); },
    async get(refresh = false) {
      const [h, r, p, a] = await Promise.all([history.get(refresh), reviews.get(refresh), partners.get(refresh), archive.get(refresh)]);
      return compose(h, r, p, a);
    },
    async image(post: string) {
      const item = (await archive.get()).items.find((entry) => entry.url === post);
      if (!item?.imageUrl) return null;
      const cached = imageCache.get(item.imageUrl);
      if (cached && now() - cached.updatedAt < CACHE_TTL_MS) return cached;
      try {
        const response = await fetchSource(item.imageUrl, "image", fetcher);
        const type = response.headers.get("content-type")?.split(";")[0] ?? "";
        if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(type)) {
          await response.body?.cancel();
          return cached ?? null;
        }
        const body = await readLimitedBytes(response, 5 * 1024 * 1024);
        const image = { body, type, updatedAt: now() };
        if (imageCache.size >= 50) imageCache.delete(imageCache.keys().next().value!);
        imageCache.set(item.imageUrl, image);
        return image;
      } catch { return cached ?? null; }
    },
  };
}

export const homeContentService = createHomeContentService();
