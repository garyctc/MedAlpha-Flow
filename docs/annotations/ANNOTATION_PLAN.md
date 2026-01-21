# Screen Annotation Plan

## Objective
Populate `docs/annotations/screen-annotations.json` with meaningful annotations for all 60 screens in MedAlpha Connect.

## Annotation Structure

For each screen, document:

| Field | Purpose | Writing Guide |
|-------|---------|---------------|
| `assumptions` | What must be true for this screen to work as designed | List conditions about user state, system state, data availability |
| `userScenario` | The story of who uses this and why | Write as: "[User type] wants to [goal] because [motivation]" |
| `pros` | Benefits of this design approach | Focus on UX wins, efficiency gains, user confidence |
| `cons` | Drawbacks or risks of this approach | Note friction points, edge cases, potential confusion |
| `impactIfWrong` | What happens if assumptions fail | Describe the user experience breakdown |

---

## Execution Order

Process screens by flow (not alphabetically) to maintain context:

### Phase 1: Authentication & Onboarding (9 screens)
```
AUTH-001  Splash
AUTH-002  Login
REG-001   Create Account
REG-002   Verify Email
REG-003   Personal Info
REG-004   Insurance Type
REG-005   GKV Details
REG-006   PKV Details
REG-007   Registration Complete
```

**Context to consider:**
- First-time vs returning users
- GKV vs PKV insurance paths diverge at REG-004
- Email verification is a potential drop-off point

### Phase 2: Home & Core Navigation (1 screen)
```
HOME-001  Home Dashboard
```

**Context to consider:**
- Entry point after login - what do users expect to see?
- Balance between information density and clarity
- Quick actions vs detailed navigation

### Phase 3: Booking Flow (10 screens)
```
BKG-001   Booking Type (In-Person vs Telemedicine)
BKG-002   Specialty Select
BKG-003   Location Select
BKG-004   Doctor Select
BKG-005   Calendar
BKG-006   Review Booking
BKG-007   Booking Success
BKG-008   Curaay Processing
BKG-009   Curaay Refinement
BKG-010   Curaay Success
```

**Context to consider:**
- Linear wizard vs ability to go back and change
- Curaay integration is a separate path from direct booking
- Location relevance for in-person vs telemedicine

### Phase 4: Prescription Flow (15 screens)
```
RX-001    Prescriptions List
RX-002    Redeem Start
RX-003    NFC Intro (GKV)
RX-004    NFC Scan
RX-005    GKV SMS Verify
RX-006    PKV Auth
RX-007    PKV Insurer Select
RX-008    PKV Redirect
RX-009    PKV Error
RX-010    Prescription Detail
RX-011    Prescription List Select
RX-012    Pharmacy Confirm
RX-013    Order Review
RX-014    Order Success
RX-015    Prescription Receipt
```

**Context to consider:**
- GKV flow (NFC + SMS) vs PKV flow (GesundheitsID) are completely different
- NFC scanning requires physical health card
- Error states are critical for PKV authentication failures

### Phase 5: Telehealth Flow (10 screens)
```
TH-001    Schedule Type
TH-002    Symptoms Intro (1/3)
TH-003    Symptoms Details (2/3)
TH-004    Symptoms Info (3/3)
TH-005    Telehealth Review
TH-006    Confirmation
TH-007    Waiting Room
TH-008    Video Call
TH-009    Telehealth Summary
TH-010    Teleclinic Simulated
```

**Context to consider:**
- Symptom collection is 3-step wizard
- Waiting room manages user expectations
- Video call has technical requirements (camera, mic, connection)
- Teleclinic is third-party integration

### Phase 6: Pharmacy Search (3 screens)
```
PHR-001   Pharmacy Map
PHR-002   Pharmacy List
PHR-003   Pharmacy Detail
```

**Context to consider:**
- Location services required for map
- Map vs list view preferences
- Integration with prescription redemption flow

### Phase 7: Appointments & History (3 screens)
```
APT-001   Appointments List
APT-002   Appointment Detail
HIST-001  History
```

**Context to consider:**
- Upcoming vs past appointments
- Actionable items (reschedule, cancel) vs read-only history

### Phase 8: Profile & Settings (8 screens)
```
PRF-001   Profile
PRF-002   Edit Profile
PRF-003   Linked Accounts
PRF-004   Insurance Info GKV
PRF-005   Insurance Info PKV
PRF-006   Language Selection
PRF-007   Help & Support
PRF-008   Privacy & Legal
```

**Context to consider:**
- Which fields are editable vs locked
- Insurance info differs by type
- Support escalation paths

### Phase 9: SSO & Static (7 screens)
```
SSO-001   SSO Loading
SSO-002   Complete Profile
STATIC-001  FAQ
STATIC-002  Support
STATIC-003  Privacy Policy
STATIC-004  Legal Disclosure
ERR-001   404 Not Found
```

**Context to consider:**
- SSO comes from partner apps (dm, PAYBACK)
- Static pages are informational, low interaction
- Error state should provide recovery path

---

## Writing Guidelines

### For Assumptions
Ask yourself:
- What data must exist before this screen loads?
- What user state is required (logged in, insurance selected, etc.)?
- What device capabilities are needed (NFC, camera, location)?
- What external services must be available?

**Example (NFC Scan screen):**
```json
"assumptions": [
  "User has a smartphone with NFC capability",
  "User has their physical GKV health card present",
  "NFC is enabled on the device",
  "User understands what NFC scanning means"
]
```

### For User Scenario
Write a brief narrative (2-3 sentences):

**Example:**
```json
"userScenario": "A GKV-insured patient has received an e-prescription from their doctor and wants to redeem it at an online pharmacy. They need to verify their identity using their health card's NFC chip before accessing their prescriptions."
```

### For Pros
Focus on user benefits:

**Example:**
```json
"pros": [
  "NFC verification is faster than manual entry",
  "Reduces fraud by requiring physical card presence",
  "Familiar pattern for users who use contactless payments"
]
```

### For Cons
Be honest about friction:

**Example:**
```json
"cons": [
  "Requires user to have card physically present",
  "NFC positioning can be frustrating on some devices",
  "No fallback if NFC fails or is unavailable"
]
```

### For Impact if Wrong
Describe the failure scenario:

**Example:**
```json
"impactIfWrong": "If the user doesn't have their health card or their phone lacks NFC, they cannot complete the verification and are blocked from accessing their prescriptions. This creates frustration and may require them to visit a physical pharmacy instead."
```

---

## Execution Instructions

1. Read through the existing screen implementation to understand what each screen does
2. Reference the sitemap at `docs/sitemap/medalpha-sitemap.md` for component lists per screen
3. Write annotations for one phase at a time
4. After each phase, validate the JSON is still valid
5. Test in the app by navigating to screens and checking the annotation panel

---

## File Location
Update: `docs/annotations/screen-annotations.json`

## Validation Command
```bash
cat docs/annotations/screen-annotations.json | python3 -m json.tool > /dev/null && echo "Valid JSON"
```

---

## Notes for Executor

- Read each screen's source code before writing its annotation
- Screen files are in `client/src/pages/[flow]/[screen].tsx`
- Keep annotations concise - this is for quick reference during demos
- Use German healthcare context (GKV = public insurance, PKV = private insurance)
- The goal is to capture design rationale, not implementation details
