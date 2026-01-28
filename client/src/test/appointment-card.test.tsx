import { render, screen } from "@testing-library/react";
import { AppointmentCard } from "@/components/appointment-card";

it("renders match status label", () => {
  render(
    <AppointmentCard
      data={{
        id: "1",
        status: "processing",
        matchStatus: "waiting",
        type: "in-person",
        doctor: "Dr. Lina Becker",
        role: "General Practice",
        location: "DocliQ Health Center",
        date: "Jan 2, 2026",
      }}
      onClick={() => {}}
    />
  );
  expect(screen.getByText("Waiting for confirmation")).toBeInTheDocument();
});
