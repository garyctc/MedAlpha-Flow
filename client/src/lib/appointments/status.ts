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

/** Returns the i18n translation key for the match status */
export function getMatchStatusTranslationKey(status: MatchStatus): string {
  switch (status) {
    case "searching":
      return "appointments.matchStatus.searching";
    case "waiting":
      return "appointments.matchStatus.waiting";
    case "confirmed":
      return "appointments.matchStatus.confirmed";
    case "rejected":
      return "appointments.matchStatus.rejected";
    case "expired":
      return "appointments.matchStatus.expired";
  }
}

/** @deprecated Use getMatchStatusTranslationKey with i18n instead */
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
