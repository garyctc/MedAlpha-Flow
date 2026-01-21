# Authentication & Login Flow

User journey for initial app access including email/password login, SSO partner login, and registration entry.

## Flow Summary

Start → Splash Screen → Login → Choose method (Email/SSO/Register) → Home

```d2
direction: down

# Start
start: Start {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}

start -> splash-screen

# Splash Screen
splash-screen: Splash Screen {
  shape: document
  style.fill: "#90EE90"
}

splash-screen -> auto-redirect

auto-redirect: Wait 2 seconds (auto-redirect) {
  shape: rectangle
  style.fill: "#ADD8E6"
}

auto-redirect -> login-screen

# Login Screen
login-screen: Login {
  shape: document
  style.fill: "#90EE90"
}

login-screen -> auth-decision

auth-decision: Choose authentication method? {
  shape: diamond
  style.fill: "#FFCCCB"
}

auth-decision -> enter-credentials: Email/Password
auth-decision -> tap-sso: SSO Partner
auth-decision -> tap-register: Register

# Email/Password Flow
enter-credentials: Enter email and password {
  shape: rectangle
  style.fill: "#ADD8E6"
}

enter-credentials -> tap-signin

tap-signin: Tap "Sign In" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-signin -> home-screen

# Home Screen (Success)
home-screen: Home {
  shape: document
  style.fill: "#90EE90"
}

home-screen -> done

# SSO Flow
tap-sso: Tap SSO partner (dm/PAYBACK) {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-sso -> sso-loading

sso-loading: SSO Loading {
  shape: document
  style.fill: "#90EE90"
}

sso-loading -> sso-processing

sso-processing: Processing SSO authentication {
  shape: rectangle
  style.fill: "#ADD8E6"
}

sso-processing -> sso-complete-profile

sso-complete-profile: SSO Complete Profile {
  shape: document
  style.fill: "#90EE90"
}

sso-complete-profile -> home-screen

# Register Flow (exits to registration journey)
tap-register: Tap "Register" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-register -> registration-start

registration-start: Registration (Step 1) {
  shape: document
  style.fill: "#90EE90"
}

registration-start -> registration-flow

registration-flow: Continue to registration flow {
  shape: rectangle
  style.fill: "#ADD8E6"
}

registration-flow -> done

# End
done: End {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}
```
