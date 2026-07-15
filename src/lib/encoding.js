// Instagram exports mis-encode non-ASCII bytes (emoji, accents) as if they
// were Latin-1. Each JS char in the corrupted string is actually one raw
// UTF-8 byte, so we can rebuild the byte array and decode it properly.
export function fixEncoding(str) {
  if (!str) return str;
  try {
    const bytes = Uint8Array.from(Array.from(str).map((c) => c.charCodeAt(0) & 0xff));
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch (e) {
    return str;
  }
}
