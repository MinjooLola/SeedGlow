import { ReplitConnectors } from "@replit/connectors-sdk";
import type { HistoryItem, PartnerItem, ReviewItem } from "../../shared/homeContent";
import { sheetLayouts, historyColumnsLayout, historyColumnRow, validateHeaders, historyRow, reviewRow, partnerRow, PublicSourceError, type SheetKind } from "./rows";

export type SheetsProxy = (endpoint: string) => Promise<Response>;
interface ValueRange { values?: unknown[][] }
interface SheetMetadata { sheets?: { properties?: { title?: string; gridProperties?: { rowCount?: number } } }[] }

export function isAuthenticatedSheetUrl(raw: string) {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" && url.hostname === "docs.google.com" &&
      /^\/spreadsheets\/(?:u\/\d+\/)?d\/[a-zA-Z0-9_-]+(?:\/edit|\/view)?\/?$/.test(url.pathname) &&
      url.searchParams.get("output") !== "csv" && url.searchParams.get("format") !== "csv";
  } catch { return false; }
}

function columnName(index: number) {
  let result = "";
  for (let number = index + 1; number > 0; number = Math.floor((number - 1) / 26)) {
    result = String.fromCharCode(65 + (number - 1) % 26) + result;
  }
  return result;
}

function cell(value: unknown) {
  if (value === undefined || value === null) return "";
  if (typeof value === "boolean") return value ? "TRUE" : "FALSE";
  if (typeof value === "string" || typeof value === "number") return String(value);
  throw new PublicSourceError("구글시트 셀 형식을 확인해야 합니다.");
}

async function loadSheet<T>(
  kind: SheetKind, raw: string, transform: (row: string[]) => T | T[] | null, suppliedProxy?: SheetsProxy,
  layout: { title: string; columns: number[]; headers: Record<number, string> } = sheetLayouts[kind],
): Promise<T[]> {
  if (!isAuthenticatedSheetUrl(raw)) throw new PublicSourceError("Google Sheets 편집 주소가 필요합니다.");
  const url = new URL(raw);
  const id = url.pathname.match(/\/d\/([a-zA-Z0-9_-]+)/)![1];
  // A new SDK instance for each refresh; the SDK owns credentials and refresh.
  const connectors = suppliedProxy ? undefined : new ReplitConnectors();
  const proxy: SheetsProxy = suppliedProxy ?? ((endpoint) => connectors!.proxy("google-sheet", endpoint, { method: "GET" }));
  async function request<TResponse>(endpoint: string): Promise<TResponse> {
    const response = await proxy(endpoint);
    if (!response.ok) {
      await response.body?.cancel();
      throw new PublicSourceError(response.status === 401 || response.status === 403 ?
        "연결한 Google 계정의 시트 읽기 권한을 확인해 주세요." : "Google Sheets 데이터를 가져오지 못했습니다.");
    }
    return response.json();
  }
  const base = `/v4/spreadsheets/${encodeURIComponent(id)}`;
  const metadata = await request<SheetMetadata>(`${base}?fields=sheets.properties(title,gridProperties.rowCount)`);
  const target = metadata.sheets?.find((sheet) => sheet.properties?.title === layout.title)?.properties;
  if (!target) throw new PublicSourceError(`구글시트에서 ${layout.title} 탭을 찾지 못했습니다.`);
  const rowCount = target.gridProperties?.rowCount;
  if (!Number.isInteger(rowCount) || rowCount! < 1) throw new PublicSourceError("구글시트 행 범위를 확인해야 합니다.");
  const title = `'${layout.title.replace(/'/g, "''")}'`;
  const groups: { first: number; last: number }[] = [];
  for (const column of layout.columns) {
    const last = groups[groups.length - 1];
    if (last && last.last + 1 === column) last.last = column;
    else groups.push({ first: column, last: column });
  }

  async function rows(first: number, last: number) {
    const parameters = new URLSearchParams({
      majorDimension: "ROWS", valueRenderOption: "FORMATTED_VALUE", fields: "valueRanges(values)",
    });
    for (const group of groups) parameters.append("ranges", `${title}!${columnName(group.first)}${first}:${columnName(group.last)}${last}`);
    // Reviews request only A:D. Partners request A:B and D:D, never C or E.
    const data = await request<{ valueRanges?: ValueRange[] }>(`${base}/values:batchGet?${parameters}`);
    if (!data.valueRanges || data.valueRanges.length !== groups.length) throw new PublicSourceError("구글시트 응답 범위가 요청과 다릅니다.");
    const height = Math.max(0, ...data.valueRanges.map((range) => range.values?.length ?? 0));
    const projected: string[][] = Array.from({ length: height }, () => []);
    groups.forEach((group, groupIndex) => {
      for (let index = 0; index < height; index++) {
        for (let column = group.first; column <= group.last; column++) {
          projected[index][column] = cell(data.valueRanges![groupIndex].values?.[index]?.[column - group.first]);
        }
      }
    });
    return projected;
  }

  // Validate the allowed header cells before requesting any content rows.
  validateHeaders((await rows(1, 1))[0] ?? [], layout.columns, layout.headers);
  const items: T[] = [];
  for (let first = 2; first <= rowCount!; first += 1000) {
    for (const row of await rows(first, Math.min(first + 999, rowCount!))) {
      const item = transform(row);
      if (Array.isArray(item)) items.push(...item);
      else if (item !== null) items.push(item);
    }
  }
  return items;
}

export const loadSheetHistory = (url: string, proxy?: SheetsProxy): Promise<HistoryItem[]> => loadSheet("history", url, historyRow, proxy);
export const loadSheetHistoryColumns = (url: string, proxy?: SheetsProxy): Promise<HistoryItem[]> =>
  loadSheet("history", url, historyColumnRow, proxy, historyColumnsLayout);
export const loadSheetReviews = (url: string, proxy?: SheetsProxy): Promise<ReviewItem[]> => loadSheet("reviews", url, reviewRow, proxy);
export const loadSheetPartners = (url: string, proxy?: SheetsProxy): Promise<PartnerItem[]> => loadSheet("partners", url, partnerRow, proxy);
