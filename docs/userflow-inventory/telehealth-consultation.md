# Telehealth Consultation Flow

Full video consultation journey including symptoms questionnaire, waiting room, and post-call summary.

## Flow Summary

Schedule Type → Symptoms (3 steps) → Review → Confirmation → Waiting Room → Video Call → Summary → Home

```d2
direction: down

# Start
start: Start {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}

start -> schedule-type

# Schedule Type Selection
schedule-type: Telehealth - Schedule Type {
  shape: document
  style.fill: "#90EE90"
}

schedule-type -> schedule-decision

schedule-decision: Schedule preference? {
  shape: diamond
  style.fill: "#FFCCCB"
}

schedule-decision -> next-available: Next Available
schedule-decision -> pick-time: Pick a Time

# Pick a Time (reuses booking calendar)
pick-time: Tap "Pick a Time" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

pick-time -> booking-calendar

booking-calendar: Booking - Calendar {
  shape: document
  style.fill: "#90EE90"
}

booking-calendar -> select-time

select-time: Select appointment slot {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-time -> symptoms-intro

# Next Available (immediate)
next-available: Tap "Next Available" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

next-available -> symptoms-intro

# Symptoms Questionnaire - Step 1
symptoms-intro: Telehealth - Symptoms (Step 1/3) {
  shape: document
  style.fill: "#90EE90"
}

symptoms-intro -> select-symptoms

select-symptoms: Select main health concerns {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-symptoms -> tap-next-1

tap-next-1: Tap "Next" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-next-1 -> symptoms-details

# Symptoms Questionnaire - Step 2
symptoms-details: Telehealth - Symptoms Details (Step 2/3) {
  shape: document
  style.fill: "#90EE90"
}

symptoms-details -> describe-symptoms

describe-symptoms: Provide symptom details {
  shape: rectangle
  style.fill: "#ADD8E6"
}

describe-symptoms -> tap-next-2

tap-next-2: Tap "Next" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-next-2 -> symptoms-info

# Symptoms Questionnaire - Step 3
symptoms-info: Telehealth - Additional Info (Step 3/3) {
  shape: document
  style.fill: "#90EE90"
}

symptoms-info -> provide-health-info

provide-health-info: Provide additional health info {
  shape: rectangle
  style.fill: "#ADD8E6"
}

provide-health-info -> tap-next-3

tap-next-3: Tap "Next" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-next-3 -> telehealth-review

# Review
telehealth-review: Telehealth - Review {
  shape: document
  style.fill: "#90EE90"
}

telehealth-review -> tap-confirm

tap-confirm: Tap "Confirm" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-confirm -> telehealth-confirmation

# Confirmation
telehealth-confirmation: Telehealth - Confirmation {
  shape: document
  style.fill: "#90EE90"
}

telehealth-confirmation -> tap-join

tap-join: Tap "Join Waiting Room" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-join -> waiting-room

# Waiting Room
waiting-room: Telehealth - Waiting Room {
  shape: document
  style.fill: "#90EE90"
}

waiting-room -> wait-for-doctor

wait-for-doctor: Wait for doctor availability {
  shape: rectangle
  style.fill: "#ADD8E6"
}

wait-for-doctor -> telehealth-call

# Video Call
telehealth-call: Telehealth - Video Call {
  shape: document
  style.fill: "#90EE90"
}

telehealth-call -> conduct-consultation

conduct-consultation: Video consultation with doctor {
  shape: rectangle
  style.fill: "#ADD8E6"
}

conduct-consultation -> tap-end-call

tap-end-call: Tap "End Call" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-end-call -> telehealth-summary

# Summary
telehealth-summary: Telehealth - Summary {
  shape: document
  style.fill: "#90EE90"
}

telehealth-summary -> review-summary

review-summary: Review consultation notes {
  shape: rectangle
  style.fill: "#ADD8E6"
}

review-summary -> tap-done

tap-done: Tap "Done" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-done -> home-screen

home-screen: Home {
  shape: document
  style.fill: "#90EE90"
}

home-screen -> done

# End
done: End {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}
```
