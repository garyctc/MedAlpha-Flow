import "@/i18n";
import { act, screen } from "@testing-library/react";
import { beforeEach, afterEach, it, vi } from "vitest";
import { renderWithRouter } from "@/test/test-utils";
import AppointmentsPage from "@/pages/appointments/index";
import { clearStorage } from "@/lib/storage";
import { formatLocalDate } from "@/i18n";

beforeEach(() => {
  vi.useFakeTimers();
  clearStorage();
  localStorage.setItem(
    "pending-smart-match-booking",
    JSON.stringify({
      id: "pending-1",
      dateIso: "2026-02-07",
      time: "10:00",
      createdAt: "2026-01-27T14:00:00Z",
    })
  );
});

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
  clearStorage();
  localStorage.removeItem("pending-smart-match-booking");
});

it("shows searching state for pending bookings", async () => {
  renderWithRouter(<AppointmentsPage />, "/appointments");

  await act(async () => {
    vi.advanceTimersByTime(600);
  });

  const dateLabel = formatLocalDate("2026-02-07", "en");
  expect(screen.getByText("SEARCHING")).toBeInTheDocument();
  expect(screen.getByText("Searching for doctor")).toBeInTheDocument();
  expect(screen.queryByText(dateLabel)).not.toBeInTheDocument();
});
