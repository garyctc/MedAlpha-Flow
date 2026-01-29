import type { ReactElement } from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, act } from "@testing-library/react";
import { Router, Route } from "wouter";
import BookingSuccess from "@/pages/booking/success";
import DoctorSelect from "@/pages/booking/doctors";
import AppointmentDetail from "@/pages/appointments/detail";
import { saveAppointment } from "@/lib/storage";

const appointmentId = "appt-test-1";

function renderWithRoute(ui: ReactElement, path: string) {
  return render(
    <Router hook={() => [path, () => {}]}>
      {ui}
    </Router>
  );
}

describe("avatar badges on screens", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not render a verification badge on booking success", () => {
    const { container } = render(<BookingSuccess />);
    expect(container.querySelector("svg.lucide-badge-check")).not.toBeInTheDocument();
  });

  it("does not render a verification badge on booking doctors list", () => {
    vi.useFakeTimers();
    const { container } = renderWithRoute(<DoctorSelect />, "/booking/doctors");

    act(() => {
      vi.runAllTimers();
    });

    expect(container.querySelector("svg.lucide-badge-check")).not.toBeInTheDocument();
  });

  it("does not render a verification badge on appointment detail", () => {
    vi.useFakeTimers();

    saveAppointment({
      id: appointmentId,
      type: "in-person",
      doctor: "Dr. Test",
      specialty: "General Practice",
      clinic: "Test Clinic",
      date: "2026-01-15",
      time: "10:30",
      status: "upcoming",
      createdAt: new Date().toISOString(),
    });

    const { container } = render(
      <Router hook={() => ["/appointments/" + appointmentId, () => {}]}>
        <Route path="/appointments/:id" component={AppointmentDetail} />
      </Router>
    );

    act(() => {
      vi.advanceTimersByTime(350);
    });

    expect(container.querySelector("svg.lucide-badge-check")).not.toBeInTheDocument();
  });
});
