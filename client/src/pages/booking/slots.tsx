import { useState, useMemo } from "react";
import { useLocation } from "wouter";
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

function generateDates() {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push({
      date: date.toISOString().split('T')[0], // YYYY-MM-DD
      dayName: date.toLocaleDateString('de-DE', { weekday: 'short' }),
      dayNumber: date.getDate(),
      isToday: i === 0,
    });
  }
  return dates;
}

export default function BookingSlots() {
  const [, setLocation] = useLocation();
  const draft = getBookingDraft();
  const [recurring, setRecurring] = useState(Boolean(draft?.recurring));

  // Date/time selection state
  const dates = useMemo(() => generateDates(), []);
  const [selectedDate, setSelectedDate] = useState<string>(dates[0].date);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

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
    if (!selectedTime) return;

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
        {/* Date Picker */}
        <div className="overflow-x-auto scrollbar-hide -mx-5 px-5">
          <div className="flex gap-2 pb-2">
            {dates.map((d) => (
              <button
                key={d.date}
                onClick={() => {
                  setSelectedDate(d.date);
                  setSelectedTime(null);
                }}
                className={cn(
                  "flex flex-col items-center min-w-[60px] py-3 px-2 rounded-xl transition-colors",
                  selectedDate === d.date
                    ? "bg-primary text-white"
                    : "bg-white border border-slate-200"
                )}
              >
                <span className={cn(
                  "text-xs font-medium",
                  selectedDate === d.date ? "text-white/80" : "text-slate-500"
                )}>
                  {d.dayName}
                </span>
                <span className="text-lg font-bold">{d.dayNumber}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-slate-500 mb-2">Morning</h3>
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
            <h3 className="text-sm font-medium text-slate-500 mb-2">Afternoon</h3>
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
          disabled={!selectedTime}
          onClick={handleContinue}
        >
          Continue to Review
        </Button>
      </div>
    </div>
  );
}
