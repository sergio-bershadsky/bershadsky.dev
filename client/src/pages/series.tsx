import React from 'react';
import { motion } from 'framer-motion';
import { useRoute, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight, Clock, Hash, Brain, Layers, Rocket, BookOpen } from 'lucide-react';
import { NeonCard, CyberButton } from '@/components/CyberpunkUI';
import { CyberpunkBackground } from '@/components/CyberpunkBackground';
import type { SeriesWithPosts } from '@shared/schema';

const getSeriesIcon = (slug: string, accentColor: string) => {
  const iconProps = { className: "w-16 h-16", style: { color: accentColor } };
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

export default function SeriesPage() {
  const [match, params] = useRoute("/series/:slug");
  
  const { data: seriesData, isLoading } = useQuery<SeriesWithPosts>({
    queryKey: ['/api/series', params?.slug],
    queryFn: async () => {
      const response = await fetch(`/api/series/${params?.slug}`);
      if (!response.ok) throw new Error('Failed to fetch series');
      return response.json();
    },
    enabled: !!params?.slug
  });

  if (isLoading) {
    return (
      <div className="min-h-screen text-foreground relative flex items-center justify-center">
        <CyberpunkBackground />
        <div className="text-center font-mono text-muted-foreground">
          LOADING_SERIES...
        </div>
      </div>
    );
  }

  if (!seriesData) {
    return (
      <div className="min-h-screen text-foreground relative flex items-center justify-center">
        <CyberpunkBackground />
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold mb-4">SERIES_NOT_FOUND</h1>
          <Link href="/" className="text-primary hover:text-accent transition-colors">
            RETURN_TO_BASE
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground relative overflow-x-hidden">
      <CyberpunkBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/10 px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-display font-bold">RETURN_TO_BASE</span>
          </Link>
          <div className="font-mono text-xs text-muted-foreground hidden md:block">
            SERIES: {seriesData.title.toUpperCase()} // {seriesData.posts.length} ARTICLES
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Series cover */}
            <div 
              className="w-32 h-32 mx-auto rounded-full mb-8 p-[4px]"
              style={{
                background: `linear-gradient(135deg, ${seriesData.accentColor || '#ec4899'}, ${seriesData.accentColor ? seriesData.accentColor + '60' : '#06b6d4'})`,
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-black/40 flex items-center justify-center">
                {seriesData.coverImageUrl ? (
                  <img 
                    src={seriesData.coverImageUrl} 
                    alt={seriesData.title}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  getSeriesIcon(seriesData.slug, seriesData.accentColor || '#ec4899')
                )}
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              {seriesData.title}
            </h1>
            {seriesData.description && (
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {seriesData.description}
              </p>
            )}
            <div className="mt-6 font-mono text-sm" style={{ color: seriesData.accentColor || '#ec4899' }}>
              {seriesData.posts.length} ARTICLES IN SERIES
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles List */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-6">
            {seriesData.posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={`/blog/${post.slug || post.id}`}
                  className="block group"
                  data-testid={`series-post-${post.slug || post.id}`}
                >
                  <NeonCard 
                    variant="accent" 
                    className="flex gap-6 items-center hover:bg-accent/5 transition-all duration-300"
                  >
                    {/* Part number */}
                    <div 
                      className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-display font-bold border-2"
                      style={{ 
                        borderColor: seriesData.accentColor || '#ec4899',
                        color: seriesData.accentColor || '#ec4899',
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 text-xs font-mono text-muted-foreground">
                        <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-CA') : post.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> 8 MIN
                        </span>
                      </div>
                      <h3 className="text-xl font-bold font-display group-hover:text-accent transition-colors truncate">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Arrow */}
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </NeonCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
