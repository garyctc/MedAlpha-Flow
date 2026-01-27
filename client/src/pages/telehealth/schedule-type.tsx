import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Clock, Calendar, ChevronRight } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { useTranslation } from "react-i18next";

export default function ScheduleType() {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title={t("telehealth.scheduleType.title", { defaultValue: "Video Consultation" })} backPath="/booking/type" />

      <div className="px-5 pt-2 flex justify-end">
        <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-1 rounded-full">
          {t("telehealth.partner", { defaultValue: "Powered by Teleclinic" })}
        </span>
      </div>

      <main className="p-5 space-y-4">
        {/* Next Available Card */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setLocation("/telehealth/symptoms-intro")}
          className="w-full bg-card p-5 rounded-3xl shadow-[var(--shadow-card)] border border-border flex items-center justify-between group hover:border-primary/30 transition-colors text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
              <Clock size={24} className="text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-lg">{t("telehealth.scheduleType.nextAvailable.title", { defaultValue: "Next Available" })}</h3>
              <p className="text-muted-foreground text-sm mt-0.5">{t("telehealth.scheduleType.nextAvailable.subtitle", { defaultValue: "Estimated wait: ~15 minutes" })}</p>
            </div>
          </div>
          <ChevronRight className="text-muted-foreground group-hover:text-primary transition-colors" />
        </motion.button>

        {/* Schedule Later Card */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setLocation("/booking/calendar")}
          className="w-full bg-card p-5 rounded-3xl shadow-[var(--shadow-card)] border border-border flex items-center justify-between group hover:border-primary/30 transition-colors text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
              <Calendar size={24} className="text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-lg">{t("telehealth.scheduleType.pickTime.title", { defaultValue: "Pick a Time" })}</h3>
              <p className="text-muted-foreground text-sm mt-0.5">{t("telehealth.scheduleType.pickTime.subtitle", { defaultValue: "Choose a specific appointment slot" })}</p>
            </div>
          </div>
          <ChevronRight className="text-muted-foreground group-hover:text-primary transition-colors" />
        </motion.button>
      </main>
    </div>
  );
}
