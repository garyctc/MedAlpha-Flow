# Copy & Tone Guidelines

**Version:** 2.0.0
**Last Updated:** 2026-01-27
**Languages:** German (primary), English (secondary)

---

## 1. Positioning Context

**Product:** DocliQ combines trust and efficiency – a digital companion that makes health appointments as simple as they should be.

**Name etymology:**
- **Doc** = Doctor, Trust, Medicine
- **liQ** = Click + IQ + Quick
- *Intelligent, fast, with one click*

**Brand promise:** "Health should never be complicated. With one click, we take care of the rest."

**Three pillars:**

| Trust | Efficiency | Humanity |
|-------|------------|----------|
| Professional and secure, like visiting a doctor, just digital | To an appointment in seconds. No waiting queues, no paperwork | Warmth in technology. Health is personal |

---

## 2. Voice & Tone

### Our Voice

| Characteristic | Expression |
|---------------|------------|
| **Warm** | Friendly and welcoming, never cold or distant |
| **Clear** | Speak plainly, without jargon or buzzwords |
| **Helpful** | Guide through the process, never patronizing |
| **Respectful** | Health is personal. We treat it that way |

### Tone Balance

**The balance:** Sound like a helpful friend who happens to know healthcare, not a cold medical system.

| Too clinical | Too casual | Right tone |
|--------------|------------|------------|
| "Appointment request submitted for processing" | "Awesome! You're all booked!" | "Termin bestätigt!" |
| "Authentication credentials required" | "Pop in your login deets" | "Bitte anmelden" |

### Clear Over Clever

**Priority:** Clarity > personality. Healthcare information must be unambiguous.

| Avoid | Use |
|-------|-----|
| "Your health journey starts here" | "Buchen" |
| "Let's get you feeling better!" | "Arzt wählen" |

### Reassuring Without Overpromising

| Overpromising | Accurate |
|---------------|----------|
| "The doctor will call you now" | "Der Arzt meldet sich in Kürze" |
| "100% secure" | "Deine Daten sind verschlüsselt und geschützt" |

---

## 3. German Language Rules

### 3a. Informal Address (du)

**DocliQ uses the informal "du" form** for a personal, modern approach. This is intentional even though traditional German healthcare uses formal "Sie". The warmth of "du" aligns with DocliQ's humanity pillar.

| Formal (old) | Informal (DocliQ) |
|--------------|-------------------|
| "Ihr Termin" | "Dein Termin" |
| "Wählen Sie einen Arzt" | "Wähl einen Arzt" |
| "Haben Sie Fragen?" | "Hast du Fragen?" |
| "Ihre Daten" | "Deine Daten" |

**Note:** This applies across all ages. DocliQ's voice is consistently warm and personal for everyone, from digital natives to those new to apps.

### 3b. Clarity in Context

German sentences can be longer than English. Ensure context is clear, especially when using short button labels.

| Context | Copy |
|---------|------|
| Booking screen, clear context | "Buchen" |
| Ambiguous context | "Termin buchen" |
| Date picker | "Datum wählen" |

### 3c. Common Phrases

| Context | German | English |
|---------|--------|---------|
| Book appointment | "Buchen" | "Book" |
| Cancel | "Stornieren" | "Cancel" |
| Reschedule | "Verschieben" | "Reschedule" |
| Doctor | "Arzt" / "Ärztin" | "Doctor" |
| Health insurance | "Krankenversicherung" | "Health insurance" |

---

## 4. English Language Rules

### 4a. Consistent American English

| British | American |
|---------|----------|
| Colour | Color |
| Organisation | Organization |
| Centre | Center |

### 4b. Match German Warmth

English should feel equally warm and approachable.

| Too casual | Too clinical | Right tone |
|------------|--------------|------------|
| "Hey there!" | "Welcome, user" | "Welcome" |
| "You're all set!" | "Booking confirmed" | "Appointment confirmed!" |
| "Oops!" | "Error 500" | "Something went wrong" |

---

## 5. Copy Patterns

### 5a. Buttons & CTAs

**Rules:**
- Use single-word imperatives when context is clear
- Maximum 3 words
- Be concrete: "Jetzt buchen" instead of "Weiter"

| Context | German | English |
|---------|--------|---------|
| Primary CTA | "Buchen" | "Book" |
| Confirm | "Bestätigen" | "Confirm" |
| Cancel action | "Abbrechen" | "Cancel" |
| Delete | "Löschen" | "Delete" |
| Save | "Speichern" | "Save" |
| Continue | "Weiter" | "Continue" |
| Back | "Zurück" | "Back" |
| Retry | "Nochmal" | "Try Again" |
| Done | "Fertig" | "Done" |
| Close | "Schließen" | "Close" |

### 5b. Error Messages

**Format:** Empathy + Cause + Solution

DocliQ errors acknowledge the frustration briefly, then provide clear recovery steps. Never assign blame.

| Type | German | English |
|------|--------|---------|
| Generic | "Das hat leider nicht geklappt. Bitte versuch es erneut." | "Unfortunately, that didn't work. Please try again." |
| Network | "Keine Internetverbindung. Bitte prüf deine Verbindung." | "No internet connection. Please check your connection." |
| Server | "Unser Dienst ist gerade nicht erreichbar. Versuch es in ein paar Minuten nochmal." | "Our service is temporarily unavailable. Try again in a few minutes." |
| Validation | "Bitte füll alle Pflichtfelder aus." | "Please complete all required fields." |
| Session | "Deine Sitzung ist abgelaufen. Bitte melde dich erneut an." | "Your session expired. Please sign in again." |

### 5c. Success Messages

**Exclamation marks are allowed** in success states to convey positive energy.

| Action | German | English |
|--------|--------|---------|
| Appointment booked | "Termin bestätigt!" | "Appointment confirmed!" |
| Profile updated | "Profil aktualisiert!" | "Profile updated!" |
| Settings saved | "Gespeichert!" | "Saved!" |

### 5d. Empty States

**Format:** Brief statement + Suggested action

| Screen | German | English |
|--------|--------|---------|
| No appointments | "Keine Termine. Jetzt einen buchen?" | "No appointments. Book one?" |
| No history | "Noch keine Aktivität" | "No activity yet" |

### 5e. Placeholder Text

- Give examples: "z.B. Hausarzt, Kardiologie" / "e.g. GP, Cardiology"
- Short and helpful
- Never Lorem Ipsum in production

---

## 6. Multi-Step Flows

Structure information clearly for all users.

```
Schritt 1 von 3: Datum wählen
[Primary action]

Nächster Schritt: Uhrzeit wählen
```

**Best practices:**
- Always show step numbers
- Indicate what comes next
- Make the primary action visually prominent
- Maximum 3 main actions per screen

---

## 7. Notification Copy

### 7a. Push Notifications

**Format:** [Update] + [Relevant detail]

| Type | German | English |
|------|--------|---------|
| Appointment reminder | "Dein Termin morgen um 14:30 bei Dr. Müller" | "Your appointment tomorrow at 2:30 PM with Dr. Müller" |
| Confirmation | "Termin bestätigt für den 20.01. um 10:00" | "Appointment confirmed for Jan 20 at 10:00 AM" |

### 7b. In-App Toasts

**Keep under 5 words.**

| Action | German | English |
|--------|--------|---------|
| Deleted | "Gelöscht" [Rückgängig] | "Deleted" [Undo] |
| Saved | "Gespeichert" | "Saved" |
| Copied | "Kopiert" | "Copied" |
| Added to calendar | "Im Kalender gespeichert" | "Added to calendar" |

---

## 8. Privacy & Sensitivity

### 8a. Privacy-Conscious Language

In history and notifications, use generic terms unless user is in private context.

| Explicit | Discreet |
|----------|----------|
| "Birth control pills ordered" | "Rezept bestellt" |
| "Dermatologist appointment" | "Termin bestätigt" |

### 8b. Health Condition References

Never assume or label the user's condition.

| Assumptive | Neutral |
|------------|---------|
| "For your diabetes medication" | "Für dein Rezept" |
| "Your chronic condition" | "Deine regelmäßigen Medikamente" |

### 8c. Insurance Information

Present options neutrally. GKV and PKV users should feel equally supported.

| Biased | Neutral |
|--------|---------|
| "Standard insurance" | "Gesetzliche Versicherung (GKV)" |
| "Premium insurance" | "Private Versicherung (PKV)" |

---

## 9. Accessibility Principles

DocliQ speaks to everyone, from digital natives to those new to apps. These principles ensure the experience works for all users:

### Universal Clarity
- Always show step numbers in multi-step flows
- Confirmation dialogs should be explicit: "Termin verbindlich buchen?"
- Error messages always include specific recovery steps
- Avoid idioms or figures of speech

### Transparency
- Show relevant information upfront (date, time, doctor, specialty)
- No marketing language in functional flows
- Be specific: "Termin: 15.01., 09:00, Dr. Müller"

### Efficiency
- Minimize words in repeated flows
- Key information first (scannable)
- No fluff

### Inclusivity
- No assumptions about technical knowledge
- No ageist language (avoid "easy" or "simple")
- No slang or trendy expressions

---

## 10. i18n Patterns

### 10a. Interpolation Syntax

Use `{{variable}}` for dynamic values.

```json
// de.json
"appointment.confirmation": "Dein Termin am {{date}} um {{time}} bei {{doctor}} wurde bestätigt."

// en.json
"appointment.confirmation": "Your appointment on {{date}} at {{time}} with {{doctor}} has been confirmed."
```

### 10b. Date and Time

| Format | German | English |
|--------|--------|---------|
| Date | 16.01.2026 | January 16, 2026 |
| Time | 14:30 Uhr | 2:30 PM |
| Duration | 30 Min. | 30 min |

### 10c. Plurals

```json
// de.json
"appointments.count_one": "{{count}} Termin",
"appointments.count_other": "{{count}} Termine"

// en.json
"appointments.count_one": "{{count}} appointment",
"appointments.count_other": "{{count}} appointments"
```

### 10d. ARIA Labels

All ARIA labels must be translated.

```json
// de.json
"aria.closeDialog": "Dialog schließen",
"aria.openMenu": "Menü öffnen",
"aria.selectDate": "Datum auswählen",
"aria.bookAppointment": "Termin buchen"

// en.json
"aria.closeDialog": "Close dialog",
"aria.openMenu": "Open menu",
"aria.selectDate": "Select date",
"aria.bookAppointment": "Book appointment"
```

---

## 11. Anti-Patterns

### 11a. Never Use

| Pattern | Why |
|---------|-----|
| Marketing superlatives ("best", "amazing") | Erodes trust in healthcare context |
| Emojis | Keeps professional appearance |
| Slang or colloquialisms | Reduces clarity |
| Passive aggressive ("As mentioned before...") | Unprofessional |
| Uncertainty in confirmations ("maybe", "might") | Erodes trust |
| Blame language ("You did...", "You forgot...") | Unhelpful, accusatory |

### 11b. Conditional Use

| Pattern | When allowed |
|---------|--------------|
| Exclamation marks | Success states only |
| Abbreviations | Only established ones (GKV, PKV) with first-use explanation |
| Technical terms | Only when official, with context |
| English words in German | Only when German equivalent is awkward |

---

## 12. Writing Checklist

Before finalizing any copy, verify:

- [ ] Uses informal German (du)?
- [ ] Under 15 words?
- [ ] Action-oriented (starts with verb)?
- [ ] Clear to all users regardless of age or tech experience?
- [ ] Free of marketing language?
- [ ] Includes next steps (where applicable)?
- [ ] English translation available?
- [ ] Interpolation variables correct?
- [ ] Warm but professional tone?
- [ ] Error messages empathetic with clear recovery?
- [ ] Success messages use exclamation appropriately?

---

## Appendix: Future Feature Terms

*These terms will be relevant when telemedicine, prescriptions, and pharmacy features launch.*

| Term | Usage |
|------|-------|
| Gesundheitskarte | "Gesundheitskarte" or "eGK" (elektronische Gesundheitskarte) |
| E-Rezept | "E-Rezept" (established term for electronic prescription) |
| Videosprechstunde | Preferred over "Telemedicine" or "Video-Konsultation" |
| GKV / PKV | "Gesetzliche/Private Krankenversicherung" on first use |
| Apotheke | Pharmacy |
| Rezept | Prescription |

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | 2026-01-27 | Rebrand to DocliQ. Informal "du" address. New tone (warm, empathetic errors). Single-word button imperatives. Universal accessibility principles. |
| 1.0.0 | 2026-01-16 | Initial release for MedAlpha Connect |
