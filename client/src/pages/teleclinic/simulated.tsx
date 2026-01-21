import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Loader2, Video, Check, Calendar, Lock, RefreshCw, ChevronLeft, ChevronRight, Share, Compass } from "lucide-react";
import { motion } from "framer-motion";
import { saveAppointment } from "@/lib/storage";

type FlowStep = "loading" | "booking" | "confirming";

export default function TeleclinicSimulated() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<FlowStep>("loading");
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

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
      // Save video appointment to persistent storage
      saveAppointment({
        id: `TEL-${Date.now()}`,
        type: "video",
        doctor: "Dr. Available Doctor",
        specialty: selectedReason || "General Consultation",
        clinic: "Teleclinic",
        date: selectedTime.split(",")[0],
        time: selectedTime.split(",")[1]?.trim() || "TBD",
        status: "upcoming",
        createdAt: new Date().toISOString()
      });

      const timer = setTimeout(() => {
        setLocation("/appointments");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [step, setLocation, selectedReason, selectedTime]);

  const handleBooking = () => {
    if (selectedReason && selectedTime) {
      setStep("confirming");
    }
  };

  // Booking form data
  const reasons = [
    "General Consultation",
    "Follow-up Appointment",
    "Prescription Renewal",
    "Sick Note Request",
    "Test Results Discussion"
  ];

  const timeSlots = [
    "Today, 2:00 PM",
    "Today, 3:30 PM",
    "Tomorrow, 10:00 AM",
    "Tomorrow, 2:00 PM"
  ];

  // Render content based on current step
  const renderContent = () => {
    if (step === "loading") {
      return (
        <div className="min-h-full bg-slate-50 flex flex-col items-center justify-center p-5 text-center">
          <div className="w-16 h-16 bg-white rounded-2xl mb-6 flex items-center justify-center shadow-sm">
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
            className="w-20 h-20 bg-green-500 rounded-full mb-6 flex items-center justify-center shadow-lg"
          >
            <Check className="text-white" size={40} />
          </motion.div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
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
                ? "bg-cyan-500 text-white shadow-sm"
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
