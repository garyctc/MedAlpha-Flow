# Phase 2: Auth & Home

**Goal:** Make login, registration, and home dashboard feel like a real app with proper data flow.

**Depends on:** Phase 1 (Foundation)

---

## AUTH-001: Splash Screen

**File:** `client/src/pages/splash.tsx` (if exists) or App.tsx routing

**Checks:**
- [ ] Auto-redirect to login after brief delay (1-2 seconds)
- [ ] If user already logged in (check `getAuthState()`), redirect to `/home` instead
- [ ] Show app logo during splash

---

## AUTH-002: Login

**File:** `client/src/pages/login.tsx`

**Current Issues:**
- Pre-filled email "alex@example.com" (line 49)
- Pre-filled password "password123" (line 61)
- Auto-advances after 800ms fake delay (line 16-22)
- "More partner options" button has empty onClick (line 118)

**Fixes:**

1. **Demo mode indicator** - Keep pre-filled credentials but add visible "Demo Mode" badge
2. **Loading state** - Show spinner on submit button while "authenticating"
3. **Error state** - If credentials don't match demo values, show error toast
4. **Wire or remove** - "More partner options" button should do something or be removed
5. **Save auth state** - On success, call `saveAuthState({ isLoggedIn: true })`
6. **Seed demo data** - Call `seedDemoData()` on first login if no data exists

**Acceptance:**
- [ ] Login button shows loading spinner during submit
- [ ] Wrong credentials show error toast
- [ ] Successful login saves auth state to localStorage
- [ ] Redirects to `/home` after login
- [ ] "More partner options" either works or is removed

---

## REG-001: Create Account

**File:** `client/src/pages/register/account.tsx`

**Fixes:**
- [ ] Add loading state on "Continue" button
- [ ] Validate email format (show inline error)
- [ ] Validate password strength (min 8 chars, show inline error)
- [ ] Save draft to localStorage on blur: `saveRegistrationDraft({ step: 1, email, password })`

---

## REG-002: Verify Email

**File:** `client/src/pages/register/verify-email.tsx`

**Current Issues:**
- Hardcoded email "max@example.com" (line 52)

**Fixes:**
- [ ] Load email from registration draft: `getRegistrationDraft()?.email`
- [ ] Show loading state while "verifying" code
- [ ] Accept any 6-digit code (demo mode) or show error for wrong format
- [ ] Add "Resend code" button with 60-second cooldown timer
- [ ] Update draft: `saveRegistrationDraft({ ...draft, step: 2 })`

---

## REG-003: Personal Info

**File:** `client/src/pages/register/personal-info.tsx`

**Fixes:**
- [ ] Loading state on submit
- [ ] Required field validation (firstName, lastName required)
- [ ] Save to draft: `saveRegistrationDraft({ ...draft, step: 3, firstName, lastName, dateOfBirth })`

---

## REG-004: Insurance Type

**File:** `client/src/pages/register/insurance-type.tsx`

**Fixes:**
- [ ] Selection persists to draft: `saveRegistrationDraft({ ...draft, step: 4, insuranceType })`
- [ ] Pre-select if returning to this step (load from draft)

---

## REG-005/006: Insurance Details

**Files:** `client/src/pages/register/gkv-details.tsx`, `pkv-details.tsx`

**Fixes:**
- [ ] Loading state on submit
- [ ] Validate insurance number format (basic format check)
- [ ] Save to draft: `saveRegistrationDraft({ ...draft, step: 5, insuranceDetails })`

---

## REG-007: Registration Complete

**File:** `client/src/pages/register/complete.tsx`

**Fixes:**
- [ ] Load all data from registration draft
- [ ] Save final profile: `saveUserProfile({ firstName, lastName, email, ... })`
- [ ] Save insurance: `saveUserInsurance({ type, provider, memberNumber })`
- [ ] Save auth state: `saveAuthState({ isLoggedIn: true })`
- [ ] Clear registration draft: `clearRegistrationDraft()`
- [ ] Show success toast: "Account created successfully"
- [ ] Navigate to `/home`

---

## HOME-001: Dashboard

**File:** `client/src/pages/home.tsx`

**Current Issues:**
- Hardcoded appointment "Dr. Sarah Johnson" (line 72-76)
- `hasAppointments = true` hardcoded toggle (line 68)
- Hardcoded clinic "MedAlpha Health Center" (line 160)

**Fixes:**

1. **Load real data:**
```tsx
const [isLoading, setIsLoading] = useState(true);
const [profile, setProfile] = useState<UserProfile | null>(null);
const [appointments, setAppointments] = useState<Appointment[]>([]);

useEffect(() => {
  // Simulate loading delay for realism
  setTimeout(() => {
    setProfile(getUserProfile());
    setAppointments(getUserAppointments().filter(a => a.status === 'upcoming'));
    setIsLoading(false);
  }, 500);
}, []);
```

2. **Loading state:**
- [ ] Show `<LoadingSkeleton variant="page" />` while loading

3. **User greeting:**
- [ ] Use `profile?.firstName` instead of hardcoded name

4. **Upcoming appointment:**
- [ ] Show first upcoming appointment from `appointments[0]`
- [ ] If no appointments, show empty state with "Book Now" CTA

5. **Dynamic content:**
- [ ] Replace hardcoded clinic name with appointment's location

**Acceptance:**
- [ ] Shows loading skeleton on initial load
- [ ] Displays user's actual name from profile
- [ ] Shows real upcoming appointment (or empty state)
- [ ] "Book Now" navigates to `/booking`

---

## Verification Checklist

After completing Phase 2:

- [ ] Fresh user (no localStorage) sees login screen
- [ ] Login with demo credentials works and saves auth state
- [ ] Wrong credentials show error
- [ ] Registration wizard saves progress at each step
- [ ] Navigating away and back preserves registration progress
- [ ] Completing registration creates profile and clears draft
- [ ] Home shows loading skeleton then real data
- [ ] Home shows empty state when no appointments
- [ ] Refresh on home preserves logged-in state

---

## Files Modified

- `client/src/pages/splash.tsx`
- `client/src/pages/login.tsx`
- `client/src/pages/register/account.tsx`
- `client/src/pages/register/verify-email.tsx`
- `client/src/pages/register/personal-info.tsx`
- `client/src/pages/register/insurance-type.tsx`
- `client/src/pages/register/gkv-details.tsx`
- `client/src/pages/register/pkv-details.tsx`
- `client/src/pages/register/complete.tsx`
- `client/src/pages/home.tsx`
