import { fixEncoding } from "../encoding";

// Instagram's export doesn't consistently expose an explicit "replied to"
// reference across every account/export version. This checks the field
// names known to carry it when present. If none are found anywhere in the
// dataset, computeReplyCounts returns null so the UI can hide this stat
// instead of showing an all-zero, misleading leaderboard.
function getRepliedToSender(m) {
  if (m.replied_to_message?.sender_name) return m.replied_to_message.sender_name;
  if (m.reply_to?.sender_name) return m.reply_to.sender_name;
  if (m.message_replied_to?.sender_name) return m.message_replied_to.sender_name;
  return null;
}

export function computeReplyCounts(messages) {
  const perPerson = {};
  let foundAny = false;

  messages.forEach((m) => {
    const repliedToSender = getRepliedToSender(m);
    if (!repliedToSender) return;
    foundAny = true;
    const sender = fixEncoding(m.sender_name || "Unknown");
    perPerson[sender] = (perPerson[sender] || 0) + 1;
  });

  return foundAny ? perPerson : null;
}
