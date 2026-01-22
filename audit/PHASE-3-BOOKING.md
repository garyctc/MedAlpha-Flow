# Phase 3: Booking Flow

**Goal:** Make the entire booking wizard work end-to-end with data persistence and proper state handling.

**Depends on:** Phase 1 (Foundation), Phase 2 (Auth)

---

## BKG-001: Booking Type Selection

**File:** `client/src/pages/booking/type.tsx`

**Fixes:**
- [ ] Clear previous booking draft on entry: `clearBookingDraft()`
- [ ] Save selection to draft: `saveBookingDraft({ type: 'in-person' | 'video' })`
- [ ] Navigate to next step

---

## BKG-002: Specialty Selection

**File:** `client/src/pages/booking/specialty.tsx`

**Fixes:**
- [ ] Load current draft on mount to pre-select if returning
- [ ] Save selection: `saveBookingDraft({ ...draft, specialty })`
- [ ] Handle back navigation (selection preserved in draft)

---

## BKG-003: Location Selection

**File:** `client/src/pages/booking/location.tsx`

**Fixes:**
- [ ] Add simulated loading state (500ms) - "Finding nearby locations..."
- [ ] Load draft to pre-select if returning
- [ ] Save selection: `saveBookingDraft({ ...draft, location })`

---

## BKG-004: Doctor Selection

**File:** `client/src/pages/booking/doctors.tsx`

**Current Issues:**
- Hardcoded doctor array (line 9-34)
- Filter buttons set state but don't filter (line 58-68)
- Fake 1500ms loading already exists (line 42-45)

**Fixes:**

1. **Move doctor data** to constants or storage:
```typescript
// client/src/lib/constants/doctors.ts
export const DOCTORS = [
  { id: '1', name: 'Dr. Sarah Schmidt', specialty: 'General Practice', ... },
  // ...
];
```

2. **Wire filter buttons:**
```tsx
const [filter, setFilter] = useState<'all' | 'available' | 'top-rated'>('all');

const filteredDoctors = useMemo(() => {
  switch (filter) {
    case 'available': return DOCTORS.filter(d => d.availableToday);
    case 'top-rated': return DOCTORS.filter(d => d.rating >= 4.5);
    default: return DOCTORS;
  }
}, [filter]);
```

3. **Empty state for filters:**
- [ ] Show "No doctors match this filter" when `filteredDoctors.length === 0`

4. **Save selection:**
- [ ] `saveBookingDraft({ ...draft, doctor: selectedDoctor.name, doctorId: selectedDoctor.id })`

**Acceptance:**
- [ ] Filter buttons actually filter the list
- [ ] Empty state shows when no matches
- [ ] Selected doctor saved to draft

---

## BKG-005: Calendar & Time Selection

**File:** `client/src/pages/booking/calendar.tsx`

**Current Issues:**
- Allows selecting past dates
- Hardcoded time slots (line 14-15)
- No availability indicators

**Fixes:**

1. **Disable past dates:**
```tsx
const isDateDisabled = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};
```

2. **Highlight today:**
- [ ] Add visual indicator for current date

3. **Dynamic time slots based on date:**
```tsx
const getTimeSlotsForDate = (date: Date): string[] => {
  const day = date.getDay();
  // Weekends have fewer slots
  if (day === 0 || day === 6) {
    return ['09:00', '10:00', '11:00'];
  }
  // Some days are "busy" (mock)
  if (day === 1 || day === 3) {
    return ['14:00', '15:30', '16:00'];
  }
  // Normal days
  return ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
};
```

4. **Show "no slots" state:**
- [ ] If `getTimeSlotsForDate()` returns empty, show "No appointments available on this date"

5. **Save selection:**
- [ ] `saveBookingDraft({ ...draft, date: selectedDate.toISOString(), time: selectedSlot })`

**Acceptance:**
- [ ] Cannot select past dates (visually disabled)
- [ ] Today is highlighted
- [ ] Different dates show different available slots
- [ ] Some dates show "no availability" message
- [ ] Date and time saved to draft

---

## BKG-006: Review Booking

**File:** `client/src/pages/booking/review.tsx`

**Current Issues:**
- Edit buttons have no onClick (line 37, 51, 72)
- Hardcoded fallbacks (line 34-35, 48-49, 15-16)

**Fixes:**

1. **Load all data from draft:**
```tsx
const draft = getBookingDraft();
if (!draft?.doctor || !draft?.date || !draft?.time) {
  // Redirect to start if incomplete
  navigate('/booking/type');
  return null;
}
```

2. **Wire edit buttons:**
```tsx
<Button onClick={() => navigate('/booking/doctors')}>Edit</Button>  // Doctor
<Button onClick={() => navigate('/booking/calendar')}>Edit</Button> // Date/Time
<Button onClick={() => navigate('/booking/location')}>Edit</Button> // Location
```

3. **Confirm button:**
- [ ] Show loading state while "confirming"
- [ ] Create appointment in storage
- [ ] Clear booking draft
- [ ] Show success toast
- [ ] Navigate to success page

**Acceptance:**
- [ ] All booking details come from draft (no hardcoded fallbacks visible)
- [ ] Edit buttons navigate to correct step
- [ ] Returning from edit preserves other selections
- [ ] Confirm creates appointment in localStorage

---

## BKG-007: Booking Success

**File:** `client/src/pages/booking/success.tsx` (or similar)

**Fixes:**
- [ ] Display confirmation details from the just-created appointment
- [ ] "View Appointments" button navigates to `/appointments`
- [ ] "Book Another" clears draft and goes to `/booking/type`

---

## BKG-008 to BKG-010: Smart Match Flow

**Files:**
- `client/src/pages/booking/smart-match-intro.tsx`
- `client/src/pages/booking/smart-match-processing.tsx`
- `client/src/pages/booking/smart-match-result.tsx`

**Fixes:**

1. **Processing page:**
- [ ] Keep the simulation animation
- [ ] On complete, create appointment in localStorage with auto-matched details
- [ ] Save result to draft for display on result page

2. **Result page:**
- [ ] Load matched appointment details
- [ ] "Accept" confirms and navigates to appointments
- [ ] "Try Again" or "Refine" allows re-matching with different preferences

**Acceptance:**
- [ ] Smart Match creates a real appointment in storage
- [ ] Appointment appears in appointments list after matching

---

## Verification Checklist

After completing Phase 3:

- [ ] Start booking → navigate away → return → draft cleared (fresh start)
- [ ] Complete steps 1-3 → navigate away → return → can continue from step 4
- [ ] All selections persist through the wizard
- [ ] Calendar disables past dates
- [ ] Different dates show different time slots
- [ ] Edit buttons on review page work
- [ ] Confirming booking creates appointment in localStorage
- [ ] New appointment appears in appointments list
- [ ] Smart Match creates real appointment

---

## Files Modified

- `client/src/pages/booking/type.tsx`
- `client/src/pages/booking/specialty.tsx`
- `client/src/pages/booking/location.tsx`
- `client/src/pages/booking/doctors.tsx`
- `client/src/pages/booking/calendar.tsx`
- `client/src/pages/booking/review.tsx`
- `client/src/pages/booking/success.tsx`
- `client/src/pages/booking/smart-match-*.tsx`

**New files:**
- `client/src/lib/constants/doctors.ts`
