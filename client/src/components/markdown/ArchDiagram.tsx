import React, { useEffect, useMemo, useRef, useState } from 'react';
import DOMPurify from 'dompurify';
import { Copy, Check, Download, Maximize2, X } from 'lucide-react';
import { expandLucideIcons } from './archDiagramIcons';

/**
 * ArchDiagram — v2 diagram renderer based on Cocoon-AI's
 * architecture-diagram-generator design system (slate-950 background,
 * JetBrains Mono, semantic color palette, inline SVG).
 *
 * This is an ADDITIVE path. The existing ASCII-pattern diagrams under
 * ./diagrams/* and their registry remain the v1 system and are untouched.
 *
 * Authoring: place a fenced block with language `arch-diagram` in markdown.
 * The body is raw inline SVG markup. Optional metadata can be supplied via
 * an HTML comment on the first line, e.g.:
 *   <!-- fig: 2.1 | title: REQUEST FLOW | label: SYSTEM -->
 */

const VIOLET_GRID = '#1e293b';
const BG = '#020617';

interface ArchMeta {
  fig?: string;
  title?: string;
  label?: string;
}

function parseMeta(raw: string): { meta: ArchMeta; body: string } {
  const m = raw.match(/^\s*<!--\s*([^>]*?)\s*-->\s*([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw };
  const fields = m[1].split('|').map(s => s.trim()).filter(Boolean);
  const meta: ArchMeta = {};
  for (const f of fields) {
    const [k, ...rest] = f.split(':');
    const v = rest.join(':').trim();
    if (!v) continue;
    if (k.trim() === 'fig') meta.fig = v;
    else if (k.trim() === 'title') meta.title = v;
    else if (k.trim() === 'label') meta.label = v;
  }
  return { meta, body: m[2] };
}

const SANITIZE_CONFIG = {
  USE_PROFILES: { svg: true, svgFilters: true },
} as const;

const gridSurfaceStyle: React.CSSProperties = {
  background: BG,
  fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  backgroundImage:
    `linear-gradient(${VIOLET_GRID} 1px, transparent 1px),` +
    `linear-gradient(90deg, ${VIOLET_GRID} 1px, transparent 1px)`,
  backgroundSize: '40px 40px',
};

export const ArchDiagram = ({ content }: { content: string }) => {
  const { meta, body } = useMemo(() => parseMeta(content), [content]);
  const safeBody = useMemo(
    () => DOMPurify.sanitize(expandLucideIcons(body), SANITIZE_CONFIG) as unknown as string,
    [body]
  );
  const svgRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const fig = meta.fig ?? 'A';
  const title = meta.title ?? 'ARCHITECTURE';
  const label = meta.label ?? 'ARCH_V2';

  const copySource = () => {
    navigator.clipboard.writeText(body.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSvg = () => {
    const svg = svgRef.current?.querySelector('svg');
    if (!svg) return;
    const serialized = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([serialized], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diagram-${fig.replace(/\W+/g, '-')}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomed(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [zoomed]);

  return (
    <>
      <div className="my-10 border border-accent/30 rounded-lg bg-black/40 p-5">
        <div className="text-sm font-mono text-accent mb-3 flex justify-between items-center gap-3">
          <span>FIG {fig} // {title}</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setZoomed(true)}
              className="text-xs font-mono flex items-center gap-1.5 text-muted-foreground hover:text-secondary transition-colors"
              aria-label="Zoom diagram"
              data-testid="button-zoom-diagram"
            >
              <Maximize2 className="w-3 h-3" />
              ZOOM
            </button>
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        </div>
        <div
          ref={svgRef}
          className="arch-diagram-surface relative rounded border border-white/10 overflow-x-auto"
          style={gridSurfaceStyle}
          // Content is authored markdown from the repo and sanitized via DOMPurify
          // with the SVG profile before render.
          dangerouslySetInnerHTML={{ __html: safeBody }}
        />
      </div>

      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm"
          onClick={() => setZoomed(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Zoomed diagram: ${title}`}
        >
          <div
            className="flex items-center justify-between px-6 py-3 border-b border-secondary/30 font-mono text-xs flex-wrap gap-3"
            onClick={e => e.stopPropagation()}
          >
            <span className="text-secondary">FIG {fig} // {title}</span>
            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={copySource}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-white transition-colors"
                aria-label="Copy SVG source"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'COPIED' : 'COPY_SVG'}
              </button>
              <button
                onClick={downloadSvg}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-white transition-colors"
                aria-label="Download SVG"
              >
                <Download className="w-3.5 h-3.5" />
                SAVE
              </button>
              <span className="text-muted-foreground hidden sm:inline">{label}</span>
              <span className="text-muted-foreground hidden md:inline">ESC to close</span>
              <button
                onClick={() => setZoomed(false)}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-white transition-colors"
                aria-label="Close zoom"
              >
                <X className="w-4 h-4" />
                CLOSE
              </button>
            </div>
          </div>
          <div
            className="flex-1 overflow-auto p-4 md:p-8"
            onClick={e => e.stopPropagation()}
          >
            <div
              className="mx-auto max-w-[1600px] rounded border border-white/10 [&_svg]:w-full [&_svg]:h-auto [&_svg]:block"
              style={gridSurfaceStyle}
              dangerouslySetInnerHTML={{ __html: safeBody }}
            />
          </div>
        </div>
      )}
    </>
  );
};

/** Heuristic detector: matches when the fenced block body is inline SVG. */
export const isArchDiagramSvg = (content: string): boolean => {
  const trimmed = content.trimStart();
  if (trimmed.startsWith('<!--')) {
    const idx = trimmed.indexOf('-->');
    if (idx === -1) return false;
    return trimmed.slice(idx + 3).trimStart().startsWith('<svg');
  }
  return trimmed.startsWith('<svg');
};
