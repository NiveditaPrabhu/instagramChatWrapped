import { MessageCircle } from "lucide-react";

export default function TotalMessagesSlide({ totalMessages, activeDays }) {
  const avgPerDay = activeDays ? (totalMessages / activeDays).toFixed(1) : "0";

  return (
    <div className="slide">
      <MessageCircle size={24} color="#d62976" style={{ marginBottom: 10 }} />
      <p className="muted" style={{ fontSize: 14, margin: "0 0 6px" }}>This chat has sent</p>
      <div className="display gradient-text mono" style={{ fontSize: 64, fontWeight: 700, lineHeight: 1 }}>
        {totalMessages.toLocaleString()}
      </div>
      <p style={{ fontSize: 16, marginTop: 6 }}>messages</p>
      <p className="muted" style={{ fontSize: 13, marginTop: 18 }}>
        across {activeDays.toLocaleString()} active days · ~{avgPerDay} messages/day
      </p>
    </div>
  );
}
