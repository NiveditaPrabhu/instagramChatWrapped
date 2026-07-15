import { Smile } from "lucide-react";
import { topEntries } from "../../lib/format";

export default function TopEmojisSlide({ emojiCounts }) {
  const topEmojis = topEntries(emojiCounts, 8);
  if (topEmojis.length === 0) return null;

  return (
    <div className="slide">
      <Smile size={24} color="#962fbf" style={{ marginBottom: 10 }} />
      <h2 className="display" style={{ fontSize: 24, margin: "0 0 20px" }}>
        Most used emojis
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10,
          width: "100%",
          maxWidth: 360,
        }}
      >
        {topEmojis.map(([emoji, count]) => (
          <div className="emoji-chip" key={emoji}>
            <span style={{ fontSize: 26 }}>{emoji}</span>
            <span className="mono muted" style={{ fontSize: 12 }}>{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
