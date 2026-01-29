import "@/i18n";
import { act } from "@testing-library/react";
import { renderWithRouter } from "@/test/test-utils";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { Router, Route } from "wouter";
import DoctorSelect from "@/pages/booking/doctors";
import AppointmentDetail from "@/pages/appointments/detail";
import { clearStorage, saveAppointment } from "@/lib/storage";

describe("avatar badges on screens", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    clearStorage();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    clearStorage();
  });

  it("does not render verification badge on booking doctors list", async () => {
    const { container } = renderWithRouter(<DoctorSelect />);

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });

    expect(container.querySelector("svg.lucide-badge-check")).not.toBeInTheDocument();
  });

  it("does not render verification badge on appointment detail avatar", async () => {
    saveAppointment({
      id: "detail-1",
      type: "in-person",
      doctor: "Dr. Lina Becker",
      specialty: "General Practice",
      clinic: "DocliQ Health Center",
      date: "2026-02-07",
      time: "09:00",
      status: "upcoming",
      createdAt: "2026-01-27T14:00:00Z",
    });

    const { container } = renderWithRouter(
      <Router base="" hook={() => ["/appointments/detail-1", () => {}]}>
        <Route path="/appointments/:id" component={AppointmentDetail} />
      </Router>
    );

    await act(async () => {
      vi.advanceTimersByTime(400);
    });

    expect(container.querySelector("svg.lucide-badge-check")).not.toBeInTheDocument();
  });
});
