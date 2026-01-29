# Registration Flow

## Summary

Start → Account → Verify Email → Personal Info → Insurance Type → GKV/PKV Details → Complete → Home

## Steps

1. `REG-001` | Account Creation — Collects email and password to create an account (Step 1).
   - Route(s): /register

2. `REG-002` | Email Verification — Verifies email via code to continue registration (Step 2).
   - Route(s): /register/verify

3. `REG-003` | Personal Information — Captures personal details like name and date of birth (Step 3).
   - Route(s): /register/personal

4. `REG-004` | Insurance Type Selection — Selects insurance type (GKV vs PKV) to branch registration (Step 4).
   - Route(s): /register/insurance

5. `REG-005` | GKV Insurance Details — Collects public insurance (GKV) details to complete registration.
   - Route(s): /register/gkv-details

6. `REG-006` | PKV Insurance Details — Collects private insurance (PKV) details to complete registration.
   - Route(s): /register/pkv-details

7. `REG-007` | Registration Complete — Confirmation screen that completes onboarding and links to Home.
   - Route(s): /register/complete
