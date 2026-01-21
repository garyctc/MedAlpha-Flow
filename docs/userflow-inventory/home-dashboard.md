# Home Dashboard Flow

Central navigation hub with promo carousel, feature cards, and bottom navigation access to all app sections.

## Flow Summary

Home → Choose action (Promo/Book/Prescriptions/Upcoming/Profile/Bottom Nav) → Destination screen

```d2
direction: down

# Start
start: Start {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}

start -> home-screen

# Home Screen
home-screen: Home {
  shape: document
  style.fill: "#90EE90"
}

home-screen -> user-action

user-action: User action on home? {
  shape: diamond
  style.fill: "#FFCCCB"
}

user-action -> tap-promo: Tap promo carousel
user-action -> tap-book: Book Appointment
user-action -> tap-prescriptions: Redeem Prescription
user-action -> tap-upcoming: View upcoming appointment
user-action -> tap-profile: Profile avatar
user-action -> use-bottom-nav: Use bottom navigation

# Promo Carousel Actions
tap-promo: Tap promo card {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-promo -> promo-destination

promo-destination: Promo destination? {
  shape: diamond
  style.fill: "#FFCCCB"
}

promo-destination -> pharmacy-map: Pharmacy promo
promo-destination -> prescriptions-hub: Immune promo
promo-destination -> pharmacy-list: Brands promo

pharmacy-map: Pharmacy Map {
  shape: document
  style.fill: "#90EE90"
}

pharmacy-map -> done

prescriptions-hub: Prescriptions {
  shape: document
  style.fill: "#90EE90"
}

prescriptions-hub -> done

pharmacy-list: Pharmacy List {
  shape: document
  style.fill: "#90EE90"
}

pharmacy-list -> done

# Book Appointment Card
tap-book: Tap "Book Appointment" card {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-book -> booking-type

booking-type: Booking Type Selection {
  shape: document
  style.fill: "#90EE90"
}

booking-type -> done

# Redeem Prescription Card
tap-prescriptions: Tap "Redeem Prescription" card {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-prescriptions -> prescriptions-screen

prescriptions-screen: Prescriptions {
  shape: document
  style.fill: "#90EE90"
}

prescriptions-screen -> done

# View Upcoming Appointment
tap-upcoming: Tap upcoming appointment card {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-upcoming -> appointments-screen

appointments-screen: Appointments {
  shape: document
  style.fill: "#90EE90"
}

appointments-screen -> done

# Profile Avatar
tap-profile: Tap profile avatar {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-profile -> profile-screen

profile-screen: Profile {
  shape: document
  style.fill: "#90EE90"
}

profile-screen -> done

# Bottom Navigation
use-bottom-nav: Tap bottom navigation tab {
  shape: rectangle
  style.fill: "#ADD8E6"
}

use-bottom-nav -> bottom-nav-destination

bottom-nav-destination: Which tab? {
  shape: diamond
  style.fill: "#FFCCCB"
}

bottom-nav-destination -> home-tab: Home
bottom-nav-destination -> appointments-tab: Appointments
bottom-nav-destination -> prescriptions-tab: Prescriptions
bottom-nav-destination -> history-tab: History
bottom-nav-destination -> profile-tab: Profile

home-tab: Home (current) {
  shape: document
  style.fill: "#90EE90"
}

home-tab -> done

appointments-tab: Appointments {
  shape: document
  style.fill: "#90EE90"
}

appointments-tab -> done

prescriptions-tab: Prescriptions {
  shape: document
  style.fill: "#90EE90"
}

prescriptions-tab -> done

history-tab: History {
  shape: document
  style.fill: "#90EE90"
}

history-tab -> done

profile-tab: Profile {
  shape: document
  style.fill: "#90EE90"
}

profile-tab -> done

# End
done: End {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}
```
