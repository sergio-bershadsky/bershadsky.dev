import React, { useMemo, useState, useEffect, useRef } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeReact from 'rehype-react';
import * as prod from 'react/jsx-runtime';
import { Copy, Check, Brain, MessageSquare, Zap, Bot, RefreshCw, BookOpen, ArrowDown, ArrowRight, FileText, History, Lightbulb, Database, CheckCircle, XCircle, Folder, FolderOpen, File } from 'lucide-react';
import { NeonCard } from './CyberpunkUI';

const DiagramBox = ({ 
  children, 
  icon: Icon, 
  variant = 'primary',
  className = ''
}: { 
  children: React.ReactNode; 
  icon?: React.ElementType;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}) => {
  const colors = {
    primary: 'border-primary bg-primary/10 text-primary',
    secondary: 'border-secondary bg-secondary/10 text-secondary',
    accent: 'border-accent bg-accent/10 text-accent'
  };
  
  return (
    <div className={`flex flex-col items-center justify-center p-4 border rounded-lg ${colors[variant]} ${className}`}>
      {Icon && <Icon className="w-6 h-6 mb-2" />}
      <span className="font-mono text-sm text-center">{children}</span>
    </div>
  );
};

const SecondBrainArchitectureDiagram = () => (
  <div className="my-8 border border-secondary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
      <span>FIG 1.0 // SECOND_BRAIN_ARCHITECTURE</span>
      <span className="text-xs text-muted-foreground animate-pulse">LIVE</span>
    </div>
    <div className="text-center mb-4">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full border border-white/20">
        <Brain className="w-4 h-4 text-primary" />
        <span className="font-display font-bold text-white text-sm">YOUR SECOND BRAIN</span>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-2 mb-4">
      <div className="p-2 border border-primary/40 rounded bg-primary/10 text-center">
        <BookOpen className="w-4 h-4 mx-auto mb-1 text-primary" />
        <div className="font-mono text-xs text-primary">KNOWLEDGE</div>
      </div>
      <div className="p-2 border border-secondary/40 rounded bg-secondary/10 text-center">
        <MessageSquare className="w-4 h-4 mx-auto mb-1 text-secondary" />
        <div className="font-mono text-xs text-secondary">DISCUSSIONS</div>
      </div>
      <div className="p-2 border border-accent/40 rounded bg-accent/10 text-center">
        <Zap className="w-4 h-4 mx-auto mb-1 text-accent" />
        <div className="font-mono text-xs text-accent">DECISIONS</div>
      </div>
    </div>
    <div className="flex justify-center mb-3">
      <ArrowDown className="w-4 h-4 text-primary" />
    </div>
    <div className="p-4 border border-primary/40 rounded-lg bg-primary/5 text-center mb-3">
      <Bot className="w-6 h-6 mx-auto mb-2 text-primary" />
      <div className="font-mono text-sm text-white">CLAUDE WITH MEMORY</div>
      <div className="text-xs text-gray-400 mt-1">"What did we decide?" → Returns full context</div>
    </div>
    <div className="flex justify-center mb-3">
      <ArrowDown className="w-4 h-4 text-secondary" />
    </div>
    <div className="p-3 border border-secondary/40 rounded bg-secondary/10 text-center">
      <RefreshCw className="w-4 h-4 mx-auto mb-1 text-secondary" />
      <div className="font-mono text-xs text-white">AUTOMATED WORKFLOWS</div>
    </div>
  </div>
);

const AIComparisonDiagram = () => (
  <div className="my-8 border border-primary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-primary mb-4 flex justify-between">
      <span>FIG 0.5 // AI_COMPARISON</span>
      <span className="text-xs text-muted-foreground">ANALYSIS</span>
    </div>
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex-1 space-y-2">
        <div className="text-center p-2 bg-red-500/10 border border-red-500/30 rounded">
          <span className="font-mono text-red-400 text-xs">TRADITIONAL AI</span>
        </div>
        {['Session 1', 'Session 2', 'Session 3'].map((session, i) => (
          <div key={i} className="p-2 border border-white/10 rounded bg-white/5">
            <div className="font-mono text-xs text-gray-500">{session}:</div>
            <div className="text-xs text-gray-400">"What's our API design?"</div>
          </div>
        ))}
        <div className="text-center text-xs text-red-400 font-mono py-1">
          (explaining from zero every time)
        </div>
      </div>
      <div className="flex-1 space-y-2">
        <div className="text-center p-2 bg-green-500/10 border border-green-500/30 rounded">
          <span className="font-mono text-green-400 text-xs">SECOND BRAIN AI</span>
        </div>
        <div className="p-2 border border-white/10 rounded bg-white/5">
          <div className="font-mono text-xs text-gray-500">Session 1:</div>
          <div className="text-xs text-gray-400">"What's our API design?"</div>
        </div>
        <div className="p-2 border border-green-500/30 rounded bg-green-500/5">
          <div className="font-mono text-xs text-gray-500">Session 2:</div>
          <div className="text-xs text-green-400">"Remember the API design?"</div>
          <div className="text-xs text-secondary mt-1">→ "Here's what changed..."</div>
        </div>
        <div className="text-center text-xs text-green-400 font-mono py-1">
          (builds on previous context)
        </div>
      </div>
    </div>
  </div>
);

const ThreePillarsDiagram = () => (
  <div className="my-8 border border-secondary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
      <span>FIG 2.0 // THREE_PILLARS</span>
      <span className="text-xs text-muted-foreground">ARCHITECTURE</span>
    </div>
    <div className="text-center mb-4">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full border border-white/20">
        <Brain className="w-5 h-5 text-primary" />
        <span className="font-display font-bold text-white">YOUR SECOND BRAIN</span>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="p-3 border border-primary/40 rounded bg-primary/5">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4 text-primary" />
          <span className="font-mono text-xs text-primary">CURRENT KNOWLEDGE</span>
        </div>
        <div className="text-xs text-gray-400 mb-1">"How we do things now"</div>
        <ul className="text-xs text-gray-300 space-y-0.5">
          <li>• Guides</li>
          <li>• How-tos</li>
          <li>• References</li>
        </ul>
      </div>
      <div className="p-3 border border-secondary/40 rounded bg-secondary/5">
        <div className="flex items-center gap-2 mb-2">
          <History className="w-4 h-4 text-secondary" />
          <span className="font-mono text-xs text-secondary">HISTORICAL RECORD</span>
        </div>
        <div className="text-xs text-gray-400 mb-1">"What we discussed"</div>
        <ul className="text-xs text-gray-300 space-y-0.5">
          <li>• Discussions</li>
          <li>• Meetings</li>
          <li>• Context</li>
        </ul>
      </div>
      <div className="p-3 border border-accent/40 rounded bg-accent/5">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-accent" />
          <span className="font-mono text-xs text-accent">DECISIONS ARCHIVE</span>
        </div>
        <div className="text-xs text-gray-400 mb-1">"Why we chose"</div>
        <ul className="text-xs text-gray-300 space-y-0.5">
          <li>• Choices</li>
          <li>• Rejected options</li>
          <li>• Rationale</li>
        </ul>
      </div>
    </div>
  </div>
);

const DecisionAnatomyDiagram = () => (
  <div className="my-8 border border-accent/30 rounded-lg bg-black/40 overflow-hidden">
    <div className="text-sm font-mono text-accent p-4 flex justify-between border-b border-accent/20">
      <span>FIG 2.1 // DECISION_RECORD</span>
      <span className="text-xs text-muted-foreground">TEMPLATE</span>
    </div>
    <div className="bg-accent/10 p-3 border-b border-accent/20 flex items-center gap-2">
      <Database className="w-4 h-4 text-accent" />
      <span className="font-mono text-sm text-white">DECISION: Which Database to Use</span>
      <span className="ml-auto text-xs font-mono text-green-400 flex items-center gap-1">
        <CheckCircle className="w-3 h-3" /> Implemented
      </span>
    </div>
    <div className="p-4 space-y-3">
      <div>
        <div className="text-xs font-mono text-gray-500 mb-1">CONTEXT:</div>
        <div className="text-sm text-gray-300">We needed a database that handles high read volume with low latency</div>
      </div>
      <div>
        <div className="text-xs font-mono text-gray-500 mb-2">OPTIONS CONSIDERED:</div>
        <div className="space-y-1.5">
          <div className="flex items-start gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
            <span className="text-green-400">PostgreSQL (chosen)</span>
            <span className="text-gray-400">— fits our scale</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
            <span className="text-red-400">MongoDB (rejected)</span>
            <span className="text-gray-400">— schema flexibility not needed</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
            <span className="text-red-400">Build custom (rejected)</span>
            <span className="text-gray-400">— would take 6 months</span>
          </div>
        </div>
      </div>
      <div>
        <div className="text-xs font-mono text-gray-500 mb-1">CONSEQUENCES:</div>
        <div className="text-sm text-gray-300">Need to learn advanced indexing, can't easily do document-style data</div>
      </div>
    </div>
  </div>
);

const KnowledgeFlowDiagram = () => (
  <div className="my-8 border border-primary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-primary mb-4 flex justify-between">
      <span>FIG 2.2 // KNOWLEDGE_FLOW</span>
      <span className="text-xs text-muted-foreground">PROCESS</span>
    </div>
    <div className="flex flex-col md:flex-row items-center justify-center gap-3">
      <div className="p-3 border border-secondary/40 rounded bg-secondary/10 text-center min-w-[120px]">
        <History className="w-5 h-5 mx-auto mb-1 text-secondary" />
        <div className="font-mono text-xs text-secondary">DISCUSSION</div>
        <div className="text-xs text-gray-400 mt-1">"Use caching layer"</div>
      </div>
      <ArrowRight className="w-5 h-5 text-white/40 rotate-90 md:rotate-0" />
      <div className="p-3 border border-accent/40 rounded bg-accent/10 text-center min-w-[120px]">
        <Lightbulb className="w-5 h-5 mx-auto mb-1 text-accent" />
        <div className="font-mono text-xs text-accent">DECISION</div>
        <div className="text-xs text-gray-400 mt-1">"Use Redis"</div>
      </div>
      <ArrowRight className="w-5 h-5 text-white/40 rotate-90 md:rotate-0" />
      <div className="p-3 border border-primary/40 rounded bg-primary/10 text-center min-w-[120px]">
        <BookOpen className="w-5 h-5 mx-auto mb-1 text-primary" />
        <div className="font-mono text-xs text-primary">KNOWLEDGE</div>
        <div className="text-xs text-gray-400 mt-1">"Here's how"</div>
      </div>
    </div>
  </div>
);

const PillarCharacteristicsDiagram = ({ title, items, examples, variant }: { 
  title: string; 
  items: string[]; 
  examples: string[];
  variant: 'primary' | 'secondary' | 'accent';
}) => {
  const colors = {
    primary: { border: 'border-primary/30', text: 'text-primary', icon: BookOpen },
    secondary: { border: 'border-secondary/30', text: 'text-secondary', icon: History },
    accent: { border: 'border-accent/30', text: 'text-accent', icon: Lightbulb },
  };
  const style = colors[variant];
  const Icon = style.icon;
  
  return (
    <div className={`my-8 border ${style.border} rounded-lg bg-black/40 p-5`}>
      <div className={`text-sm font-mono ${style.text} mb-3 flex items-center gap-2`}>
        <Icon className={`w-4 h-4 ${style.text}`} />
        <span>{title}</span>
        <span className="text-xs text-muted-foreground ml-auto">CHARACTERISTICS</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-xs font-mono text-gray-500 mb-1">TRAITS:</div>
          <ul className="space-y-1">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <span className={style.text}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs font-mono text-gray-500 mb-1">EXAMPLES:</div>
          <ul className="space-y-1">
            {examples.map((ex, i) => (
              <li key={i} className="text-sm text-gray-400">- {ex}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const CurrentKnowledgeDiagram = () => (
  <PillarCharacteristicsDiagram
    title="CURRENT KNOWLEDGE"
    variant="primary"
    items={['Changes frequently', 'Reflects latest understanding', 'Answers "how do I...?"', 'Written for reuse']}
    examples={['Setup guides', 'Best practices', 'Reference materials', 'Standard procedures']}
  />
);

const HistoricalRecordDiagram = () => (
  <PillarCharacteristicsDiagram
    title="HISTORICAL RECORD"
    variant="secondary"
    items={['Rarely changes after creation', 'Captures moment in time', 'Answers "what did we discuss?"', 'Written for context']}
    examples={['Team discussions', 'Meeting notes', 'Planning sessions', 'Troubleshooting sessions']}
  />
);

const DecisionLifecycleDiagram = () => (
  <div className="my-8 border border-accent/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-accent mb-4 flex justify-between">
      <span>LIFECYCLE // DECISION_STATES</span>
      <span className="text-xs text-muted-foreground">FLOW</span>
    </div>
    <div className="flex flex-col md:flex-row items-center justify-center gap-2">
      <div className="px-3 py-1.5 border border-yellow-500/40 bg-yellow-500/10 rounded text-yellow-400 font-mono text-sm">
        Proposed
      </div>
      <ArrowRight className="w-4 h-4 text-white/40 rotate-90 md:rotate-0" />
      <div className="px-3 py-1.5 border border-blue-500/40 bg-blue-500/10 rounded text-blue-400 font-mono text-sm">
        Accepted
      </div>
      <ArrowRight className="w-4 h-4 text-white/40 rotate-90 md:rotate-0" />
      <div className="px-3 py-1.5 border border-green-500/40 bg-green-500/10 rounded text-green-400 font-mono text-sm">
        Implemented
      </div>
      <span className="text-gray-500 mx-2 hidden md:inline">|</span>
      <div className="flex items-center gap-1 mt-2 md:mt-0">
        <ArrowDown className="w-3 h-3 text-white/40 md:hidden" />
        <div className="px-2 py-1 border border-red-500/40 bg-red-500/10 rounded text-red-400 font-mono text-xs">
          Rejected
        </div>
      </div>
    </div>
  </div>
);

const SessionFlowDiagram = () => (
  <div className="my-8 border border-primary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-primary mb-4 flex justify-between">
      <span>FIG 3.0 // SESSION_FLOW</span>
      <span className="text-xs text-muted-foreground">MEMORY</span>
    </div>
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 p-4 border border-secondary/40 rounded bg-secondary/5">
        <div className="font-mono text-xs text-secondary mb-3">SESSION 1</div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-gray-300">Create doc</span>
          </div>
          <ArrowDown className="w-4 h-4 text-white/40 mx-auto" />
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-secondary" />
            <span className="text-gray-300">Save to knowledge base</span>
          </div>
          <ArrowDown className="w-4 h-4 text-white/40 mx-auto" />
          <div className="text-center text-green-400 text-xs font-mono">Done</div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <ArrowRight className="w-6 h-6 text-primary rotate-90 md:rotate-0" />
      </div>
      <div className="flex-1 p-4 border border-green-500/40 rounded bg-green-500/5">
        <div className="font-mono text-xs text-green-400 mb-3">SESSION 2</div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-secondary" />
            <span className="text-gray-300">Ask question</span>
          </div>
          <ArrowDown className="w-4 h-4 text-white/40 mx-auto" />
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-gray-300">Claude reads knowledge base</span>
          </div>
          <ArrowDown className="w-4 h-4 text-white/40 mx-auto" />
          <div className="text-center text-green-400 text-xs font-mono">Answers with YOUR context</div>
        </div>
      </div>
    </div>
  </div>
);

const ProcessStepsDiagram = () => (
  <div className="my-8 border border-secondary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
      <span>FIG 3.1 // PROCESS</span>
      <span className="text-xs text-muted-foreground">WORKFLOW</span>
    </div>
    <div className="flex flex-col md:flex-row items-center justify-center gap-2">
      <div className="p-3 border border-primary/40 rounded bg-primary/10 text-center min-w-[100px]">
        <div className="font-mono text-xs text-primary">Step 1</div>
        <div className="text-xs text-gray-400">Tell Claude</div>
      </div>
      <ArrowRight className="w-4 h-4 text-white/40 rotate-90 md:rotate-0" />
      <div className="p-3 border border-secondary/40 rounded bg-secondary/10 text-center min-w-[100px]">
        <div className="font-mono text-xs text-secondary">Step 2</div>
        <div className="text-xs text-gray-400">Claude organizes</div>
      </div>
      <ArrowRight className="w-4 h-4 text-white/40 rotate-90 md:rotate-0" />
      <div className="p-3 border border-accent/40 rounded bg-accent/10 text-center min-w-[100px]">
        <div className="font-mono text-xs text-accent">Step 3</div>
        <div className="text-xs text-gray-400">Review & refine</div>
      </div>
      <ArrowRight className="w-4 h-4 text-white/40 rotate-90 md:rotate-0" />
      <div className="p-3 border border-green-500/40 rounded bg-green-500/10 text-center min-w-[100px]">
        <div className="font-mono text-xs text-green-400">Step 4</div>
        <div className="text-xs text-gray-400">Save</div>
      </div>
    </div>
  </div>
);

const FolderStructureDiagram = () => {
  const folders = [
    { name: 'docs/', icon: FolderOpen, color: 'text-primary', children: [
      { name: 'guides/', icon: Folder, color: 'text-cyan-400', comment: 'Current knowledge', children: [
        { name: 'getting-started.md', icon: File, color: 'text-gray-400' }
      ]},
      { name: 'discussions/', icon: Folder, color: 'text-secondary', comment: 'Historical record', children: [
        { name: 'TEMPLATE.md', icon: File, color: 'text-gray-400' }
      ]},
      { name: 'decisions/', icon: Folder, color: 'text-accent', comment: 'Decision archive', children: [
        { name: 'TEMPLATE.md', icon: File, color: 'text-gray-400' }
      ]}
    ]},
    { name: 'package.json', icon: File, color: 'text-yellow-400' }
  ];

  const renderNode = (node: any, depth: number = 0) => {
    const Icon = node.icon;
    const isFolder = node.children;
    
    return (
      <div key={node.name} className={depth > 0 ? 'ml-5' : ''}>
        <div className="flex items-center gap-2 py-0.5">
          <Icon className={`w-4 h-4 ${node.color} flex-shrink-0`} />
          <span className={`font-mono text-sm ${isFolder ? 'text-white' : 'text-gray-400'}`}>
            {node.name}
          </span>
          {node.comment && (
            <span className="text-xs text-gray-500 hidden sm:inline">// {node.comment}</span>
          )}
        </div>
        {node.children && (
          <div className="border-l border-white/10 ml-2">
            {node.children.map((child: any) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="my-8 border border-secondary/30 rounded-lg bg-black/40 p-5">
      <div className="text-sm font-mono text-secondary mb-3 flex items-center gap-2">
        <FolderOpen className="w-4 h-4 text-primary" />
        <span>my-second-brain/</span>
        <span className="text-xs text-muted-foreground ml-auto">STRUCTURE</span>
      </div>
      <div className="space-y-0.5">
        {folders.map(folder => renderNode(folder))}
      </div>
    </div>
  );
};

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
    const isComparisonDiagram = codeContent.includes('TRADITIONAL AI') && (codeContent.includes('Session 1:') || codeContent.includes('Session 2:'));
    const isSecondBrainDiagram = codeContent.includes('AUTOMATED WORKFLOWS') || codeContent.includes('CLAUDE WITH MEMORY');
    const isThreePillarsDiagram = codeContent.includes('CURRENT') && codeContent.includes('HISTORICAL') && codeContent.includes('DECISIONS');
    const isDecisionDiagram = codeContent.includes('DECISION:') && codeContent.includes('OPTIONS CONSIDERED');
    const isFlowDiagram = codeContent.includes('DISCUSSION') && codeContent.includes('▶') && codeContent.includes('KNOWLEDGE');
    const isCurrentKnowledgeDiagram = codeContent.includes('CURRENT KNOWLEDGE') && codeContent.includes('Changes frequently');
    const isHistoricalRecordDiagram = codeContent.includes('HISTORICAL RECORD') && codeContent.includes('Rarely changes');
    const isDecisionLifecycleDiagram = codeContent.includes('Proposed') && codeContent.includes('Accepted') && codeContent.includes('Implemented');
    const isFolderStructureDiagram = codeContent.includes('my-second-brain/') && codeContent.includes('├──') && codeContent.includes('docs/');
    const isSessionFlowDiagram = codeContent.includes('SESSION 1') && codeContent.includes('SESSION 2') && codeContent.includes('knowledge base');
    const isProcessStepsDiagram = codeContent.includes('Step 1') && codeContent.includes('Step 2') && codeContent.includes('Step 3') && codeContent.includes('Step 4') && codeContent.includes('Claude');
    
    if (isComparisonDiagram) {
      return <AIComparisonDiagram />;
    }
    
    if (isDecisionDiagram) {
      return <DecisionAnatomyDiagram />;
    }
    
    if (isFlowDiagram) {
      return <KnowledgeFlowDiagram />;
    }
    
    if (isCurrentKnowledgeDiagram) {
      return <CurrentKnowledgeDiagram />;
    }
    
    if (isHistoricalRecordDiagram) {
      return <HistoricalRecordDiagram />;
    }
    
    if (isDecisionLifecycleDiagram) {
      return <DecisionLifecycleDiagram />;
    }
    
    if (isFolderStructureDiagram) {
      return <FolderStructureDiagram />;
    }
    
    if (isSessionFlowDiagram) {
      return <SessionFlowDiagram />;
    }
    
    if (isProcessStepsDiagram) {
      return <ProcessStepsDiagram />;
    }
    
    if (isThreePillarsDiagram) {
      return <ThreePillarsDiagram />;
    }
    
    if (isSecondBrainDiagram) {
      return <SecondBrainArchitectureDiagram />;
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
