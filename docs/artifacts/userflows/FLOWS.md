# FLOWS

Canonical rules: `docs/artifacts/visual-artifacts-rules.md`

**Created:** 2026-01-21
**Last Updated:** 2026-01-22 (video consultation hidden for v1)  
**Source of Truth:** `client/src/App.tsx` routes, plus in-page navigation via `useLocation()` and `<Link />`  

Exception: this is Mermaid navigation flows for the client app. Not D2 user flows.

Primary IA map: `docs/artifacts/ia-map/IA.md`.

## Registration Flow

```mermaid
graph TD
  %% Class palette (domain colors)
  classDef auth fill:#E0F2FE,stroke:#0284C7,color:#0C4A6E;
  classDef hub fill:#EEF2FF,stroke:#6366F1,color:#312E81;
  classDef booking fill:#F3E8FF,stroke:#A855F7,color:#581C87;

  subgraph REG[Registration]
    reg-account["SCR-010 Register. Account"]
    reg-verify-email["SCR-011 Register. Verify Email"]
    reg-personal-info["SCR-012 Register. Personal Info"]
    reg-insurance-type["SCR-013 Register. Insurance Type"]
    reg-gkv-details["SCR-014 Register. GKV Details"]
    reg-pkv-details["SCR-015 Register. PKV Details"]
    reg-complete["SCR-016 Register. Complete"]
  end

  subgraph EXIT[Post-Registration]
    hub-home["SCR-003 Home"]
    booking-specialty["SCR-021 Booking. Specialty"]
  end

  reg-account ==> reg-verify-email ==> reg-personal-info ==> reg-insurance-type
  reg-insurance-type ==> reg-gkv-details ==> reg-complete
  reg-insurance-type ==> reg-pkv-details ==> reg-complete
  reg-verify-email -.-> reg-account

  reg-complete ==> hub-home
  reg-complete -.-> booking-specialty

  class reg-account,reg-verify-email,reg-personal-info,reg-insurance-type,reg-gkv-details,reg-pkv-details,reg-complete auth;
  class hub-home hub;
  class booking-specialty booking;
```

## Booking Flow (In-Person)

**Note:** Type selection (SCR-020) is skipped in v1. Users go directly to specialty selection with `type: 'in-person'` pre-set.

```mermaid
graph TD
  %% Class palette (domain colors)
  classDef appt fill:#DBEAFE,stroke:#2563EB,color:#1E3A8A;
  classDef booking fill:#F3E8FF,stroke:#A855F7,color:#581C87;

  subgraph BOOKING[Booking - v1 starts here]
    booking-specialty["SCR-021 Booking. Specialty Select"]
    booking-location["SCR-022 Booking. Location Select"]
    booking-doctors["SCR-023 Booking. Doctor Select"]
    booking-calendar["SCR-024 Booking. Calendar"]
    booking-review["SCR-025 Booking. Review"]
  end

  subgraph CURAAY[Curaay Integration]
    booking-curaay-processing["SCR-026 Booking. Curaay Processing"]
    booking-curaay-refinement["SCR-027 Booking. Curaay Refinement"]
    booking-curaay-success["SCR-028 Booking. Curaay Success"]
  end

  subgraph EXIT[Exit]
    appt-list["SCR-080 Appointments"]
    booking-success["SCR-029 Booking. Success (unused in-app)"]
  end

  booking-specialty ==> booking-location ==> booking-doctors ==> booking-calendar ==> booking-review
  booking-review ==> booking-curaay-processing ==> booking-curaay-success ==> appt-list
  booking-curaay-processing -.-> booking-curaay-refinement
  booking-curaay-refinement -.-> booking-curaay-processing
  booking-curaay-refinement -.-> booking-review
  booking-curaay-processing -.-> booking-review

  booking-review -.-> booking-success

  class booking-specialty,booking-location,booking-doctors,booking-calendar,booking-review booking;
  class booking-curaay-processing,booking-curaay-refinement,booking-curaay-success booking;
  class appt-list appt;
  class booking-success booking;
```

---

## v2+ Roadmap (Hidden for v1)

### Video Consultation Flows (Hidden via `videoConsultationEnabled: false`)

**Booking Type Selection** (SCR-020) - Skipped in v1, only in-person available
**Teleclinic Flow** (SCR-030) - Video partner integration
**Telehealth Flow** (SCR-040-048) - In-app video consultation

<details>
<summary>Teleclinic Flow (Video Partner)</summary>

```mermaid
graph TD
  %% Class palette (domain colors)
  classDef appt fill:#DBEAFE,stroke:#2563EB,color:#1E3A8A;
  classDef booking fill:#F3E8FF,stroke:#A855F7,color:#581C87;
  classDef teleclinic fill:#FCE7F3,stroke:#DB2777,color:#831843;

  teleclinic-simulated["SCR-030 Teleclinic. Simulated"]
  appt-list["SCR-080 Appointments"]
  booking-specialty["SCR-021 Booking. Specialty"]

  teleclinic-simulated ==> appt-list
  teleclinic-simulated -.-> booking-specialty

  class teleclinic-simulated teleclinic;
  class appt-list appt;
  class booking-specialty booking;
```
</details>

<details>
<summary>Telehealth Flow (In-App)</summary>

```mermaid
graph TD
  %% Class palette (domain colors)
  classDef hub fill:#EEF2FF,stroke:#6366F1,color:#312E81;
  classDef telehealth fill:#ECFEFF,stroke:#06B6D4,color:#155E75;

  subgraph TH[Telehealth]
    telehealth-schedule-type["SCR-040 Telehealth. Schedule Type"]
    telehealth-symptoms-intro["SCR-041 Telehealth. Symptoms Intro"]
    telehealth-symptoms-details["SCR-042 Telehealth. Symptoms Details"]
    telehealth-symptoms-info["SCR-043 Telehealth. Symptoms Info"]
    telehealth-review["SCR-044 Telehealth. Review"]
    telehealth-confirmation["SCR-045 Telehealth. Confirmation"]
    telehealth-waiting-room["SCR-046 Telehealth. Waiting Room"]
    telehealth-call["SCR-047 Telehealth. Call"]
    telehealth-summary["SCR-048 Telehealth. Summary"]
  end

  subgraph EXIT[Exit]
    hub-home["SCR-003 Home"]
  end

  telehealth-schedule-type ==> telehealth-symptoms-intro ==> telehealth-symptoms-details ==> telehealth-symptoms-info ==> telehealth-review ==> telehealth-confirmation
  telehealth-confirmation ==> telehealth-waiting-room ==> telehealth-call ==> telehealth-summary

  telehealth-summary ==> hub-home
  telehealth-summary -.-> telehealth-schedule-type
  telehealth-waiting-room -.-> hub-home

  class telehealth-schedule-type,telehealth-symptoms-intro,telehealth-symptoms-details,telehealth-symptoms-info,telehealth-review,telehealth-confirmation,telehealth-waiting-room,telehealth-call,telehealth-summary telehealth;
  class hub-home hub;
```
</details>

### Other v2+ Features

- **Prescriptions Flow** (SCR-050-065) - In-app RX management with GKV/PKV paths (hidden via `prescriptionEnabled: false`)
- **Pharmacy Search Flow** (SCR-070-072) - Location search & pharmacy details
