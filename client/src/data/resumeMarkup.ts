import { founderIntro } from "./founderIntro";

export const escapeHtml = (text: string) => text.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[character]!);

export function resumeProfileHtml() {
  return [
    `<p>대표: ${escapeHtml(founderIntro.name)} | ${escapeHtml(founderIntro.title)}</p>`,
    `<p>${escapeHtml(founderIntro.previousTitle)}</p>`,
    `<p>핵심 분야: ${escapeHtml(founderIntro.coreWork.join(", "))}</p>`,
    ...founderIntro.paragraphs.map((text) => `<p>${escapeHtml(text)}</p>`),
  ].join("\n");
}
