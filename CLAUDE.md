# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Run Express server with Vite middleware in dev mode (port 5000, host 0.0.0.0). Single process serves API + client HMR.
- `npm run dev:client` — Vite-only dev server (rarely needed; the Express dev path is preferred).
- `npm run build` — Runs `script/build.ts`: `vite build` → `script/prerender.ts` (per-route `<head>` injection + sitemap/robots) → esbuild bundles `server/index.ts` to `dist/index.cjs`. Externalizes everything in `package.json` except an explicit allowlist (`express`, `ws`, `zod`, `zod-validation-error`).
- `npm run build:static` — Same as `build` but skips the server bundle. Use this for Cloudflare Pages / any static host. Set `BUILD_TARGET=static` or pass `--static` to get the same effect from `build`.
- `npm run prerender` — Runs `script/prerender.ts` standalone (assumes `dist/public/index.html` already exists from a prior `vite build`). Set `SITE_BASE_URL` to override the canonical hostname (default `https://bershadsky.dev`).
- `npm start` — Runs the production bundle from `dist/index.cjs` (Express; not used by the Cloudflare Pages deploy).
- `npm run check` — TypeScript type-check (no emit).
- There is no test runner and no lint script configured.

## Architecture

This is a single-server Express + React SPA. Content is fully static (YAML + Markdown); there is no database despite the lingering `db:push` script and `drizzle-kit` reference.

### Server (`server/`)
- `server/index.ts` is the entry. In dev it lazy-imports `server/vite.ts` to attach Vite middleware to the same HTTP server; in production it calls `serveStatic` (`server/static.ts`) to serve `dist/public`.
- `server/seo.ts` exports `setupSEO` (sitemap/robots/etc.) and `crawlerPrerender` middleware. The middleware UA-sniffs known crawlers (Googlebot, social previews, AI bots) and serves prerendered HTML with full meta tags and content for them, while regular users get the SPA. Edits to SEO behavior live here, not in the client.
- The build always outputs CJS (`dist/index.cjs`) even though `package.json` declares `"type": "module"` — this is intentional; do not switch the server output to ESM without revisiting the externals/allowlist logic in `script/build.ts`.

### Client (`client/`)
- Vite root is `client/`, output is `dist/public` (see `vite.config.ts`).
- Path aliases: `@` → `client/src`, `@shared` → `shared`, `@assets` → `attached_assets`.
- Routing uses `wouter`. SEO-friendly slugs: `/blog/:slug`, `/series/:slug`.
- UI: React 19, Tailwind v4 (via `@tailwindcss/vite`), Radix primitives, `framer-motion`, `lucide-react`. Cyberpunk/neon theme — see `replit.md` for the full design system.
- Custom Vite plugin: `vite-plugin-meta-images.ts` (referenced from `vite.config.ts`).

### Data layer (no DB)
- All content is loaded at runtime from static files under `client/public/data/`:
  - `blog-posts/data.yaml` + `blog-posts/{id}.content.md`
  - `series/data.yaml`
  - `series-posts/data.yaml`
- `client/src/lib/dataLoader.ts` fetches and parses these, transforms snake_case → camelCase, and caches results.
- Types are pure TS interfaces in `shared/schema.ts` (`BlogPost`, `Series`, `SeriesPost`, `BlogPostWithSeries`, `SeriesWithPosts`). There is no Drizzle schema in use — do not reintroduce DB-backed types here.

### Markdown rendering and ASCII-diagram detection
The blog has a non-obvious rendering pipeline under `client/src/components/markdown/`:
- `MarkdownRenderer.tsx` runs unified/remark/rehype with custom element components.
- `CodeBlock.tsx` (`CyberCodeBlock`) inspects fenced code blocks; ASCII-art diagrams are pattern-matched and replaced by React components. Detection entries live in `diagramRegistry.ts` and are populated from `diagrams/*.tsx` (one file per article/part) via `registerDiagrams()`.
- **Order matters**: more specific patterns must be registered before more general ones, or false matches will route the wrong diagram.
- To add a diagram: create a component + `detect` function in a new `diagrams/partN.tsx`, export a `DiagramEntry[]`, and register it in `CodeBlock.tsx`. Use `primitives.tsx` (`DiagramFrame`, etc.) and `lucide-react` icons; do not nest containers inside `DiagramFrame`.

## Content & asset conventions (from `replit.md`)

These are project rules, not generic style preferences — follow them when adding posts or visual content:
- Images: WebP, in `client/public/images/`, referenced as `/images/...` strings (not Vite imports). `attached_assets/` is for raw inputs, never production refs.
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

- **Cloudflare Pages (primary, static):** build command `npm run build:static`, output directory `dist/public`. `script/prerender.ts` emits per-route `index.html` files (home, `/about`, every published `/blog/:slug`, every visible `/series/:slug`) with route-specific `<title>`, OpenGraph, Twitter, canonical, and JSON-LD (`BlogPosting`+`BreadcrumbList`/`CreativeWorkSeries`/`Person`/`WebSite`). Also writes `sitemap.xml` and `robots.txt`. SPA fallback (`_redirects`) and edge headers (`_headers`) live in `client/public/`. Full guide: `CLOUDFLARE_DEPLOY.md`.
- **Replit (legacy server-rendered):** `.replit` runs `node ./dist/index.cjs`, port 5000 → 80. The Express server's `crawlerPrerender` middleware (`server/seo.ts`) does the same UA-based prerender at request time; the static deploy makes that path obsolete but the server is kept for dev (`npm run dev` uses Express + Vite middleware) and as a backup deployment target.
- **Adding new content does not require code changes.** Drop a YAML entry + `<id>.content.md` and rebuild — the prerender enumerates from YAML, so new routes appear automatically in the output and sitemap.
- **If you change the prerender's metadata shape** (`script/prerender.ts`), keep `server/seo.ts` in sync if you still use the Express deploy — they emit overlapping JSON-LD/og tags and divergence will produce inconsistent SEO across the two deploy targets.
