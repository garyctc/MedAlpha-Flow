import { describe, it, expect, beforeEach, vi } from "vitest";
import { screen, fireEvent, render } from "@testing-library/react";
import BookingReview from "@/pages/booking/review";
import { clearStorage, saveBookingDraft } from "@/lib/storage";

const setLocation = vi.fn();

vi.mock("wouter", async () => {
  const actual = await vi.importActual<typeof import("wouter")>("wouter");
  return {
    ...actual,
    useLocation: () => ["/booking/review", setLocation],
  };
});

describe("BookingReview fast flow", () => {
  beforeEach(() => {
    clearStorage();
    setLocation.mockClear();
  });

  it("shows review request CTA and routes to smart match processing", () => {
    saveBookingDraft({
      entryMode: "fast",
      intent: "new",
      type: "in-person",
      date: "2026-02-02",
      time: "pending",
      timeWindow: "morning",
      location: "DocliQ Health Center",
    });

    render(<BookingReview />);

    expect(screen.getByRole("heading", { name: /review request/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /request appointment/i }));

    expect(setLocation).toHaveBeenCalledWith("/booking/smart-match-processing");
  });
});
