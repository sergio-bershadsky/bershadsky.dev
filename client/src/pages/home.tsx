import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Terminal, Cpu, Network, Code, Briefcase, GraduationCap, Mail, MapPin, Phone, Github, Linkedin, ExternalLink, ArrowRight, Instagram, Youtube, Send, Brain, Layers, Rocket, BookOpen, Search, Hash, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import MiniSearch from 'minisearch';
import { cvData } from '@/data/cv';
import { GlitchText, NeonCard, CyberButton, SectionHeader, NameGlitch } from '@/components/CyberpunkUI';
import { CyberpunkBackground } from '@/components/CyberpunkBackground';
import { SeriesRail } from '@/components/SeriesRail';
const avatarImage = '/images/cyberpunk_portrait_of_bearded_man_with_glasses.webp';
import { getAllBlogPosts, type BlogPost } from '@/lib/dataLoader';

const getSeriesFromTitle = (title: string): { name: string; slug: string; icon: React.ReactNode; color: string } | null => {
  if (title.startsWith('Second Brain:')) {
    return { name: 'Second Brain', slug: 'second-brain-claude', icon: <Brain className="w-3 h-3" />, color: '#ec4899' };
  }
  if (title.startsWith('Architecture:')) {
    return { name: 'Architecture', slug: 'architecture-fundamentals', icon: <Layers className="w-3 h-3" />, color: '#06b6d4' };
  }
  if (title.startsWith('Startup:')) {
    return { name: 'Startup', slug: 'startup-playbook', icon: <Rocket className="w-3 h-3" />, color: '#9333ea' };
  }
  return null;
};

const createSearchIndex = () => new MiniSearch<BlogPost>({
  fields: ['title', 'excerpt', 'content', 'tags'],
  storeFields: ['id', 'slug'],
  idField: 'id',
  extractField: (document, fieldName) => {
    if (fieldName === 'tags') {
      return document.tags.join(' ');
    }
    return (document as any)[fieldName];
  },
  searchOptions: {
    boost: { title: 3, excerpt: 2, tags: 1.5 },
    prefix: true,
    fuzzy: 0.2
  }
});

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTagFilter, setShowTagFilter] = useState(false);
  const miniSearchRef = useRef<MiniSearch<BlogPost> | null>(null);
  const indexedPostsRef = useRef<string>('');
  
  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ['blog-posts'],
    queryFn: getAllBlogPosts
  });

  const postsFingerprint = useMemo(() => 
    blogPosts.map(p => p.id).join(','), 
    [blogPosts]
  );

  if (postsFingerprint !== indexedPostsRef.current && blogPosts.length > 0) {
    miniSearchRef.current = createSearchIndex();
    miniSearchRef.current.addAll(blogPosts);
    indexedPostsRef.current = postsFingerprint;
  }

  const allTags = useMemo(() => {
    const tagCounts = new Map<string, number>();
    blogPosts.forEach(post => {
      post.tags.forEach(tag => {
        const normalizedTag = tag.toLowerCase();
        tagCounts.set(normalizedTag, (tagCounts.get(normalizedTag) || 0) + 1);
      });
    });
    return Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([tag]) => tag);
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    let results = [...blogPosts];
    
    if (searchQuery.trim() && miniSearchRef.current) {
      const searchResults = miniSearchRef.current.search(searchQuery);
      const matchedIds = new Set(searchResults.map(r => r.id));
      results = results.filter(post => matchedIds.has(post.id));
    }
    
    if (selectedTags.length > 0) {
      results = results.filter(post => 
        selectedTags.every(selectedTag => 
          post.tags.some(tag => tag.toLowerCase() === selectedTag)
        )
      );
    }
    
    return results.sort((a, b) => 
      new Date(b.publishedAt || b.date).getTime() - new Date(a.publishedAt || a.date).getTime()
    );
  }, [blogPosts, searchQuery, selectedTags, postsFingerprint]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  const hasActiveFilters = searchQuery.trim() || selectedTags.length > 0;

  return (
    <div className="min-h-screen text-foreground relative overflow-x-hidden">
      <CyberpunkBackground />

      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center relative px-4 pt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-10"
        >
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-[spin_10s_linear_infinite]" />
          <div className="absolute -inset-4 rounded-full border border-secondary/20 animate-[spin_15s_linear_infinite_reverse]" />
          <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-accent/50 shadow-[0_0_50px_rgba(147,51,234,0.3)]">
             <img 
              src={avatarImage} 
              alt="Cyberpunk Avatar" 
              className="w-full h-full object-cover filter contrast-125 hover:scale-110 transition-transform duration-700"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center space-y-6 max-w-4xl"
        >
          <div className="inline-block px-3 py-1 border border-secondary/50 text-secondary font-mono text-sm bg-secondary/5 backdrop-blur-sm mb-4">
            KNOWLEDGE_BASE // ONLINE
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
            ENGINEERING
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent block mt-2">
              THOUGHTS & SYSTEMS
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-mono max-w-2xl mx-auto">
            Insights on scaling architectures, distributed systems, and the future of tech.
          </p>

          <div className="flex justify-center gap-6 mt-8">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group">
              <div className="p-3 border border-primary/30 rounded-full bg-primary/5 hover:bg-primary/20 hover:border-primary transition-all duration-300 hover:scale-110 shadow-[0_0_10px_rgba(236,72,153,0.2)] hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]">
                <Instagram className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
              </div>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="group">
               <div className="p-3 border border-red-500/30 rounded-full bg-red-500/5 hover:bg-red-500/20 hover:border-red-500 transition-all duration-300 hover:scale-110 shadow-[0_0_10px_rgba(239,68,68,0.2)] hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                <Youtube className="w-6 h-6 text-red-500 group-hover:text-white transition-colors" />
              </div>
            </a>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="group">
               <div className="p-3 border border-secondary/30 rounded-full bg-secondary/5 hover:bg-secondary/20 hover:border-secondary transition-all duration-300 hover:scale-110 shadow-[0_0_10px_rgba(6,182,212,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                <Send className="w-6 h-6 text-secondary group-hover:text-white transition-colors" />
              </div>
            </a>
          </div>
        </motion.div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground text-sm font-mono opacity-50">
          SCROLL_TO_ACCESS_DATA
        </div>
      </section>

      {/* Series Rail - Instagram Stories style */}
      <section className="py-8 relative z-10 border-b border-white/5">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-6 px-4">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">SERIES</span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>
          <SeriesRail />
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-8 relative z-10 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH_KNOWLEDGE_BASE..."
                  className="w-full pl-12 pr-12 py-3 bg-black/40 border border-white/10 rounded-lg font-mono text-sm focus:outline-none focus:border-primary/50 focus:shadow-[0_0_10px_rgba(236,72,153,0.2)] transition-all placeholder:text-muted-foreground/50"
                  data-testid="input-search"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                    data-testid="button-clear-search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowTagFilter(!showTagFilter)}
                className={`px-4 py-3 rounded-lg border font-mono text-sm transition-all flex items-center gap-2 ${
                  showTagFilter || selectedTags.length > 0
                    ? 'bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(236,72,153,0.3)]'
                    : 'bg-black/40 border-white/10 text-muted-foreground hover:border-white/30 hover:text-white'
                }`}
                data-testid="button-toggle-tags"
              >
                <Hash className="w-4 h-4" />
                {selectedTags.length > 0 && (
                  <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full">{selectedTags.length}</span>
                )}
              </button>
            </div>
            
            {showTagFilter && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-2 items-center p-4 bg-black/20 rounded-lg border border-white/5"
              >
                <span className="text-xs font-mono text-muted-foreground mr-2 w-full mb-2">FILTER_BY_TAG:</span>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 text-xs font-mono rounded border transition-all flex items-center gap-1.5 ${
                      selectedTags.includes(tag)
                        ? 'bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(236,72,153,0.3)]'
                        : 'bg-black/20 border-white/10 text-muted-foreground hover:border-white/30 hover:text-white'
                    }`}
                    data-testid={`button-tag-${tag}`}
                  >
                    <Hash className="w-3 h-3" />
                    {tag}
                  </button>
                ))}
              </motion.div>
            )}
            
            {hasActiveFilters && (
              <div className="flex items-center justify-between text-sm font-mono">
                <span className="text-muted-foreground">
                  FOUND: <span className="text-primary">{filteredPosts.length}</span> ARTICLES
                </span>
                <button 
                  onClick={clearFilters}
                  className="text-secondary hover:text-white transition-colors flex items-center gap-1"
                  data-testid="button-clear-filters"
                >
                  <X className="w-3 h-3" /> CLEAR_FILTERS
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-20 font-mono text-muted-foreground">
              LOADING_KNOWLEDGE_BASE...
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="font-mono text-muted-foreground mb-4">NO_RESULTS_FOUND</div>
              <p className="text-sm text-muted-foreground/60">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(0, 12).map((post, index) => (
              <Link key={post.id} href={`/blog/${post.slug || post.id}`} className="block group" data-testid={`card-blog-${post.slug || post.id}`}>
                <NeonCard variant="accent" className="h-full flex flex-col hover:bg-accent/5 transition-all duration-300 hover:scale-[1.02]">
                  <div className="mb-6 relative overflow-hidden rounded border border-white/10 aspect-video bg-black/40 group-hover:border-accent/50 transition-colors">
                     {post.imageUrl && (
                       <img 
                         src={post.imageUrl} 
                         alt={post.title}
                         className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                       />
                     )}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                     <div className="absolute bottom-3 left-3 flex gap-2 z-10 flex-wrap">
                        {(() => {
                          const series = getSeriesFromTitle(post.title);
                          const seriesKeywords = series ? [series.name.toLowerCase(), series.slug.toLowerCase()] : [];
                          const filteredTags = post.tags.filter(tag => 
                            !seriesKeywords.some(kw => tag.toLowerCase().includes(kw) || kw.includes(tag.toLowerCase()))
                          );
                          return (
                            <>
                              {series && (
                                <span 
                                  className="text-[10px] bg-black/80 backdrop-blur px-2 py-1 border rounded flex items-center gap-1"
                                  style={{ borderColor: series.color, color: series.color }}
                                >
                                  {series.icon}
                                  {series.name}
                                </span>
                              )}
                              {filteredTags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-[10px] bg-black/80 backdrop-blur px-2 py-1 border border-white/20 text-white rounded">
                                  {tag}
                                </span>
                              ))}
                            </>
                          );
                        })()}
                     </div>
                  </div>
                  
                  <div className="mb-4 text-xs font-mono text-accent opacity-70">
                    <span>{post.publishedAt && new Date(post.publishedAt).toLocaleDateString('en-CA')}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 font-display leading-tight group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-sm font-mono text-accent">
                    <span>READ_ARTICLE</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </NeonCard>
              </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About / CV CTA Section */}
      <section className="py-20 bg-black/40 border-y border-white/10">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <NeonCard variant="primary" className="p-12 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              BEHIND THE CODE
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              I'm Sergey Bershadsky, a Startup Architect & Product Delivery Expert with 15+ years of experience.
            </p>
            
            <div className="flex justify-center gap-6">
              <Link href="/about">
                <CyberButton size="lg" className="flex items-center gap-2">
                  ACCESS_PROFILE <ExternalLink className="w-4 h-4" />
                </CyberButton>
              </Link>
            </div>
            
            <div className="mt-8 flex justify-center gap-8 font-mono text-sm text-muted-foreground/60">
              <span>// ARCHITECTURE</span>
              <span>// LEADERSHIP</span>
              <span>// SCALING</span>
            </div>
          </NeonCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-muted-foreground font-mono text-sm">
        <p>© 2025 SERGEY_BERSHADSKY // KNOWLEDGE_BASE</p>
      </footer>
    </div>
  );
}
