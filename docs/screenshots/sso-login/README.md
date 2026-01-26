# SSO Login Flow

## Summary

Login → Tap SSO partner → Loading → Success/Error → Complete Profile → Home

## Steps

1. `SSO-001` | SSO Loading — SSO loading/handshake with partner.
   - Route(s): /sso/loading

2. `SSO-002` | Complete Profile (SSO) — Complete profile after SSO sign-in.
   - Route(s): /sso/complete-profile
