import type { ArchiveItem } from "../../shared/homeContent";
import { fetchSource, readLimitedBytes, type Fetcher } from "./network";

// Links and labels previously published on this homepage. No stock-photo URLs.
const records = [
  ["224140176030", "로컬에서 창업하면 망한다?"],
  ["224135981717", "AI 시대의 창업 마인드셋: 무료로, 빠르게 실패하기"],
  ["224115990311", "지역 생태계 설계 원칙: De-Risking과 Re-Risking의 균형"],
  ["224105341988", "'투자 언어'를 배워야 한다"],
  ["224097733932", "반려동물 스타트업, 5,680억 달러 시장에서 살아남는 법"],
  ["224088060632", "로컬 F&B 스타트업 투자 전략"],
  ["224085069143", "지역의 고유성을 찾아서, 로컬 창업의 A-Z"],
  ["224080654830", "고객 개발 없는 기획서는 시장으로 가지 못한다"],
  ["224074316632", "'문제의 깊이'가 없는 기술은 매력이 없다"],
  ["224072062205", "AI 전환(AX) 시대, 제주 창업생태계의 도전과 기회"],
  ["224056086100", "로컬창업가/1인브랜드 비즈니스모델 고도화"],
  ["224048238330", "시장으로 투자자를 설득하는 법"],
  ["224040470814", "투자자를 사로잡는 IR 피칭 전략"],
  ["223980324962", "로컬이 만드는 새로운 가능성"],
  ["223963766832", "지역사회 문제해결 워크숍"],
  ["223892968987", "로컬 예비창업가 사업 기획 및 비즈니스 모델(BM) 고도화"],
  ["223868229706", "제주 로컬 스타트업의 성장과 투자 전략"],
  ["223851274688", "한국에서 창업하기, 외국인 예비 창업팀 대상 창업 멘토링"],
  ["223827944431", "비즈니스 모델 정립/사업기획 고도화 워크숍"],
  ["223673051592", "지역 문제를 비즈니스로 해결하는 로컬임팩트캠퍼스"],
  ["223671799877", "스페인에서 창업하기, 글로벌 진출 전략"],
  ["223665777553", "로컬에서 만드는 소셜임팩트"],
  ["223664542880", "로컬브랜딩과 지역활력타운"],
  ["223208973374", "로컬에서 창업하기 : 사업계획서 작성법"],
  ["222951578589", "지역의 변화를 이끌어나가는 사람들"],
  ["222933952447", "도시에 살지만 지역을 사랑하는 '관계 인구'입니다"],
  ["222884164080", "로컬의 혁신가가 주도하여 혁신하는 도시재생의 발전방향에 대하여"],
] as const;

export const historicalArchiveIds = records.map(([id]) => id);
export const archivePostId = (url: string) => {
  const parsed = new URL(url);
  return parsed.searchParams.get("logNo") ?? parsed.pathname.split("/").at(-1) ?? "";
};

const decode = (value: string) => value.replace(/&(?:amp|quot|apos|lt|gt|#39|#34);/g,
  (entity) => ({ "&amp;": "&", "&quot;": '"', "&apos;": "'", "&lt;": "<", "&gt;": ">", "&#39;": "'", "&#34;": '"' })[entity]!);

export function historicalMetadata(html: string, id: string, fallbackTitle: string): ArchiveItem {
  const meta = (name: string) => {
    for (const tag of Array.from(html.matchAll(/<meta\b[^>]*>/gi))) {
      const attributes = Object.fromEntries(Array.from(tag[0].matchAll(/([\w:-]+)\s*=\s*(["'])([\s\S]*?)\2/g),
        (match) => [match[1].toLowerCase(), match[3]]));
      if (attributes.property === name) return decode(attributes.content ?? "");
    }
    return "";
  };
  const rawImage = meta("og:image");
  let imageUrl: string | null = null;
  try {
    const image = new URL(rawImage);
    if (image.protocol === "https:" && !image.username && !image.password &&
      (!image.port || image.port === "443") &&
      (image.hostname.endsWith(".pstatic.net") || image.hostname.endsWith(".naver.net"))) imageUrl = image.toString();
  } catch { /* No invented replacement image. */ }
  const date = html.match(/<p\b[^>]*class=["']blog_date["'][^>]*>\s*<span\b[^>]*>(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{1,2}):(\d{2})/);
  return {
    title: meta("og:title") || fallbackTitle,
    url: `https://blog.naver.com/minjoo_lola/${id}`,
    date: date ? `${date[1]}-${date[2].padStart(2, "0")}-${date[3].padStart(2, "0")}T${date[4].padStart(2, "0")}:${date[5]}:00+09:00` : "",
    imageUrl,
  };
}

export async function loadHistoricalArchive(fetcher: Fetcher = fetch) {
  const result: ArchiveItem[] = new Array(records.length);
  let next = 0;
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (next < records.length) {
      const index = next++;
      const [id, title] = records[index];
      const response = await fetchSource(`https://m.blog.naver.com/minjoo_lola/${id}`, "blog", fetcher);
      const html = new TextDecoder().decode(await readLimitedBytes(response, 4 * 1024 * 1024));
      const metadata = historicalMetadata(html, id, title);
      if (!metadata.date || !metadata.imageUrl || metadata.title === title && !html.includes('property="og:title"')) {
        throw new Error("기존 블로그 기록의 공개 메타데이터를 확인하지 못했습니다.");
      }
      result[index] = metadata;
    }
  }));
  return result;
}

export function mergeArchive(recent: ArchiveItem[], historical: ArchiveItem[]) {
  const seen = new Set<string>();
  return [...recent, ...historical].filter((item) => {
    const id = archivePostId(item.url);
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}
