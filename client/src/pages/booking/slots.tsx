import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { MapPin } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { DOCTORS } from "@/lib/constants/doctors";
import { saveBookingDraft, getBookingDraft } from "@/lib/storage";

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

export default function BookingSlots() {
  const [, setLocation] = useLocation();
  const draft = getBookingDraft();
  const [recurring, setRecurring] = useState(Boolean(draft?.recurring));

  // Find selected doctor from draft
  const selectedDoctor = useMemo(() => {
    if (draft?.doctor) {
      return DOCTORS.find(d => d.name === draft.doctor);
    }
    return null;
  }, [draft?.doctor]);

  const hasMultipleClinics = selectedDoctor && selectedDoctor.clinics.length > 1;

  // Determine back path based on entry mode
  const backPath = useMemo(() => {
    if (draft?.entryMode === 'specialty') {
      const clinicId = getClinicIdByName(draft?.location);
      return clinicId ? `/booking/doctors?location=${clinicId}` : '/booking/doctors';
    }
    // Doctor path
    return '/booking/doctors';
  }, [draft?.entryMode, draft?.location]);

  // Generate slots - if doctor has multiple clinics, show clinic per slot
  const slots = useMemo(() => {
    const times = ["09:00", "10:30", "14:00", "15:30"];

    if (selectedDoctor && hasMultipleClinics) {
      // Multi-clinic: distribute slots across clinics
      return times.map((time, idx) => ({
        doctor: selectedDoctor.name,
        specialty: selectedDoctor.specialty,
        date: "2026-01-30",
        time,
        clinicId: selectedDoctor.clinics[idx % selectedDoctor.clinics.length],
        clinicName: CLINIC_NAMES[selectedDoctor.clinics[idx % selectedDoctor.clinics.length]],
      }));
    }

    // Single clinic or no doctor selected: simple slots
    return times.map((time) => ({
      doctor: selectedDoctor?.name || draft?.doctor || "Available Doctor",
      specialty: selectedDoctor?.specialty || draft?.specialty || "General Practice",
      date: "2026-01-30",
      time,
      clinicId: selectedDoctor?.clinics[0],
      clinicName: draft?.location,
    }));
  }, [selectedDoctor, hasMultipleClinics, draft?.doctor, draft?.specialty, draft?.location]);

  return (
    <div className="min-h-screen bg-background pb-28">
      <SubPageHeader title="Select a Slot" backPath={backPath} />
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
              key={`${slot.time}-${slot.clinicId || ''}`}
              onClick={() => {
                saveBookingDraft({
                  doctor: slot.doctor,
                  specialty: slot.specialty,
                  date: slot.date,
                  time: slot.time,
                  location: slot.clinicName,
                });
                setLocation("/booking/review");
              }}
              className="w-full bg-white p-4 rounded-2xl border border-slate-100 text-left"
            >
              <div className="font-bold text-slate-900">{slot.time}</div>
              {hasMultipleClinics && slot.clinicName && (
                <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                  <MapPin size={12} />
                  {slot.clinicName}
                </div>
              )}
              <div className="text-sm text-slate-500 mt-1">
                {slot.date}
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
