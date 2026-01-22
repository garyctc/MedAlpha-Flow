# IA (Info Map)

Canonical rules: `docs/artifacts/visual-artifacts-rules.md`

**Created:** 2026-01-21
**Last Updated:** 2026-01-22 (profile menu reorganized: About & Glossary moved to Help & Support)
**Source of Truth:** `client/src/App.tsx` routes, plus in-page navigation via `useLocation()` and `<Link />`. Planned screens are labeled.
**Screen Count (v1):** 45 active (42 implemented, 3 planned) — Hides v2 scopes via feature flags: Video Consultation (10), Prescriptions (16), Pharmacy (3); excludes system errors: Not Found (1)

---

## Visual Maps

### App Map (Hierarchy)

```mermaid
graph TD
    App["📱 App<br/>(Mobile)"]
    Auth["🔵 Auth Domain<br/>(14 screens)"]
    Home["🟣 Home<br/>SCR-003"]
    InPerson["🟪 In-Person Visit<br/>(12 screens)"]
    History["⚪ History<br/>SCR-090"]
    Notif["⚪ Notifications<br/>(2 screens)"]
    Profile["🟠 Profile<br/>(8 screens)"]
    Static["⚪ Static Pages<br/>(7 pages)"]

    App --> Auth
    Auth --> Home
    Home --> InPerson
    Home --> History
    Home --> Notif
    Home --> Profile
    Profile --> Static

    classDef auth fill:#E0F2FE,stroke:#0284C7,color:#0C4A6E
    classDef hub fill:#EEF2FF,stroke:#6366F1,color:#312E81
    classDef inperson fill:#F3E8FF,stroke:#A855F7,color:#581C87
    classDef profile fill:#FFFBEB,stroke:#F59E0B,color:#92400E
    classDef system fill:#F1F5F9,stroke:#64748B,color:#0F172A

    class App system
    class Auth auth
    class Home hub
    class InPerson inperson
    class Profile profile
    class History,Notif,Static system
```

**v1 Structure**
- 🔵 **Auth Domain**: Splash, Login, Register (skips insurance collection), SSO, Password Reset (14 screens: 11 implemented, 3 planned)
- 🟣 **Home**: Central entry point to all features (1 screen)
  - 🟪 **In-Person Visit**: Booking (skips type selection), Curaay (processing/refinement/success), Appointments (12 screens)
  - ⚪ **Notifications**: Alerts & updates (2 screens)
  - ⚪ **History**: Past appointments & activity (1 screen)
  - 🟠 **Profile**: User settings (address hidden, insurance info hidden) (8 screens)
    - ⚪ **Help & Support**: FAQ, Medical Glossary, About, Contact Support (4 menu items)
    - ⚪ **Privacy & Legal**: Privacy Policy, Terms of Service, Legal Disclosure (3 menu items)
    - ⚪ **Static Pages**: 7 total pages (FAQ, Support, Privacy, Legal, Terms, About, Glossary)

**Total: 45 active screens (42 implemented, 3 planned)**

**Hidden for v1 (via feature flags):**
- Video Consultation (Telehealth, Teleclinic) - 9 screens
- Booking Type Selection - 1 screen (skipped, only in-person available)

**Out of v1 Scope (v2+ roadmap):**
- Video Consultation - 10 screens (hidden via `videoConsultationEnabled: false`)
- Prescriptions (RX) - 16 screens (hidden via `prescriptionEnabled: false`)
- Pharmacy - 3 screens
- Total v2 deferred: 29 screens

Detailed flows: see `docs/artifacts/userflows/FLOWS.md`.

---

### Navigation Map (Behavioral)

```mermaid
graph TD
  %% Class palette
  classDef system fill:#F1F5F9,stroke:#64748B,color:#0F172A;
  classDef auth fill:#E0F2FE,stroke:#0284C7,color:#0C4A6E;
  classDef hub fill:#EEF2FF,stroke:#6366F1,color:#312E81;
  classDef inperson fill:#F3E8FF,stroke:#A855F7,color:#581C87;
  classDef profile fill:#FFFBEB,stroke:#F59E0B,color:#92400E;

  subgraph AUTH[Auth & Registration]
    auth-splash["SCR-001 Splash"]
    auth-login["SCR-002 Login"]
    reg-account["SCR-010 Register"]
    sso-loading["SCR-110 SSO Loading"]
  end

  subgraph HOME[Home]
    hub-home["SCR-003 Home"]
  end

  subgraph INPERSON[In-Person Visit]
    booking-specialty["SCR-021 Specialty"]
    booking-calendar["SCR-024 Calendar"]
    booking-review["SCR-025 Review"]
    curaay-proc["SCR-026 Curaay Process"]
    curaay-refine["SCR-027 Curaay Refine"]
    curaay-success["SCR-028 Curaay Success"]
    appt-list["SCR-080 Appointments"]
    appt-detail["SCR-081 Appointment Detail"]
  end

  subgraph PROFILE[Profile & SSO]
    profile["SCR-100 Profile"]
    profile-edit["SCR-101 Edit"]
    profile-legal["SCR-107 Legal"]
  end

  subgraph AUX[Auxiliary]
    history["SCR-090 History"]
    notifications["SCR-007 Notifications"]
    static["SCR-120+ Static Pages"]
  end

  %% Auth flow
  auth-splash ==> auth-login
  auth-login -.-> reg-account
  auth-login -.-> sso-loading
  auth-login ==> hub-home

  %% Home entry point (booking type skipped, goes directly to specialty)
  hub-home ==> booking-specialty
  hub-home ==> history
  hub-home ==> notifications
  hub-home ==> profile
  hub-home ==> static

  %% In-person flow (type selection skipped)
  booking-specialty --> booking-calendar --> booking-review --> curaay-proc
  curaay-proc --> curaay-success
  curaay-proc -.-> curaay-refine --> curaay-proc
  curaay-success --> appt-list --> appt-detail

  %% Profile flow
  profile ==> profile-edit
  profile ==> profile-legal

  class AUTH auth
  class HOME hub
  class INPERSON inperson
  class PROFILE profile
  class AUX system
```

## Screen Index (SCR-### ↔ Node ID ↔ Route)

| Screen ID | Node ID | Route(s) | Screen |
| --- | --- | --- | --- |
| SCR-001 | auth-splash | `/` | Splash |
| SCR-002 | auth-login | `/login` | Login |
| SCR-003 | hub-home | `/home` | Home |
| SCR-004 | auth-forgot-password | `/forgot-password` | Forgot Password (planned) |
| SCR-005 | auth-reset-password | `/reset-password` | Reset Password (planned) |
| SCR-006 | auth-reset-password-success | `/reset-password/success` | Reset Password Success (planned) |
| SCR-007 | notifications-list | `/notifications` | Notifications |
| SCR-008 | notifications-detail | `/notifications/:id` | Notification Detail |
| SCR-010 | reg-account | `/register` | Register. Account |
| SCR-011 | reg-verify-email | `/register/verify` | Register. Verify Email |
| SCR-012 | reg-personal-info | `/register/personal` | Register. Personal Info |
| SCR-013 | reg-insurance-type | `/register/insurance` | Register. Insurance Type |
| SCR-014 | reg-gkv-details | `/register/gkv-details` | Register. GKV Details |
| SCR-015 | reg-pkv-details | `/register/pkv-details` | Register. PKV Details |
| SCR-016 | reg-complete | `/register/complete` | Register. Complete |
| SCR-020 | booking-type | `/booking`, `/booking/type` | Booking. Type (v2 - skipped in v1) |
| SCR-021 | booking-specialty | `/booking/specialty` | Booking. Specialty Select |
| SCR-022 | booking-location | `/booking/location` | Booking. Location Select |
| SCR-023 | booking-doctors | `/booking/doctors` | Booking. Doctor Select |
| SCR-024 | booking-calendar | `/booking/calendar` | Booking. Calendar |
| SCR-025 | booking-review | `/booking/review` | Booking. Review |
| SCR-026 | booking-curaay-processing | `/booking/curaay-processing` | Booking. Curaay Processing |
| SCR-027 | booking-curaay-refinement | `/booking/curaay-refinement` | Booking. Curaay Refinement |
| SCR-028 | booking-curaay-success | `/booking/curaay-success` | Booking. Curaay Success |
| SCR-029 | booking-success | `/booking/success` | Booking. Success (unused in-app) |
| SCR-030 | teleclinic-simulated | `/teleclinic/simulated` | Teleclinic. Simulated (v2 - hidden) |
| SCR-040 | telehealth-schedule-type | `/telehealth/schedule-type` | Telehealth. Schedule Type (v2 - hidden) |
| SCR-041 | telehealth-symptoms-intro | `/telehealth/symptoms-intro` | Telehealth. Symptoms Intro (v2 - hidden) |
| SCR-042 | telehealth-symptoms-details | `/telehealth/symptoms-details` | Telehealth. Symptoms Details (v2 - hidden) |
| SCR-043 | telehealth-symptoms-info | `/telehealth/symptoms-info` | Telehealth. Symptoms Info (v2 - hidden) |
| SCR-044 | telehealth-review | `/telehealth/review` | Telehealth. Review (v2 - hidden) |
| SCR-045 | telehealth-confirmation | `/telehealth/confirmation` | Telehealth. Confirmation (v2 - hidden) |
| SCR-046 | telehealth-waiting-room | `/telehealth/waiting-room` | Telehealth. Waiting Room (v2 - hidden) |
| SCR-047 | telehealth-call | `/telehealth/call` | Telehealth. Call (v2 - hidden) |
| SCR-048 | telehealth-summary | `/telehealth/summary` | Telehealth. Summary (v2 - hidden) |
| SCR-080 | appt-list | `/appointments` | Appointments |
| SCR-081 | appt-detail | `/appointments/detail` | Appointment Detail |
| SCR-090 | history | `/history` | History |
| SCR-100 | profile | `/profile` | Profile |
| SCR-101 | profile-edit | `/profile/edit` | Profile. Edit |
| SCR-102 | profile-linked-accounts | `/profile/linked-accounts` | Profile. Linked Accounts |
| SCR-103 | profile-insurance-gkv | `/profile/insurance-gkv` | Profile. Insurance (GKV) |
| SCR-104 | profile-insurance-pkv | `/profile/insurance-pkv` | Profile. Insurance (PKV) |
| SCR-105 | profile-language | `/profile/language` | Profile. Language |
| SCR-106 | profile-support | `/profile/support` | Profile. Help and Support |
| SCR-107 | profile-privacy-legal | `/profile/legal` | Profile. Privacy and Legal |
| SCR-110 | sso-loading | `/sso/loading` | SSO. Loading |
| SCR-111 | sso-complete-profile | `/sso/complete-profile` | SSO. Complete Profile |
| SCR-120 | static-faq | `/static/faq` | Static. FAQ |
| SCR-121 | static-support | `/static/support` | Static. Support |
| SCR-122 | static-privacy | `/static/privacy` | Static. Privacy Policy |
| SCR-123 | static-legal | `/static/legal` | Static. Legal Disclosure |
| SCR-124 | static-terms | `/static/terms` | Static. Terms of Service |
| SCR-125 | static-about | `/static/about` | Static. About |
| SCR-126 | static-glossary | `/static/glossary` | Static. Medical Glossary |
