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
- `client/public/_redirects` and `client/public/_headers` are copied through by Vite and applied at the Cloudflare edge.

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
- To add a diagram: create a component + `detect` function in a new `diagrams/partN.tsx`, export a `DiagramEntry[]`, and register it in `CodeBlock.tsx`. Use `primitives.tsx` (`DiagramFrame`, etc.) and `lucide-react` icons; do not nest containers inside `DiagramFrame`.

## Content & asset conventions (from `replit.md`)

These are project rules, not generic style preferences — follow them when adding posts or visual content:
- Images: WebP, in `client/public/images/`, referenced as `/images/...` strings (not Vite imports). Videos in `client/public/videos/`, referenced as `/videos/...`.
- Use `lucide-react` icons everywhere — no emojis in article content, diagrams, or tables.
- No `<hr>` / `---` rules in markdown content (they render as nothing); use headings for breaks.
- Series icons are mapped in `getSeriesIcon()` in `client/src/components/SeriesRail.tsx` and `client/src/pages/blog-post.tsx` — both must be updated together when adding a series.
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

- **Cloudflare Pages (only deploy target):** build command `npm run build`, output directory `dist/public`, `NODE_VERSION=20`. Set `SITE_BASE_URL` only if the production hostname differs from `https://bershadsky.dev`. Full guide: `CLOUDFLARE_DEPLOY.md`.
- **Adding new content does not require code changes.** Drop a YAML entry into `client/public/data/blog-posts/data.yaml` plus a `<id>.content.md` file and rebuild — the prerender enumerates from YAML, so new routes appear automatically in the output and sitemap.
- **`.replit` is leftover from a prior server-rendered deploy.** The Express server has been removed; `.replit` references a `node ./dist/index.cjs` that is no longer produced. Safe to delete if you don't return to Replit hosting.
