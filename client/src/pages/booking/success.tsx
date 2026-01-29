import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Check, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DURATION_DEFAULT, DURATION_SLOW, EASING_DEFAULT, shouldReduceMotion } from "@/lib/motion";
import { useTranslation } from "react-i18next";
import { formatLocalDate, formatLocalTime, getLocale } from "@/i18n";
import { getUserAppointments, clearBookingDraft } from "@/lib/storage";
import type { Appointment } from "@/types/storage";
import { DEFAULT_DOCTOR_AVATAR } from "@/lib/constants/doctors";

export default function BookingSuccess() {
  const reduceMotion = shouldReduceMotion();
  const { t } = useTranslation();
  const locale = getLocale();

  const [appointment, setAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    // Clear any remaining draft
    clearBookingDraft();

    // Load the last booked appointment from sessionStorage
    const lastBookedId = sessionStorage.getItem('last-booked-appointment');
    if (lastBookedId) {
      const appointments = getUserAppointments();
      const booked = appointments.find(a => a.id === lastBookedId);
      if (booked) {
        setAppointment(booked);
      }
      sessionStorage.removeItem('last-booked-appointment');
    } else {
      // Fallback: get the most recent upcoming appointment
      const appointments = getUserAppointments();
      const recent = appointments.find(a => a.status === 'upcoming');
      if (recent) {
        setAppointment(recent);
      }
    }
  }, []);

  // Use appointment data or fallback
  const doctorName = appointment?.doctor || "Dr. Anna Schmidt";
  const clinicName = appointment?.clinic || "Health Center Berlin";
  const dateIso = appointment?.date || "2026-01-20";
  const time24 = appointment?.time || "09:00";
  const dateLabel = formatLocalDate(dateIso, locale);
  const timeLabel = formatLocalTime(time24, locale);

  // Get doctor image
  const doctorImage = appointment?.doctorImage || DEFAULT_DOCTOR_AVATAR;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center" data-testid="success-screen">
      <motion.div
        initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={reduceMotion ? { duration: 0 } : { duration: DURATION_SLOW, ease: EASING_DEFAULT }}
        className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6"
      >
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
          <Check size={40} className="text-white" strokeWidth={3} />
        </div>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: DURATION_DEFAULT, ease: EASING_DEFAULT, delay: DURATION_DEFAULT }
        }
        className="w-full"
      >
        <h1 className="text-2xl font-semibold text-foreground mb-2">{t("booking.success.title")}</h1>
        <p className="text-muted-foreground mb-8 max-w-[280px] mx-auto">{t("booking.success.subtitle")}</p>

        {/* Summary Card */}
        <div className="bg-card rounded-3xl border border-border shadow-[var(--shadow-card)] p-5 mb-8 text-center mx-auto max-w-xs">
          {/* Doctor avatar */}
          <div className="relative w-16 h-16 mx-auto mb-4">
            <img
              src={doctorImage}
              alt={doctorName}
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>

          <p className="font-semibold text-foreground text-lg mb-1">{doctorName}</p>
          <p className="text-primary font-medium text-sm mb-3">
            {t("booking.success.summaryDateTime", { date: dateLabel, time: timeLabel })}
          </p>
          <p className="text-sm text-muted-foreground">{clinicName}</p>
        </div>

        <div className="space-y-3 w-full">
          <Button variant="outline" className="w-full h-12 gap-2">
            <Calendar size={18} /> {t("booking.success.addToCalendar")}
          </Button>

          <Link href="/home">
            <Button className="w-full h-12">
              {t("common.buttons.done")}
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
