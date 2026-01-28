import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import PushNotificationBanner from "@/components/ui/push-notification-banner";
import { getUserAppointments, saveAppointment, clearBookingDraft, saveBookingDraft } from "@/lib/storage";
import type { Appointment as StoredAppointment } from "@/types/storage";
import { seedBookAgainDraft } from "@/lib/booking/intent";
import { useTranslation } from "react-i18next";
import { formatLocalDate, formatLocalTime, getLocale, type Locale } from "@/i18n";
import { format, parse } from "date-fns";
import { enUS } from "date-fns/locale";
import { AppointmentCard, type AppointmentCardData } from "@/components/appointment-card";
import { DOCTORS } from "@/lib/constants/doctors";

type Appointment = AppointmentCardData & {
  badge: string;
  badgeColor: string;
  rawDate?: string;
  rawTime?: string;
};

const STATUS_FILTERS = [
  { id: "all", label: "All" },
  { id: "searching", label: "Searching" },
  { id: "waiting", label: "Waiting for confirmation" },
  { id: "confirmed", label: "Confirmed" },
  { id: "rejected", label: "Rejected" },
  { id: "expired", label: "Expired" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
] as const;

type StatusFilterId = (typeof STATUS_FILTERS)[number]["id"];

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
      badge: "",
      badgeColor: "",
      doctor: apt.doctor,
      doctorImage: apt.doctorImage,
      role: apt.specialty,
      location: apt.clinic,
      date: dateText,
      rawDate: apt.date,
      rawTime: formatStoredTime(apt.time, locale),
      matchStatus: apt.matchStatus,
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
  const [activeFilter, setActiveFilter] = useState<StatusFilterId>("all");
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
        location: "DocliQ Health Center",
        date: `${bookingDate} • ${bookingTime}`,
        subStatus: "processing",
      });

      // Simulate webhook after 5 seconds - use Dr. Sarah Weber with her consistent avatar
      const webhookTimer = setTimeout(() => {
        const drWeber = DOCTORS.find(d => d.name.includes('Weber'));
        const doctorName = drWeber?.name || "Dr. Sarah Weber";
        const doctorImage = drWeber?.image || undefined;

        // Update to confirmed
        const confirmedAppointment: Appointment = {
          id: booking.id,
          status: "upcoming",
          type: "in-person",
          badge: "",
          badgeColor: "",
          doctor: doctorName,
          doctorImage: doctorImage,
          role: t("specialty.generalPractice"),
          location: "DocliQ Health Center, Downtown Berlin",
          date: `${formatLocalDate("2026-01-24", locale)} • ${formatLocalTime("10:00", locale)}`,
          subStatus: undefined
        };

        setPendingBooking(confirmedAppointment);

        // Save to persistent storage with doctor image
        saveAppointment({
          id: booking.id,
          type: "in-person",
          doctor: doctorName,
          doctorImage: doctorImage,
          specialty: "General Practice",
          clinic: "DocliQ Health Center, Downtown Berlin",
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

  const filteredAppointments = allAppointments.filter((apt) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "completed") return apt.subStatus === "completed";
    if (activeFilter === "cancelled") return apt.subStatus === "cancelled";
    return apt.matchStatus === activeFilter;
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
          const bookAgainAppointment: StoredAppointment = {
            id: pendingBooking?.id || `appt-${Date.now()}`,
            type: "in-person",
            doctor: confirmedDoctorName || "Unknown",
            specialty: "General Practice",
            clinic: "DocliQ Health Center",
            date: "2026-01-24",
            time: "10:00",
            status: "upcoming",
            createdAt: new Date().toISOString(),
          };
          seedBookAgainDraft(bookAgainAppointment);
          setLocation("/booking/slots");
        }}
        onActionSecondary={() => setLocation("/pharmacy/map")}
        primaryLabel={t("appointments.push.bookAgain")}
        secondaryLabel={t("appointments.push.secondary")}
      />

      <header className="px-5 pt-12 pb-4">
        <h1 className="text-2xl font-semibold text-foreground">{t("appointments.title")}</h1>
      </header>

      <main className="p-5 relative">

        {/* Note: Removed tabs for Upcoming/Past as History is now in a separate tab */}
        <div
          className="flex gap-2 overflow-x-auto pb-1 no-scrollbar"
          data-testid="appointments-filters"
        >
          {STATUS_FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap ${
                activeFilter === filter.id
                  ? "bg-primary text-white border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/50"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="space-y-4" data-testid="appointments-list">
          {isLoading ? (
            // Loading Skeleton
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-full p-4 rounded-3xl border border-border shadow-[var(--shadow-card)] bg-card flex items-center gap-4">
                <Skeleton className="w-14 h-14 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-12 w-12 rounded-xl" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            ))
          ) : filteredAppointments.length > 0 ? (
            filteredAppointments.map((apt) => (
              <AppointmentCard
                key={apt.id}
                data={{
                  ...apt,
                  rawDate: apt.rawDate,
                  rawTime: apt.rawTime,
                }}
                onClick={() => setLocation(`/appointments/${apt.id}`)}
              />
            ))
          ) : (
             <div className="flex flex-col items-center justify-center py-12 text-center">
               <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                 <Calendar size={28} className="text-muted-foreground" />
               </div>
               <p className="text-muted-foreground">{t("appointments.empty.noUpcoming")}</p>
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
            setLocation("/booking/entry");
          }}
          className="absolute right-5 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center pointer-events-auto"
        >
          <Plus size={28} />
        </motion.button>
      </div>
    </div>
  );
}
