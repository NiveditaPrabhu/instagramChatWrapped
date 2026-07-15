import { fixEncoding } from "../encoding";
import { STOPWORDS, WORD_RE } from "../constants";

// Mirrors words.js but keeps a separate word-frequency map per sender
// instead of aggregating across the whole chat, so each person's own
// top words can be shown.
export function computeWordCountsByPerson(messages) {
  const byPerson = {};

  messages.forEach((m) => {
    if (typeof m.content !== "string") return;
    const sender = fixEncoding(m.sender_name || "Unknown");
    const content = fixEncoding(m.content);
    const words = content.toLowerCase().match(WORD_RE) || [];
    if (words.length === 0) return;

    if (!byPerson[sender]) byPerson[sender] = {};
    words.forEach((w) => {
      if (!STOPWORDS.has(w)) {
        byPerson[sender][w] = (byPerson[sender][w] || 0) + 1;
      }
    });
  });

  return byPerson;
}
