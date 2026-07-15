import { Clock } from "lucide-react";
import { formatHour, formatDate } from "../../lib/format";

export default function BusiestTimesSlide({ busiestWeekday, busiestHour, busiestDay }) {
  return (
    <div className="slide">
      <Clock size={24} color="#fa7e1e" style={{ marginBottom: 10 }} />
      <h2 className="display" style={{ fontSize: 24, margin: "0 0 20px" }}>
        The chat's favorite time
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", maxWidth: 340 }}>
        <div className="card">
          <p className="muted" style={{ fontSize: 12, margin: "0 0 4px" }}>Busiest day of the week</p>
          <p className="display" style={{ fontSize: 20, margin: 0 }}>{busiestWeekday}</p>
        </div>
        <div className="card">
          <p className="muted" style={{ fontSize: 12, margin: "0 0 4px" }}>Busiest hour</p>
          <p className="display" style={{ fontSize: 20, margin: 0 }}>{formatHour(busiestHour)}</p>
        </div>
        {busiestDay && (
          <div className="card">
            <p className="muted" style={{ fontSize: 12, margin: "0 0 4px" }}>Loudest single day</p>
            <p className="display" style={{ fontSize: 20, margin: 0 }}>
              {formatDate(new Date(busiestDay.date).getTime())} · {busiestDay.count} messages
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
