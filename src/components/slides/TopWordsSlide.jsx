import { Hash } from "lucide-react";
import { topEntries } from "../../lib/format";

export default function TopWordsSlide({ wordCounts }) {
  const topWords = topEntries(wordCounts, 6);
  if (topWords.length === 0) return null;

  return (
    <div className="slide">
      <Hash size={24} color="#4f5bd5" style={{ marginBottom: 10 }} />
      <h2 className="display" style={{ fontSize: 24, margin: "0 0 20px" }}>
        Most used words
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", maxWidth: 380 }}>
        {topWords.map(([word, count]) => (
          <span className="word-tag" key={word}>
            {word} <span className="mono muted" style={{ fontSize: 12 }}>×{count}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
