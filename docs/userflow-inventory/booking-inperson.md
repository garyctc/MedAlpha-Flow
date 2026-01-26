# In-Person Booking Flow

Complete appointment booking wizard for in-person clinic visits with Smart Match integration.

## Flow Summary

Home → Booking Type → Booking Entry → (Specialty → Location → Slots) or (Doctor → Location → Slots) → Review → Smart Match Processing → Success → Home
Appointments → Appointment Detail → Book Again/Reschedule → Slots → Review → Success

```d2
direction: down

# Start
start: Start {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}

start -> home-screen
start -> appointments-list

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

tap-book-appointment -> booking-type

# Step 1: Booking Type
booking-type: Booking Type Selection {
  shape: document
  style.fill: "#90EE90"
}

booking-type -> select-inperson

select-inperson: Tap "In-Person" option {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-inperson -> booking-entry

# Step 2: Booking Entry
booking-entry: Booking - Entry {
  shape: document
  style.fill: "#90EE90"
}

booking-entry -> choose-specialty
booking-entry -> choose-doctor

choose-specialty: Select "Specialty" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

choose-specialty -> specialty-selection

choose-doctor: Select "Doctor" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

choose-doctor -> doctors-selection

# Step 3: Specialty Selection
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

# Step 3b: Doctor Selection
doctors-selection: Booking - Doctors {
  shape: document
  style.fill: "#90EE90"
}

doctors-selection -> select-doctor

select-doctor: Select available doctor {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-doctor -> location-selection

# Step 4: Location Selection
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

# Step 5: Slots Selection
slots-selection: Booking - Slots {
  shape: document
  style.fill: "#90EE90"
}

slots-selection -> select-slot

select-slot: Select date and time slot {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-slot -> booking-review

# Alternate entry from Appointments
appointments-list: Appointments {
  shape: document
  style.fill: "#90EE90"
}

appointments-list -> open-appointment

open-appointment: Open appointment detail {
  shape: rectangle
  style.fill: "#ADD8E6"
}

open-appointment -> appointment-detail

appointment-detail: Appointment Details {
  shape: document
  style.fill: "#90EE90"
}

appointment-detail -> tap-book-again
appointment-detail -> tap-reschedule

tap-book-again: Tap "Book Again" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-reschedule: Tap "Reschedule" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-book-again -> slots-selection

tap-reschedule -> slots-selection

# Step 6: Review
booking-review: Booking - Review {
  shape: document
  style.fill: "#90EE90"
}

booking-review -> tap-confirm

tap-confirm: Tap "Confirm Booking" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-confirm -> smart-match-processing

# Smart Match Integration
smart-match-processing: Smart Match Processing {
  shape: document
  style.fill: "#90EE90"
}

smart-match-processing -> processing-webhook

processing-webhook: Processing (webhook simulation ~5s) {
  shape: rectangle
  style.fill: "#ADD8E6"
}

processing-webhook -> booking-success

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
