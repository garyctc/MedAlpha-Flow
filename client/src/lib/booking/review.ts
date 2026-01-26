import type { BookingDraft } from "@/types/storage";
import { buildRecurringAppointments } from "@/lib/booking/recurrence";

type DraftAppointment = { id: string; date: string; time: string };

export function buildDraftAppointmentSeries(
  draft: BookingDraft,
  baseId: string,
): DraftAppointment[] {
  if (!draft.date || !draft.time) return [];

  if (draft.recurring && draft.recurrenceCount && draft.recurrenceIntervalWeeks) {
    return buildRecurringAppointments(
      { id: baseId, date: draft.date, time: draft.time },
      draft.recurrenceCount,
      draft.recurrenceIntervalWeeks,
    );
  }

  return [{ id: baseId, date: draft.date, time: draft.time }];
}
