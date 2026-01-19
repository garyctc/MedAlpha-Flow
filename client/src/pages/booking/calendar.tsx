import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export default function BookingCalendar() {
  const [, setLocation] = useLocation();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", 
    "11:00", "11:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30"
  ];

  return (
    <div className="min-h-screen bg-background pb-28">
      <SubPageHeader title="Select Date & Time" />
      
      <main className="p-5 space-y-6">
        {/* Calendar Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md mx-auto"
            classNames={{
              day_selected: "bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white",
              day_today: "bg-slate-100 text-slate-900",
            }}
          />
        </div>

        {/* Time Slots */}
        <div>
          <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Clock size={18} className="text-primary" />
            Available Slots
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-2 px-1 rounded-lg text-sm font-medium transition-all border ${
                  selectedTime === time
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                    : "bg-white text-slate-600 border-slate-200 hover:border-primary/50"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-slate-100 pb-safe">
        <div className="max-w-[375px] mx-auto">
           <Button 
            className="w-full h-12 text-base rounded-xl"
            disabled={!date || !selectedTime}
            onClick={() => setLocation("/booking/success")}
           >
             Confirm Booking
           </Button>
        </div>
      </div>
    </div>
  );
}
