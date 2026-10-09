import { ReplitConnectors } from "@replit/connectors-sdk";

// Previously published, anonymous testimonials omitted during the sheet migration.
// Run manually; the website never writes to its source spreadsheet.
const missingReviews = [
  ["건설적 피드백", "해외 시장 진출에 있어 막막한 부분을 잘 상기 시켜주셨습니다. 새로 스타트업을 시작하고 새로운 곳에서 피칭을 할 때 여러가지 보완하고 보강해야할 건설적인 피드백이 많아서 좋았습니다.", "1년차 Contents 스타트업, 미국 VC 투자 IR 준비 중", "TRUE"],
  ["실전 IR 노하우", "최근 IR을 많이 하고 다니는데, 계속 좋은 결과를 얻지 못했거든요. 부족한 저의 IR을 현재 합격한 기업과 비교해서 잘 얘기해주시니 도움이 많이 되었어요. 실제 IR을 많이 들어가보셔서 어떤 부분을 전략으로 나가야 할 지 잘 알려주셨어요!!", "1년차 HealthTech 스타트업, IR 및 정부지원사업 준비 중", "TRUE"],
  ["PMF 검증 전략", "잘 몰랐던 자금 조달 부분에 대해 단계별로 알 수 있었고, poc, pmf 등 수치적으로 감을 잡기 어려운 부분, 투자 유치 시점 등 정성적으로 감을 잡기 어려운 부분을 논리적으로 잘 설명해주셔서 좋았습니다. 다양한 대안을 들어서 알려주셔서 그 중 저에게 맞는 대안이 무엇일지 고민해보는 계기가 되었습니다.", "1년차 Sports 스타트업, 정부지원사업 참여 중", "TRUE"],
  ["브랜드 고도화", "사실 신청 전까지 고민을 많이 했는데요. 오늘 대표님의 이야기가 제가 브랜드를 고도화하는데 많은 도움이 될 것 같아 잘한 선택이라고 제 스스로를 칭찬해 주고 싶습니다.", "로컬 Lifestyle 분야 예비 창업가", "TRUE"],
  ["글로벌 진출 전략", "짧은 상담 시간에도 불구하고 저희 스타트업의 핵심을 꿰뚫는 진심 어린 조언을 해주셔서 진심으로 감사드립니다. 당시 제가 가진 방향성에 대한 질문에 대표님의 조언은 마치 '파란 지시등'처럼 명확한 길을 제시해주셨습니다. 덕분에 저희 솔루션이 글로벌 마켓을 대상으로 하는 콘텐츠인 만큼 해외 시장으로 '직진'해야겠다는 확신을 얻게 되었습니다.", "1년차 에듀테크 스타트업, 이전 회사 Exit 후 신규 비즈니스 IR 준비 중", "TRUE"],
];

const source = process.env.HOME_REVIEWS_CSV_URL;
const id = source?.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/)?.[1];
if (!id) throw new Error("인증된 후기 시트 주소가 필요합니다.");
const connector = new ReplitConnectors();
const range = encodeURIComponent("'홈_후기'!A1:D1000");
const base = `/v4/spreadsheets/${id}/values/${range}`;
const read = await connector.proxy("google-sheet", base, { method: "GET" });
if (!read.ok) throw new Error(`후기 시트 조회 실패 (${read.status})`);
const rows: string[][] = (await read.json()).values ?? [];
if (rows[0]?.join("|") !== "키워드|후기 본문(게시용)|표기|게시") throw new Error("후기 열 이름 확인이 필요합니다.");
const normalized = (body: string) => body.replace(/\s/g, "");
const additions = missingReviews.filter((row) => !rows.slice(1).some((existing) =>
  existing[0] === row[0] || normalized(existing[1] ?? "") === normalized(row[1]),
));
if (additions.length) {
  const response = await connector.proxy("google-sheet", `${base}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, {
    method: "POST", body: JSON.stringify({ values: additions }),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error(`후기 복원 실패 (${response.status})`);
  console.log(JSON.stringify({ restored: additions.length, updatedRange: (await response.json()).updates?.updatedRange }));
} else console.log(JSON.stringify({ restored: 0, message: "기존 후기 모두 존재" }));
