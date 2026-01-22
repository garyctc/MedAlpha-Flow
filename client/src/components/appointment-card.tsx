import { motion } from "framer-motion";
import { ChevronRight, MapPin, Video, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export type AppointmentCardData = {
  id: string;
  status: "upcoming" | "past" | "processing";
  type: "in-person" | "video";
  doctor: string;
  role: string;
  location: string;
  date: string;
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

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full p-4 rounded-2xl border shadow-sm flex flex-col gap-3 text-left transition-all group ${
        isProcessing
          ? "bg-purple-50 border-purple-200"
          : "bg-white border-slate-100 hover:border-primary/30"
      }`}
    >
      <div className="flex flex-col gap-2 w-full">
        <span className="text-xs text-slate-400 font-medium">{data.date}</span>
        <div className="flex gap-2">
          {data.subStatus === "processing" && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-purple-600 text-white flex items-center gap-1 animate-pulse">
              <Loader2 size={10} className="animate-spin" /> {t("common.status.processing")}
            </span>
          )}
          {data.subStatus === "completed" && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-emerald-50 text-emerald-700">
              {t("common.status.completed")}
            </span>
          )}
          {data.subStatus === "cancelled" && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-red-50 text-red-600">
              {t("common.status.cancelled")}
            </span>
          )}

          {isVideo && !isProcessing && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-cyan-50 text-cyan-600 flex items-center gap-1">
              <Video size={10} /> {t("appointments.type.video")}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center w-full">
        <div className="flex-1">
          <h3 className={`font-bold text-lg transition-colors ${
            isProcessing ? "text-purple-900" : "text-slate-900 group-hover:text-primary"
          }`}>{data.doctor}</h3>
          <p className="text-sm text-slate-500">{data.role}</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
            {isVideo ? <Video size={10} /> : <MapPin size={10} />}
            <span>{data.location}</span>
          </div>
          {data.amount && (
            <div className="mt-2 text-sm font-bold text-slate-900">
              {data.amount}
            </div>
          )}
          {isProcessing && (
            <span className="inline-block mt-2 text-[9px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
              {t("appointments.partner.smartMatch")}
            </span>
          )}
        </div>
        <ChevronRight size={20} className={`transition-colors ${
          isProcessing ? "text-purple-400" : "text-slate-300 group-hover:text-primary"
        }`} />
      </div>
    </motion.button>
  );
}
