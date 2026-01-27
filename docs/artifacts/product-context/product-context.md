# Product Context

**Version:** 2.0.0
**Last Updated:** 2026-01-27

**See also:**
- Visual design rationale: `../../guidelines/visual-guidelines.md`
- Copy & tone: `../../guidelines/copy-guidelines.md`
- Design tokens: `../../../shared/design-tokens.json`
- Implementation patterns: See codebase structure (`client/src/{lib,components,config}`)

---

## Product Vision

**DocliQ** combines trust and efficiency, a digital companion that makes health appointments as simple as they should be.

**Name etymology:**
- **Doc** = Doctor, Trust, Medicine
- **liQ** = Click + IQ + Quick
- *Intelligent, fast, with one click*

**Brand promise:** "Health should never be complicated. With one click, we take care of the rest."

---

## Current Scope (V1)

**V1 Focus:** In-person appointment booking

| Feature | Status |
|---------|--------|
| In-person appointment booking | V1 (Current) |
| Telemedicine consultations | V2 (Planned) |
| E-prescription redemption | V2 (Planned) |
| Pharmacy search & delivery | V2 (Planned) |

---

## Summary

- German-first healthcare app with multi-language support planned
- Partner integrations for complete healthcare journey (Curaay for V1, others for V2+)
- Primary UX axis: **Trust + Efficiency + Humanity**
- Core V1 feature: Appointment booking
- Future: Telemedicine, e-prescription, pharmacy integration

---

## Problem

Patients searching for doctor appointments face frustrating, time-consuming experiences:

| Problem | Impact |
|---------|--------|
| **Telephone waiting queues** | Average 7+ minutes waiting when calling practices |
| **Limited availability** | Practices only reachable during office hours (8am-12pm, 2-5pm) |
| **Tedious doctor search** | Must contact multiple practices to find an appointment |
| **Appointment cancellations** | Missing automatic reminders lead to no-shows |

**Current wait times (Germany):**
- 3-6 months for specialist appointment via GP referral
- 4-8 weeks with gastroenterologist
- Only 27% of practices offer online booking (2024)

*Source: KBV Practice Barometer 2024*

**User pain points by segment:**

| Segment | Primary Pain |
|---------|--------------|
| Seniors (Helga) | Confusing systems, traveling to appointments is burdensome |
| Parents (Sarah) | Juggling multiple apps, no time for phone calls, managing family health |
| Professionals (Marc) | Waiting rooms waste time, want on-demand scheduling |
| Students (Elena) | Need modern, discreet experience |
| Pragmatists (Thomas) | Unclear processes, hidden complexity |

---

## Solution

DocliQ provides:

1. **Fast appointment booking** without phone calls or waiting queues
2. **Warmth in technology** that feels personal, not clinical
3. **Universal accessibility** so all ages and digital skill levels can use it
4. **Complete healthcare journey** (appointments now, telemedicine and prescriptions coming)

---

## Competitive Landscape

**Direct competitors (Germany):**

| App | Strengths | Weaknesses | DocliQ Opportunity |
|-----|-----------|------------|-------------------|
| **Doctolib** | Large network, strong booking UX | No prescription services, clinical feel | Warmer experience, complete journey |
| **Jameda** | Doctor reviews, booking | Dated UI, no telemedicine | Modern, accessible design |
| **TK-App** | Insurance integration | Only TK members, complex | Open to all, simpler |
| **Teleclinic** | Strong telemedicine | Telemedicine only | Full healthcare journey |
| **Shop Apotheke** | Prescription delivery | No appointments | Complete healthcare |

**DocliQ positioning:**

| Differentiator | Expression |
|----------------|------------|
| Warmth in technology | Teal/coral palette, friendly tone, "du" address |
| Accessible for everyone | Works for Helga (68) and Elena (23) equally |
| Modern, not trendy | Timeless design that won't feel dated |
| Complete journey | Booking → Consultation → Prescription → Delivery (phased) |

---

## Target Users

**Primary audience:** Anyone who needs convenient, trustworthy healthcare appointment booking.

**Design philosophy:** Personas inform our understanding of users. DocliQ applies accessibility and usability principles universally, not per-persona. If it works for Helga, it works for everyone.

### Five Key Personas

#### 1. Sarah (34) - The Busy Working Mother
- **Goal:** Manage family health efficiently without sacrificing time
- **Key needs:** Quick booking, family management, telemedicine for minor ailments
- **Digital skill:** High
- **Quit triggers:** Too slow, can't book for family members easily

#### 2. Marc (42) - The Health-Conscious Professional
- **Goal:** Proactive health management with maximum convenience
- **Key needs:** On-demand scheduling, time efficiency, professional experience
- **Digital skill:** Very High
- **Quit triggers:** Wastes his time, feels amateur

#### 3. Helga (68) - The Senior with Routine Care Needs
- **Goal:** Reliably book appointments and reduce travel burden
- **Key needs:** Simple flow, accessible UI, step-by-step guidance
- **Digital skill:** Moderate
- **Quit triggers:** Confusing flow, too many steps, unclear what happened

#### 4. Elena (23) - The Young Wellness Enthusiast
- **Goal:** Modern, convenient healthcare access
- **Key needs:** Fast experience, modern feel, discretion
- **Digital skill:** Very High
- **Quit triggers:** Feels outdated, clunky experience

#### 5. Thomas (51) - The Value-Driven Pragmatist
- **Goal:** Straightforward, no-nonsense healthcare booking
- **Key needs:** Clear confirmations, no complexity, transparency
- **Digital skill:** Moderate
- **Quit triggers:** Hidden complexity, unclear confirmations

---

## Three Pillars (Primary UX Axis)

DocliQ balances three core pillars:

| Pillar | Expression |
|--------|------------|
| **Trust** | Professional design, clear confirmations, secure feeling |
| **Efficiency** | Minimal steps, smart defaults, fast completion |
| **Humanity** | Warm tone, personal address (du), friendly visuals |

**Design test:** Every feature must serve all three pillars.

---

## DocliQ UX Principles

Four actionable principles guide all interaction design:

### 01 — Clear Decision Paths
**Less is more**

The human brain can only process limited options simultaneously. Too many choices lead to overwhelm and abandonment.

**Implementation:**
- Maximum 3 main actions per screen
- Most important next step always visually highlighted
- Clear visual hierarchy

### 02 — Precise Control
**Large, accessible targets**

The smaller and farther a control element, the more time and concentration needed. Critical on mobile.

**Implementation:**
- All touch targets at least 44px
- CTAs positioned within thumb reach
- Generous tap areas

### 03 — Familiar Patterns
**Users expect familiar interfaces**

People spend 95% of their time in other apps. DocliQ uses familiar patterns so users immediately know how everything works.

**Implementation:**
- Standard navigation and icons
- No experimental UI in critical booking flows
- Lucide icons throughout

### 04 — Manageable Steps
**Break complexity into small chunks**

Working memory can only process 5-9 elements at once. Long forms overwhelm and are abandoned.

**Implementation:**
- Booking process in 4 clear steps
- Progress indicator always visible
- One decision per screen where possible

---

## JTBD Ladder

### Jobs (Appointments)

**Core Job:**
> When I need to see a doctor, help me find an available appointment near me and book it quickly, so I can get care without phone calls or waiting.

**Supporting Jobs:**
- Help me find doctors by specialty and location
- Help me choose a time that fits my schedule
- Help me confirm my booking clearly
- Help me remember my appointment

### Emotional Jobs (All Phases)

- Help me feel confident I'm making the right health decisions
- Help me feel in control of my healthcare
- Help me trust that my data is secure and private
- Help me feel supported, not judged, about my health needs

### Social Context

- Respect German healthcare culture: professionalism, privacy, thoroughness
- Support multi-generational use
- Maintain warmth while ensuring credibility

---

## Value Proposition

**Core promise:** Book doctor appointments in seconds, not minutes.

**Differentiators:**

| Differentiator | V1 | Future |
|----------------|----|----|
| Fast booking without phone calls | ✓ | ✓ |
| Universal accessibility | ✓ | ✓ |
| Warm, personal experience | ✓ | ✓ |
| Complete healthcare journey | Appointments | + Telemedicine, Rx, Pharmacy |

---

## User Goals (Ranked)

### Goals
1. **Book doctor appointments** quickly without phone calls
2. **Find available times** that fit my schedule
3. **Receive clear confirmation** of my booking
4. **Get reminders** before my appointment

---

## Success Metrics

### Metrics (Appointments)

| Metric | Type | Target |
|--------|------|--------|
| Completed bookings | Primary | Track growth |
| Booking completion rate | Funnel | >80% started → confirmed |
| Time to book | Efficiency | <2 minutes |
| Show-up rate | Quality | >90% |

### Business Metrics

- Active users (weekly, monthly)
- Feature adoption rate
- Retention (7-day, 30-day)
- User satisfaction (NPS, app store ratings)

---

## Persona Testing Dimensions

When testing features, evaluate against key personas:

### Helga (68) - Accessibility Benchmark

| Dimension | Pass | Fail |
|-----------|------|------|
| Step clarity | Each step obvious, numbered | Lost, don't know where I am |
| Text readability | Can read without zooming | Can't read comfortably |
| Touch targets | Easy to tap accurately | Frequently miss buttons |
| Confirmation | Know exactly what happened | Not sure if it worked |
| Recovery | Can fix mistakes easily | Stuck, can't proceed |

### Sarah (34) - Efficiency Benchmark

| Dimension | Pass | Fail |
|-----------|------|------|
| Speed | <2 min for booking | >5 min |
| Multitasking | Can complete while distracted | Too complex for busy moments |
| Remembered preferences | Defaults to my choices | Start from scratch each time |

### Marc (42) - Quality Benchmark

| Dimension | Pass | Fail |
|-----------|------|------|
| Time efficiency | No wasted steps | Feels inefficient |
| Information density | Right amount of detail | Missing critical info |
| Professional feel | Polished, trustworthy | Feels amateur |

### Elena (23) - Experience Benchmark

| Dimension | Pass | Fail |
|-----------|------|------|
| Modern feel | Contemporary, polished | Feels dated |
| Speed | Fast, smooth animations | Sluggish |
| Mobile experience | Native-feeling | Clunky |

### Thomas (51) - Trust Benchmark

| Dimension | Pass | Fail |
|-----------|------|------|
| Confirmation clarity | Know exactly what I agreed to | Uncertain what I committed to |
| No marketing pressure | Functional, no upsells | Feels salesy |
| Reliability | Works consistently | Unreliable |

---

## Constraints and Principles

### Design Constraints

| Constraint | Rationale |
|------------|-----------|
| **Accessibility is baseline** | If Helga can't use it, redesign it |
| **German-first** | Primary language, English secondary |
| **Mobile-first** | Designed for touch, 320px minimum |
| **Partner co-branding** | "Powered by [Partner]" visible for integrated services |

### UX Principles

| Principle | Implementation |
|-----------|----------------|
| Explicit over implicit | Tell users what will happen before it happens |
| Progress over perfection | Step indicators, partial saves, clear progress |
| Recovery over prevention | Easy undo, edit, cancel |
| Confirmation over assumption | Always confirm critical actions |
| Consistency over novelty | Use established patterns |

### Content Principles

| Principle | Implementation |
|-----------|----------------|
| Warm, not clinical | Friendly but credible tone |
| Clear over clever | No wordplay or ambiguity |
| Informal address (du) | Personal, modern approach |
| Discreet when needed | Generic terms for sensitive content |

---

## Localization Strategy

### Language Priority

| Tier | Languages | Rationale |
|------|-----------|-----------|
| **Tier 1 (V1)** | German, English | Primary market + international users |
| **Tier 2 (Future)** | Turkish, Polish, Romanian | Market expansion |
| **Tier 3 (Future)** | Additional European languages | Further expansion |

### Localization Considerations

- German is source language for all translations
- Date/time formats vary by locale
- Medical terminology must be professionally translated
- RTL support not required for current language set

---

## Future Considerations

### Future Features
- Telemedicine consultations (Teleclinic integration)
- E-prescription redemption (Cardlink/gematik)
- Online pharmacy ordering (Apo Group)
- Pharmacy search with directions
- Health records integration (ePA - elektronische Patientenakte)

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | 2026-01-27 | Rebrand to DocliQ. Three pillars (Trust, Efficiency, Humanity). Added DocliQ UX Principles. V1 scope (appointments). Removed dm references and white-label. Updated to informal "du" address. |
| 1.0.0 | 2026-01-16 | Initial release for MedAlpha Connect |
