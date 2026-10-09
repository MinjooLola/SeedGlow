import { mkdirSync, writeFileSync } from "node:fs";
import { homeContentService } from "../server/home-content/service";
import { compareRenderedRows, renderPublicViews } from "./render-home-views";

async function verify() {
  const content = await homeContentService.get(process.argv.includes("--refresh"));
  const stringComparison = compareRenderedRows(await renderPublicViews(content), content);
  const newest = content.archive.items.reduce<(typeof content.archive.items)[number] | null>((latest, item) =>
    latest === null || Date.parse(item.date) > Date.parse(latest.date) ? item : latest, null);
  const reviewText = content.reviews.items.map(({ keyword, body, display }) => `${keyword}\n${body}\n${display}`).join("\n");
  const skRows = content.history.items.filter((item) =>
    item.text.includes("SK하이닉스") && item.text.includes("하이로컬이천") && item.text.includes("LIPS"),
  );
  const report = {
    historyStatus: content.history.status,
    historySourceTab: "이력_3열보기",
    historyDatesDisplayed: false,
    historyColumnCounts: Object.fromEntries(["강의", "컨설팅", "심사"].map(category =>
      [category, content.history.items.filter(item => item.category === category).length])),
    publishedHistoryRows: content.stats.historyCount,
    historyMetricBefore: "70+",
    historyMetricAfter: content.stats.historyRounded === null ? "설정·확인 대기" : `${content.stats.historyRounded}+`,
    partnerStatus: content.partners.status,
    allPublishedPartnerChips: content.partners.updatedAt === null ? null : content.partners.items.length,
    countedPartnerChips: content.stats.partnersCount,
    partnersTitleBefore: "60+ 협력기관과 함께합니다",
    partnersTitleAfter: content.stats.partnersRounded === null ? "설정·확인 대기" : `${content.stats.partnersRounded}+ 협력기관과 함께합니다`,
    reviewStatus: content.reviews.status,
    publishedReviews: content.reviews.updatedAt === null ? null : content.reviews.items.length,
    reviewKeys: content.reviews.items[0] ? Object.keys(content.reviews.items[0]) : ["keyword", "body", "display"],
    emailOrPhoneFoundInPublishedReviews: content.reviews.updatedAt === null ? null :
      /[\w.+-]+@[\w.-]+\.[a-z]{2,}|\b01[016789][ -]?\d{3,4}[ -]?\d{4}\b|\+82[ -]?\d{1,2}[ -]?\d{3,4}[ -]?\d{4}/i.test(reviewText),
    archiveStatus: content.archive.status,
    archivePosts: content.archive.updatedAt === null ? null : content.archive.items.length,
    latestArchiveTitle: newest?.title ?? null,
    latestArchiveDate: newest?.date ?? null,
    skHyLocalExpectedCategory: "강의",
    skHyLocalActualCategories: content.history.updatedAt === null ? null : skRows.map((item) => item.category),
    pendingClassification: content.history.updatedAt === null ? ["SK하이닉스 하이로컬이천 LIPS 항목: CSV 연결 후 강의 분류 확인 필요"] :
      skRows.length === 0 ? ["SK하이닉스 하이로컬이천 LIPS 항목: 게시된 시트에서 찾지 못함"] :
      skRows.some((item) => item.category !== "강의") ? ["SK하이닉스 하이로컬이천 LIPS 항목: 시트 구분을 강의로 수정해야 함"] : [],
    unconfiguredVariables: [
      content.history.status === "unconfigured" ? "HOME_HISTORY_CSV_URL" : null,
      content.reviews.status === "unconfigured" ? "HOME_REVIEWS_CSV_URL" : null,
      content.partners.status === "unconfigured" ? "HOME_PARTNERS_CSV_URL" : null,
    ].filter(Boolean),
    stringComparison,
    consultantNameMentionNeedsConfirmation: content.reviews.updatedAt === null ? null :
      content.reviews.items.some((review) => review.body.includes("민주님")),
  };
  mkdirSync("reports", { recursive: true });
  writeFileSync("reports/home-content-verification.json", JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  if (Object.values(stringComparison).some((result) => result && (result.missing || result.extras || result.changedFields || !result.orderUnchanged))) {
    process.exitCode = 1;
  }
}

verify().catch((error) => { console.error(error); process.exitCode = 1; });
