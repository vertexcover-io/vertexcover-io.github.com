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

## Revision 2 (same day)

Reframed the post from the studio's own verdict to a curated "what people are saying" roundup, per author request:

- TL;DR, intro, and closing now attribute judgments to builders/labs/reviewers instead of "we".
- "How we'd actually use it" → "Where the launch-week consensus lands".
- Section framings ("clear our bar", "the tell we use", "we'd treat as reliable") rewritten as community-attributed.
- A Part 2 teaser (harness experiment: Fable 5 / Opus 4.8 with & without harness, plus DeepSeek) was drafted, then removed at author request. Idea is parked for a possible follow-up post; not referenced anywhere in the published piece.

## Revision 3 (same day)

Full restructure around a head-of-engineering adoption lens, per author request:

- Reorganized from three buckets into four decision questions: is the jump real / what does it unlock / where will it burn you / do you switch.
- TL;DR rewritten so it no longer repeats body bullets verbatim.
- Cut duplication: "These aren't demos…" framing line, the genomics *Science* item (not adoption-relevant), two of four viral-demo examples, the repeated throughline/closing one-liner.
- Added new sources found via web search: HN early-tester impressions (item 48464975), HN report of fabricated test claims (launch thread), HN "mid-tier results" thread (item 48492210), CodeRabbit code-review eval (precision regression vs Opus 4.8, "selective adoption" verdict), HN safety-filter reports (medical imaging / "nuclear" physicist / MRI flagged as bioterrorism).
- Ends with five takeaway rules ("trust the diff, not the model's test report", etc.).
- Note: page-level fetches still blocked in this sandbox; new claims come from search-result summaries and must be click-verified against the linked sources before merge (especially the HN quotes and CodeRabbit numbers).

## Open items before merge (need author/network access)

- Verify every external link — outbound fetches are blocked in this environment (403s), so none of the receipts could be checked.
- Karpathy quote has no citation link; add one or cut.
- Replace "via Techmeme" / "via Digg" aggregator links for the Mollick and Taelin items with primary sources.
- Confirm Endor Labs' own wording justifies "cheating" (vs. "memorization").
- Consider adding a short first-hand "what we saw in our own harness" section — the post promises the studio's own read but currently contains only third-party evidence.
