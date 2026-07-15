import { computeMessageCounts } from "./messageCounts";
import { computeEmojiCounts } from "./emojis";
import { computeWordCounts } from "./words";
import { computeTimingStats } from "./timing";
import { computeLongestStreak } from "./streak";
import { computeReactionCounts } from "./reactions";
import { computeMediaCounts } from "./media";
import { computeSwearCounts } from "./profanity";
import { computeReplyCounts } from "./replies";
import { computeWordCountsByPerson } from "./wordsByPerson";

export function computeStats(messages) {
  const perPerson = computeMessageCounts(messages);
  const emojiCounts = computeEmojiCounts(messages);
  const wordCounts = computeWordCounts(messages);
  const wordCountsByPerson = computeWordCountsByPerson(messages);
  const timing = computeTimingStats(messages);
  const longestStreak = computeLongestStreak(timing.dailyCounts);
  const reactionCounts = computeReactionCounts(messages);
  const media = computeMediaCounts(messages);
  const swearCounts = computeSwearCounts(messages);
  const replyCounts = computeReplyCounts(messages);

  return {
    totalMessages: messages.length,
    perPerson,
    emojiCounts,
    wordCounts,
    wordCountsByPerson,
    longestStreak,
    reactionCounts,
    images: media.images,
    reels: media.reels,
    stickers: media.stickers,
    swearCounts,
    replyCounts,
    ...timing,
  };
}
