import { topEntries } from "../../lib/format";

export default function RankingSlide({
  icon: Icon,
  iconColor,
  eyebrow,
  title,
  data,
  unitLabel,
  footer,
}) {
  const ranked = topEntries(data, 8);
  if (ranked.length === 0) return null;

  const maxCount = ranked[0][1];
  const leader = ranked[0];

  return (
    <div className="slide">
      {Icon && <Icon size={24} color={iconColor} style={{ marginBottom: 10 }} />}
      {eyebrow && (
        <p className="muted mono" style={{ letterSpacing: 1, fontSize: 12, textTransform: "uppercase", marginBottom: 4 }}>
          {eyebrow}
        </p>
      )}
      <h2 className="display" style={{ fontSize: 24, margin: "0 0 20px" }}>{title}</h2>
      <div className="card" style={{ width: "100%", maxWidth: 380, display: "flex", flexDirection: "column", gap: 12 }}>
        {ranked.map(([name, count], i) => (
          <div className="rank-row" key={name}>
            <span className="mono muted" style={{ width: 18, fontSize: 13 }}>{i + 1}</span>
            <div style={{ flex: 1, textAlign: "left" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                <span>{name}</span>
                <span className="mono muted">
                  {count.toLocaleString()}
                  {unitLabel ? ` ${unitLabel}` : ""}
                </span>
              </div>
              <div className="rank-bar-track">
                <div className="rank-bar-fill" style={{ width: `${Math.max(6, (count / maxCount) * 100)}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {footer && (
        <p className="muted" style={{ fontSize: 13, marginTop: 16 }}>
          {footer(leader[0])}
        </p>
      )}
    </div>
  );
}
