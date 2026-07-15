import { topEntries } from "../../lib/format";

export default function TopTextersSlide({ perPerson }) {
  const ranked = topEntries(perPerson, 8);
  const maxCount = ranked.length ? ranked[0][1] : 1;
  const topTexter = ranked[0];

  return (
    <div className="slide">
      <p className="muted mono" style={{ letterSpacing: 1, fontSize: 12, textTransform: "uppercase", marginBottom: 4 }}>
        Never stopped typing
      </p>
      <h2 className="display" style={{ fontSize: 24, margin: "0 0 20px" }}>
        Who sent the most texts
      </h2>
      <div className="card" style={{ width: "100%", maxWidth: 380, display: "flex", flexDirection: "column", gap: 12 }}>
        {ranked.map(([name, count], i) => (
          <div className="rank-row" key={name}>
            <span className="mono muted" style={{ width: 18, fontSize: 13 }}>{i + 1}</span>
            <div style={{ flex: 1, textAlign: "left" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                <span>{name}</span>
                <span className="mono muted">{count.toLocaleString()}</span>
              </div>
              <div className="rank-bar-track">
                <div className="rank-bar-fill" style={{ width: `${Math.max(6, (count / maxCount) * 100)}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {topTexter && (
        <p className="muted" style={{ fontSize: 13, marginTop: 16 }}>
          <span className="gradient-text" style={{ fontWeight: 600 }}>{topTexter[0]}</span> carried this chat.
        </p>
      )}
    </div>
  );
}
