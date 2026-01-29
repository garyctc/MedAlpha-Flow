import { addWeeks, format, parseISO } from "date-fns";

type RecurringBase = { date: string; time: string; id: string };

export function buildRecurringAppointments(
  base: RecurringBase,
  count: number,
  intervalWeeks: number,
) {
  const start = parseISO(base.date);
  return Array.from({ length: count }, (_, i) => {
    const nextDate = format(addWeeks(start, i * intervalWeeks), "yyyy-MM-dd");
    return { ...base, id: `${base.id}-${i + 1}`, date: nextDate };
  });
}
