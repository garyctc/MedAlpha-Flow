# MedAlpha Connect - Visual Guidelines

**Version:** 1.0.0  
**Last Updated:** 2026-01-16  
**Design Variation:** A - dm Clinical Trust

---

## Related Documents

| Document | Purpose |
|----------|---------|
| `design-tokens.json` | Machine-readable token VALUES |
| `design-system-rules.md` | Implementation PATTERNS (how to code) |
| `copy-guidelines.md` | Tone and microcopy RULES |

---

## 1. Visual Identity Overview

MedAlpha Connect extends the dm-drogerie markt brand into healthcare services. The visual identity balances **clinical trustworthiness** with the **familiar dm brand** users already trust.

### Core Aesthetic

- **Professional and trustworthy**, not sterile or cold
- **Clean and clear**, prioritizing readability
- **Accessible to all ages**, from Elena (23) to Helga (68)
- **Blue-dominant** for medical credibility
- **dm brand touches** (red accents, yellow highlights) for recognition

### Key Visual Qualities

| Quality | Expression |
|---------|------------|
| Trustworthy | Blue primary color, clean typography, consistent spacing |
| Accessible | Large touch targets, high contrast, clear hierarchy |
| Efficient | Minimal decoration, purposeful whitespace, direct actions |
| Familiar | dm brand colors as accents, Open Sans (dm-adjacent), recognizable patterns |

---

## 2. Design Principles

### 2a. Design Direction Rationale

**Why blue-dominant over warm/soft:**
- Healthcare apps require clinical credibility. Blue signals trust, professionalism, medical authority.
- dm's core blue (#0C3D91) is already trusted by 12.5 million app users.
- Older users (Helga, Thomas) associate blue with reliability.

**Why moderate border radius (8-20px):**
- Professional appearance without being harsh.
- Softer than clinical/corporate, but not playful.
- Balances trust (older users) with modernity (younger users).

**Why blue-tinted shadows:**
- Subtle depth without warmth. Maintains clinical feel.
- Consistent with primary color palette.
- Differentiates from competitors using gray or warm shadows.

**Why Open Sans:**
- Clean, highly readable at all sizes.
- Excellent German character support (umlauts, ß).
- Neutral personality, doesn't compete with content.
- dm-adjacent without being identical to dm main app.

### 2b. Anti-Patterns (What Breaks This Aesthetic)

Avoid these choices that contradict "clinical trust":

**Visual:**
- **Warm or playful colors** as primary. Keep warmth in accents only (yellow highlights).
- **Very rounded corners (24px+)** on primary elements. Feels too casual for healthcare.
- **Decorative illustrations** without purpose. Every visual must inform or guide.
- **Low contrast text**. Healthcare information must be readable.
- **Inconsistent blue shades**. Use only the defined blue scale.

**Interaction:**
- **Bouncy or playful animations**. Keep motion professional and purposeful.
- **Gamification elements**. This is healthcare, not a game.
- **Hidden navigation**. Users (especially Helga) must always know where they are.

**Content:**
- **Casual or trendy language**. Professional tone throughout.
- **Excessive exclamation marks**. Calm confidence, not excitement.
- **Medical jargon without explanation**. Clear for all literacy levels.

### 2c. Persona-Specific Considerations

| Persona | Visual Needs |
|---------|--------------|
| **Helga (68)** | Large text, high contrast, obvious touch targets, clear step indicators |
| **Thomas (51)** | No-nonsense layout, visible pricing, clear confirmations |
| **Sarah (34)** | Efficient layouts, quick-scan hierarchy, family-friendly imagery |
| **Marc (42)** | Polished, data-forward, minimal friction |
| **Elena (23)** | Modern feel, but not at expense of clarity. Accepts professional over trendy. |

---

## 3. Color System

### 3a. Color Philosophy

The color system has three layers:

1. **Primitives**: Raw color scales (blue-10 through blue-90, etc.)
2. **Brand**: dm-specific colors (dmBlue, dmRed, dmYellow)
3. **Semantic**: Purpose-driven tokens (primary, success, error)

**Always use semantic tokens in components.** Primitives are for edge cases only.

### 3b. Primary Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | #0C3D91 | Primary CTAs, headers, links, active states |
| `primaryLight` | #1E5BB8 | Hover states, secondary emphasis |
| `primaryDark` | #082B6A | Pressed states, text on light backgrounds |

### 3c. Brand Accents

| Token | Hex | Usage |
|-------|-----|-------|
| `secondary` (dmRed) | #EE161F | Destructive actions, critical alerts, brand accent |
| `accent` (dmYellow) | #FFC603 | Highlights, badges, promotions, attention |

**Usage rules:**
- Red: Use sparingly. Reserved for destructive actions (cancel appointment, delete) and critical alerts.
- Yellow: Promotional content, success badges, "new" indicators. Never for warnings.

### 3d. Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `success` | #2E7D32 | Confirmation, completed bookings, positive feedback |
| `warning` | #F59E0B | Pending states, approaching deadlines, caution |
| `error` | #DC2626 | Validation errors, failed states, connection issues |

### 3e. Neutral Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | #F5F7FA | App background, screen base |
| `backgroundCard` | #FFFFFF | Cards, elevated surfaces |
| `foreground` | #1A1A2E | Primary text |
| `foregroundSecondary` | #5A6178 | Secondary text, labels |
| `foregroundMuted` | #8E94A7 | Placeholders, metadata, disabled |
| `border` | #E2E8F0 | Dividers, card borders |

---

## 4. Typography

### 4a. Font Family

**Primary:** Open Sans (Google Fonts)  
**Weights:** 400 (Regular), 600 (SemiBold), 700 (Bold)  
**Fallback:** system-ui, sans-serif

### 4b. Type Scale

| Style | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| H1 | 28px | 700 | 36px | Page titles |
| H2 | 22px | 600 | 30px | Section headers |
| H3 | 18px | 600 | 26px | Card titles, subsections |
| Body Large | 18px | 400 | 28px | Introductions, key info |
| Body | 16px | 400 | 24px | Default text |
| Caption | 14px | 400 | 20px | Labels, metadata |
| Small | 12px | 400 | 16px | Fine print, timestamps |

### 4c. German Language Considerations

- German text is 20-30% longer than English equivalents.
- Design layouts with flexible widths, not fixed pixel counts.
- Test all UI with German text before English.
- Special characters (ä, ö, ü, ß) must render correctly.

### 4d. Accessibility Mode Typography

When Accessibility Mode is enabled:

| Style | Standard | Enhanced |
|-------|----------|----------|
| Body | 16px | 18px |
| Caption | 14px | 16px |
| All text | 1.5 line-height | 1.6 line-height |

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
| Accessibility Enhanced | 48 × 48px |

**Critical for Helga persona.** All interactive elements must meet minimum touch target size.

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

All shadows use blue tint (rgba(12, 61, 145, *)) for consistency with primary color.

| Token | Value | Usage |
|-------|-------|-------|
| `soft` | 0 1px 3px rgba(12, 61, 145, 0.06) | Subtle depth, list items |
| `card` | 0 2px 8px rgba(12, 61, 145, 0.08) | Cards, default elevation |
| `elevated` | 0 4px 16px rgba(12, 61, 145, 0.12) | Modals, sheets, overlays |

### 7b. Elevation Hierarchy

1. **Background (0)**: Screen background, no shadow
2. **Surface (1)**: Cards, panels (`shadow-card`)
3. **Elevated (2)**: Modals, bottom sheets (`shadow-elevated`)

---

## 8. Iconography

### 8a. Icon Style

- **Source:** Lucide React or similar clean line icon library
- **Stroke weight:** 1.5-2px consistent
- **Style:** Rounded corners, simple shapes
- **Color:** Inherit from parent (foreground, primary, etc.)

### 8b. Icon Sizing

| Context | Size |
|---------|------|
| Inline with text | 20px |
| Buttons, navigation | 24px |
| Feature illustrations | 32-48px |

### 8c. Icon States

- **Default:** foregroundSecondary (#5A6178)
- **Active/Selected:** primary (#0C3D91)
- **Disabled:** foregroundMuted (#8E94A7)

---

## 9. Visual Hierarchy

### 9a. Hierarchy Principles

1. **Primary actions** are most prominent (filled blue buttons).
2. **Secondary actions** are visible but subdued (outlined or ghost buttons).
3. **Destructive actions** use red, positioned away from primary actions.
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

- **Purposeful:** Every animation guides attention or confirms action.
- **Subtle:** No bouncy or playful easing.
- **Fast:** 150-200ms for most interactions.
- **Reduced motion:** Honor `prefers-reduced-motion` setting.

### 10b. Timing

| Interaction | Duration | Easing |
|-------------|----------|--------|
| Button press | 150ms | ease-out |
| Page transition | 200ms | ease-in-out |
| Modal open/close | 250ms | ease-out |
| Skeleton loading | 1.5s | linear (pulse) |

### 10c. Feedback Patterns

- **Button press:** Subtle scale (0.98) or opacity change
- **Success:** Green checkmark animation (brief)
- **Error:** Shake animation on invalid input (subtle)
- **Loading:** Skeleton screens, not spinners (where possible)

---

## 11. Accessibility Mode

### 11a. Overview

Accessibility Mode is designed primarily for users like Helga (68) who need enhanced visibility and larger touch targets. It should be:

- **Easily discoverable** in Profile/Settings
- **Persistent** across sessions
- **Non-stigmatizing** in presentation ("Comfort Mode" or "Enhanced Display")

### 11b. Visual Changes in Accessibility Mode

| Property | Standard | Enhanced |
|----------|----------|----------|
| Base font size | 16px | 18px |
| Touch targets | 44px | 48px |
| Contrast ratio | 4.5:1 | 7:1 |
| Line height | 1.5 | 1.6 |
| Focus ring width | 2px | 3px |

### 11c. Implementation

```css
/* Accessibility mode class applied to root */
.accessibility-enhanced {
  --font-size-body: 1.125rem;
  --touch-target-min: 48px;
  --focus-ring-width: 3px;
}
```

### 11d. High Contrast Variant

For users requiring maximum contrast:

| Element | Standard | High Contrast |
|---------|----------|---------------|
| Text on background | #1A1A2E on #F5F7FA | #000000 on #FFFFFF |
| Primary button | #0C3D91 bg, white text | #0C3D91 bg, white text |
| Borders | #E2E8F0 | #1A1A2E |

---

## 12. White-Label Considerations

### 12a. Customizable Elements

| Element | Customizable | Notes |
|---------|--------------|-------|
| Primary color | ✅ | Must maintain 4.5:1 contrast |
| Secondary color | ✅ | Must maintain 4.5:1 contrast |
| Accent color | ✅ | - |
| Logo (splash, header) | ✅ | Provide SVG with safe areas |
| App name | ✅ | Max 20 characters recommended |
| Font family | ✅ | Must support German characters |

### 12b. Fixed Elements

| Element | Why Fixed |
|---------|-----------|
| Spacing scale | Layout integrity |
| Border radius | Visual consistency |
| Success/Warning/Error | Universal understanding |
| Accessibility tokens | Legal/ethical requirement |

### 12c. Partner Color Guidance

When customizing for partners:

1. Primary color should work on white backgrounds (dark enough).
2. Primary color should work as button background with white text (4.5:1 contrast).
3. Avoid colors too similar to success (green) or error (red).
4. Test all states: default, hover, pressed, disabled.

---

## 13. Component Style Summary

### Buttons

| Type | Style |
|------|-------|
| Primary | Filled blue, white text, rounded-md |
| Secondary | Outlined blue, blue text, rounded-md |
| Ghost | No border, blue text |
| Destructive | Filled red (secondary color), white text |

### Cards

- White background (#FFFFFF)
- Rounded-lg (16px)
- Shadow-card
- Padding 16-20px

### Inputs

- Border: gray-20 (#E2E8F0)
- Rounded-md (12px)
- Padding: 12-16px
- Focus: 2px primary ring

### Bottom Sheets

- Rounded-xl top corners (20px)
- Shadow-elevated
- White background
- Drag handle indicator

---

## 14. Emotional Feel

The MedAlpha Connect experience should feel:

| Quality | Not |
|---------|-----|
| Professional | Sterile |
| Trustworthy | Cold |
| Clear | Boring |
| Efficient | Rushed |
| Helpful | Patronizing |
| Calm | Slow |

**Target emotion:** "I trust this app with my health information. It's easy to use and gets things done."

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-16 | Initial release based on Variation A (dm Clinical Trust) |
