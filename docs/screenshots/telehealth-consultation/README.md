# Telehealth Consultation Flow

## Summary

Schedule Type → Symptoms (3 steps) → Review → Confirmation → Waiting Room → Video Call → Summary → Home

## Steps

1. `TH-001` | Telehealth Schedule Type — Choose schedule type or appointment timing.
   - Route(s): /telehealth/schedule-type

2. `TH-002` | Symptoms Selection — Symptom intake step 1: main concern selection.
   - Route(s): /telehealth/symptoms-intro

3. `TH-003` | Symptoms Duration & Severity — Symptom intake step 2: detail collection.
   - Route(s): /telehealth/symptoms-details

4. `TH-004` | Additional Information — Symptom intake step 3: health info and submission.
   - Route(s): /telehealth/symptoms-info

5. `TH-005` | Consultation Review — Review telehealth request before confirming.
   - Route(s): /telehealth/review

6. `TH-006` | Consultation Scheduled — Confirmation with appointment details and join CTA.
   - Route(s): /telehealth/confirmation

7. `TH-007` | Waiting Room — Waiting room status and prep before call.
   - Route(s): /telehealth/waiting-room

8. `TH-008` | Video Call — Live telehealth video call screen.
   - Route(s): /telehealth/call

9. `TH-009` | Consultation Summary — Post-call summary and recommendations.
   - Route(s): /telehealth/summary
