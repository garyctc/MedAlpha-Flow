import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Check, MapPin, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DURATION_DEFAULT, EASING_DEFAULT, shouldReduceMotion } from "@/lib/motion";
import { getBookingDraft } from "@/lib/storage";
import { formatLocalDate, getLocale } from "@/i18n";

const TIME_WINDOW_LABELS: Record<"morning" | "afternoon" | "evening", string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
};

export default function SmartMatchSuccess() {
  const [, setLocation] = useLocation();
  const reduceMotion = shouldReduceMotion();
  const locale = getLocale();
  const draft = getBookingDraft();

  const timeWindowKey = draft?.timeWindow;
  const timeWindowLabel = timeWindowKey
    ? TIME_WINDOW_LABELS[timeWindowKey]
    : "Pending";
  const dateLabel = draft?.date ? formatLocalDate(draft.date, locale) : "Pending date";
  const location = draft?.location || "Nearby clinics";

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation("/booking/success");
    }, 2500);

    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex flex-col items-center justify-center p-5 text-center">
      <motion.div
        initial={reduceMotion ? false : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={reduceMotion ? { duration: 0 } : { duration: DURATION_DEFAULT, ease: EASING_DEFAULT }}
        className="w-24 h-24 bg-primary rounded-full mb-6 flex items-center justify-center shadow-lg"
      >
        <Check className="text-white" size={48} />
      </motion.div>

      <h2 className="text-2xl font-semibold text-foreground mb-2">Match found</h2>
      <p className="text-muted-foreground text-sm mb-8">
        We've shared your request and will confirm the first available appointment.
      </p>

      <div className="w-full max-w-sm bg-card rounded-3xl shadow-[var(--shadow-card)] border border-border p-6 mb-6 text-left">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="text-primary" size={18} />
            <p className="text-sm text-foreground">{dateLabel}</p>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="text-primary" size={18} />
            <p className="text-sm text-foreground">{timeWindowLabel}</p>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="text-primary mt-0.5" size={18} />
            <div>
              <p className="text-sm font-medium text-foreground">{location}</p>
              <p className="text-sm text-muted-foreground">We'll confirm the exact clinic shortly.</p>
            </div>
          </div>

          <div className="h-px bg-border"></div>

          <div className="flex items-center justify-between">
            <span className="inline-block text-[10px] font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full uppercase tracking-wider">
              Smart Match
            </span>
            <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
              Request queued
            </span>
          </div>
        </div>
      </div>

      <Button
        className="w-full max-w-sm h-12 text-base font-semibold rounded-3xl mb-4"
        onClick={() => setLocation("/booking/success")}
      >
        Continue
      </Button>

      <p className="text-xs text-muted-foreground">Redirecting to request sent...</p>
    </div>
  );
}
