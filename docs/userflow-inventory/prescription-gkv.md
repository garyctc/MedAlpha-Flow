# GKV Prescription Redemption Flow

Prescription redemption for public insurance (GKV) users via NFC health card scanning.

## Flow Summary

Prescriptions → Redeem Start → NFC Intro → Enter CAN → Scan Card → SMS Verify → Select Prescription → Pharmacy → Review → Success

```d2
direction: down

# Start
start: Start {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}

start -> prescriptions-hub

# Prescriptions Hub
prescriptions-hub: Prescriptions {
  shape: document
  style.fill: "#90EE90"
}

prescriptions-hub -> tap-redeem-fab

tap-redeem-fab: Tap "+" FAB to redeem {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-redeem-fab -> redeem-start

# Redeem Start (Insurance Toggle = GKV)
redeem-start: Prescriptions - Redeem Start {
  shape: document
  style.fill: "#90EE90"
}

redeem-start -> confirm-gkv-selected

confirm-gkv-selected: Confirm GKV (Public Insurance) selected {
  shape: rectangle
  style.fill: "#ADD8E6"
}

confirm-gkv-selected -> tap-online-pharmacy

tap-online-pharmacy: Tap "Online Pharmacy" option {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-online-pharmacy -> nfc-intro

# NFC Introduction
nfc-intro: NFC Introduction {
  shape: document
  style.fill: "#90EE90"
}

nfc-intro -> enter-can

enter-can: Enter 6-digit CAN from health card {
  shape: rectangle
  style.fill: "#ADD8E6"
}

enter-can -> tap-start-scanning

tap-start-scanning: Tap "Start Scanning" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-start-scanning -> nfc-scan

# NFC Scanning
nfc-scan: NFC Scan {
  shape: document
  style.fill: "#90EE90"
}

nfc-scan -> hold-card

hold-card: Hold health card against phone {
  shape: rectangle
  style.fill: "#ADD8E6"
}

hold-card -> scan-result

scan-result: Card read successful? {
  shape: diamond
  style.fill: "#FFCCCB"
}

scan-result -> proceed-sms: Yes
scan-result -> retry-scan: No

retry-scan: Reposition card and retry {
  shape: rectangle
  style.fill: "#ADD8E6"
}

retry-scan -> hold-card

# SMS Verification
proceed-sms: Navigate to SMS verification {
  shape: rectangle
  style.fill: "#ADD8E6"
}

proceed-sms -> gkv-sms-verify

gkv-sms-verify: GKV SMS Verification {
  shape: document
  style.fill: "#90EE90"
}

gkv-sms-verify -> enter-sms-code

enter-sms-code: Enter SMS verification code {
  shape: rectangle
  style.fill: "#ADD8E6"
}

enter-sms-code -> tap-verify

tap-verify: Tap "Verify" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-verify -> prescriptions-list

# Prescription List
prescriptions-list: Prescriptions List {
  shape: document
  style.fill: "#90EE90"
}

prescriptions-list -> select-prescription

select-prescription: Select prescription to redeem {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-prescription -> prescription-detail

# Prescription Detail
prescription-detail: Prescription Detail {
  shape: document
  style.fill: "#90EE90"
}

prescription-detail -> tap-redeem

tap-redeem: Tap "Redeem" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-redeem -> pharmacy-selection

# Pharmacy Selection
pharmacy-selection: Prescription - Pharmacy {
  shape: document
  style.fill: "#90EE90"
}

pharmacy-selection -> select-pharmacy

select-pharmacy: Select delivery pharmacy {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-pharmacy -> order-review

# Order Review
order-review: Prescription - Review {
  shape: document
  style.fill: "#90EE90"
}

order-review -> tap-confirm

tap-confirm: Tap "Confirm Order" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-confirm -> order-success

# Success
order-success: Prescription - Success {
  shape: document
  style.fill: "#90EE90"
}

order-success -> tap-done

tap-done: Tap "Done" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-done -> done

# End
done: End {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}
```
