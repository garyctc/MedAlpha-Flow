import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import BookingSlots from "@/pages/booking/slots";
import { renderWithRouter } from "@/test/test-utils";

describe("BookingSlots", () => {
  it("shows a recurring toggle", () => {
    renderWithRouter(<BookingSlots />);
    expect(screen.getByText("Make recurring")).toBeInTheDocument();
  });
});
