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
| `/` | AUTH-001 | Splash Screen | [ ] |
| `/login` | AUTH-002 | Login Screen | [ ] |
| `/register` | REG-001 | Account Creation | [ ] |
| `/register/verify` | REG-002 | Email Verification | [ ] |
| `/register/personal` | REG-003 | Personal Information | [ ] |
| `/register/insurance` | REG-004 | Insurance Type Selection | [ ] |
| `/register/gkv-details` | REG-005 | GKV Insurance Details | [ ] |
| `/register/pkv-details` | REG-006 | PKV Insurance Details | [ ] |
| `/register/complete` | REG-007 | Registration Complete | [ ] |

### Home
| Route | Expected Annotation | Screen Title | Status |
|-------|---------------------|--------------|--------|
| `/home` | HOME-001 | Home Dashboard | [ ] |

### Booking Flow
| Route | Expected Annotation | Screen Title | Status |
|-------|---------------------|--------------|--------|
| `/booking` | BKG-001 | Booking Type Selection | [ ] |
| `/booking/type` | BKG-001 | Booking Type Selection | [ ] |
| `/booking/specialty` | BKG-002 | Specialty Selection | [ ] |
| `/booking/location` | BKG-003 | Location Selection | [ ] |
| `/booking/doctors` | BKG-004 | Doctor Selection | [ ] |
| `/booking/calendar` | BKG-005 | Date & Time Selection | [ ] |
| `/booking/review` | BKG-006 | Booking Review | [ ] |
| `/booking/success` | BKG-007 | Booking Confirmation | [ ] |
| `/booking/smart-match-processing` | BKG-008 | Smart Match Processing | [ ] |
| `/booking/smart-match-refinement` | BKG-009 | Smart Match Refinement | [ ] |
| `/booking/smart-match-success` | BKG-010 | Smart Match Confirmation | [ ] |

### Prescription Flow
| Route | Expected Annotation | Screen Title | Status |
|-------|---------------------|--------------|--------|
| `/prescriptions` | RX-001 | Prescriptions Home | [ ] |
| `/prescriptions/type` | RX-001 | Prescriptions Home | [ ] |
| `/prescriptions/list` | RX-002 | Prescription Selection | [ ] |
| `/prescriptions/:id` (dynamic) | RX-003 | Prescription Detail | [ ] |
| `/prescriptions/redeem-start` | RX-004 | Redemption Channel Selection | [ ] |
| `/prescriptions/nfc-intro` | RX-005 | GKV NFC Introduction | [ ] |
| `/prescriptions/nfc-scan` | RX-006 | GKV NFC Scanning | [ ] |
| `/prescriptions/gkv-sms-verify` | RX-007 | GKV SMS Verification | [ ] |
| `/prescriptions/pkv-auth` | RX-008 | PKV Prerequisites | [ ] |
| `/prescriptions/pkv-insurer-select` | RX-009 | PKV Insurer Selection | [ ] |
| `/prescriptions/pkv-redirect` | RX-010 | PKV App Handoff | [ ] |
| `/prescriptions/pkv-error` | RX-011 | PKV Error Recovery | [ ] |
| `/prescriptions/pharmacy` | RX-012 | Pharmacy Confirmation | [ ] |
| `/prescriptions/review` | RX-013 | Order Review | [ ] |
| `/prescriptions/success` | RX-014 | Order Confirmation | [ ] |
| `/prescriptions/receipt` | RX-015 | Reimbursement Receipt | [ ] |

### Telehealth Flow
| Route | Expected Annotation | Screen Title | Status |
|-------|---------------------|--------------|--------|
| `/telehealth/schedule-type` | TH-001 | Telehealth Schedule Type | [ ] |
| `/telehealth/symptoms-intro` | TH-002 | Symptoms Selection | [ ] |
| `/telehealth/symptoms-details` | TH-003 | Symptoms Duration & Severity | [ ] |
| `/telehealth/symptoms-info` | TH-004 | Additional Information | [ ] |
| `/telehealth/review` | TH-005 | Consultation Review | [ ] |
| `/telehealth/confirmation` | TH-006 | Consultation Scheduled | [ ] |
| `/telehealth/waiting-room` | TH-007 | Waiting Room | [ ] |
| `/telehealth/call` | TH-008 | Video Call | [ ] |
| `/telehealth/summary` | TH-009 | Consultation Summary | [ ] |
| `/teleclinic/simulated` | TH-010 | Teleclinic Partner Handoff | [ ] |

### Pharmacy Flow
| Route | Expected Annotation | Screen Title | Status |
|-------|---------------------|--------------|--------|
| `/pharmacy/map` | PHR-001 | Pharmacy Map View | [ ] |
| `/pharmacy/list` | PHR-002 | Pharmacy List View | [ ] |
| `/pharmacy/:id` (dynamic) | PHR-003 | Pharmacy Detail | [ ] |

### Appointments
| Route | Expected Annotation | Screen Title | Status |
|-------|---------------------|--------------|--------|
| `/appointments` | APT-001 | Appointments List | [ ] |
| `/appointments/:id` (dynamic) | APT-002 | Appointment Detail | [ ] |

### History
| Route | Expected Annotation | Screen Title | Status |
|-------|---------------------|--------------|--------|
| `/history` | HIST-001 | Appointment History | [ ] |

### Profile
| Route | Expected Annotation | Screen Title | Status |
|-------|---------------------|--------------|--------|
| `/profile` | PRF-001 | Profile Hub | [ ] |
| `/profile/edit` | PRF-002 | Edit Personal Info | [ ] |
| `/profile/insurance-gkv` | PRF-003 | GKV Insurance Settings | [ ] |
| `/profile/insurance-pkv` | PRF-004 | PKV Insurance Settings | [ ] |
| `/profile/linked-accounts` | PRF-005 | Linked Accounts | [ ] |
| `/profile/language` | PRF-006 | Language Settings | [ ] |
| `/profile/support` | PRF-007 | Help & Support | [ ] |
| `/profile/legal` | PRF-008 | Privacy & Legal | [ ] |

### SSO Flow
| Route | Expected Annotation | Screen Title | Status |
|-------|---------------------|--------------|--------|
| `/sso/loading` | SSO-001 | SSO Loading | [ ] |
| `/sso/complete-profile` | SSO-002 | Complete Profile (SSO) | [ ] |

### Static Pages
| Route | Expected Annotation | Screen Title | Status |
|-------|---------------------|--------------|--------|
| `/static/faq` | STATIC-001 | FAQ Page | [ ] |
| `/static/support` | STATIC-002 | Support Page | [ ] |
| `/static/legal` | STATIC-003 | Legal Disclosure | [ ] |
| `/static/privacy` | STATIC-004 | Privacy Policy | [ ] |

### Error States
| Route | Expected Annotation | Screen Title | Status |
|-------|---------------------|--------------|--------|
| (any unknown route) | ERR-001 | 404 Error Page | [ ] |

---

## Routes Missing from App.tsx (defined in annotations but no route)
- `/prescriptions/redeem` - exists in App.tsx but not mapped in AnnotationPanel
- `/prescriptions/detail` - static route exists but dynamic `:id` pattern needed

---

## Verification Steps

1. **Start the dev server**: `npm run dev`
2. **Open the app** at http://localhost:5000
3. **For each route in the checklist**:
   - Navigate to the URL
   - Click the purple annotation button
   - Verify the Screen ID and Title match the expected values
   - Mark as [x] if correct, note issues if not
4. **Test dynamic routes** with actual IDs:
   - `/appointments/appt-1`
   - `/prescriptions/rx-1` (if applicable)
   - `/pharmacy/pharm-1` (if applicable)

---

## Known Issues Fixed
- [x] `/appointments/:id` was falling back to ERR-001 (fixed with dynamic pattern matching)

## Potential Issues to Watch
- [ ] `/prescriptions/redeem` has no annotation mapping
- [ ] Verify `/prescriptions/detail` vs `/prescriptions/:id` behavior
- [ ] Check if `/pharmacy/detail` needs dynamic pattern
