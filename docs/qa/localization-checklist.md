# Localization QA Checklist (German/English)

Purpose: Verify every screen and flow fully switches to German when the app language is set to `de`, and stays consistent with DocliQ copy rules.

Sources of truth:
- `docs/guidelines/copy-guidelines.md`
- `docs/guidelines/product-designer-checklist.md` (Localization row)
- `client/src/i18n/index.ts`
- `client/src/i18n/locales/en.json`
- `client/src/i18n/locales/de.json`

How to use:
1) Set language to German in-app (Profile -> Language).
2) Walk each flow and screen in the sitemap / userflow inventory.
3) Check every item below per screen. Mark gaps and create follow-up tickets.
4) Repeat once in English to catch missing fallbacks or incorrect keys.

---

## A) Global configuration and switching
- [ ] App loads with correct initial locale (stored preference wins).
- [ ] Switching language updates immediately across the UI.
- [ ] Language choice persists after refresh and new session.
- [ ] `SUPPORTED_LOCALES` and default locale are correct in `client/src/i18n/index.ts`.
- [ ] `fallbackLng` behavior is acceptable (English used only when key missing).
- [ ] `getLocale()` and `setLocale()` are used consistently (no ad-hoc locale state).
- [ ] `<html lang>` reflects the active language (accessibility + SEO).

## B) Visible UI text (all screens)
- [ ] All headings, labels, buttons, and helper text are localized via `t()`.
- [ ] No hard-coded English strings in React components or constants.
- [ ] Error messages, empty states, toasts, tooltips, and banners are localized.
- [ ] Text in dialogs, drawers, and popovers is localized.
- [ ] Navigation labels and tab titles are localized.
- [ ] Content inside reusable UI components is localized (including placeholders).

## C) Dynamic and interpolated text
- [ ] Interpolation uses i18n syntax (e.g., `{{date}}`) and the variables exist.
- [ ] Variable order and grammar are correct for German.
- [ ] Plurals use correct i18n plural forms (one/other).
- [ ] Gendered or role-specific terms are neutral or localized appropriately.

## D) Dates, times, numbers, and units
- [ ] Dates use locale-aware formatting (`formatLocalDate`).
- [ ] Times use locale-aware formatting (`formatLocalTime`).
- [ ] Day/month names are locale-aware (`toLocaleDateString` with locale).
- [ ] Numbers use `toLocaleString` with the active locale.
- [ ] Units are localized (e.g., duration, distance, measurements).
- [ ] Sorting uses locale-aware collation where it affects ordering.

## E) Notifications and system messages
- [ ] In-app notifications are localized (including dynamic data).
- [ ] Push notification copy is localized (if applicable).
- [ ] History/notification feed entries reflect the active language.
- [ ] Toasts are short and localized per copy guidelines.

## F) Forms and validation
- [ ] Field labels, placeholders, and helper text are localized.
- [ ] Validation errors are localized and follow the tone rules.
- [ ] Required/optional indicators and inline hints are localized.

## G) Accessibility and ARIA
- [ ] All `aria-label`, `aria-describedby`, `aria-live` content is localized.
- [ ] Screen reader reads German correctly (page language and labels).
- [ ] Keyboard focus order and announcements remain correct after switch.

## H) Layout resilience (German expansion)
- [ ] German strings do not overflow buttons or tabs.
- [ ] No critical text truncation or clipping in German.
- [ ] Line wrapping remains readable (no awkward breaks).
- [ ] Multi-step flows still fit in small devices with longer German text.
- [ ] Icons and controls maintain spacing with longer labels.

## I) Content sources and data
- [ ] Any server-provided or CMS content has German variants.
- [ ] Static data files are localized (fixtures, constants, mock data).
- [ ] No embedded English text inside images or icons.
- [ ] Legal/consent copy has German versions and is discoverable.

## J) Language selection screen (Profile -> Language)
- [ ] Current language is pre-selected and clearly shown.
- [ ] Selecting German switches the app immediately.
- [ ] Confirmation toast is localized.
- [ ] Returning to the profile hub reflects the new language.

---

## Per-screen walkthrough checklist (repeat for every screen)
- [ ] All visible text is German after switching.
- [ ] Dates/times/units follow German formatting.
- [ ] No truncated text on primary CTAs or headers.
- [ ] Error/empty states are localized and clear.
- [ ] ARIA labels are localized.
- [ ] Any dynamic content (names, specialties, statuses) reads naturally in German.

---

## Automated checks (optional but recommended)
- [ ] `npm run copy:lint` passes (copy rules + translation hygiene).
- [ ] i18n key coverage tests pass (e.g., `client/src/test/i18n-keys.test.ts`).
- [ ] No hard-coded English strings remain (scan with ripgrep).

Suggested scan commands:

```bash
rg -n '"[A-Za-z].*"' client/src --glob '!**/locales/*.json'
rg -n "'[^']*[A-Za-z][^']*'" client/src --glob '!**/locales/*.json'
```

---

## Definition of done
- [ ] Every screen in every flow passes sections A through J.
- [ ] German copy follows `docs/guidelines/copy-guidelines.md`.
- [ ] No untranslated strings remain in UI or system messages.
- [ ] Any missing translations are logged with file path + key.
