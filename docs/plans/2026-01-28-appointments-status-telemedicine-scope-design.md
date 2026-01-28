# Spec Plan — Appointments Status + Telemedicine Scope

Date: January 28, 2026

## Summary
Refine appointment status presentation, remove telemedicine/video UI surfaces, and align navigation and list behaviors with updated scope. All changes prioritize consistent, readable status cues across cards and lists, with a single rule set applied everywhere.

## Goals
- Hide all telemedicine/video UI elements while keeping telehealth routes accessible if navigated directly.
- Standardize status tags (uppercase, color-consistent) and remove redundant tags.
- Clarify pending states with consistent layout and loading feedback.
- Limit home list card counts and show “See all” only when it’s meaningful.
- Update appointments list tabs to use horizontal drag/scroll.
- Remove History from bottom navigation but keep /history accessible via “See all.”

## Non-Goals
- No changes to telehealth routes or their internal flows.
- No new features or backend logic.
- No redesign of layouts beyond the specified status/tag adjustments.

## Central Status Presentation Rules (Apply Everywhere)
These rules apply to all appointment cards and lists (home, appointments list, history, and any detail card summaries):

**Status tags (uppercase):**
- SEARCHING → yellow
- WAITING FOR CONFIRMATION → yellow
- CONFIRMED → green
- COMPLETED → gray
- CANCELLED / REJECTED → red

**Remove tags:**
- Remove “Processing.”
- Remove “DOCLIQ MATCH.”

**Pending states layout:**
- SEARCHING (fast path) shows text “SEARCHING FOR DOCTOR.”
- WAITING FOR CONFIRMATION shows doctor info (name/avatar).
- Both SEARCHING and WAITING hide date/time and show a small inline spinner where date/time normally appears.
- SEARCHING hides doctor identity details (name/avatar), WAITING does not.

**Non-pending states:**
- Date/time displays normally.
- Status pills follow the color rules above.

## Telemedicine/Video Scope Rules
- Remove all telemedicine/video UI references, including:
  - Booking choices (e.g., “Video Consultation”).
  - Appointment type labels/badges showing “Video.”
  - Filters/tabs or tags referencing video.
  - Static copy sections (FAQs/terms/privacy) mentioning telemedicine or video consults.
- Keep telehealth routes/pages intact for direct navigation only.

## Navigation & List Behavior
- Bottom navigation: remove History tab.
- History page remains accessible via “See all” from Book Again and any existing deep link routes.
- Home screen:
  - “My Appointments” and “Book Again” show max 3 cards.
  - “See all” appears only if there are more than 3 cards.
- Appointments list status tabs: horizontal drag/scroll (simple swipe, no arrows).

## UX Acceptance Checklist
- No visible telemedicine/video option, label, badge, or copy anywhere in the main UI.
- “Processing” and “DOCLIQ MATCH” tags never appear.
- Status tags are uppercase and color-coded as specified.
- SEARCHING shows “SEARCHING FOR DOCTOR” and no doctor identity details.
- WAITING shows doctor identity details.
- SEARCHING and WAITING both hide date/time and show inline spinner in date/time slot.
- COMPLETED tags are gray; CANCELLED/REJECTED are red; CONFIRMED is green.
- Home lists cap at 3 cards; “See all” only appears when >3.
- History tab is removed from bottom nav, but /history is still reachable from Book Again.
- Status tabs on appointments list are draggable horizontally on mobile.
