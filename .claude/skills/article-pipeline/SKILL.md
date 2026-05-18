---
name: article-pipeline
description: Use when starting, planning, writing, illustrating, or publishing any blog post or multi-part story on bershadsky.dev. Enforces the 10-minute reading cap, the opening-hook rule, the two-stage spec/plan flow (story → article) with 1-minute-readable specs landing in `.draft/`, the site's cyberpunk content style, diagram generation via the `architecture-diagram` / `architecture-diagram-react` skills under `../ai/plugins/diagramming/`, OpenAI image generation, and Telegram announcement publishing.
---

# Article Pipeline — bershadsky.dev

This is the **process skill** for content on this site. Every article and series passes through the same six stages. Do not skip stages, do not collapse them.

The site itself is a fully static React/Vite SPA prerendered to Cloudflare. Articles are YAML + Markdown under `client/public/data/`. Adding a post means: one YAML entry + one Markdown file. No code change, no DB.

## What triggers this skill

- "Start a new story / series" (e.g. *"start new story 'Zero Trust Architecture'"*)
- "Plan an article on X"
- "Write the next part of the {series} series"
- "Generate the hero image"
- "Publish announcement to Telegram"
- Any request that mutates `client/public/data/blog-posts/`, `series/`, or `series-posts/`
- Any reference to `.draft/` or a story plan / article spec

## The six stages

```
1. STORY PLAN       → .draft/<story-slug>/STORY.md          (one-time per series)
2. ARTICLE SPEC     → .draft/<story-slug>/<NN>-<slug>.md    (one per article, user approves in ≤ 1 min)
3. WRITE            → client/public/data/blog-posts/<id>.content.md + YAML entry
4. DIAGRAMS         → invoke architecture-diagram-react skill → arch-diagram blocks
5. HERO IMAGE       → OpenAI gpt-image-1 → client/public/images/<slug>.webp
6. ANNOUNCE         → Telegram, on user demand
```

Each stage produces something the user reviews before the next stage begins.

---

## Hard rules (do not violate)

1. **10-minute maximum reading time.** Target 1,500–2,000 words *including* diagrams and code blocks. If a topic doesn't fit, split it into a series. Estimate at ~220 wpm — if you cross 2,200 words, cut or split, do not compress prose into denser walls.
2. **The three-act emotional arc** — every article ships with this shape, in this order:
   - **Act 1 — Marketing shouting (2–4 sentences).** Open loud. Tagline energy. Bold claim, contrarian punch, or near-ad-copy provocation. Drop a "you can do X today, in ten minutes, and they will get nothing" if the article supports it. Lives **above** the first `##` heading, immediately after the `> excerpt` blockquote. Never an "in this article we will…" summary.
   - **Act 2 — Calm down.** From the second paragraph onward, drop the volume. Measured, technical, conversational. Dry humor and sarcasm in the asides — never in the load-bearing claims. Use blockquote callouts (`> ...`) for the one-liner zingers; keep the body prose level-headed.
   - **Act 3 — Inspire (closing 1–2 paragraphs).** Lift the reader. What does the future state feel like? What does the engineer who gets this right get to stop worrying about? End on possibility, not summary. The reader should close the tab slightly braver, not slightly more informed.
3. **Humor, sarcasm, intrigue — sprinkled, not painted.** Aim for 1 dry aside per 300–500 words. Self-aware analogies ("like meeting a brilliant colleague with complete amnesia"), light institutional cynicism ("the kind of dread reserved for pop quizzes and surprise family visits"), or pointed asides in `>` blockquotes. Never punchline-stack; one zinger per section maximum. The sarcasm must be *with* the reader, never *at* them.
4. **Specs and plans go to `.draft/`, never to git.** `.gitignore` ignores `.draft/`. The user must be able to read any spec in under one minute before approving.
5. **Follow the cyberpunk style.** No emojis in article content, only Lucide icons in UI/diagrams, no `<hr>` / `---` rules in markdown (they render as nothing — use headings for breaks), no "Reading time / Audience / Words" lines inside markdown (the hero block renders them).
6. **Diagrams are not optional decoration.** Use them when they reduce text. Use the diagram skills at `../ai/plugins/diagramming/` — never roll your own SVG.
7. **Single source of truth for prose style:** existing articles under `client/public/data/blog-posts/*.content.md`. When in doubt, sample two recent ones and match register, paragraph length, and section cadence. Reference benchmarks: posts 13 (concept piece, recognition-pain hook), 18 (technical-with-asides, blockquote zingers), 22 (dry pragmatism), 25 (case-study punch). Match their texture — not their topics.

---

## Stage 1 — Story plan (`.draft/<story-slug>/STORY.md`)

Only when starting a new multi-part story (series). One-time artifact.

**Maximum length: 30 lines. The user must absorb it in ≤ 1 minute.**

Template:

```markdown
# {STORY TITLE}

## Premise
One paragraph (≤ 5 sentences). What is the story? Who is it for? What new thing does the reader walk away knowing?

## Spine
- Part 1 — {one-line hook}
- Part 2 — {one-line hook}
- ...
- Part N — {one-line hook}

## Series accent
{cyan | pink | violet | orange — per CLAUDE.md design system; declare which color drives this series}

## Hero motif
{one sentence on the visual through-line for hero images across the series}

## Open questions
- {anything ambiguous the user needs to call before article specs begin}
```

Wait for user approval. If rejected, revise STORY.md only — do not start article specs.

---

## Stage 2 — Article spec (`.draft/<story-slug>/<NN>-<slug>.md`)

One spec per article. `NN` is the part number padded to 2 digits. **The spec itself must be readable in ≤ 1 minute** — that means ≤ 25 lines of body, no nested bullets deeper than 1 level.

Template:

```markdown
# Part NN — {ARTICLE TITLE}

**Marketing-shout opener (first 2–4 sentences, verbatim):**
> {paste the actual opening — loud, contrarian, ad-copy energy; this is the "shouting" act before the article calms down}

**Calm-down pivot (1 sentence):** how the article transitions from the shout to the measured technical body.

**Closing inspiration (1 sentence):** the lift — what future state the reader walks away wanting to build.

**Promise to the reader:** One sentence — what will they know by the end?

**Outline:**
1. {section} — {one-line summary}
2. {section} — {one-line summary}
3. {section} — {one-line summary}
(4–6 sections total. No more.)

**Diagrams needed:** {N diagrams; one-line description of each}
**Code samples needed:** {languages + what each demonstrates}
**Approx word target:** {1500–2000}
**Series accent:** {inherit from STORY.md}
**Hero image prompt seed:** {one short phrase for OpenAI image gen}
**Risks / open questions:** {anything that could derail writing}
```

Wait for user approval. If they say "approved" or "go", proceed to Stage 3. Otherwise revise the spec in place — do not start writing.

---

## Stage 3 — Write (`client/public/data/blog-posts/<id>.content.md` + YAML)

Once the spec is approved:

1. **Pick the next free `id`** by scanning `client/public/data/blog-posts/data.yaml` (numeric, monotonic) and the next file name `<id>.content.md`.
2. **Add the YAML entry** to `data.yaml`. Required keys (match existing posts):
   ```yaml
   - id: NN
     slug: kebab-case-slug
     title: "Full Title (matches article H1)"
     excerpt: "≤ 160 chars — same as the > blockquote in the markdown"
     date: "YYYY-MM-DD"
     tags: [4–6 tags, capitalised, hyphenated]
     image_url: /images/<slug>.webp
     status: published
     published_at: "YYYY-MM-DDT00:00:00Z"
     content: blog-posts/<id>.content.md
     audience: "{Everyone | Engineers | Architects | …}"
     seo_title: "≤ 60 chars"
     seo_description: "≤ 160 chars"
     seo_keywords: "comma-separated"
   ```
   For series posts also wire `series_id` and `part`/`position`.
3. **Write the markdown** at `client/public/data/blog-posts/<id>.content.md`. Structure:
   ```markdown
   # {Title}

   > {Excerpt — 1 sentence, same as YAML excerpt}

   {ACT 1 — MARKETING SHOUT, 2–4 sentences. No heading above this. Loud, contrarian, ad-copy energy. The first thing the reader sees.}

   {ACT 2 — CALM-DOWN BRIDGE, 1 short paragraph. Drop the volume. This is where the article changes register from billboard to colleague-at-a-whiteboard.}

   ## {Section 1 heading}

   {body — measured, technical, ~1 dry aside per 300–500 words, blockquote callouts for the one-liner zingers}

   ## {Section 2 heading}
   …

   ## {Final section heading — the inspiration}
   {ACT 3 — INSPIRE, 1–2 paragraphs. What does the future state feel like? What does the engineer who gets this right get to stop worrying about? End on possibility, not summary. The reader closes the tab slightly braver, not slightly more informed.}
   ```
   - Headings: only `##` and `###` inside content. The `# Title` line is parsed by the page header.
   - Do **not** use `---` horizontal rules. Existing older posts use them; they render to nothing. Headings break sections.
   - No emojis. Lucide icons may be referenced in diagrams.
   - Inline code with backticks; block code with fenced blocks, language-tagged. Use `bash`, `python`, `typescript`, `yaml`, `json`, `markdown` — the syntax highlighter handles these.
   - **Blockquote callouts (`> ...`) carry the zingers** — one-liner asides, dry punchlines, self-aware observations. Keep the running prose level; pack the humor into the `>` boxes.
4. **Sample existing voice.** Before writing the body, read 2 recent files under `client/public/data/blog-posts/` to calibrate paragraph length, sentence rhythm, section pacing, and the dry-aside cadence. The house voice is *quietly assured, concrete, recognisably amused* — never corporate, never breathless, never punchline-stacked. Avoid: "let's dive in", "in conclusion", "in today's fast-paced world", any sentence starting with "Imagine if…".

---

## Stage 4 — Diagrams (invoke the diagram skills)

For inline diagrams in the article, use the **`architecture-diagram-react`** skill at `../ai/plugins/diagramming/skills/architecture-diagram-react/`. It emits the exact fenced-block format the site renders:

````markdown
```arch-diagram
<!-- fig: N.N | title: TITLE | label: LABEL -->
<svg viewBox="..." xmlns="http://www.w3.org/2000/svg">
  ...
  <lucide-icon name="server" x="56" y="76" size="20" color="#34d399"/>
  ...
</svg>
```
````

- Read the parent skill's `design-system.md` and `label-placement.md` for colors, fonts, halos, spacing, label algorithm.
- Use the series accent (declared in STORY.md) for the FIG frame; semantic palette for components.
- Promote icons to `<lucide-icon>` placeholders where they communicate the component type (see the React skill's recommended mapping table).

For a downloadable standalone HTML version (rare — only when the user asks for a shareable artifact), use the parent **`architecture-diagram`** skill instead. The site never serves the `.html` form.

The site's existing ASCII-art diagram path (v1, under `client/src/components/markdown/diagrams/*.tsx`) is for the back catalogue. **Do not add new v1 diagrams** — new articles use `arch-diagram` blocks.

---

## Stage 5 — Hero image (OpenAI)

Each post has an `image_url: /images/<slug>.webp`. Generate via OpenAI's image API.

**Requires** `OPENAI_API_KEY` in env. Verify before invoking:

```bash
test -n "$OPENAI_API_KEY" || { echo "OPENAI_API_KEY not set"; exit 1; }
```

**Generation recipe — `/v1/images/edits` with style references (gpt-image-1, 1536×1024, webp):**

The site's three canonical style references are passed as actual image inputs to gpt-image-1. The model uses them as composition + lighting + restraint anchors. Do not skip this step; the text-only `/v1/images/generations` endpoint produces too much glow.

```bash
REF1="client/public/images/cyberpunk_autonomous_workflow_system.webp"
REF2="client/public/images/cyberpunk_decision_intelligence_system.webp"
REF3="client/public/images/cyberpunk_portrait_of_bearded_man_with_glasses.webp"

SLUG="<slug>"
PROMPT="<prompt from article spec 'Hero image prompt seed', expanded into a full image prompt
that matches the site's cyberpunk/neon thesis. This is HUD-style key art — restrained
neon UI, NOT synthwave music-video bloom. Required elements, all of them:

  - Background: deep navy-purple void (#0a0518 → #1a0a2e), faint cyan orthogonal grid
    floor, atmospheric haze present but LIGHT (never dominant). Subtle horizontal CRT
    scanlines optional, never overpowering.
  - Accent palette: match the series accent (pink #ec4899 / cyan #06b6d4 / violet #9333ea
    / orange #f97316), supported by 1 secondary accent and small magenta or electric-blue
    sparks where semantically meaningful. No off-palette colors.
  - Geometry: sharp edges, vector-clean silhouettes, readable shapes. The composition
    must read first as graphic design; lighting supports the shapes, never smothers them.
  - **Neon glow — RESTRAINED. This is the load-bearing aesthetic instruction.**
    Every neon element carries a SLIGHT outline halo, 5–10 px max, in the accent color.
    No layered bloom at 30/80 px radii. No light leak across the frame. No anamorphic
    flare. No chromatic-aberration fringes unless tiny and intentional. Surfaces stay
    crisp and readable; the glow is the outline-stroke a UI designer would draw, not
    the light-bleed of a fogged CRT.
  - Reference aesthetic — match these three existing site images in tone and restraint:
      * `client/public/images/cyberpunk_autonomous_workflow_system.webp` (HUD panels,
        thin neon pipes, distant lightning flicker — note the *restraint*)
      * `client/public/images/cyberpunk_decision_intelligence_system.webp` (document
        cards, brain center, neon branches — clean labels, outline glow only)
      * `client/public/images/cyberpunk_portrait_of_bearded_man_with_glasses.webp`
        (subtle rim-light, HUD frames at corners, mild outline halos — never blown out)
    Open these three images with the Read tool before drafting the prompt, and pattern
    the lighting after them. If your prompt language drifts toward 'bloom', 'light leak',
    'Blade Runner anamorphic', or 'synthwave music-video' — stop. Those produce too
    much glow on this site.
  - Style anchor phrases that produce the right look: 'HUD/UI key art', 'neon UI mockup',
    'editorial tech illustration', 'cyberpunk console-game overlay', 'chrome-and-cyan
    diagram aesthetic'. Use one of these explicitly in the prompt.
  - JetBrains Mono-style labels if any text appears (rare). No emojis. No human figures
    unless the article explicitly calls for one (then reference image #3's restraint).
    No AI-slop softness on geometry. No full-bloom, no flare, no light-leak language.>"

curl -sS https://api.openai.com/v1/images/edits \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "model=gpt-image-1" \
  -F "image[]=@${REF1};type=image/webp" \
  -F "image[]=@${REF2};type=image/webp" \
  -F "image[]=@${REF3};type=image/webp" \
  -F "prompt=${PROMPT}" \
  -F "size=1536x1024" \
  -F "quality=high" \
  -F "output_format=webp" \
  -F "n=1" \
  | jq -r '.data[0].b64_json' \
  | base64 --decode \
  > "client/public/images/${SLUG}.webp"
```

After generation:
1. Verify file size is reasonable (≥ 50 KB, ≤ 2 MB).
2. Show the path to the user. Do **not** auto-commit images.
3. If the user rejects the image, iterate on the prompt — do not regenerate with the same prompt.

The series hero motif from STORY.md should be discernible across all parts of a series. Drift checks: open prior images, confirm continuity before locking in.

---

## Stage 6 — Telegram announcement (on user demand only)

**Never auto-announce.** Wait for the user to say "announce" / "publish to telegram" / equivalent.

**Requires** `TELEGRAM_BOT_TOKEN` and the target chat id. The chat id should live in `.claude/article-pipeline.local.md` (also gitignored — see below) or be asked from the user once and cached there.

**Announcement template** (Markdown V2 — escape `_ * [ ] ( ) ~ \` > # + - = | { } . !` in dynamic content):

```
*<Article Title>*

<excerpt — one sentence>

Read: https://bershadsky.dev/blog/<slug>
```

**Send recipe:**

```bash
test -n "$TELEGRAM_BOT_TOKEN" || { echo "TELEGRAM_BOT_TOKEN not set"; exit 1; }
CHAT_ID="<from .claude/article-pipeline.local.md>"
TITLE_ESC="$(printf '%s' "$TITLE" | sed -E 's/([_*\[\]()~`>#+=|{}.!\\-])/\\\1/g')"
EXCERPT_ESC="$(printf '%s' "$EXCERPT" | sed -E 's/([_*\[\]()~`>#+=|{}.!\\-])/\\\1/g')"
URL="https://bershadsky.dev/blog/${SLUG}"

curl -sS "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -d "chat_id=${CHAT_ID}" \
  -d "parse_mode=MarkdownV2" \
  -d "disable_web_page_preview=false" \
  --data-urlencode "text=*${TITLE_ESC}*

${EXCERPT_ESC}

Read: ${URL}"
```

Always show the user the prepared message body before sending. Confirm before the curl actually fires.

---

## Per-project cache (`.claude/article-pipeline.local.md`)

Mirror the plugin-settings pattern. This file holds chat IDs, default audience, default tag set — anything the user has confirmed and doesn't want to re-state. Treat as gitignored (the project's `.gitignore` already covers `.local/`; the file goes next to other `.claude/*` configs and will not be committed unless deliberately added).

```markdown
---
telegram_chat_id: "-100xxxxxxxxxx"
default_audience: "Engineers"
default_tags: [AI, Architecture, Security]
last_used_id: 42
---
```

Read this file at Stage 1; update it after each successful run.

---

## What you must not do

- ❌ Don't write the article before the spec is approved.
- ❌ Don't put specs anywhere except `.draft/`.
- ❌ Don't exceed 2,200 words in a single article — split instead.
- ❌ Don't put "Reading time / Audience / Words" lines inside the markdown body.
- ❌ Don't use emojis. Don't use `---` horizontal rules. Don't use diagonal multi-stop gradients in any new UI.
- ❌ Don't auto-announce. Telegram fires only when the user explicitly asks.
- ❌ Don't commit images or YAML changes without showing the diff to the user first.
- ❌ Don't roll bespoke SVG; route through the diagramming skills.

## Quick-reference paths

| Thing | Path |
|---|---|
| Article markdown | `client/public/data/blog-posts/<id>.content.md` |
| Article YAML | `client/public/data/blog-posts/data.yaml` |
| Series YAML | `client/public/data/series/data.yaml` |
| Series-post mapping | `client/public/data/series-posts/data.yaml` |
| Hero images | `client/public/images/<slug>.webp` |
| Story plans | `.draft/<story-slug>/STORY.md` |
| Article specs | `.draft/<story-slug>/<NN>-<slug>.md` |
| Diagram skill (HTML) | `../ai/plugins/diagramming/skills/architecture-diagram/` |
| Diagram skill (React) | `../ai/plugins/diagramming/skills/architecture-diagram-react/` |
| Renderer for arch-diagram | `client/src/components/markdown/ArchDiagram.tsx` |
| Local cache | `.claude/article-pipeline.local.md` |
| Style sources | `CLAUDE.md`, `replit.md`, existing posts under `blog-posts/` |
