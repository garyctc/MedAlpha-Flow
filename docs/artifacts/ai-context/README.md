# AI Context Library

Goal. Small, focused context files so an agent can load only what it needs and answer well from a minimal prompt.

## How To Use

1. Start with a pack from `docs/artifacts/ai-context/packs/`.
2. Add 1-3 modules from `docs/artifacts/ai-context/modules/` based on the task.
3. Avoid loading everything. Prefer the smallest set that constrains the output correctly.

## Default Packs

- `packs/core.md`. Product intent, personas summary, UX principles.
- `packs/product.md`. Product model, partners, localization, metrics.
- `packs/research.md`. Market context, persona details, recommendations.

## Existing Canonical Docs Worth Loading

- Copy and tone rules. `docs/artifacts/copy-guidelines.md`
- Visual artifacts generation rules. `docs/artifacts/visual-artifacts-rules.md`
- IA map. `docs/artifacts/ia-map/IA.md`

## Source Docs Used To Build This Library

Vendored raw sources live in `docs/artifacts/ai-context/sources/`.
