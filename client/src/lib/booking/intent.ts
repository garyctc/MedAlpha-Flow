import type { Appointment } from "@/types/storage";
import { clearBookingDraft, saveBookingDraft } from "@/lib/storage";

export function seedBookAgainDraft(apt: Appointment) {
  clearBookingDraft();
  saveBookingDraft({
    intent: "book-again",
    entryMode: "specialty",
    type: apt.type,
    specialty: apt.specialty,
    location: apt.clinic,
    doctor: apt.doctor,
  });
}

export function seedRescheduleDraft(apt: Appointment) {
  clearBookingDraft();
  saveBookingDraft({
    intent: "reschedule",
    rescheduleId: apt.id,
    type: apt.type,
    specialty: apt.specialty,
    location: apt.clinic,
    doctor: apt.doctor,
  });
}
