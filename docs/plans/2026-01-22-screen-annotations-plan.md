# Plan: Fill All Screen Annotations

## Goal
Populate all 60 screens in `docs/annotations/screen-annotations.json` with design rationale at **moderate detail level** (2-4 bullets per field).

## Context
- Annotations explain the "why" behind each screen's design
- Stakeholders will read these alongside the prototype
- Source docs: `docs/requirements/` and `docs/task-flow/german-healthcare-journeys.md`

---

## Execution Approach

### For each screen, I will:
1. Read the screen's implementation in `client/src/pages/`
2. Cross-reference requirements docs for design intent
3. Write 5 annotation fields at moderate detail:
   - **assumptions** (2-4 bullets): What must be true for this screen to work
   - **userScenario** (2-3 sentences): Who uses it and why (JTBD framing)
   - **pros** (2-4 bullets): UX benefits of this design
   - **cons** (2-4 bullets): Honest friction points or limitations
   - **impactIfWrong** (1-2 sentences): What breaks if assumptions fail

---

## Phases (9 total, 60 screens)

| Phase | Screens | Focus |
|-------|---------|-------|
| 1. Auth & Onboarding | AUTH-001 to REG-007 (9) | First-time vs returning, GKV/PKV split |
| 2. Home | HOME-001 (1) | Entry point, feature discovery |
| 3. Booking | BKG-001 to BKG-010 (10) | Direct booking vs Smart Match paths |
| 4. Prescriptions | RX-001 to RX-015 (15) | GKV (NFC) vs PKV (GesundheitsID) flows |
| 5. Telehealth | TH-001 to TH-010 (10) | Symptom wizard, video call, Teleclinic |
| 6. Pharmacy | PHR-001 to PHR-003 (3) | Map/list views, location services |
| 7. Appointments | APT-001 to HIST-001 (3) | Upcoming vs history |
| 8. Profile | PRF-001 to PRF-008 (8) | Settings, insurance info, linked accounts |
| 9. SSO & Static | SSO-001 to ERR-001 (7) | Partner handoff, legal pages, errors |

---

## Output
Single updated JSON file: `docs/annotations/screen-annotations.json`

---

## Review Process
After I complete all annotations:
1. Walk through each phase together
2. You correct anything that doesn't match your original thinking
3. I update the JSON based on feedback

---

## Verification
- Run JSON validation: `cat docs/annotations/screen-annotations.json | python3 -m json.tool > /dev/null`
- Test in app: Navigate to screens and check annotation panel displays correctly
