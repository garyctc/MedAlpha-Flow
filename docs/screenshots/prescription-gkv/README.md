# Prescription Redemption (GKV) Flow

## Summary

Prescriptions → Redeem Start → NFC Intro → Enter CAN → Scan Card → SMS Verify → Select Prescription → Pharmacy → Review → Success

## Steps

1. `RX-001` | Prescriptions Home — Prescription hub listing active prescriptions and entry to redemption.
   - Route(s): /prescriptions, /prescriptions/type

2. `RX-004` | Redemption Channel Selection — Start redemption and choose insurance path / redemption method.
   - Route(s): /prescriptions/redeem, /prescriptions/redeem-start

3. `RX-005` | GKV NFC Introduction — GKV NFC intro with instructions before scanning.
   - Route(s): /prescriptions/nfc-intro

4. `RX-006` | GKV NFC Scanning — NFC scan screen for health card verification.
   - Route(s): /prescriptions/nfc-scan

5. `RX-007` | GKV SMS Verification — SMS verification step for GKV authentication.
   - Route(s): /prescriptions/gkv-sms-verify

6. `RX-002` | Prescription Selection — Select prescriptions to redeem from the list.
   - Route(s): /prescriptions/list

7. `RX-003` | Prescription Detail — View prescription details before redemption.
   - Route(s): /prescriptions/detail

8. `RX-012` | Pharmacy Confirmation — Select a pharmacy for fulfillment.
   - Route(s): /prescriptions/pharmacy

9. `RX-013` | Order Review — Review order and confirm redemption.
   - Route(s): /prescriptions/review

10. `RX-014` | Order Confirmation — Order success confirmation.
   - Route(s): /prescriptions/success

11. `RX-015` | Reimbursement Receipt — Receipt and final confirmation details.
   - Route(s): /prescriptions/receipt
