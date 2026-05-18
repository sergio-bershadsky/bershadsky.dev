import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import {
  Activity,
  Bell,
  Box,
  Boxes,
  Cloud,
  Code,
  Cog,
  Container,
  Cpu,
  Database,
  FileCode,
  GitBranch,
  Globe,
  HardDrive,
  Key,
  KeyRound,
  Layers,
  Lock,
  Mail,
  MessageSquare,
  Monitor,
  Network,
  Search,
  Server,
  Shield,
  Smartphone,
  Terminal,
  User,
  Users,
  Webhook,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  activity: Activity,
  bell: Bell,
  box: Box,
  boxes: Boxes,
  cloud: Cloud,
  code: Code,
  cog: Cog,
  container: Container,
  cpu: Cpu,
  database: Database,
  'file-code': FileCode,
  'git-branch': GitBranch,
  globe: Globe,
  'hard-drive': HardDrive,
  key: Key,
  'key-round': KeyRound,
  layers: Layers,
  lock: Lock,
  mail: Mail,
  'message-square': MessageSquare,
  monitor: Monitor,
  network: Network,
  search: Search,
  server: Server,
  shield: Shield,
  smartphone: Smartphone,
  terminal: Terminal,
  user: User,
  users: Users,
  webhook: Webhook,
  workflow: Workflow,
  zap: Zap,
};

const innerCache = new Map<string, string>();

/** Render a lucide icon to its inner SVG markup (the <path>/<circle>/... children only). */
function lucideInner(name: string): string | null {
  const cached = innerCache.get(name);
  if (cached !== undefined) return cached;
  const Icon = ICONS[name];
  if (!Icon) {
    innerCache.set(name, '');
    return null;
  }
  const full = renderToStaticMarkup(createElement(Icon));
  const m = full.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  const inner = m ? m[1] : '';
  innerCache.set(name, inner);
  return inner;
}

const ATTR = (s: string, name: string): string | undefined => {
  const m = s.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`));
  return m ? m[1] : undefined;
};

/**
 * Preprocess `<lucide-icon name="..." x="..." y="..." size="24" color="#22d3ee" />`
 * placeholders inside a diagram body, replacing them with inline lucide SVG
 * wrapped in a positioned/scaled `<g>` group. Unknown names are stripped.
 *
 * Lucide icons are 24x24 with stroke-based paths drawn in currentColor.
 * `color` sets stroke; `size` sets bounding box (default 24).
 */
export function expandLucideIcons(svgBody: string): string {
  return svgBody.replace(
    /<lucide-icon\b([^>]*?)\/?>(?:\s*<\/lucide-icon>)?/g,
    (match, attrs: string) => {
      const name = ATTR(attrs, 'name');
      if (!name) return '';
      const inner = lucideInner(name);
      if (!inner) return '';
      const x = parseFloat(ATTR(attrs, 'x') ?? '0') || 0;
      const y = parseFloat(ATTR(attrs, 'y') ?? '0') || 0;
      const size = parseFloat(ATTR(attrs, 'size') ?? '24') || 24;
      const color = ATTR(attrs, 'color') ?? 'currentColor';
      const strokeWidth = ATTR(attrs, 'stroke-width') ?? '2';
      const scale = size / 24;
      return (
        `<g transform="translate(${x} ${y}) scale(${scale})" ` +
        `fill="none" stroke="${color}" stroke-width="${strokeWidth}" ` +
        `stroke-linecap="round" stroke-linejoin="round">${inner}</g>`
      );
    }
  );
}

export const supportedLucideIcons = Object.keys(ICONS);
