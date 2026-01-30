# Localization Audit Report (German switch)

Date: 2026-01-29

Scope
- Static review of UI code and content in `client/src` + core i18n setup.
- Focus: whether switching language to German (`de`) fully localizes screens/flows.
- Method: file scan for hard-coded UI strings, date/number formatting, and i18n usage.

Summary
- Major coverage gaps: many flows/pages do not use i18n at all and contain hard-coded English (or mixed English/German), so switching to German will not fully localize the UI.
- Locale-aware formatting is inconsistent (dates, times, numbers).
- Accessibility language signals (HTML `lang`, ARIA labels) are not localized consistently.

---

## Findings (ordered by severity)

### Critical
1) Large sections of the app do not use i18n and contain hard-coded English strings, so German switching does not apply to entire flows.
   - Notifications flow: `client/src/pages/notifications/list.tsx` (e.g., lines 14, 76-78, 122-129, 146) and `client/src/pages/notifications/detail.tsx` (lines 31-33, 56).
   - Prescriptions flow: `client/src/pages/prescriptions/list.tsx` (lines 9-114, 70-99) and `client/src/pages/prescriptions/pkv-error.tsx` (lines 11-40) show English and mixed language.
   - Pharmacy flow: `client/src/pages/pharmacy/list.tsx` (lines 9-98, 134-135) and `client/src/pages/pharmacy/map.tsx` (lines 92-114) are hard-coded English.
   - Telehealth flow: `client/src/pages/telehealth/confirmation.tsx` (lines 73-89) uses English-only text.
   - Static/legal/support content: `client/src/pages/static/terms.tsx` (lines 24-96) and `client/src/pages/static/about.tsx` (lines 31-93) are English-only.
   - Authentication/registration/profile flows: `client/src/pages/profile/edit.tsx` (lines 222-301) and `client/src/pages/register/insurance-type.tsx` (lines 103-136) include many hard-coded strings.

2) Pharmacy data is English-only in constants, so even a localized UI still renders English status/hours.
   - `client/src/lib/constants/pharmacies.ts` (lines 11-18, 35-44, 85-92, 109-115) uses English `status`, `hours`, and `hoursDetail`.

### High
3) Locale-specific formatting is inconsistent or fixed to English.
   - Notifications list timestamps are fixed format without locale handling: `client/src/pages/notifications/list.tsx:14`.
   - Date badge month is hard-coded to `en-US`: `client/src/components/ui/date-badge.tsx:13`.
   - Calendar `data-day` uses browser default locale instead of app locale: `client/src/components/ui/calendar.tsx:196`.

4) Booking flow uses English fallback values in core screens.
   - Smart Match success: `client/src/pages/booking/smart-match-success.tsx` (lines 10-14, 25-28, 48-93).
   - Booking review: `client/src/pages/booking/review.tsx` (lines 13-17, 38, 92-117).

### Medium
5) HTML language attribute is static and not updated on language switch.
   - `client/index.html:2` is fixed `lang="en"`.
   - No runtime update in `client/src/main.tsx`.

6) Number formatting does not honor app locale in chart tooltip values.
   - `client/src/components/ui/chart.tsx:243` uses `toLocaleString()` with no locale.

7) Accessibility labels are English-only in at least one core screen.
   - Home notifications button `aria-label="Notifications"`: `client/src/pages/home.tsx:125`.

### Low
8) Default locale is English even though product guidelines state German primary; this may be a requirements mismatch.
   - `client/src/i18n/index.ts:13` (`DEFAULT_LOCALE: "en"`).

---

## Coverage hot-spots (pages without i18n hooks)
The following page files do not import `useTranslation`, which strongly suggests hard-coded copy or missing localization coverage. These should be prioritized for a pass-by-pass localization sweep.

- `client/src/pages/booking/smart-match-processing.tsx`
- `client/src/pages/booking/smart-match-success.tsx`
- `client/src/pages/booking/success.tsx`
- `client/src/pages/history/index.tsx`
- `client/src/pages/login.tsx`
- `client/src/pages/not-found.tsx`
- `client/src/pages/notifications/list.tsx`
- `client/src/pages/pharmacy/list.tsx`
- `client/src/pages/pharmacy/map.tsx`
- `client/src/pages/placeholder.tsx`
- `client/src/pages/prescriptions/*` (multiple files)
- `client/src/pages/profile/data.tsx`
- `client/src/pages/profile/edit.tsx`
- `client/src/pages/profile/insurance-gkv.tsx`
- `client/src/pages/profile/insurance-pkv.tsx`
- `client/src/pages/profile/legal.tsx`
- `client/src/pages/profile/linked-accounts.tsx`
- `client/src/pages/profile/support.tsx`
- `client/src/pages/register/*` (multiple files)
- `client/src/pages/splash.tsx`
- `client/src/pages/sso/*` (multiple files)
- `client/src/pages/static/*` (multiple files)
- `client/src/pages/telehealth/*` (multiple files)

---

## Recommended next steps
1) Prioritize localization for the core flows (Notifications, Booking, Prescriptions, Pharmacy, Telehealth, Register/Login, Profile).
2) Move all hard-coded UI strings into i18n keys; remove English-only fallback values for production copy.
3) Localize data constants (e.g., pharmacy `status`, `hours`, `hoursDetail`) and drive them via i18n or formatters.
4) Normalize date/time/number formatting using locale-aware helpers (`formatLocalDate`, `formatLocalTime`, `Intl.DateTimeFormat` with app locale).
5) Update HTML `lang` at runtime when language changes for accessibility.

