import { useEffect, useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Loader2, Video, Check, Calendar, Lock, RefreshCw, ChevronLeft, ChevronRight, Share, Compass } from "lucide-react";
import { motion } from "framer-motion";
import { saveAppointment, getBookingDraft } from "@/lib/storage";
import { format, addDays, setHours, setMinutes } from "date-fns";

type FlowStep = "loading" | "booking" | "confirming";

const DOCTORS = [
  "Dr. Weber",
  "Dr. Schmidt",
  "Dr. Fischer",
  "Dr. Bauer"
];

export default function TeleclinicSimulated() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<FlowStep>("loading");
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Generate dynamic time slots based on current time
  const timeSlots = useMemo(() => {
    const now = new Date();
    const slots: string[] = [];

    // Add some slots for today if it's early enough
    const currentHour = now.getHours();
    if (currentHour < 17) {
      const todaySlot1 = setMinutes(setHours(now, Math.max(currentHour + 1, 14)), 0);
      const todaySlot2 = setMinutes(setHours(now, Math.max(currentHour + 2, 15)), 30);
      if (todaySlot1.getHours() < 18) {
        slots.push(`Today, ${format(todaySlot1, "h:mm a")}`);
      }
      if (todaySlot2.getHours() < 18) {
        slots.push(`Today, ${format(todaySlot2, "h:mm a")}`);
      }
    }

    // Add slots for tomorrow
    const tomorrow = addDays(now, 1);
    slots.push(`Tomorrow, ${format(setHours(setMinutes(tomorrow, 0), 10), "h:mm a")}`);
    slots.push(`Tomorrow, ${format(setHours(setMinutes(tomorrow, 0), 14), "h:mm a")}`);

    return slots.slice(0, 4); // Max 4 slots
  }, []);

  // Random doctor for this session
  const doctor = useMemo(() => DOCTORS[Math.floor(Math.random() * DOCTORS.length)], []);

  // Auto-advance from loading to booking
  useEffect(() => {
    if (step === "loading") {
      const timer = setTimeout(() => setStep("booking"), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Auto-advance from confirming to appointments
  useEffect(() => {
    if (step === "confirming") {
      // Parse time slot to get date and time
      const [dayPart, timePart] = selectedTime.split(", ");
      let date = format(new Date(), "yyyy-MM-dd");
      if (dayPart === "Tomorrow") {
        date = format(addDays(new Date(), 1), "yyyy-MM-dd");
      }
      // Convert time like "2:00 PM" to 24h format "14:00"
      let time = timePart || "14:00";
      try {
        const [hourMin, period] = timePart.split(" ");
        const [h, m] = hourMin.split(":");
        let hour = parseInt(h);
        if (period === "PM" && hour !== 12) hour += 12;
        if (period === "AM" && hour === 12) hour = 0;
        time = `${hour.toString().padStart(2, "0")}:${m}`;
      } catch {
        // Keep default
      }

      // Save video appointment to persistent storage
      saveAppointment({
        id: `TEL-${Date.now()}`,
        type: "video",
        doctor: doctor,
        specialty: selectedReason || "General Consultation",
        clinic: "Teleclinic",
        date,
        time,
        status: "upcoming",
        createdAt: new Date().toISOString()
      });

      const timer = setTimeout(() => {
        setLocation("/appointments");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [step, setLocation, selectedReason, selectedTime, doctor]);

  const handleBooking = () => {
    if (selectedReason && selectedTime) {
      setStep("confirming");
    }
  };

  // Load symptoms from draft if available
  const reasons = useMemo(() => {
    const draft = getBookingDraft();
    const baseReasons = [
      "General Consultation",
      "Follow-up Appointment",
      "Prescription Renewal",
      "Sick Note Request",
      "Test Results Discussion"
    ];
    // If user has symptoms from the telehealth flow, add them
    if (draft?.symptoms && draft.symptoms.length > 0) {
      return [...draft.symptoms, ...baseReasons.slice(0, 3)];
    }
    return baseReasons;
  }, []);

  // Render content based on current step
  const renderContent = () => {
    if (step === "loading") {
      return (
        <div className="min-h-full bg-slate-50 flex flex-col items-center justify-center p-5 text-center">
          <div className="w-16 h-16 bg-white rounded-2xl mb-6 flex items-center justify-center">
            <Video className="text-cyan-500" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Opening Teleclinic...</h2>
          <p className="text-slate-500 mb-8 text-sm">Loading secure video consultation platform</p>
          <Loader2 className="animate-spin text-cyan-500 mb-8" size={32} />
        </div>
      );
    }

    if (step === "confirming") {
      return (
        <div className="min-h-full bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center p-5 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-green-500 rounded-full mb-6 flex items-center justify-center"
          >
            <Check className="text-white" size={40} />
          </motion.div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Booking confirmed</h2>
          <p className="text-slate-600 text-sm">Returning to your appointments...</p>
        </div>
      );
    }

    // Booking form
    return (
      <div className="min-h-full bg-white pb-20">
        {/* Teleclinic Header */}
        <div className="bg-white border-b border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">+</span>
            </div>
            <h1 className="text-xl font-normal text-slate-900">teleclinic</h1>
          </div>
          <p className="text-slate-600 text-sm mt-3">Book your video consultation</p>
        </div>

        {/* Form Content */}
        <div className="p-5 space-y-6">
          {/* Reason Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              Reason for Consultation
            </label>
            <div className="space-y-2">
              {reasons.map((reason) => (
                <motion.button
                  key={reason}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedReason(reason)}
                  className={`w-full p-4 rounded-lg border text-left transition-all ${
                    selectedReason === reason
                      ? "border-cyan-500 bg-cyan-50"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <span className={`font-normal ${
                    selectedReason === reason ? "text-slate-900" : "text-slate-700"
                  }`}>
                    {reason}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              Available Times
            </label>
            <div className="space-y-2">
              {timeSlots.map((time) => (
                <motion.button
                  key={time}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTime(time)}
                  className={`w-full p-4 rounded-lg border text-left transition-all ${
                    selectedTime === time
                      ? "border-cyan-500 bg-cyan-50"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className={selectedTime === time ? "text-cyan-600" : "text-slate-400"} />
                    <span className={`font-normal ${
                      selectedTime === time ? "text-slate-900" : "text-slate-700"
                    }`}>
                      {time}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Book Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleBooking}
            disabled={!selectedReason || !selectedTime}
            className={`w-full py-4 rounded-lg font-semibold text-base transition-all ${
              selectedReason && selectedTime
                ? "bg-cyan-500 text-white"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            Book Appointment
          </motion.button>

          {/* Cancel */}
          <button
            onClick={() => setLocation("/booking/type")}
            className="w-full text-slate-500 text-sm font-normal hover:text-slate-700"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  // Browser chrome wrapper
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-[375px] h-full bg-white flex flex-col">
        {/* Browser Header */}
        <div className="bg-cyan-500 h-[60px] flex items-center px-4 justify-between shrink-0">
        {/* Cancel Button */}
        <button
          onClick={() => setLocation("/booking/type")}
          className="text-white text-base font-normal hover:opacity-80 transition-opacity"
        >
          Cancel
        </button>

        {/* URL Bar */}
        <div className="flex items-center gap-1.5 bg-white/20 rounded-lg px-3 py-1.5">
          <Lock size={14} className="text-white" />
          <span className="text-white text-sm font-medium">teleclinic.com</span>
        </div>

        {/* Refresh Button */}
        <button className="text-white hover:opacity-80 transition-opacity">
          <RefreshCw size={22} />
        </button>
      </div>

      {/* Content Area (scrollable) */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>

      {/* Browser Toolbar */}
      <div className="bg-cyan-500 h-[50px] flex items-center justify-around shrink-0">
        <button className="text-white">
          <ChevronLeft size={22} />
        </button>
        <button className="text-white">
          <ChevronRight size={22} />
        </button>
        <button className="text-white">
          <Share size={22} />
        </button>
        <button className="text-white">
          <Compass size={22} />
        </button>
      </div>
      </div>
    </div>
  );
}
