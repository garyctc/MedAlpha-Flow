# In-Person Booking Flow

Complete appointment booking wizard for in-person clinic visits with Smart Match integration.

## Flow Summary

Home → Booking Type → Specialty → Location → Doctor → Calendar → Review → Smart Match Processing → Success → Home

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

select-inperson -> specialty-selection

# Step 2: Specialty Selection
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

# Step 3: Location Selection
location-selection: Booking - Location {
  shape: document
  style.fill: "#90EE90"
}

location-selection -> select-location

select-location: Select clinic/city {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-location -> doctors-selection

# Step 4: Doctor Selection
doctors-selection: Booking - Doctors {
  shape: document
  style.fill: "#90EE90"
}

doctors-selection -> select-doctor

select-doctor: Select available doctor {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-doctor -> calendar-selection

# Step 5: Date/Time Selection
calendar-selection: Booking - Calendar {
  shape: document
  style.fill: "#90EE90"
}

calendar-selection -> select-datetime

select-datetime: Select date and time slot {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-datetime -> booking-review

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
