import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from "wouter";
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Clock, Calendar, Hash, Share2, Copy, Check, ExternalLink, Maximize2, Minimize2, ChevronLeft, ChevronRight, Brain, Layers, Rocket, BookOpen, Users, Briefcase } from 'lucide-react';
import { NeonCard, CyberButton, SectionHeader } from '@/components/CyberpunkUI';

const getSeriesIcon = (slug: string, accentColor: string, size: string = "w-5 h-5") => {
  const iconProps = { className: size, style: { color: accentColor } };
  switch (slug) {
    case 'second-brain-claude':
      return <Brain {...iconProps} />;
    case 'architecture-fundamentals':
      return <Layers {...iconProps} />;
    case 'startup-playbook':
      return <Rocket {...iconProps} />;
    case 'case-study':
      return <Briefcase {...iconProps} />;
    default:
      return <BookOpen {...iconProps} />;
  }
};

import { CyberpunkBackground } from '@/components/CyberpunkBackground';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import blogVideo from '@assets/generated_videos/cyberpunk_digital_interface_with_code_scrolling_and_data_visualization.mp4';
const authorAvatar = '/images/avatar-squere.webp';
import { getBlogPostBySlug, getSeriesWithPosts, getAllBlogPosts, type BlogPost, type BlogPostWithSeries, type SeriesWithPosts } from '@/lib/dataLoader';

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const [copied, setCopied] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [tableOfContents, setTableOfContents] = React.useState<string[]>([]);
  const [sectionVisibility, setSectionVisibility] = React.useState<Record<string, number>>({});
  
  const postSlug = params.slug;
  
  const { data: post, isLoading, isError } = useQuery<BlogPostWithSeries | null>({
    queryKey: ['blog-post', postSlug],
    queryFn: () => getBlogPostBySlug(postSlug || ''),
    enabled: !!postSlug,
    retry: false
  });

  React.useEffect(() => {
    if (post) {
      const title = post.seoTitle || post.title;
      const description = post.seoDescription || post.excerpt;
      const keywords = post.seoKeywords || post.tags.join(', ');
      const imageUrl = post.imageUrl ? `https://bershadsky.dev${post.imageUrl}` : 'https://bershadsky.dev/images/avatar-big.webp';
      const canonicalUrl = `https://bershadsky.dev/blog/${post.slug}`;

      document.title = `${title} | Sergey Bershadsky`;

      const updateMeta = (name: string, content: string, property?: boolean) => {
        const attr = property ? 'property' : 'name';
        let el = document.querySelector(`meta[${attr}="${name}"]`);
        if (!el) {
          el = document.createElement('meta');
          el.setAttribute(attr, name);
          document.head.appendChild(el);
        }
        el.setAttribute('content', content);
      };

      updateMeta('description', description);
      updateMeta('keywords', keywords);
      updateMeta('og:title', title, true);
      updateMeta('og:description', description, true);
      updateMeta('og:image', imageUrl, true);
      updateMeta('og:url', canonicalUrl, true);
      updateMeta('og:type', 'article', true);
      updateMeta('twitter:title', title);
      updateMeta('twitter:description', description);
      updateMeta('twitter:image', imageUrl);

      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', canonicalUrl);
      }
    }
  }, [post]);

  React.useEffect(() => {
    if (tableOfContents.length === 0) return;

    const headingSlugs = tableOfContents.map(h => 
      h.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    );

    const sectionPositions: { slug: string; top: number; bottom: number }[] = [];
    
    headingSlugs.forEach((slug, index) => {
      const element = document.getElementById(slug);
      if (element) {
        const rect = element.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const nextSlug = headingSlugs[index + 1];
        const nextElement = nextSlug ? document.getElementById(nextSlug) : null;
        const bottom = nextElement 
          ? nextElement.getBoundingClientRect().top + window.scrollY 
          : document.body.scrollHeight;
        sectionPositions.push({ slug, top, bottom });
      }
    });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const viewportTop = scrollY + 100;
      const viewportBottom = scrollY + viewportHeight * 0.7;
      
      const newVisibility: Record<string, number> = {};
      
      sectionPositions.forEach(({ slug, top, bottom }) => {
        const sectionHeight = bottom - top;
        const visibleTop = Math.max(top, viewportTop);
        const visibleBottom = Math.min(bottom, viewportBottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const visibleRatio = Math.min(1, visibleHeight / Math.min(sectionHeight, viewportHeight * 0.5));
        newVisibility[slug] = visibleRatio;
      });
      
      setSectionVisibility(newVisibility);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tableOfContents]);
  
  const { data: allPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ['blog-posts'],
    queryFn: getAllBlogPosts
  });

  const { data: seriesData } = useQuery<SeriesWithPosts | null>({
    queryKey: ['series', post?.series?.slug],
    queryFn: () => getSeriesWithPosts(post?.series?.slug || ''),
    enabled: !!post?.series?.slug
  });
  
  if (isLoading) {
    return (
      <div className="min-h-screen text-foreground relative overflow-x-hidden flex items-center justify-center">
        <CyberpunkBackground />
        <div className="text-center font-mono text-muted-foreground">
          LOADING_ARTICLE...
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-screen text-foreground relative overflow-x-hidden flex items-center justify-center">
        <CyberpunkBackground />
        <div className="text-center">
          <div className="font-mono text-6xl text-primary mb-4">404</div>
          <div className="font-mono text-muted-foreground mb-6">ARTICLE_NOT_FOUND</div>
          <Link href="/" className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors font-mono">
            <ArrowLeft className="w-4 h-4" />
            RETURN_TO_BASE
          </Link>
        </div>
      </div>
    );
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen text-foreground relative overflow-x-clip">
      <CyberpunkBackground />
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/10 px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors group" data-testid="link-home">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-display font-bold">RETURN_TO_BASE</span>
          </Link>
          <div className="font-mono text-xs text-muted-foreground hidden md:block">
            READING_MODE: ACTIVE // ID: {String(post.id).padStart(3, '0')}
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 pt-24 pb-20 pl-[0px] pr-[0px]">
        <motion.div 
          layout
          className={`relative rounded-lg overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(236,72,153,0.2)] mb-10 group transition-all duration-500 ease-in-out ${
            isExpanded 
              ? 'w-[calc(100vw-2rem)] ml-[calc(50%-50vw+1rem)] h-[80vh] z-30' 
              : 'w-full aspect-video max-w-4xl mx-auto'
          }`}
        >
          <div className="absolute inset-0 bg-black/35 z-10" />
          <div className="absolute inset-0 backdrop-blur-sm z-10 [mask-image:linear-gradient(to_bottom,black_0%,black_25%,transparent_75%)]" />
          
          {post.videoUrl && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="absolute top-4 right-4 z-40 p-2 bg-black/60 backdrop-blur rounded-full border border-white/20 text-white/80 hover:text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
              title={isExpanded ? "Collapse View" : "Expand View"}
              data-testid="button-expand-video"
            >
              {isExpanded ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          )}

          {post.imageUrl ? (
            <div className="relative w-full h-full">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
              />
              {post.caseStudyLogo && (
                <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ bottom: '20%' }}>
                  <img 
                    src={post.caseStudyLogo} 
                    alt="Project Logo"
                    className="h-12 md:h-16 w-auto opacity-90 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  />
                </div>
              )}
            </div>
          ) : (
            <video 
              src={blogVideo} 
              autoPlay 
              loop 
              muted 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
            />
          )}
          
          <div className="absolute inset-0 p-6 md:p-10 z-20 flex flex-col justify-between">
            <div>
              {post.series && (
                <div className="flex items-center gap-3 mb-3">
                  <Link 
                    href={`/series/${post.series.slug}`}
                    className="text-sm font-mono text-secondary hover:text-primary transition-colors"
                    data-testid="link-series"
                  >
                    {post.series.title}
                  </Link>
                  {post.caseStudyYear ? (
                    <span className="px-2 py-1 bg-orange-500/20 border border-orange-500/40 rounded text-orange-400 font-mono text-sm font-bold whitespace-nowrap">
                      {post.caseStudyYear}
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-primary/20 border border-primary/40 rounded text-primary font-mono text-sm font-bold whitespace-nowrap">
                      PART: {post.series.position}
                    </span>
                  )}
                  {post.caseStudyRole && (
                    <span className="px-2 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded text-cyan-400 font-mono text-sm font-bold whitespace-nowrap">
                      {post.caseStudyRole}
                    </span>
                  )}
                </div>
              )}
              <h1 className="text-[24px] md:text-[46px] font-display font-bold text-white transition-all duration-300" data-testid="text-post-title">
                {post.title.replace(/\s*PART:\s*\d+$/i, '')}
              </h1>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1.5 px-2 py-1 rounded border border-white/20 bg-black/40 text-white/70 text-xs backdrop-blur-sm" data-testid={`tag-${tag}`}>
                  <Hash className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-6 px-4 sm:px-0">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <Link href="/" className="flex items-center gap-2 px-3 py-1.5 rounded border border-white/20 bg-white/5 text-white hover:text-primary hover:border-primary/50 transition-colors group" data-testid="link-back">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              BACK
            </Link>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded border border-primary/30 bg-primary/10 text-primary">
              <Calendar className="w-3 h-3" /> {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-CA') : post.date}
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded border border-secondary/30 bg-secondary/10 text-secondary">
              <Clock className="w-3 h-3" /> {Math.ceil(post.content.split(' ').length / 200)} MIN READ
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded border border-accent/30 bg-accent/10 text-accent">
              <Users className="w-3 h-3" /> {post.audience?.toUpperCase() || 'EVERYONE'}
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-8 px-4 sm:px-0">
          <p className="text-xl text-[#d1d5db] text-solid font-light leading-relaxed mt-[4px] mb-[4px]" data-testid="text-post-excerpt">
            {post.excerpt}
          </p>
        </div>

        {seriesData && (
          <div className="max-w-4xl mx-auto mb-8 px-4 sm:px-0">
            <div 
              className="border rounded-lg p-4 flex items-center justify-between gap-4 backdrop-blur-sm"
              style={{ 
                borderColor: seriesData.accentColor ? seriesData.accentColor + '40' : 'rgba(236,72,153,0.25)',
                backgroundColor: seriesData.accentColor ? seriesData.accentColor + '08' : 'rgba(236,72,153,0.03)'
              }}
            >
              {(() => {
                const currentIndex = seriesData.posts.findIndex(p => p.id === post.id);
                const prevPost = currentIndex > 0 ? seriesData.posts[currentIndex - 1] : null;
                const nextPost = currentIndex < seriesData.posts.length - 1 ? seriesData.posts[currentIndex + 1] : null;
                
                return (
                  <>
                    <div className="w-20 flex-shrink-0">
                      {prevPost && (
                        <Link 
                          href={`/blog/${prevPost.slug || prevPost.id}`}
                          className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
                          data-testid="series-prev"
                        >
                          <ChevronLeft className="w-5 h-5" />
                          <span className="hidden sm:inline text-sm font-mono">PREV</span>
                        </Link>
                      )}
                    </div>
                    
                    <Link 
                      href={`/series/${seriesData.slug}`}
                      className="flex items-center gap-3 group flex-1 justify-center min-w-0"
                      data-testid="series-link"
                    >
                      <div 
                        className="w-10 h-10 rounded-full overflow-hidden border-2 flex-shrink-0 flex items-center justify-center bg-black/40"
                        style={{ borderColor: seriesData.accentColor || '#ec4899' }}
                      >
                        {getSeriesIcon(seriesData.slug, seriesData.accentColor || '#ec4899')}
                      </div>
                      <div className="text-center min-w-0">
                        <div className="text-sm font-display group-hover:text-accent transition-colors whitespace-nowrap" style={{ color: seriesData.accentColor || '#ec4899' }}>
                          Part {currentIndex + 1} of {seriesData.posts.length}
                        </div>
                      </div>
                    </Link>
                    
                    <div className="w-20 flex-shrink-0 flex justify-end">
                      {nextPost && (
                        <Link 
                          href={`/blog/${nextPost.slug || nextPost.id}`}
                          className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
                          data-testid="series-next"
                        >
                          <span className="hidden sm:inline text-sm font-mono">NEXT</span>
                          <ChevronRight className="w-5 h-5" />
                        </Link>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        <article className="max-w-4xl mx-auto px-4 sm:px-0">
          <div className="grid md:grid-cols-[1fr_250px] gap-10">
            <div className="space-y-8 min-w-0">
              <div data-testid="post-content" className="min-w-0">
                <MarkdownRenderer 
                  content={post.content} 
                  onHeadingsExtracted={setTableOfContents}
                />
              </div>
            </div>

            <aside className="hidden md:block">
              <div className="sticky top-24 space-y-8">
                <NeonCard variant="primary" className="p-6">
                  <h4 className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-widest">About Author</h4>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-md overflow-hidden border border-white/20">
                      <img src={authorAvatar} alt="Sergey Bershadsky" className="w-12 h-12 object-cover aspect-square" />
                    </div>
                    <div>
                      <div className="font-bold font-display">Sergey Bershadsky</div>
                      <div className="text-xs text-muted-foreground">Architect</div>
                    </div>
                  </div>
                  <CyberButton size="sm" className="w-full text-xs" data-testid="button-follow">FOLLOW_UPDATES</CyberButton>
                </NeonCard>

                <div className="border border-white/10 rounded bg-black/20 p-6">
                  <h4 className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-widest">Share Protocol</h4>
                  <div className="flex gap-2">
                    <button className="p-2 border border-white/10 rounded hover:bg-white/5 hover:border-primary/50 transition-colors" data-testid="button-share">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => copyToClipboard(window.location.href)}
                      className="p-2 border border-white/10 rounded hover:bg-white/5 hover:border-secondary/50 transition-colors" 
                      data-testid="button-copy-link"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {tableOfContents.length > 0 && (
                  <div className="border border-white/10 rounded bg-black/20 p-6">
                    <h4 className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-widest">Table of Contents</h4>
                    <ul className="space-y-2 text-sm font-light border-l border-white/10">
                      {tableOfContents.map((heading, i) => {
                        const slug = heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                        const visibility = sectionVisibility[slug] || 0;
                        
                        const baseGray = { r: 156, g: 163, b: 175 };
                        const pink = { r: 236, g: 72, b: 153 };
                        const r = Math.round(baseGray.r + (pink.r - baseGray.r) * visibility);
                        const g = Math.round(baseGray.g + (pink.g - baseGray.g) * visibility);
                        const b = Math.round(baseGray.b + (pink.b - baseGray.b) * visibility);
                        
                        return (
                          <li key={i} className="relative">
                            <a 
                              href={`#${slug}`}
                              className="block pl-4 py-1 cursor-pointer -ml-[1px]"
                              style={{
                                color: `rgb(${r}, ${g}, ${b})`,
                                borderLeft: `2px solid rgba(236, 72, 153, ${visibility})`,
                                transition: 'color 0.1s ease-out, border-color 0.1s ease-out',
                              }}
                            >
                              {heading}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </article>

        <div className="max-w-4xl mx-auto mt-16 px-4 sm:px-0">
          <div className="border border-white/10 rounded-lg bg-black/30 backdrop-blur-sm p-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full border border-accent/50 bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-accent text-sm font-mono">!</span>
              </div>
              <div>
                <h4 className="text-sm font-mono text-accent mb-2 uppercase tracking-wider">DISCLAIMER</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I extensively use AI for creating articles but not the content. The ideas are a result of hard work and testing approaches several times in real Software Development work.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-20 px-4 sm:px-0">
          <SectionHeader title="RELATED_DATA" subtitle="Continue Reading" />
          {(() => {
            let prevArticle: BlogPost | null = null;
            let nextArticle: BlogPost | null = null;
            
            if (seriesData) {
              const currentIndex = seriesData.posts.findIndex(p => p.id === post.id);
              prevArticle = currentIndex > 0 ? seriesData.posts[currentIndex - 1] : null;
              nextArticle = currentIndex < seriesData.posts.length - 1 ? seriesData.posts[currentIndex + 1] : null;
            }
            
            if (!prevArticle || !nextArticle) {
              const sortedPosts = [...allPosts].sort((a, b) => 
                new Date(b.publishedAt || b.date).getTime() - new Date(a.publishedAt || a.date).getTime()
              );
              const currentDateIndex = sortedPosts.findIndex(p => p.id === post.id);
              if (!prevArticle && currentDateIndex > 0) {
                prevArticle = sortedPosts[currentDateIndex - 1];
              }
              if (!nextArticle && currentDateIndex < sortedPosts.length - 1) {
                nextArticle = sortedPosts[currentDateIndex + 1];
              }
            }
            
            const articles = [prevArticle, nextArticle].filter(Boolean) as BlogPost[];
            
            if (articles.length === 0) return null;
            
            return (
              <div className={`grid gap-6 ${articles.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1 max-w-xl mx-auto'}`}>
                {prevArticle && (
                  <Link href={`/blog/${prevArticle.slug || prevArticle.id}`} data-testid="link-prev-article">
                    <NeonCard variant="secondary" className="cursor-pointer group h-full">
                      <div className="flex items-center gap-2 text-xs font-mono text-secondary mb-3">
                        <ChevronLeft className="w-4 h-4" />
                        PREVIOUS
                      </div>
                      <h4 className="font-display font-bold text-lg group-hover:text-secondary transition-colors mb-2">{prevArticle.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">{prevArticle.excerpt}</p>
                    </NeonCard>
                  </Link>
                )}
                {nextArticle && (
                  <Link href={`/blog/${nextArticle.slug || nextArticle.id}`} data-testid="link-next-article">
                    <NeonCard variant="primary" className="cursor-pointer group h-full">
                      <div className="flex items-center justify-end gap-2 text-xs font-mono text-primary mb-3">
                        NEXT
                        <ChevronRight className="w-4 h-4" />
                      </div>
                      <h4 className="font-display font-bold text-lg group-hover:text-primary transition-colors mb-2 text-right">{nextArticle.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 text-right">{nextArticle.excerpt}</p>
                    </NeonCard>
                  </Link>
                )}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
