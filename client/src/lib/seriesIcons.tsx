import React from 'react';
import {
  Brain,
  Layers,
  Rocket,
  BookOpen,
  Briefcase,
  ShieldHalf,
  CloudCog,
  Database,
  BrainCircuit,
  type LucideIcon,
} from 'lucide-react';

/**
 * Single source of truth for series → icon mapping.
 *
 * Adding a new series? Add ONE entry here. Three call sites
 * (`SeriesRail`, `blog-post`, `series` page) consume this map.
 */
const SERIES_ICON_MAP: Record<string, LucideIcon> = {
  'second-brain-claude': Brain,
  'architecture-fundamentals': Layers,
  'startup-playbook': Rocket,
  'case-study': Briefcase,
  'zero-trust': ShieldHalf,
  'cloud-agnostic': CloudCog,
  'secondbrain-db': Database,
  'comprehension-debt': BrainCircuit,
};

interface GetSeriesIconOpts {
  className?: string;
  size?: string;
}

export function getSeriesIcon(
  slug: string,
  accentColor: string,
  opts: GetSeriesIconOpts = {}
): React.ReactNode {
  const Icon = SERIES_ICON_MAP[slug] ?? BookOpen;
  const className = opts.className ?? opts.size ?? 'w-5 h-5';
  return <Icon className={className} style={{ color: accentColor }} />;
}
