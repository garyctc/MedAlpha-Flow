# Visual Guidelines

**Version:** 2.0.0
**Last Updated:** 2026-01-27

---

## Related Documents

| Document | Purpose |
|----------|---------|
| `design-tokens.json` | Machine-readable token VALUES |
| `design-system-rules.md` | Implementation PATTERNS (how to code) |
| `copy-guidelines.md` | Tone and microcopy RULES |

---

## 1. Visual Identity Overview

**DocliQ** combines trust and efficiency, a digital companion that makes health appointments as simple as they should be.

**Name etymology:**
- **Doc** = Doctor, Trust, Medicine
- **liQ** = Click + IQ + Quick

**Brand promise:** "Health should never be complicated. With one click, we take care of the rest."

### Three Pillars

| Trust | Efficiency | Humanity |
|-------|------------|----------|
| Professional and secure, like visiting a doctor, just digital | To an appointment in seconds. No waiting queues, no paperwork | Warmth in technology. Health is personal |

### Core Aesthetic

- **Warm and trustworthy**, not sterile or cold
- **Clean and clear**, prioritizing readability
- **Accessible for everyone**, from digital natives to beginners
- **Teal-dominant** for modern trust
- **Coral accents** for warmth and humanity

### Key Visual Qualities

| Quality | Expression |
|---------|------------|
| Trustworthy | Teal primary color, clean typography, consistent spacing |
| Accessible | Large touch targets, high contrast (4.8:1 min), clear hierarchy |
| Efficient | Minimal decoration, purposeful whitespace, direct actions |
| Warm | Cream backgrounds, coral highlights, friendly motion |

---

## 2. Design Principles

### 2a. Design Direction Rationale

**Why teal-dominant:**
- Teal combines the trust of blue with the warmth of green.
- Modern and distinctive without being clinical.
- Conveys both professionalism and approachability.

**Why cream backgrounds (#FAF8F5):**
- Warmer than cool grays, aligns with "Warmth in Technology" pillar.
- Reduces eye strain for extended use.
- Creates calm, welcoming environment.

**Why moderate border radius (8-20px):**
- Professional appearance without being harsh.
- Softer than clinical/corporate, but not playful.
- Balances trust with modernity.

**Why charcoal-tinted shadows:**
- Warm depth that complements cream backgrounds.
- Consistent with charcoal text color.
- Sophisticated without clinical coldness.

**Why DM Sans:**
- Modern, geometric sans-serif with excellent readability.
- Clean and technical, yet friendly.
- Excellent German character support (umlauts, ß).
- Medium weight (500) adds typographic flexibility.

### 2b. Anti-Patterns

Avoid these choices that contradict DocliQ's aesthetic:

**Visual:**
- **Cool gray backgrounds**. Use cream for warmth.
- **Blue primary colors**. Use teal for modern trust.
- **Very rounded corners (24px+)** on primary elements. Feels too casual.
- **Low contrast text**. Maintain 4.8:1 minimum.
- **Decorative illustrations** without purpose. Every visual must inform or guide.

**Interaction:**
- **Overly bouncy animations**. Keep motion subtle and purposeful.
- **Gamification elements**. This is healthcare, not a game.
- **Hidden navigation**. Users must always know where they are.
- **Animations over 500ms**. Respect users' time.

**Content:**
- **Casual or trendy language**. Warm but professional.
- **Medical jargon without explanation**. Clear for all literacy levels.

### 2c. Universal Accessibility Principles

DocliQ is designed for everyone, from digital natives to beginners. These principles apply universally:

| Principle | Implementation |
|-----------|----------------|
| Large touch targets | Minimum 44px, critical actions 48px |
| High contrast | 4.8:1 minimum for all text |
| Clear hierarchy | Primary action always visually prominent |
| Step indicators | Always show progress in multi-step flows |
| Readable text | 16px minimum body text |
| Visible focus | Clear focus rings for keyboard navigation |

---

## 3. Color System

### 3a. Color Philosophy

DocliQ's palette combines professionalism with warmth. Teal for action, Slate for calm, Coral for humanity.

**Always use semantic tokens in components.** Primitives are for edge cases only.

### 3b. Primary Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | #12a395 | Primary CTAs, headers, links, active states |
| `primaryLight` | #1ab8a8 | Hover states, secondary emphasis |
| `primaryDark` | #0e8277 | Pressed states, text on light backgrounds |

### 3c. Secondary & Accent

| Token | Hex | Usage |
|-------|-----|-------|
| `secondary` (slate) | #5e7a86 | Secondary text, subdued elements, borders |
| `accent` (coral) | #ebba73 | Highlights, badges, promotions, warmth moments |

**Coral usage rules:**
- Promotional badges ("New", "Popular", "Recommended")
- Featured highlights (top doctors, best times)
- Warmth/delight moments (booking confirmation celebration)
- **Never** for semantic states (success/warning/error)

### 3d. Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `success` | #2E7D32 | Confirmation, completed bookings, positive feedback |
| `warning` | #F59E0B | Pending states, approaching deadlines, caution |
| `error` | #DC2626 | Validation errors, failed states, connection issues |

### 3e. Neutral Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | #FAF8F5 | App background, screen base (cream) |
| `backgroundCard` | #FFFFFF | Cards, elevated surfaces |
| `foreground` | #1c2a38 | Primary text (charcoal) |
| `foregroundSecondary` | #5e7a86 | Secondary text, labels (slate) |
| `foregroundMuted` | #8E94A7 | Placeholders, metadata, disabled |
| `border` | #E2E8F0 | Dividers, card borders |

---

## 4. Typography

### 4a. Font Family

**Primary:** DM Sans (Google Fonts)
**Weights:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
**Fallback:** system-ui, sans-serif

### 4b. Type Scale (Mobile App)

| Style | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| H1 | 28px | 700 | 36px | Page titles |
| H2 | 22px | 600 | 30px | Section headers |
| H3 | 18px | 600 | 26px | Card titles, subsections |
| Body Large | 18px | 400 | 28px | Introductions, key info |
| Body | 16px | 400 | 24px | Default text |
| Label | 14px | 500 | 20px | Form labels, navigation |
| Caption | 14px | 400 | 20px | Metadata |
| Small | 12px | 400 | 16px | Fine print, timestamps |

**Note:** DocliQ branding shows larger sizes (72px/48px/32px) for marketing materials. The mobile app uses this adapted scale.

### 4c. German Language Considerations

- German text is 20-30% longer than English equivalents.
- Design layouts with flexible widths, not fixed pixel counts.
- Test all UI with German text before English.
- Special characters (ä, ö, ü, ß) must render correctly.

---

## 5. Spacing & Layout

### 5a. Spacing Scale

```
4px (xs) → 8px (sm) → 12px → 16px (md) → 20px → 24px (lg) → 32px (xl) → 48px (2xl)
```

### 5b. Screen Layout

| Element | Value |
|---------|-------|
| Screen padding | 16-20px |
| Card padding | 16-20px |
| Section gap | 24px |
| Component gap | 12-16px |
| Minimum width | 320px |

### 5c. Touch Targets

| Mode | Minimum Size |
|------|--------------|
| Standard | 44 × 44px |
| Critical actions | 48 × 48px |

All interactive elements must meet minimum touch target size.

---

## 6. Shapes & Border Radius

### 6a. Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| `sm` | 8px | Chips, badges, small elements |
| `md` | 12px | Inputs, buttons, small cards |
| `lg` | 16px | Cards, panels |
| `xl` | 20px | Bottom sheets, modals |
| `pill` | 9999px | Pill buttons, avatars |

### 6b. Radius Philosophy

- Moderate radius creates professional, approachable feel.
- Not too sharp (clinical/cold), not too round (playful/casual).
- Consistent application builds trust.

---

## 7. Shadows & Elevation

### 7a. Shadow System

All shadows use charcoal tint (rgba(28, 42, 56, *)) for warm depth.

| Token | Value | Usage |
|-------|-------|-------|
| `soft` | 0 1px 3px rgba(28, 42, 56, 0.06) | Subtle depth, list items |
| `card` | 0 2px 8px rgba(28, 42, 56, 0.08) | Cards, default elevation |
| `elevated` | 0 4px 16px rgba(28, 42, 56, 0.12) | Modals, sheets, overlays |

### 7b. Elevation Hierarchy

1. **Background (0)**: Screen background, no shadow
2. **Surface (1)**: Cards, panels (`shadow-card`)
3. **Elevated (2)**: Modals, bottom sheets (`shadow-elevated`)

---

## 8. Iconography

### 8a. Icon Style

- **Source:** Lucide React (standard for DocliQ)
- **Stroke weight:** 2px consistent
- **Style:** Rounded corners, simple shapes
- **Color:** Inherit from parent (foreground, primary, etc.)

### 8b. Icon Sizing

| Context | Size |
|---------|------|
| Inline with text | 20px |
| Buttons, navigation | 24px |
| Feature illustrations | 32-48px |

### 8c. Icon Colors

| State | Color |
|-------|-------|
| Default | foregroundSecondary (#5e7a86) |
| Active/Selected | primary (#12a395) |
| Disabled | foregroundMuted (#8E94A7) |
| Accent | coral (#ebba73) |

---

## 9. Visual Hierarchy

### 9a. Hierarchy Principles

1. **Primary actions** are most prominent (filled teal buttons).
2. **Secondary actions** are visible but subdued (outlined or ghost buttons).
3. **Destructive actions** use error red, positioned away from primary actions.
4. **Information hierarchy** follows: title → key data → metadata.

### 9b. Card Hierarchy

```
┌─────────────────────────────────┐
│ [Icon] Title              Badge │  ← Most prominent
│                                 │
│ Key information or action       │  ← Primary content
│                                 │
│ Secondary details, metadata     │  ← Subdued (caption style)
└─────────────────────────────────┘
```

---

## 10. Animation & Interaction

### 10a. Animation Principles

- **Purposeful:** Every animation guides attention, confirms action, or adds delight.
- **Subtle:** Smooth and refined, not bouncy or jarring.
- **Responsive:** 200-300ms for most interactions.
- **Reduced motion:** Honor `prefers-reduced-motion` setting.

### 10b. Timing

| Interaction | Duration | Easing |
|-------------|----------|--------|
| Button press | 200ms | ease-out |
| Hover effects | 200ms | ease-out |
| Page transition | 300ms | ease-in-out |
| Modal open/close | 300ms | ease-out |
| Accordion expand | 700ms | ease-out |
| Skeleton loading | 1.5s | linear (pulse) |

### 10c. Feedback Patterns

| Interaction | Effect |
|-------------|--------|
| Button hover | scale(1.05) or lift (translateY + shadow) |
| Button press | scale(0.98), slight opacity change |
| Success | Green checkmark animation (brief) |
| Error | Subtle shake on invalid input |
| Loading | Skeleton screens, not spinners (where possible) |

### 10d. Do's and Don'ts

| Do | Don't |
|----|-------|
| Fast, subtle transitions (200-300ms) | Long animations (>500ms) |
| Consistent easing functions | Blinking/pulsing elements |
| Animation on interaction | Animation on critical flows |
| Respect reduced motion | Complex keyframe sequences |
| Hover scale/lift for delight | Bouncy spring physics |

---

## 11. Accessibility

### 11a. Overview

DocliQ meets WCAG 2.1 AA compliance as a minimum standard. Accessibility is built into the base design, with an optional enhanced mode for users who need it.

### 11b. Baseline Accessibility

| Property | Standard |
|----------|----------|
| Contrast ratio | 4.8:1 minimum |
| Touch targets | 44px minimum |
| Base font size | 16px |
| Focus indicators | Visible, 2px ring |
| Keyboard navigation | Full support |

### 11c. Four Accessibility Pillars

| Visual | Motor | Auditory | Cognitive |
|--------|-------|----------|-----------|
| Contrast min. 4.8:1 | Full keyboard navigation | Subtitles for videos | Clear, simple language |
| Font size min. 16px | Skip links available | No audio autoplay | Consistent navigation |
| Focus indicators visible | Touch targets 44px+ | Visual alternatives | Errors clearly described |
| No text in images | No time limits | Transcripts available | Help always accessible |

### 11d. Enhanced Mode (Optional)

For users requiring additional accommodation:

| Property | Standard | Enhanced |
|----------|----------|----------|
| Base font size | 16px | 18px |
| Touch targets | 44px | 48px |
| Contrast ratio | 4.8:1 | 7:1 |
| Line height | 1.5 | 1.6 |
| Focus ring width | 2px | 3px |

```css
/* Enhanced mode class applied to root */
.accessibility-enhanced {
  --font-size-body: 1.125rem;
  --touch-target-min: 48px;
  --focus-ring-width: 3px;
}
```

---

## 12. Component Style Summary

### Buttons

| Type | Style |
|------|-------|
| Primary | Filled teal (#12a395), white text, rounded-md |
| Secondary | Outlined teal, teal text, rounded-md |
| Ghost | No border, teal text |
| Destructive | Filled error red (#DC2626), white text |

### Cards

- White background (#FFFFFF)
- Rounded-lg (16px)
- Shadow-card (charcoal-tinted)
- Padding 16-20px

### Inputs

- Border: slate (#5e7a86) at 40% opacity
- Rounded-md (12px)
- Padding: 12-16px
- Focus: 2px teal ring

### Bottom Sheets

- Rounded-xl top corners (20px)
- Shadow-elevated
- White background
- Drag handle indicator

---

## 13. Emotional Feel

The DocliQ experience should feel:

| Quality | Not |
|---------|-----|
| Warm | Cold |
| Trustworthy | Clinical |
| Clear | Boring |
| Efficient | Rushed |
| Helpful | Patronizing |
| Modern | Trendy |

**Target emotion:** "I trust this app with my health. It feels warm and gets things done quickly."

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | 2026-01-27 | Rebrand to DocliQ. New color palette (teal/charcoal/cream/slate/coral). DM Sans typography. Charcoal-tinted shadows. More expressive animation. Universal accessibility principles. Removed white-label section. |
| 1.0.0 | 2026-01-16 | Initial release for MedAlpha Connect |
