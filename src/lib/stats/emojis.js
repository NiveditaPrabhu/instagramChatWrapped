import { fixEncoding } from "../encoding";
import { EMOJI_RE } from "../constants";

// Counts emoji usage across message content. Uses Intl.Segmenter so multi
// -codepoint emoji (skin tones, ZWJ sequences) are counted as one emoji.
export function computeEmojiCounts(messages) {
  const emojiCounts = {};

  let segmenter = null;
  try {
    segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
  } catch (e) {
    segmenter = null;
  }
  if (!segmenter) return emojiCounts;

  messages.forEach((m) => {
    if (typeof m.content !== "string") return;
    const content = fixEncoding(m.content);
    for (const seg of segmenter.segment(content)) {
      if (EMOJI_RE.test(seg.segment)) {
        emojiCounts[seg.segment] = (emojiCounts[seg.segment] || 0) + 1;
      }
    }
  });

  return emojiCounts;
}
