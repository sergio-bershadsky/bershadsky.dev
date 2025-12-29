import React from 'react';
import { motion } from 'framer-motion';
import { useRoute } from "wouter";
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Clock, Calendar, Hash, Share2, Copy, Check, ExternalLink, Maximize2, Minimize2, ChevronLeft, ChevronRight, Brain, Layers, Rocket, BookOpen } from 'lucide-react';
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
    default:
      return <BookOpen {...iconProps} />;
  }
};

import { CyberpunkBackground } from '@/components/CyberpunkBackground';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import blogVideo from '@assets/generated_videos/cyberpunk_digital_interface_with_code_scrolling_and_data_visualization.mp4';
import type { BlogPost, BlogPostWithSeries, SeriesWithPosts } from '@shared/schema';

export default function BlogPostPage() {
  const [match, params] = useRoute("/blog/:slug");
  const [copied, setCopied] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [tableOfContents, setTableOfContents] = React.useState<string[]>([]);
  const [activeSection, setActiveSection] = React.useState<string>('');
  
  const postSlug = params?.slug;
  
  // Track active section with IntersectionObserver
  React.useEffect(() => {
    if (tableOfContents.length === 0) return;
    
    const slugs = tableOfContents.map(heading => 
      heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    );
    
    const observer = new IntersectionObserver(
      (entries) => {
        // Filter to only intersecting entries and find the one closest to top
        const intersecting = entries.filter(e => e.isIntersecting);
        if (intersecting.length > 0) {
          // Sort by top position (ascending) and pick the closest to viewport top
          const closest = intersecting.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )[0];
          setActiveSection(closest.target.id);
        }
      },
      { rootMargin: '0px 0px -90% 0px', threshold: 0 }
    );
    
    slugs.forEach((slug) => {
      const element = document.getElementById(slug);
      if (element) observer.observe(element);
    });
    
    return () => observer.disconnect();
  }, [tableOfContents]);
  
  const { data: post, isLoading } = useQuery<BlogPostWithSeries>({
    queryKey: ['/api/blog-posts', postSlug],
    queryFn: async () => {
      const response = await fetch(`/api/blog-posts/${postSlug}`);
      if (!response.ok) throw new Error('Failed to fetch blog post');
      return response.json();
    },
    enabled: !!postSlug
  });
  
  const { data: allPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
    queryFn: async () => {
      const response = await fetch('/api/blog-posts');
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      return response.json();
    }
  });

  const { data: seriesData } = useQuery<SeriesWithPosts>({
    queryKey: ['/api/series', post?.series?.slug],
    queryFn: async () => {
      const response = await fetch(`/api/series/${post?.series?.slug}`);
      if (!response.ok) throw new Error('Failed to fetch series');
      return response.json();
    },
    enabled: !!post?.series?.slug
  });
  
  if (isLoading || !post) {
    return (
      <div className="min-h-screen text-foreground relative overflow-x-hidden flex items-center justify-center">
        <CyberpunkBackground />
        <div className="text-center font-mono text-muted-foreground">
          LOADING_ARTICLE...
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
    <div className="min-h-screen text-foreground relative overflow-x-hidden">
      <CyberpunkBackground />

      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/10 px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors group" data-testid="link-home">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-display font-bold">RETURN_TO_BASE</span>
          </a>
          <div className="font-mono text-xs text-muted-foreground hidden md:block">
            READING_MODE: ACTIVE // ID: {String(post.id).padStart(3, '0')}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-20">
        <motion.div 
          layout
          className={`relative rounded-lg overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(236,72,153,0.2)] mb-10 group transition-all duration-500 ease-in-out ${
            isExpanded 
              ? 'w-[calc(100vw-2rem)] ml-[calc(50%-50vw+1rem)] h-[80vh] z-30' 
              : 'w-full aspect-video max-w-4xl mx-auto'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          
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
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
            />
          ) : (
            <video 
              src={blogVideo} 
              autoPlay 
              loop 
              muted 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
            />
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20">
            {post.series && (
              <div className="flex items-center gap-3 mb-3">
                <a 
                  href={`/series/${post.series.slug}`}
                  className="text-sm font-mono text-secondary hover:text-primary transition-colors"
                  data-testid="link-series"
                >
                  {post.series.title}
                </a>
                <span className="px-2 py-1 bg-primary/20 border border-primary/40 rounded text-primary font-mono text-sm font-bold">
                  PART: {post.series.position}
                </span>
              </div>
            )}
            <h1 className={`${isExpanded ? 'text-5xl md:text-7xl' : 'text-4xl md:text-6xl'} font-display font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 drop-shadow-lg transition-all duration-300`} data-testid="text-post-title">
              {post.title.replace(/\s*PART:\s*\d+$/i, '')}
            </h1>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-6">
          <div className="flex flex-wrap gap-3 text-xs font-mono">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded border border-primary/30 bg-primary/10 text-primary">
              <Calendar className="w-3 h-3" /> {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-CA') : post.date}
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded border border-secondary/30 bg-secondary/10 text-secondary">
              <Clock className="w-3 h-3" /> {Math.ceil(post.content.split(' ').length / 200)} MIN READ
            </span>
            {post.tags.map(tag => (
              <span key={tag} className="flex items-center gap-2 px-3 py-1.5 rounded border border-white/10 bg-white/5 text-muted-foreground" data-testid={`tag-${tag}`}>
                <Hash className="w-3 h-3" /> {tag}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <p className="text-xl text-gray-300 font-light leading-relaxed" data-testid="text-post-excerpt">
            {post.excerpt}
          </p>
        </motion.div>

        {seriesData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-8"
          >
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
                    {prevPost ? (
                      <a 
                        href={`/blog/${prevPost.slug || prevPost.id}`}
                        className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
                        data-testid="series-prev"
                      >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="hidden sm:inline text-sm font-mono">PREV</span>
                      </a>
                    ) : <div />}
                    
                    <a 
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
                        <div className="text-xs font-mono text-muted-foreground truncate">{seriesData.title}</div>
                        <div className="text-sm font-display group-hover:text-accent transition-colors" style={{ color: seriesData.accentColor || '#ec4899' }}>
                          Part {currentIndex + 1} of {seriesData.posts.length}
                        </div>
                      </div>
                    </a>
                    
                    {nextPost ? (
                      <a 
                        href={`/blog/${nextPost.slug || nextPost.id}`}
                        className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
                        data-testid="series-next"
                      >
                        <span className="hidden sm:inline text-sm font-mono">NEXT</span>
                        <ChevronRight className="w-5 h-5" />
                      </a>
                    ) : <div />}
                  </>
                );
              })()}
            </div>
          </motion.div>
        )}

        <article className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[1fr_280px] gap-10 items-start">
            <div className="space-y-8 min-w-0">
              <a href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors group mb-4" data-testid="link-back">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-display font-bold">BACK_TO_INDEX</span>
              </a>

              <div data-testid="post-content">
                <MarkdownRenderer 
                  content={post.content} 
                  onHeadingsExtracted={setTableOfContents}
                />
              </div>
            </div>

            <aside className="hidden md:block sticky top-24 h-fit">
              <div className="space-y-8">
                <NeonCard variant="primary" className="p-6">
                  <h4 className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-widest">About Author</h4>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-xl font-display font-bold text-primary">S</span>
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
                    <ul className="space-y-2 text-sm font-light">
                      {tableOfContents.map((heading, i) => {
                        const slug = heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                        const isActive = activeSection === slug;
                        return (
                          <li key={i}>
                            <a 
                              href={`#${slug}`}
                              className={`cursor-pointer transition-all duration-200 block ${
                                isActive 
                                  ? 'text-primary font-medium pl-2 border-l-2 border-primary' 
                                  : 'text-muted-foreground hover:text-primary pl-0 border-l-2 border-transparent'
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth' });
                              }}
                            >
                              {isActive ? '▸' : '▹'} {heading}
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

        <div className="max-w-4xl mx-auto mt-16">
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

        <div className="max-w-4xl mx-auto mt-20 pt-10 border-t border-white/10">
          <SectionHeader title="RELATED_DATA" subtitle="Continue Reading" />
          <div className="grid md:grid-cols-2 gap-6">
            {allPosts.filter(p => p.id !== post.id).slice(0, 2).map(related => (
               <a key={related.id} href={`/blog/${related.slug || related.id}`} data-testid={`link-related-${related.slug || related.id}`}>
                 <NeonCard variant="accent" className="cursor-pointer group h-full">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-display font-bold text-lg group-hover:text-accent transition-colors">{related.title}</h4>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm text-muted-foreground">{related.excerpt}</p>
                 </NeonCard>
               </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
