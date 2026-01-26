import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import BookingEntry from "@/pages/booking/entry";
import { renderWithRouter } from "@/test/test-utils";

describe("BookingEntry", () => {
  it("shows both entry options", () => {
    renderWithRouter(<BookingEntry />);
    expect(screen.getByText("Select Specialty")).toBeInTheDocument();
    expect(screen.getByText("Select Doctor")).toBeInTheDocument();
  });
});
