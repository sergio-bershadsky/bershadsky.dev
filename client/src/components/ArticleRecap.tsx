import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ChevronDown } from 'lucide-react';
import { NeonCard } from '@/components/CyberpunkUI';

interface ArticleRecapProps {
  recap: string | null | undefined;
  accentColor?: string | null;
}

const PANEL_ID = 'article-recap-panel';

/**
 * 30-second recap of an article, revealed from a chip in the post meta row.
 *
 * Split into a trigger and a panel because they live in different parts of the
 * page: the chip joins the existing meta chips, the panel expands further down,
 * between the excerpt and the article body.
 */
export function useArticleRecap(recap: string | null | undefined, accentColor?: string | null) {
  const [open, setOpen] = React.useState(false);
  const accent = accentColor || 'hsl(var(--primary))';

  if (!recap?.trim()) {
    return { trigger: null, panel: null };
  }

  const trigger = (
    <button
      type="button"
      onClick={() => setOpen(v => !v)}
      aria-expanded={open}
      aria-controls={PANEL_ID}
      data-testid="button-article-recap"
      className="flex items-center gap-2 px-3 py-1.5 rounded border transition-colors"
      style={{
        borderColor: open ? accent : `${accent}55`,
        backgroundColor: `${accent}14`,
        color: accent,
        boxShadow: open ? `0 0 12px ${accent}55` : undefined,
      }}
    >
      <Zap className="w-3 h-3" />
      TL;DR // 30_SEC
      <ChevronDown
        className={`w-3 h-3 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      />
    </button>
  );

  const panel = (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id={PANEL_ID}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
          data-testid="panel-article-recap"
        >
          <NeonCard interactive={false} style={{ borderColor: `${accent}66` }}>
            <div
              className="font-mono text-xs tracking-wider mb-3"
              style={{ color: accent }}
            >
              RECAP // 30_SECOND_READ
            </div>
            <p className="font-serif text-[15px] md:text-base leading-relaxed text-[#d1d5db]">
              {recap.trim()}
            </p>
          </NeonCard>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return { trigger, panel };
}
