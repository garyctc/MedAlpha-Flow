import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DateBadge } from "@/components/ui/date-badge";
import { DEFAULT_DOCTOR_AVATAR } from "@/lib/constants/doctors";
import type { Appointment } from "@/types/storage";

type MatchStatus = NonNullable<Appointment["matchStatus"]>;

export type AppointmentCardData = {
  id: string;
  status: "upcoming" | "past" | "processing";
  type: "in-person" | "video";
  doctor: string;
  doctorImage?: string;
  role: string;
  location: string;
  date: string;
  rawDate?: string;
  rawTime?: string;
  subStatus?: "cancelled" | "completed" | "processing";
  matchStatus?: MatchStatus;
  amount?: string;
  statusLabel?: string;
  statusLabelClass?: string;
};

export function AppointmentCard({
  data,
  onClick
}: {
  data: AppointmentCardData;
  onClick: () => void;
}) {
  const isProcessing = data.status === "processing";
  const { t } = useTranslation();
  const isSearching = data.matchStatus === "searching";
  const isWaiting = data.matchStatus === "waiting";
  const isPending = isSearching || isWaiting;
  const statusPill = (() => {
    if (data.subStatus === "completed") {
      return {
        label: t("common.status.completed").toUpperCase(),
        className: "bg-slate-100 text-slate-600",
      };
    }
    if (data.subStatus === "cancelled") {
      return {
        label: t("common.status.cancelled").toUpperCase(),
        className: "bg-red-50 text-red-600",
      };
    }
    switch (data.matchStatus) {
      case "searching":
        return { label: t("appointments.matchStatus.searchingUpper"), className: "bg-yellow-50 text-yellow-700" };
      case "waiting":
        return { label: t("appointments.matchStatus.waitingUpper"), className: "bg-yellow-50 text-yellow-700" };
      case "confirmed":
        return { label: t("appointments.matchStatus.confirmedUpper"), className: "bg-green-50 text-green-700" };
      case "rejected":
        return { label: t("appointments.matchStatus.rejectedUpper"), className: "bg-red-50 text-red-600" };
      case "expired":
        return { label: t("appointments.matchStatus.cancelledUpper"), className: "bg-red-50 text-red-600" };
      default:
        return null;
    }
  })();

  // Try to parse date for DateBadge
  let dateObj: Date | null = null;
  if (data.rawDate) {
    dateObj = new Date(data.rawDate);
  }

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full p-4 rounded-3xl shadow-[var(--shadow-card)] border flex items-center gap-4 text-left transition-all bg-card border-border hover:border-primary/30"
    >
      {/* Doctor Photo with Badge */}
      <div className="relative flex-shrink-0">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-muted flex items-center justify-center">
          {isSearching ? (
            <Search size={18} className="text-muted-foreground" aria-label="Searching" />
          ) : (
            <img
              src={data.doctorImage || DEFAULT_DOCTOR_AVATAR}
              alt={data.doctor}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          {data.statusLabel && (
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                data.statusLabelClass ?? "bg-primary/10 text-primary"
              }`}
            >
              {data.statusLabel}
            </span>
          )}
          {statusPill && !data.statusLabel && (
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${statusPill.className}`}>
              {statusPill.label}
            </span>
          )}
        </div>

        <p className="font-semibold text-foreground truncate">
          {isSearching ? t("appointments.searchingForDoctor") : data.doctor}
        </p>
        <p className="text-sm text-muted-foreground truncate">
          {data.role} • {t("appointments.checkUp")}
        </p>
      </div>

      {/* Date Badge */}
      <div className="flex-shrink-0 text-center">
        {isPending ? null : dateObj ? (
          <>
            <DateBadge date={dateObj} size="compact" />
            {data.rawTime && (
              <p className="text-xs text-muted-foreground mt-1">{data.rawTime}</p>
            )}
          </>
        ) : (
          <p className="text-xs text-muted-foreground">{data.date}</p>
        )}
      </div>
    </motion.button>
  );
}
