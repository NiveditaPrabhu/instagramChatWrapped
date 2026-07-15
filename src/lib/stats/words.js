import { fixEncoding } from "../encoding";
import { STOPWORDS, WORD_RE } from "../constants";

// Counts word frequency across message content, filtering common stopwords.
export function computeWordCounts(messages) {
  const wordCounts = {};

  messages.forEach((m) => {
    if (typeof m.content !== "string") return;
    const content = fixEncoding(m.content);
    const words = content.toLowerCase().match(WORD_RE) || [];
    words.forEach((w) => {
      if (!STOPWORDS.has(w)) {
        wordCounts[w] = (wordCounts[w] || 0) + 1;
      }
    });
  });

  return wordCounts;
}
