# Design System Rules for AI and Engineers

**Version:** 1.0.0  
**Last Updated:** 2026-01-16  
**Purpose:** Guide AI tools and engineers to implement designs matching MedAlpha Connect's design system.

---

## Related Documents

| Document | Purpose |
|----------|---------|
| `design-tokens.json` | Machine-readable token VALUES |
| `visual-guidelines.md` | Design philosophy and RATIONALE |
| `copy-guidelines.md` | Tone and microcopy RULES |

---

## 1. Token Definitions

### Location

- **Machine-readable:** `design-tokens.json` (JSON format for build tools)
- **Runtime config:** `tailwind.config.js` (project root)
- **CSS variables:** `src/index.css`

### Color System (Three-Layer Model)

**Layer 1: Primitive Color Scales** (10-90 lightness)

| Scale | Purpose | Hex Range |
|-------|---------|-----------|
| `blue-*` | Primary actions, headers, links | `#F0F4FA` → `#051C47` |
| `gray-*` | Backgrounds, text, borders | `#F5F7FA` → `#0F172A` |
| `red-*` | Errors, destructive, dm brand accent | `#FEF2F2` → `#7F1D1D` |
| `green-*` | Success, confirmation | `#F0FDF4` → `#166534` |
| `yellow-*` | Highlights, attention, dm brand | `#FFFBEB` → `#713F12` |
| `orange-*` | Warnings, pending states | `#FFF7ED` → `#92400E` |

**Layer 2: Brand Colors**

```js
dmBlue: '#0C3D91'      // Primary brand color
dmRed: '#EE161F'       // Brand accent, destructive
dmYellow: '#FFC603'    // Highlights, promotions
```

**Layer 3: Semantic Tokens** (use these in components)

```js
primary: '#0C3D91'           // blue-70 - CTAs, headers
primaryLight: '#1E5BB8'      // blue-60 - hover states
primaryDark: '#082B6A'       // blue-80 - pressed states
secondary: '#EE161F'         // dmRed - destructive, alerts
accent: '#FFC603'            // dmYellow - highlights
background: '#F5F7FA'        // gray-10
backgroundCard: '#FFFFFF'    // white
foreground: '#1A1A2E'        // primary text
foregroundSecondary: '#5A6178'  // labels, secondary text
foregroundMuted: '#8E94A7'   // placeholders, disabled
border: '#E2E8F0'            // gray-20
success: '#2E7D32'           // green-80
warning: '#F59E0B'           // orange-60
error: '#DC2626'             // red-60
```

### Shadow System (Blue-Tinted)

```js
'soft': '0 1px 3px rgba(12, 61, 145, 0.06)'
'card': '0 2px 8px rgba(12, 61, 145, 0.08)'
'elevated': '0 4px 16px rgba(12, 61, 145, 0.12)'
```

**Rule:** All shadows use `rgba(12, 61, 145, *)` (dmBlue tint). Never use pure black or gray shadows.

### Spacing Scale

```
4px, 8px, 12px, 16px, 20px, 24px, 32px, 48px
```

Tailwind classes: `p-1` (4px), `p-2` (8px), `p-3` (12px), `p-4` (16px), `p-5` (20px), `p-6` (24px), `p-8` (32px), `p-12` (48px)

---

## 2. Component Architecture

### File Structure

```
src/
├── components/
│   ├── common/           # Reusable base components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── IconButton.tsx
│   │   ├── BottomSheet.tsx
│   │   └── Toast.tsx
│   ├── Booking/          # Appointment booking screens
│   ├── Prescription/     # Rx redemption screens
│   ├── Telemedicine/     # Video consultation screens
│   ├── Profile/          # User settings
│   └── Onboarding/       # Registration, login
├── lib/
│   └── utils.ts          # cn(), formatters
├── types/
├── hooks/
└── contexts/
```

### Component Pattern

All components follow this structure:

```tsx
/**
 * ComponentName - Brief description of purpose.
 *
 * Explains variants, use cases, and which screens use this.
 */

import { cn } from '@/lib/utils'

interface ComponentNameProps {
  /** Prop description */
  variant?: 'primary' | 'secondary' | 'ghost'
  /** Additional CSS classes */
  className?: string
  children?: React.ReactNode
}

export function ComponentName({
  variant = 'primary',
  className,
  children,
}: ComponentNameProps) {
  return (
    <element
      className={cn(
        // Base styles
        'base-class',
        // Variant styles
        variant === 'primary' && 'bg-primary text-white',
        variant === 'secondary' && 'border-primary text-primary',
        variant === 'ghost' && 'text-primary',
        // State styles
        'disabled:opacity-50 disabled:cursor-not-allowed',
        // Focus styles (always include)
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        // Custom classes last
        className
      )}
    >
      {children}
    </element>
  )
}
```

### Key Components

| Component | Path | Purpose |
|-----------|------|---------|
| `Button` | `common/Button.tsx` | Primary, secondary, ghost, destructive variants |
| `Card` | `common/Card.tsx` | Default, interactive, expandable cards |
| `Input` | `common/Input.tsx` | Text, email, password, search inputs |
| `Badge` | `common/Badge.tsx` | Status indicators, labels |
| `IconButton` | `common/IconButton.tsx` | Icon-only buttons with proper touch targets |
| `BottomSheet` | `common/BottomSheet.tsx` | Modal sheets for actions |
| `Toast` | `common/Toast.tsx` | Success/error notifications |
| `StepIndicator` | `common/StepIndicator.tsx` | Multi-step flow progress (critical for Helga) |

---

## 3. Frameworks & Libraries

### UI Framework

- **React 18+** with TypeScript
- **Functional components only** (no class components)

### Styling

- **Tailwind CSS 3.4+** - Utility-first
- **tailwindcss-animate** - Animation utilities
- **clsx + tailwind-merge** - Class merging via `cn()` utility

### Build System

- **Vite** or **Next.js** - Bundler
- **PostCSS** - Tailwind + Autoprefixer

### Key Dependencies

```json
{
  "react": "^18.0.0",
  "tailwindcss": "^3.4.0",
  "lucide-react": "^0.300.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0",
  "react-i18next": "^14.0.0"
}
```

---

## 4. Icon System

### Library

**Lucide React** (`lucide-react`)

### Usage Pattern

```tsx
import { Calendar, MapPin, Phone, X, ChevronRight } from 'lucide-react'

// In components - wrap with IconButton for clickable icons
<IconButton
  icon={<Calendar />}
  onClick={handleBooking}
  aria-label="Termin buchen"  // German: "Book appointment"
/>

// Inline icons inherit color from parent
<span className="text-foreground-secondary flex items-center gap-2">
  <MapPin className="w-5 h-5" />
  Berlin, Mitte
</span>
```

### Icon Styling Rules

- **Stroke width:** 1.5-2px (Lucide default)
- **Default size:** 24px, adjust via `w-*` and `h-*` classes
- **Color:** Inherit from parent text color
- **Touch target:** Wrap in `IconButton` for clickable icons (enforces 44x44px minimum)

### Common Healthcare Icons

| Action | Icon |
|--------|------|
| Appointment | `Calendar` |
| Telemedicine | `Video` |
| Prescription | `Pill` |
| Pharmacy | `Store` |
| Location | `MapPin` |
| Profile | `User` |
| Settings | `Settings` |
| Back | `ChevronLeft` |
| Forward | `ChevronRight` |
| Close | `X` |
| Success | `Check` |
| Error | `AlertCircle` |
| Info | `Info` |

---

## 5. Styling Approach

### Class Merging Utility

Always use `cn()` for conditional classes:

```tsx
import { cn } from '@/lib/utils'

// cn() combines clsx (conditionals) + tailwind-merge (conflict resolution)
className={cn(
  'base-styles',
  isActive && 'active-styles',
  disabled && 'opacity-50',
  className  // Allow override from props
)}
```

### Global Styles (`src/index.css`)

```css
@layer base {
  /* Touch targets enforced globally */
  button, a, [role="button"] {
    min-height: 44px;
    min-width: 44px;
  }
  
  /* Accessibility mode */
  .accessibility-enhanced button,
  .accessibility-enhanced a,
  .accessibility-enhanced [role="button"] {
    min-height: 48px;
    min-width: 48px;
  }
}

@layer utilities {
  .safe-bottom { 
    padding-bottom: env(safe-area-inset-bottom); 
  }
  .tap-highlight-none { 
    -webkit-tap-highlight-color: transparent; 
  }
  .touch-target { 
    min-height: 44px; 
    min-width: 44px; 
  }
  .touch-target-enhanced {
    min-height: 48px;
    min-width: 48px;
  }
}
```

### Border Radius System

```js
borderRadius: {
  'sm': '8px',       // Chips, badges
  'md': '12px',      // Inputs, buttons
  'lg': '16px',      // Cards
  'xl': '20px',      // Bottom sheets, modals
  'full': '9999px',  // Pills, avatars
}
```

Use: `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-full`

---

## 6. Typography Implementation

### Font Loading

```html
<!-- In index.html or _document.tsx -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
```

### Tailwind Config

```js
fontFamily: {
  sans: ['Open Sans', 'system-ui', 'sans-serif'],
},
fontSize: {
  'h1': ['1.75rem', { lineHeight: '2.25rem', fontWeight: '700' }],
  'h2': ['1.375rem', { lineHeight: '1.875rem', fontWeight: '600' }],
  'h3': ['1.125rem', { lineHeight: '1.625rem', fontWeight: '600' }],
  'body-lg': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '400' }],
  'body': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
  'caption': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
  'small': ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],
}
```

### Usage

```tsx
<h1 className="text-h1 text-foreground">Termin buchen</h1>
<p className="text-body text-foreground-secondary">
  Wählen Sie einen Arzt und Zeitpunkt
</p>
<span className="text-caption text-foreground-muted">
  Letzte Buchung: 15.01.2026
</span>
```

---

## 7. Accessibility Implementation

### Focus States (Required on ALL Interactive Elements)

```tsx
className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
```

### ARIA Labels (Required for Icon Buttons)

```tsx
<IconButton
  icon={<X />}
  onClick={handleClose}
  aria-label="Schließen"  // German: "Close"
/>
```

### Accessibility Mode Toggle

```tsx
// In settings/profile
const [accessibilityMode, setAccessibilityMode] = useState(false)

// Apply to root element
<div className={cn(
  'app-root',
  accessibilityMode && 'accessibility-enhanced'
)}>
```

### Accessibility CSS Variables

```css
:root {
  --font-size-body: 1rem;
  --touch-target-min: 44px;
  --focus-ring-width: 2px;
}

.accessibility-enhanced {
  --font-size-body: 1.125rem;
  --touch-target-min: 48px;
  --focus-ring-width: 3px;
}
```

### Screen Reader Considerations

- All images need `alt` text or `aria-hidden="true"` if decorative.
- Form inputs need associated `<label>` elements.
- Loading states need `aria-live="polite"` announcements.
- Error messages need `role="alert"`.

---

## 8. i18n Implementation

### Setup with react-i18next

```tsx
// src/i18n/index.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  lng: 'de',
  fallbackLng: 'en',
  resources: {
    de: { translation: require('./locales/de.json') },
    en: { translation: require('./locales/en.json') },
  },
})
```

### Translation File Structure

```
src/i18n/
├── locales/
│   ├── de.json    # German (primary)
│   └── en.json    # English (secondary)
└── index.ts
```

### Usage Pattern

```tsx
import { useTranslation } from 'react-i18next'

function BookingScreen() {
  const { t } = useTranslation()
  
  return (
    <h1>{t('booking.title')}</h1>
    <p>{t('booking.subtitle')}</p>
    <Button>{t('booking.confirm')}</Button>
  )
}
```

### Translation Keys Convention

```json
{
  "common": {
    "confirm": "Bestätigen",
    "cancel": "Abbrechen",
    "back": "Zurück",
    "next": "Weiter",
    "save": "Speichern",
    "delete": "Löschen",
    "error": "Fehler",
    "success": "Erfolgreich"
  },
  "booking": {
    "title": "Termin buchen",
    "subtitle": "Wählen Sie einen Arzt und Zeitpunkt",
    "selectDoctor": "Arzt auswählen",
    "selectDateTime": "Datum & Uhrzeit wählen"
  }
}
```

### Interpolation

```json
// de.json
"booking.confirmationMessage": "Ihr Termin am {{date}} um {{time}} wurde bestätigt."

// Usage
t('booking.confirmationMessage', { date: '20.01.2026', time: '14:30' })
```

---

## 9. Design-to-Code Translation Rules

### When Translating Designs to Code:

1. **Map design colors to semantic tokens** (not raw hex values)
   - Blue variants → `primary`, `primaryLight`, `primaryDark`
   - Red variants → `secondary`, `error`
   - Green variants → `success`
   - Gray variants → `background`, `foreground`, `border`

2. **Map radii to design system**
   - 8px → `rounded-sm`
   - 12px → `rounded-md`
   - 16px → `rounded-lg`
   - 20px → `rounded-xl`
   - 9999px → `rounded-full`

3. **Use existing components before creating new ones**
   - Check `src/components/common/` first
   - Follow the component pattern if creating new

4. **Ensure accessibility**
   - All interactive elements need focus rings
   - Icon buttons need `aria-label`
   - Touch targets minimum 44x44px (48x48px in accessibility mode)

5. **Use Tailwind classes, not inline styles**
   - Wrong: `style={{ color: '#0C3D91' }}`
   - Right: `className="text-primary"`

6. **Follow German localization rules**
   - All user-facing text via i18n
   - German as primary, English as fallback
   - Test layouts with German text (20-30% longer)

---

## 10. State Coverage Requirements

Every screen must handle these states:

| State | Implementation |
|-------|----------------|
| **Default** | Normal content display |
| **Empty** | Illustration + message + CTA |
| **Loading** | Skeleton screens (prefer over spinners) |
| **Error** | Error message + retry action |
| **Success** | Confirmation + next action |

### Skeleton Loading Pattern

```tsx
// Use skeleton components during data loading
function DoctorCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <div className="h-12 w-12 bg-gray-20 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-20 rounded w-3/4" />
        <div className="h-3 bg-gray-20 rounded w-1/2" />
      </div>
    </Card>
  )
}
```

---

## 11. White-Label Implementation

### Theme Provider Pattern

```tsx
// src/contexts/ThemeContext.tsx
interface ThemeConfig {
  primary: string
  primaryLight: string
  primaryDark: string
  secondary: string
  accent: string
  appName: string
  logoSplash: string
  logoHeader: string
}

const defaultTheme: ThemeConfig = {
  primary: '#0C3D91',
  primaryLight: '#1E5BB8',
  primaryDark: '#082B6A',
  secondary: '#EE161F',
  accent: '#FFC603',
  appName: 'MedAlpha Connect',
  logoSplash: '/assets/logo-splash.svg',
  logoHeader: '/assets/logo-header.svg',
}

// Partner themes loaded from config
const partnerThemes: Record<string, Partial<ThemeConfig>> = {
  'partner-a': {
    primary: '#1E40AF',
    appName: 'Partner Health',
    logoSplash: '/assets/partners/a/logo-splash.svg',
  },
}
```

### CSS Variables for Theming

```css
:root {
  --color-primary: #0C3D91;
  --color-primary-light: #1E5BB8;
  --color-primary-dark: #082B6A;
  --color-secondary: #EE161F;
  --color-accent: #FFC603;
}

/* Partner overrides applied via JS */
[data-theme="partner-a"] {
  --color-primary: #1E40AF;
}
```

---

## 12. Quick Reference Card

```
COLORS (semantic):
  primary → blue CTAs/headers (#0C3D91)
  secondary → red destructive/alerts (#EE161F)
  accent → yellow highlights (#FFC603)
  success → green confirmation (#2E7D32)
  warning → orange pending (#F59E0B)
  error → red validation (#DC2626)
  foreground → dark text (#1A1A2E)
  foregroundSecondary → labels (#5A6178)
  foregroundMuted → placeholders (#8E94A7)
  background → screen bg (#F5F7FA)
  backgroundCard → white cards (#FFFFFF)

RADII:
  rounded-sm (8px) | rounded-md (12px) | rounded-lg (16px)
  rounded-xl (20px) | rounded-full (pill)

SHADOWS:
  shadow-soft | shadow-card | shadow-elevated

TYPOGRAPHY:
  text-h1/h2/h3 | text-body-lg/body/caption/small

ICONS:
  import { IconName } from 'lucide-react'
  Wrap in <IconButton /> for clickable icons

CLASSES:
  cn(...classes) for conditional styling
  touch-target for 44px minimum
  safe-bottom for notch spacing

ACCESSIBILITY:
  .accessibility-enhanced on root for enhanced mode
  All interactive: focus:ring-2 focus:ring-primary
  All icon buttons: aria-label required

i18n:
  const { t } = useTranslation()
  t('namespace.key', { variable: value })
```

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-16 | Initial release for MedAlpha Connect |
