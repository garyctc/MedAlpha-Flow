import { useState } from "react";
import { useLocation } from "wouter";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { DOCTORS } from "@/lib/constants/doctors";
import { saveBookingDraft, getBookingDraft } from "@/lib/storage";

export default function BookingSlots() {
  const [, setLocation] = useLocation();
  const draft = getBookingDraft();
  const [recurring, setRecurring] = useState(Boolean(draft?.recurring));

  const slots = DOCTORS.map((doc, idx) => ({
    doctor: doc.name,
    specialty: doc.specialty,
    date: "2026-01-30",
    time: idx % 2 === 0 ? "09:00" : "14:00",
  }));

  return (
    <div className="min-h-screen bg-background pb-28">
      <SubPageHeader title="Select a Slot" backPath="/booking/location" />
      <main className="p-5 space-y-4">
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

        <div className="space-y-3">
          {slots.map((slot) => (
            <button
              key={`${slot.doctor}-${slot.time}`}
              onClick={() => {
                saveBookingDraft({
                  doctor: slot.doctor,
                  specialty: slot.specialty,
                  date: slot.date,
                  time: slot.time,
                });
                setLocation("/booking/review");
              }}
              className="w-full bg-white p-4 rounded-2xl border border-slate-100 text-left"
            >
              <div className="font-bold text-slate-900">{slot.doctor}</div>
              <div className="text-sm text-slate-500">{slot.specialty}</div>
              <div className="text-sm text-slate-700 mt-2">
                {slot.date} • {slot.time}
              </div>
            </button>
          ))}
        </div>

        {recurring && (
          <div className="bg-white border border-slate-100 rounded-xl p-4">
            <p className="text-sm font-medium mb-2">Follow-up cadence</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => saveBookingDraft({ recurrenceCount: 3, recurrenceIntervalWeeks: 4 })}
              >
                3 visits / 4 weeks
              </Button>
              <Button
                variant="outline"
                onClick={() => saveBookingDraft({ recurrenceCount: 6, recurrenceIntervalWeeks: 4 })}
              >
                6 visits / 4 weeks
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
