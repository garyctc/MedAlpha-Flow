# MedAlpha Connect - Full Realism Audit Plan

## Goal
Transform the prototype into a realistic-feeling app where:
- All user-created data persists to localStorage
- All screens handle loading, empty, error, and success states
- All interactive elements work (no empty onClick handlers)
- Components feel polished (proper datepicker, toast inside mobile frame, etc.)

---

## Part 1: Critical Cross-Cutting Fixes

These affect the entire app and must be fixed first.

### 1.1 Toast Positioning
**Problem:** `<Toaster />` renders outside the 375px mobile frame in `App.tsx:226-231`
**Fix:** Move inside the mobile container, constrain to 375px width

### 1.2 Create Reusable Loading Skeleton
**Problem:** No consistent loading pattern - some pages have skeletons, most don't
**Fix:** Create `<LoadingSkeleton variant="card|list|page" />` component

### 1.3 Create Error Boundary + Error UI
**Problem:** No error handling anywhere
**Fix:** Add React error boundary with retry UI

### 1.4 Standardize Success Feedback
**Problem:** Actions complete silently (no toast on button clicks)
**Fix:** Add toast for all user actions (book, cancel, save, etc.)

### 1.5 Storage Layer Consolidation
**Problem:** Data scattered between localStorage, sessionStorage, useState
**Fix:** Ensure all user data flows through `storage.ts` with proper types

---

## Part 2: Component Rebuilds

### 2.1 Datepicker (Booking Calendar)
**File:** `client/src/pages/booking/calendar.tsx`
**Problems:**
- Allows selecting past dates
- All dates appear equally available (no disabled dates)
- Hardcoded time slots that don't vary by date
- No visual indication of availability

**Rebuild to:**
- Disable past dates
- Show availability indicators (dots under dates with slots)
- Generate time slots based on selected date (mock but dynamic)
- Highlight "today" clearly

### 2.2 Search Components
**Files:** `history/index.tsx:25-28`, `pharmacy/map.tsx:18-21`
**Problem:** Search inputs exist but have no onChange handlers
**Fix:** Implement filtering logic for each search

### 2.3 Filter Chips
**Files:** `booking/doctors.tsx:58-68`, `pharmacy/list.tsx:52-64`
**Problem:** Buttons set active state but don't filter data
**Fix:** Wire filters to actually filter the displayed list

### 2.4 Edit Buttons (Booking Review)
**File:** `booking/review.tsx:37,51,72`
**Problem:** Edit buttons have no onClick handlers
**Fix:** Navigate back to appropriate step with current data preserved

---

## Part 3: Screen-by-Screen Audit

For each screen, we verify:
| State | Requirement |
|-------|-------------|
| Loading | Skeleton/spinner during data fetch (500-1000ms simulated) |
| Empty | Helpful message + CTA when no data |
| Error | Error message with retry option |
| Success | Toast when action completes |

---

### AUTH-001: Splash
**File:** `client/src/pages/splash.tsx` (if exists) or App.tsx routing
**Checks:**
- [ ] Auto-redirect to login after brief delay
- [ ] If user already logged in (localStorage), redirect to home instead

### AUTH-002: Login
**File:** `client/src/pages/login.tsx`
**Current issues:**
- Pre-filled email "alex@example.com" (line 49)
- Pre-filled password "password123" (line 61)
- Auto-advances after 800ms fake delay (line 16-22)
- "More partner options" button empty onClick (line 118)

**Fixes:**
- [ ] Remove pre-filled credentials (or make it obvious it's demo)
- [ ] Add loading state on submit button
- [ ] Show error state for invalid credentials (simulated)
- [ ] Wire "More partner options" or remove it
- [ ] Success: Save login state to localStorage, redirect to home

---

### REG-001 to REG-007: Registration Wizard
**Files:** `client/src/pages/register/*.tsx`

**REG-001: Create Account** (`account.tsx`)
- [ ] Loading state on submit
- [ ] Validation error states (email format, password strength)
- [ ] Save draft to localStorage on blur

**REG-002: Verify Email** (`verify-email.tsx`)
- [ ] Hardcoded email "max@example.com" (line 52) → use actual entered email
- [ ] Loading state while "verifying"
- [ ] Error state for wrong code
- [ ] Resend code with cooldown timer

**REG-003: Personal Info** (`personal-info.tsx`)
- [ ] Loading on submit
- [ ] Validation for required fields
- [ ] Save to localStorage on continue

**REG-004: Insurance Type** (`insurance-type.tsx`)
- [ ] Selection persists to draft

**REG-005/006: Insurance Details** (`gkv-details.tsx`, `pkv-details.tsx`)
- [ ] Loading on submit
- [ ] Validation for insurance number format
- [ ] Save to localStorage

**REG-007: Complete** (`complete.tsx`)
- [ ] Clear registration draft
- [ ] Save final profile to localStorage
- [ ] Success toast

---

### HOME-001: Dashboard
**File:** `client/src/pages/home.tsx`
**Current issues:**
- Hardcoded appointment "Dr. Sarah Johnson" (line 72-76)
- `hasAppointments = true` toggle (line 68) - hardcoded
- Hardcoded clinic "MedAlpha Health Center" (line 160)

**Fixes:**
- [ ] Load appointments from localStorage
- [ ] Show actual next upcoming appointment
- [ ] Empty state when no appointments (already exists, wire it up)
- [ ] Loading skeleton on initial load
- [ ] User name from profile (not hardcoded)

---

### BKG-001: Booking Type
**File:** `client/src/pages/booking/type.tsx`
- [ ] Clear previous draft on start
- [ ] Selection saves to draft

### BKG-002: Specialty Select
**File:** `client/src/pages/booking/specialty.tsx`
- [ ] Save selection to draft
- [ ] Handle back navigation (preserve selection)

### BKG-003: Location Select
**File:** `client/src/pages/booking/location.tsx`
- [ ] Save selection to draft
- [ ] Loading while "fetching locations"

### BKG-004: Doctor Select
**File:** `client/src/pages/booking/doctors.tsx`
**Current issues:**
- Hardcoded doctor array (line 9-34)
- Filter buttons don't filter (line 58-68)
- Fake 1500ms loading (line 42-45)

**Fixes:**
- [ ] Move doctor data to storage/constants
- [ ] Wire filter buttons to actually filter
- [ ] Show empty state if no doctors match filters
- [ ] Save selected doctor to draft

### BKG-005: Calendar
**File:** `client/src/pages/booking/calendar.tsx`
**Current issues:**
- Allows past dates
- Hardcoded time slots (line 14-15)
- No availability indicators

**Fixes:**
- [ ] Disable past dates
- [ ] Generate slots based on date (mock but varying)
- [ ] Show "no slots available" for some dates
- [ ] Save date/time to draft

### BKG-006: Review Booking
**File:** `client/src/pages/booking/review.tsx`
**Current issues:**
- Edit buttons have no onClick (line 37, 51, 72)
- Hardcoded fallbacks (line 34-35, 48-49, 15-16)

**Fixes:**
- [ ] Wire edit buttons to navigate back to step
- [ ] Load all data from draft (no hardcoded fallbacks shown)
- [ ] Loading state on confirm
- [ ] Success toast + navigate to appointments

### BKG-007: Booking Success
- [ ] Show confirmation details
- [ ] Clear booking draft
- [ ] Save appointment to localStorage

### BKG-008 to BKG-010: Smart Match
**File:** `client/src/pages/booking/smart-match-processing.tsx`
- [ ] Keep simulation but ensure result saves to localStorage
- [ ] Success path: create appointment in storage
- [ ] Refinement path: allow re-selection

---

### TH-001 to TH-010: Telehealth Flow
**Files:** `client/src/pages/telehealth/*.tsx`, `client/src/pages/teleclinic/*.tsx`

**Key fixes:**
- [ ] Symptom selections persist to draft
- [ ] Booking saves to appointments in localStorage
- [ ] Waiting room timer shows realistic estimate
- [ ] Video call completion creates history entry
- [ ] Summary saves to history

**Teleclinic Simulated** (`teleclinic/simulated.tsx`):
- [ ] Replace hardcoded reasons (line 53-59) with user symptoms
- [ ] Replace hardcoded time slots (line 61-66) with dynamic slots
- [ ] Replace "Dr. Available Doctor" (line 30) with actual assignment

---

### PHR-001 to PHR-003: Pharmacy
**Files:** `client/src/pages/pharmacy/*.tsx`

**PHR-001: Map** (`map.tsx`)
- [ ] Search input needs onChange handler (line 18-21)
- [ ] Replace fake grid map with static map image or real map
- [ ] "3 pharmacies nearby" should reflect actual count (line 74)
- [ ] Pins should be clickable

**PHR-002: List** (`list.tsx`)
- [ ] Hardcoded pharmacy array (line 6-40) → move to storage
- [ ] Wire filter buttons to filter (line 52-64)
- [ ] Search functionality

**PHR-003: Detail** (`detail.tsx`)
- [ ] Load pharmacy from storage by ID
- [ ] Order button creates order in localStorage

---

### APT-001: Appointments List
**File:** `client/src/pages/appointments/index.tsx`
**Current issues:**
- Simulated webhook confirmation after 5s (line 141-195)
- Filter buttons work but should load from localStorage

**Fixes:**
- [ ] Load all appointments from localStorage
- [ ] Show loading skeleton initially
- [ ] Empty state when no appointments
- [ ] Cancellation saves status to localStorage
- [ ] Keep webhook simulation but save result to localStorage

### APT-002: Appointment Detail
**File:** `client/src/pages/appointments/detail.tsx`
**Current issues:**
- All hardcoded data (line 28-36)
- "Add to Calendar" no implementation (line 109-111)
- "Get Directions" no implementation (line 86-88)

**Fixes:**
- [ ] Load appointment by ID from localStorage
- [ ] Wire "Add to Calendar" (can open calendar app link)
- [ ] Wire "Get Directions" (can open maps link)
- [ ] Cancel button updates status in localStorage

---

### HIST-001: History
**File:** `client/src/pages/history/index.tsx`
**Current issues:**
- Hardcoded history items (line 54-124)
- Search input no onChange (line 25-28)
- Card onClick empty (line 69, 83, 98, 119)

**Fixes:**
- [ ] Load from localStorage (completed/cancelled appointments)
- [ ] Wire search to filter
- [ ] Wire card clicks to detail view
- [ ] Empty state when no history
- [ ] Loading skeleton

---

### PRF-001 to PRF-008: Profile
**Files:** `client/src/pages/profile/*.tsx`

**PRF-001: Profile Main** (`index.tsx`)
- [ ] Fallback "Max Mustermann" (line 22-25) → require real data
- [ ] Notifications button empty onClick (line 79) → wire or remove
- [ ] Load all data from localStorage

**PRF-002: Edit Profile** (`edit.tsx`)
- [ ] Pre-populate from localStorage
- [ ] Save changes to localStorage
- [ ] Loading state on save
- [ ] Success toast
- [ ] Unsaved changes warning on navigate away

**PRF-003: Linked Accounts** (`linked-accounts.tsx`)
- [ ] Save linked status to localStorage

**PRF-004/005: Insurance Info** (`insurance-gkv.tsx`, `insurance-pkv.tsx`)
- [ ] Load from localStorage
- [ ] Edit capability with save
- [ ] Success toast on save

**PRF-006: Language** (`language.tsx`)
- [ ] Save preference to localStorage
- [ ] Apply immediately (i18n)

**PRF-007: Help & Support** (`support.tsx`)
- [ ] Contact form submit with loading + success

**PRF-008: Legal** (`legal.tsx`)
- [ ] Terms link empty onClick (line 29) → wire to actual content or remove

---

### SSO-001 to SSO-002: SSO Flow
**Files:** `client/src/pages/sso/*.tsx`

**SSO-001: Loading** (`loading.tsx`)
- [ ] Auto-advance is fine (simulated) but save auth state

**SSO-002: Complete Profile** (`complete-profile.tsx`)
- [ ] Pre-populate any data from SSO
- [ ] Save completed profile to localStorage

---

### Static Pages & Error Handling
**Files:** `profile/faq.tsx`, `profile/support.tsx`, `profile/legal.tsx`
- [ ] Static content is fine
- [ ] 404 page exists and handles unknown routes

---

## Part 4: Data Model

All user data persists to localStorage via `storage.ts`:

```typescript
// User Profile
interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
  };
}

// Insurance
interface UserInsurance {
  type: 'gkv' | 'pkv';
  provider: string;
  memberNumber: string;
  memberName?: string;
}

// Appointments (booked, completed, cancelled)
interface Appointment {
  id: string;
  type: 'in-person' | 'video';
  status: 'upcoming' | 'completed' | 'cancelled';
  doctor: string;
  specialty: string;
  location?: string;
  date: string;
  time: string;
  createdAt: string;
  completedAt?: string;
  cancelledAt?: string;
}

// Booking Draft (multi-step wizard)
interface BookingDraft {
  type?: 'in-person' | 'video';
  specialty?: string;
  location?: string;
  doctor?: string;
  date?: string;
  time?: string;
}

// Registration Draft (multi-step wizard)
interface RegistrationDraft {
  step: number;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  insuranceType?: 'gkv' | 'pkv';
  insuranceDetails?: object;
}

// Settings
interface UserSettings {
  language: 'de' | 'en';
  notifications: boolean;
}
```

---

## Part 5: Verification

After completing the audit, verify:

1. **Data Persistence Test**
   - Book appointment → refresh → still visible
   - Edit profile → navigate away → return → changes preserved
   - Complete registration → refresh → logged in

2. **State Handling Test**
   - Each screen shows skeleton on load
   - Each screen has empty state when no data
   - Each action shows success/error toast

3. **Component Quality Test**
   - Datepicker disables past dates
   - Toast appears within mobile frame
   - All buttons have working onClick
   - All search inputs filter content

4. **Navigation Test**
   - Back button works on every screen
   - Deep link to any screen works (refresh preserves state)
   - Booking edit buttons navigate correctly

---

## Execution Order

1. **Part 1: Cross-cutting fixes** (Toast, Loading, Error, Storage)
2. **Part 2: Component rebuilds** (Datepicker, Search, Filters, Edit buttons)
3. **Part 3: Screens in order:**
   - Auth & Registration (foundational)
   - Home (main entry point)
   - Booking flow (core feature)
   - Appointments & History (data display)
   - Profile (settings)
   - Telehealth & Pharmacy (secondary flows)
   - SSO & Static (polish)
4. **Part 5: Verification testing**
