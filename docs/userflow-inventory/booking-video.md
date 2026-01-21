# Video Consultation Booking Flow

Quick booking flow for video consultations via external Teleclinic integration.

## Flow Summary

Home → Booking Type → Video Consultation → Teleclinic (External)

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

# Booking Type Selection
booking-type: Booking Type Selection {
  shape: document
  style.fill: "#90EE90"
}

booking-type -> select-video

select-video: Tap "Video Consultation" option {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-video -> teleclinic-simulated

# External Teleclinic Integration
teleclinic-simulated: Teleclinic Simulated (External) {
  shape: document
  style.fill: "#90EE90"
}

teleclinic-simulated -> external-flow

external-flow: Complete Teleclinic booking flow {
  shape: rectangle
  style.fill: "#ADD8E6"
}

external-flow -> done

# End
done: End {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}
```
