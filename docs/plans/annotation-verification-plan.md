# Annotation Verification Plan

## Objective
Verify that every screen in the app shows the correct annotation by cross-referencing three sources:
1. **App.tsx** - All defined routes
2. **screen-annotations.json** - All annotation content
3. **AnnotationPanel.tsx** - Route-to-annotation mapping

---

## Verification Checklist

### Auth & Onboarding
| Route | Expected Annotation | Screen Title | Status |
|-------|---------------------|--------------|--------|
| `/` | AUTH-001 | Splash Screen | [x] |
| `/login` | AUTH-002 | Login Screen | [x] |
| `/register` | REG-001 | Account Creation | [x] |
| `/register/verify` | REG-002 | Email Verification | [x] |
| `/register/personal` | REG-003 | Personal Information | [x] |
| `/register/insurance` | REG-004 | Insurance Type Selection | [x] |
| `/register/gkv-details` | REG-005 | GKV Insurance Details | [x] |
| `/register/pkv-details` | REG-006 | PKV Insurance Details | [x] |
| `/register/complete` | REG-007 | Registration Complete | [x] |

### Home
| Route | Expected Annotation | Screen Title | Status |
|-------|---------------------|--------------|--------|
| `/home` | HOME-001 | Home Dashboard | [x] |

### Booking Flow
| Route | Expected Annotation | Screen Title | Status |
|-------|---------------------|--------------|--------|
| `/booking` | BKG-001 | Booking Type Selection | [x] |
| `/booking/type` | BKG-001 | Booking Type Selection | [x] |
| `/booking/specialty` | BKG-002 | Specialty Selection | [x] |
| `/booking/location` | BKG-003 | Location Selection | [x] |
| `/booking/doctors` | BKG-004 | Doctor Selection | [x] |
| `/booking/calendar` | BKG-005 | Date & Time Selection | [x] |
| `/booking/review` | BKG-006 | Booking Review | [x] |
| `/booking/success` | BKG-007 | Booking Confirmation | [x] |
| `/booking/smart-match-processing` | BKG-008 | Smart Match Processing | [x] |
| `/booking/smart-match-refinement` | BKG-009 | Smart Match Refinement | [x] |
| `/booking/smart-match-success` | BKG-010 | Smart Match Confirmation | [x] |

### Prescription Flow
| Route | Expected Annotation | Screen Title | Status |
|-------|---------------------|--------------|--------|
| `/prescriptions` | RX-001 | Prescriptions Home | [x] |
| `/prescriptions/type` | RX-001 | Prescriptions Home | [x] |
| `/prescriptions/list` | RX-002 | Prescription Selection | [x] |
| `/prescriptions/:id` (dynamic) | RX-003 | Prescription Detail | [x] |
| `/prescriptions/detail` | RX-003 | Prescription Detail | [x] (added) |
| `/prescriptions/redeem` | RX-004 | Redemption Channel Selection | [x] (added) |
| `/prescriptions/redeem-start` | RX-004 | Redemption Channel Selection | [x] |
| `/prescriptions/nfc-intro` | RX-005 | GKV NFC Introduction | [x] |
| `/prescriptions/nfc-scan` | RX-006 | GKV NFC Scanning | [x] |
| `/prescriptions/gkv-sms-verify` | RX-007 | GKV SMS Verification | [x] |
| `/prescriptions/pkv-auth` | RX-008 | PKV Prerequisites | [x] |
| `/prescriptions/pkv-insurer-select` | RX-009 | PKV Insurer Selection | [x] |
| `/prescriptions/pkv-redirect` | RX-010 | PKV App Handoff | [x] |
| `/prescriptions/pkv-error` | RX-011 | PKV Error Recovery | [x] |
| `/prescriptions/pharmacy` | RX-012 | Pharmacy Confirmation | [x] |
| `/prescriptions/review` | RX-013 | Order Review | [x] |
| `/prescriptions/success` | RX-014 | Order Confirmation | [x] |
| `/prescriptions/receipt` | RX-015 | Reimbursement Receipt | [x] |

### Telehealth Flow
| Route | Expected Annotation | Screen Title | Status |
|-------|---------------------|--------------|--------|
| `/telehealth/schedule-type` | TH-001 | Telehealth Schedule Type | [x] |
| `/telehealth/symptoms-intro` | TH-002 | Symptoms Selection | [x] |
| `/telehealth/symptoms-details` | TH-003 | Symptoms Duration & Severity | [x] |
| `/telehealth/symptoms-info` | TH-004 | Additional Information | [x] |
| `/telehealth/review` | TH-005 | Consultation Review | [x] |
| `/telehealth/confirmation` | TH-006 | Consultation Scheduled | [x] |
| `/telehealth/waiting-room` | TH-007 | Waiting Room | [x] |
| `/telehealth/call` | TH-008 | Video Call | [x] |
| `/telehealth/summary` | TH-009 | Consultation Summary | [x] |
| `/teleclinic/simulated` | TH-010 | Teleclinic Partner Handoff | [x] |

### Pharmacy Flow
| Route | Expected Annotation | Screen Title | Status |
|-------|---------------------|--------------|--------|
| `/pharmacy/map` | PHR-001 | Pharmacy Map View | [x] |
| `/pharmacy/list` | PHR-002 | Pharmacy List View | [x] |
| `/pharmacy/:id` (dynamic) | PHR-003 | Pharmacy Detail | [x] |
| `/pharmacy/detail` | PHR-003 | Pharmacy Detail | [x] (via dynamic pattern) |

### Appointments
| Route | Expected Annotation | Screen Title | Status |
|-------|---------------------|--------------|--------|
| `/appointments` | APT-001 | Appointments List | [x] |
| `/appointments/:id` (dynamic) | APT-002 | Appointment Detail | [x] |

### History
| Route | Expected Annotation | Screen Title | Status |
|-------|---------------------|--------------|--------|
| `/history` | HIST-001 | Appointment History | [x] |

### Profile
| Route | Expected Annotation | Screen Title | Status |
|-------|---------------------|--------------|--------|
| `/profile` | PRF-001 | Profile Hub | [x] |
| `/profile/edit` | PRF-002 | Edit Personal Info | [x] |
| `/profile/insurance-gkv` | PRF-003 | GKV Insurance Settings | [x] |
| `/profile/insurance-pkv` | PRF-004 | PKV Insurance Settings | [x] |
| `/profile/linked-accounts` | PRF-005 | Linked Accounts | [x] |
| `/profile/language` | PRF-006 | Language Settings | [x] |
| `/profile/support` | PRF-007 | Help & Support | [x] |
| `/profile/legal` | PRF-008 | Privacy & Legal | [x] |

### SSO Flow
| Route | Expected Annotation | Screen Title | Status |
|-------|---------------------|--------------|--------|
| `/sso/loading` | SSO-001 | SSO Loading | [x] |
| `/sso/complete-profile` | SSO-002 | Complete Profile (SSO) | [x] |

### Static Pages
| Route | Expected Annotation | Screen Title | Status |
|-------|---------------------|--------------|--------|
| `/static/faq` | STATIC-001 | FAQ Page | [x] |
| `/static/support` | STATIC-002 | Support Page | [x] |
| `/static/legal` | STATIC-003 | Legal Disclosure | [x] |
| `/static/privacy` | STATIC-004 | Privacy Policy | [x] |

### Error States
| Route | Expected Annotation | Screen Title | Status |
|-------|---------------------|--------------|--------|
| (any unknown route) | ERR-001 | 404 Error Page | [x] |

## Verification Complete (2026-01-22)

**Total Routes Verified: 68**
**All mappings verified and working correctly.**

---

## Issues Found and Fixed

| Route | Issue | Fix Applied |
|-------|-------|-------------|
| `/prescriptions/redeem` | No annotation mapping | Added mapping to RX-004 |
| `/prescriptions/detail` | No exact mapping | Added mapping to RX-003 |

---

## Previously Fixed Issues
- [x] `/appointments/:id` was falling back to ERR-001 (fixed with dynamic pattern matching)
- [x] `/prescriptions/redeem` mapping added → RX-004
- [x] `/prescriptions/detail` mapping added → RX-003

## Dynamic Route Patterns (Working)
The following dynamic patterns correctly match their routes:
- `/appointments/:id` → APT-002 ✓
- `/prescriptions/:id` → RX-003 ✓
- `/pharmacy/:id` → PHR-003 ✓
