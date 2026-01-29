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
      type: "in-person",
      doctor: "Dr. Alan Turing",
      specialty: "Dermatology",
      clinic: "DocliQ Health Center",
      date: "2026-02-08",
      time: "pending",
      status: "processing",
      createdAt: "2026-01-27T15:00:00Z",
    });

    saveAppointment({
      id: "extra-completed-1",
      type: "in-person",
      doctor: "Dr. Grace Hopper",
      specialty: "General Practice",
      clinic: "DocliQ Health Center",
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

  it("shows My Appointments and Book Again sections with max 3 items", async () => {
    renderHome();

    await act(async () => {
      vi.advanceTimersByTime(600);
    });

    expect(screen.getByText("My appointments")).toBeInTheDocument();
    expect(screen.getByText("Book Again")).toBeInTheDocument();

    const myAppointmentsList = screen.getByTestId("home-my-appointments-list");
    const bookAgainList = screen.getByTestId("home-book-again-list");

    expect(within(myAppointmentsList).getAllByRole("button")).toHaveLength(3);
    expect(within(bookAgainList).getAllByRole("button")).toHaveLength(3);
  });

  it("hides See all when sections have 3 or fewer items", async () => {
    clearStorage();

    saveAppointment({
      id: "small-upcoming-1",
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
      id: "small-completed-1",
      type: "in-person",
      doctor: "Dr. Grace Hopper",
      specialty: "General Practice",
      clinic: "DocliQ Health Center",
      date: "2025-10-01",
      time: "14:00",
      status: "completed",
      createdAt: "2025-10-01T14:00:00Z",
    });

    renderHome();

    await act(async () => {
      vi.advanceTimersByTime(600);
    });

    expect(screen.queryByText("See all")).not.toBeInTheDocument();
  });

  it("shows prototype appointments even when storage is empty", async () => {
    clearStorage();

    renderHome();

    await act(async () => {
      vi.advanceTimersByTime(600);
    });

    const myAppointmentsList = screen.getByTestId("home-my-appointments-list");

    expect(within(myAppointmentsList).getAllByRole("button")).toHaveLength(3);
    const searchingLabel = screen.getByText("Searching");
    const waitingLabel = screen.getByText("Waiting for confirmation");
    expect(searchingLabel).toBeInTheDocument();
    expect(waitingLabel).toBeInTheDocument();
    expect(searchingLabel).toHaveClass("bg-yellow-50", "text-yellow-700");
    expect(waitingLabel).toHaveClass("bg-yellow-50", "text-yellow-700");
    expect(screen.getByText("Confirmed")).toBeInTheDocument();
  });

  it("shows searching copy in the prototype list", async () => {
    clearStorage();

    renderHome();

    await act(async () => {
      vi.advanceTimersByTime(600);
    });

    expect(screen.getByText("Searching for doctor")).toBeInTheDocument();
  });
});
