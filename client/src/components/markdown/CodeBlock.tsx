import React, { useState } from 'react';
import { Copy, Check, MessageSquare, Bot } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { NeonCard } from '../CyberpunkUI';
import { findDiagram } from './diagramRegistry';

import { coreDiagramEntries } from './diagrams/core';
import { connectionsDiagramEntries } from './diagrams/connections';
import { skillsDiagramEntries } from './diagrams/skills';
import { hooksDiagramEntries } from './diagrams/hooks';
import { pluginsDiagramEntries } from './diagrams/plugins';
import { trackingDiagramEntries } from './diagrams/tracking';
import { registerDiagrams } from './diagramRegistry';

const cyberpunkTheme: { [key: string]: React.CSSProperties } = {
  'code[class*="language-"]': {
    color: '#e2e8f0',
    background: 'none',
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
    fontSize: '0.875rem',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.6',
    tabSize: 2,
  },
  'pre[class*="language-"]': {
    color: '#e2e8f0',
    background: 'transparent',
    margin: 0,
    padding: '1.5rem',
    overflow: 'auto',
  },
  comment: { color: '#6b7280', fontStyle: 'italic' },
  prolog: { color: '#6b7280' },
  doctype: { color: '#6b7280' },
  cdata: { color: '#6b7280' },
  punctuation: { color: '#9ca3af' },
  property: { color: '#06b6d4' },
  tag: { color: '#ec4899' },
  boolean: { color: '#ec4899' },
  number: { color: '#fb923c' },
  constant: { color: '#fb923c' },
  symbol: { color: '#fb923c' },
  deleted: { color: '#f87171' },
  selector: { color: '#4ade80' },
  'attr-name': { color: '#06b6d4' },
  string: { color: '#4ade80' },
  char: { color: '#4ade80' },
  builtin: { color: '#06b6d4' },
  inserted: { color: '#4ade80' },
  operator: { color: '#9ca3af' },
  entity: { color: '#fbbf24', cursor: 'help' },
  url: { color: '#06b6d4' },
  '.language-css .token.string': { color: '#fb923c' },
  '.style .token.string': { color: '#fb923c' },
  atrule: { color: '#ec4899' },
  'attr-value': { color: '#4ade80' },
  keyword: { color: '#ec4899', fontWeight: '600' },
  function: { color: '#fbbf24' },
  'class-name': { color: '#06b6d4' },
  regex: { color: '#fb923c' },
  important: { color: '#ec4899', fontWeight: 'bold' },
  variable: { color: '#9333ea' },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
};

registerDiagrams(coreDiagramEntries);
registerDiagrams(connectionsDiagramEntries);
registerDiagrams(skillsDiagramEntries);
registerDiagrams(hooksDiagramEntries);
registerDiagrams(pluginsDiagramEntries);
registerDiagrams(trackingDiagramEntries);

export const ChatConversationDiagram = ({ content }: { content: string }) => {
  const lines = content.split('\n').filter(line => line.trim());
  const messages: { speaker: 'you' | 'claude'; text: string }[] = [];
  
  let currentSpeaker: 'you' | 'claude' | null = null;
  let currentText = '';
  
  lines.forEach(line => {
    const youMatch = line.match(/^You:\s*(.*)$/);
    const claudeMatch = line.match(/^Claude:\s*(.*)$/);
    
    if (youMatch) {
      if (currentSpeaker && currentText) {
        messages.push({ speaker: currentSpeaker, text: currentText.trim() });
      }
      currentSpeaker = 'you';
      currentText = youMatch[1];
    } else if (claudeMatch) {
      if (currentSpeaker && currentText) {
        messages.push({ speaker: currentSpeaker, text: currentText.trim() });
      }
      currentSpeaker = 'claude';
      currentText = claudeMatch[1];
    } else if (currentSpeaker) {
      currentText += ' ' + line.trim();
    }
  });
  
  if (currentSpeaker && currentText) {
    messages.push({ speaker: currentSpeaker, text: currentText.trim() });
  }
  
  return (
    <div className="my-8 border border-secondary/30 rounded-lg bg-black/40 p-5">
      <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
        <span>FIG // CONVERSATION</span>
        <span className="text-xs text-muted-foreground">CHAT</span>
      </div>
      <div className="space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex items-end gap-2 ${msg.speaker === 'you' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.speaker === 'you' 
                ? 'bg-primary/30 border border-primary/50' 
                : 'bg-secondary/30 border border-secondary/50'
            }`}>
              {msg.speaker === 'you' 
                ? <MessageSquare className="w-4 h-4 text-primary" />
                : <Bot className="w-4 h-4 text-secondary" />
              }
            </div>
            <div className={`relative max-w-[80%] px-4 py-3 ${
              msg.speaker === 'you' 
                ? 'bg-primary/20 border border-primary/40 rounded-2xl rounded-br-md' 
                : 'bg-secondary/20 border border-secondary/40 rounded-2xl rounded-bl-md'
            }`}>
              <div className={`text-xs font-mono mb-1.5 ${msg.speaker === 'you' ? 'text-primary text-right' : 'text-secondary text-left'}`}>
                {msg.speaker === 'you' ? 'YOU' : 'CLAUDE'}
              </div>
              <div className={`text-sm leading-relaxed text-gray-200 ${msg.speaker === 'you' ? 'text-right' : 'text-left'}`}>
                {msg.text.replace(/"/g, '')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CyberCodeBlock = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [copied, setCopied] = useState(false);
  const codeContent = typeof children === 'string' ? children : 
    React.Children.toArray(children).map(child => 
      typeof child === 'string' ? child : ''
    ).join('');

  const isPythonCode = className?.includes('python') || 
                       codeContent.includes('def ') || 
                       codeContent.includes('import ') ||
                       (codeContent.includes('# ') && (codeContent.includes('def ') || codeContent.includes('.py')));

  const isJavaScriptCode = className?.includes('javascript') || className?.includes('js') ||
                           codeContent.includes('const ') || codeContent.includes('let ') ||
                           codeContent.includes('function ') || codeContent.includes('=>') ||
                           (codeContent.includes('// ') && (codeContent.includes('"') || codeContent.includes("'")));

  const isJsonCode = className?.includes('json') || 
                     (codeContent.trim().startsWith('{') && codeContent.trim().endsWith('}') && codeContent.includes('"') && !codeContent.includes('//'));

  const isBashCode = className?.includes('bash') || className?.includes('shell') || className?.includes('sh') ||
                     codeContent.includes('npm ') || codeContent.includes('npx ') ||
                     codeContent.includes('yarn ') || codeContent.includes('git ') ||
                     codeContent.includes('claude ') || codeContent.includes('cd ') ||
                     (codeContent.includes('# ') && (codeContent.includes('./') || codeContent.includes('install'))) ||
                     codeContent.match(/^\/\w+/m);

  const isAsciiDiagram = codeContent.includes('╔') || 
                         codeContent.includes('┌') || 
                         codeContent.includes('│') ||
                         codeContent.includes('───') ||
                         codeContent.includes('═══') ||
                         codeContent.includes('↓') ||
                         codeContent.includes('▶');

  const copyCode = () => {
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isChatConversation = codeContent.includes('You:') && codeContent.includes('Claude:');
  if (isChatConversation) {
    return <ChatConversationDiagram content={codeContent} />;
  }

  // Check diagram registry first (before ASCII check) for registered diagram patterns
  const diagramEntry = findDiagram(codeContent);
  if (diagramEntry) {
    const DiagramComponent = diagramEntry.component;
    if (diagramEntry.passContent) {
      return <DiagramComponent content={codeContent} />;
    }
    return <DiagramComponent />;
  }

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

  const getLanguage = (): string => {
    if (className?.includes('python')) return 'python';
    if (className?.includes('javascript') || className?.includes('js')) return 'javascript';
    if (className?.includes('typescript') || className?.includes('ts')) return 'typescript';
    if (className?.includes('json')) return 'json';
    if (className?.includes('bash') || className?.includes('shell') || className?.includes('sh')) return 'bash';
    if (className?.includes('markdown') || className?.includes('md')) return 'markdown';
    if (className?.includes('css')) return 'css';
    if (className?.includes('html')) return 'markup';
    if (className?.includes('sql')) return 'sql';
    if (className?.includes('yaml') || className?.includes('yml')) return 'yaml';
    if (isPythonCode) return 'python';
    if (isJavaScriptCode) return 'javascript';
    if (isJsonCode) return 'json';
    if (isBashCode) return 'bash';
    return 'text';
  };

  const language = getLanguage();
  const languageLabel = language === 'python' ? 'PYTHON' : 
                        language === 'javascript' ? 'JAVASCRIPT' : 
                        language === 'typescript' ? 'TYPESCRIPT' :
                        language === 'json' ? 'JSON' : 
                        language === 'bash' ? 'TERMINAL' : 
                        language === 'markdown' ? 'MARKDOWN' :
                        language === 'css' ? 'CSS' :
                        language === 'markup' ? 'HTML' :
                        language === 'sql' ? 'SQL' :
                        language === 'yaml' ? 'YAML' :
                        'CODE_BLOCK';

  return (
    <div className="relative group my-8">
      <div className="absolute -top-3 left-4 bg-background px-2 text-xs font-mono text-primary border border-primary/30 rounded z-10">
        {languageLabel}
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
        <SyntaxHighlighter 
          language={language}
          style={cyberpunkTheme}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: 'transparent',
            fontSize: '0.875rem',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
            }
          }}
        >
          {codeContent}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
