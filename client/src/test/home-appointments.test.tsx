import "@/i18n";
import { act, screen, within } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import Home from "@/pages/home";
import { renderWithRouter } from "@/test/test-utils";
import { NotificationsProvider } from "@/contexts/NotificationsContext";
import { clearStorage, saveAppointment, seedDemoData } from "@/lib/storage";

function renderHome() {
  return renderWithRouter(
    <NotificationsProvider>
      <Home />
    </NotificationsProvider>
  );
}

describe("Home appointments sections", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: false,
        media: "",
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    class MockIntersectionObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }

    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      value: MockIntersectionObserver,
    });

    class MockResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }

    Object.defineProperty(window, "ResizeObserver", {
      writable: true,
      value: MockResizeObserver,
    });
  });
  beforeEach(() => {
    vi.useFakeTimers();
    clearStorage();
    seedDemoData();

    saveAppointment({
      id: "extra-upcoming-1",
      type: "in-person",
      doctor: "Dr. Ada Lovelace",
      specialty: "General Practice",
      clinic: "DocliQ Health Center",
      date: "2026-02-07",
      time: "09:00",
      status: "upcoming",
      createdAt: "2026-01-27T14:00:00Z",
    });

    saveAppointment({
      id: "extra-processing-1",
      type: "video",
      doctor: "Dr. Alan Turing",
      specialty: "Dermatology",
      clinic: "Teleclinic",
      date: "2026-02-08",
      time: "pending",
      status: "processing",
      createdAt: "2026-01-27T15:00:00Z",
    });

    saveAppointment({
      id: "extra-completed-1",
      type: "video",
      doctor: "Dr. Grace Hopper",
      specialty: "General Practice",
      clinic: "Teleclinic",
      date: "2025-10-01",
      time: "14:00",
      status: "completed",
      createdAt: "2025-10-01T14:00:00Z",
    });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    clearStorage();
  });

  it("shows My Appointments and Book Again sections with max 5 items", async () => {
    renderHome();

    await act(async () => {
      vi.advanceTimersByTime(600);
    });

    expect(screen.getByText("My Appointments")).toBeInTheDocument();
    expect(screen.getByText("Book Again")).toBeInTheDocument();

    const myAppointmentsList = screen.getByTestId("home-my-appointments-list");
    const bookAgainList = screen.getByTestId("home-book-again-list");

    expect(within(myAppointmentsList).getAllByRole("button")).toHaveLength(5);
    expect(within(bookAgainList).getAllByRole("button")).toHaveLength(5);
  });
});
