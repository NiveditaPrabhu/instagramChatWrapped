import { fixEncoding } from "./encoding";

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Counts how many times each person used a specific word (whole-word,
// case-insensitive). Used by the interactive "who says it most" slide
// where the user types any word they want to check.
export function countWordUsage(messages, word) {
  const target = word.trim().toLowerCase();
  if (!target) return {};

  const re = new RegExp(`\\b${escapeRegex(target)}\\b`, "gi");
  const perPerson = {};

  messages.forEach((m) => {
    if (typeof m.content !== "string") return;
    const content = fixEncoding(m.content).toLowerCase();
    const matches = content.match(re);
    if (matches) {
      const sender = fixEncoding(m.sender_name || "Unknown");
      perPerson[sender] = (perPerson[sender] || 0) + matches.length;
    }
  });

  return perPerson;
}
