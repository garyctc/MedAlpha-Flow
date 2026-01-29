import { describe, it, expect } from "vitest";
import BookingSlots from "@/pages/booking/slots";
import { renderWithRouter } from "@/test/test-utils";

describe("BookingSlots", () => {
  it("renders booking slots screen", () => {
    renderWithRouter(<BookingSlots />);
  });
});
