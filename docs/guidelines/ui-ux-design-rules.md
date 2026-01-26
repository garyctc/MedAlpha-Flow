# DocliQ UI/UX Design Rules (Strict)

## 1) Brand + Voice (Non‑negotiable)
- **Promise:** “Dein Gesundheitstermin. Endlich einfach.”
- **Core values:** Trust + efficiency + humanity in every screen and interaction.
- **Tone:** warm, clear, professional (never cold/clinical), always **Du‑Form**.
- **Language:** no jargon; explain simply; be helpful and respectful.
- **Errors:** state **cause + fix**, avoid blame, avoid technical details.
- **CTAs:** imperative, max 3 words, specific (e.g., “Termin buchen”).
- **Empty states:** positive framing, propose next step, no lorem ipsum.

## 2) Visual System
### Color roles (use by role, not by feel)
- **Cream:** background base for calm, trusted interfaces.
- **Teal:** primary actions/interactive elements (CTAs).
- **Charcoal:** primary text/depth.
- **Slate:** secondary text/support structure.
- **Coral:** subtle accent to humanize, never dominant.

> Note: Hex values in `docs/guidelines/ui-ux-tokens.json` were sampled from the brand guide palette image and should be verified against any official values if those are provided elsewhere.

### Typography
- **Single geometric sans‑serif** for all UI text (one font only).
- **Weights:** 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold).
- **Hierarchy:** consistent scale across H1/H2/subhead/body.
- **Body text:** **>=16px** at all breakpoints.

### Iconography
- **Lucide icons only**, consistent stroke.
- Sizes: **16 / 20 / 24 / 32**.

## 3) UI Components + Layout
- **Max 3 primary actions per screen.** Highlight the next step.
- **Touch targets >=44px** (mobile and touch devices).
- **Standard patterns** for critical flows; no experimental UI.
- **Booking flow = 4 steps** with progress indicator.

### Responsive rules
- **<768px:** bottom nav, touch‑optimized, hamburger menu.
- **768–1024px:** 2‑column layouts, hybrid touch/mouse.
- **>1024px:** 3+ columns, full nav, hover states.

## 4) UX Principles
- **Cognitive load:** reduce options; next step is visually dominant.
- **Familiarity:** standard nav and icons in key flows.
- **Chunking:** break complex tasks into short steps.

## 5) Motion
- **Purposeful only:** feedback, orientation, delight.
- **Durations:** 200–300ms, ease‑out.
- **No blinking/long animations** (>500ms) or motion in critical flows.
- **Respect reduced motion.**

## 6) Accessibility (WCAG 2.1 AA minimum)
- **Contrast:** >=4.5:1 for text, >=3:1 for large text.
- **Keyboard navigation** + visible focus indicators.
- **No text in images.**
- **Touch targets >=44x44px.**
- **No time limits** unless essential; provide alternatives.

## 7) Content Patterns
- **Success:** confirm + next expectation.
- **Error:** cause + fix (no blame).
- **Warning/Info:** concise, actionable.
- **Placeholders:** examples (e.g., “z.B. Hausarzt, Kardiologie”).
- **Buttons:** imperative, <=3 words.
