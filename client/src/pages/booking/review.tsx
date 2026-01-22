import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { User, MapPin, Calendar, Clock } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { getBookingDraft, clearBookingDraft, saveAppointment } from "@/lib/storage";
import { useTranslation } from "react-i18next";
import { formatLocalDate, formatLocalTime, getLocale } from "@/i18n";
import { showSuccess } from "@/lib/toast-helpers";
import type { Appointment } from "@/types/storage";

export default function BookingReview() {
  const [, setLocation] = useLocation();
  const [isConfirming, setIsConfirming] = useState(false);
  const { t } = useTranslation();
  const locale = getLocale();

  const draft = getBookingDraft();

  // Redirect to start if draft is incomplete
  useEffect(() => {
    if (!draft?.doctor || !draft?.date || !draft?.time) {
      setLocation('/booking/specialty');
    }
  }, [draft, setLocation]);

  // Don't render if draft is incomplete
  if (!draft?.doctor || !draft?.date || !draft?.time) {
    return null;
  }

  const handleConfirm = () => {
    setIsConfirming(true);

    setTimeout(() => {
      // Create the appointment
      const newAppointment: Appointment = {
        id: `appt-${Date.now()}`,
        type: draft.type || 'in-person',
        doctor: draft.doctor!,
        specialty: draft.specialty || 'General Practice',
        clinic: draft.location || 'Health Center Berlin',
        date: draft.date!,
        time: draft.time!,
        status: 'upcoming',
        createdAt: new Date().toISOString(),
      };

      saveAppointment(newAppointment);

      // Store the new appointment ID for the success page
      sessionStorage.setItem('last-booked-appointment', newAppointment.id);

      clearBookingDraft();
      showSuccess(t("booking.success.title"));
      setLocation("/booking/success");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <SubPageHeader title={t("booking.review.title")} backPath="/booking/calendar" />
      
      <main className="p-5">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          
          {/* Doctor Section */}
          <div className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-200 rounded-full flex-shrink-0"></div>
            <div className="flex-1">
              <p className="font-bold text-slate-900">{draft.doctor}</p>
              <p className="text-sm text-slate-500">{draft.specialty || t("specialty.generalPractice")}</p>
            </div>
            <button
              onClick={() => setLocation('/booking/doctors')}
              className="text-sm font-medium text-primary hover:underline"
            >
              {t("common.buttons.edit")}
            </button>
          </div>

          <div className="h-px bg-slate-100 mx-4"></div>

          {/* Location Section */}
          <div className="p-4 flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-50 text-primary rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin size={20} />
            </div>
            <div className="flex-1 pt-0.5">
              <p className="font-bold text-slate-900 text-sm">{draft.location || "Health Center Berlin"}</p>
              <p className="text-xs text-slate-500 mt-0.5">Friedrichstraße 123, Berlin</p>
            </div>
            <button
              onClick={() => setLocation('/booking/location')}
              className="text-sm font-medium text-primary hover:underline"
            >
              {t("common.buttons.edit")}
            </button>
          </div>

          <div className="h-px bg-slate-100 mx-4"></div>

          {/* Date & Time Section */}
          <div className="p-4 flex items-start gap-4">
             <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-primary" />
                  <span className="text-sm font-medium text-slate-700">
                    {formatLocalDate(draft.date, locale)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-primary" />
                  <span className="text-sm font-medium text-slate-700">
                    {formatLocalTime(draft.time, locale)}
                  </span>
                </div>
             </div>
             <button
               onClick={() => setLocation('/booking/calendar')}
               className="text-sm font-medium text-primary hover:underline"
             >
               {t("common.buttons.edit")}
             </button>
          </div>

        </div>
      </main>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-[80px] left-0 right-0 z-40 flex justify-center">
        <div className="max-w-[375px] w-full bg-white border-t border-slate-100 px-5 py-4 flex justify-center">
          <div className="w-[315px]">
            <Button
              className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
              onClick={handleConfirm}
              disabled={isConfirming}
            >
              {isConfirming ? "Confirming..." : t("booking.review.confirm")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
