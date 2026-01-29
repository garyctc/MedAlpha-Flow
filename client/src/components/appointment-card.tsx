import { motion } from "framer-motion";
import { Check, Video, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DateBadge } from "@/components/ui/date-badge";
import { DEFAULT_DOCTOR_AVATAR } from "@/lib/constants/doctors";

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
  statusLabel?: string;
  subStatus?: "cancelled" | "completed" | "processing";
  amount?: string;
};

export function AppointmentCard({
  data,
  onClick
}: {
  data: AppointmentCardData;
  onClick: () => void;
}) {
  const isVideo = data.type === "video";
  const isProcessing = data.status === "processing";
  const { t } = useTranslation();

  // Try to parse date for DateBadge
  let dateObj: Date | null = null;
  if (data.rawDate) {
    dateObj = new Date(data.rawDate);
  }

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full p-4 rounded-3xl shadow-[var(--shadow-card)] border flex items-center gap-4 text-left transition-all ${
        isProcessing
          ? "bg-primary/5 border-primary/20"
          : "bg-card border-border hover:border-primary/30"
      }`}
    >
      {/* Doctor Photo with Badge */}
      <div className="relative flex-shrink-0">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-muted flex items-center justify-center">
          <img
              src={data.doctorImage || DEFAULT_DOCTOR_AVATAR}
              alt={data.doctor}
              className="w-full h-full object-cover"
            />
        </div>
        {!isProcessing && (
          <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-card">
            <Check size={10} className="text-white" strokeWidth={3} />
          </div>
        )}
        {isProcessing && (
          <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-card">
            <Loader2 size={10} className="text-white animate-spin" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          {data.statusLabel && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider bg-primary/10 text-primary">
              {data.statusLabel}
            </span>
          )}
          {data.subStatus === "processing" && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider bg-primary/10 text-primary">
              {t("common.status.processing")}
            </span>
          )}
          {data.subStatus === "completed" && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider bg-green-50 text-green-700">
              {t("common.status.completed")}
            </span>
          )}
          {data.subStatus === "cancelled" && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider bg-red-50 text-red-600">
              {t("common.status.cancelled")}
            </span>
          )}
          {isVideo && !isProcessing && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider bg-primary/10 text-primary flex items-center gap-1">
              <Video size={10} /> {t("appointments.type.video")}
            </span>
          )}
        </div>

        <p className="font-semibold text-foreground truncate">{data.doctor}</p>
        <p className="text-sm text-muted-foreground truncate">
          {data.role} • {isVideo ? "Video" : "Check-up"}
        </p>

        {isProcessing && (
          <span className="inline-block mt-1 text-[9px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
            {t("appointments.partner.smartMatch")}
          </span>
        )}
      </div>

      {/* Date Badge */}
      <div className="flex-shrink-0 text-center">
        {dateObj ? (
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
