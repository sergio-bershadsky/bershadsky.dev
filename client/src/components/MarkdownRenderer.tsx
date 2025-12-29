import React, { useMemo, useState } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeReact from 'rehype-react';
import * as prod from 'react/jsx-runtime';
import { Copy, Check } from 'lucide-react';
import { NeonCard } from './CyberpunkUI';

const CyberCodeBlock = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [copied, setCopied] = useState(false);
  const codeContent = typeof children === 'string' ? children : 
    React.Children.toArray(children).map(child => 
      typeof child === 'string' ? child : ''
    ).join('');

  const isAsciiDiagram = codeContent.includes('╔') || 
                         codeContent.includes('┌') || 
                         codeContent.includes('│') ||
                         codeContent.includes('───') ||
                         codeContent.includes('═══');

  const copyCode = () => {
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isAsciiDiagram) {
    return (
      <NeonCard variant="secondary" className="my-10 p-6 md:p-8">
        <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
          <span>DIAGRAM // VISUAL_SCHEMA</span>
          <span className="text-xs text-muted-foreground">RENDERED</span>
        </div>
        <div className="relative border border-dashed border-white/20 rounded bg-black/40 p-4 md:p-6 overflow-x-auto">
          <pre className="font-mono text-sm md:text-base leading-relaxed text-gray-200 whitespace-pre">
            {codeContent}
          </pre>
        </div>
      </NeonCard>
    );
  }

  return (
    <div className="relative group my-8">
      <div className="absolute -top-3 left-4 bg-background px-2 text-xs font-mono text-primary border border-primary/30 rounded z-10">
        CODE_BLOCK
      </div>
      <div className="bg-[#0d1117] rounded-lg border border-white/10 overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
          </div>
          <button 
            onClick={copyCode}
            className="text-xs font-mono flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
            data-testid="button-copy-code"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? 'COPIED' : 'COPY_SOURCE'}
          </button>
        </div>
        <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed">
          <code className="text-gray-300">{codeContent}</code>
        </pre>
      </div>
    </div>
  );
};

const CyberTable = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-x-auto my-8">
    <div className="border border-white/20 rounded-lg overflow-hidden shadow-lg">
      <table className="w-full border-collapse">
        {children}
      </table>
    </div>
  </div>
);

const CyberThead = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-white/20">
    {children}
  </thead>
);

const CyberTh = ({ children }: { children: React.ReactNode }) => (
  <th className="px-4 py-3 text-left font-display font-bold text-white text-sm uppercase tracking-wider">
    {children}
  </th>
);

const CyberTd = ({ children }: { children: React.ReactNode }) => (
  <td className="px-4 py-3 text-gray-300 border-t border-white/10 text-base">
    {children}
  </td>
);

const CyberBlockquote = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="border-l-4 border-primary pl-6 my-8 italic text-xl text-gray-200 bg-gradient-to-r from-primary/10 to-transparent py-4 pr-4 rounded-r-lg">
    {children}
  </blockquote>
);

const CyberH1 = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-4xl font-display font-bold text-white mt-8 mb-6 tracking-wide">
    {children}
  </h1>
);

const CyberH2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-display font-bold text-white mt-12 mb-6 tracking-wide border-b border-white/10 pb-4">
    {children}
  </h2>
);

const CyberH3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-2xl font-display font-semibold text-white mt-8 mb-4">
    {children}
  </h3>
);

const CyberParagraph = ({ children }: { children: React.ReactNode }) => (
  <p className="text-lg leading-8 text-gray-300 mb-6">
    {children}
  </p>
);

const CyberUl = ({ children }: { children: React.ReactNode }) => (
  <ul className="list-disc pl-6 space-y-3 text-gray-300 my-6 marker:text-primary">
    {children}
  </ul>
);

const CyberOl = ({ children }: { children: React.ReactNode }) => (
  <ol className="list-decimal pl-6 space-y-3 text-gray-300 my-6 marker:text-primary">
    {children}
  </ol>
);

const CyberLi = ({ children }: { children: React.ReactNode }) => (
  <li className="pl-2 text-lg leading-relaxed">
    {children}
  </li>
);

const CyberStrong = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-bold text-white">
    {children}
  </strong>
);

const CyberEm = ({ children }: { children: React.ReactNode }) => (
  <em className="italic text-gray-200">
    {children}
  </em>
);

const CyberInlineCode = ({ children }: { children: React.ReactNode }) => (
  <code className="bg-white/10 text-primary px-2 py-1 rounded text-base font-mono">
    {children}
  </code>
);

const CyberHr = () => (
  <hr className="border-t border-white/10 my-10" />
);

const CyberLink = ({ href, children }: { href?: string; children: React.ReactNode }) => (
  <a href={href} className="text-primary hover:text-accent underline transition-colors">
    {children}
  </a>
);

interface MarkdownRendererProps {
  content: string;
  onHeadingsExtracted?: (headings: string[]) => void;
}

export function MarkdownRenderer({ content, onHeadingsExtracted }: MarkdownRendererProps) {
  const renderedContent = useMemo(() => {
    const headings: string[] = [];
    const headingRegex = /^#{2,3}\s+(.+)$/gm;
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      headings.push(match[1]);
    }
    if (onHeadingsExtracted) {
      onHeadingsExtracted(headings.slice(0, 6));
    }

    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeReact, {
        Fragment: prod.Fragment,
        jsx: prod.jsx,
        jsxs: prod.jsxs,
        components: {
          h1: CyberH1,
          h2: CyberH2,
          h3: CyberH3,
          p: CyberParagraph,
          blockquote: CyberBlockquote,
          ul: CyberUl,
          ol: CyberOl,
          li: CyberLi,
          strong: CyberStrong,
          em: CyberEm,
          code: ({ children, className }: { children?: React.ReactNode; className?: string }) => {
            if (className || (typeof children === 'string' && children.includes('\n'))) {
              return null;
            }
            return <CyberInlineCode>{children}</CyberInlineCode>;
          },
          pre: ({ children }: { children?: React.ReactNode }) => {
            const codeElement = React.Children.toArray(children)[0] as React.ReactElement<{ children?: React.ReactNode }>;
            const codeContent = codeElement?.props?.children;
            return <CyberCodeBlock>{codeContent}</CyberCodeBlock>;
          },
          table: CyberTable,
          thead: CyberThead,
          th: CyberTh,
          td: CyberTd,
          hr: CyberHr,
          a: CyberLink,
        },
      });

    const result = processor.processSync(content);
    return result.result;
  }, [content, onHeadingsExtracted]);

  return <div className="markdown-content">{renderedContent}</div>;
}
