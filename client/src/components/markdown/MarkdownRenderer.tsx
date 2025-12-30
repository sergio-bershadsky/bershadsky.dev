import React, { useMemo, useEffect, useRef } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeReact from 'rehype-react';
import * as prod from 'react/jsx-runtime';
import { Copy, Check, Brain, MessageSquare, Zap, Bot, RefreshCw, BookOpen, Turtle, Wrench, ClipboardList, TrendingUp, TrendingDown, Users, User, Home, Cloud, AlertTriangle, CheckCircle } from 'lucide-react';
import { CyberCodeBlock } from './CodeBlock';

const emojiToIcon: Record<string, React.ReactNode> = {
  '⚡': <Zap className="w-4 h-4 inline text-yellow-400" />,
  '🐢': <Turtle className="w-4 h-4 inline text-green-400" />,
  '✅': <CheckCircle className="w-4 h-4 inline text-green-400" />,
  '⚠️': <AlertTriangle className="w-4 h-4 inline text-yellow-400" />,
  '🔧': <Wrench className="w-4 h-4 inline text-secondary" />,
  '📋': <ClipboardList className="w-4 h-4 inline text-secondary" />,
  '📈': <TrendingUp className="w-4 h-4 inline text-red-400" />,
  '📉': <TrendingDown className="w-4 h-4 inline text-green-400" />,
  '👩‍💻': <User className="w-4 h-4 inline text-primary" />,
  '👥': <Users className="w-4 h-4 inline text-primary" />,
  '🏠': <Home className="w-4 h-4 inline text-green-400" />,
  '☁️': <Cloud className="w-4 h-4 inline text-secondary" />,
  '🧠': <Brain className="w-4 h-4 inline text-primary" />,
  '📚': <BookOpen className="w-4 h-4 inline text-primary" />,
  '💬': <MessageSquare className="w-4 h-4 inline text-secondary" />,
  '🔄': <RefreshCw className="w-4 h-4 inline text-accent" />,
};

const replaceEmojisWithIcons = (node: React.ReactNode): React.ReactNode => {
  if (typeof node === 'string') {
    const parts: React.ReactNode[] = [];
    let remaining = node;
    let key = 0;
    
    for (const [emoji, icon] of Object.entries(emojiToIcon)) {
      if (remaining.includes(emoji)) {
        const segments = remaining.split(emoji);
        remaining = '';
        segments.forEach((segment, i) => {
          if (segment) parts.push(<span key={key++}>{segment}</span>);
          if (i < segments.length - 1) parts.push(<span key={key++}>{icon}</span>);
        });
        remaining = '';
      }
    }
    
    if (parts.length > 0) return <>{parts}</>;
    return node;
  }
  
  if (Array.isArray(node)) {
    return node.map((child, i) => <React.Fragment key={i}>{replaceEmojisWithIcons(child)}</React.Fragment>);
  }
  
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    if (props.children) {
      return React.cloneElement(node, {}, replaceEmojisWithIcons(props.children));
    }
  }
  
  return node;
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
    {replaceEmojisWithIcons(children)}
  </td>
);

const CyberBlockquote = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="border-l-4 border-primary pl-6 my-8 italic text-xl text-gray-200 bg-gradient-to-r from-primary/10 to-transparent py-4 pr-4 rounded-r-lg">
    {children}
  </blockquote>
);

const extractText = (node: React.ReactNode): string => {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (!node) return '';
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    if (props.children) {
      return extractText(props.children);
    }
  }
  return '';
};

const generateSlug = (text: string): string => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};

const CyberH1 = ({ children }: { children: React.ReactNode }) => {
  const text = extractText(children);
  const cleanedTitle = text.replace(/^Part \d+:\s*/i, '');
  return (
    <h1 className="md:text-4xl font-display font-bold text-white mt-6 md:mt-8 mb-4 md:mb-6 tracking-wide text-[28px]">
      {cleanedTitle}
    </h1>
  );
};

const CyberH2 = ({ children }: { children: React.ReactNode }) => {
  const text = extractText(children);
  const id = generateSlug(text);
  return (
    <h2 id={id} className="text-[24px] md:text-3xl font-display font-bold text-white mt-8 md:mt-12 mb-4 md:mb-6 tracking-wide scroll-mt-24">
      {children}
    </h2>
  );
};

const CyberH3 = ({ children }: { children: React.ReactNode }) => {
  const text = extractText(children);
  const id = generateSlug(text);
  return (
    <h3 id={id} className="text-lg md:text-2xl font-display font-semibold text-white mt-6 md:mt-8 mb-3 md:mb-4 scroll-mt-24">
      {children}
    </h3>
  );
};

const CyberParagraph = ({ children }: { children: React.ReactNode }) => {
  const textContent = extractText(children);
  if (textContent.includes('Reading time:')) {
    return null;
  }
  return (
    <p className="text-lg leading-8 text-gray-300 mb-6">
      {children}
    </p>
  );
};

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

const CyberHr = () => null;

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
  const headingsRef = useRef<string[]>([]);
  
  const renderedContent = useMemo(() => {
    const headings: string[] = [];
    const headingRegex = /^#{2,3}\s+(.+)$/gm;
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      headings.push(match[1]);
    }
    headingsRef.current = headings.slice(0, 6);

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
  }, [content]);
  
  useEffect(() => {
    if (onHeadingsExtracted && headingsRef.current.length > 0) {
      onHeadingsExtracted(headingsRef.current);
    }
  }, [content, onHeadingsExtracted]);

  return <div className="markdown-content">{renderedContent}</div>;
}
