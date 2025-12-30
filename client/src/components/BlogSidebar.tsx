import React, { useState, useEffect, useCallback } from 'react';
import { Link as LinkIcon, Twitter, Linkedin, Check, List, X } from 'lucide-react';

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface BlogSidebarProps {
  headings: HeadingItem[];
  postTitle: string;
  postUrl: string;
}

export function BlogSidebar({ headings, postTitle, postUrl }: BlogSidebarProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce((prev, curr) => 
            prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
          );
          setActiveId(topEntry.target.id);
        }
      },
      {
        rootMargin: '-100px 0px -66% 0px',
        threshold: 0
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
      setMobileOpen(false);
    }
  }, []);

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(postUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [postUrl]);

  const shareToTwitter = useCallback(() => {
    const text = encodeURIComponent(postTitle);
    const url = encodeURIComponent(postUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  }, [postTitle, postUrl]);

  const shareToLinkedIn = useCallback(() => {
    const url = encodeURIComponent(postUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  }, [postUrl]);

  return (
    <>
      <aside className="hidden lg:block w-[250px] flex-shrink-0">
        <div className="sticky top-24 space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <div className="border border-primary/30 rounded-lg bg-black/40 p-5">
            <h4 className="text-xs font-mono text-primary mb-4 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              SHARE_PROTOCOL
            </h4>
            <div className="flex gap-2">
              <button
                onClick={copyLink}
                className="flex-1 flex items-center justify-center gap-2 p-2.5 border border-white/20 rounded-lg bg-white/5 hover:bg-primary/20 hover:border-primary/50 transition-all group"
                data-testid="button-copy-link"
                title="Copy link"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <LinkIcon className="w-4 h-4 text-white/70 group-hover:text-primary transition-colors" />
                )}
              </button>
              <button
                onClick={shareToTwitter}
                className="flex-1 flex items-center justify-center gap-2 p-2.5 border border-white/20 rounded-lg bg-white/5 hover:bg-secondary/20 hover:border-secondary/50 transition-all group"
                data-testid="button-share-twitter"
                title="Share on X"
              >
                <Twitter className="w-4 h-4 text-white/70 group-hover:text-secondary transition-colors" />
              </button>
              <button
                onClick={shareToLinkedIn}
                className="flex-1 flex items-center justify-center gap-2 p-2.5 border border-white/20 rounded-lg bg-white/5 hover:bg-accent/20 hover:border-accent/50 transition-all group"
                data-testid="button-share-linkedin"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-white/70 group-hover:text-accent transition-colors" />
              </button>
            </div>
          </div>

          {headings.length > 0 && (
            <div className="border border-secondary/30 rounded-lg bg-black/40 p-5">
              <h4 className="text-xs font-mono text-secondary mb-4 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-secondary rounded-full" />
                TABLE_OF_CONTENTS
              </h4>
              <nav className="space-y-1">
                {headings.map((heading) => (
                  <button
                    key={heading.id}
                    onClick={() => scrollToHeading(heading.id)}
                    className={`w-full text-left text-sm py-1.5 px-2 rounded transition-all duration-200 block ${
                      activeId === heading.id
                        ? 'text-primary bg-primary/10 border-l-2 border-primary'
                        : 'text-muted-foreground hover:text-white hover:bg-white/5'
                    }`}
                    style={{ paddingLeft: heading.level === 3 ? '1.5rem' : '0.5rem' }}
                    data-testid={`toc-item-${heading.id}`}
                  >
                    <span className="flex items-start gap-2">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        activeId === heading.id ? 'bg-primary' : 'bg-white/30'
                      }`} />
                      <span className="line-clamp-2">{heading.text}</span>
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </aside>

      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary/90 border border-primary shadow-[0_0_20px_rgba(236,72,153,0.5)] flex items-center justify-center text-white hover:scale-110 transition-transform"
        data-testid="button-mobile-toc"
        aria-label="Open table of contents"
      >
        <List className="w-6 h-6" />
      </button>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)}>
          <div 
            className="absolute bottom-0 left-0 right-0 max-h-[70vh] bg-background border-t border-white/10 rounded-t-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="font-mono text-sm text-primary uppercase tracking-wider">Navigation</h3>
              <button 
                onClick={() => setMobileOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                data-testid="button-close-mobile-toc"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(70vh-60px)]">
              <div className="border border-primary/30 rounded-lg bg-black/40 p-4">
                <h4 className="text-xs font-mono text-primary mb-3 uppercase tracking-widest">SHARE_PROTOCOL</h4>
                <div className="flex gap-2">
                  <button
                    onClick={copyLink}
                    className="flex-1 flex items-center justify-center gap-2 p-3 border border-white/20 rounded-lg bg-white/5 hover:bg-primary/20 transition-all"
                    data-testid="button-mobile-copy-link"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-400" /> : <LinkIcon className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={shareToTwitter}
                    className="flex-1 flex items-center justify-center gap-2 p-3 border border-white/20 rounded-lg bg-white/5 hover:bg-secondary/20 transition-all"
                    data-testid="button-mobile-share-twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button
                    onClick={shareToLinkedIn}
                    className="flex-1 flex items-center justify-center gap-2 p-3 border border-white/20 rounded-lg bg-white/5 hover:bg-accent/20 transition-all"
                    data-testid="button-mobile-share-linkedin"
                  >
                    <Linkedin className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {headings.length > 0 && (
                <div className="border border-secondary/30 rounded-lg bg-black/40 p-4">
                  <h4 className="text-xs font-mono text-secondary mb-3 uppercase tracking-widest">TABLE_OF_CONTENTS</h4>
                  <nav className="space-y-1">
                    {headings.map((heading) => (
                      <button
                        key={heading.id}
                        onClick={() => scrollToHeading(heading.id)}
                        className={`w-full text-left text-sm py-2 px-3 rounded transition-all ${
                          activeId === heading.id
                            ? 'text-primary bg-primary/10 border-l-2 border-primary'
                            : 'text-muted-foreground hover:text-white hover:bg-white/5'
                        }`}
                        style={{ paddingLeft: heading.level === 3 ? '1.5rem' : '0.75rem' }}
                        data-testid={`toc-mobile-item-${heading.id}`}
                      >
                        {heading.text}
                      </button>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export type { HeadingItem };
