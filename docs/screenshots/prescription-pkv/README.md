# Prescription Redemption (PKV) Flow

## Summary

Prescriptions → Redeem Start → PKV Auth → Select Insurer → OAuth Redirect → Select Prescription → Pharmacy → Review → Success

## Steps

1. `RX-001` | Prescriptions Home — Prescription hub listing active prescriptions and entry to redemption.
   - Route(s): /prescriptions, /prescriptions/type

2. `RX-004` | Redemption Channel Selection — Start redemption and choose insurance path / redemption method.
   - Route(s): /prescriptions/redeem, /prescriptions/redeem-start

3. `RX-008` | PKV Prerequisites — PKV authentication step for GesundheitsID login.
   - Route(s): /prescriptions/pkv-auth

4. `RX-009` | PKV Insurer Selection — Select PKV insurer during authentication.
   - Route(s): /prescriptions/pkv-insurer-select

5. `RX-010` | PKV App Handoff — PKV redirect/hand-off state during authentication.
   - Route(s): /prescriptions/pkv-redirect

6. `RX-011` | PKV Error Recovery — PKV error handling if authentication fails.
   - Route(s): /prescriptions/pkv-error

7. `RX-002` | Prescription Selection — Select prescriptions to redeem from the list.
   - Route(s): /prescriptions/list

8. `RX-003` | Prescription Detail — View prescription details before redemption.
   - Route(s): /prescriptions/detail

9. `RX-012` | Pharmacy Confirmation — Select a pharmacy for fulfillment.
   - Route(s): /prescriptions/pharmacy

10. `RX-013` | Order Review — Review order and confirm redemption.
   - Route(s): /prescriptions/review

11. `RX-014` | Order Confirmation — Order success confirmation.
   - Route(s): /prescriptions/success

12. `RX-015` | Reimbursement Receipt — Receipt and final confirmation details.
   - Route(s): /prescriptions/receipt
