# Deploying to Cloudflare Pages (static)

This site deploys to **Cloudflare Pages** as a fully static SPA. The Express server is **not** used in production — its crawler-prerender role is replaced by a build-time prerender step that emits per-route `index.html` files with full SEO metadata.

## What the static build produces

`npm run build` runs:
1. `vite build` → SPA shell + hashed assets in `dist/public/`
2. `script/prerender.ts` → reads YAML, writes one `index.html` per route into `dist/public/<route>/index.html` with the SPA shell + route-specific `<title>`, meta, OpenGraph, Twitter, canonical, and JSON-LD (`BlogPosting` + `BreadcrumbList` for posts, `CreativeWorkSeries` for series, `Person` for `/about`, `WebSite` for the home).
3. Writes `dist/public/sitemap.xml` and `dist/public/robots.txt`.
4. `client/public/_redirects` and `client/public/_headers` are copied through by Vite.

Routes prerendered: `/`, `/about`, `/blog/<slug>` for every published post, `/series/<slug>` for every visible series.


## Cloudflare Pages settings

| Setting | Value |
|---|---|
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist/public` |
| Node version | 20+ (set `NODE_VERSION=20` env var if needed) |

No environment variables are required. To override the canonical hostname used in meta tags / sitemap, set `SITE_BASE_URL=https://your-domain` (defaults to `https://bershadsky.dev`).

## Connecting via Git (recommended)

1. Push this repo to GitHub/GitLab.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select the repo, set the build command and output dir as above.
4. **Save and Deploy**. Production: pushes to `main`; preview: pull requests.

## Direct upload

```bash
npm install
npm run build
# upload dist/public/ via Workers & Pages → Create → Pages → Direct Upload
```

## SPA fallback and headers

- `client/public/_redirects` — `/* /index.html 200` so client-side `wouter` routes resolve when a deep link doesn't have a prerendered file (defensive only; every route in the sitemap *does* have its own file).
- `client/public/_headers` — long cache for `/assets/*` (Vite hashes them), short cache for `/data/*` and HTML, baseline security headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`).

## Custom domain

Pages project → **Custom domains** → add `bershadsky.dev` (or your domain) → follow the DNS instructions. The prerender uses `https://bershadsky.dev` for canonicals; if the production hostname differs, set `SITE_BASE_URL` in Pages env vars and rebuild.

## After adding a new post or series

A new post is just a YAML entry + `<id>.content.md` file. Trigger a rebuild (push to `main` or click "Retry deployment") — the prerender will emit `dist/public/blog/<new-slug>/index.html` and add the URL to the sitemap automatically. Nothing in the prerender script is hardcoded per-post.

## Local verification

```bash
npm run build
npx serve dist/public        # or any static server on dist/public
```

Spot-check that `/blog/<slug>/index.html` contains the route-specific `<title>` and a `BlogPosting` JSON-LD block before deploying.

## Troubleshooting

- **404 on a deep link in production** — confirm `_redirects` was published (it should be at `https://yoursite/_redirects` returning text). Pages picks it up automatically when present in the output dir root.
- **Wrong canonical / og:url on prerendered pages** — set `SITE_BASE_URL` and rebuild.
- **Stale page after deploy** — `/*.html` is `max-age=0, must-revalidate`; if you changed `_headers`, hard-refresh once. Hashed `/assets/*` files are immutable, so old shells won't pick up new chunks until the HTML revalidates (which it does on every visit).
