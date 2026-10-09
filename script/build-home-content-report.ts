import { readFile, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { homeContentService } from "../server/home-content/service";
import { shareImage } from "../server/home-content/share-image";

async function main() {
  const report = JSON.parse(await readFile("reports/home-content-verification.json", "utf8"));
  const content = await homeContentService.get();
  const imageBytes = await shareImage();
  await writeFile("reports/share-preview.png", imageBytes);
  const image = imageBytes.toString("base64");
  const shortPeriods = content.history.items.filter((item) => /^\d{4}\.1$/.test(item.period)).length;
  const combinedCategories = content.history.items.filter((item) => item.category === "강의·컨설팅·심사").length;
  const escape = (value: unknown) => String(value).replace(/[&<>"']/g, (char) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
  const files = execFileSync("git", ["status", "--porcelain"], { encoding: "utf8" })
    .trimEnd().split("\n").filter(Boolean).map((line) => line.slice(3))
    .filter((file) => !file.startsWith(".agents/"));
  files.push("reports/home-content-connection-report.html");
  const addedActivities: string[] = [];
  const deletedActivities: string[] = [];
  const comparisons = Object.entries(report.stringComparison).map(([kind, value]) => {
    const comparison = value as { sourceRows: number; renderedRows: number; missing: number; extras: number; changedFields: number; orderUnchanged: boolean } | null;
    return comparison ? `<tr><th>${escape(kind)}</th><td>${comparison.sourceRows}</td><td>${comparison.renderedRows}</td><td>${comparison.missing}</td><td>${comparison.extras}</td><td>${comparison.changedFields}</td><td>${comparison.orderUnchanged ? "유지" : "불일치"}</td></tr>` : "";
  }).join("");
  const timestamp = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  await writeFile("reports/home-content-connection-report.html", `<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>시드글로우 구글시트 연결·검증 보고</title><style>
body{margin:0;background:#faf9f6;color:#28251f;font:16px/1.7 sans-serif}main{max-width:1000px;margin:auto;padding:44px 24px}
h1{line-height:1.4}h2{margin-top:40px;font-size:23px}p,li{overflow-wrap:anywhere}.muted{color:#746f65}.notice{padding:18px 22px;border-left:4px solid #d4a326;background:#fff5d9}
table{border-collapse:collapse;width:100%;background:white;font-size:14px}th,td{text-align:left;padding:12px;border:1px solid #ddd8cc}.scroll{overflow-x:auto}
code{font-size:14px;background:#ece9e2;padding:2px 5px}img{display:block;width:100%;height:auto;border:1px solid #ddd8cc;border-radius:8px}
</style><main><h1>시드글로우 구글시트 연결·검증 보고</h1><p class="muted">${escape(timestamp)} · 게시 전 개발환경 검증</p>
<div class="notice">기존 비공개 시트 주소를 유지하고 Google 계정 인증으로 읽습니다. 시트 공개·CSV 재게시·방문자 로그인은 필요하지 않습니다. 검증 기준은 현재 시트의 <strong>게시=TRUE 행</strong>입니다. 최초 첨부 이력서 전체와의 일대일 대조 결과로 표시하지 않습니다.</div>
<h2>추가한 항목 (${addedActivities.length}건)</h2><p>이번 인증 연결 작업에서 시트 이력 행을 추가하지 않았습니다. 기존 게시 이력 ${report.publishedHistoryRows}건을 그대로 연결했습니다.</p>
<h2>삭제한 항목 (${deletedActivities.length}건)</h2><p>이번 인증 연결 작업에서 시트 이력 행을 삭제하지 않았습니다. 문구·기간·행 순서를 유지했습니다.</p>
<h2>수정한 항목 (이전 → 이후)</h2><ul>
<li>SK하이닉스 하이로컬이천 로컬 기업 투자 사례 및 LIPS 전략: <strong>강의·컨설팅·심사 → 강의</strong>. 해당 행의 구분 셀 한 칸만 수정했습니다.</li>
<li>시트 읽기: 로그인 없이 CSV 접근(401) → 승인한 Google 계정의 Sheets API 인증 연결.</li>
<li>창업 강의/IR 심사: ${escape(report.historyMetricBefore)} → ${escape(report.historyMetricAfter)}. 누적 표시는 ${report.publishedHistoryRows}건.</li>
<li>협력기관 제목: ${escape(report.partnersTitleBefore)} → ${escape(report.partnersTitleAfter)}. 보이는 칩 ${report.allPublishedPartnerChips}개, 집계 대상 ${report.countedPartnerChips}개.</li>
<li>공유 이미지의 고정 40+ → 화면과 같은 집계의 ${escape(report.historyMetricAfter)}. OG·Twitter 태그와 공유 이미지 주소도 연동했습니다.</li>
<li>후기 표기에 중복될 수 있던 추가 ‘- ’를 제거하고 시트 표기를 그대로 표시합니다.</li>
<li>페이지 내부 링크가 시트 로딩 후 해당 섹션으로 이동하도록 수정했습니다.</li></ul>
<p>대표 소개와 기존 서비스·문의 영역은 유지합니다. 300+, 26팀, 50억+는 바꾸지 않았습니다.</p>
<h2>자동 문자열 대조</h2><div class="scroll"><table><thead><tr><th>목록</th><th>원본 행</th><th>화면 행</th><th>누락</th><th>추가</th><th>문구 차이</th><th>순서</th></tr></thead><tbody>${comparisons}</tbody></table></div>
<p>화면에서 실제 사용하는 React 컴포넌트를 렌더링해 기간·내용·구분, 후기 키워드·본문·표기, 기관명을 정확 문자열로 비교했습니다. fixture만 검사한 결과가 아니라 인증된 실제 시트 데이터의 비교 결과입니다.</p>
<h2>후기·아카이브·캐시</h2><ul>
<li>후기 ${report.publishedReviews}개: A:D만 요청하고 공개 DTO는 키워드·본문·표기 세 필드만 저장합니다. 날짜·비공개 원문·원본행·메모를 요청하거나 캐시하지 않습니다. 이메일·전화번호 검출: ${report.emailOrPhoneFoundInPublishedReviews ? "있음" : "없음"}.</li>
<li>협력기관은 A:B와 D열만 요청합니다. 제외 기관도 게시=TRUE이면 칩에는 표시합니다.</li>
<li>본문 요약·절삭·line-clamp·더보기 없이 후기 원문을 표시하고 ‘지속적 파트너십’ 인용문은 별도로 유지합니다.</li>
<li>RSS SeedGlow 게시물 ${report.archivePosts}개. 최신 제목: ${escape(report.latestArchiveTitle)}. 최신 RSS 날짜: ${escape(report.latestArchiveDate)}. 실제 대표 사진만 사용하며 원문 링크는 새 탭으로 열립니다.</li>
<li>서버 1시간 캐시·오류 시 마지막 성공 데이터 유지. 같은 파일시스템의 재시작 복원은 지원하지만 새 배포 인스턴스까지의 영구 캐시 보존은 현재 보장하지 않습니다.</li></ul>
<h2>운영 방법</h2><p>해당 홈_ 탭의 <code>게시</code>를 FALSE로 바꾸면 다음 서버 갱신(최대 약 1시간)과 화면 재조회에 반영됩니다. 협력기관은 <code>집계제외=TRUE</code>이면 칩을 유지하고 숫자에서만 제외합니다. 내용은 시트에서 수정하며 홈페이지 코드를 수정할 필요가 없습니다.</p>
<h2>못 찾았거나 확인이 필요한 곳</h2><ul><li>세 번째 후기 본문에 ‘민주님’ 표현이 있습니다. 게시용 원문을 유지했습니다. 이름 금지에 대표 이름도 포함되는지 확인이 필요합니다.</li><li>기간이 ‘2026.1’ 또는 ‘2025.1’ 형태인 ${shortPeriods}행을 현재 시트 표시값 그대로 유지했습니다. ‘.10’을 의도한 표기인지 추측해서 바꾸지 않았습니다.</li><li>구분이 ‘강의·컨설팅·심사’인 ${combinedCategories}행은 원문 그대로입니다. 세 유형 중 하나로 구분하려는 항목은 시트의 구분 값을 확인해야 합니다.</li><li>현재 게시용 시트 기준 검증이며 최초 이력서 전체 줄 수와의 대조로 간주하지 않습니다.</li><li>최신 변경본은 아직 게시하지 않았습니다. seedglow.co.kr의 새 항목·통계·공유 이미지 검증은 사용자가 Publish한 뒤 진행해야 합니다.</li></ul>
<h2>공유 이미지 미리보기</h2><img src="data:image/png;base64,${image}" alt="공유 이미지의 강의 실적 ${escape(report.historyMetricAfter)}"><h2>고친 파일 경로 목록 — 이번 연결 작업</h2><ul>${Array.from(new Set(files)).sort().map((file) => `<li><code>${escape(file)}</code></li>`).join("")}</ul>
</main></html>`);
  console.log("reports/home-content-connection-report.html");
}

main().catch(() => { console.error("연결 검증 보고 생성에 실패했습니다."); process.exitCode = 1; });
