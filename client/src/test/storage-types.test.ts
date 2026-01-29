import { describe, it, expect } from "vitest";
import type { BookingDraft, Appointment } from "@/types/storage";

describe("BookingDraft", () => {
  it("accepts booking intent and recurrence fields", () => {
    const draft: BookingDraft = {
      entryMode: "specialty",
      intent: "book-again",
      recurring: true,
      recurrenceCount: 3,
      recurrenceIntervalWeeks: 4,
    };
    expect(draft.entryMode).toBe("specialty");
  });
});

describe("BookingDraft + Appointment", () => {
  it("accepts timeWindow and matchStatus fields", () => {
    const draft: BookingDraft = { timeWindow: "morning" };
    const appointment: Appointment = {
      id: "appt-1",
      type: "in-person",
      doctor: "Dr. Sarah Weber",
      specialty: "Dermatology",
      clinic: "DocliQ Health Center",
      date: "2026-01-28",
      time: "pending",
      timeWindow: "morning",
      status: "processing",
      matchStatus: "searching",
      createdAt: new Date().toISOString(),
    };
    expect(draft.timeWindow).toBe("morning");
    expect(appointment.matchStatus).toBe("searching");
  });
});
