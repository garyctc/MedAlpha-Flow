import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { AppointmentCard } from "@/components/appointment-card";
import { DoctorCard } from "@/components/ui/doctor-card";

describe("avatar status badges", () => {
  it("does not render a check badge on AppointmentCard", () => {
    const { container } = render(
      <AppointmentCard
        data={{
          id: "apt-1",
          status: "upcoming",
          type: "in-person",
          doctor: "Dr. Test",
          role: "General",
          location: "Clinic",
          date: "Jan 1, 2026 • 10:00",
          rawDate: "2026-01-01",
          rawTime: "10:00",
        }}
        onClick={() => {}}
      />
    );

    expect(container.querySelector("svg.lucide-check")).not.toBeInTheDocument();
  });

  it("does not render a loading badge on AppointmentCard", () => {
    const { container } = render(
      <AppointmentCard
        data={{
          id: "apt-2",
          status: "processing",
          type: "in-person",
          doctor: "Dr. Test",
          role: "General",
          location: "Clinic",
          date: "Jan 1, 2026 • 10:00",
          rawDate: "2026-01-01",
          rawTime: "10:00",
        }}
        onClick={() => {}}
      />
    );

    expect(container.querySelector("svg.lucide-loader-2")).not.toBeInTheDocument();
  });

  it("does not render a verification badge on DoctorCard", () => {
    const { container } = render(
      <DoctorCard name="Dr. Test" specialty="General" />
    );

    expect(container.querySelector("svg.lucide-badge-check")).not.toBeInTheDocument();
  });
});
