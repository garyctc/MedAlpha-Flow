import { describe, it, expect } from "vitest";
import { seedBookAgainDraft } from "@/lib/booking/intent";
import { getBookingDraft } from "@/lib/storage";

describe("appointments actions", () => {
  it("seeds book-again intent from an appointment", () => {
    seedBookAgainDraft({
      id: "appt-1",
      type: "in-person",
      doctor: "Dr. Anna Schmidt",
      specialty: "General Practice",
      clinic: "DocliQ Health Center",
      date: "2026-01-10",
      time: "09:00",
      status: "upcoming",
      createdAt: "2026-01-09T10:00:00Z",
    });
    expect(getBookingDraft()?.intent).toBe("book-again");
  });
});
