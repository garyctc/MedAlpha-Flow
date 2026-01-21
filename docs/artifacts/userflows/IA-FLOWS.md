# IA-FLOWS (Mermaid. Exception)

Canonical rules: `docs/artifacts/visual-artifacts-rules.md`

**Created:** 2026-01-21  
**Last Updated:** 2026-01-21  
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
    booking-type["SCR-020 Booking. Type"]
  end

  reg-account ==> reg-verify-email ==> reg-personal-info ==> reg-insurance-type
  reg-insurance-type ==> reg-gkv-details ==> reg-complete
  reg-insurance-type ==> reg-pkv-details ==> reg-complete
  reg-verify-email -.-> reg-account

  reg-complete ==> hub-home
  reg-complete -.-> booking-type

  class reg-account,reg-verify-email,reg-personal-info,reg-insurance-type,reg-gkv-details,reg-pkv-details,reg-complete auth;
  class hub-home hub;
  class booking-type booking;
```

## Booking Flow (In-Person)

```mermaid
graph TD
  %% Class palette (domain colors)
  classDef appt fill:#DBEAFE,stroke:#2563EB,color:#1E3A8A;
  classDef booking fill:#F3E8FF,stroke:#A855F7,color:#581C87;

  subgraph BOOKING[Booking]
    booking-type["SCR-020 Booking. Type"]
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

  booking-type ==> booking-specialty ==> booking-location ==> booking-doctors ==> booking-calendar ==> booking-review
  booking-review ==> booking-curaay-processing ==> booking-curaay-success ==> appt-list
  booking-curaay-processing -.-> booking-curaay-refinement
  booking-curaay-refinement -.-> booking-curaay-processing
  booking-curaay-refinement -.-> booking-review
  booking-curaay-processing -.-> booking-review

  booking-review -.-> booking-success

  class booking-type,booking-specialty,booking-location,booking-doctors,booking-calendar,booking-review booking;
  class booking-curaay-processing,booking-curaay-refinement,booking-curaay-success booking;
  class appt-list appt;
  class booking-success booking;
```

## Teleclinic Flow (Video Partner)

```mermaid
graph TD
  %% Class palette (domain colors)
  classDef appt fill:#DBEAFE,stroke:#2563EB,color:#1E3A8A;
  classDef booking fill:#F3E8FF,stroke:#A855F7,color:#581C87;
  classDef teleclinic fill:#FCE7F3,stroke:#DB2777,color:#831843;

  teleclinic-simulated["SCR-030 Teleclinic. Simulated"]
  appt-list["SCR-080 Appointments"]
  booking-type["SCR-020 Booking. Type"]

  teleclinic-simulated ==> appt-list
  teleclinic-simulated -.-> booking-type

  class teleclinic-simulated teleclinic;
  class appt-list appt;
  class booking-type booking;
```

## Telehealth Flow (In-App)

```mermaid
graph TD
  %% Class palette (domain colors)
  classDef hub fill:#EEF2FF,stroke:#6366F1,color:#312E81;
  classDef booking fill:#F3E8FF,stroke:#A855F7,color:#581C87;
  classDef telehealth fill:#ECFEFF,stroke:#06B6D4,color:#155E75;
  classDef rx fill:#ECFDF5,stroke:#10B981,color:#065F46;

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

  subgraph LINKS[Cross-Links]
    hub-home["SCR-003 Home"]
    booking-calendar["SCR-024 Booking. Calendar"]
    rx-detail["SCR-061 Prescriptions. Detail"]
  end

  telehealth-schedule-type ==> telehealth-symptoms-intro ==> telehealth-symptoms-details ==> telehealth-symptoms-info ==> telehealth-review ==> telehealth-confirmation
  telehealth-confirmation ==> telehealth-waiting-room ==> telehealth-call ==> telehealth-summary

  telehealth-summary ==> hub-home
  telehealth-summary -.-> telehealth-schedule-type
  telehealth-summary -.-> rx-detail

  telehealth-schedule-type -.-> booking-calendar
  telehealth-waiting-room -.-> hub-home

  class telehealth-schedule-type,telehealth-symptoms-intro,telehealth-symptoms-details,telehealth-symptoms-info,telehealth-review,telehealth-confirmation,telehealth-waiting-room,telehealth-call,telehealth-summary telehealth;
  class hub-home hub;
  class booking-calendar booking;
  class rx-detail rx;
```

## Prescriptions Flow

```mermaid
graph TD
  %% Class palette (domain colors)
  classDef system fill:#F1F5F9,stroke:#64748B,color:#0F172A;
  classDef hub fill:#EEF2FF,stroke:#6366F1,color:#312E81;
  classDef rx fill:#ECFDF5,stroke:#10B981,color:#065F46;
  classDef pharmacy fill:#F0FDFA,stroke:#14B8A6,color:#134E4A;

  subgraph RX[Prescriptions]
    rx-hub["SCR-050 Prescriptions. Hub"]
    rx-redeem["SCR-051 Prescriptions. Redeem QR (unused in-app)"]
    rx-redeem-start["SCR-052 Prescriptions. New Prescription"]
    rx-list["SCR-060 Prescriptions. List"]
    rx-detail["SCR-061 Prescriptions. Detail"]
    rx-pharmacy-confirm["SCR-062 Prescriptions. Pharmacy Confirm"]
    rx-order-review["SCR-063 Prescriptions. Order Review"]
    rx-order-success["SCR-064 Prescriptions. Order Success"]
    rx-receipt["SCR-065 Prescriptions. Reimbursement Receipt"]
  end

  subgraph GKV[GKV]
    rx-nfc-intro["SCR-053 Prescriptions. NFC Intro (GKV)"]
    rx-nfc-scan["SCR-054 Prescriptions. NFC Scan (GKV)"]
    rx-gkv-sms-verify["SCR-055 Prescriptions. GKV SMS Verify"]
  end

  subgraph PKV[PKV]
    rx-pkv-auth["SCR-056 Prescriptions. PKV Auth"]
    rx-pkv-insurer-select["SCR-057 Prescriptions. PKV Insurer Select"]
    rx-pkv-redirect["SCR-058 Prescriptions. PKV Redirect"]
    rx-pkv-error["SCR-059 Prescriptions. PKV Error"]
  end

  subgraph LINKS[Cross-Links]
    pharmacy-map["SCR-070 Pharmacy. Map"]
    hub-home["SCR-003 Home"]
    history["SCR-090 History"]
  end

  rx-hub ==> rx-redeem-start
  rx-hub ==> rx-detail
  rx-hub -.-> rx-redeem

  rx-redeem-start ==> rx-nfc-intro ==> rx-nfc-scan ==> rx-gkv-sms-verify ==> rx-list
  rx-redeem-start ==> rx-pkv-auth ==> rx-pkv-insurer-select ==> rx-pkv-redirect ==> rx-list
  rx-pkv-redirect -.-> rx-pkv-error
  rx-pkv-error ==> rx-pkv-auth

  rx-list ==> rx-detail ==> rx-pharmacy-confirm ==> rx-order-review ==> rx-order-success ==> rx-receipt
  rx-order-success ==> hub-home
  rx-receipt -.-> history

  rx-redeem-start ==> pharmacy-map
  rx-pkv-error ==> pharmacy-map

  class rx-hub,rx-redeem,rx-redeem-start,rx-nfc-intro,rx-nfc-scan,rx-gkv-sms-verify,rx-pkv-auth,rx-pkv-insurer-select,rx-pkv-redirect,rx-pkv-error,rx-list,rx-detail,rx-pharmacy-confirm,rx-order-review,rx-order-success,rx-receipt rx;
  class pharmacy-map pharmacy;
  class hub-home hub;
  class history system;
```

## Pharmacy Search Flow

```mermaid
graph TD
  %% Class palette (domain colors)
  classDef hub fill:#EEF2FF,stroke:#6366F1,color:#312E81;
  classDef pharmacy fill:#F0FDFA,stroke:#14B8A6,color:#134E4A;

  subgraph PHARMACY[Pharmacy]
    pharmacy-map["SCR-070 Pharmacy. Map"]
    pharmacy-list["SCR-071 Pharmacy. List"]
    pharmacy-detail["SCR-072 Pharmacy. Detail"]
  end

  hub-home["SCR-003 Home"]

  pharmacy-map ==> pharmacy-detail
  pharmacy-map ==> pharmacy-list ==> pharmacy-detail
  pharmacy-map -.-> hub-home

  class pharmacy-map,pharmacy-list,pharmacy-detail pharmacy;
  class hub-home hub;
```
