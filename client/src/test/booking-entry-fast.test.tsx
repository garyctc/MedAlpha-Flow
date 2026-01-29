import { describe, it, expect, beforeEach, vi } from "vitest";
import { screen, fireEvent, render } from "@testing-library/react";
import BookingEntry from "@/pages/booking/entry";
import { clearStorage, getBookingDraft } from "@/lib/storage";

const setLocation = vi.fn();

vi.mock("wouter", async () => {
  const actual = await vi.importActual<typeof import("wouter")>("wouter");
  return {
    ...actual,
    useLocation: () => ["/booking/entry", setLocation],
  };
});

describe("BookingEntry fast flow", () => {
  beforeEach(() => {
    clearStorage();
    setLocation.mockClear();
  });

  it("renders the fast entry card first and routes to slots", () => {
    render(<BookingEntry />);

    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings[0]).toHaveTextContent(/find a doctor fast/i);

    fireEvent.click(screen.getByRole("button", { name: /find a doctor fast/i }));

    expect(getBookingDraft()?.entryMode).toBe("fast");
    expect(setLocation).toHaveBeenCalledWith("/booking/slots");
  });
});
