import "@/i18n";
import { act, fireEvent, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AppointmentsPage from "@/pages/appointments";
import { renderWithRouter } from "@/test/test-utils";
import { clearStorage, seedDemoData } from "@/lib/storage";

describe("Appointments filters", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    clearStorage();
    seedDemoData();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    clearStorage();
  });

  it("renders status filters and shows match statuses", async () => {
    renderWithRouter(<AppointmentsPage />);

    await act(async () => {
      vi.advanceTimersByTime(700);
    });

    const filterBar = screen.getByTestId("appointments-filters");
    [
      "All",
      "Searching",
      "Waiting for confirmation",
      "Confirmed",
      "Rejected",
      "Expired",
      "Completed",
      "Cancelled",
    ].forEach((label) => {
      expect(within(filterBar).getByRole("button", { name: label })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "Searching" }));

    const list = screen.getByTestId("appointments-list");
    expect(within(list).getAllByRole("button")).toHaveLength(1);
    expect(within(list).getByText("Searching")).toBeInTheDocument();
  });
});
