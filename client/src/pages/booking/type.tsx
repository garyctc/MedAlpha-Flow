import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Building, Video, ChevronRight } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { clearBookingDraft, saveBookingDraft } from "@/lib/storage";
import { useTranslation } from "react-i18next";

export default function BookingType() {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();

  const handleInPersonClick = () => {
    clearBookingDraft();
    saveBookingDraft({ type: 'in-person' });
    setLocation("/booking/entry");
  };

  const handleVideoClick = () => {
    clearBookingDraft();
    saveBookingDraft({ type: 'video' });
    setLocation("/teleclinic/simulated");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title={t("booking.type.title")} backPath="/home" />
      
      <main className="p-5 space-y-4">
        {/* In-Person Card */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleInPersonClick}
          className="w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-primary/30 transition-all text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center shrink-0">
              <Building size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">{t("booking.type.inPerson.title")}</h3>
              <p className="text-slate-500 text-sm mt-1">{t("booking.type.inPerson.subtitle")}</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-slate-300 group-hover:text-primary transition-colors" />
        </motion.button>

        {/* Telemedicine Card */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleVideoClick}
          className="w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-primary/30 transition-all text-left relative overflow-hidden"
        >
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-xl flex items-center justify-center shrink-0">
              <Video size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">{t("booking.type.video.title")}</h3>
              <p className="text-slate-500 text-sm mt-1">{t("booking.type.video.subtitle")}</p>
              <span className="inline-block mt-2 text-[10px] font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {t("booking.type.video.partner")}
              </span>
            </div>
          </div>
          <ChevronRight size={20} className="text-slate-300 group-hover:text-cyan-600 transition-colors relative z-10" />
        </motion.button>
      </main>
    </div>
  );
}
