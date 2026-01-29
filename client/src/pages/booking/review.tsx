import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, Calendar, MapPin, FileText, Clock, XCircle, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  getBookingDraft,
} from "@/lib/storage";
import { useTranslation } from "react-i18next";
import { formatLocalDate, formatLocalTime, getLocale } from "@/i18n";
import { DEFAULT_DOCTOR_AVATAR } from "@/lib/constants/doctors";

const TIME_WINDOW_LABELS: Record<"morning" | "afternoon" | "evening", string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
};

export default function BookingReview() {
  const [, setLocation] = useLocation();
  const [isConfirming, setIsConfirming] = useState(false);
  const { t } = useTranslation();
  const locale = getLocale();

  const draft = getBookingDraft();
  const isFast = draft?.entryMode === "fast";
  const hasDoctor = Boolean(draft?.doctor);
  const hasDate = Boolean(draft?.date);
  const hasTime = Boolean(draft?.timeWindow || draft?.time);
  const canReview = hasDate && hasTime && (isFast || hasDoctor);

  const timeWindowKey = draft?.timeWindow;
  const timeWindowLabel = timeWindowKey
    ? t(`booking.slots.windows.${timeWindowKey}`, {
        defaultValue: TIME_WINDOW_LABELS[timeWindowKey],
      })
    : null;
  const timeLabel = timeWindowLabel ?? (draft?.time ? formatLocalTime(draft.time, locale) : "Pending");

  useEffect(() => {
    if (!canReview) {
      setLocation(isFast ? "/booking/slots" : "/booking/specialty");
    }
  }, [canReview, isFast, setLocation]);

  if (!canReview || !draft) {
    return null;
  }

  if (!draft.date) {
    return null;
  }

  const handleConfirm = () => {
    setIsConfirming(true);

    if (draft?.date) {
      localStorage.setItem(
        "pending-smart-match-booking",
        JSON.stringify({
          id: `pending-${Date.now()}`,
          dateIso: draft.date,
          time: timeLabel,
          createdAt: new Date().toISOString(),
        })
      );
    }

    setLocation("/booking/smart-match-processing");
  };

  // Format the date for display
  const appointmentDate = new Date(draft.date);
  const localeCode = locale === 'de' ? 'de-DE' : 'en-US';
  const dayName = appointmentDate.toLocaleDateString(localeCode, { weekday: "long" });
  const formattedDate = `${dayName}, ${appointmentDate.toLocaleDateString(localeCode, { month: "long", day: "numeric" })}`;

  return (
    <div className="min-h-screen bg-background pb-36">
      {/* Header */}
      <header className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-4">
          {draft?.intent !== "reschedule" && (
            <button
              onClick={() => setLocation("/booking/slots")}
              className="w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors -ml-2"
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>
          )}
          <div className={cn("flex-1 text-center", draft?.intent !== "reschedule" && "pr-8")}>
            <h1 className="text-lg font-semibold text-foreground">Review Request</h1>
          </div>
        </div>
      </header>

      <main className="px-5 space-y-6">
        {/* Doctor Card - Centered */}
        {!isFast && draft?.doctor && (
          <div className="flex flex-col items-center text-center py-4">
            {/* Doctor Photo with Verification Badge */}
            <div className="relative mb-3">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                <img
                    src={draft.doctorImage || DEFAULT_DOCTOR_AVATAR}
                    alt={draft.doctor}
                    className="w-full h-full object-cover"
                  />
              </div>
              {/* Verification Badge */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                <Check size={12} className="text-white" strokeWidth={3} />
              </div>
            </div>
            <h2 className="text-lg font-semibold text-foreground">{draft.doctor}</h2>
            <p className="text-sm font-medium text-primary">{draft.specialty || "General Medicine"}</p>
          </div>
        )}

        {isFast && (
          <div className="bg-card rounded-3xl border border-border shadow-[var(--shadow-card)] p-5 text-left">
            <h2 className="text-lg font-semibold text-foreground mb-2">How it works</h2>
            <p className="text-sm text-muted-foreground">
              After you confirm, we'll match you with an available doctor. This usually takes about 30 minutes. We'll notify you once your appointment is confirmed.
            </p>
          </div>
        )}

        {/* Details Section */}
        <div className="space-y-4">
          {/* Date & Time */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Calendar size={20} className="text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Date & Time</p>
              <p className="font-semibold text-foreground">{formattedDate}</p>
              <p className="text-sm text-foreground">{timeLabel}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin size={20} className="text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Location</p>
              <p className="font-semibold text-foreground">{draft.location || "Medical Center Mitte"}</p>
              <p className="text-sm text-muted-foreground">Hauptstraße 12, 10115 Berlin</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* What You Need to Know */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-xs font-bold">i</span>
            </div>
            <h3 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
              What you need to know
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <FileText size={18} className="text-muted-foreground flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-sm text-foreground">
                Please bring your <span className="font-semibold">insurance card</span> and a referral if applicable.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={18} className="text-muted-foreground flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-sm text-foreground">
                Arrive approx. <span className="font-semibold">10 minutes</span> before your appointment for registration.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <XCircle size={18} className="text-muted-foreground flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-sm text-foreground">
                Free cancellation up to <span className="font-semibold">24 hours</span> before the appointment.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Confirm Button */}
      <div className="fixed bottom-0 left-0 right-0 px-5 pb-8 pt-4 bg-gradient-to-t from-background via-background to-transparent max-w-[375px] mx-auto z-40">
        <Button
          onClick={handleConfirm}
          className="w-full h-12 rounded-2xl text-base font-semibold gap-2"
          disabled={isConfirming}
        >
          {isConfirming ? "Requesting..." : (
            <>
              Request Appointment
              <Check size={18} strokeWidth={2.5} />
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-3">
          By requesting you accept our T&Cs and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
