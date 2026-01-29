import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Building, ChevronRight } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title={t("booking.type.title")} backPath="/home" />

      <main className="p-5 space-y-4">
        {/* In-Person Card */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleInPersonClick}
          className="w-full bg-card p-5 rounded-3xl shadow-[var(--shadow-card)] border border-border flex items-center justify-between group hover:border-primary/30 transition-colors text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
              <Building size={24} className="text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-lg">{t("booking.type.inPerson.title")}</h3>
              <p className="text-muted-foreground text-sm mt-0.5">{t("booking.type.inPerson.subtitle")}</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
        </motion.button>

      </main>
    </div>
  );
}
