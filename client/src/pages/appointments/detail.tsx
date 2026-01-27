import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { Calendar, Clock, MapPin, Navigation, CalendarPlus, Info, AlertCircle, FileText, XCircle, BadgeCheck } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTranslation } from "react-i18next";
import { formatLocalDate, formatLocalTime, getLocale } from "@/i18n";
import type { Locale } from "@/i18n";
import { getUserAppointments, updateAppointment } from "@/lib/storage";
import type { Appointment } from "@/types/storage";
import { showSuccess } from "@/lib/toast-helpers";
import { seedBookAgainDraft, seedRescheduleDraft } from "@/lib/booking/intent";

export default function AppointmentDetail() {
  const [, setLocation] = useLocation();
  const params = useParams<{ id: string }>();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const { t } = useTranslation();
  const locale: Locale = getLocale();

  // Load appointment by ID
  useEffect(() => {
    const timer = setTimeout(() => {
      const all = getUserAppointments();
      const found = all.find(a => a.id === params.id);
      setAppointment(found || null);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [params.id]);

  // Use appointment data or fallback
  const doctorName = appointment?.doctor || "Unknown Doctor";
  const specialty = appointment?.specialty || t("specialty.generalPractice");
  const clinicName = appointment?.clinic || "Unknown Clinic";
  const clinicAddress = "Friedrichstraße 123, Berlin";
  const dateIso = appointment?.date || "";
  const time24 = appointment?.time || "";
  const dateLabel = dateIso ? formatLocalDate(dateIso, locale) : "";
  const timeLabel = time24 ? formatLocalTime(time24, locale) : "";

  const handleCancel = () => {
    if (appointment) {
      updateAppointment(appointment.id, {
        status: 'cancelled',
        cancelledAt: new Date().toISOString()
      });
    }
    setShowCancelDialog(false);
    showSuccess(t("appointments.detail.cancel.toastTitle"));
    setLocation("/appointments");
  };

  const handleAddToCalendar = () => {
    showSuccess(t("appointments.detail.addedToCalendar", { defaultValue: "Added to calendar" }));
  };

  const handleBookAgain = () => {
    if (!appointment) return;
    seedBookAgainDraft(appointment);
    setLocation("/booking/slots");
  };

  const handleReschedule = () => {
    if (!appointment) return;
    seedRescheduleDraft(appointment);
    setLocation("/booking/slots");
  };

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinicName + ", " + clinicAddress)}`;
    window.open(url, '_blank');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <SubPageHeader title={t("appointments.detail.title")} backPath="/appointments" />
        <main className="p-5 space-y-6">
          <div className="flex flex-col items-center">
            <Skeleton className="w-20 h-20 rounded-full mb-4" />
            <Skeleton className="h-5 w-40 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="bg-card rounded-3xl border border-border p-5 space-y-4">
            <div className="flex items-start gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Not found state
  if (!appointment) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <SubPageHeader title={t("appointments.detail.title")} backPath="/appointments" />
        <main className="p-5">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
              <AlertCircle size={32} className="text-destructive" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">{t("appointments.detail.notFound.title", { defaultValue: "Appointment Not Found" })}</h2>
            <p className="text-sm text-muted-foreground mb-6">{t("appointments.detail.notFound.subtitle", { defaultValue: "This appointment may have been cancelled or doesn't exist." })}</p>
            <Button onClick={() => setLocation("/appointments")}>
              {t("appointments.detail.notFound.back", { defaultValue: "Back to Appointments" })}
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Get initials for avatar
  const initials = doctorName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title={t("appointments.detail.title")} backPath="/appointments" />

      <main className="p-5 space-y-6">
        {/* Centered Doctor Card */}
        <div className="flex flex-col items-center text-center py-4">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
              {appointment.doctorImage ? (
                <img
                  src={appointment.doctorImage}
                  alt={doctorName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-primary font-semibold text-2xl">{initials}</span>
              )}
            </div>
            {/* Verification badge */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-background">
              <BadgeCheck className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <h2 className="text-lg font-semibold text-foreground">{doctorName}</h2>
          <p className="text-sm text-primary font-medium">{specialty}</p>
        </div>

        {/* Details Card */}
        <div className="bg-card rounded-3xl border border-border shadow-[var(--shadow-card)] overflow-hidden">
          {/* Date & Time */}
          <div className="p-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Calendar size={20} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{t("appointments.detail.dateTime", { defaultValue: "Date & Time" })}</p>
                <p className="font-semibold text-foreground">{dateLabel}</p>
                <p className="text-sm text-muted-foreground">{timeLabel}</p>
              </div>
              <button onClick={handleAddToCalendar} className="text-primary text-xs font-semibold flex items-center gap-1 mt-1">
                <CalendarPlus size={14} /> {t("appointments.detail.addToCalendar")}
              </button>
            </div>
          </div>

          <div className="h-px bg-border mx-5"></div>

          {/* Location */}
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <MapPin size={20} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{t("appointments.detail.location", { defaultValue: "Location" })}</p>
                <p className="font-semibold text-foreground">{clinicName}</p>
                <p className="text-sm text-muted-foreground">{clinicAddress}</p>
                <button onClick={handleGetDirections} className="text-primary text-xs font-semibold mt-2 flex items-center gap-1">
                  <Navigation size={12} /> {t("appointments.detail.getDirections")}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* What You Need to Know Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Info size={14} className="text-muted-foreground" />
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t("appointments.detail.whatToKnow.title", { defaultValue: "What you need to know" })}</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-card rounded-2xl border border-border">
              <FileText size={18} className="text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground">
                {t("appointments.detail.whatToKnow.insurance", { defaultValue: "Please bring your **insurance card** and a referral if applicable." }).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').split('<strong>').map((part, i) =>
                  part.includes('</strong>') ? (
                    <span key={i}><strong>{part.replace('</strong>', '')}</strong></span>
                  ) : part
                )}
              </p>
            </div>

            <div className="flex items-start gap-3 p-4 bg-card rounded-2xl border border-border">
              <Clock size={18} className="text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground">
                {t("appointments.detail.whatToKnow.arrive", { defaultValue: "Arrive approx. 10 minutes before your appointment for registration." })}
              </p>
            </div>

            <div className="flex items-start gap-3 p-4 bg-card rounded-2xl border border-border">
              <XCircle size={18} className="text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground">
                {t("appointments.detail.whatToKnow.cancel", { defaultValue: "Free cancellation up to 24 hours before the appointment." })}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {(appointment.status === "completed" || appointment.status === "cancelled") && (
            <Button
              variant="outline"
              className="w-full h-12"
              onClick={handleBookAgain}
            >
              {t("appointments.detail.bookAgain", { defaultValue: "Book Again" })}
            </Button>
          )}
          {(appointment.status === "upcoming" || appointment.status === "processing") && (
            <>
              <Button
                variant="outline"
                className="w-full h-12"
                onClick={handleReschedule}
              >
                {t("appointments.detail.reschedule")}
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 text-destructive border-destructive/30 hover:bg-destructive/10"
                onClick={() => setShowCancelDialog(true)}
              >
                {t("appointments.detail.cancel.action")}
              </Button>
            </>
          )}
        </div>
      </main>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent className="w-[90%] rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>{t("appointments.detail.cancel.confirmTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("appointments.detail.cancel.confirmDescription", { doctor: doctorName })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("appointments.detail.cancel.keep")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancel}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              {t("appointments.detail.cancel.confirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
