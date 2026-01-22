import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Filter, ChevronRight, Plus, MapPin, Clock, Video, CheckCircle2, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import appLogo from "@/assets/app-logo.svg";
import { branding } from "@/config/branding";
import { useToast } from "@/hooks/use-toast";
import PushNotificationBanner from "@/components/ui/push-notification-banner";
import { getUserAppointments, saveAppointment, updateAppointment } from "@/lib/storage";
import { showSuccess } from "@/lib/toast-helpers";
import type { Appointment as StoredAppointment } from "@/types/storage";
import { useTranslation } from "react-i18next";
import { formatLocalDate, formatLocalTime, getLocale, type Locale } from "@/i18n";
import { format, parse } from "date-fns";
import { enUS } from "date-fns/locale";

type Appointment = {
  id: string;
  status: "upcoming" | "past" | "processing";
  type: "in-person" | "video";
  badge: string;
  badgeColor: string;
  doctor: string;
  role: string;
  location: string;
  date: string;
  subStatus?: "cancelled" | "completed" | "processing";
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

    let badge = formatStoredDate(apt.date, locale);
    let badgeColor = "bg-slate-100 text-slate-500";

    if (apt.status === "processing") {
      badge = t("common.status.processing");
      badgeColor = "bg-blue-50 text-blue-600";
    } else if (apt.status === "completed") {
      badge = t("common.status.completed");
      badgeColor = "bg-emerald-50 text-emerald-700";
    } else if (apt.status === "cancelled") {
      badge = t("common.status.cancelled");
      badgeColor = "bg-red-50 text-red-600";
    } else if (apt.type === "video") {
      badge = t("appointments.type.video");
      badgeColor = "bg-blue-50 text-blue-700";
    }

    const dateText = `${formatStoredDate(apt.date, locale)} • ${formatStoredTime(apt.time, locale)}`;

    return {
      id: apt.id,
      status: statusDisplay,
      type: apt.type,
      badge,
      badgeColor,
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
  const [filterType, setFilterType] = useState<"all" | "in-person" | "video">("all");
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
        badge: t("common.status.processing"),
        badgeColor: "bg-blue-50 text-blue-600",
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
          badge: t("appointments.badge.tomorrow"),
          badgeColor: "bg-blue-50 text-blue-600",
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
    if (apt.status !== "upcoming" && apt.status !== "processing") return false;

    // Filter by type
    if (filterType === "all") return true;
    return apt.type === filterType;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Push Notification Banner */}
      <PushNotificationBanner
        show={showPushNotification}
        title={t("appointments.push.title")}
        message={t("appointments.push.message", { doctor: confirmedDoctorName })}
        onDismiss={() => setShowPushNotification(false)}
        onActionPrimary={() => setLocation("/booking/type")}
        onActionSecondary={() => setLocation("/pharmacy/map")}
        primaryLabel={t("appointments.push.bookAgain")}
        secondaryLabel={t("appointments.push.secondary")}
      />

      <header className="bg-white border-b border-slate-100 sticky top-0 z-20">
        <div className="px-5 py-4 pt-12">
          <div className="flex items-center gap-2 mb-4 min-h-10">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src={appLogo} alt={`${branding.appName} Logo`} className="w-full h-full object-contain" />
            </div>
            <h1 className="font-bold text-xl text-slate-900 font-display">{t("appointments.title")}</h1>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: "all", label: t("appointments.filters.all") },
              { id: "in-person", label: t("appointments.filters.inPerson") },
              { id: "video", label: t("appointments.filters.video") }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setFilterType(option.id as any)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap",
                  filterType === option.id
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                )}
              >
                {option.label}
              </button>
            ))}
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
                 <Filter size={20} className="text-slate-300" />
               </div>
               {filterType === "all" ? (
                 <p className="text-sm">{t("appointments.empty.noUpcoming")}</p>
               ) : (
                 <p className="text-sm">
                   {t("appointments.empty.noUpcomingWithType", {
                     type: filterType === "in-person" ? t("appointments.filters.inPerson") : t("appointments.filters.video"),
                   })}
                 </p>
               )}
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
          onClick={() => setLocation("/booking/type")}
          className="absolute right-5 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center pointer-events-auto"
        >
          <Plus size={28} />
        </motion.button>
      </div>
    </div>
  );
}

function AppointmentCard({ data, onClick }: { data: Appointment, onClick: () => void }) {
  const isVideo = data.type === "video";
  const isProcessing = data.status === "processing";
  const { t } = useTranslation();

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full p-4 rounded-2xl border shadow-sm flex flex-col gap-3 text-left transition-all group ${
        isProcessing
          ? "bg-purple-50 border-purple-200"
          : "bg-white border-slate-100 hover:border-primary/30"
      }`}
    >
        <div className="flex justify-between items-start w-full">
        <div className="flex gap-2">
          {data.subStatus === "processing" && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-purple-600 text-white flex items-center gap-1 animate-pulse">
              <Loader2 size={10} className="animate-spin" /> {t("common.status.processing")}
            </span>
          )}
          {data.subStatus === "completed" && (
             <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-emerald-50 text-emerald-700">
               {t("common.status.completed")}
             </span>
          )}
          {data.subStatus === "cancelled" && (
             <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-red-50 text-red-600">
               {t("common.status.cancelled")}
             </span>
          )}
           {!data.subStatus && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${data.badgeColor}`}>{data.badge}</span>
          )}

          {isVideo && !isProcessing && (
             <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-cyan-50 text-cyan-600 flex items-center gap-1">
               <Video size={10} /> {t("appointments.type.video")}
             </span>
          )}
        </div>
        <span className="text-xs text-slate-400 font-medium">{data.date}</span>
      </div>


      <div className="flex justify-between items-center w-full">
        <div className="flex-1">
          <h3 className={`font-bold text-lg transition-colors ${
            isProcessing ? "text-purple-900" : "text-slate-900 group-hover:text-primary"
          }`}>{data.doctor}</h3>
          <p className="text-sm text-slate-500">{data.role}</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
             {isVideo ? <Video size={10} /> : <MapPin size={10} />}
             <span>{data.location}</span>
          </div>
          {isProcessing && (
            <span className="inline-block mt-2 text-[9px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
              {t("appointments.partner.smartMatch")}
            </span>
          )}
        </div>
        <ChevronRight size={20} className={`transition-colors ${
          isProcessing ? "text-purple-400" : "text-slate-300 group-hover:text-primary"
        }`} />
      </div>
    </motion.button>
  );
}
