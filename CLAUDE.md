# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## User Context

**Product Designer using AI to build prototypes.** The user focuses exclusively on UX and UI outcomes, not code implementation. When discussing changes:
- Frame conversations around design, user experience, and visual outcomes
- Avoid technical jargon unless directly relevant to the design goal
- Prioritize prototype fidelity and interaction quality
- Make implementation decisions autonomously—the user trusts AI to handle code

## Anti-Goals

**Communication**
- Don't explain code changes or technical implementation details
- Don't ask for input on technical decisions (databases, libraries, patterns)
- Don't use developer jargon when describing what changed

**Development Approach**
- Don't refactor or "clean up" code unless it fixes a visible bug
- Don't optimize for production performance—this is a prototype
- Don't add error handling for edge cases that won't be demonstrated
- Don't prioritize code quality over speed of iteration

**Scope**
- Don't gold-plate features beyond what's needed to demonstrate the concept
- Don't build real backend integrations when mock data works
- Don't add infrastructure concerns (security, scalability, monitoring)

**Process**
- Don't ask "how should I implement this?"—just implement it
- Don't present multiple technical approaches for the user to choose from

## Commands

```bash
npm run dev          # Start development server (Express + Vite HMR) on port 5000
npm run dev:client   # Start Vite dev server only on port 5000
npm run build        # Production build (generates design tokens, then bundles)
npm run start        # Run production server
npm run check        # TypeScript type checking
npm run db:push      # Push Drizzle schema to PostgreSQL (requires DATABASE_URL)
npm run tokens:generate  # Regenerate design tokens
npm run copy:lint    # Lint copy/translations
```

## Architecture

**Mobile-First Healthcare App Prototype** - A React SPA designed to look and function like a native mobile app within the browser.

### Project Structure
- `client/` - React frontend (Vite, TailwindCSS v4, Radix UI)
- `server/` - Express backend with Drizzle ORM
- `shared/` - Shared TypeScript types and Drizzle schema

### Key Architectural Patterns

**App Shell (375px mobile frame)**
The app renders inside a constrained `max-w-[375px]` container centered on screen (`client/src/App.tsx:226`). All UI development must stay within this mobile frame unless explicitly told otherwise.

**Client-Side Data Persistence**
Primary data storage uses localStorage, not the database. See `client/src/lib/storage.ts` for:
- `getUserProfile()`, `saveUserProfile()` - User profile data
- `getUserInsurance()`, `saveUserInsurance()` - Insurance info
- `getUserAppointments()`, `saveAppointment()` - Appointments
- `getBookingDraft()`, `saveBookingDraft()` - Multi-step booking wizard state
- `getRegistrationDraft()`, `saveRegistrationDraft()` - Registration wizard state
- `seedDemoData()` - Auto-seeds demo data on first load

**Routing**
Uses `wouter` (not React Router). Routes defined in `client/src/App.tsx`. Major flows:
- `/booking/*` - Appointment booking wizard
- `/prescriptions/*` - Prescription redemption (GKV/PKV flows)
- `/telehealth/*` - Video consultation flow
- `/pharmacy/*` - Pharmacy search
- `/profile/*` - User profile management
- `/register/*` - Account registration wizard

**Bottom Navigation**
Fixed bottom nav (`client/src/components/layout/BottomNav.tsx`) appears on all pages except splash, login, and teleclinic routes.

**Internationalization**
i18next with German (`de`) and English (`en`) locales. Translations in `client/src/i18n/locales/`. Use `formatLocalDate()` and `formatLocalTime()` from `client/src/i18n/index.ts` for localized date/time display.

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `attached_assets/*`

### UI Components
Radix UI primitives with shadcn/ui patterns in `client/src/components/ui/`. Uses Framer Motion for animations (`client/src/lib/motion.ts`).

### German Healthcare Context
- **GKV** = Gesetzliche Krankenversicherung (statutory/public insurance)
- **PKV** = Private Krankenversicherung (private insurance)
- Different authentication flows for each insurance type
