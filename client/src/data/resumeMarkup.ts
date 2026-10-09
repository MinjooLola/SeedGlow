import { consulting, founderIntro, judging, lectures } from "./aboutHistory";

export const escapeHtml = (text: string) => text.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[character]!);

export function resumeProfileHtml() {
  const list = (heading: string, entries: string[]) =>
    `<h3>${escapeHtml(heading)}</h3><ul>${entries.map((text) =>
      `<li>${escapeHtml(text)}</li>`,
    ).join("")}</ul>`;
  return [
    `<p>대표: ${escapeHtml(founderIntro.name)} | ${escapeHtml(founderIntro.title)}</p>`,
    `<p>${escapeHtml(founderIntro.previousTitle)}</p>`,
    `<p>핵심 분야: ${escapeHtml(founderIntro.coreWork.join(", "))}</p>`,
    ...founderIntro.paragraphs.map((text) => `<p>${escapeHtml(text)}</p>`),
    list("강의", lectures),
    list("컨설팅", consulting),
    list("심사", judging),
  ].join("\n");
}
