import React, { useState } from 'react';
import { Copy, Check, MessageSquare, Bot } from 'lucide-react';
import { NeonCard } from '../CyberpunkUI';
import { findDiagram } from './diagramRegistry';

import { coreDiagramEntries } from './diagrams/core';
import { connectionsDiagramEntries } from './diagrams/connections';
import { skillsDiagramEntries } from './diagrams/skills';
import { hooksDiagramEntries } from './diagrams/hooks';
import { pluginsDiagramEntries } from './diagrams/plugins';
import { registerDiagrams } from './diagramRegistry';

registerDiagrams(coreDiagramEntries);
registerDiagrams(connectionsDiagramEntries);
registerDiagrams(skillsDiagramEntries);
registerDiagrams(hooksDiagramEntries);
registerDiagrams(pluginsDiagramEntries);

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

export const highlightJson = (code: string): React.ReactNode[] => {
  const lines = code.split('\n');
  return lines.map((line, lineIndex) => {
    const tokens: React.ReactNode[] = [];
    let remaining = line;
    let tokenKey = 0;
    
    while (remaining.length > 0) {
      const keyMatch = remaining.match(/^("(?:[^"\\]|\\.)*")\s*:/);
      if (keyMatch) {
        tokens.push(<span key={tokenKey++} className="text-secondary">{keyMatch[1]}</span>);
        remaining = remaining.slice(keyMatch[1].length);
        continue;
      }
      
      const stringMatch = remaining.match(/^("(?:[^"\\]|\\.)*")/);
      if (stringMatch) {
        tokens.push(<span key={tokenKey++} className="text-green-400">{stringMatch[1]}</span>);
        remaining = remaining.slice(stringMatch[1].length);
        continue;
      }
      
      const numMatch = remaining.match(/^(-?\d+\.?\d*)/);
      if (numMatch) {
        tokens.push(<span key={tokenKey++} className="text-orange-400">{numMatch[1]}</span>);
        remaining = remaining.slice(numMatch[1].length);
        continue;
      }
      
      const boolNullMatch = remaining.match(/^(true|false|null)\b/);
      if (boolNullMatch) {
        tokens.push(<span key={tokenKey++} className="text-primary font-semibold">{boolNullMatch[1]}</span>);
        remaining = remaining.slice(boolNullMatch[1].length);
        continue;
      }
      
      const punctMatch = remaining.match(/^([{}\[\]:,])/);
      if (punctMatch) {
        tokens.push(<span key={tokenKey++} className="text-gray-400">{punctMatch[1]}</span>);
        remaining = remaining.slice(punctMatch[1].length);
        continue;
      }
      
      tokens.push(<span key={tokenKey++} className="text-gray-300">{remaining[0]}</span>);
      remaining = remaining.slice(1);
    }
    
    return (
      <React.Fragment key={lineIndex}>
        {tokens}
        {lineIndex < lines.length - 1 && '\n'}
      </React.Fragment>
    );
  });
};

export const highlightPython = (code: string): React.ReactNode[] => {
  const keywords = ['def', 'class', 'if', 'else', 'elif', 'for', 'while', 'return', 'import', 'from', 'as', 'try', 'except', 'finally', 'with', 'lambda', 'and', 'or', 'not', 'in', 'is', 'True', 'False', 'None', 'raise', 'pass', 'break', 'continue', 'global', 'async', 'await', 'yield'];
  const builtins = ['print', 'len', 'range', 'str', 'int', 'float', 'list', 'dict', 'set', 'tuple', 'open', 'append', 'extend', 'format'];
  
  const lines = code.split('\n');
  return lines.map((line, lineIndex) => {
    const tokens: React.ReactNode[] = [];
    let remaining = line;
    let tokenKey = 0;
    
    while (remaining.length > 0) {
      if (remaining.startsWith('#')) {
        tokens.push(<span key={tokenKey++} className="text-gray-500 italic">{remaining}</span>);
        break;
      }
      
      const tripleMatch = remaining.match(/^("""[\s\S]*?"""|'''[\s\S]*?''')/);
      if (tripleMatch) {
        tokens.push(<span key={tokenKey++} className="text-green-400">{tripleMatch[1]}</span>);
        remaining = remaining.slice(tripleMatch[1].length);
        continue;
      }
      
      const stringMatch = remaining.match(/^(f?["'](?:[^"'\\]|\\.)*["'])/);
      if (stringMatch) {
        tokens.push(<span key={tokenKey++} className="text-green-400">{stringMatch[1]}</span>);
        remaining = remaining.slice(stringMatch[1].length);
        continue;
      }
      
      const numMatch = remaining.match(/^(\d+\.?\d*)/);
      if (numMatch) {
        tokens.push(<span key={tokenKey++} className="text-orange-400">{numMatch[1]}</span>);
        remaining = remaining.slice(numMatch[1].length);
        continue;
      }
      
      const decoratorMatch = remaining.match(/^(@\w+)/);
      if (decoratorMatch) {
        tokens.push(<span key={tokenKey++} className="text-yellow-400">{decoratorMatch[1]}</span>);
        remaining = remaining.slice(decoratorMatch[1].length);
        continue;
      }
      
      const wordMatch = remaining.match(/^(\w+)/);
      if (wordMatch) {
        const word = wordMatch[1];
        if (keywords.includes(word)) {
          tokens.push(<span key={tokenKey++} className="text-primary font-semibold">{word}</span>);
        } else if (builtins.includes(word)) {
          tokens.push(<span key={tokenKey++} className="text-secondary">{word}</span>);
        } else if (remaining.slice(word.length).match(/^\s*\(/)) {
          tokens.push(<span key={tokenKey++} className="text-yellow-300">{word}</span>);
        } else {
          tokens.push(<span key={tokenKey++} className="text-gray-300">{word}</span>);
        }
        remaining = remaining.slice(word.length);
        continue;
      }
      
      const opMatch = remaining.match(/^([+\-*/%=<>!&|^~:,.\[\](){}]+)/);
      if (opMatch) {
        tokens.push(<span key={tokenKey++} className="text-gray-400">{opMatch[1]}</span>);
        remaining = remaining.slice(opMatch[1].length);
        continue;
      }
      
      tokens.push(<span key={tokenKey++} className="text-gray-300">{remaining[0]}</span>);
      remaining = remaining.slice(1);
    }
    
    return (
      <React.Fragment key={lineIndex}>
        {tokens}
        {lineIndex < lines.length - 1 && '\n'}
      </React.Fragment>
    );
  });
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

  const isJsonCode = className?.includes('json') || 
                     (codeContent.trim().startsWith('{') && codeContent.trim().endsWith('}') && codeContent.includes('"'));

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

  if (isAsciiDiagram) {
    const diagramEntry = findDiagram(codeContent);
    if (diagramEntry) {
      const DiagramComponent = diagramEntry.component;
      return <DiagramComponent />;
    }

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

  const languageLabel = isPythonCode ? 'PYTHON' : isJsonCode ? 'JSON' : 'CODE_BLOCK';

  const getHighlightedCode = () => {
    if (isPythonCode) return highlightPython(codeContent);
    if (isJsonCode) return highlightJson(codeContent);
    return <span className="text-gray-300">{codeContent}</span>;
  };

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
        <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed">
          <code>{getHighlightedCode()}</code>
        </pre>
      </div>
    </div>
  );
};
