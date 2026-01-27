import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Check, MapPin, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DURATION_DEFAULT, EASING_DEFAULT, shouldReduceMotion } from "@/lib/motion";
import { saveAppointment, getBookingDraft, clearBookingDraft } from "@/lib/storage";
import { showSuccess } from "@/lib/toast-helpers";
import type { Appointment } from "@/types/storage";
import { formatLocalDate, formatLocalTime, getLocale } from "@/i18n";
import { DOCTORS } from "@/lib/constants/doctors";

export default function SmartMatchSuccess() {
  const [, setLocation] = useLocation();
  const reduceMotion = shouldReduceMotion();
  const locale = getLocale();
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    const draft = getBookingDraft();

    // Generate a date 3-5 days from now for the smart-matched appointment
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 3 + Math.floor(Math.random() * 3));
    const dateIso = futureDate.toISOString().split('T')[0];

    // Use Dr. Sarah Weber with her consistent avatar
    const drWeber = DOCTORS.find(d => d.name.includes('Weber'));

    // Create the appointment
    const newAppointment: Appointment = {
      id: `smart-match-${Date.now()}`,
      type: draft?.type || 'in-person',
      doctor: drWeber?.name || "Dr. Sarah Weber",
      doctorImage: drWeber?.image || undefined,
      specialty: draft?.specialty || "General Practice",
      clinic: "DocliQ Health Center",
      date: dateIso,
      time: "10:00",
      status: 'upcoming',
      createdAt: new Date().toISOString(),
    };

    saveAppointment(newAppointment);
    setAppointment(newAppointment);
    clearBookingDraft();
    showSuccess("Appointment booked successfully!");

    // Auto-redirect after 3s
    const timer = setTimeout(() => {
      setLocation("/appointments");
    }, 3000);

    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex flex-col items-center justify-center p-5 text-center">
      {/* Success Checkmark */}
      <motion.div
        initial={reduceMotion ? false : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={reduceMotion ? { duration: 0 } : { duration: DURATION_DEFAULT, ease: EASING_DEFAULT }}
        className="w-24 h-24 bg-primary rounded-full mb-6 flex items-center justify-center shadow-lg"
      >
        <Check className="text-white" size={48} />
      </motion.div>

      {/* Heading */}
      <h2 className="text-2xl font-semibold text-foreground mb-2">Booking confirmed</h2>
      <p className="text-muted-foreground text-sm mb-8">Your appointment is scheduled</p>

      {/* Booking Details Card */}
      <div className="w-full max-w-sm bg-card rounded-3xl shadow-[var(--shadow-card)] border border-border p-6 mb-6 text-left">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Doctor</p>
            <p className="text-base font-semibold text-foreground">{appointment?.doctor || "Dr. Sarah Weber"}</p>
            <p className="text-sm text-muted-foreground">{appointment?.specialty || "General Practice"}</p>
          </div>

          <div className="h-px bg-border"></div>

          <div className="flex items-start gap-3">
            <MapPin className="text-primary mt-0.5" size={18} />
            <div>
              <p className="text-sm font-medium text-foreground">{appointment?.clinic || "DocliQ Health Center"}</p>
              <p className="text-sm text-muted-foreground">Friedrichstraße 123, 10117 Berlin</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="text-primary" size={18} />
            <p className="text-sm text-foreground">{appointment?.date ? formatLocalDate(appointment.date, locale) : "Loading..."}</p>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="text-primary" size={18} />
            <p className="text-sm text-foreground">{appointment?.time ? formatLocalTime(appointment.time, locale) : "Loading..."}</p>
          </div>

          <div className="h-px bg-border"></div>

          <div className="flex items-center justify-between">
            <span className="inline-block text-[10px] font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full uppercase tracking-wider">
              Smart Match
            </span>
            <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
              Confirmed
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Button
        className="w-full max-w-sm h-12 text-base font-semibold rounded-3xl mb-4"
        onClick={() => setLocation("/appointments")}
      >
        View Appointment
      </Button>

      <p className="text-xs text-muted-foreground">Redirecting to appointments...</p>
    </div>
  );
}
