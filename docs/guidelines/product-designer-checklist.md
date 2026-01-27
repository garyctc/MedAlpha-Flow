# Product Designer Checklist

**Purpose:** Tasks and decision points relevant to a product designer for DocliQ.
**Version:** 2.0.0
**Last Updated:** 2026-01-27

---

## DocliQ Overview

**Brand promise:** "Health should never be complicated. With one click, we take care of the rest."

**Three Pillars:**

| Pillar | Expression |
|--------|------------|
| **Trust** | Professional design, clear confirmations, secure feeling |
| **Efficiency** | Minimal steps, smart defaults, fast completion |
| **Humanity** | Warm tone, personal address (du), friendly visuals |

---

## 1. Trust: UX, Usability & Accessibility

These items directly impact the look, feel, and flow of the interface.

| Area | Checklist Item | Standard |
|------|----------------|----------|
| **Accessibility** | Ensure UI meets BITV 2.0 (WCAG 2.1 AA): 4.8:1 contrast minimum, 44px touch targets, text scaling | BITV 2.0, ISO/IEC 40500 |
| **Localization** | Validate UI layouts in German (primary) and English (secondary). German text is 20-30% longer | User need |
| **Clarity** | Use plain language. Avoid jargon. If necessary, provide inline explanations | User need |
| **Consistency** | Apply DocliQ design system consistently. Teal primary, cream background, DM Sans | ISO 9241-210 |
| **Cognitive Load** | Linear task flows. Max 3 actions per screen. Progress indicators in multi-step flows | ISO 9241-210 |
| **Focus States** | Visible 2px teal focus rings for keyboard navigation | WCAG 2.1 AA |

---

## 2. Efficiency: Feature Workflows

These items concern flow design and information architecture.

### Features

| Area | Checklist Item | Standard |
|------|----------------|----------|
| **Appointment Booking** | Design 4-step booking flow: Specialty → Doctor → Date/Time → Confirm | DocliQ UX Principles |
| **Doctor Search** | Filter by specialty, location, availability. Clear empty states | User need |
| **Confirmation** | Clear booking confirmation with all details. Calendar add option | IEC 62366-1 |
| **Reminders** | Push notification design for appointment reminders | User need |

---

## 3. Humanity: Warmth & Tone

NEW section for DocliQ's humanity pillar.

| Area | Checklist Item | Rationale |
|------|----------------|-----------|
| **German Address** | Use informal "du" throughout, not formal "Sie" | DocliQ brand voice |
| **Error Messages** | Empathetic tone: "Das hat leider nicht geklappt. Bitte versuch es erneut." | Humanity pillar |
| **Success States** | Exclamation marks allowed: "Termin bestätigt!" | Warmth expression |
| **Empty States** | Positive framing with suggested action: "Keine Termine. Jetzt einen buchen?" | Helpful tone |
| **Coral Accents** | Use coral (#ebba73) for promotional badges, highlights, warmth moments | Visual warmth |
| **Micro-interactions** | Hover scale (1.05), lift effects allowed for delight | Subtle warmth |

---

## 4. DocliQ UX Principles

Four actionable principles for all interaction design.

| Principle | Checklist Item |
|-----------|----------------|
| **01 - Clear Decision Paths** | Max 3 main actions per screen. Primary action visually highlighted. Clear hierarchy. |
| **02 - Precise Control** | All touch targets 44px minimum. CTAs in thumb reach zone. Generous tap areas. |
| **03 - Familiar Patterns** | Standard navigation and Lucide icons. No experimental UI in booking flows. |
| **04 - Manageable Steps** | Booking in 4 clear steps. Progress indicator always visible. One decision per screen. |

---

## 5. Visual Identity Checklist

Verify designs match DocliQ tokens.

| Element | Specification |
|---------|---------------|
| **Primary Color** | Teal #12a395 |
| **Background** | Cream #FAF8F5 |
| **Text** | Charcoal #1c2a38 |
| **Secondary** | Slate #5e7a86 |
| **Accent** | Coral #ebba73 |
| **Font** | DM Sans (400, 500, 600, 700) |
| **Shadows** | Charcoal-tinted: rgba(28, 42, 56, 0.08) |
| **Border Radius** | sm: 8px, md: 12px, lg: 16px, xl: 20px |
| **Animation** | 200-300ms, ease-out. Hover scale allowed. |

---

## 6. Compliance & Security Touchpoints

UI/UX elements required by law.

| Area | Checklist Item | Standard |
|------|----------------|----------|
| **Data Privacy** | Transparent consent screens. Clear privacy policy access. Data minimization in UI. | GDPR, DiGAV |
| **Certifications** | Legal labels (CE mark, BfArM/DiGA if applicable) in About/Legal section | MDR, DiGAV |
| **Data Control** | User ability to view, export, delete their data | GDPR |

---

## 7. Persona Testing

Design should work for all personas. If Helga (68) can use it, everyone can.

| Persona | Key Test |
|---------|----------|
| **Helga (68)** | Can complete booking without help? Steps clear? Text readable? |
| **Sarah (34)** | Under 2 minutes to book? Works while distracted? |
| **Marc (42)** | No wasted steps? Professional feel? |
| **Elena (23)** | Modern, fast, not dated? |
| **Thomas (51)** | Clear confirmation? No hidden complexity? |

---

## Quick Reference: Standards

| Standard | Full Name | Scope |
|----------|-----------|-------|
| BITV 2.0 | Barrierefreie-Informationstechnik-Verordnung | German accessibility |
| WCAG 2.1 AA | Web Content Accessibility Guidelines | International accessibility |
| ISO 9241-210 | Ergonomics of human-system interaction | Usability |
| DiGA Fast-Track | Digital Health Applications pathway | German health app approval |
| HL7 FHIR | Fast Healthcare Interoperability Resources | Health data exchange |
| IEC 62366-1 | Medical devices, usability engineering | Error prevention |
| GDPR | General Data Protection Regulation | EU data privacy |
| DiGAV | Digitale Gesundheitsanwendungen-Verordnung | German digital health app |
| MDR | Medical Device Regulation | EU medical device safety |

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | 2026-01-27 | Rebrand to DocliQ. Three pillars. V1/V2 scope. Humanity section. UX Principles. Visual identity checklist. |
| 1.0.0 | 2026-01 | Initial MedAlpha Connect version |
