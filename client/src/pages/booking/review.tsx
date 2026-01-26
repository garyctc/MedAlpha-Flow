import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { User, MapPin, Calendar, Clock } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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

export default function BookingReview() {
  const [, setLocation] = useLocation();
  const [isConfirming, setIsConfirming] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
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
    setDialogOpen(false);

    setTimeout(() => {
      if (draft.intent === "reschedule" && draft.rescheduleId) {
        updateAppointment(draft.rescheduleId, {
          date: draft.date!,
          time: draft.time!,
          doctor: draft.doctor!,
          clinic: draft.location || "Health Center Berlin",
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
            clinic: draft.location || "Health Center Berlin",
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
          clinic: draft.location || "Health Center Berlin",
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

  return (
    <div className="min-h-screen bg-background pb-28">
      <SubPageHeader title={t("booking.review.title")} backPath="/booking/slots" />
      
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
               onClick={() => setLocation('/booking/slots')}
               className="text-sm font-medium text-primary hover:underline"
             >
               {t("common.buttons.edit")}
             </button>
          </div>

        </div>
      </main>

      {/* Booking Confirmation Dialog */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>{t("booking.confirm.title") || "Confirm Booking"}</AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">{draft.doctor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-slate-500" />
                  <span className="text-sm text-slate-700">{formatLocalDate(draft.date, locale)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-slate-500" />
                  <span className="text-sm text-slate-700">{formatLocalTime(draft.time, locale)}</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 bg-amber-50 border border-amber-200 rounded p-2">
                {t("booking.confirm.cancellation") || "Cancellation may incur fees"}
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <AlertDialogCancel className="rounded-lg h-11">{t("common.buttons.cancel") || "Cancel"}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              disabled={isConfirming}
              className="rounded-lg h-11 bg-primary hover:bg-primary/90"
            >
              {isConfirming ? "Confirming..." : t("booking.review.confirm") || "Confirm Booking"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-[80px] left-0 right-0 z-40 flex justify-center">
        <div className="max-w-[375px] w-full bg-white border-t border-slate-100 px-5 py-4 flex justify-center">
          <div className="w-[315px]">
            <Button
              onClick={() => setDialogOpen(true)}
              className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
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
