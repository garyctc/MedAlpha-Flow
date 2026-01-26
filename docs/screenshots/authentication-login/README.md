# Authentication & Login Flow

## Summary

Start → Splash Screen → Login → Choose method (Email/SSO/Register) → Home

## Steps

1. `AUTH-001` | Splash Screen — Launch screen that shows branding and auto-redirects to Login or Home based on auth state.
   - Route(s): /

2. `AUTH-002` | Login Screen — User enters credentials or chooses SSO/Registration to continue into the app.
   - Route(s): /login
