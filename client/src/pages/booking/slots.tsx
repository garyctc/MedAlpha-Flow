import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { DOCTORS } from "@/lib/constants/doctors";
import { saveBookingDraft, getBookingDraft } from "@/lib/storage";
import { cn } from "@/lib/utils";

const CLINIC_NAMES: Record<number, string> = {
  1: "MedAlpha Health Center",
  2: "MedCore Health Center",
  3: "City West Medical",
};

function getClinicIdByName(name: string | undefined): number | null {
  if (!name) return null;
  const entry = Object.entries(CLINIC_NAMES).find(([, n]) => n === name);
  return entry ? parseInt(entry[0]) : null;
}

const MORNING_SLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];
const AFTERNOON_SLOTS = ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];

const MONTH_NAMES_DE = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember"
];

const DAY_NAMES_DE = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

interface CalendarDay {
  date: string;        // YYYY-MM-DD
  dayNumber: number;   // 1-31
  isCurrentMonth: boolean;
  isPast: boolean;
  isToday: boolean;
}

function generateCalendarDays(month: Date): CalendarDay[] {
  const days: CalendarDay[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split('T')[0];

  // Get first day of the month
  const firstOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
  // Get weekday (0=Sunday, convert to 0=Monday)
  let startWeekday = firstOfMonth.getDay() - 1;
  if (startWeekday < 0) startWeekday = 6; // Sunday becomes 6

  // Get last day of month
  const lastOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const daysInMonth = lastOfMonth.getDate();

  // Get last day of previous month
  const lastOfPrevMonth = new Date(month.getFullYear(), month.getMonth(), 0);
  const daysInPrevMonth = lastOfPrevMonth.getDate();

  // Fill in days from previous month
  for (let i = startWeekday - 1; i >= 0; i--) {
    const dayNum = daysInPrevMonth - i;
    const date = new Date(month.getFullYear(), month.getMonth() - 1, dayNum);
    const dateStr = date.toISOString().split('T')[0];
    days.push({
      date: dateStr,
      dayNumber: dayNum,
      isCurrentMonth: false,
      isPast: date < today,
      isToday: dateStr === todayStr,
    });
  }

  // Fill in current month days
  for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
    const date = new Date(month.getFullYear(), month.getMonth(), dayNum);
    const dateStr = date.toISOString().split('T')[0];
    days.push({
      date: dateStr,
      dayNumber: dayNum,
      isCurrentMonth: true,
      isPast: date < today,
      isToday: dateStr === todayStr,
    });
  }

  // Fill remaining days from next month (to complete 6 weeks = 42 days)
  const remaining = 42 - days.length;
  for (let dayNum = 1; dayNum <= remaining; dayNum++) {
    const date = new Date(month.getFullYear(), month.getMonth() + 1, dayNum);
    const dateStr = date.toISOString().split('T')[0];
    days.push({
      date: dateStr,
      dayNumber: dayNum,
      isCurrentMonth: false,
      isPast: date < today,
      isToday: dateStr === todayStr,
    });
  }

  return days;
}

function canNavigateBack(currentMonth: Date): boolean {
  const today = new Date();
  return currentMonth.getFullYear() > today.getFullYear() ||
    (currentMonth.getFullYear() === today.getFullYear() && currentMonth.getMonth() > today.getMonth());
}

function canNavigateForward(currentMonth: Date, maxMonthsAhead: number): boolean {
  const today = new Date();
  const maxDate = new Date(today.getFullYear(), today.getMonth() + maxMonthsAhead, 1);
  return currentMonth.getFullYear() < maxDate.getFullYear() ||
    (currentMonth.getFullYear() === maxDate.getFullYear() && currentMonth.getMonth() < maxDate.getMonth());
}

export default function BookingSlots() {
  const [, setLocation] = useLocation();
  const draft = getBookingDraft();
  const [recurring, setRecurring] = useState(Boolean(draft?.recurring));

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const calendarDays = useMemo(
    () => generateCalendarDays(currentMonth),
    [currentMonth]
  );

  const canGoBack = useMemo(
    () => canNavigateBack(currentMonth),
    [currentMonth]
  );

  const canGoForward = useMemo(
    () => canNavigateForward(currentMonth, 2),
    [currentMonth]
  );

  const goToPrevMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  // Find selected doctor from draft
  const selectedDoctor = useMemo(() => {
    if (draft?.doctor) {
      return DOCTORS.find(d => d.name === draft.doctor);
    }
    return null;
  }, [draft?.doctor]);

  // Determine back path based on entry mode
  const backPath = useMemo(() => {
    if (draft?.entryMode === 'specialty') {
      const clinicId = getClinicIdByName(draft?.location);
      return clinicId ? `/booking/doctors?location=${clinicId}` : '/booking/doctors';
    }
    return '/booking/doctors';
  }, [draft?.entryMode, draft?.location]);

  const handleContinue = () => {
    if (!selectedDate || !selectedTime) return;

    saveBookingDraft({
      doctor: selectedDoctor?.name || draft?.doctor || "Available Doctor",
      specialty: selectedDoctor?.specialty || draft?.specialty || "General Practice",
      date: selectedDate,
      time: selectedTime,
      location: draft?.location || CLINIC_NAMES[selectedDoctor?.clinics[0] || 1],
    });
    setLocation("/booking/review");
  };

  return (
    <div className="min-h-screen bg-background pb-36">
      <SubPageHeader title="Select a Slot" backPath={backPath} />

      <main className="p-5 space-y-6">
        {/* Calendar */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">
              {MONTH_NAMES_DE[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={goToPrevMonth}
                disabled={!canGoBack}
                className={cn(
                  "p-2 rounded-lg",
                  canGoBack ? "hover:bg-slate-100" : "opacity-30 cursor-not-allowed"
                )}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goToNextMonth}
                disabled={!canGoForward}
                className={cn(
                  "p-2 rounded-lg",
                  canGoForward ? "hover:bg-slate-100" : "opacity-30 cursor-not-allowed"
                )}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAY_NAMES_DE.map(day => (
              <div key={day} className="text-center text-xs font-medium text-slate-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!day.isPast && day.isCurrentMonth) {
                    setSelectedDate(day.date);
                    setSelectedTime(null);
                  }
                }}
                disabled={day.isPast || !day.isCurrentMonth}
                className={cn(
                  "aspect-square flex items-center justify-center text-sm rounded-full transition-colors",
                  !day.isCurrentMonth && "text-slate-300",
                  day.isCurrentMonth && day.isPast && "text-slate-300 cursor-not-allowed",
                  day.isCurrentMonth && !day.isPast && "text-slate-900 hover:bg-slate-100",
                  day.isToday && "font-bold",
                  selectedDate === day.date && "bg-primary text-white hover:bg-primary"
                )}
              >
                {day.dayNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots - only show when date selected */}
        {selectedDate && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-500">Verfügbare Zeiten</h3>

            <div>
              <p className="text-xs font-medium text-slate-400 mb-2">Vormittag</p>
              <div className="grid grid-cols-4 gap-2">
                {MORNING_SLOTS.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      "py-2.5 px-3 rounded-lg text-sm font-medium transition-colors",
                      selectedTime === time
                        ? "bg-primary text-white"
                        : "bg-white border border-slate-200 hover:border-primary"
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400 mb-2">Nachmittag</p>
              <div className="grid grid-cols-4 gap-2">
                {AFTERNOON_SLOTS.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      "py-2.5 px-3 rounded-lg text-sm font-medium transition-colors",
                      selectedTime === time
                        ? "bg-primary text-white"
                        : "bg-white border border-slate-200 hover:border-primary"
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Recurring Toggle */}
        <div className="flex items-center justify-between bg-white border border-slate-100 rounded-xl p-4">
          <span className="text-sm font-medium">Make recurring</span>
          <Switch
            checked={recurring}
            onCheckedChange={(val) => {
              setRecurring(val);
              saveBookingDraft({ recurring: val });
            }}
          />
        </div>

        {recurring && (
          <div className="bg-white border border-slate-100 rounded-xl p-4">
            <p className="text-sm font-medium mb-2">Follow-up cadence</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => saveBookingDraft({ recurrenceCount: 3, recurrenceIntervalWeeks: 4 })}
              >
                3 visits / 4 weeks
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => saveBookingDraft({ recurrenceCount: 6, recurrenceIntervalWeeks: 4 })}
              >
                6 visits / 4 weeks
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Continue Button */}
      <div className="fixed bottom-24 left-0 right-0 p-5 bg-gradient-to-t from-background via-background to-transparent max-w-[375px] mx-auto">
        <Button
          className="w-full h-12"
          disabled={!selectedDate || !selectedTime}
          onClick={handleContinue}
        >
          Continue to Review
        </Button>
      </div>
    </div>
  );
}
