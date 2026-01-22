# Profile Management Flow

Hub for all profile-related actions including personal info, insurance, linked accounts, language, and sign out.

## Flow Summary

Profile → Choose action → Sub-screen → Complete action → Return to Profile (or Login for sign out)

```d2
direction: down

# Start
start: Start {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}

start -> profile-hub

# Profile Hub
profile-hub: Profile {
  shape: document
  style.fill: "#90EE90"
}

profile-hub -> profile-action

profile-action: User wants to? {
  shape: diamond
  style.fill: "#FFCCCB"
}

profile-action -> edit-personal: Edit Personal Info
profile-action -> view-insurance: View Insurance
profile-action -> manage-accounts: Linked Accounts
profile-action -> change-language: Change Language
profile-action -> get-help: Help & Support
profile-action -> view-legal: Privacy & Legal
profile-action -> sign-out: Sign Out

# Edit Personal Info Flow
edit-personal: Tap "Personal Info" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

edit-personal -> profile-edit

profile-edit: Profile - Edit {
  shape: document
  style.fill: "#90EE90"
}

profile-edit -> update-info

update-info: Update personal details {
  shape: rectangle
  style.fill: "#ADD8E6"
}

update-info -> tap-save

tap-save: Tap "Save" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-save -> profile-hub

# View Insurance Flow
view-insurance: Tap "Insurance Info" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

view-insurance -> insurance-type-check

insurance-type-check: Insurance type? {
  shape: diamond
  style.fill: "#FFCCCB"
}

insurance-type-check -> gkv-insurance: GKV
insurance-type-check -> pkv-insurance: PKV

gkv-insurance: Profile - Insurance GKV {
  shape: document
  style.fill: "#90EE90"
}

gkv-insurance -> view-gkv-details

view-gkv-details: View GKV insurance details {
  shape: rectangle
  style.fill: "#ADD8E6"
}

view-gkv-details -> tap-back-insurance

pkv-insurance: Profile - Insurance PKV {
  shape: document
  style.fill: "#90EE90"
}

pkv-insurance -> view-pkv-details

view-pkv-details: View PKV insurance details {
  shape: rectangle
  style.fill: "#ADD8E6"
}

view-pkv-details -> tap-back-insurance

tap-back-insurance: Tap back {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-back-insurance -> profile-hub

# Linked Accounts Flow
manage-accounts: Tap "Linked Accounts" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

manage-accounts -> linked-accounts

linked-accounts: Profile - Linked Accounts {
  shape: document
  style.fill: "#90EE90"
}

linked-accounts -> manage-connections

manage-connections: Connect or disconnect accounts {
  shape: rectangle
  style.fill: "#ADD8E6"
}

manage-connections -> tap-back-linked

tap-back-linked: Tap back {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-back-linked -> profile-hub

# Change Language Flow
change-language: Tap "Language" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

change-language -> language-screen

language-screen: Profile - Language {
  shape: document
  style.fill: "#90EE90"
}

language-screen -> select-language

select-language: Select Deutsch or English {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-language -> profile-hub

# Help & Support Flow
get-help: Tap "Help" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

get-help -> support-screen

support-screen: Profile - Support {
  shape: document
  style.fill: "#90EE90"
}

support-screen -> view-resources

view-resources: View help resources {
  shape: rectangle
  style.fill: "#ADD8E6"
}

view-resources -> tap-back-support

tap-back-support: Tap back {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-back-support -> profile-hub

# Privacy & Legal Flow
view-legal: Tap "Privacy & Legal" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

view-legal -> legal-screen

legal-screen: Profile - Legal {
  shape: document
  style.fill: "#90EE90"
}

legal-screen -> view-policies

view-policies: View privacy policy and terms {
  shape: rectangle
  style.fill: "#ADD8E6"
}

view-policies -> tap-back-legal

tap-back-legal: Tap back {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-back-legal -> profile-hub

# Sign Out Flow
sign-out: Tap "Sign Out" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

sign-out -> confirm-logout

confirm-logout: Confirm sign out {
  shape: rectangle
  style.fill: "#ADD8E6"
}

confirm-logout -> login-screen

login-screen: Login {
  shape: document
  style.fill: "#90EE90"
}

login-screen -> done

# End
done: End {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}
```
