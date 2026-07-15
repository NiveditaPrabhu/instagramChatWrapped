import { Flame, RotateCcw } from "lucide-react";
import { topEntries } from "../../lib/format";

export default function RecapSlide({ stats, onReset }) {
  const topTexter = topEntries(stats.perPerson, 1)[0];
  const topEmoji = topEntries(stats.emojiCounts, 1)[0];

  return (
    <div className="slide">
      <Flame size={26} color="#feda75" style={{ marginBottom: 10 }} />
      <div className="display gradient-text mono" style={{ fontSize: 52, fontWeight: 700, lineHeight: 1 }}>
        {stats.longestStreak}
      </div>
      <p style={{ fontSize: 15, marginTop: 6 }}>day streak without going quiet</p>

      <div
        className="card"
        style={{
          marginTop: 26,
          width: "100%",
          maxWidth: 360,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
          textAlign: "left",
        }}
      >
        <div>
          <p className="muted" style={{ fontSize: 11, margin: "0 0 2px" }}>Total messages</p>
          <p className="mono" style={{ margin: 0, fontSize: 16 }}>{stats.totalMessages.toLocaleString()}</p>
        </div>
        <div>
          <p className="muted" style={{ fontSize: 11, margin: "0 0 2px" }}>Top texter</p>
          <p style={{ margin: 0, fontSize: 16 }}>{topTexter ? topTexter[0] : "—"}</p>
        </div>
        <div>
          <p className="muted" style={{ fontSize: 11, margin: "0 0 2px" }}>Top emoji</p>
          <p style={{ margin: 0, fontSize: 16 }}>{topEmoji ? topEmoji[0] : "—"}</p>
        </div>
        <div>
          <p className="muted" style={{ fontSize: 11, margin: "0 0 2px" }}>Longest streak</p>
          <p className="mono" style={{ margin: 0, fontSize: 16 }}>{stats.longestStreak} days</p>
        </div>
      </div>

      <p className="muted" style={{ marginTop: 20, fontSize: 13 }}>That's a wrap ✨</p>
      <button className="btn" style={{ marginTop: 16 }} onClick={onReset}>
        <RotateCcw size={16} /> Wrap another chat
      </button>
    </div>
  );
}
