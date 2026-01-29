import "@/i18n";
import { act, render, screen } from "@testing-library/react";
import { Router, Route } from "wouter";
import { beforeEach, it, vi } from "vitest";
import AppointmentDetail from "@/pages/appointments/detail";
import { clearStorage, saveAppointment } from "@/lib/storage";
import { formatLocalDate } from "@/i18n";

beforeEach(() => {
  vi.useFakeTimers();
  clearStorage();
});

it("hides date/time for pending appointments", async () => {
  saveAppointment({
    id: "pending-1",
    type: "in-person",
    doctor: "Dr. Lina Becker",
    specialty: "General Practice",
    clinic: "DocliQ Health Center",
    date: "2026-02-07",
    time: "pending",
    status: "processing",
    matchStatus: "waiting",
    createdAt: "2026-01-27T14:00:00Z",
  });

  render(
    <Router base="" hook={() => ["/appointments/pending-1", () => {}]}>
      <Route path="/appointments/:id" component={AppointmentDetail} />
    </Router>
  );

  await act(async () => {
    vi.advanceTimersByTime(400);
  });

  const dateLabel = formatLocalDate("2026-02-07", "en");
  expect(screen.queryByText(dateLabel)).not.toBeInTheDocument();
});

it("shows searching copy instead of doctor identity", async () => {
  saveAppointment({
    id: "searching-1",
    type: "in-person",
    doctor: "Dr. Lina Becker",
    specialty: "General Practice",
    clinic: "DocliQ Health Center",
    date: "2026-02-07",
    time: "pending",
    status: "processing",
    matchStatus: "searching",
    createdAt: "2026-01-27T14:00:00Z",
  });

  render(
    <Router base="" hook={() => ["/appointments/searching-1", () => {}]}>
      <Route path="/appointments/:id" component={AppointmentDetail} />
    </Router>
  );

  await act(async () => {
    vi.advanceTimersByTime(400);
  });

  expect(screen.getByText("Searching for doctor")).toBeInTheDocument();
  expect(screen.queryByText("Dr. Lina Becker")).not.toBeInTheDocument();
});
