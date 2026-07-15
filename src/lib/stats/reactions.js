import { fixEncoding } from "../encoding";

// Tallies who has given the most reactions ("likes") to messages in the
// chat. Each reaction object looks like { reaction: "❤", actor: "Name" }.
export function computeReactionCounts(messages) {
  const perPerson = {};

  messages.forEach((m) => {
    if (!Array.isArray(m.reactions)) return;
    m.reactions.forEach((r) => {
      const actor = fixEncoding(r.actor || "Unknown");
      perPerson[actor] = (perPerson[actor] || 0) + 1;
    });
  });

  return perPerson;
}
