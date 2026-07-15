import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { countWordUsage } from "../../lib/wordSearch";
import { topEntries } from "../../lib/format";

export default function WordSearchSlide({ messages }) {
  const [word, setWord] = useState("");

  const results = useMemo(() => {
    if (!word.trim()) return [];
    return topEntries(countWordUsage(messages, word), 8);
  }, [word, messages]);

  const maxCount = results.length ? results[0][1] : 1;

  return (
    <div className="slide">
      <Search size={24} color="#feda75" style={{ marginBottom: 10 }} />
      <h2 className="display" style={{ fontSize: 24, margin: "0 0 6px" }}>
        Who says it most?
      </h2>
      <p className="muted" style={{ fontSize: 13, margin: "0 0 18px" }}>
        Type any word to see who used it most
      </p>

      <input
        className="word-input"
        type="text"
        placeholder="e.g. literally, actually, bro…"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        style={{ width: "100%", maxWidth: 300, marginBottom: 20 }}
      />

      {word.trim() && results.length === 0 && (
        <p className="muted" style={{ fontSize: 13 }}>
          Nobody's said "{word.trim()}" in this chat.
        </p>
      )}

      {results.length > 0 && (
        <div className="card" style={{ width: "100%", maxWidth: 380, display: "flex", flexDirection: "column", gap: 12 }}>
          {results.map(([name, count], i) => (
            <div className="rank-row" key={name}>
              <span className="mono muted" style={{ width: 18, fontSize: 13 }}>{i + 1}</span>
              <div style={{ flex: 1, textAlign: "left" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                  <span>{name}</span>
                  <span className="mono muted">{count}</span>
                </div>
                <div className="rank-bar-track">
                  <div className="rank-bar-fill" style={{ width: `${Math.max(6, (count / maxCount) * 100)}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
