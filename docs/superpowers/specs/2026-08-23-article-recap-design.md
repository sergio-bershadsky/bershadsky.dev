# Article Recap — Design

Date: 2026-08-23
Status: approved

## Problem

A reader landing on a 7–10 minute article has no way to decide, in a few seconds, whether it is worth their time. The excerpt (one sentence, ≤160 chars) is a hook, not a summary: it deliberately withholds the argument. Readers who want the substance without the full read currently have no path.

## Solution

An optional per-post recap of roughly 1,000 characters — a 30-second read that delivers the article's actual claims — revealed by a chip button in the existing article meta row.

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Content source | Hand-authored `recap:` field in `blog-posts/data.yaml` | Zero runtime cost, controlled quality, prerendered for SEO, no API key in the browser, no backend (the site has none) |
| Presentation | Inline expanding panel under the hero | Preserves scroll position and page context; no focus-trap/overlay complexity; matches the existing chip language |
| Scope | All published posts (36 at time of writing) | Format is judged across the whole catalogue at once |
| Storage location | Inside `data.yaml` beside `excerpt` | One source of truth per post; cost is a longer YAML file |
| Corner radius | Match sibling meta chips (`rounded`), not the global `--radius: 0rem` | Local consistency with adjacent elements beats the global rule for this element |

## Data layer

- `client/public/data/blog-posts/data.yaml`: optional `recap: |` block scalar per post, placed directly after `excerpt`.
- `client/src/lib/dataLoader.ts`: `RawBlogPost.recap?: string | null`; map to `recap: post.recap ?? null` in `loadBlogPosts()`.
- `client/src/lib/schema.ts`: `BlogPost.recap: string | null`.

Optional by design: posts without a recap render no chip. Nothing breaks on a missing field.

## Component

`client/src/components/ArticleRecap.tsx`

- Props: `{ recap: string; accentColor?: string | null }`.
- Owns its own `open` state. Returns `null` when `recap` is empty.
- Renders two things:
  1. **Chip button** — sits in the article meta row. `font-mono text-xs`, `Zap` icon (lucide), label `TL;DR // 30_SEC`, trailing chevron rotated 180° when open. Styling matches sibling chips (`px-3 py-1.5 rounded border`). Carries the only glow on the view while open.
  2. **Panel** — `NeonCard` with `bg-card/80 backdrop-blur-md`, border in the series accent via `style={{ borderColor }}`. Contains a `RECAP //` eyebrow in Share Tech Mono and the recap body in Merriweather serif (the site's human-voice register). Expands via framer-motion height + opacity.
- Accessibility: real `<button>` with `aria-expanded` and `aria-controls`; panel has the matching `id`. Keyboard support comes free from button semantics.
- SEO: the site's prerender emits head metadata only — the body is `<div id="root"></div>` and every page's content, including the article text, is client-rendered. The recap is therefore no more or less crawlable than the article body itself (JS-executing crawlers see both). To give non-JS crawlers the argument, `script/prerender.ts` publishes the recap as the `abstract` property of the `BlogPosting` JSON-LD.

## Integration

`client/src/pages/blog-post.tsx`:
- Chip button appended to the meta chip row (after the `AUDIENCE` chip).
- Panel rendered between the excerpt block and the series-nav block.
- Both come from the single `ArticleRecap` component; the page passes `post.recap` and the series accent color.

## Content rules

Each recap:
- 700–1200 characters (target ~1000), 3–4 sentences.
- Written in the article's own voice — no meta-framing ("This article discusses…", "In this post…").
- States what the piece claims, the load-bearing evidence, and what the reader can do with it.
- No emojis, no markdown syntax (rendered as plain text).

Generation: agents batch-read the articles' `.content.md` and draft recaps into `.draft/recaps/<id>.txt`; a second pass audits length and banned phrasing. `script/merge-recaps.py` then merges the texts into `data.yaml` as `recap: |` blocks — idempotent, re-validates every recap, and refuses to write if any fails.

## Verification

- `npm run check` — TypeScript clean.
- `npm run build` — full build including prerender; confirm recap text appears in a prerendered `index.html`.
- Audit script: every published post has a recap; every recap is 700–1200 chars; no banned meta-framing phrases; no emojis.
- Visual check of the rendered page (chip in row, panel expands, accent border correct, contrast holds over background blobs).

No test runner exists in this repo; these checks are the verification gate.

## Out of scope

- Runtime/LLM-generated summaries.
- Recaps on the home-page cards or series pages (article page only).
- Persisting open/closed state across navigation.
