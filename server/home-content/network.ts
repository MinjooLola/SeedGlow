export type Fetcher = typeof fetch;

function isAllowed(url: URL, kind: "csv" | "rss" | "image") {
  if (url.protocol !== "https:" || url.username || url.password || (url.port && url.port !== "443")) return false;
  if (kind === "rss") return url.hostname === "rss.blog.naver.com";
  if (kind === "csv") return url.hostname === "docs.google.com" || url.hostname.endsWith(".googleusercontent.com");
  return url.hostname.endsWith(".pstatic.net") || url.hostname.endsWith(".naver.net");
}

export async function fetchSource(url: string, kind: "csv" | "rss" | "image", fetcher: Fetcher = fetch) {
  const signal = AbortSignal.timeout(15_000);
  let target = new URL(url);
  if (kind === "csv" && (target.hostname !== "docs.google.com" || !target.pathname.startsWith("/spreadsheets/") ||
    !["csv"].includes(target.searchParams.get("output") ?? target.searchParams.get("format") ?? ""))) {
    throw new Error("구글 시트의 웹에 게시된 CSV 주소가 필요합니다.");
  }
  for (let redirects = 0; redirects <= 4; redirects++) {
    if (!isAllowed(target, kind)) throw new Error("허용되지 않은 데이터 출처입니다.");
    const response = await fetcher(target, { signal, redirect: "manual" });
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("location");
      await response.body?.cancel();
      if (!location) throw new Error("데이터 출처의 이동 주소가 없습니다.");
      target = new URL(location, target);
      continue;
    }
    if (!response.ok) {
      await response.body?.cancel();
      throw new Error("데이터 출처에서 정상 응답을 받지 못했습니다.");
    }
    return response;
  }
  throw new Error("데이터 출처의 주소 이동 횟수를 초과했습니다.");
}

export async function readLimitedBytes(response: Response, maximum: number) {
  if (!response.body) throw new Error("응답이 비어 있습니다.");
  const reader = response.body.getReader();
  const parts: Uint8Array[] = [];
  let bytes = 0;
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      bytes += part.value.byteLength;
      if (bytes > maximum) {
        await reader.cancel();
        throw new Error("응답 크기가 안전 한도를 초과했습니다.");
      }
      parts.push(part.value);
    }
    return Buffer.concat(parts);
  } finally { reader.releaseLock(); }
}
