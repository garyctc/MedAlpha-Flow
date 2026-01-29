# Localization & i18n Full Sweep Design

Date: 2026-01-29
Owner: Codex

## Context
The app is German‑first but large parts of the UI still render hard‑coded English (and mixed language). Locale switching to `de` does not fully localize screens, data‑driven content, or formatting. We need a full sweep so **all flows and all screens** render German when the language setting is switched, with consistent formatting and accessibility behavior.

## Goals
- Every screen and flow fully localizes to German when `locale=de`.
- All UI strings come from `react-i18next` keys with `en` + `de` entries.
- Locale‑aware formatting for dates, times, numbers, and lists.
- Localized data sources (notifications, pharmacy constants, static/legal copy).
- Runtime HTML `lang` attribute updates on language change.
- Automated checks to prevent regression (missing keys, hard‑coded strings).

## Non‑Goals
- Adding new locales beyond `de`/`en`.
- Copywriting beyond required translations (no new marketing copy).

## Architecture & Data Approach
1) **i18n keys**: Move all user‑visible strings to `client/src/i18n/locales/en.json` and `de.json` with feature‑scoped namespaces (`booking.*`, `notifications.*`, `prescriptions.*`, `pharmacy.*`, `static.*`, `auth.*`, `profile.*`, `telehealth.*`).
2) **Localized data**: Where content lives in constants (pharmacies, notifications), add locale‑keyed fields or selectors (e.g., `localizedNotifications[locale]`, `pharmacy.status[locale]`, `hours[locale]`).
3) **Formatting**: Use `formatLocalDate`/`formatLocalTime` consistently. Use `Intl.DateTimeFormat` / `toLocaleString(locale)` for numbers, months, weekdays.
4) **Accessibility**: Localize ARIA labels and update `document.documentElement.lang` whenever language changes.
5) **Default locale**: Align `DEFAULT_LOCALE` with German‑first requirements (set to `de`) unless product decides otherwise.

## Testing & Quality Gates (TDD)
- Extend existing i18n tests for key parity and string coverage.
- Add a “no hard‑coded UI strings” test (exclude `locales/*.json`).
- Add tests for locale formatting (dates, times, numbers) and HTML `lang` updates.
- Use red‑green‑refactor for each behavior change.

## Rollout Plan
1) Foundational i18n helpers + tests (key parity, HTML `lang`, formatting).
2) Booking + Home + Notifications.
3) Prescriptions + Pharmacy.
4) Auth/Registration + Profile.
5) Static/Legal/Support/FAQ/Glossary.
6) Final sweep + automated checks.

## Risks & Mitigations
- **Large diff size**: mitigate by batching flows and keeping tests per batch.
- **Copy accuracy**: align with `docs/guidelines/copy-guidelines.md` and review with product.
- **Formatting regressions**: enforce tests and locale utilities.

## Success Criteria
- All screens render fully German when `locale=de` and English when `locale=en`.
- All tests pass, including new i18n enforcement tests.
- No hard‑coded user‑visible strings remain in UI code.
