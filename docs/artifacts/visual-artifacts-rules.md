# Visual Artifacts Rules (Canonical)

Single source of truth for generating and updating:
- D2 user flows. Markdown with embedded D2 code blocks.
- Mermaid IA map. `<project_root>/docs/artifacts/ia-map/IA.md`

## How To Use This Doc

If you are generating or updating a visual artifact:
1. Read this file first.
2. Apply the relevant section (D2 or Mermaid).
3. Do not restate rules elsewhere. Just link here.

## Common

**Goals:**
- Visualize relationships, flow, or structure clearly
- Enable quick comprehension of system behavior
- Serve as communication tool between design and implementation
- Document edge cases separately from the main flow. Sort by priority/likelihood.

**Non-goals:**
<!-- - Documenting every edge case or state -->
- Replacing written specifications
- Pixel-perfect UI mockups

**Naming conventions:**
- Use clear, descriptive node labels (verb + noun: "Submit Order", not "SO")
- Be specific: "Payment Failed" not "Error"
- Match terminology in codebase/design docs

**Screen IDs:**
- Reference ID format: `SCR-###` (3-digit number, used in documentation and cross-references)
- D2 node ID format: `screen-name` (kebab-case, used in diagram code)
- Examples: `SCR-008` references `scan-camera` node, `SCR-001` references `meal-list` node
- Both must be unique within artifact
- Maintain mapping between reference IDs and node IDs in IA map

**Metadata:**
- Include creation date, last modified
- IA map (IA.md): track via top-of-file metadata header (`**Last Updated:**`, etc.)

**Quality bar:**
- Max 15-20 nodes per diagram (split if exceeding)
- All relationships labeled when adding clarity
- Logical grouping applied (containers/subgraphs for related components)
- Consistent styling throughout artifact
- No orphaned nodes (all connected to flow)

**After generating**
- Explain concisely what the diagram shows
- Offer to refine or expand specific sections

**Versioning policy:**
- User flows (.md): Create new dated file for scope changes. Use `-v2`, `-v3` suffix only if same-day collision occurs.
- Mermaid IA map: Always update in-place (single source of truth). Use git history for tracking.
- Minor fixes (typos, styling): Update in-place for all artifact types.

## D2 User Flows

**File naming:**
- Pattern: `FLOW[YYMMDD]-[CR##-##]-[slug].md` (baseline slices use `CR##-00`)
- Example (CR-tied): `FLOW251216-CR03-01-scan-camera-capture.md`
- Location (CR): `<project_root>/docs/change-requests/<cr-group>/<CR##-##>/`
- Location (registry): `<project_root>/docs/artifacts/userflows/FLOWS.md`
- Collision rule: if filename exists same day, append `-v2`, `-v3`, etc. before extension

**Slug derivation (CR mode):**
- Extract first 2-3 words from feature name (before " - CR##-##" in frontmatter title)
- Convert to kebab-case
- Example: "Scan Results - Analyze and log - CR03-02" → `FLOW251217-CR03-02-scan-results.md`
- CRITICAL: Use same slug as wireframe for same CR (consistency across artifact types)

**File structure:**

Markdown file with YAML frontmatter, User Story, Acceptance Criteria, and embedded D2 code block:

```markdown
---
slice_id: CR##-##
title: Feature name - CR##-##
summary: One sentence on goal
touches: [SCR-### Screen, SCR-### Screen]
depends_on: [CR##-##]
created: YYYY-MM-DD
updated: YYYY-MM-DD
last_updated_by: username
---

# Feature name - CR##-##

**User Story:** As a [persona], I want to [goal], so that [benefit].

**Acceptance Criteria:**
- Criterion 1
- Criterion 2
- Criterion 3

\```d2
direction: down
[... D2 diagram code ...]
\```
```

**Direction:**
- Use `direction: down` (top-to-bottom) for easier viewing without horizontal scrolling

**Shape mapping:**
- Oval (gray fill `#E8E8E8`): start/end states
- Rectangle (green fill `#90EE90`): screens/views
- Rectangle (light blue fill `#ADD8E6`): user actions
- Rectangle (light yellow fill `#FFF9C4`): UI overlays (toasts, notifications)
- Diamond (light red fill `#FFCCCB`): decision points
- Cylinder: data stores (optional, rarely used)

**Flow structure:**
- Use `->` for main flow (solid arrow)
- Use `--` for weak/optional connections (dashed)
- Use `<->` for bidirectional flow
- Label edges with user actions: `-> : "Tap Food Tile"`
- Group related screens in containers: `quick-add-flow: { ... }`

**Decision points:**
- Diamond shape with clear yes/no branches
- Format: `node -> decision: "condition"` then `decision -> outcome-a: "yes"` and `decision -> outcome-b: "no"`

**Quality checklist:**
- ☐ Frontmatter complete and accurate
- ☐ User Story displayed in body (As a... I want... So that...)
- ☐ Acceptance Criteria displayed in body (bulleted list)
- ☐ Clear node labels (screen names match codebase)
- ☐ All edges labeled with user actions or data flow
- ☐ Max 15-20 nodes (split into separate diagrams if larger)
- ☐ Containers used to group related screens
- ☐ Decision points clearly marked with branches
- ☐ No orphaned nodes

## Mermaid IA Map

**File location:**
- Single file: `<project_root>/docs/artifacts/ia-map/IA.md`
- Contains Mermaid graph definition + metadata header (no YAML frontmatter)

**Graph direction:**
- Use `graph TD` (top-down) for hierarchical structure
- Use `graph LR` (left-right) only for shallow, wide structures

**Arrow styles:**
- `-->` solid arrow (main navigation flow)
- `-.->` dotted arrow (optional/conditional navigation)
- `==>` thick arrow (critical path)
- `o-->` circle end (aggregation - screen contains multiple)
- `*-->` diamond end (composition - screen owns child)

**Update rules (in-place edits):**
- Update existing IA.md file (no dated versions)
- Add new screens with appropriate domain classification (auth/hub/food/profile)
- Maintain consistent indentation and grouping
- Update the `**Last Updated:**` line

**Quality checklist:**
- ☐ All screens have clear, descriptive labels
- ☐ Appropriate arrow styles for relationship types
- ☐ Max 15-20 nodes visible (use subgraphs if larger)
- ☐ No orphaned nodes
- ☐ Navigation paths logical and complete
