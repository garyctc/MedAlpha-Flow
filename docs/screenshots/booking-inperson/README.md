# In-Person Booking Flow

## Steps

1. `BKG-001` | Booking Type Selection — Choose appointment type (in-person vs telemedicine/teleclinic).
   - Route(s): /booking, /booking/type

2. `BKG-002` | Specialty Selection — Select medical specialty for the appointment.
   - Route(s): /booking/specialty

3. `BKG-003` | Location Selection — Choose location or clinic area for the visit.
   - Route(s): /booking/location

4. `BKG-004` | Doctor Selection — Select a doctor based on availability and rating.
   - Route(s): /booking/doctors

5. `BKG-005` | Date & Time Selection — Pick date and time slot from the calendar.
   - Route(s): /booking/calendar

6. `BKG-006` | Booking Review — Review appointment details before confirming.
   - Route(s): /booking/review

7. `BKG-007` | Booking Confirmation — Booking confirmation and summary details.
   - Route(s): /booking/success

8. `BKG-008` | Smart Match Processing — Smart Match processing step while the system finds a provider.
   - Route(s): /booking/smart-match-processing

9. `BKG-009` | Smart Match Refinement — Smart Match refinement questions to improve matching.
   - Route(s): /booking/smart-match-refinement

10. `BKG-010` | Smart Match Confirmation — Smart Match success confirmation with assigned appointment.
   - Route(s): /booking/smart-match-success
