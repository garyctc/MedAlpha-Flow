# PKV Prescription Redemption Flow

Prescription redemption for private insurance (PKV) users via GesundheitsID OAuth authentication.

## Flow Summary

Prescriptions → Redeem Start → PKV Auth → Select Insurer → OAuth Redirect → Select Prescription → Pharmacy → Review → Success

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

# Redeem Start (Insurance Toggle = PKV)
redeem-start: Prescriptions - Redeem Start {
  shape: document
  style.fill: "#90EE90"
}

redeem-start -> toggle-pkv

toggle-pkv: Toggle to PKV (Private Insurance) {
  shape: rectangle
  style.fill: "#ADD8E6"
}

toggle-pkv -> tap-online-pharmacy

tap-online-pharmacy: Tap "Online Pharmacy" option {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-online-pharmacy -> pkv-auth

# PKV Authentication
pkv-auth: PKV Authentication {
  shape: document
  style.fill: "#90EE90"
}

pkv-auth -> review-requirements

review-requirements: Review GesundheitsID requirements {
  shape: rectangle
  style.fill: "#ADD8E6"
}

review-requirements -> tap-continue-pkv

tap-continue-pkv: Tap "Continue to PKV Login" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-continue-pkv -> insurer-select

# Insurer Selection
insurer-select: PKV Insurer Selection {
  shape: document
  style.fill: "#90EE90"
}

insurer-select -> select-insurer

select-insurer: Select your PKV insurer {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-insurer -> pkv-redirect

# PKV Redirect (OAuth)
pkv-redirect: PKV Redirect {
  shape: document
  style.fill: "#90EE90"
}

pkv-redirect -> authenticate-external

authenticate-external: Authenticate via insurer app {
  shape: rectangle
  style.fill: "#ADD8E6"
}

authenticate-external -> auth-result

auth-result: Authentication successful? {
  shape: diamond
  style.fill: "#FFCCCB"
}

auth-result -> proceed-list: Yes
auth-result -> show-error: No

# Error Path
show-error: Show error {
  shape: rectangle
  style.fill: "#ADD8E6"
}

show-error -> pkv-error

pkv-error: PKV Error {
  shape: document
  style.fill: "#90EE90"
}

pkv-error -> retry-or-back

retry-or-back: Retry or go back? {
  shape: diamond
  style.fill: "#FFCCCB"
}

retry-or-back -> tap-retry: Retry
retry-or-back -> tap-back: Back

tap-retry: Tap "Retry" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-retry -> pkv-auth

tap-back: Tap "Back" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-back -> redeem-start

# Success Path - Prescription List
proceed-list: Navigate to prescriptions {
  shape: rectangle
  style.fill: "#ADD8E6"
}

proceed-list -> prescriptions-list

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
