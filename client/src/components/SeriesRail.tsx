import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Brain, Layers, Rocket, BookOpen, Zap, Code, Server, Database, Globe, Cpu, Briefcase } from 'lucide-react';
import { getAllSeries, type Series } from '@/lib/dataLoader';

const getSeriesIcon = (slug: string, accentColor: string) => {
  const iconProps = { className: "w-8 h-8 md:w-10 md:h-10", style: { color: accentColor } };
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

interface SeriesRailProps {
  onSeriesClick?: (series: Series) => void;
}

export const SeriesRail: React.FC<SeriesRailProps> = ({ onSeriesClick }) => {
  const { data: seriesList = [], isLoading } = useQuery<Series[]>({
    queryKey: ['series'],
    queryFn: getAllSeries
  });

  if (isLoading) {
    return (
      <div className="flex gap-6 overflow-x-auto pb-4 px-4 scrollbar-hide">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2 animate-pulse">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10" />
            <div className="w-16 h-3 rounded bg-white/10" />
          </div>
        ))}
      </div>
    );
  }

  if (seriesList.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <div className="flex gap-6 justify-center pb-4 px-4">
        {seriesList.map((s, index) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link
              href={`/series/${s.slug}`}
              className="flex flex-col items-center gap-3 cursor-pointer group"
              onClick={(e) => {
                if (onSeriesClick) {
                  e.preventDefault();
                  onSeriesClick(s);
                }
              }}
              data-testid={`series-bubble-${s.id}`}
            >
            {/* Story-style circular bubble */}
            <div 
              className="relative w-20 h-20 md:w-24 md:h-24 rounded-full p-[3px] group-hover:scale-105 transition-transform duration-300"
              style={{
                background: `linear-gradient(135deg, ${s.accentColor || '#ec4899'}, ${s.accentColor ? s.accentColor + '80' : '#06b6d4'})`,
              }}
            >
              {/* Inner white border */}
              <div className="absolute inset-[3px] rounded-full bg-background p-[2px]">
                {/* Series Icon */}
                <div className="w-full h-full rounded-full overflow-hidden bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                  {getSeriesIcon(s.slug, s.accentColor || '#ec4899')}
                </div>
              </div>
              
              {/* Glow effect on hover */}
              <div 
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-md -z-10"
                style={{ background: s.accentColor || '#ec4899' }}
              />
            </div>
            
            {/* Series title */}
            <span className="text-xs md:text-sm font-mono text-center text-muted-foreground group-hover:text-white transition-colors max-w-[80px] md:max-w-[100px] truncate">
              {s.slug === 'second-brain-claude' ? 'Second Brain' : s.title}
            </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
