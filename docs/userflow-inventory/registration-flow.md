# Registration Flow

5-step account registration wizard with insurance type branching (GKV/PKV).

## Flow Summary

Start → Account → Verify Email → Personal Info → Insurance Type → GKV/PKV Details → Complete → Home

```d2
direction: down

# Start
start: Start {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}

start -> register-account

# Step 1: Account Creation
register-account: Registration - Account (Step 1/5) {
  shape: document
  style.fill: "#90EE90"
}

register-account -> enter-account-details

enter-account-details: Enter email and password {
  shape: rectangle
  style.fill: "#ADD8E6"
}

enter-account-details -> tap-continue-1

tap-continue-1: Tap "Continue" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-continue-1 -> verify-email

# Step 2: Email Verification
verify-email: Registration - Verify Email (Step 2/5) {
  shape: document
  style.fill: "#90EE90"
}

verify-email -> enter-verification-code

enter-verification-code: Enter verification code from email {
  shape: rectangle
  style.fill: "#ADD8E6"
}

enter-verification-code -> tap-verify

tap-verify: Tap "Verify" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-verify -> personal-info

# Step 3: Personal Information
personal-info: Registration - Personal Info (Step 3/5) {
  shape: document
  style.fill: "#90EE90"
}

personal-info -> enter-personal-details

enter-personal-details: Enter name, DOB, address {
  shape: rectangle
  style.fill: "#ADD8E6"
}

enter-personal-details -> tap-continue-2

tap-continue-2: Tap "Continue" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-continue-2 -> insurance-type

# Step 4: Insurance Type Selection
insurance-type: Registration - Insurance Type (Step 4/5) {
  shape: document
  style.fill: "#90EE90"
}

insurance-type -> select-insurance

select-insurance: Select insurance type? {
  shape: diamond
  style.fill: "#FFCCCB"
}

select-insurance -> select-gkv: GKV (Public)
select-insurance -> select-pkv: PKV (Private)

# GKV Details
select-gkv: Select "GKV" option {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-gkv -> gkv-details

gkv-details: Registration - GKV Details {
  shape: document
  style.fill: "#90EE90"
}

gkv-details -> enter-gkv-info

enter-gkv-info: Enter insurance card details {
  shape: rectangle
  style.fill: "#ADD8E6"
}

enter-gkv-info -> tap-continue-3

# PKV Details
select-pkv: Select "PKV" option {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-pkv -> pkv-details

pkv-details: Registration - PKV Details {
  shape: document
  style.fill: "#90EE90"
}

pkv-details -> enter-pkv-info

enter-pkv-info: Enter private insurance details {
  shape: rectangle
  style.fill: "#ADD8E6"
}

enter-pkv-info -> tap-continue-3

# Step 5: Complete
tap-continue-3: Tap "Continue" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-continue-3 -> registration-complete

registration-complete: Registration - Complete (Step 5/5) {
  shape: document
  style.fill: "#90EE90"
}

registration-complete -> tap-done

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
