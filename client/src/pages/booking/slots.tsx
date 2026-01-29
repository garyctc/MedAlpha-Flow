import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DOCTORS } from "@/lib/constants/doctors";
import { saveBookingDraft, getBookingDraft } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const CLINIC_NAMES: Record<number, string> = {
  1: "DocliQ Health Center",
  2: "MedCore Health Center",
  3: "City West Medical",
};

function getClinicIdByName(name: string | undefined): number | null {
  if (!name) return null;
  const entry = Object.entries(CLINIC_NAMES).find(([, n]) => n === name);
  return entry ? parseInt(entry[0]) : null;
}

const TIME_SLOTS = ["08:00", "09:00", "10:30", "11:15", "13:45", "15:00"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAY_NAMES = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

interface CalendarDay {
  date: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isPast: boolean;
  isToday: boolean;
}

function generateCalendarDays(month: Date): CalendarDay[] {
  const days: CalendarDay[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split('T')[0];

  const firstOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
  let startWeekday = firstOfMonth.getDay() - 1;
  if (startWeekday < 0) startWeekday = 6;

  const lastOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const daysInMonth = lastOfMonth.getDate();

  const lastOfPrevMonth = new Date(month.getFullYear(), month.getMonth(), 0);
  const daysInPrevMonth = lastOfPrevMonth.getDate();

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
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const draft = getBookingDraft();

  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isRecurring, setIsRecurring] = useState(false);

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

  const selectedDoctor = useMemo(() => {
    if (draft?.doctor) {
      return DOCTORS.find(d => d.name === draft.doctor);
    }
    return null;
  }, [draft?.doctor]);

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
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-4">
          {draft?.intent !== "reschedule" && (
            <button
              onClick={() => setLocation(backPath)}
              className="w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors -ml-2"
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>
          )}
          <h1 className={cn(
            "text-lg font-semibold text-foreground flex-1 text-center",
            draft?.intent !== "reschedule" && "pr-8"
          )}>
            Select appointment
          </h1>
        </div>
      </header>

      <main className="px-5 space-y-6">
        {/* Calendar Card */}
        <div className="bg-card rounded-3xl shadow-[var(--shadow-card)] border border-border p-5">
          {/* Month Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <div className="flex gap-1">
              <button
                onClick={goToPrevMonth}
                disabled={!canGoBack}
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-lg transition-colors",
                  canGoBack ? "text-foreground hover:bg-muted" : "text-muted-foreground/30 cursor-not-allowed"
                )}
              >
                <ChevronLeft size={20} strokeWidth={1.5} />
              </button>
              <button
                onClick={goToNextMonth}
                disabled={!canGoForward}
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-lg transition-colors",
                  canGoForward ? "text-foreground hover:bg-muted" : "text-muted-foreground/30 cursor-not-allowed"
                )}
              >
                <ChevronRight size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAY_NAMES.map(day => (
              <div key={day} className="text-center text-[11px] font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Day Grid */}
          <div className="grid grid-cols-7 gap-y-1">
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
                  "aspect-square flex items-center justify-center text-sm rounded-full transition-colors mx-auto w-10 h-10",
                  !day.isCurrentMonth && "text-muted-foreground/30",
                  day.isCurrentMonth && day.isPast && "text-muted-foreground/40 cursor-not-allowed",
                  day.isCurrentMonth && !day.isPast && "text-foreground hover:bg-muted",
                  day.isToday && day.isCurrentMonth && "font-semibold",
                  selectedDate === day.date && "bg-primary text-white hover:bg-primary font-medium"
                )}
              >
                {day.dayNumber}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border px-4 py-3 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">
              {t("booking.slots.makeRecurring", { defaultValue: "Make recurring" })}
            </p>
            <p className="text-xs text-muted-foreground">
              {t("booking.slots.cadence", { defaultValue: "Follow-up cadence" })}
            </p>
          </div>
          <Switch
            checked={isRecurring}
            onCheckedChange={setIsRecurring}
            aria-label={t("booking.slots.makeRecurring", { defaultValue: "Make recurring" })}
          />
        </div>

        {/* Time Slots */}
        {selectedDate && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Available times</h3>
            <div className="grid grid-cols-3 gap-3">
              {TIME_SLOTS.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={cn(
                    "h-12 rounded-2xl text-sm font-medium transition-colors",
                    selectedTime === time
                      ? "bg-primary text-white"
                      : "bg-card border border-border text-foreground hover:border-primary/30"
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Continue Button */}
      <div className="fixed bottom-24 left-0 right-0 px-5 max-w-[375px] mx-auto z-40">
        <Button
          className="w-full h-12 rounded-2xl text-base font-semibold"
          disabled={!selectedDate || !selectedTime}
          onClick={handleContinue}
        >
          {t("common.buttons.continue")}
        </Button>
      </div>
    </div>
  );
}
