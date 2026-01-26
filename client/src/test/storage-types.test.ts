import { describe, it, expect } from "vitest";
import type { BookingDraft } from "@/types/storage";

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
