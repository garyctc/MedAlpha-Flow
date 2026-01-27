import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, Calendar, MapPin, FileText, Clock, XCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import {
  getBookingDraft,
  clearBookingDraft,
  saveAppointment,
  updateAppointment,
} from "@/lib/storage";
import { buildDraftAppointmentSeries } from "@/lib/booking/review";
import { useTranslation } from "react-i18next";
import { formatLocalDate, formatLocalTime, getLocale } from "@/i18n";
import { showSuccess } from "@/lib/toast-helpers";
import type { Appointment } from "@/types/storage";
import userAvatar from "@assets/generated_images/professional_user_avatar_for_healthcare_app.png";

export default function BookingReview() {
  const [, setLocation] = useLocation();
  const [isConfirming, setIsConfirming] = useState(false);
  const { t } = useTranslation();
  const locale = getLocale();

  const draft = getBookingDraft();

  useEffect(() => {
    if (!draft?.doctor || !draft?.date || !draft?.time) {
      setLocation('/booking/specialty');
    }
  }, [draft, setLocation]);

  if (!draft?.doctor || !draft?.date || !draft?.time) {
    return null;
  }

  const handleConfirm = () => {
    setIsConfirming(true);

    setTimeout(() => {
      if (draft.intent === "reschedule" && draft.rescheduleId) {
        updateAppointment(draft.rescheduleId, {
          date: draft.date!,
          time: draft.time!,
          doctor: draft.doctor!,
          clinic: draft.location || "Medical Center Mitte",
        });
        sessionStorage.setItem("last-booked-appointment", draft.rescheduleId);
      } else if (draft.recurring && draft.recurrenceCount && draft.recurrenceIntervalWeeks) {
        const series = buildDraftAppointmentSeries(draft, `appt-${Date.now()}`);
        series.forEach((item) => {
          saveAppointment({
            id: item.id,
            type: draft.type || "in-person",
            doctor: draft.doctor!,
            specialty: draft.specialty || "General Practice",
            clinic: draft.location || "Medical Center Mitte",
            date: item.date,
            time: item.time,
            status: "upcoming",
            createdAt: new Date().toISOString(),
          });
        });
        if (series[0]) {
          sessionStorage.setItem("last-booked-appointment", series[0].id);
        }
      } else {
        const newAppointment: Appointment = {
          id: `appt-${Date.now()}`,
          type: draft.type || "in-person",
          doctor: draft.doctor!,
          specialty: draft.specialty || "General Practice",
          clinic: draft.location || "Medical Center Mitte",
          date: draft.date!,
          time: draft.time!,
          status: "upcoming",
          createdAt: new Date().toISOString(),
        };

        saveAppointment(newAppointment);
        sessionStorage.setItem("last-booked-appointment", newAppointment.id);
      }

      clearBookingDraft();
      showSuccess(t("booking.success.title"));
      setLocation("/booking/success");
    }, 800);
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
          <button
            onClick={() => setLocation("/booking/slots")}
            className="w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors -ml-2"
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
          <div className="flex-1 text-center pr-8">
            <ProgressBar currentStep={4} totalSteps={4} showLabel={true} showPercentage={false} className="mb-2" />
            <h1 className="text-lg font-semibold text-foreground">Appointment Overview</h1>
          </div>
        </div>
      </header>

      <main className="px-5 space-y-6">
        {/* Doctor Card - Centered */}
        <div className="flex flex-col items-center text-center py-4">
          {/* Doctor Photo with Verification Badge */}
          <div className="relative mb-3">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-muted">
              <img
                src={userAvatar}
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
              <p className="text-sm text-foreground">{formatLocalTime(draft.time, locale)}</p>
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
      <div className="fixed bottom-24 left-0 right-0 px-5 max-w-[375px] mx-auto z-40">
        <Button
          onClick={handleConfirm}
          className="w-full h-12 rounded-2xl text-base font-semibold gap-2"
          disabled={isConfirming}
        >
          {isConfirming ? "Confirming..." : (
            <>
              Confirm appointment
              <Check size={18} strokeWidth={2.5} />
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-3">
          By confirming you accept our T&Cs and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
