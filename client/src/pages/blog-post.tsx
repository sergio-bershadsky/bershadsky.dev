import React from 'react';
import { motion } from 'framer-motion';
import { useRoute } from "wouter";
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Clock, Calendar, Hash, Share2, Copy, Check, ExternalLink, Maximize2, Minimize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { NeonCard, CyberButton, SectionHeader } from '@/components/CyberpunkUI';
import { CyberpunkBackground } from '@/components/CyberpunkBackground';
import blogVideo from '@assets/generated_videos/cyberpunk_digital_interface_with_code_scrolling_and_data_visualization.mp4';
import type { BlogPost, BlogPostWithSeries, SeriesWithPosts } from '@shared/schema';

export default function BlogPostPage() {
  const [match, params] = useRoute("/blog/:id");
  const [copied, setCopied] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  const postId = Number(params?.id);
  
  const { data: post, isLoading } = useQuery<BlogPostWithSeries>({
    queryKey: ['/api/blog-posts', postId],
    queryFn: async () => {
      const response = await fetch(`/api/blog-posts/${postId}`);
      if (!response.ok) throw new Error('Failed to fetch blog post');
      return response.json();
    },
    enabled: !!postId
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

  const copyCode = () => {
    navigator.clipboard.writeText(`// Microservices scaling example
const scaleService = async (serviceId: string) => {
  const metrics = await getMetrics(serviceId);
  if (metrics.cpu > 80 || metrics.memory > 75) {
    await orchestrator.scale(serviceId, { replicas: '+1' });
    console.log(\`Scaling up service \${serviceId}\`);
  }
};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen text-foreground relative overflow-x-hidden">
      <CyberpunkBackground />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/10 px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-display font-bold">RETURN_TO_BASE</span>
          </a>
          <div className="font-mono text-xs text-muted-foreground hidden md:block">
            READING_MODE: ACTIVE // ID: {String(post.id).padStart(3, '0')}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-20">
        {/* Header Video Section - Now expandable */}
        <motion.div 
          layout
          className={`relative rounded-lg overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(236,72,153,0.2)] mb-10 group transition-all duration-500 ease-in-out ${
            isExpanded 
              ? 'w-[calc(100vw-2rem)] ml-[calc(50%-50vw+1rem)] h-[80vh] z-30' 
              : 'w-full aspect-video max-w-4xl mx-auto'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          
          {/* Expansion Toggle */}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute top-4 right-4 z-40 p-2 bg-black/60 backdrop-blur rounded-full border border-white/20 text-white/80 hover:text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
            title={isExpanded ? "Collapse View" : "Expand View"}
          >
            {isExpanded ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>

          <video 
            src={blogVideo} 
            autoPlay 
            loop 
            muted 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
          />
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20">
            <div className="flex flex-wrap gap-4 mb-4 text-xs font-mono">
              <span className="flex items-center gap-2 bg-black/50 backdrop-blur px-3 py-1 rounded border border-white/10 text-primary">
                <Calendar className="w-3 h-3" /> {post.date}
              </span>
              <span className="flex items-center gap-2 bg-black/50 backdrop-blur px-3 py-1 rounded border border-white/10 text-secondary">
                <Clock className="w-3 h-3" /> 8 MIN READ
              </span>
              {post.tags.map(tag => (
                <span key={tag} className="flex items-center gap-2 bg-black/50 backdrop-blur px-3 py-1 rounded border border-white/10 text-muted-foreground">
                  <Hash className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
            <h1 className={`${isExpanded ? 'text-5xl md:text-7xl' : 'text-4xl md:text-6xl'} font-display font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-4 drop-shadow-lg transition-all duration-300`}>
              {post.title}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl font-light">
              {post.excerpt}
            </p>
          </div>
        </motion.div>

        {/* Series Navigation */}
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
              {/* Previous Post */}
              {(() => {
                const currentIndex = seriesData.posts.findIndex(p => p.id === postId);
                const prevPost = currentIndex > 0 ? seriesData.posts[currentIndex - 1] : null;
                const nextPost = currentIndex < seriesData.posts.length - 1 ? seriesData.posts[currentIndex + 1] : null;
                
                return (
                  <>
                    <a 
                      href={prevPost ? `/blog/${prevPost.id}` : '#'}
                      className={`flex items-center gap-2 ${prevPost ? 'text-muted-foreground hover:text-white' : 'opacity-30 pointer-events-none'} transition-colors`}
                      data-testid="series-prev"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      <span className="hidden sm:inline text-sm font-mono">PREV</span>
                    </a>
                    
                    {/* Series Info */}
                    <a 
                      href={`/series/${seriesData.slug}`}
                      className="flex items-center gap-3 group flex-1 justify-center min-w-0"
                      data-testid="series-link"
                    >
                      <div 
                        className="w-10 h-10 rounded-full overflow-hidden border-2 flex-shrink-0"
                        style={{ borderColor: seriesData.accentColor || '#ec4899' }}
                      >
                        {seriesData.coverImageUrl ? (
                          <img src={seriesData.coverImageUrl} alt={seriesData.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-black/40 font-display font-bold" style={{ color: seriesData.accentColor || '#ec4899' }}>
                            {seriesData.title.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="text-center min-w-0">
                        <div className="text-xs font-mono text-muted-foreground truncate">{seriesData.title}</div>
                        <div className="text-sm font-display group-hover:text-accent transition-colors" style={{ color: seriesData.accentColor || '#ec4899' }}>
                          Part {currentIndex + 1} of {seriesData.posts.length}
                        </div>
                      </div>
                    </a>
                    
                    <a 
                      href={nextPost ? `/blog/${nextPost.id}` : '#'}
                      className={`flex items-center gap-2 ${nextPost ? 'text-muted-foreground hover:text-white' : 'opacity-30 pointer-events-none'} transition-colors`}
                      data-testid="series-next"
                    >
                      <span className="hidden sm:inline text-sm font-mono">NEXT</span>
                      <ChevronRight className="w-5 h-5" />
                    </a>
                  </>
                );
              })()}
            </div>
          </motion.div>
        )}

        <article className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="grid md:grid-cols-[1fr_250px] gap-10">
            <div className="space-y-8">
              <a href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors group mb-4">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-display font-bold">BACK_TO_INDEX</span>
              </a>

              {/* Introduction */}
              <div className="prose prose-invert prose-lg max-w-none font-serif text-gray-200">
                <p className="text-xl leading-8 text-gray-100 font-light first-letter:text-5xl first-letter:font-display first-letter:text-primary first-letter:mr-3 first-letter:float-left tracking-wide">
                  In the rapidly evolving landscape of distributed systems, the challenge isn't just building microservices—it's orchestrating them at scale without creating a maintenance nightmare. As we move into 2025, the old paradigms of manual scaling and static provisioning are dead.
                </p>
                <p className="text-lg leading-8 text-gray-300">
                  Today, we're seeing a shift towards autonomous, event-driven architectures that react to system pressure in real-time. This article explores the architectural patterns that are defining the next generation of scalable platforms.
                </p>
              </div>

              {/* Diagram Section */}
              <NeonCard variant="secondary" className="my-10 p-8">
                <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
                  <span>FIG 1.0 // ARCHITECTURE_DIAGRAM</span>
                  <span>STATUS: LIVE</span>
                </div>
                <div className="relative min-h-[320px] border border-dashed border-white/20 rounded bg-black/40 flex items-center justify-center p-6">
                  {/* CSS-only flowchart diagram */}
                  <div className="flex items-center gap-6 w-full justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-32 h-14 border border-primary bg-primary/10 flex items-center justify-center text-base font-mono rounded">CLIENT</div>
                      <div className="h-10 w-[2px] bg-white/30"></div>
                      <div className="w-32 h-14 border border-accent bg-accent/10 flex items-center justify-center text-base font-mono rounded">API GATEWAY</div>
                    </div>
                    <div className="h-[2px] w-12 bg-white/30"></div>
                    <div className="flex flex-col gap-4">
                      <div className="w-40 h-12 border border-secondary bg-secondary/10 flex items-center justify-center text-base font-mono rounded">AUTH SERVICE</div>
                      <div className="w-40 h-12 border border-secondary bg-secondary/10 flex items-center justify-center text-base font-mono rounded">DATA SERVICE</div>
                      <div className="w-40 h-12 border border-secondary bg-secondary/10 flex items-center justify-center text-base font-mono rounded">ANALYTICS</div>
                    </div>
                  </div>
                </div>
                <p className="text-base text-muted-foreground mt-4 font-mono text-center">
                  // Distributed Event Mesh Architecture with Auto-scaling capabilities
                </p>
              </NeonCard>

              {/* Code Example */}
              <div className="relative group my-12">
                <div className="absolute -top-3 left-4 bg-background px-2 text-xs font-mono text-primary border border-primary/30 rounded z-10">
                  SCALING_LOGIC.TS
                </div>
                <div className="bg-[#0d1117] rounded-lg border border-white/10 overflow-hidden shadow-2xl">
                  <div className="flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                    </div>
                    <button 
                      onClick={copyCode}
                      className="text-xs font-mono flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'COPIED' : 'COPY_SOURCE'}
                    </button>
                  </div>
                  <pre className="p-6 overflow-x-auto text-base font-mono leading-loose">
                    <code className="text-gray-300">
                      <span className="text-purple-400">// Microservices scaling example</span>{'\n'}
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">scaleService</span> = <span className="text-blue-400">async</span> (<span className="text-orange-300">serviceId</span>: <span className="text-green-400">string</span>) ={'>'} {'{'}{'\n'}
                      {'  '}<span className="text-blue-400">const</span> metrics = <span className="text-blue-400">await</span> <span className="text-yellow-300">getMetrics</span>(serviceId);{'\n'}
                      {'  '}<span className="text-pink-400">if</span> (metrics.cpu {'>'} <span className="text-blue-300">80</span> || metrics.memory {'>'} <span className="text-blue-300">75</span>) {'{'}{'\n'}
                      {'    '}<span className="text-blue-400">await</span> orchestrator.<span className="text-yellow-300">scale</span>(serviceId, {'{'}{'\n'}
                      {'      '}replicas: <span className="text-green-300">'+1'</span>{'\n'}
                      {'    '}{'}'});{'\n'}
                      {'    '}console.<span className="text-yellow-300">log</span>(<span className="text-green-300">`Scaling up service </span><span className="text-blue-300">${'{serviceId}'}</span><span className="text-green-300">`</span>);{'\n'}
                      {'  '}{'}'}{'\n'}
                      {'}'};
                    </code>
                  </pre>
                </div>
              </div>

              <div className="prose prose-invert prose-lg max-w-none font-serif text-gray-200">
                <h3 className="text-3xl font-display text-white mt-12 mb-6 tracking-wide">The Implementation Strategy</h3>
                <p className="text-lg leading-8 text-gray-300 mb-6">
                  Implementing this pattern requires a robust observability stack. You cannot scale what you cannot measure. We recommend starting with Prometheus for metrics collection and Grafana for visualization, but the real magic happens when you couple these with an automated decision engine.
                </p>
                <ul className="list-disc pl-6 space-y-4 text-gray-300 marker:text-primary">
                  <li className="pl-2">Define clear SLIs and SLOs before writing scaling rules</li>
                  <li className="pl-2">Implement circuit breakers to prevent cascading failures</li>
                  <li className="pl-2">Use idempotent operations to ensure data consistency</li>
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              <div className="sticky top-24 space-y-8">
                <NeonCard variant="primary" className="p-6">
                  <h4 className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-widest">About Author</h4>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20">
                      <img src="@assets/avatar-big_1765956076319.png" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-bold font-display">Sergey Bershadsky</div>
                      <div className="text-xs text-muted-foreground">Architect</div>
                    </div>
                  </div>
                  <CyberButton size="sm" className="w-full text-xs">FOLLOW_UPDATES</CyberButton>
                </NeonCard>

                <div className="border border-white/10 rounded bg-black/20 p-6">
                  <h4 className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-widest">Share Protocol</h4>
                  <div className="flex gap-2">
                    <button className="p-2 border border-white/10 rounded hover:bg-white/5 hover:border-primary/50 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 border border-white/10 rounded hover:bg-white/5 hover:border-secondary/50 transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="border border-white/10 rounded bg-black/20 p-6">
                  <h4 className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-widest">Table of Contents</h4>
                  <ul className="space-y-2 text-sm font-light text-muted-foreground">
                    <li className="hover:text-primary cursor-pointer transition-colors">▹ Introduction</li>
                    <li className="hover:text-primary cursor-pointer transition-colors">▹ Architecture Overview</li>
                    <li className="hover:text-primary cursor-pointer transition-colors">▹ Code Implementation</li>
                    <li className="hover:text-primary cursor-pointer transition-colors">▹ Strategy & Conclusion</li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </article>

        {/* Disclaimer */}
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

        {/* Read Next */}
        <div className="max-w-4xl mx-auto mt-20 pt-10 border-t border-white/10">
          <SectionHeader title="RELATED_DATA" subtitle="Continue Reading" />
          <div className="grid md:grid-cols-2 gap-6">
            {allPosts.filter(p => p.id !== post.id).slice(0, 2).map(related => (
               <NeonCard key={related.id} variant="accent" className="cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-display font-bold text-lg group-hover:text-accent transition-colors">{related.title}</h4>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-muted-foreground">{related.excerpt}</p>
               </NeonCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
