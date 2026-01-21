# Load Recipes (Minimal Prompt)

This library is designed for two loading styles.

## Style A. Pack First (Recommended)

1. Load 1 pack.
2. Add 0-3 modules.

### Examples

- UX critique of a booking flow.
  - Load `docs/artifacts/ai-context/packs/core.md`
  - Add `docs/artifacts/ai-context/packs/research.md` (if persona tradeoffs matter)

- Translate a Figma button spec to code.
  - Load `docs/artifacts/ai-context/packs/core.md`
  - Add `docs/artifacts/ai-context/sources/design-system-rules.md` (only if you need implementation rules)

- Decide microcopy tone and error messaging.
  - Load `docs/artifacts/ai-context/packs/core.md`
  - Add `docs/artifacts/copy-guidelines.md`

- Explain partner co-branding constraints for telemedicine.
  - Load `docs/artifacts/ai-context/packs/product.md`
  - Add `docs/artifacts/ai-context/modules/product/partner-integrations.md`

## More Examples (Manual Load)

1) Write a PRD. Prescription redemption improvements.
- Load `docs/artifacts/ai-context/packs/product.md`
- Load `docs/artifacts/ai-context/packs/research.md`
- Optional: `docs/artifacts/copy-guidelines.md`

2) UX critique of an existing flow. Clarity, recovery, confirmations.
- Load `docs/artifacts/ai-context/packs/core.md`
- Optional: `docs/artifacts/ai-context/modules/research/personas-detailed.md`

3) Acceptance criteria for a booking stepper.
- Load `docs/artifacts/ai-context/packs/core.md`
- Add `docs/artifacts/ai-context/modules/product/jtbd-and-metrics.md`

4) Prioritization. Decide what to build first.
- Load `docs/artifacts/ai-context/packs/product.md`
- Add `docs/artifacts/ai-context/modules/research/recommendations.md`

5) Partner integration spec. Teleclinic boundaries and handoff.
- Load `docs/artifacts/ai-context/packs/product.md`
- Optional: `docs/artifacts/ai-context/sources/product-context.md`

6) Localization audit for new screens.
- Load `docs/artifacts/ai-context/modules/product/localization-strategy.md`
- Optional: `docs/artifacts/copy-guidelines.md`

7) Helga check. Is this usable for seniors.
- Load `docs/artifacts/ai-context/modules/product/personas-summary.md`
- Load `docs/artifacts/ai-context/modules/product/ux-axis-and-principles.md`

8) Compliance surfaces. Consent and privacy entry points.
- Load `docs/artifacts/ai-context/modules/checklists/compliance-and-security-touchpoints.md`
- Optional: `docs/artifacts/visual-artifacts-rules.md`

9) Create or update a user flow diagram (D2).
- Load `docs/artifacts/visual-artifacts-rules.md`
- Optional: `docs/artifacts/ai-context/packs/core.md`

10) Create or update IA map.
- Load `docs/artifacts/visual-artifacts-rules.md`
- Load `docs/artifacts/ia-map/IA.md`

## Style B. Tag First (Fast For Agents)

Use `docs/artifacts/ai-context/MANIFEST.yaml` to pick 2-6 modules by tags.

Example tag sets:

- `product`, `personas`, `ux`
- `copy`, `tone`, `microcopy`
- `flows`, `ia`, `routes`

## Minimal Prompt Templates

Template A. Critique.

"Using the loaded context only. Critique (flow or screen). Optimize for trust, clarity, efficiency, accessibility. Call out Helga failure points. Output: 8 bullets max."

Template B. Decision.

"Using the loaded context only. Decide between (A) and (B). Provide tradeoffs by persona. Output: 5 bullets max. End with recommendation."

Template C. Spec.

"Using the loaded context only. Write acceptance criteria for (feature). Include happy path, error recovery, and confirmations. Output: checklist."

## Guardrails

- If output quality is drifting, load 1 more targeted module. Do not load everything.
- If you need exact UI copy, load `docs/artifacts/copy-guidelines.md`.
- If you are creating flows or maps, load `docs/artifacts/visual-artifacts-rules.md`.
