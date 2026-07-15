import { Hash } from "lucide-react";
import { topEntries } from "../../lib/format";

export default function TopWordsByPersonSlide({ wordCountsByPerson, perPerson }) {
  // Order and limit people the same way TopTextersSlide does, so this
  // slide stays readable in larger group chats.
  const people = topEntries(perPerson, 6).map(([name]) => name);

  const entries = people
    .map((name) => ({ name, topWords: topEntries(wordCountsByPerson[name] || {}, 3) }))
    .filter((e) => e.topWords.length > 0);

  if (entries.length === 0) return null;

  return (
    <div className="slide">
      <Hash size={24} color="#4f5bd5" style={{ marginBottom: 10 }} />
      <h2 className="display" style={{ fontSize: 24, margin: "0 0 20px" }}>
        Everyone's go-to words
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 380 }}>
        {entries.map(({ name, topWords }) => (
          <div className="card" key={name} style={{ textAlign: "left" }}>
            <p style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 600 }}>{name}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {topWords.map(([word, count]) => (
                <span className="word-tag" key={word} style={{ padding: "6px 12px", fontSize: 13 }}>
                  {word} <span className="mono muted" style={{ fontSize: 11 }}>×{count}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
