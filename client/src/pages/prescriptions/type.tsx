import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Plus, Calendar, ChevronRight } from "lucide-react";
import appLogo from "@/assets/app-logo.svg";
import { branding } from "@/config/branding";
import { useTranslation } from "react-i18next";

export default function PrescriptionType() {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="px-5 py-4 pt-12">
          <div className="flex items-center gap-2 min-h-10">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src={appLogo} alt={`${branding.appName} Logo`} className="w-full h-full object-contain" />
            </div>
            <h1 className="font-semibold text-xl text-foreground">{t("prescriptions.title", { defaultValue: "Prescriptions" })}</h1>
          </div>
        </div>
      </header>

      <main className="p-5 space-y-6">
        {/* Active Content */}
        <div className="space-y-4">
          <ActivePrescriptionCard
            medication="Metformin 500mg"
            detail="30 tablets, 1x daily"
            issued="Jan 15, 2026"
            expires="Apr 15, 2026"
            price={5.00}
            onClick={() => setLocation("/prescriptions/detail")}
          />
          <ActivePrescriptionCard
            medication="Lisinopril 10mg"
            detail="28 tablets, 1x daily"
            issued="Jan 15, 2026"
            expires="Apr 15, 2026"
            price={5.00}
            onClick={() => setLocation("/prescriptions/detail")}
          />
        </div>
      </main>

      {/* FAB */}
      <div className="fixed bottom-[160px] left-0 right-0 max-w-[375px] mx-auto pointer-events-none z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLocation("/prescriptions/redeem-start")}
          className="absolute right-5 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center pointer-events-auto"
        >
          <Plus size={28} strokeWidth={2} />
        </motion.button>
      </div>
    </div>
  );
}

function ActivePrescriptionCard({ medication, detail, issued, expires, price, onClick }: any) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-card p-5 rounded-3xl border border-border shadow-[var(--shadow-card)] cursor-pointer hover:border-primary/30 transition-colors group"
    >
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">{medication}</h3>
      </div>
      <p className="text-muted-foreground mb-3 font-medium">{detail}</p>

      <div className="mb-3">
        <span className="text-sm font-semibold text-foreground bg-muted px-2 py-1 rounded-lg">
          Copay: €{price.toFixed(2)}
        </span>
      </div>

      <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs text-muted-foreground border-t border-border pt-3">
        <span>Issued: {issued}</span>
        <span className="flex items-center gap-1">
          <Calendar size={12} /> Exp: {expires}
        </span>
      </div>
    </motion.div>
  );
}

function DeliveredCard({ status, statusColor, medication, detail, date, pharmacy, onClick }: any) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full bg-card p-4 rounded-3xl border border-border shadow-[var(--shadow-card)] flex flex-col gap-3 text-left hover:border-primary/30 transition-all group"
    >
      <div className="flex justify-between items-start w-full">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${statusColor}`}>{status}</span>
        <span className="text-[10px] font-semibold bg-muted text-muted-foreground px-2 py-0.5 rounded">{pharmacy}</span>
      </div>

      <div className="flex justify-between items-center w-full">
        <div>
          <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">{medication}</h3>
          <p className="text-sm text-muted-foreground">{detail}</p>
          <p className="text-xs text-muted-foreground mt-1">{date}</p>
        </div>
        <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </motion.button>
  );
}
