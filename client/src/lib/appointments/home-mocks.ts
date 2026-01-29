import type { AppointmentCardData } from "@/components/appointment-card";

export const HOME_APPOINTMENT_STATUS_ORDER = ["searching", "waiting", "confirmed"] as const;
export type HomeAppointmentStatusKey = (typeof HOME_APPOINTMENT_STATUS_ORDER)[number];

export type HomeAppointmentMock = AppointmentCardData & {
  statusKey: HomeAppointmentStatusKey;
};

export const HOME_APPOINTMENT_MOCKS: HomeAppointmentMock[] = [
  {
    id: "home-searching",
    statusKey: "searching",
    matchStatus: "searching",
    status: "processing",
    type: "in-person",
    doctor: "Dr. Lina Meyer",
    role: "General practice",
    location: "DocliQ Health Center",
    date: "Jan 30, 2026 • 09:30",
    rawDate: "2026-01-30",
    rawTime: "09:30",
  },
  {
    id: "home-waiting",
    statusKey: "waiting",
    matchStatus: "waiting",
    status: "upcoming",
    type: "in-person",
    doctor: "Dr. Sarah Weber",
    role: "General practice",
    location: "DocliQ Health Center",
    date: "Feb 2, 2026 • 11:15",
    rawDate: "2026-02-02",
    rawTime: "11:15",
  },
  {
    id: "home-confirmed",
    statusKey: "confirmed",
    status: "upcoming",
    type: "in-person",
    doctor: "Dr. Anna Schmidt",
    role: "General practice",
    location: "DocliQ Health Center",
    date: "Feb 6, 2026 • 14:00",
    rawDate: "2026-02-06",
    rawTime: "14:00",
  },
];
