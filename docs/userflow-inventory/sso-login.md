# SSO Login Flow

Single sign-on authentication via partner apps (dm, PAYBACK) with profile completion.

## Flow Summary

Login → Tap SSO partner → Loading → Success/Error → Complete Profile → Home

```d2
direction: down

# Start
start: Start {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}

start -> login-screen

# Login Screen
login-screen: Login {
  shape: document
  style.fill: "#90EE90"
}

login-screen -> tap-sso-partner

tap-sso-partner: Tap SSO partner button (dm or PAYBACK) {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-sso-partner -> sso-loading

# SSO Loading
sso-loading: SSO Loading {
  shape: document
  style.fill: "#90EE90"
}

sso-loading -> sso-processing

sso-processing: Processing connection (2 seconds) {
  shape: rectangle
  style.fill: "#ADD8E6"
}

sso-processing -> sso-result

sso-result: SSO authentication result? {
  shape: diamond
  style.fill: "#FFCCCB"
}

sso-result -> continue-to-profile: Success
sso-result -> show-error: Error

# Success Path
continue-to-profile: Navigate to complete profile {
  shape: rectangle
  style.fill: "#ADD8E6"
}

continue-to-profile -> sso-complete-profile

sso-complete-profile: SSO Complete Profile {
  shape: document
  style.fill: "#90EE90"
}

sso-complete-profile -> fill-additional-info

fill-additional-info: Fill any missing profile info {
  shape: rectangle
  style.fill: "#ADD8E6"
}

fill-additional-info -> tap-complete

tap-complete: Tap "Complete" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-complete -> home-screen

home-screen: Home {
  shape: document
  style.fill: "#90EE90"
}

home-screen -> done

# Error Path
show-error: Show error message {
  shape: rectangle
  style.fill: "#ADD8E6"
}

show-error -> retry-decision

retry-decision: User action? {
  shape: diamond
  style.fill: "#FFCCCB"
}

retry-decision -> tap-retry: Retry
retry-decision -> tap-back: Back to Login

tap-retry: Tap "Retry" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-retry -> sso-loading

tap-back: Tap "Back to Login" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-back -> login-screen

# End
done: End {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}
```
