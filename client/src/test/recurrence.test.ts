import { describe, it, expect } from "vitest";
import { buildRecurringAppointments } from "@/lib/booking/recurrence";

describe("buildRecurringAppointments", () => {
  it("creates N future appointments at weekly intervals", () => {
    const base = {
      id: "appt-1",
      date: "2026-01-20",
      time: "09:00",
    };
    const items = buildRecurringAppointments(base, 3, 2);
    expect(items).toHaveLength(3);
    expect(items[1].date).toBe("2026-02-03");
  });
});
