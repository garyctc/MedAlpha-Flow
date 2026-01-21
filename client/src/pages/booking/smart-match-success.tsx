import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Check, MapPin, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DURATION_DEFAULT, EASING_DEFAULT, shouldReduceMotion } from "@/lib/motion";

export default function SmartMatchSuccess() {
  const [, setLocation] = useLocation();
  const reduceMotion = shouldReduceMotion();

  useEffect(() => {
    // Save pending booking to localStorage for appointments page
    const booking = {
      id: `MA-${Date.now()}`,
      status: "processing",
      doctor: "TBD",
      clinic: "TBD",
      dateIso: "2026-01-24",
      time24: "10:00",
      date: "January 24, 2026",
      time: "10:00 AM",
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("pending-smart-match-booking", JSON.stringify(booking));

    // Auto-redirect after 3s
    const timer = setTimeout(() => {
      setLocation("/appointments");
    }, 3000);

    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center p-5 text-center">
      {/* Success Checkmark */}
      <motion.div
        initial={reduceMotion ? false : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={reduceMotion ? { duration: 0 } : { duration: DURATION_DEFAULT, ease: EASING_DEFAULT }}
        className="w-24 h-24 bg-purple-600 rounded-full mb-6 flex items-center justify-center shadow-lg"
      >
        <Check className="text-white" size={48} />
      </motion.div>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Booking confirmed</h2>
      <p className="text-slate-600 text-sm mb-8">Your appointment is scheduled</p>

      {/* Booking Details Card */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6 text-left">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-2">Doctor</p>
            <p className="text-base font-bold text-slate-900">Dr. Sarah Johnson</p>
            <p className="text-sm text-slate-500">General Practice</p>
          </div>

          <div className="h-px bg-slate-100"></div>

          <div className="flex items-start gap-3">
            <MapPin className="text-purple-700 mt-0.5" size={18} />
            <div>
              <p className="text-sm font-medium text-slate-900">MedAlpha Health Center</p>
              <p className="text-sm text-slate-500">Friedrichstraße 123, 10117 Berlin</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="text-purple-700" size={18} />
            <p className="text-sm text-slate-700">January 24, 2026</p>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="text-purple-700" size={18} />
            <p className="text-sm text-slate-700">10:00 AM</p>
          </div>

          <div className="h-px bg-slate-100"></div>

          <div className="flex items-center justify-between">
            <span className="inline-block text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-1 rounded-full uppercase tracking-wider">
              MedAlpha Match
            </span>
            <span className="inline-block text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
              Confirmed
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Button
        className="w-full max-w-sm h-12 text-base font-semibold rounded-xl bg-purple-600 hover:bg-purple-700 text-white mb-4"
        onClick={() => setLocation("/appointments")}
      >
        View Appointment
      </Button>

      <p className="text-xs text-slate-500">Redirecting to appointments...</p>
    </div>
  );
}
