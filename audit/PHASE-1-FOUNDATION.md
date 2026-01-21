# Phase 1: Foundation

**Goal:** Build the infrastructure and reusable components that all other phases depend on.

---

## 1.1 Toast Positioning

**File:** `client/src/App.tsx` (lines 226-231)

**Problem:** `<Toaster />` renders outside the 375px mobile frame

**Fix:**
- Move `<Toaster />` inside the mobile container div
- Constrain toast width to 375px
- Position at bottom of mobile frame, not browser window

---

## 1.2 Create Reusable Loading Skeleton

**Problem:** No consistent loading pattern across pages

**Create:** `client/src/components/ui/loading-skeleton.tsx`

```tsx
// Variants needed:
// - "card" - Single card placeholder
// - "list" - Multiple list items
// - "page" - Full page with header + content
// - "appointment" - Appointment card shape
```

**Usage pattern:**
```tsx
if (isLoading) return <LoadingSkeleton variant="list" count={3} />;
```

---

## 1.3 Create Error Boundary + Error UI

**Problem:** No error handling anywhere in the app

**Create:** `client/src/components/ui/error-boundary.tsx`

Features:
- Catches React errors
- Shows friendly error message
- Retry button to attempt recovery
- Styled to match app design

**Create:** `client/src/components/ui/error-state.tsx`

For non-crash errors (failed data loads, etc.):
```tsx
<ErrorState
  message="Could not load appointments"
  onRetry={() => refetch()}
/>
```

---

## 1.4 Create Empty State Component

**Problem:** Pages show blank when no data

**Create:** `client/src/components/ui/empty-state.tsx`

```tsx
<EmptyState
  icon={Calendar}
  title="No appointments yet"
  description="Book your first appointment to get started"
  action={{ label: "Book Now", onClick: () => navigate('/booking') }}
/>
```

---

## 1.5 Storage Layer Consolidation

**File:** `client/src/lib/storage.ts`

**Verify/Add these functions exist with proper types:**

```typescript
// Auth
getAuthState(): { isLoggedIn: boolean; userId?: string } | null
saveAuthState(state): void
clearAuthState(): void

// Profile
getUserProfile(): UserProfile | null
saveUserProfile(profile): void

// Insurance
getUserInsurance(): UserInsurance | null
saveUserInsurance(insurance): void

// Appointments
getUserAppointments(): Appointment[]
saveAppointment(appointment): void
updateAppointment(id, updates): void
deleteAppointment(id): void

// Booking Draft
getBookingDraft(): BookingDraft | null
saveBookingDraft(draft): void
clearBookingDraft(): void

// Registration Draft
getRegistrationDraft(): RegistrationDraft | null
saveRegistrationDraft(draft): void
clearRegistrationDraft(): void

// Settings
getUserSettings(): UserSettings
saveUserSettings(settings): void
```

**Add types to** `client/src/lib/storage.ts` or create `client/src/types/storage.ts`:

```typescript
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

interface UserInsurance {
  type: 'gkv' | 'pkv';
  provider: string;
  memberNumber: string;
  memberName?: string;
}

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

interface BookingDraft {
  type?: 'in-person' | 'video';
  specialty?: string;
  location?: string;
  doctor?: string;
  date?: string;
  time?: string;
}

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

interface UserSettings {
  language: 'de' | 'en';
  notifications: boolean;
}
```

---

## 1.6 Standardize Toast Usage

**Create helper:** `client/src/lib/toast-helpers.ts`

```typescript
import { toast } from 'sonner';

export const showSuccess = (message: string) => {
  toast.success(message);
};

export const showError = (message: string) => {
  toast.error(message);
};

export const showLoading = (message: string) => {
  return toast.loading(message);
};

export const dismissToast = (id: string | number) => {
  toast.dismiss(id);
};
```

---

## Verification Checklist

After completing Phase 1:

- [ ] Toast appears inside the 375px mobile frame
- [ ] `<LoadingSkeleton variant="list" />` renders correctly
- [ ] `<LoadingSkeleton variant="card" />` renders correctly
- [ ] `<ErrorBoundary>` catches errors and shows retry UI
- [ ] `<ErrorState />` displays with retry button
- [ ] `<EmptyState />` displays with icon, message, and CTA
- [ ] All storage functions exist and work with localStorage
- [ ] Storage types are defined and exported
- [ ] Toast helpers work (success, error, loading)

---

## Files Created/Modified

**New files:**
- `client/src/components/ui/loading-skeleton.tsx`
- `client/src/components/ui/error-boundary.tsx`
- `client/src/components/ui/error-state.tsx`
- `client/src/components/ui/empty-state.tsx`
- `client/src/lib/toast-helpers.ts`

**Modified files:**
- `client/src/App.tsx` (toast positioning)
- `client/src/lib/storage.ts` (consolidation + types)
