// Computes the longest run of consecutive calendar days containing at
// least one message. Takes the dailyCounts map produced by timing.js.
export function computeLongestStreak(dailyCounts) {
  const sortedDays = Object.keys(dailyCounts).sort();
  let longestStreak = 0;
  let currentStreak = 0;
  let prevDate = null;

  sortedDays.forEach((dayStr) => {
    const d = new Date(dayStr + "T00:00:00Z");
    if (prevDate) {
      const diffDays = Math.round((d - prevDate) / 86400000);
      currentStreak = diffDays === 1 ? currentStreak + 1 : 1;
    } else {
      currentStreak = 1;
    }
    longestStreak = Math.max(longestStreak, currentStreak);
    prevDate = d;
  });

  return longestStreak;
}
