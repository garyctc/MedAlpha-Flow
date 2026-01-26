import { describe, it, expect } from "vitest";
import { buildDraftAppointmentSeries } from "@/lib/booking/review";
import type { BookingDraft } from "@/types/storage";

describe("booking review logic", () => {
  it("creates recurring appointments when enabled", () => {
    const draft: BookingDraft = {
      date: "2026-01-10",
      time: "09:00",
      recurring: true,
      recurrenceCount: 2,
      recurrenceIntervalWeeks: 1,
    };
    const items = buildDraftAppointmentSeries(draft, "appt");
    expect(items).toHaveLength(2);
    expect(items[1].date).toBe("2026-01-17");
  });
});
