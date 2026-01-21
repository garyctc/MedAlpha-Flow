# Phase 6: Secondary Flows + Verification

**Goal:** Complete telehealth, pharmacy, and SSO flows. Run final verification tests.

**Depends on:** All previous phases

---

## TH-001 to TH-010: Telehealth Flow

**Files:** `client/src/pages/telehealth/*.tsx`

### Symptom Selection
- [ ] Symptom selections persist to draft storage
- [ ] Can navigate back and forth without losing selections

### Booking
- [ ] Video consultation booking saves to appointments with `type: 'video'`
- [ ] Success screen shows confirmation

### Waiting Room
- [ ] Timer shows realistic wait estimate
- [ ] Can cancel while waiting

### Video Call (Simulated)
- [ ] End call creates history entry
- [ ] Summary saves to history

**Acceptance:**
- [ ] Complete telehealth flow creates appointment in localStorage
- [ ] Video appointment appears in appointments list
- [ ] Completed consultation appears in history

---

## Teleclinic Flow

**Files:** `client/src/pages/teleclinic/*.tsx`

### Teleclinic Simulated (`teleclinic/simulated.tsx`)

**Current Issues:**
- Hardcoded reasons (line 53-59)
- Hardcoded time slots (line 61-66)
- "Dr. Available Doctor" placeholder (line 30)

**Fixes:**
- [ ] Load user symptoms from draft/storage
- [ ] Generate dynamic time slots based on date
- [ ] Assign actual doctor name from constants

**Acceptance:**
- [ ] Shows user's selected symptoms
- [ ] Time slots vary by date
- [ ] Doctor name is realistic

---

## PHR-001 to PHR-003: Pharmacy

**Files:** `client/src/pages/pharmacy/*.tsx`

### PHR-001: Pharmacy Map (`map.tsx`)

**Current Issues:**
- Search input has no onChange (line 18-21)
- Fake grid map
- "3 pharmacies nearby" hardcoded (line 74)

**Fixes:**
- [ ] Wire search to filter pharmacies
- [ ] Replace grid with static map image (or keep as stylized view)
- [ ] Show actual pharmacy count
- [ ] Pins navigate to detail or list

**Acceptance:**
- [ ] Search filters pharmacies
- [ ] Count reflects actual results

### PHR-002: Pharmacy List (`list.tsx`)

**Current Issues:**
- Hardcoded pharmacy array (line 6-40)
- Filter buttons don't filter (line 52-64)

**Fixes:**

1. **Move pharmacy data to constants:**
```typescript
// client/src/lib/constants/pharmacies.ts
export const PHARMACIES = [
  { id: '1', name: 'Apotheke am Markt', ... },
];
```

2. **Wire filters:**
- [ ] "Open Now" filters by hours
- [ ] "24h" filters by is24Hour flag
- [ ] "Delivery" filters by hasDelivery flag

3. **Search:**
- [ ] Filter by name

**Acceptance:**
- [ ] Filters work
- [ ] Search works
- [ ] Empty state when no matches

### PHR-003: Pharmacy Detail (`detail.tsx`)

**Fixes:**
- [ ] Load pharmacy by ID from constants/storage
- [ ] Order/Reserve button saves to localStorage
- [ ] Show success toast on order

**Acceptance:**
- [ ] Detail page shows correct pharmacy
- [ ] Order creates record in storage

---

## SSO-001 to SSO-002: SSO Flow

**Files:** `client/src/pages/sso/*.tsx`

### SSO-001: Loading (`loading.tsx`)

**Fixes:**
- [ ] Auto-advance animation is fine (simulated)
- [ ] Save auth state on completion

### SSO-002: Complete Profile (`complete-profile.tsx`)

**Fixes:**
- [ ] Pre-populate any data from SSO (email at minimum)
- [ ] Save completed profile to localStorage
- [ ] Navigate to home

**Acceptance:**
- [ ] SSO flow creates logged-in state
- [ ] Profile is created with SSO email

---

## Static Pages & Error Handling

### FAQ Page
- [ ] Accordion items expand/collapse

### 404 Page
- [ ] Unknown routes show 404 page
- [ ] "Go Home" button works

---

## Final Verification Testing

Run through these complete user journeys:

### Journey 1: New User Registration
1. [ ] Open app fresh (clear localStorage)
2. [ ] See splash → login screen
3. [ ] Tap "Create Account"
4. [ ] Complete all registration steps
5. [ ] Arrive at home with profile created
6. [ ] Refresh → still logged in

### Journey 2: Book Appointment
1. [ ] From home, tap "Book Appointment"
2. [ ] Select type → specialty → location → doctor
3. [ ] Select date (verify past dates disabled)
4. [ ] Select time slot
5. [ ] Review booking (verify edit buttons work)
6. [ ] Confirm booking
7. [ ] See success screen
8. [ ] Navigate to appointments → see new appointment
9. [ ] Refresh → appointment still there

### Journey 3: Cancel Appointment
1. [ ] View appointment detail
2. [ ] Tap cancel
3. [ ] Confirm cancellation
4. [ ] Appointment removed from upcoming
5. [ ] Check history → cancelled appointment visible

### Journey 4: Edit Profile
1. [ ] Go to Profile
2. [ ] Tap Edit Profile
3. [ ] Change name
4. [ ] Save
5. [ ] Return to profile → name updated
6. [ ] Go to home → greeting uses new name

### Journey 5: Smart Match
1. [ ] Start Smart Match booking
2. [ ] Complete preferences
3. [ ] Watch matching animation
4. [ ] Accept match
5. [ ] Appointment created in list

### Journey 6: Telehealth
1. [ ] Book video consultation
2. [ ] Complete flow
3. [ ] Appointment appears with video type

### Journey 7: Data Persistence
1. [ ] Complete several actions
2. [ ] Close browser completely
3. [ ] Reopen → all data preserved
4. [ ] Logout → data cleared (or preserved based on design)

---

## Component Quality Verification

- [ ] **Toast:** Appears inside 375px mobile frame
- [ ] **Datepicker:** Past dates disabled, today highlighted
- [ ] **Loading:** All data screens show skeleton
- [ ] **Empty:** All list screens have empty state
- [ ] **Error:** Error boundary catches crashes
- [ ] **Buttons:** No empty onClick handlers
- [ ] **Search:** All search inputs filter content
- [ ] **Filters:** All filter chips filter data

---

## Final Checklist

Before marking audit complete:

- [ ] All localStorage functions work
- [ ] All screens have loading states
- [ ] All screens have empty states
- [ ] All forms validate input
- [ ] All buttons have handlers
- [ ] All search/filter UI works
- [ ] Toast positioned correctly
- [ ] Deep links work (refresh any page)
- [ ] Back navigation works everywhere
- [ ] Data persists across refresh
- [ ] Data persists across browser close

---

## Files Modified in Phase 6

- `client/src/pages/telehealth/*.tsx`
- `client/src/pages/teleclinic/*.tsx`
- `client/src/pages/pharmacy/map.tsx`
- `client/src/pages/pharmacy/list.tsx`
- `client/src/pages/pharmacy/detail.tsx`
- `client/src/pages/sso/loading.tsx`
- `client/src/pages/sso/complete-profile.tsx`

**New files:**
- `client/src/lib/constants/pharmacies.ts`
