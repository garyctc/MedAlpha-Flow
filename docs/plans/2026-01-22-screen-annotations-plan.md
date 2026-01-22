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
3. Write 5 annotation fields following the guidelines below

---

## Writing Guidelines

### Voice & Principles
- **Confident, direct statements** — no hedging ("We believe...", "Perhaps...")
- **Present tense** — "Users expect..." not "Users will expect..."
- **UX language** — avoid technical jargon
- Every field answers "why this design?" not "what does it do?"

### Field-by-Field Instructions

**assumptions** (2-4 bullets)
Three types of assumptions to consider:
- **User behavior**: "Users know/expect/have done [X]"
- **Business/product**: From requirements — integrations, legal requirements, partner expectations
- **System/context**: What must exist technically for this screen to work

Example patterns:
- "Users understand the GKV/PKV distinction"
- "Smart Match API returns real-time availability"
- "Profile is already completed (required for main features)"
- "Legal: User must choose online vs offline pharmacy before redemption"

**userScenario** (1-2 sentences)
- JTBD format: "When I [situation], I want to [action], so I can [outcome]"

**pros** (2-4 bullets)
- Start with action verbs: "Reduces...", "Eliminates...", "Surfaces..."
- Focus on UX benefits: speed, clarity, confidence, reduced errors

**cons** (2-4 bullets)
- Frame as trade-offs: "Adds [friction] but [reason]"
- Or state limitations: "Requires [X] which not all users have"

**impactIfWrong** (1-2 sentences)
- Format: "If [assumption] is false → [design change needed]"
- Focus on what would need to change, not just what breaks

---

## Example: REG-003 — Insurance Type Selection

```json
{
  "REG-003": {
    "title": "Insurance Type Selection",
    "assumptions": [
      "Users can identify whether they have public (GKV) or private (PKV) insurance",
      "Users have their insurance card accessible to check if unsure",
      "GKV users have NFC-enabled Gesundheitskarte; PKV users have GesundheitsID",
      "Insurance type determines the entire downstream prescription redemption flow"
    ],
    "userScenario": "When I'm setting up my account, I want to specify my insurance type, so I can access the correct prescription redemption flow later.",
    "pros": [
      "Reduces confusion by explaining the practical difference (NFC card vs GesundheitsID)",
      "Provides familiar examples (TK, AOK, Allianz) so users can pattern-match",
      "Expandable 'Not sure?' helper prevents users from guessing incorrectly",
      "Visual card design makes abstract insurance concepts concrete"
    ],
    "cons": [
      "Adds a mandatory step even though most users know their insurance type",
      "Users with dual coverage (e.g., supplemental private) may be unsure which to pick",
      "Helper text relies on user having physical card nearby"
    ],
    "impactIfWrong": "If users don't understand GKV vs PKV, they'll select incorrectly and face a broken prescription flow — would need to add a 'change insurance type' option in profile settings, or detect mismatch during first prescription attempt."
  }
}
```

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
