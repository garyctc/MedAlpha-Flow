# Design System Alignment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan.

**Goal:** Make the app UI, copy, and accessibility conform to the reference design system (`design-tokens.json`, `visual-guidelines.md`, `copy-guidelines.md`, `product-context.md`).

**Architecture:** Centralize tokens into generated CSS variables, consume only semantic tokens in UI primitives and screens. Add real i18n with German default and string externalization. Standardize motion and accessibility (touch targets, zoom, reduced motion, optional enhanced mode).

**Tech Stack:** Vite, React, Tailwind v4, shadcn/ui, Radix UI, lucide-react, wouter, framer-motion.

## References (Baseline)

- Reference docs (external):
  - `/Users/gary/Downloads/medalpha-raw-context/design-tokens.json`
  - `/Users/gary/Downloads/medalpha-raw-context/visual-guidelines.md`
  - `/Users/gary/Downloads/medalpha-raw-context/copy-guidelines.md`
  - `/Users/gary/Downloads/medalpha-raw-context/product-context.md`
- Current implementation (repo):
  - Tokens and theme: `client/src/index.css`
  - Fonts: `client/index.html`, `client/src/index.css`
  - Pages use hard-coded palette and English copy: `client/src/pages/**`
  - UI primitives: `client/src/components/ui/**`

## Constraints

- No backend work. UI-only.
- Keep existing flows and routes stable (`client/src/App.tsx`).
- Default locale must be German (`de`).
- No playful visual language. Healthcare trust aesthetic.

## Acceptance Criteria

- Colors, spacing, radius, shadows map to reference tokens (Variation A).
- No hard-coded hex colors in pages. No `text-slate-*` and `bg-white` for semantic UI except rare edge cases.
- Default touch targets meet 44px minimum. Enhanced mode meets 48px.
- Viewport allows zoom. No `user-scalable=no`.
- Motion is non-bouncy, tokenized, honors `prefers-reduced-motion`.
- Copy matches tone rules. German formal “Sie”. No exclamation unless true emergency.
- Locale switching changes actual displayed strings. Default `de`.

## Plan

### Task 1: Import reference tokens into repo

**Files:**
- Create: `shared/design-tokens.json`
- Create: `script/generate-design-tokens.ts`
- Modify: `package.json`

**Step 1: Copy tokens**
- Copy `/Users/gary/Downloads/medalpha-raw-context/design-tokens.json` to `shared/design-tokens.json`.

**Step 2: Add generator script**
- Create `script/generate-design-tokens.ts` that reads `shared/design-tokens.json` and emits:
  - `client/src/styles/tokens.css` with CSS vars for semantic tokens only.
  - `client/src/styles/tokens.ts` exporting a typed object for JS usage (motion durations, touch targets).

**Step 3: Wire generator into build**
Run: `node script/generate-design-tokens.ts`
Expected: `client/src/styles/tokens.css` and `client/src/styles/tokens.ts` created.

Run: `npm run build`
Expected: exit code 0.

**Step 4: Commit**
Run: `git add shared/design-tokens.json script/generate-design-tokens.ts client/src/styles/tokens.css client/src/styles/tokens.ts package.json`

### Task 2: Replace current theme vars with generated tokens

**Files:**
- Modify: `client/src/index.css`
- Modify: `client/src/main.tsx`
- Create: `client/src/styles/index.css`

**Step 1: Add CSS import pipeline**
- Create `client/src/styles/index.css` that imports `./tokens.css` then app styles.
- Update `client/src/main.tsx` to import `client/src/styles/index.css` instead of `client/src/index.css`.

**Step 2: Align semantic vars**
- In `client/src/index.css`, remove hand-authored HSL palette and radius comments.
- Keep only non-token prototype layout hacks if still needed (mobile frame), but migrate colors to tokens.

**Step 3: Verify build**
Run: `npm run build`
Expected: exit code 0.

### Task 3: Fix undefined CSS vars in primitives

**Files:**
- Modify: `client/src/components/ui/button.tsx`
- Modify: `client/src/components/ui/badge.tsx`
- Modify: `client/src/index.css` (or `client/src/styles/tokens.css` if those vars belong in tokens)

**Step 1: Decide**
- Either remove `--button-outline` and `--badge-outline` usage, or define them as semantic tokens.

**Step 2: Implement**
- Prefer: define `--button-outline` and `--badge-outline` as semantic tokens mapped to `border`.

**Step 3: Verify**
Run: `npm run build`
Expected: exit code 0.

### Task 4: Enforce touch targets in primitives

**Files:**
- Modify: `client/src/components/ui/button.tsx`
- Modify: `client/src/components/ui/input.tsx`
- Modify: `client/src/components/ui/checkbox.tsx` (and other interactive primitives used)

**Step 1: Set defaults**
- Default button height must be at least 44px.
- Default input height must be at least 44px.

**Step 2: Verify manually**
Run: `npm run dev`
Expected: common CTAs look unchanged, but are easier to tap.

### Task 5: Remove zoom lock

**Files:**
- Modify: `client/index.html`

**Step 1: Update viewport**
- Remove `maximum-scale=1, user-scalable=no`.

**Step 2: Verify**
Manual: browser zoom and pinch zoom work.

### Task 6: Replace fonts to match reference

**Files:**
- Modify: `client/index.html`
- Modify: `client/src/index.css` (or `client/src/styles/index.css`)

**Step 1: Use Open Sans**
- Swap Google Fonts import to Open Sans only.
- Set `--font-sans` and `--font-display` to Open Sans and fallbacks.

**Step 2: Verify**
Manual: German characters render. Layout does not overflow.

### Task 7: Add real i18n with German default

**Files:**
- Create: `client/src/i18n/index.ts`
- Create: `client/src/i18n/locales/de.json`
- Create: `client/src/i18n/locales/en.json`
- Modify: `client/src/main.tsx`
- Modify: `client/src/pages/profile/language.tsx`
- Modify: high-traffic pages first, then sweep.

**Step 1: Add deps**
- Add `i18next` and `react-i18next`.
Run: `npm i i18next react-i18next`
Expected: lockfile updates.

**Step 2: Bootstrap i18n**
- Initialize i18n in `client/src/i18n/index.ts`.
- Default locale `de`. Persist to localStorage.

**Step 3: Wire at app start**
- Import i18n setup in `client/src/main.tsx`.

**Step 4: Make language screen real**
- Replace toast-only behavior in `client/src/pages/profile/language.tsx` with locale switch.
- Remove emoji flags if copy rules require it.

**Step 5: Verify**
Manual: switching language changes strings app-wide where migrated.

### Task 8: Copy compliance sweep (high impact screens)

**Files (start set):**
- Modify: `client/src/pages/home.tsx`
- Modify: `client/src/pages/booking/success.tsx`
- Modify: `client/src/pages/booking/curaay-success.tsx`
- Modify: `client/src/pages/appointments/detail.tsx`
- Modify: `client/src/pages/appointments/index.tsx`

**Step 1: Remove exclamation and “successfully”**
- Replace with guideline patterns, and German formal variants.

**Step 2: Error copy format**
- Ensure errors are “what happened + what to do”.

**Step 3: Verify**
Manual: no slang, no hype, no ambiguity.

### Task 9: Semantic color migration (ban slate classes)

**Files:**
- Modify: `client/src/pages/**` (incremental)
- Modify: `client/src/components/ui/**` (only if needed)

**Step 1: Define rules**
- Backgrounds use `bg-background`, `bg-card`.
- Text uses `text-foreground`, `text-muted-foreground`.
- Borders use `border-border`.

**Step 2: Apply to top 5 screens**
- Replace `text-slate-*`, `bg-white`, `border-slate-*` with semantic tokens.

**Step 3: Verify**
Run: `npm run build`
Expected: exit code 0.

### Task 10: Radius and shadows standardization

**Files:**
- Modify: `client/src/components/ui/card.tsx`
- Modify: pages with `rounded-2xl` and ad hoc `shadow-*`

**Step 1: Match reference**
- Replace `rounded-2xl` with tokenized radius defaults.
- Replace gray shadows with blue-tinted shadows per tokens.

**Step 2: Verify**
Manual: UI reads “clinical trust”, not “startup gradient”.

### Task 11: Motion tokens and reduced motion

**Files:**
- Create: `client/src/lib/motion.ts`
- Modify: pages using framer spring transitions

**Step 1: Tokenize durations**
- Use `design-tokens` animation duration values.
- Default to tweens, no spring bounce.

**Step 2: Reduced motion**
- Disable non-essential animation when `prefers-reduced-motion` is set.

**Step 3: Verify**
Manual: reduced motion works. Transitions feel subtle.

### Task 12: Accessibility enhanced mode

**Files:**
- Create: `client/src/lib/accessibility.ts`
- Modify: `client/src/App.tsx`
- Modify: `client/src/pages/profile/index.tsx` (or settings entry)
- Modify: CSS root to support `.accessibility-enhanced`

**Step 1: Implement toggle**
- Add “Comfort Mode” toggle in profile/settings.
- Persist in localStorage.

**Step 2: Apply**
- Add `.accessibility-enhanced` on root container.
- Increase base font size and min touch target per tokens.

**Step 3: Verify**
Manual: toggling changes typography and tap targets.

## Out of Scope

- Real backend integrations.
- Partner branding system beyond token override plumbing.
- Visual redesign of flows. Only alignment to reference system.

## Known Risks

- Large diff due to semantic color migration.
- Copy sweep touches many files. Needs review for product correctness.
- i18n migration requires discipline. Partial migration is confusing.

## Open Questions

1. Do you want strict adherence to reference fonts (Open Sans only), or keep DM Sans for headings.

