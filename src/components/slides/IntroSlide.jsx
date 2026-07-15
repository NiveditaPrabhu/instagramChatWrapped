import { Sparkles, ChevronDown } from "lucide-react";
import { formatDate } from "../../lib/format";

export default function IntroSlide({ chatTitle, firstTs, lastTs, participantCount }) {
  return (
    <div className="slide">
      <Sparkles size={26} color="#fa7e1e" style={{ marginBottom: 14 }} />
      <p className="muted mono" style={{ letterSpacing: 2, fontSize: 12, textTransform: "uppercase", marginBottom: 10 }}>
        Group Chat Wrapped
      </p>
      <h1 className="display gradient-text" style={{ fontSize: 36, fontWeight: 700, margin: 0, lineHeight: 1.15 }}>
        {chatTitle}
      </h1>
      <p className="muted" style={{ marginTop: 14, fontSize: 14 }}>
        {formatDate(firstTs)} → {formatDate(lastTs)} · {participantCount} people
      </p>
      <ChevronDown size={22} className="bounce" style={{ position: "absolute", bottom: 28 }} />
    </div>
  );
}
