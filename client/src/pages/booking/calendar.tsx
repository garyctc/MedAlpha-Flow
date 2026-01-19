import { useState } from "react";
import { useLocation } from "wouter";
import { Clock } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export default function BookingCalendar() {
  const [, setLocation] = useLocation();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>("09:00");

  const morningSlots = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM"];
  const afternoonSlots = ["11:00 AM", "02:00 PM", "02:30 PM", "03:00 PM"];

  return (
    <div className="min-h-screen bg-background pb-28">
      <SubPageHeader title="Select Date & Time" backPath="/booking/doctors" />
      
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
              day_today: "bg-slate-100 text-slate-900 font-bold",
            }}
          />
        </div>

        {/* Time Slots */}
        <div>
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            Available Times
          </h3>
          
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-2">
              {morningSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 px-1 rounded-lg text-xs font-medium transition-all border ${
                    selectedTime === time
                      ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                      : "bg-white text-slate-600 border-primary/20 hover:border-primary/50"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {afternoonSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 px-1 rounded-lg text-xs font-medium transition-all border ${
                    selectedTime === time
                      ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                      : "bg-white text-slate-600 border-primary/20 hover:border-primary/50"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-slate-100 pb-safe z-[60]">
        <div className="max-w-[375px] mx-auto">
           <Button 
            className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
            disabled={!date || !selectedTime}
            onClick={() => setLocation("/booking/review")}
           >
             Continue
           </Button>
        </div>
      </div>
    </div>
  );
}
