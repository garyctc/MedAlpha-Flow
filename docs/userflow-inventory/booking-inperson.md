# In-Person Booking Flows

In-person clinic booking with reduced steps and expanded scenarios (select specialty or doctor, reschedule, book again, recurring follow-ups).

## Flow Summaries

1) Select Specialty (default): Home → Booking Entry → Specialty → Location → Slots → Review → Success → Home  
2) Select Doctor: Home → Booking Entry → Doctor → Location → Slots → Review → Success → Home  
3) Reschedule (from list or detail): Appointments → Reschedule → Slots → Review → Success → Appointment Detail  
4) Book Again (one-time or recurring): Appointments → Book Again → Slots (toggle recurring) → Review → Success

## Flow 1: Select Specialty (default)

Home → Booking Entry → Specialty → Location → Slots → Review → Success → Home

```d2
direction: down

# Start
start: Start {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}

start -> home-screen

# Entry from Home
home-screen: Home {
  shape: document
  style.fill: "#90EE90"
}

home-screen -> tap-book-appointment

tap-book-appointment: Tap "Book Appointment" card {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-book-appointment -> booking-entry

# Booking entry choice (Option B)
booking-entry: Booking Entry {
  shape: document
  style.fill: "#90EE90"
}

booking-entry -> choose-specialty

choose-specialty: Tap "Select Specialty" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

choose-specialty -> specialty-selection

# Step 1: Specialty Selection (required)
specialty-selection: Booking - Specialty {
  shape: document
  style.fill: "#90EE90"
}

specialty-selection -> select-specialty

select-specialty: Select medical specialty {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-specialty -> location-selection

# Step 2: Location Selection
location-selection: Booking - Location {
  shape: document
  style.fill: "#90EE90"
}

location-selection -> select-location

select-location: Select clinic/city {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-location -> slots-selection

# Step 3: Slots (doctor shown on cards, "Any doctor" default)
slots-selection: Booking - Slots {
  shape: document
  style.fill: "#90EE90"
}

slots-selection -> select-slot

select-slot: Select earliest available slot {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-slot -> booking-review

# Step 4: Review
booking-review: Booking - Review {
  shape: document
  style.fill: "#90EE90"
}

booking-review -> tap-confirm

tap-confirm: Tap "Confirm Booking" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-confirm -> booking-success

# Success
booking-success: Booking Success {
  shape: document
  style.fill: "#90EE90"
}

booking-success -> tap-done

tap-done: Tap "Done" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-done -> home-final

home-final: Home {
  shape: document
  style.fill: "#90EE90"
}

home-final -> done

# End
done: End {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}
```

## Flow 2: Select Doctor

Home → Booking Entry → Doctor → Location → Slots → Review → Success → Home

```d2
direction: down

# Start
start: Start {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}

start -> home-screen

# Entry from Home
home-screen: Home {
  shape: document
  style.fill: "#90EE90"
}

home-screen -> tap-book-appointment

tap-book-appointment: Tap "Book Appointment" card {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-book-appointment -> booking-entry

# Booking entry choice (Option B)
booking-entry: Booking Entry {
  shape: document
  style.fill: "#90EE90"
}

booking-entry -> choose-doctor

choose-doctor: Tap "Select Doctor" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

choose-doctor -> doctor-selection

# Step 1: Doctor Selection (specialty auto-filled)
doctor-selection: Booking - Doctors {
  shape: document
  style.fill: "#90EE90"
}

doctor-selection -> select-doctor

select-doctor: Select preferred doctor {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-doctor -> location-selection

# Step 2: Location Selection
location-selection: Booking - Location {
  shape: document
  style.fill: "#90EE90"
}

location-selection -> select-location

select-location: Select clinic/city {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-location -> slots-selection

# Step 3: Slots
slots-selection: Booking - Slots {
  shape: document
  style.fill: "#90EE90"
}

slots-selection -> select-slot

select-slot: Select available slot {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-slot -> booking-review

# Step 4: Review
booking-review: Booking - Review {
  shape: document
  style.fill: "#90EE90"
}

booking-review -> tap-confirm

tap-confirm: Tap "Confirm Booking" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-confirm -> booking-success

# Success
booking-success: Booking Success {
  shape: document
  style.fill: "#90EE90"
}

booking-success -> tap-done

tap-done: Tap "Done" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-done -> home-final

home-final: Home {
  shape: document
  style.fill: "#90EE90"
}

home-final -> done

# End
done: End {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}
```

## Flow 3: Reschedule (from Appointments list or detail)

Appointments → Reschedule → Slots → Review → Success → Appointment Detail

```d2
direction: down

# Start
start: Start {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}

start -> appointments-list

# Entry from Appointments list
appointments-list: Appointments {
  shape: document
  style.fill: "#90EE90"
}

appointments-list -> open-appointment
appointments-list -> reschedule-from-list

open-appointment: Tap appointment row {
  shape: rectangle
  style.fill: "#ADD8E6"
}

reschedule-from-list: Tap "Reschedule" quick action {
  shape: rectangle
  style.fill: "#ADD8E6"
}

open-appointment -> appointment-detail

# Appointment Detail
appointment-detail: Appointment Detail {
  shape: document
  style.fill: "#90EE90"
}

appointment-detail -> reschedule-from-detail

reschedule-from-detail: Tap "Reschedule" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

reschedule-from-detail -> slots-selection
reschedule-from-list -> slots-selection

# Select new slot
slots-selection: Booking - Slots {
  shape: document
  style.fill: "#90EE90"
}

slots-selection -> select-slot

select-slot: Select new time slot {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-slot -> reschedule-review

# Review
reschedule-review: Booking - Review {
  shape: document
  style.fill: "#90EE90"
}

reschedule-review -> tap-confirm

tap-confirm: Tap "Confirm Reschedule" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-confirm -> reschedule-success

# Success
reschedule-success: Reschedule Success {
  shape: document
  style.fill: "#90EE90"
}

reschedule-success -> back-to-detail

back-to-detail: Return to Appointment Detail {
  shape: rectangle
  style.fill: "#ADD8E6"
}

back-to-detail -> appointment-detail-updated

appointment-detail-updated: Appointment Detail (Updated) {
  shape: document
  style.fill: "#90EE90"
}

appointment-detail-updated -> done

# End
done: End {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}
```

## Flow 4: Book Again (one-time or recurring)

Appointments → Book Again → Slots (toggle recurring) → Review → Success

```d2
direction: down

# Start
start: Start {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}

start -> appointments-list

# Entry from Appointments list
appointments-list: Appointments {
  shape: document
  style.fill: "#90EE90"
}

appointments-list -> open-appointment
appointments-list -> book-again-from-list

open-appointment: Tap appointment row {
  shape: rectangle
  style.fill: "#ADD8E6"
}

book-again-from-list: Tap "Book Again" quick action {
  shape: rectangle
  style.fill: "#ADD8E6"
}

open-appointment -> appointment-detail

# Appointment Detail
appointment-detail: Appointment Detail {
  shape: document
  style.fill: "#90EE90"
}

appointment-detail -> book-again-from-detail

book-again-from-detail: Tap "Book Again" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

book-again-from-detail -> slots-selection
book-again-from-list -> slots-selection

# Select slot (prefilled specialty/location/doctor) + optional recurring toggle
slots-selection: Booking - Slots {
  shape: document
  style.fill: "#90EE90"
}

slots-selection -> select-slot

select-slot: Select available slot {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-slot -> toggle-recurring

toggle-recurring: Toggle "Make recurring" (optional) {
  shape: rectangle
  style.fill: "#ADD8E6"
}

toggle-recurring -> booking-review

# Review
booking-review: Booking - Review {
  shape: document
  style.fill: "#90EE90"
}

booking-review -> tap-confirm

tap-confirm: Tap "Confirm Booking" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-confirm -> booking-success

# Success
booking-success: Booking Success {
  shape: document
  style.fill: "#90EE90"
}

booking-success -> done

# End
done: End {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}
```
