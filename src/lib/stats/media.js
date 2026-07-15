import { fixEncoding } from "../encoding";

function isReelShare(share) {
  if (!share || typeof share.link !== "string") return false;
  return /instagram\.com\/reels?\//i.test(share.link);
}

function isSticker(m) {
  return !m.content &&
      !m.photos &&
      !m.videos &&
      !m.audio_files &&
      !m.share &&
      !m.gifs &&
      !m.files &&
      !m.call_duration &&
      !m.missed &&
      !m.unsent;
}

// Counts photos, shared reel links, and stickers sent per person.
// - Photos: message has a non-empty "photos" array.
// - Reels: message has a "share" object whose link points at an
//   instagram.com/reel(s)/ URL (how shared reels show up in DMs).
// - Stickers: message has a "sticker" object.
export function computeMediaCounts(messages) {
  const images = {};
  const reels = {};
  const stickers = {};

  messages.forEach((m) => {
    const sender = fixEncoding(m.sender_name || "Unknown");

    if (Array.isArray(m.photos) && m.photos.length > 0) {
      images[sender] = (images[sender] || 0) + m.photos.length;
    }
    if (isReelShare(m.share)) {
      reels[sender] = (reels[sender] || 0) + 1;
    }
    if (isSticker(m)) {
      stickers[sender] = (stickers[sender] || 0) + 1;
    }
  });

  return { images, reels, stickers };
}
