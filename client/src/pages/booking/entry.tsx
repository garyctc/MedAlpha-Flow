import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Stethoscope, User, ChevronRight } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { saveBookingDraft } from "@/lib/storage";
import { useTranslation } from "react-i18next";

export default function BookingEntry() {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title={t("booking.entry.title", { defaultValue: "Book an Appointment" })} backPath="/home" />
      <main className="p-5 space-y-4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            saveBookingDraft({ entryMode: "specialty", intent: "new" });
            setLocation("/booking/specialty");
          }}
          className="w-full bg-card p-5 rounded-3xl shadow-[var(--shadow-card)] border border-border flex items-center justify-between group hover:border-primary/30 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Stethoscope size={24} className="text-primary" strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-foreground text-lg">{t("booking.entry.specialty.title", { defaultValue: "Select Specialty" })}</h3>
              <p className="text-muted-foreground text-sm mt-0.5">{t("booking.entry.specialty.subtitle", { defaultValue: "Fastest available appointment" })}</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            saveBookingDraft({ entryMode: "doctor", intent: "new" });
            setLocation("/booking/doctors");
          }}
          className="w-full bg-card p-5 rounded-3xl shadow-[var(--shadow-card)] border border-border flex items-center justify-between group hover:border-primary/30 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <User size={24} className="text-primary" strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-foreground text-lg">{t("booking.entry.doctor.title", { defaultValue: "Select Doctor" })}</h3>
              <p className="text-muted-foreground text-sm mt-0.5">{t("booking.entry.doctor.subtitle", { defaultValue: "Choose a specific doctor" })}</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
        </motion.button>
      </main>
    </div>
  );
}
