import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import appLogo from "@/assets/app-logo.svg";
import { branding } from "@/config/branding";
import { useToast } from "@/hooks/use-toast";
import PushNotificationBanner from "@/components/ui/push-notification-banner";
import { getUserAppointments, saveAppointment, clearBookingDraft, saveBookingDraft } from "@/lib/storage";
import type { Appointment as StoredAppointment } from "@/types/storage";
import { useTranslation } from "react-i18next";
import { formatLocalDate, formatLocalTime, getLocale, type Locale } from "@/i18n";
import { format, parse } from "date-fns";
import { enUS } from "date-fns/locale";
import { AppointmentCard, type AppointmentCardData } from "@/components/appointment-card";

type Appointment = AppointmentCardData & {
  badge: string;
  badgeColor: string;
};

function parseAnyDate(date: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return parse(date, "yyyy-MM-dd", new Date());
  }
  const formats = ["MMM d, yyyy", "MMMM d, yyyy", "MMM dd, yyyy", "MMMM dd, yyyy"];
  for (const fmt of formats) {
    const dt = parse(date, fmt, new Date(), { locale: enUS });
    if (!Number.isNaN(dt.getTime())) return dt;
  }
  return null;
}

function formatStoredDate(date: string, locale: Locale) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return formatLocalDate(date, locale);
  const dt = parseAnyDate(date);
  if (!dt) return date;
  return locale === "de" ? format(dt, "dd.MM.yyyy") : format(dt, "MMMM d, yyyy");
}

function formatStoredTime(time: string, locale: Locale) {
  const normalized = time.trim();
  const dt =
    /\b(am|pm)\b/i.test(normalized)
      ? parse(normalized, "h:mm a", new Date(), { locale: enUS })
      : parse(normalized.padStart(5, "0"), "HH:mm", new Date());
  if (Number.isNaN(dt.getTime())) return time;
  const hhmm = format(dt, "HH:mm");
  return formatLocalTime(hhmm, locale);
}

// Convert stored appointments to display format
function convertStoredAppointments(
  stored: StoredAppointment[],
  locale: Locale,
  t: (key: string, options?: any) => string,
): Appointment[] {
  return stored.map((apt) => {
    const statusDisplay = apt.status === "processing" ? "processing" : apt.status === "upcoming" ? "upcoming" : "past";

    const dateText = `${formatStoredDate(apt.date, locale)} • ${formatStoredTime(apt.time, locale)}`;

    return {
      id: apt.id,
      status: statusDisplay,
      type: apt.type,
      badge: "", // No longer used, replaced by subStatus badges
      badgeColor: "",
      doctor: apt.doctor,
      role: apt.specialty,
      location: apt.clinic,
      date: dateText,
      subStatus:
        apt.status === "completed"
          ? "completed"
          : apt.status === "cancelled"
            ? "cancelled"
            : apt.status === "processing"
              ? "processing"
              : undefined,
    };
  });
}

export default function AppointmentsPage() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [pendingBooking, setPendingBooking] = useState<Appointment | null>(null);
  const [showPushNotification, setShowPushNotification] = useState(false);
  const [confirmedDoctorName, setConfirmedDoctorName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [storedAppointments, setStoredAppointments] = useState<Appointment[]>([]);
  const { toast } = useToast();
  const { t } = useTranslation();
  const locale = getLocale();

  // Load appointments from localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      const appointments = convertStoredAppointments(getUserAppointments(), locale, t);
      setStoredAppointments(appointments);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [locale, t]);

  // Check for pending Smart Match booking on mount
  useEffect(() => {
    const bookingData = localStorage.getItem("pending-smart-match-booking");
    if (bookingData) {
      const booking = JSON.parse(bookingData);
      const bookingDate = booking.dateIso ? formatLocalDate(booking.dateIso, locale) : booking.date;
      const bookingTime = booking.time24 ? formatLocalTime(booking.time24, locale) : booking.time;
      setPendingBooking({
        id: booking.id,
        status: "processing",
        type: "in-person",
        badge: "",
        badgeColor: "",
        doctor: t("appointments.placeholders.doctor"),
        role: t("appointments.placeholders.awaitingConfirmation"),
        location: "MedAlpha Health Center",
        date: `${bookingDate} • ${bookingTime}`,
        subStatus: "processing",
      });

      // Simulate webhook after 5 seconds
      const webhookTimer = setTimeout(() => {
        const doctorName = "Dr. Sarah Johnson";

        // Update to confirmed
        const confirmedAppointment: Appointment = {
          id: booking.id,
          status: "upcoming",
          type: "in-person",
          badge: "",
          badgeColor: "",
          doctor: doctorName,
          role: t("specialty.generalPractice"),
          location: "MedAlpha Health Center, Downtown Berlin",
          date: `${formatLocalDate("2026-01-24", locale)} • ${formatLocalTime("10:00", locale)}`,
          subStatus: undefined
        };

        setPendingBooking(confirmedAppointment);

        // Save to persistent storage
        saveAppointment({
          id: booking.id,
          type: "in-person",
          doctor: doctorName,
          specialty: "General Practice",
          clinic: "MedAlpha Health Center, Downtown Berlin",
          date: "2026-01-24",
          time: "10:00",
          status: "upcoming",
          createdAt: booking.createdAt
        });

        // Store doctor name for push notification
        setConfirmedDoctorName(doctorName);

        // Clear from localStorage
        localStorage.removeItem("pending-smart-match-booking");

        // Show toast notification
        toast({
          title: t("appointments.toast.confirmed.title"),
          description: t("appointments.toast.confirmed.description", { doctor: doctorName }),
        });

        // Simulate "appointment concluded" push notification after 12 more seconds
        const pushTimer = setTimeout(() => {
          setShowPushNotification(true);
        }, 12000);

        return () => clearTimeout(pushTimer);
      }, 5000);

      return () => clearTimeout(webhookTimer);
    }
  }, [locale, t, toast]);

  // Combine pending booking with stored appointments
  const allAppointments = pendingBooking
    ? [pendingBooking, ...storedAppointments]
    : storedAppointments;

  const filteredAppointments = allAppointments.filter(apt => {
    // Only show upcoming and processing appointments in this view
    return apt.status === "upcoming" || apt.status === "processing";
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Push Notification Banner */}
      <PushNotificationBanner
        show={showPushNotification}
        title={t("appointments.push.title")}
        message={t("appointments.push.message", { doctor: confirmedDoctorName })}
        onDismiss={() => setShowPushNotification(false)}
        onActionPrimary={() => {
          clearBookingDraft();
          saveBookingDraft({ type: 'in-person' });
          setLocation("/booking/specialty");
        }}
        onActionSecondary={() => setLocation("/pharmacy/map")}
        primaryLabel={t("appointments.push.bookAgain")}
        secondaryLabel={t("appointments.push.secondary")}
      />

      <header className="bg-white border-b border-slate-100 sticky top-0 z-20">
        <div className="px-5 py-4 pt-12">
          <div className="flex items-center gap-2 min-h-10">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src={appLogo} alt={`${branding.appName} Logo`} className="w-full h-full object-contain" />
            </div>
            <h1 className="font-bold text-xl text-slate-900 font-display">{t("appointments.title")}</h1>
          </div>
        </div>
      </header>

      <main className="p-5 relative">

        {/* Note: Removed tabs for Upcoming/Past as History is now in a separate tab */}

        <div className="space-y-4">
          {isLoading ? (
            // Loading Skeleton
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-full p-4 rounded-2xl border border-slate-100 shadow-sm bg-white">
                <div className="flex justify-between items-start mb-3">
                  <Skeleton className="h-5 w-24 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                  <Skeleton className="h-5 w-5 rounded" />
                </div>
              </div>
            ))
          ) : filteredAppointments.length > 0 ? (
            filteredAppointments.map((apt) => (
              <AppointmentCard
                key={apt.id}
                data={apt}
                onClick={() => setLocation(`/appointments/${apt.id}`)}
              />
            ))
          ) : (
             <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
               <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                 <Calendar size={20} className="text-slate-300" />
               </div>
               <p className="text-sm">{t("appointments.empty.noUpcoming")}</p>
               <Button variant="link" onClick={() => setLocation("/history")} className="mt-2 text-primary">
                 {t("appointments.empty.viewHistory")}
               </Button>
             </div>
          )}
        </div>

      </main>

      {/* FAB */}
      <div className="fixed bottom-[160px] left-0 right-0 max-w-[375px] mx-auto pointer-events-none z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            clearBookingDraft();
            saveBookingDraft({ type: 'in-person' });
            setLocation("/booking/specialty");
          }}
          className="absolute right-5 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center pointer-events-auto"
        >
          <Plus size={28} />
        </motion.button>
      </div>
    </div>
  );
}
