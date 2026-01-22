import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { Clock, Calendar as CalendarIcon } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { saveBookingDraft, getBookingDraft } from "@/lib/storage";
import { format } from "date-fns";

// Get time slots based on day of week
function getTimeSlotsForDate(date: Date): string[] {
  const day = date.getDay();

  // Sunday - closed
  if (day === 0) {
    return [];
  }

  // Saturday - limited hours
  if (day === 6) {
    return ['09:00', '10:00', '11:00'];
  }

  // Monday/Wednesday - busier days with fewer slots
  if (day === 1 || day === 3) {
    return ['14:00', '15:30', '16:00'];
  }

  // Tuesday/Thursday/Friday - normal days
  return ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
}

// Format 24h time to display format
function formatTimeSlot(time24: string): string {
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export default function BookingCalendar() {
  const [, setLocation] = useLocation();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    const draft = getBookingDraft();
    if (draft?.date) {
      const parsedDate = new Date(draft.date);
      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate);
      }
    }
    if (draft?.time) {
      setSelectedTime(draft.time);
    }
  }, []);

  // Get available time slots for the selected date
  const timeSlots = useMemo(() => {
    if (!date) return [];
    return getTimeSlotsForDate(date);
  }, [date]);

  // Check if a date is in the past
  const isDateDisabled = (checkDate: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const handleContinue = () => {
    if (date && selectedTime) {
      saveBookingDraft({
        date: format(date, 'yyyy-MM-dd'),
        time: selectedTime
      });
      setLocation("/booking/review");
    }
  };

  // Reset selected time when date changes and slot is no longer available
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate && selectedTime) {
      const newSlots = getTimeSlotsForDate(newDate);
      if (!newSlots.includes(selectedTime)) {
        setSelectedTime(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <SubPageHeader title="Select Date & Time" backPath="/booking/doctors" />
      
      <main className="p-5 space-y-6">
        {/* Calendar Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            disabled={isDateDisabled}
            className="rounded-md mx-auto"
            classNames={{
              day_selected: "bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white",
              day_today: "bg-primary/10 text-primary font-bold ring-2 ring-primary/30",
              day_disabled: "text-slate-300 opacity-50 cursor-not-allowed",
            }}
          />
        </div>

        {/* Time Slots */}
        <div>
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Clock size={18} className="text-primary" />
            Available Times
          </h3>

          {!date ? (
            <div className="bg-slate-50 rounded-xl p-6 text-center">
              <CalendarIcon size={24} className="text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-500">Select a date to see available times</p>
            </div>
          ) : timeSlots.length === 0 ? (
            <div className="bg-slate-50 rounded-xl p-6 text-center">
              <Clock size={24} className="text-slate-400 mx-auto mb-2" />
              <p className="font-medium text-slate-700 mb-1">No appointments available</p>
              <p className="text-sm text-slate-500">This date is unavailable. Please select another day.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 px-2 rounded-lg text-sm font-medium transition-all border ${
                    selectedTime === time
                      ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                      : "bg-white text-slate-600 border-primary/20 hover:border-primary/50"
                  }`}
                >
                  {formatTimeSlot(time)}
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-[80px] left-0 right-0 z-40 flex justify-center">
        <div className="max-w-[375px] w-full bg-white border-t border-slate-100 px-5 py-4 flex justify-center">
          <div className="w-[315px]">
            <Button
              className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
              disabled={!date || !selectedTime}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
