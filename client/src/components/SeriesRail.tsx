import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { getAllSeries, type Series } from '@/lib/dataLoader';
import { getSeriesIcon as getSeriesIconBase } from '@/lib/seriesIcons';

const getSeriesIcon = (slug: string, accentColor: string) =>
  getSeriesIconBase(slug, accentColor, { className: 'w-8 h-8 md:w-10 md:h-10' });

interface SeriesRailProps {
  onSeriesClick?: (series: Series) => void;
}

export const SeriesRail: React.FC<SeriesRailProps> = ({ onSeriesClick }) => {
  const { data: seriesList = [], isLoading } = useQuery<Series[]>({
    queryKey: ['series'],
    queryFn: getAllSeries
  });

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [showChevron, setShowChevron] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      const overflow = el.scrollWidth - el.clientWidth;
      const remaining = overflow - el.scrollLeft;
      setShowChevron(overflow > 4 && remaining > 8);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [seriesList.length]);

  if (isLoading) {
    return (
      <div className="flex gap-6 overflow-x-auto pb-4 px-4 scrollbar-hide">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2 animate-pulse flex-shrink-0">
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
      <div
        ref={scrollerRef}
        className="flex gap-6 pt-3 pb-4 pl-6 pr-12 md:px-4 overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-proximity scroll-pl-6 justify-start md:justify-center"
      >
        {seriesList.map((s, index) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex-shrink-0 snap-start"
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
              {s.shortTitle ?? s.title}
            </span>
            </Link>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showChevron && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden pointer-events-none absolute top-3 h-20 right-0 flex items-center pr-1 pl-6 bg-gradient-to-l from-background/60 via-background/30 to-transparent"
            aria-hidden="true"
          >
            <motion.div
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-primary"
            >
              <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
