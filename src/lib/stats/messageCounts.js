import { fixEncoding } from "../encoding";

// Counts total messages sent by each participant.
export function computeMessageCounts(messages) {
  const perPerson = {};
  messages.forEach((m) => {
    const sender = fixEncoding(m.sender_name || "Unknown");
    perPerson[sender] = (perPerson[sender] || 0) + 1;
  });
  return perPerson;
}
