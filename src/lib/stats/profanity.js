import { fixEncoding } from "../encoding";
import { SWEAR_EXACT_WORDS, SWEAR_WILDCARD_WORDS } from "../constants";

const EXACT_PATTERNS = SWEAR_EXACT_WORDS.map((w) => new RegExp(`\\b${w}\\b`, "g"));
const WILDCARD_PATTERNS = SWEAR_WILDCARD_WORDS.map((w) => new RegExp(`\\b${w}\\w*`, "g"));
const ALL_PATTERNS = [...EXACT_PATTERNS, ...WILDCARD_PATTERNS];

// Counts common profanity usage per person, case-insensitive. Not
// exhaustive — just the common set — and intentionally conservative about
// false positives (see constants.js for why short roots are whole-word only).
export function computeSwearCounts(messages) {
  const perPerson = {};

  messages.forEach((m) => {
    if (typeof m.content !== "string") return;
    const content = fixEncoding(m.content).toLowerCase();

    let count = 0;
    ALL_PATTERNS.forEach((re) => {
      const matches = content.match(re);
      if (matches) count += matches.length;
    });

    if (count > 0) {
      const sender = fixEncoding(m.sender_name || "Unknown");
      perPerson[sender] = (perPerson[sender] || 0) + count;
    }
  });

  return perPerson;
}
