# Appointments Management Flow

View, filter, and manage upcoming appointments with options to cancel, reschedule, or book new.

## Flow Summary

Appointments → Choose action (Filter/View/Book) → Detail → Manage (Cancel/Reschedule/Back) → Return

```d2
direction: down

# Start
start: Start {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}

start -> appointments-screen

# Appointments Screen
appointments-screen: Appointments {
  shape: document
  style.fill: "#90EE90"
}

appointments-screen -> user-action

user-action: User wants to? {
  shape: diamond
  style.fill: "#FFCCCB"
}

user-action -> filter-appointments: Filter view
user-action -> view-details: View appointment
user-action -> book-new: Book new appointment

# Filter Flow
filter-appointments: Tap filter tab (All/In-Person/Video) {
  shape: rectangle
  style.fill: "#ADD8E6"
}

filter-appointments -> view-filtered

view-filtered: View filtered appointments {
  shape: rectangle
  style.fill: "#ADD8E6"
}

view-filtered -> appointments-screen

# View Details Flow
view-details: Tap appointment card {
  shape: rectangle
  style.fill: "#ADD8E6"
}

view-details -> appointment-detail

appointment-detail: Appointment Detail {
  shape: document
  style.fill: "#90EE90"
}

appointment-detail -> detail-action

detail-action: User action on detail? {
  shape: diamond
  style.fill: "#FFCCCB"
}

detail-action -> cancel-apt: Cancel
detail-action -> reschedule-apt: Reschedule
detail-action -> go-back: Go back

cancel-apt: Tap "Cancel Appointment" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

cancel-apt -> confirm-cancel

confirm-cancel: Confirm cancellation {
  shape: rectangle
  style.fill: "#ADD8E6"
}

confirm-cancel -> appointments-screen

reschedule-apt: Tap "Reschedule" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

reschedule-apt -> booking-calendar

booking-calendar: Booking - Calendar {
  shape: document
  style.fill: "#90EE90"
}

booking-calendar -> select-new-time

select-new-time: Select new date/time {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-new-time -> appointments-screen

go-back: Tap back {
  shape: rectangle
  style.fill: "#ADD8E6"
}

go-back -> appointments-screen

# Book New Flow
book-new: Tap "+" FAB {
  shape: rectangle
  style.fill: "#ADD8E6"
}

book-new -> booking-type

booking-type: Booking Type Selection {
  shape: document
  style.fill: "#90EE90"
}

booking-type -> continue-booking

continue-booking: Continue booking flow {
  shape: rectangle
  style.fill: "#ADD8E6"
}

continue-booking -> done

# End
done: End {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}
```
