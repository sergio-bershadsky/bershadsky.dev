# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server on port 5000 with HMR. There is no backend — everything is static (YAML + Markdown loaded client-side).
- `npm run build` — Runs `script/build.ts`: `vite build` → `script/prerender.ts`. Output: `dist/public/` (per-route `index.html`, sitemap, robots, hashed assets). This is the artifact Cloudflare Pages deploys.
- `npm run prerender` — Runs `script/prerender.ts` standalone (assumes `dist/public/index.html` already exists from a prior `vite build`). Set `SITE_BASE_URL` to override the canonical hostname (default `https://bershadsky.dev`).
- `npm run check` — TypeScript type-check (no emit).
- There is no test runner, no lint script, no backend, no database.

## Architecture

This is a **fully static React SPA**, prerendered at build time, deployed to Cloudflare Pages. Content lives in YAML + Markdown under `client/public/data/`; there is no server, no database, no API.

### Build pipeline
- `script/build.ts` orchestrates `vite build` → `script/prerender.ts`.
- `script/prerender.ts` reads YAML, constructs per-route `<head>` (title, meta, OG/Twitter, canonical, JSON-LD) and writes `dist/public/<route>/index.html` for `/`, `/about`, every published `/blog/:slug`, every visible `/series/:slug`. Also emits `sitemap.xml` and `robots.txt`.
- `client/public/_headers` is copied through by Vite and applied at the Cloudflare edge. SPA fallback for unknown routes is handled by `wrangler.jsonc` (`assets.not_found_handling: "single-page-application"`), not by a `_redirects` file.

### Client (`client/`)
- Vite root is `client/`, output is `dist/public` (see `vite.config.ts`).
- Path alias: `@` → `client/src` (only one). Shared TS types live in `client/src/lib/schema.ts`. Static media goes in `client/public/` and is referenced as a string path like `/images/foo.webp` or `/videos/foo.mp4` — no Vite import.
- Routing uses `wouter`. SEO-friendly slugs: `/blog/:slug`, `/series/:slug`.
- UI: React 19, Tailwind v4 (via `@tailwindcss/vite`), Radix primitives, `framer-motion`, `lucide-react`. Cyberpunk/neon theme — see `replit.md` for the full design system.
- Custom Vite plugin: `vite-plugin-meta-images.ts` (referenced from `vite.config.ts`).

### Data layer (no DB)
- All content is loaded at runtime from static files under `client/public/data/`:
  - `blog-posts/data.yaml` + `blog-posts/{id}.content.md`
  - `series/data.yaml`
  - `series-posts/data.yaml`
- `client/src/lib/dataLoader.ts` fetches and parses these, transforms snake_case → camelCase, and caches results.
- Types are pure TS interfaces in `client/src/lib/schema.ts` (`BlogPost`, `Series`, `SeriesPost`, `BlogPostWithSeries`, `SeriesWithPosts`). There is no Drizzle schema in use — do not reintroduce DB-backed types here.

### Markdown rendering and ASCII-diagram detection
The blog has a non-obvious rendering pipeline under `client/src/components/markdown/`:
- `MarkdownRenderer.tsx` runs unified/remark/rehype with custom element components.
- `CodeBlock.tsx` (`CyberCodeBlock`) inspects fenced code blocks; ASCII-art diagrams are pattern-matched and replaced by React components. Detection entries live in `diagramRegistry.ts` and are populated from `diagrams/*.tsx` (one file per article/part) via `registerDiagrams()`.
- **Order matters**: more specific patterns must be registered before more general ones, or false matches will route the wrong diagram.
- To add a diagram (v1): create a component + `detect` function in a new `diagrams/partN.tsx`, export a `DiagramEntry[]`, and register it in `CodeBlock.tsx`. Use `primitives.tsx` (`DiagramFrame`, etc.) and `lucide-react` icons; do not nest containers inside `DiagramFrame`.
- **v2 architecture diagrams (`arch-diagram` fenced block):** `ArchDiagram.tsx` renders inline SVG on a slate-950 + JetBrains Mono surface; `archDiagramIcons.ts` expands `<lucide-icon name=… x=… y=… size=… color=…/>` placeholders into real Lucide paths before DOMPurify sanitization. To **generate** the SVG, use the local skill at `../ai/plugins/diagramming/skills/architecture-diagram/` (extends Cocoon-AI with label-placement algorithm, halo CSS, audit script, coordinate-shifter). Paste the resulting `<svg>...</svg>` into a fenced block tagged `arch-diagram`; the v1 ASCII-pattern path is unaffected.
- **MANDATORY diagram rules — do not violate, do not eyeball:**
  1. **Reserve icon space.** When a `<lucide-icon>` sits in a box's left padding, the in-box label *must not centre on the full box width*. Use Pattern A from the React skill: `text_x = (icon_right + 8 + box_right) / 2` with `text-anchor="middle"`. Centering on `box_cx` produces visible icon/text intersection and has been reported on shipped diagrams multiple times.
  2. **Chip-rect — exactly one per floating label.** Every floating `<text>` (titles, edge labels, cluster names, annotations — anything not inside a coloured component box) gets a chip-rect directly before it: `<rect ... fill="rgba(15,23,42,0.92)" stroke="rgba(148,163,184,0.75)" stroke-width="1" rx="3"/>`. *Never* nest two chip-rects (the result is a double-bordered pill, a known bug). Don't draw decorative outer rects around a label — if you want emphasis, use larger `font-size` or `font-weight="700"`.
  3. **Halos on every text.** `paint-order="stroke fill" stroke="rgba(2,6,23,0.65)" stroke-width="3"`. No exceptions, including the labels inside coloured component boxes.
  Both rules are documented in detail in `../ai/plugins/diagramming/skills/architecture-diagram-react/SKILL.md` — read it before generating any diagram. Two helper scripts live at `/tmp/add_chip_rects.py` (single-chip post-pass) and `/tmp/dedupe_chip_rects.py` (removes accidental doubles).

## Active publication state

Three series are live with the publication calendar interleaved across Jan–Mar 2026:

| Series id | Display title | URL slug | Accent | Posts live |
|---|---|---|---|---|
| 5 | Second Brain | `second-brain-claude` | pink `#ec4899` | 12 (parts 1–12) |
| 7 | Zero Trust | `zero-trust` | cyan `#06b6d4` | 3 (parts 1–3) |
| 8 | Agnostic Way | `cloud-agnostic` | amber `#f59e0b` | 1 (Part 1) |
| 9 | SBDB | `secondbrain-db` | emerald `#10b981` | 6 (parts 1–6) |

Important conventions:
- **Display title and slug may differ** (e.g. *Agnostic Way* lives at `/series/cloud-agnostic`; *SBDB* lives at `/series/secondbrain-db`). The slug is the canonical URL identifier and is stable once a series ships — do not rename slugs after a Telegram announcement has gone out.
- Article titles follow `[Series display title]: [Topic]` (e.g. `SBDB: Typed Schemas`).
- New series colors come from `.draft/series-palette.md` — 16 reserved slots, 4 claimed, 12 free. One series owns one accent; do not re-use a slot.

## Content & asset conventions (from `replit.md`)

These are project rules, not generic style preferences — follow them when adding posts or visual content:
- Images: WebP, in `client/public/images/`, referenced as `/images/...` strings (not Vite imports). Videos in `client/public/videos/`, referenced as `/videos/...`.
- Use `lucide-react` icons everywhere — no emojis in article content, diagrams, or tables.
- No `<hr>` / `---` rules in markdown content (they render as nothing); use headings for breaks.
- Series icons are mapped in **one** place: `client/src/lib/seriesIcons.tsx` (`SERIES_ICON_MAP`). The three call sites (`SeriesRail.tsx`, `blog-post.tsx`, `series.tsx`) all import `getSeriesIcon` from there. Adding a new series: add one entry to the map — do not re-introduce per-page switch statements.
- Article title format for series posts: `[SERIES NAME]: [TOPIC]` (the "PART: N" badge is rendered separately, not in the title string).
- Do not put "Reading time / Audience / Words" metadata inside article markdown — the hero block already shows it.

## Design principles (must follow when adding/changing UI)

The site has a strong cyberpunk/neon point-of-view. New UI must extend it, not dilute it. Read `client/src/index.css` and `client/src/components/CyberpunkUI.tsx` before introducing components.

**Aesthetic identity (do not break):**
- Palette: void purple/black background (`--background: 260 50% 5%`) with three neon accents — pink `--primary`, cyan `--secondary`, electric purple `--accent`. Series content owns one accent each (Second Brain=pink, Architecture=cyan, Startup=purple, Case Study=orange `#f97316`). Color carries information; do not introduce a fourth accent without a reason.
- Type: `Tektur` (display, always `uppercase tracking-wider` — globally enforced on h1–h6), `Share Tech Mono` (labels, system voice), `Inter` (body), `Merriweather` (serif, reserved for human-voice moments — author bios, article ledes). Don't reach for Inter/Roboto/system for headings.
- Geometry: `--radius: 0rem`. Sharp corners are the brand. Don't round things.
- Motif: `NeonCard` corner ticks (the four 2×2 absolute-positioned brackets) are a signature — preserve them on any new card surface.
- Voice: terse machine register for labels (`READ_ARTICLE`, `LOAD_MORE //`, `KNOWLEDGE_BASE // ONLINE`). Pair with a quieter human register in body copy — don't shout everywhere.

**Restraint rules (these are easy to violate):**
- **One glow per viewport.** `text-glow` / `box-glow` / `shadow-[0_0_*]` are reserved for the primary CTA and the currently-focused interactive element. Do not put glows on every card, button, and pill — when everything glows, nothing reads.
- **Avoid diagonal multi-stop gradients on text.** `bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text` is the most generic move in this aesthetic; prefer solid accent + `text-glow`, or a tracked-out eyebrow + a single-color headline.
- **One hover transform per element.** Don't stack `whileHover scale` on a `NeonCard` *and* its parent `Link`. Pick border-color swap or a 1px translate; reserve scale for the deepest leaf.
- **Reuse the existing primitives** — `NeonCard`, `CyberButton`, `SectionHeader`, `GlitchText`, `NameGlitch`, the `DiagramFrame` in `markdown/primitives.tsx`. Don't fork these to add a variant; extend them.
- **Lucide icons only**, sized `w-3 h-3` / `w-4 h-4` / `w-5 h-5`. No emojis in UI or content.
- **Animations should be choreographed, not scattered.** Prefer one well-staggered page-load reveal (cascade of `animation-delay` / framer `delay`) over many ambient micro-interactions. Hero motion uses `framer-motion`; staggered children > simultaneous fade.

**Backgrounds & atmosphere:**
- Page background is owned by `<CyberpunkBackground />` (animated blobs + grid + scanlines, `mix-blend-screen`). Don't add a second full-page background. Section-level atmosphere belongs inside `NeonCard` or `DiagramFrame`.
- When placing content over the blobs, ensure the card has `bg-card/80 backdrop-blur-md` (or stronger) so text contrast holds on the brightest blob overlap.

**Content surfaces (cards, sections, diagrams):**
- Cards: borrow `NeonCard` and let series accent flow through `style={{ borderColor }}` rather than adding a class per color.
- Diagrams: follow the flat `DiagramFrame` structure documented in `replit.md` — header row with `FIG X.X // NAME` on the left, `TYPE` label on the right; no nested wrapper containers; flex/grid layouts use `gap-3`/`gap-4`; text sizes `text-sm` for headers, `text-xs` for body.

**The "AI-slop" sniff test before merging UI:** If the change could appear unmodified on a generic SaaS landing page (rounded corners, Inter headings, purple-on-white gradient, evenly-spaced cards with soft shadows), it does not belong here. Extend the cyberpunk thesis or don't ship it.

## Deployment notes

- **Cloudflare (only deploy target):** build command `npm run build`, output directory `dist/public`, `NODE_VERSION=20`. Deploy config is `wrangler.jsonc` (Workers Static Assets with SPA `not_found_handling`); a Pages-only project would use the same build/output. Set `SITE_BASE_URL` only if the production hostname differs from `https://bershadsky.dev`. Full guide: `CLOUDFLARE_DEPLOY.md`.
- **Adding new content does not require code changes.** Drop a YAML entry into `client/public/data/blog-posts/data.yaml` plus a `<id>.content.md` file and rebuild — the prerender enumerates from YAML, so new routes appear automatically in the output and sitemap.
- **`.replit` is leftover from a prior server-rendered deploy.** The Express server has been removed; `.replit` references a `node ./dist/index.cjs` that is no longer produced. Safe to delete if you don't return to Replit hosting.
