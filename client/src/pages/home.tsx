import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Network, Code, Briefcase, GraduationCap, Mail, MapPin, Phone, Github, Linkedin, ExternalLink, ArrowRight, Instagram, Youtube, Send } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { cvData } from '@/data/cv';
import { GlitchText, NeonCard, CyberButton, SectionHeader, NameGlitch } from '@/components/CyberpunkUI';
import { CyberpunkBackground } from '@/components/CyberpunkBackground';
import { SeriesRail } from '@/components/SeriesRail';
import avatarImage from '@assets/generated_images/cyberpunk_portrait_of_bearded_man_with_glasses.png';
import type { BlogPost } from '@shared/schema';

export default function Home() {
  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
    queryFn: async () => {
      const response = await fetch('/api/blog-posts');
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      return response.json();
    }
  });
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

      {/* Blog Grid Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-20 font-mono text-muted-foreground">
              LOADING_KNOWLEDGE_BASE...
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(0, 12).map((post, index) => (
              <a key={index} href={`/blog/${post.id}`} className="block group" data-testid={`card-blog-${post.id}`}>
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
                     <div className="absolute bottom-3 left-3 flex gap-2 z-10">
                        {post.tags.map(tag => (
                          <span key={tag} className="text-[10px] bg-black/80 backdrop-blur px-2 py-1 border border-white/20 text-white rounded">
                            {tag}
                          </span>
                        ))}
                     </div>
                  </div>
                  
                  <div className="mb-4 text-xs font-mono text-accent flex justify-between opacity-70">
                    <span>ID: 00{post.id}</span>
                    <span>{post.date}</span>
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
              </a>
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
              <a href="/about">
                <CyberButton size="lg" className="flex items-center gap-2">
                  ACCESS_PROFILE <ExternalLink className="w-4 h-4" />
                </CyberButton>
              </a>
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