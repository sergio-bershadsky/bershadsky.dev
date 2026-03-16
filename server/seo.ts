import { type Request, type Response, type NextFunction, type Express } from "express";
import fs from "fs";
import path from "path";
import YAML from "yaml";
import { marked } from "marked";

const BASE_URL = "https://bershadsky.dev";

const CRAWLER_UA_PATTERNS = [
  /googlebot/i, /bingbot/i, /slurp/i, /duckduckbot/i, /baiduspider/i,
  /yandexbot/i, /sogou/i, /facebot/i, /ia_archiver/i,
  /twitterbot/i, /linkedinbot/i, /whatsapp/i, /telegrambot/i,
  /slackbot/i, /discordbot/i, /redditbot/i,
  /gptbot/i, /chatgpt/i, /claudebot/i, /anthropic/i, /ccbot/i,
  /perplexitybot/i, /bytespider/i, /cohere-ai/i,
  /applebot/i, /semrushbot/i, /ahrefsbot/i, /mj12bot/i, /dotbot/i,
  /rogerbot/i, /screaming frog/i, /petalbot/i,
  /embedly/i, /quora link preview/i, /outbrain/i,
  /pinterest/i, /developers\.google/i,
  /facebookexternalhit/i, /vkshare/i, /w3c_validator/i,
  /scrapy/i,
];

function isCrawler(ua: string): boolean {
  return CRAWLER_UA_PATTERNS.some(pattern => pattern.test(ua));
}

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
  content?: string;
  audience?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  case_study_year?: string;
  case_study_role?: string;
  case_study_type?: string;
  video_url?: string;
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

let cachedPosts: BlogPostData[] | null = null;
let cachedSeries: SeriesData[] | null = null;
let cachedSeriesPosts: SeriesPostData[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 60000;

function getDataPath(filename: string): string {
  const devPath = path.resolve(process.cwd(), "client", "public", "data", filename);
  const distPath = path.resolve(process.cwd(), "dist", "public", "data", filename);
  if (fs.existsSync(devPath)) return devPath;
  if (fs.existsSync(distPath)) return distPath;
  return devPath;
}

function loadYaml<T>(filename: string): T[] {
  try {
    const filePath = getDataPath(filename);
    const content = fs.readFileSync(filePath, "utf-8");
    return YAML.parse(content) || [];
  } catch {
    return [];
  }
}

function refreshCache() {
  const now = Date.now();
  if (cachedPosts && now - cacheTimestamp < CACHE_TTL) return;
  cachedPosts = loadYaml<BlogPostData>("blog-posts/data.yaml");
  cachedSeries = loadYaml<SeriesData>("series/data.yaml");
  cachedSeriesPosts = loadYaml<SeriesPostData>("series-posts/data.yaml");
  cacheTimestamp = now;
}

function getPosts(): BlogPostData[] {
  refreshCache();
  return cachedPosts || [];
}

function getSeries(): SeriesData[] {
  refreshCache();
  return cachedSeries || [];
}

function getSeriesPosts(): SeriesPostData[] {
  refreshCache();
  return cachedSeriesPosts || [];
}

function loadMarkdownContent(postSlug: string, posts: BlogPostData[]): string {
  const post = posts.find(p => p.slug === postSlug);
  if (!post) return "";
  try {
    const contentFile = `blog-posts/${post.id}.content.md`;
    const filePath = getDataPath(contentFile);
    const md = fs.readFileSync(filePath, "utf-8");
    return marked.parse(md, { async: false }) as string;
  } catch {
    return "";
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHomePage(robotsDirective?: string): string {
  const posts = getPosts().filter(p => p.status === "published");
  const series = getSeries().filter(s => s.is_visible);

  const postListHtml = posts
    .sort((a, b) => new Date(b.published_at || b.date).getTime() - new Date(a.published_at || a.date).getTime())
    .map(p => `<li><a href="${BASE_URL}/blog/${p.slug}">${escapeHtml(p.title)}</a><p>${escapeHtml(p.excerpt)}</p></li>`)
    .join("\n");

  const seriesListHtml = series
    .map(s => `<li><a href="${BASE_URL}/series/${s.slug}">${escapeHtml(s.title)}</a><p>${escapeHtml(s.description)}</p></li>`)
    .join("\n");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sergey Bershadsky | Engineering Knowledge Base",
    url: BASE_URL,
    description: "Insights on scaling architectures, distributed systems, and the future of tech.",
    author: {
      "@type": "Person",
      name: "Sergey Bershadsky",
      url: `${BASE_URL}/about`,
    },
  };

  return buildHtmlPage({
    title: "Sergey Bershadsky | Startup Architect & Product Delivery Expert",
    description: "Engineering leader and startup architect with over 15 years of experience scaling products in fintech and healthtech.",
    url: BASE_URL,
    imageUrl: `${BASE_URL}/images/cyberpunk_portrait_of_bearded_man_with_glasses.webp`,
    jsonLd,
    robotsDirective,
    body: `
      <h1>Engineering Thoughts & Systems</h1>
      <p>Insights on scaling architectures, distributed systems, and the future of tech by Sergey Bershadsky.</p>
      <h2>Series</h2><ul>${seriesListHtml}</ul>
      <h2>Articles</h2><ul>${postListHtml}</ul>
    `,
  });
}

function buildBlogPostPage(slug: string, robotsDirective?: string): string | null {
  const posts = getPosts();
  const post = posts.find(p => p.slug === slug && p.status === "published");
  if (!post) return null;

  const series = getSeries();
  const seriesPosts = getSeriesPosts();
  const sp = seriesPosts.find(s => s.post_id === post.id);
  const postSeries = sp ? series.find(s => s.id === sp.series_id) : null;

  const content = loadMarkdownContent(slug, posts);
  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt;
  const keywords = post.seo_keywords || post.tags.join(", ");
  const imageUrl = post.image_url ? `${BASE_URL}${post.image_url}` : `${BASE_URL}/images/avatar-big.webp`;
  const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;
  const publishedDate = post.published_at || post.date;

  const jsonLd: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": post.case_study_type ? "Article" : "BlogPosting",
    headline: title,
    description: description,
    image: imageUrl,
    url: canonicalUrl,
    datePublished: publishedDate,
    dateModified: publishedDate,
    keywords: keywords,
    author: {
      "@type": "Person",
      name: "Sergey Bershadsky",
      url: `${BASE_URL}/about`,
    },
    publisher: {
      "@type": "Person",
      name: "Sergey Bershadsky",
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    ...(postSeries ? {
      isPartOf: {
        "@type": "CreativeWorkSeries",
        name: postSeries.title,
        url: `${BASE_URL}/series/${postSeries.slug}`,
      },
    } : {}),
  };

  const breadcrumbJsonLd = {
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

  return buildHtmlPage({
    title: `${title} | Sergey Bershadsky`,
    description,
    url: canonicalUrl,
    imageUrl,
    keywords,
    type: "article",
    publishedTime: publishedDate,
    jsonLd: [jsonLd, breadcrumbJsonLd],
    robotsDirective,
    body: `
      <article>
        <h1>${escapeHtml(post.title)}</h1>
        <p><em>${escapeHtml(post.excerpt)}</em></p>
        <div>${content}</div>
        <footer>
          <p>Tags: ${post.tags.map(t => escapeHtml(t)).join(", ")}</p>
          <p>Published: ${publishedDate}</p>
          ${post.case_study_role ? `<p>Role: ${escapeHtml(post.case_study_role)}</p>` : ""}
          ${post.case_study_year ? `<p>Year: ${escapeHtml(post.case_study_year)}</p>` : ""}
        </footer>
      </article>
      <nav><a href="${BASE_URL}">Back to Home</a></nav>
    `,
  });
}

function buildSeriesPage(slug: string, robotsDirective?: string): string | null {
  const series = getSeries().find(s => s.slug === slug && s.is_visible);
  if (!series) return null;

  const seriesPosts = getSeriesPosts().filter(sp => sp.series_id === series.id);
  const posts = getPosts().filter(p => p.status === "published");
  const seriesPostsList = seriesPosts
    .sort((a, b) => a.position - b.position)
    .map(sp => posts.find(p => p.id === sp.post_id))
    .filter(Boolean) as BlogPostData[];

  const canonicalUrl = `${BASE_URL}/series/${slug}`;

  const postListHtml = seriesPostsList
    .map((p, i) => `<li>Part ${i + 1}: <a href="${BASE_URL}/blog/${p.slug}">${escapeHtml(p.title)}</a><p>${escapeHtml(p.excerpt)}</p></li>`)
    .join("\n");

  const jsonLd: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    name: series.title,
    description: series.description,
    url: canonicalUrl,
    author: {
      "@type": "Person",
      name: "Sergey Bershadsky",
      url: `${BASE_URL}/about`,
    },
    hasPart: seriesPostsList.map((p, i) => ({
      "@type": "BlogPosting",
      position: i + 1,
      name: p.title,
      url: `${BASE_URL}/blog/${p.slug}`,
    })),
  };

  const breadcrumbJsonLd: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: series.title, item: canonicalUrl },
    ],
  };

  return buildHtmlPage({
    title: `${series.title} | Sergey Bershadsky`,
    description: series.description,
    url: canonicalUrl,
    imageUrl: `${BASE_URL}/images/cyberpunk_portrait_of_bearded_man_with_glasses.webp`,
    jsonLd: [jsonLd, breadcrumbJsonLd],
    robotsDirective,
    body: `
      <h1>${escapeHtml(series.title)}</h1>
      <p>${escapeHtml(series.description)}</p>
      <ol>${postListHtml}</ol>
      <nav><a href="${BASE_URL}">Back to Home</a></nav>
    `,
  });
}

function buildAboutPage(robotsDirective?: string): string {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sergey Bershadsky",
    alternateName: ["Sergey", "Bershadsky", "Sergio Bershadsky"],
    jobTitle: "Tech Lead & Solution Architect",
    description: "Sergey Bershadsky - Tech Lead and Solution Architect with 20+ years of experience. Expert in Python, Django, AWS, MedTech, and ERP systems.",
    url: `${BASE_URL}/about`,
    email: "sergio.bershadsky@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lisbon",
      addressCountry: "Portugal",
    },
    sameAs: [
      "https://github.com/sergio-bershadsky/ai",
      "https://linkedin.com/in/bershadsky",
      "https://instagram.com/bershadsky.dev",
      "https://talent.toptal.com/resume/developers/sergey-nikitin",
    ],
    knowsAbout: ["Python", "Django", "FastAPI", "AWS", "PostgreSQL", "Kubernetes", "MedTech", "ERP", "Solution Architecture"],
    worksFor: { "@type": "Organization", name: "Toptal" },
  };

  return buildHtmlPage({
    title: "Sergey Bershadsky | Tech Lead & Solution Architect | Python Django Expert",
    description: "Sergey Bershadsky - Tech Lead and Solution Architect with 20+ years of experience. Expert in Python, Django, AWS, MedTech, and ERP systems. Available for consulting and technical leadership roles.",
    url: `${BASE_URL}/about`,
    imageUrl: `${BASE_URL}/images/cyberpunk_portrait_of_bearded_man_with_glasses.webp`,
    keywords: "Sergey Bershadsky, Tech Lead, Solution Architect, Python Developer, Django Expert, AWS, MedTech, ERP, Toptal",
    jsonLd,
    robotsDirective,
    body: `
      <h1>Sergey Bershadsky</h1>
      <h2>Tech Lead & Solution Architect</h2>
      <p>Engineering leader with 20+ years of experience scaling products in fintech and healthtech. Expert in Python, Django, AWS, Kubernetes, and distributed systems.</p>
      <p>Available for consulting and technical leadership roles.</p>
      <nav><a href="${BASE_URL}">Back to Home</a></nav>
    `,
  });
}

type JsonLdObject = Record<string, unknown>;

interface PageOptions {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  keywords?: string;
  type?: string;
  publishedTime?: string;
  jsonLd: JsonLdObject | JsonLdObject[];
  body: string;
  robotsDirective?: string;
}

function buildHtmlPage(opts: PageOptions): string {
  const jsonLdScripts = Array.isArray(opts.jsonLd)
    ? opts.jsonLd.map(ld => `<script type="application/ld+json">${JSON.stringify(ld)}</script>`).join("\n")
    : `<script type="application/ld+json">${JSON.stringify(opts.jsonLd)}</script>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(opts.title)}</title>
  <meta name="description" content="${escapeHtml(opts.description)}" />
  ${opts.keywords ? `<meta name="keywords" content="${escapeHtml(opts.keywords)}" />` : ""}
  <link rel="canonical" href="${opts.url}" />
  <meta property="og:title" content="${escapeHtml(opts.title)}" />
  <meta property="og:description" content="${escapeHtml(opts.description)}" />
  <meta property="og:image" content="${opts.imageUrl}" />
  <meta property="og:url" content="${opts.url}" />
  <meta property="og:type" content="${opts.type || "website"}" />
  <meta property="og:site_name" content="Sergey Bershadsky" />
  ${opts.publishedTime ? `<meta property="article:published_time" content="${opts.publishedTime}" />` : ""}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(opts.title)}" />
  <meta name="twitter:description" content="${escapeHtml(opts.description)}" />
  <meta name="twitter:image" content="${opts.imageUrl}" />
  <meta name="robots" content="${opts.robotsDirective || "index, follow"}" />
  ${jsonLdScripts}
</head>
<body>
  ${opts.body}
</body>
</html>`;
}

export function generateSitemap(): string {
  const posts = getPosts().filter(p => p.status === "published");
  const series = getSeries().filter(s => s.is_visible);

  const urls: { loc: string; lastmod?: string; changefreq: string; priority: string }[] = [
    { loc: BASE_URL, changefreq: "weekly", priority: "1.0" },
    { loc: `${BASE_URL}/about`, changefreq: "monthly", priority: "0.9" },
  ];

  series.forEach(s => {
    urls.push({
      loc: `${BASE_URL}/series/${s.slug}`,
      changefreq: "weekly",
      priority: "0.8",
    });
  });

  posts
    .sort((a, b) => new Date(b.published_at || b.date).getTime() - new Date(a.published_at || a.date).getTime())
    .forEach(p => {
      urls.push({
        loc: `${BASE_URL}/blog/${p.slug}`,
        lastmod: (p.published_at || p.date).split("T")[0],
        changefreq: "monthly",
        priority: p.case_study_type ? "0.8" : "0.7",
      });
    });

  const urlEntries = urls
    .map(u => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

export function setupSEO(app: Express) {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const hostname = req.hostname || "";
    if (hostname.includes("replit.app") || hostname.includes("replit.dev")) {
      res.set("X-Robots-Tag", "noindex, nofollow");
    }
    next();
  });

  app.get("/sitemap.xml", (_req: Request, res: Response) => {
    res.set("Content-Type", "application/xml");
    res.set("Cache-Control", "public, max-age=3600");
    res.send(generateSitemap());
  });

  app.get("/robots.txt", (_req: Request, res: Response) => {
    const hostname = _req.hostname || "";
    if (hostname.includes("replit.app") || hostname.includes("replit.dev")) {
      res.set("Content-Type", "text/plain");
      res.send(`User-agent: *\nDisallow: /\n`);
      return;
    }
    res.set("Content-Type", "text/plain");
    res.send(`User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`);
  });
}

function getRobotsDirective(hostname: string): string {
  if (hostname.includes("replit.app") || hostname.includes("replit.dev")) {
    return "noindex, nofollow";
  }
  return "index, follow";
}

export function crawlerPrerender(req: Request, res: Response, next: NextFunction) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return next();
  }

  const ua = req.headers["user-agent"] || "";
  if (!isCrawler(ua)) {
    return next();
  }

  const urlPath = req.path;
  const hostname = req.hostname || req.headers.host || "";
  const robotsDirective = getRobotsDirective(hostname);

  try {
    let html: string | null = null;

    if (urlPath === "/" || urlPath === "") {
      html = buildHomePage(robotsDirective);
    } else if (urlPath === "/about") {
      html = buildAboutPage(robotsDirective);
    } else if (urlPath.startsWith("/blog/")) {
      const slug = urlPath.replace("/blog/", "").replace(/\/$/, "");
      if (slug) html = buildBlogPostPage(slug, robotsDirective);
    } else if (urlPath.startsWith("/series/")) {
      const slug = urlPath.replace("/series/", "").replace(/\/$/, "");
      if (slug) html = buildSeriesPage(slug, robotsDirective);
    }

    if (html) {
      res.set("Content-Type", "text/html");
      res.set("Cache-Control", "public, max-age=3600");
      res.set("Vary", "User-Agent");
      res.set("X-Robots-Tag", robotsDirective);
      return res.send(html);
    }
  } catch (err) {
    console.error("[seo] prerender error:", err);
  }

  next();
}
