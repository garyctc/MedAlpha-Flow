import { useState } from "react";
import { useLocation } from "wouter";
import { Calendar, Clock, MapPin, Star, Navigation, CalendarPlus, Info } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
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

export default function AppointmentDetail() {
  const [, setLocation] = useLocation();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  const locale: Locale = getLocale();

  const doctorName = "Dr. Anna Schmidt";
  const specialty = t("specialty.generalPractice");
  const clinicName = "Health Center Berlin";
  const clinicAddress = "Friedrichstraße 123, Berlin";
  const rating = "4.8";
  const dateIso = "2026-01-20";
  const time24 = "09:00";
  const dateLabel = formatLocalDate(dateIso, locale);
  const timeLabel = formatLocalTime(time24, locale);

  const handleCancel = () => {
    setShowCancelDialog(false);
    toast({
      title: t("appointments.detail.cancel.toastTitle"),
      description: t("appointments.detail.cancel.toastDescription"),
    });
    setTimeout(() => setLocation("/appointments"), 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title={t("appointments.detail.title")} backPath="/appointments" />
      
      <main className="p-5 space-y-6">
        <div className="flex justify-center">
           <span className="text-xs font-bold text-primary bg-accent px-3 py-1 rounded-full border border-border flex items-center gap-1">
             <Clock size={12} /> {t("appointments.detail.badgeTomorrowAt", { time: timeLabel })}
           </span>
        </div>

        {/* Summary Card */}
        <div className="bg-card rounded-lg border border-border shadow-[var(--shadow-card)] overflow-hidden">
           {/* Doctor */}
           <div className="p-5 flex items-center gap-4">
              <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center text-muted-foreground font-bold text-xl">
                 AS
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
                    <button className="text-primary text-xs font-bold mt-1 flex items-center gap-1">
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
                    <button className="text-primary text-xs font-bold flex items-center gap-1">
                       <CalendarPlus size={12} /> {t("appointments.detail.addToCalendar")}
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
           <Button 
             variant="outline" 
             className="w-full h-12 rounded-md text-primary hover:bg-accent"
             onClick={() => setLocation("/booking/calendar")}
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
