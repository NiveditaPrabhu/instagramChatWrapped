import { DAY_NAMES } from "../constants";

// Computes when the chat is most active: weekday, hour, and daily message
// counts (the latter is also reused by the streak stat).
export function computeTimingStats(messages) {
  const dayOfWeekCounts = [0, 0, 0, 0, 0, 0, 0];
  const hourCounts = new Array(24).fill(0);
  const dailyCounts = {};
  let minTs = Infinity;
  let maxTs = -Infinity;

  messages.forEach((m) => {
    if (!m.timestamp_ms) return;
    minTs = Math.min(minTs, m.timestamp_ms);
    maxTs = Math.max(maxTs, m.timestamp_ms);
    const d = new Date(m.timestamp_ms);
    dayOfWeekCounts[d.getDay()]++;
    hourCounts[d.getHours()]++;
    const dayKey = d.toISOString().slice(0, 10);
    dailyCounts[dayKey] = (dailyCounts[dayKey] || 0) + 1;
  });

  const busiestDayEntry = Object.entries(dailyCounts).sort((a, b) => b[1] - a[1])[0];
  const busiestWeekdayIdx = dayOfWeekCounts.indexOf(Math.max(...dayOfWeekCounts));
  const busiestHourIdx = hourCounts.indexOf(Math.max(...hourCounts));

  return {
    dailyCounts,
    activeDays: Object.keys(dailyCounts).length,
    busiestDay: busiestDayEntry ? { date: busiestDayEntry[0], count: busiestDayEntry[1] } : null,
    busiestWeekday: DAY_NAMES[busiestWeekdayIdx],
    busiestWeekdayCount: dayOfWeekCounts[busiestWeekdayIdx],
    busiestHour: busiestHourIdx,
    busiestHourCount: hourCounts[busiestHourIdx],
    firstTs: minTs,
    lastTs: maxTs,
  };
}
