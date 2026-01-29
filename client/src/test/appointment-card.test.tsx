import "@/i18n";
import { render, screen } from "@testing-library/react";
import { AppointmentCard } from "@/components/appointment-card";

it("renders uppercase waiting status label", () => {
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
  expect(screen.getByText("WAITING FOR CONFIRMATION")).toBeInTheDocument();
});

it("shows searching copy instead of doctor name", () => {
  render(
    <AppointmentCard
      data={{
        id: "2",
        status: "processing",
        matchStatus: "searching",
        type: "in-person",
        doctor: "Dr. Lina Becker",
        role: "General Practice",
        location: "DocliQ Health Center",
        date: "Jan 2, 2026",
      }}
      onClick={() => {}}
    />
  );

  expect(screen.getByText("Searching for doctor")).toBeInTheDocument();
  expect(screen.queryByText("Dr. Lina Becker")).not.toBeInTheDocument();
});

it("hides date text for pending statuses", () => {
  render(
    <AppointmentCard
      data={{
        id: "3",
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

  expect(screen.queryByText("Jan 2, 2026")).not.toBeInTheDocument();
});

it("does not render video labels for video appointments", () => {
  render(
    <AppointmentCard
      data={{
        id: "4",
        status: "upcoming",
        type: "video",
        doctor: "Dr. Lina Becker",
        role: "General Practice",
        location: "DocliQ Health Center",
        date: "Jan 2, 2026",
      }}
      onClick={() => {}}
    />
  );

  expect(screen.queryByText("Video")).not.toBeInTheDocument();
});

it("renders custom status label when provided", () => {
  render(
    <AppointmentCard
      data={{
        id: "5",
        status: "upcoming",
        type: "in-person",
        doctor: "Dr. Lina Becker",
        role: "General Practice",
        location: "DocliQ Health Center",
        date: "Jan 2, 2026",
        statusLabel: "Searching",
      }}
      onClick={() => {}}
    />
  );

  expect(screen.getByText("Searching")).toBeInTheDocument();
});
