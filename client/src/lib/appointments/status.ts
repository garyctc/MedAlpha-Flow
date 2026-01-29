import type { Appointment } from "@/types/storage";

type MatchStatus = NonNullable<Appointment["matchStatus"]>;

export function mapMatchStatusToLifecycle(status: MatchStatus) {
  switch (status) {
    case "searching":
    case "waiting":
      return "processing";
    case "confirmed":
      return "upcoming";
    case "rejected":
    case "expired":
      return "cancelled";
  }
}

export function getMatchStatusLabel(status: MatchStatus) {
  switch (status) {
    case "searching":
      return "Searching";
    case "waiting":
      return "Waiting for confirmation";
    case "confirmed":
      return "Confirmed";
    case "rejected":
      return "Rejected";
    case "expired":
      return "Expired";
  }
}
