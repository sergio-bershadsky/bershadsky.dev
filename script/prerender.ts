import fs from "fs";
import path from "path";
import YAML from "yaml";

const DIST = path.resolve(process.cwd(), "dist", "public");
const DATA = path.join(DIST, "data");
const BASE_URL = process.env.SITE_BASE_URL || "https://bershadsky.dev";

interface BlogPostData {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  image_url?: string;
  status: string;
  published_at?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  case_study_year?: string;
  case_study_role?: string;
  case_study_type?: string;
}

interface SeriesData {
  id: number;
  slug: string;
  title: string;
  description: string;
  accent_color?: string;
  is_visible: boolean;
}

interface SeriesPostData {
  series_id: number;
  post_id: number;
  position: number;
}

type JsonLd = Record<string, unknown>;

function loadYaml<T>(rel: string): T[] {
  const p = path.join(DATA, rel);
  if (!fs.existsSync(p)) return [];
  return (YAML.parse(fs.readFileSync(p, "utf-8")) as T[]) || [];
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface RouteMeta {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  keywords?: string;
  ogType?: string;
  publishedTime?: string;
  jsonLd: JsonLd | JsonLd[];
}

function buildHead(m: RouteMeta): string {
  const title = escapeHtml(m.title);
  const desc = escapeHtml(m.description);
  const img = m.imageUrl.startsWith("http") ? m.imageUrl : `${BASE_URL}${m.imageUrl}`;
  const ldArr = Array.isArray(m.jsonLd) ? m.jsonLd : [m.jsonLd];
  const ldScripts = ldArr
    .map(ld => `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>`)
    .join("\n    ");

  return `<title>${title}</title>
    <meta name="description" content="${desc}" />
    ${m.keywords ? `<meta name="keywords" content="${escapeHtml(m.keywords)}" />` : ""}
    <link rel="canonical" href="${m.url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:image" content="${img}" />
    <meta property="og:url" content="${m.url}" />
    <meta property="og:type" content="${m.ogType || "website"}" />
    <meta property="og:site_name" content="Sergey Bershadsky" />
    ${m.publishedTime ? `<meta property="article:published_time" content="${m.publishedTime}" />` : ""}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${desc}" />
    <meta name="twitter:image" content="${img}" />
    <meta name="robots" content="index, follow" />
    ${ldScripts}`;
}

function injectHead(shell: string, headBlock: string): string {
  // Strip the shell's existing <title>, og:*, twitter:*, description, keywords, canonical, ld+json
  // so per-route values are authoritative, then insert new head before </head>.
  let stripped = shell
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name="description"[^>]*>/gi, "")
    .replace(/<meta\s+name="keywords"[^>]*>/gi, "")
    .replace(/<meta\s+name="robots"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:[^"]+"[^>]*>/gi, "")
    .replace(/<meta\s+property="article:[^"]+"[^>]*>/gi, "")
    .replace(/<meta\s+name="twitter:[^"]+"[^>]*>/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>/gi, "")
    .replace(/<script\s+type="application\/ld\+json"[\s\S]*?<\/script>/gi, "");

  return stripped.replace(/<\/head>/i, `    ${headBlock}\n  </head>`);
}

function writeRoute(routePath: string, html: string) {
  const isRoot = routePath === "/" || routePath === "";
  const outDir = isRoot ? DIST : path.join(DIST, routePath.replace(/^\//, ""));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");
}

function homeMeta(posts: BlogPostData[], series: SeriesData[]): RouteMeta {
  return {
    title: "Sergey Bershadsky | Startup Architect & Product Delivery Expert",
    description: "Engineering leader and startup architect with over 15 years of experience scaling products in fintech and healthtech.",
    url: BASE_URL,
    imageUrl: "/opengraph.jpg",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Sergey Bershadsky | Engineering Knowledge Base",
      url: BASE_URL,
      description: "Insights on scaling architectures, distributed systems, and the future of tech.",
      author: { "@type": "Person", name: "Sergey Bershadsky", url: `${BASE_URL}/about` },
    },
  };
}

function aboutMeta(): RouteMeta {
  const jsonLd: JsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sergey Bershadsky",
    alternateName: ["Sergey", "Bershadsky", "Sergio Bershadsky"],
    jobTitle: "Tech Lead & Solution Architect",
    description: "Sergey Bershadsky - Tech Lead and Solution Architect with 20+ years of experience. Expert in Python, Django, AWS, MedTech, and ERP systems.",
    url: `${BASE_URL}/about`,
    email: "sergio.bershadsky@gmail.com",
    address: { "@type": "PostalAddress", addressLocality: "Lisbon", addressCountry: "Portugal" },
    sameAs: [
      "https://github.com/sergio-bershadsky/ai",
      "https://linkedin.com/in/bershadsky",
      "https://instagram.com/bershadsky.dev",
    ],
    knowsAbout: ["Python", "Django", "FastAPI", "AWS", "PostgreSQL", "Kubernetes", "MedTech", "ERP", "Solution Architecture"],
  };
  return {
    title: "Sergey Bershadsky | Tech Lead & Solution Architect | Python Django Expert",
    description: "Sergey Bershadsky - Tech Lead and Solution Architect with 20+ years of experience. Expert in Python, Django, AWS, MedTech, and ERP systems.",
    url: `${BASE_URL}/about`,
    imageUrl: "/images/cyberpunk_portrait_of_bearded_man_with_glasses.webp",
    keywords: "Sergey Bershadsky, Tech Lead, Solution Architect, Python Developer, Django Expert, AWS, MedTech, ERP",
    jsonLd,
  };
}

function blogMeta(post: BlogPostData, series: SeriesData[], seriesPosts: SeriesPostData[]): RouteMeta {
  const sp = seriesPosts.find(s => s.post_id === post.id);
  const postSeries = sp ? series.find(s => s.id === sp.series_id) : null;
  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt;
  const keywords = post.seo_keywords || post.tags.join(", ");
  const imageUrl = post.image_url || "/images/avatar-big.webp";
  const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;
  const publishedDate = post.published_at || post.date;

  const articleLd: JsonLd = {
    "@context": "https://schema.org",
    "@type": post.case_study_type ? "Article" : "BlogPosting",
    headline: title,
    description,
    image: imageUrl.startsWith("http") ? imageUrl : `${BASE_URL}${imageUrl}`,
    url: canonicalUrl,
    datePublished: publishedDate,
    dateModified: publishedDate,
    keywords,
    author: { "@type": "Person", name: "Sergey Bershadsky", url: `${BASE_URL}/about` },
    publisher: { "@type": "Person", name: "Sergey Bershadsky", url: BASE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    ...(postSeries
      ? { isPartOf: { "@type": "CreativeWorkSeries", name: postSeries.title, url: `${BASE_URL}/series/${postSeries.slug}` } }
      : {}),
  };

  const breadcrumbLd: JsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      ...(postSeries
        ? [{ "@type": "ListItem", position: 2, name: postSeries.title, item: `${BASE_URL}/series/${postSeries.slug}` }]
        : []),
      { "@type": "ListItem", position: postSeries ? 3 : 2, name: post.title, item: canonicalUrl },
    ],
  };

  return {
    title: `${title} | Sergey Bershadsky`,
    description,
    url: canonicalUrl,
    imageUrl,
    keywords,
    ogType: "article",
    publishedTime: publishedDate,
    jsonLd: [articleLd, breadcrumbLd],
  };
}

function seriesMeta(s: SeriesData, posts: BlogPostData[], seriesPosts: SeriesPostData[]): RouteMeta {
  const ordered = seriesPosts
    .filter(sp => sp.series_id === s.id)
    .sort((a, b) => a.position - b.position)
    .map(sp => posts.find(p => p.id === sp.post_id))
    .filter((p): p is BlogPostData => !!p && p.status === "published");

  const canonicalUrl = `${BASE_URL}/series/${s.slug}`;
  const seriesLd: JsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    name: s.title,
    description: s.description,
    url: canonicalUrl,
    author: { "@type": "Person", name: "Sergey Bershadsky", url: `${BASE_URL}/about` },
    hasPart: ordered.map((p, i) => ({
      "@type": "BlogPosting",
      position: i + 1,
      name: p.title,
      url: `${BASE_URL}/blog/${p.slug}`,
    })),
  };

  return {
    title: `${s.title} | Sergey Bershadsky`,
    description: s.description,
    url: canonicalUrl,
    imageUrl: "/opengraph.jpg",
    jsonLd: seriesLd,
  };
}

function buildSitemap(posts: BlogPostData[], series: SeriesData[]): string {
  const urls: { loc: string; lastmod?: string; changefreq: string; priority: string }[] = [
    { loc: BASE_URL, changefreq: "weekly", priority: "1.0" },
    { loc: `${BASE_URL}/about`, changefreq: "monthly", priority: "0.9" },
  ];
  series.forEach(s => urls.push({ loc: `${BASE_URL}/series/${s.slug}`, changefreq: "weekly", priority: "0.8" }));
  posts
    .slice()
    .sort((a, b) => new Date(b.published_at || b.date).getTime() - new Date(a.published_at || a.date).getTime())
    .forEach(p =>
      urls.push({
        loc: `${BASE_URL}/blog/${p.slug}`,
        lastmod: (p.published_at || p.date).split("T")[0],
        changefreq: "monthly",
        priority: p.case_study_type ? "0.8" : "0.7",
      }),
    );

  const entries = urls
    .map(
      u => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

export async function prerender() {
  const shellPath = path.join(DIST, "index.html");
  if (!fs.existsSync(shellPath)) {
    throw new Error(`prerender: SPA shell not found at ${shellPath} — run vite build first`);
  }
  const shell = fs.readFileSync(shellPath, "utf-8");

  const posts = loadYaml<BlogPostData>("blog-posts/data.yaml").filter(p => p.status === "published");
  const series = loadYaml<SeriesData>("series/data.yaml").filter(s => s.is_visible);
  const seriesPosts = loadYaml<SeriesPostData>("series-posts/data.yaml");

  let count = 0;

  // Home
  writeRoute("/", injectHead(shell, buildHead(homeMeta(posts, series))));
  count++;

  // /about
  writeRoute("/about", injectHead(shell, buildHead(aboutMeta())));
  count++;

  // /blog/:slug
  for (const p of posts) {
    if (!p.slug) continue;
    writeRoute(`/blog/${p.slug}`, injectHead(shell, buildHead(blogMeta(p, series, seriesPosts))));
    count++;
  }

  // /series/:slug
  for (const s of series) {
    writeRoute(`/series/${s.slug}`, injectHead(shell, buildHead(seriesMeta(s, posts, seriesPosts))));
    count++;
  }

  // sitemap.xml + robots.txt
  fs.writeFileSync(path.join(DIST, "sitemap.xml"), buildSitemap(posts, series), "utf-8");
  fs.writeFileSync(
    path.join(DIST, "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`,
    "utf-8",
  );

  console.log(`prerendered ${count} routes + sitemap.xml + robots.txt`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  prerender().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
