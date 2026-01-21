# Phase 5: Profile

**Goal:** Make all profile screens load and save real data to localStorage.

**Depends on:** Phase 1 (Foundation), Phase 2 (Profile created during registration)

---

## PRF-001: Profile Main

**File:** `client/src/pages/profile/index.tsx`

**Current Issues:**
- Fallback "Max Mustermann" (line 22-25)
- Notifications button has empty onClick (line 79)

**Fixes:**

1. **Load real profile:**
```tsx
const [isLoading, setIsLoading] = useState(true);
const [profile, setProfile] = useState<UserProfile | null>(null);
const [insurance, setInsurance] = useState<UserInsurance | null>(null);

useEffect(() => {
  setTimeout(() => {
    setProfile(getUserProfile());
    setInsurance(getUserInsurance());
    setIsLoading(false);
  }, 300);
}, []);
```

2. **Loading state:**
- [ ] Show skeleton for profile header while loading

3. **Display real data:**
- [ ] Name from `profile.firstName + ' ' + profile.lastName`
- [ ] Email from `profile.email`
- [ ] Insurance type from `insurance.type`

4. **Wire notifications button:**
- [ ] Navigate to `/profile/notifications` or show toast "Coming soon"

5. **Menu items should navigate:**
- [ ] Edit Profile → `/profile/edit`
- [ ] Insurance → `/profile/insurance-gkv` or `/profile/insurance-pkv` based on type
- [ ] Language → `/profile/language`
- [ ] Help & Support → `/profile/support`
- [ ] Legal → `/profile/legal`

**Acceptance:**
- [ ] Shows loading then real profile data
- [ ] All menu items navigate correctly
- [ ] No hardcoded fallback names visible

---

## PRF-002: Edit Profile

**File:** `client/src/pages/profile/edit.tsx`

**Fixes:**

1. **Pre-populate from localStorage:**
```tsx
const profile = getUserProfile();
const [firstName, setFirstName] = useState(profile?.firstName || '');
const [lastName, setLastName] = useState(profile?.lastName || '');
const [email, setEmail] = useState(profile?.email || '');
const [phone, setPhone] = useState(profile?.phone || '');
```

2. **Track dirty state:**
```tsx
const [isDirty, setIsDirty] = useState(false);
// Set isDirty = true when any field changes
```

3. **Save functionality:**
```tsx
const [isSaving, setIsSaving] = useState(false);

const handleSave = async () => {
  setIsSaving(true);
  await new Promise(r => setTimeout(r, 500)); // Simulate API
  saveUserProfile({ ...profile, firstName, lastName, email, phone });
  setIsSaving(false);
  setIsDirty(false);
  showSuccess('Profile updated');
};
```

4. **Unsaved changes warning:**
```tsx
// On back button click or navigation attempt
if (isDirty) {
  // Show confirmation dialog: "Discard unsaved changes?"
}
```

5. **Validation:**
- [ ] Email format validation
- [ ] Required fields (firstName, lastName)

**Acceptance:**
- [ ] Form pre-populates with current profile
- [ ] Save shows loading state
- [ ] Save persists to localStorage
- [ ] Success toast on save
- [ ] Warning when leaving with unsaved changes

---

## PRF-003: Linked Accounts

**File:** `client/src/pages/profile/linked-accounts.tsx`

**Fixes:**

1. **Track linked state in storage:**
```tsx
interface LinkedAccounts {
  google: boolean;
  apple: boolean;
  insurance: boolean;
}
```

2. **Load and display:**
- [ ] Show which accounts are linked
- [ ] Toggle/button to link/unlink

3. **Save changes:**
- [ ] Update localStorage when linking/unlinking
- [ ] Show toast on change

**Acceptance:**
- [ ] Linked status persists across refreshes
- [ ] Can link/unlink accounts (simulated)

---

## PRF-004: Insurance Info (GKV)

**File:** `client/src/pages/profile/insurance-gkv.tsx`

**Fixes:**

1. **Load from localStorage:**
```tsx
const insurance = getUserInsurance();
```

2. **Display fields:**
- [ ] Provider name
- [ ] Member number
- [ ] Member name

3. **Edit mode:**
- [ ] Allow editing insurance details
- [ ] Save button with loading state
- [ ] Persist to localStorage
- [ ] Success toast

**Acceptance:**
- [ ] Displays real insurance data
- [ ] Can edit and save
- [ ] Changes persist

---

## PRF-005: Insurance Info (PKV)

**File:** `client/src/pages/profile/insurance-pkv.tsx`

**Same fixes as GKV:**
- [ ] Load from localStorage
- [ ] Display real data
- [ ] Edit and save functionality

---

## PRF-006: Language Settings

**File:** `client/src/pages/profile/language.tsx`

**Fixes:**

1. **Load current language:**
```tsx
const settings = getUserSettings();
const [language, setLanguage] = useState(settings.language || 'de');
```

2. **Apply immediately on change:**
```tsx
const handleLanguageChange = (lang: 'de' | 'en') => {
  setLanguage(lang);
  saveUserSettings({ ...settings, language: lang });
  i18n.changeLanguage(lang); // Apply immediately
  showSuccess('Language updated');
};
```

**Acceptance:**
- [ ] Current language is pre-selected
- [ ] Changing language updates immediately
- [ ] Setting persists across refreshes

---

## PRF-007: Help & Support

**File:** `client/src/pages/profile/support.tsx`

**Fixes:**

1. **Contact form (if present):**
- [ ] Loading state on submit
- [ ] Success toast: "Message sent"
- [ ] Clear form after submit

2. **FAQ section:**
- [ ] Expandable/collapsible items work

3. **Contact options:**
- [ ] Email link: `mailto:support@medallpha.com`
- [ ] Phone link: `tel:+49...`

**Acceptance:**
- [ ] Contact form submits with feedback
- [ ] FAQ items expand/collapse
- [ ] Contact links work

---

## PRF-008: Legal

**File:** `client/src/pages/profile/legal.tsx`

**Current Issues:**
- Terms link has empty onClick (line 29)

**Fixes:**
- [ ] Wire links to actual content pages or external URLs
- [ ] Or show content inline in expandable sections

**Acceptance:**
- [ ] All legal links work or show content

---

## Logout Flow

**Location:** Profile menu or settings

**Fixes:**
1. **Logout button:**
```tsx
const handleLogout = () => {
  clearAuthState();
  // Optionally clear all user data: localStorage.clear()
  navigate('/login');
  showSuccess('Logged out');
};
```

2. **Confirmation:**
- [ ] "Are you sure you want to log out?" dialog

**Acceptance:**
- [ ] Logout clears auth state
- [ ] Redirects to login
- [ ] Cannot access protected routes after logout

---

## Verification Checklist

After completing Phase 5:

- [ ] Profile main shows real name and email
- [ ] Edit profile pre-populates correctly
- [ ] Edit profile saves to localStorage
- [ ] Unsaved changes warning works
- [ ] Insurance info displays and edits correctly
- [ ] Language change applies immediately
- [ ] Support/FAQ page works
- [ ] Legal links work
- [ ] Logout clears state and redirects

---

## Files Modified

- `client/src/pages/profile/index.tsx`
- `client/src/pages/profile/edit.tsx`
- `client/src/pages/profile/linked-accounts.tsx`
- `client/src/pages/profile/insurance-gkv.tsx`
- `client/src/pages/profile/insurance-pkv.tsx`
- `client/src/pages/profile/language.tsx`
- `client/src/pages/profile/support.tsx`
- `client/src/pages/profile/legal.tsx`
