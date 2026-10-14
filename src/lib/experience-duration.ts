const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function parseMonthYear(value: string) {
  const [month, year] = value.split(" ");
  const monthIndex = MONTHS.indexOf(month);

  if (monthIndex < 0 || !Number.isInteger(Number(year))) {
    throw new Error(`Invalid experience date: ${value}`);
  }

  return Number(year) * 12 + monthIndex;
}

export function countUniqueExperienceMonths(ranges: string[]) {
  const intervals = ranges
    .map((range) => {
      const [start, end = start] = range.split(" - ").map((value) => value.trim());
      return {
        start: parseMonthYear(start),
        end: end.toLowerCase().includes("present")
          ? parseMonthYear(
              `${MONTHS[new Date().getMonth()]} ${new Date().getFullYear()}`,
            )
          : parseMonthYear(end),
      };
    })
    .sort((a, b) => a.start - b.start);

  let total = 0;
  let current: (typeof intervals)[number] | undefined;

  for (const interval of intervals) {
    if (!current) {
      current = interval;
      continue;
    }

    if (interval.start <= current.end + 1) {
      current.end = Math.max(current.end, interval.end);
      continue;
    }

    total += current.end - current.start + 1;
    current = interval;
  }

  return current ? total + current.end - current.start + 1 : total;
}
