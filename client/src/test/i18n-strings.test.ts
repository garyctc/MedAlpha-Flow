import { describe, it, expect } from "vitest";
import en from "@/i18n/locales/en.json";

describe("i18n strings", () => {
  it("contains booking.entry labels", () => {
    expect(en.booking?.entry?.selectSpecialty).toBeDefined();
  });
});
