import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { Calendar, Clock, MapPin, Star, Navigation, CalendarPlus, Info, AlertCircle } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();
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
  const rating = "4.8";
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
          <div className="flex justify-center">
            <Skeleton className="h-6 w-40 rounded-full" />
          </div>
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="p-5 flex items-center gap-4">
              <Skeleton className="w-14 h-14 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <div className="h-px bg-border mx-5"></div>
            <div className="p-5 space-y-3">
              <div className="flex items-start gap-3">
                <Skeleton className="w-8 h-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-48" />
                </div>
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
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <AlertCircle size={32} className="text-red-500" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Appointment Not Found</h2>
            <p className="text-sm text-slate-500 mb-6">This appointment may have been cancelled or doesn't exist.</p>
            <Button onClick={() => setLocation("/appointments")} className="bg-primary">
              Back to Appointments
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
        <div className="flex justify-center">
           <span className="text-xs font-bold text-primary bg-accent px-3 py-1 rounded-full border border-border flex items-center gap-1">
             <Clock size={12} /> {timeLabel}
           </span>
        </div>

        {/* Summary Card */}
        <div className="bg-card rounded-lg border border-border shadow-[var(--shadow-card)] overflow-hidden">
           {/* Doctor */}
           <div className="p-5 flex items-center gap-4">
              <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center text-muted-foreground font-bold text-xl">
                 {initials}
              </div>
              <div className="flex-1">
                 <h2 className="text-lg font-bold text-foreground">{doctorName}</h2>
                 <p className="text-muted-foreground text-sm">{specialty}</p>
                 <div className="flex items-center gap-1 mt-1">
                    <Star size={12} className="text-amber-400 fill-current" />
                    <span className="text-xs font-bold text-foreground">{rating}</span>
                 </div>
              </div>
           </div>

           <div className="h-px bg-border mx-5"></div>

           {/* Location */}
           <div className="p-5 space-y-3">
              <div className="flex items-start gap-3">
                 <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                    <MapPin size={16} />
                 </div>
                 <div>
                    <h3 className="font-bold text-foreground text-sm">{clinicName}</h3>
                    <p className="text-muted-foreground text-sm">{clinicAddress}</p>
                    <button onClick={handleGetDirections} className="text-primary text-xs font-bold mt-1 flex items-center gap-1">
                       <Navigation size={10} /> {t("appointments.detail.getDirections")}
                    </button>
                 </div>
              </div>
           </div>

           <div className="h-px bg-border mx-5"></div>

           {/* Date & Time */}
           <div className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                    <Calendar size={16} />
                 </div>
                 <span className="font-medium text-foreground text-sm">{dateLabel}</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                    <Clock size={16} />
                 </div>
                 <div className="flex-1 flex justify-between items-center">
                    <span className="font-medium text-foreground text-sm">{timeLabel}</span>
                    <button onClick={handleAddToCalendar} className="text-primary text-xs font-bold flex items-center gap-1">
                       <CalendarPlus size={12} /> {t("appointments.detail.addToCalendar")}
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
           {(appointment.status === "completed" || appointment.status === "cancelled") && (
             <Button
               variant="outline"
               className="w-full h-12 rounded-md text-primary hover:bg-accent"
               onClick={handleBookAgain}
             >
               {t("appointments.detail.bookAgain", { defaultValue: "Book Again" })}
             </Button>
           )}
           {(appointment.status === "upcoming" || appointment.status === "processing") && (
             <>
               <Button
                 variant="outline"
                 className="w-full h-12 rounded-md text-primary hover:bg-accent"
                 onClick={handleReschedule}
               >
                 {t("appointments.detail.reschedule")}
               </Button>
               <Button
                 variant="outline"
                 className="w-full h-12 rounded-md text-destructive border-destructive/30 hover:bg-destructive/10"
                 onClick={() => setShowCancelDialog(true)}
               >
                 {t("appointments.detail.cancel.action")}
               </Button>
             </>
           )}
        </div>

        {/* Info */}
        <div className="bg-accent p-5 rounded-lg border border-border">
           <div className="flex items-center gap-2 mb-3">
             <Info size={16} className="text-muted-foreground" />
             <h3 className="font-bold text-foreground text-sm">{t("appointments.detail.bring.title")}</h3>
           </div>
           <ul className="space-y-2 text-sm text-muted-foreground pl-1">
             <li>• {t("appointments.detail.bring.items.healthCard")}</li>
             <li>• {t("appointments.detail.bring.items.records")}</li>
             <li>• {t("appointments.detail.bring.items.medications")}</li>
           </ul>
        </div>
      </main>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent className="w-[90%] rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>{t("appointments.detail.cancel.confirmTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("appointments.detail.cancel.confirmDescription", { doctor: doctorName })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-md border-border">{t("appointments.detail.cancel.keep")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancel}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-md"
            >
              {t("appointments.detail.cancel.confirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
