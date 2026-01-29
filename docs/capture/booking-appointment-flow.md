# Appointment Booking Flow (MedAlpha)

## Scope
This captures the in-app appointment booking journeys that start at `/booking/entry` (in-person only). Telehealth consultation scheduling is a separate flow and is not included here.

## Out of Scope (Hard Rule)
- **Teleclinic is out of scope. Do not reference or include Teleclinic routes, screens, or handoff steps in this document.**

## Primary Entry Points
- Home CTA → `/booking/entry` (in-person entry chooser)
- Appointments FAB → `/booking/entry`
- Appointment detail actions (Book Again / Reschedule) → `/booking/slots` (skips early steps via seeded draft)

## In-Person Booking Flow (Core Path)
**Entry chooser**
- **Screen ID:** `BKG-011`
- **Route:** `/booking/entry`
- **Choices:**
  - **Find a doctor fast** → `/booking/slots` (time windows)
  - **By Specialty** → `/booking/specialty`
  - **By Doctor** → `/booking/doctors`

### Path A: Specialty → Location → Doctor → Slot → Review → Request Sent
1. **Specialty Selection** (`BKG-002`) — `/booking/specialty`
2. **Location Permission Explainer** — `/booking/location-permission` (first visit only)
3. **Location Selection** (`BKG-003`) — `/booking/location`
4. **Doctor Selection** (`BKG-004`) — `/booking/doctors` (optionally filtered by `?location=`)
5. **Date & Time + Time Window Selection** (`BKG-005`) — `/booking/slots`
6. **Review Request** (`BKG-006`) — `/booking/review`
7. **Request Appointment** (action) — proceeds into Smart Match
8. **Smart Match Processing** (`BKG-008`) — `/booking/smart-match-processing`
9. **Smart Match Refinement** (`BKG-009`) — `/booking/smart-match-refinement` (only on retry)
10. **Smart Match Success** (`BKG-010`) — `/booking/smart-match-success`
11. **Request Sent** (`BKG-007`) — `/booking/success`

### Path B: Doctor → Slot → Review → Request Sent
1. **Doctor Selection** (`BKG-004`) — `/booking/doctors`
2. **Date & Time + Time Window Selection** (`BKG-005`) — `/booking/slots`
3. **Review Request** (`BKG-006`) — `/booking/review`
4. **Request Appointment** (action) — proceeds into Smart Match
5. **Smart Match Processing** (`BKG-008`) — `/booking/smart-match-processing`
6. **Smart Match Refinement** (`BKG-009`) — `/booking/smart-match-refinement` (only on retry)
7. **Smart Match Success** (`BKG-010`) — `/booking/smart-match-success`
8. **Request Sent** (`BKG-007`) — `/booking/success`

### Path C: Find a Doctor Fast → Slot → Review → Request Sent
1. **Find a doctor fast** (`BKG-011`) — `/booking/entry`
2. **Date & Time + Time Window Selection** (`BKG-005`) — `/booking/slots`
3. **Review Request** (`BKG-006`) — `/booking/review`
4. **Request Appointment** (action) — proceeds into Smart Match
5. **Smart Match Processing** (`BKG-008`) — `/booking/smart-match-processing`
6. **Smart Match Refinement** (`BKG-009`) — `/booking/smart-match-refinement` (only on retry)
7. **Smart Match Success** (`BKG-010`) — `/booking/smart-match-success`
8. **Request Sent** (`BKG-007`) — `/booking/success`

## Smart Match Branch (Required)
**Note:** Smart Match is required after requesting the appointment and before the Request Sent screen. The current prototype on port 5000 is missing these Smart Match steps.

1. **Processing** (`BKG-008`) — `/booking/smart-match-processing`
2. **Refinement** (`BKG-009`) — `/booking/smart-match-refinement` (only on retry)
3. **Success** (`BKG-010`) — `/booking/smart-match-success`
4. **Request Sent** (`BKG-007`) — `/booking/success`

## Rebook / Reschedule Shortcut
- **Entry:** `/appointments` list or `/appointments/:id`
- **Action:** Book Again / Reschedule
- **Route:** `/booking/slots` (draft is pre-seeded with prior appointment data)
- **Continuation:** `/booking/review` → `/booking/smart-match-processing` → `/booking/success`

## Flow Visualization
**D2 source:** `artifacts/userflow-inventory/booking-appointment.d2`

```text
Start
  -> BKG-011 | Booking Entry
     -> Choose Specialty
        -> BKG-002 | Specialty Select
        -> BKG-003 | Location Select
        -> BKG-004 | Doctor Select
        -> BKG-005 | Calendar
        -> BKG-006 | Review Request
        -> BKG-008 | Smart Match Processing
        -> BKG-009 | Smart Match Refinement (if needed)
        -> BKG-010 | Smart Match Success
        -> BKG-007 | Request Sent
        -> End

     -> Choose Doctor
        -> BKG-004 | Doctor Select
        -> BKG-005 | Calendar
        -> BKG-006 | Review Request
        -> BKG-008 | Smart Match Processing
        -> BKG-009 | Smart Match Refinement (if needed)
        -> BKG-010 | Smart Match Success
        -> BKG-007 | Request Sent
        -> End

     -> Find a doctor fast
        -> BKG-005 | Calendar
        -> BKG-006 | Review Request
        -> BKG-008 | Smart Match Processing
        -> BKG-009 | Smart Match Refinement (if needed)
        -> BKG-010 | Smart Match Success
        -> BKG-007 | Request Sent
        -> End
```

## Notes / Mismatches
- Documentation references `/booking/calendar` for `BKG-005`, but the app route is `/booking/slots` with time windows.
- Screen ID mapping includes `/booking/entry` as `BKG-011` even though it is not listed in the booking flow README.
- Prototype (port 5000) currently skips Smart Match screens between Review and Request Sent.
- Location permission explainer (`/booking/location-permission`) appears before location selection on first visit.

## Source References
- Flow docs: `docs/screenshots/APP-FLOWS.md`, `docs/screenshots/booking-inperson/README.md`
- Routes & screens: `client/src/App.tsx`, `client/src/components/annotations/AnnotationPanel.tsx`
- Entry points: `client/src/pages/home.tsx`, `client/src/pages/appointments/index.tsx`, `client/src/pages/appointments/detail.tsx`
