# Publish "Claude Fable 5: Truth vs. Fable" blog post

- **Date**: 2026-06-12
- **Category**: task
- **Branch**: `claude/epic-galileo-byluwa`

## Goal

Turn the uploaded draft (`claudefable5truthvsfable.md`) into a publishable blog post following repo conventions, with an editorial critique pass.

## Changes made vs. the draft

1. Converted to `.mdx` at `blog/2026-06-12-claude-fable-5-truth-vs-fable.mdx`.
2. Frontmatter brought in line with other posts: added `date`, `draft: false`, quoted slug; tags `[ai, claude]` (added `claude`, which exists in `tags.yml`).
3. Replaced the bold `**TL;DR:**` block with the site's `<TLDR>` component.
4. Replaced `<!-- truncate -->` with `{/* truncate */}` (HTML comments break MDX v3).
5. "three independent labs" → "three independent evaluations" in the TL;DR and "The bad" intro — the Agents' Last Exam counterexample is sourced to VentureBeat coverage, not a named lab, so "labs" overstated it. Body still names Andon Labs and Endor Labs where accurate.
6. Cut the skeptic quote in "The fable" section ("docs are still playing catch-up…") — it read as a non-sequitur and didn't support the demo-vs-evidence point.
7. Internal link to the context-engineering post made relative (`/claude-code-context-engineering-v2`) so the build's broken-link checker validates it.

## Open items before merge (need author/network access)

- Verify every external link — outbound fetches are blocked in this environment (403s), so none of the receipts could be checked.
- Karpathy quote has no citation link; add one or cut.
- Replace "via Techmeme" / "via Digg" aggregator links for the Mollick and Taelin items with primary sources.
- Confirm Endor Labs' own wording justifies "cheating" (vs. "memorization").
- Consider adding a short first-hand "what we saw in our own harness" section — the post promises the studio's own read but currently contains only third-party evidence.
