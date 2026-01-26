# MedAlpha App Flows

This document combines the flow readmes in `docs/screenshots/*/README.md` into a single, end-to-end view of the app journeys.

## End-to-end overview

Start at authentication (login, SSO, or registration) and land on the Home dashboard. From Home, users can book appointments (in-person or video), manage existing appointments, start telehealth consultations, redeem prescriptions (GKV or PKV), search pharmacies, and manage their profile. History and static pages provide reference and support across the experience.

## Flow index

- [Authentication & Login Flow](#authentication-login-flow)
- [SSO Login Flow](#sso-login-flow)
- [Registration Flow](#registration-flow)
- [Home Dashboard Flow](#home-dashboard-flow)
- [Appointments Flow](#appointments-flow)
- [In-Person Booking Flow](#in-person-booking-flow)
- [Video Booking (Teleclinic) Flow](#video-booking-teleclinic-flow)
- [Telehealth Consultation Flow](#telehealth-consultation-flow)
- [Prescription Redemption (GKV) Flow](#prescription-redemption-gkv-flow)
- [Prescription Redemption (PKV) Flow](#prescription-redemption-pkv-flow)
- [Pharmacy Search Flow](#pharmacy-search-flow)
- [Profile Management Flow](#profile-management-flow)
- [History Flow](#history-flow)
- [Static Pages Flow](#static-pages-flow)

## Authentication & Login Flow

### Summary

Start → Splash Screen → Login → Choose method (Email/SSO/Register) → Home

### Steps

1. `AUTH-001` | Splash Screen — Launch screen that shows branding and auto-redirects to Login or Home based on auth state.
   - Route(s): /

2. `AUTH-002` | Login Screen — User enters credentials or chooses SSO/Registration to continue into the app.
   - Route(s): /login

_Source: `docs/screenshots/authentication-login/README.md`_

## SSO Login Flow

### Summary

Login → Tap SSO partner → Loading → Success/Error → Complete Profile → Home

### Steps

1. `SSO-001` | SSO Loading — SSO loading/handshake with partner.
   - Route(s): /sso/loading

2. `SSO-002` | Complete Profile (SSO) — Complete profile after SSO sign-in.
   - Route(s): /sso/complete-profile

_Source: `docs/screenshots/sso-login/README.md`_

## Registration Flow

### Summary

Start → Account → Verify Email → Personal Info → Insurance Type → GKV/PKV Details → Complete → Home

### Steps

1. `REG-001` | Account Creation — Collects email and password to create an account (Step 1).
   - Route(s): /register

2. `REG-002` | Email Verification — Verifies email via code to continue registration (Step 2).
   - Route(s): /register/verify

3. `REG-003` | Personal Information — Captures personal details like name and date of birth (Step 3).
   - Route(s): /register/personal

4. `REG-004` | Insurance Type Selection — Selects insurance type (GKV vs PKV) to branch registration (Step 4).
   - Route(s): /register/insurance

5. `REG-005` | GKV Insurance Details — Collects public insurance (GKV) details to complete registration.
   - Route(s): /register/gkv-details

6. `REG-006` | PKV Insurance Details — Collects private insurance (PKV) details to complete registration.
   - Route(s): /register/pkv-details

7. `REG-007` | Registration Complete — Confirmation screen that completes onboarding and links to Home.
   - Route(s): /register/complete

_Source: `docs/screenshots/registration-flow/README.md`_

## Home Dashboard Flow

### Summary

Home → Choose action (Promo/Book/Prescriptions/Upcoming/Profile/Bottom Nav) → Destination screen

### Steps

1. `HOME-001` | Home Dashboard — Main dashboard with promos, shortcuts, and navigation entry points.
   - Route(s): /home

2. `notifications` | Notifications — Notifications list (promo and tips).
   - Route(s): /notifications

3. `notification-detail` | Notification Detail — Notification detail view for a single item.
   - Route(s): /notifications/:id

_Source: `docs/screenshots/home-dashboard/README.md`_

## Appointments Flow

### Summary

Appointments → Choose action (Filter/View/Book) → Detail → Manage (Cancel/Reschedule/Back) → Return

### Steps

1. `APT-001` | Appointments List — List of upcoming/past appointments with quick actions.
   - Route(s): /appointments

2. `APT-002` | Appointment Detail — Appointment detail view with reschedule/cancel actions.
   - Route(s): (route not mapped)

_Source: `docs/screenshots/appointments-management/README.md`_

## In-Person Booking Flow

### Steps

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

_Source: `docs/screenshots/booking-inperson/README.md`_

## Video Booking (Teleclinic) Flow

### Summary

Home → Booking Type → Video Consultation → Teleclinic (External)

### Steps

1. `BKG-001` | Booking Type Selection — Choose appointment type (in-person vs telemedicine/teleclinic).
   - Route(s): /booking, /booking/type

2. `TH-010` | Teleclinic Partner Handoff — Teleclinic external booking experience (simulated).
   - Route(s): /teleclinic/simulated

_Source: `docs/screenshots/booking-video/README.md`_

## Telehealth Consultation Flow

### Summary

Schedule Type → Symptoms (3 steps) → Review → Confirmation → Waiting Room → Video Call → Summary → Home

### Steps

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

_Source: `docs/screenshots/telehealth-consultation/README.md`_

## Prescription Redemption (GKV) Flow

### Summary

Prescriptions → Redeem Start → NFC Intro → Enter CAN → Scan Card → SMS Verify → Select Prescription → Pharmacy → Review → Success

### Steps

1. `RX-001` | Prescriptions Home — Prescription hub listing active prescriptions and entry to redemption.
   - Route(s): /prescriptions, /prescriptions/type

2. `RX-004` | Redemption Channel Selection — Start redemption and choose insurance path / redemption method.
   - Route(s): /prescriptions/redeem, /prescriptions/redeem-start

3. `RX-005` | GKV NFC Introduction — GKV NFC intro with instructions before scanning.
   - Route(s): /prescriptions/nfc-intro

4. `RX-006` | GKV NFC Scanning — NFC scan screen for health card verification.
   - Route(s): /prescriptions/nfc-scan

5. `RX-007` | GKV SMS Verification — SMS verification step for GKV authentication.
   - Route(s): /prescriptions/gkv-sms-verify

6. `RX-002` | Prescription Selection — Select prescriptions to redeem from the list.
   - Route(s): /prescriptions/list

7. `RX-003` | Prescription Detail — View prescription details before redemption.
   - Route(s): /prescriptions/detail

8. `RX-012` | Pharmacy Confirmation — Select a pharmacy for fulfillment.
   - Route(s): /prescriptions/pharmacy

9. `RX-013` | Order Review — Review order and confirm redemption.
   - Route(s): /prescriptions/review

10. `RX-014` | Order Confirmation — Order success confirmation.
   - Route(s): /prescriptions/success

11. `RX-015` | Reimbursement Receipt — Receipt and final confirmation details.
   - Route(s): /prescriptions/receipt

_Source: `docs/screenshots/prescription-gkv/README.md`_

## Prescription Redemption (PKV) Flow

### Summary

Prescriptions → Redeem Start → PKV Auth → Select Insurer → OAuth Redirect → Select Prescription → Pharmacy → Review → Success

### Steps

1. `RX-001` | Prescriptions Home — Prescription hub listing active prescriptions and entry to redemption.
   - Route(s): /prescriptions, /prescriptions/type

2. `RX-004` | Redemption Channel Selection — Start redemption and choose insurance path / redemption method.
   - Route(s): /prescriptions/redeem, /prescriptions/redeem-start

3. `RX-008` | PKV Prerequisites — PKV authentication step for GesundheitsID login.
   - Route(s): /prescriptions/pkv-auth

4. `RX-009` | PKV Insurer Selection — Select PKV insurer during authentication.
   - Route(s): /prescriptions/pkv-insurer-select

5. `RX-010` | PKV App Handoff — PKV redirect/hand-off state during authentication.
   - Route(s): /prescriptions/pkv-redirect

6. `RX-011` | PKV Error Recovery — PKV error handling if authentication fails.
   - Route(s): /prescriptions/pkv-error

7. `RX-002` | Prescription Selection — Select prescriptions to redeem from the list.
   - Route(s): /prescriptions/list

8. `RX-003` | Prescription Detail — View prescription details before redemption.
   - Route(s): /prescriptions/detail

9. `RX-012` | Pharmacy Confirmation — Select a pharmacy for fulfillment.
   - Route(s): /prescriptions/pharmacy

10. `RX-013` | Order Review — Review order and confirm redemption.
   - Route(s): /prescriptions/review

11. `RX-014` | Order Confirmation — Order success confirmation.
   - Route(s): /prescriptions/success

12. `RX-015` | Reimbursement Receipt — Receipt and final confirmation details.
   - Route(s): /prescriptions/receipt

_Source: `docs/screenshots/prescription-pkv/README.md`_

## Pharmacy Search Flow

### Summary

Entry (Home promo or Prescription flow) → Pharmacy Map → Browse (Map pin or List) → Pharmacy Detail → Action (Call/Directions/Select)

### Steps

1. `PHR-001` | Pharmacy Map View — Map view to discover nearby pharmacies.
   - Route(s): /pharmacy/map

2. `PHR-002` | Pharmacy List View — List view for pharmacy search and filtering.
   - Route(s): /pharmacy/list

3. `PHR-003` | Pharmacy Detail — Pharmacy detail with services and actions.
   - Route(s): (route not mapped)

_Source: `docs/screenshots/pharmacy-search/README.md`_

## Profile Management Flow

### Summary

Profile → Choose action → Sub-screen → Complete action → Return to Profile (or Login for sign out)

### Steps

1. `PRF-001` | Profile Hub — Profile hub for account and support options.
   - Route(s): /profile

2. `PRF-002` | Edit Personal Info — Edit personal profile details.
   - Route(s): /profile/edit

3. `PRF-003` | GKV Insurance Settings — View GKV insurance details.
   - Route(s): /profile/insurance-gkv

4. `PRF-004` | PKV Insurance Settings — View PKV insurance details.
   - Route(s): /profile/insurance-pkv

5. `PRF-005` | Linked Accounts — Manage linked partner accounts.
   - Route(s): /profile/linked-accounts

6. `PRF-006` | Language Settings — Choose and save language preference.
   - Route(s): /profile/language

7. `PRF-007` | Help & Support — Help and support options.
   - Route(s): /profile/support

8. `PRF-008` | Privacy & Legal — Privacy/legal links and disclosures.
   - Route(s): /profile/legal

9. `PRF-009` | My Data (GDPR) — Data privacy/export controls.
   - Route(s): /profile/data

_Source: `docs/screenshots/profile-management/README.md`_

## History Flow

### Summary

History → Browse (Search/Filter/Scroll) → Select item → View detail (Appointment or Prescription) → Back to History

### Steps

1. `HIST-001` | Appointment History — History list of past visits and records.
   - Route(s): /history

_Source: `docs/screenshots/history-view/README.md`_

## Static Pages Flow

### Steps

1. `STATIC-001` | FAQ Page — FAQ content and search.
   - Route(s): /static/faq

2. `STATIC-002` | Support Page — Support contact and form.
   - Route(s): /static/support

3. `STATIC-003` | Legal Disclosure — Legal disclosure content.
   - Route(s): /static/legal

4. `STATIC-004` | Privacy Policy — Privacy policy content.
   - Route(s): /static/privacy

5. `STATIC-005` | Terms of Service — Terms of service content.
   - Route(s): /static/terms

6. `STATIC-006` | Medical Glossary — Medical glossary reference.
   - Route(s): /static/glossary

7. `STATIC-007` | About Page — About MedAlpha information.
   - Route(s): /static/about

8. `ERR-001` | 404 Error Page — Not found state with recovery path.
   - Route(s): (route not mapped)

_Source: `docs/screenshots/static-pages/README.md`_
