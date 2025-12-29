import React, { useMemo, useState, useEffect, useRef } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeReact from 'rehype-react';
import * as prod from 'react/jsx-runtime';
import { Copy, Check, Brain, MessageSquare, Zap, Bot, RefreshCw, BookOpen, ArrowDown, ArrowRight, FileText, History, Lightbulb, Database, CheckCircle, XCircle, Folder, FolderOpen, File, Search, Turtle, Wrench, ClipboardList, TrendingUp, TrendingDown, Users, User, Home, Cloud, AlertTriangle } from 'lucide-react';
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

const MCPFlowDiagram = () => (
  <div className="my-8 border border-secondary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
      <span>FIG 4.0 // MCP_ARCHITECTURE</span>
      <span className="text-xs text-muted-foreground">FLOW</span>
    </div>
    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
      <div className="p-4 border border-primary/40 rounded-lg bg-primary/10 text-center min-w-[120px]">
        <Brain className="w-8 h-8 text-primary mx-auto mb-2" />
        <div className="font-mono text-xs text-primary">CLAUDE</div>
        <div className="text-xs text-gray-400">(Brain)</div>
      </div>
      <ArrowRight className="w-6 h-6 text-white/40 rotate-90 md:rotate-0" />
      <div className="p-4 border border-accent/40 rounded-lg bg-accent/10 text-center min-w-[120px]">
        <RefreshCw className="w-8 h-8 text-accent mx-auto mb-2" />
        <div className="font-mono text-xs text-accent">MCP SERVER</div>
        <div className="text-xs text-gray-400">(Translator)</div>
      </div>
      <ArrowRight className="w-6 h-6 text-white/40 rotate-90 md:rotate-0" />
      <div className="p-4 border border-secondary/40 rounded-lg bg-secondary/10 text-center min-w-[120px]">
        <MessageSquare className="w-8 h-8 text-secondary mx-auto mb-2" />
        <div className="font-mono text-xs text-secondary">SERVICE</div>
        <div className="text-xs text-gray-400">(Slack/etc)</div>
      </div>
    </div>
  </div>
);

const ConnectionTypesTable = () => (
  <div className="my-8 border border-secondary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
      <span>FIG 4.1 // CONNECTION_TYPES</span>
      <span className="text-xs text-muted-foreground">CAPABILITIES</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 border border-primary/30 rounded bg-primary/5">
        <div className="font-mono text-sm text-primary mb-2 flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Team Chat
        </div>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>Read channel history</li>
          <li>Summarize discussions</li>
          <li>Find specific messages</li>
        </ul>
      </div>
      <div className="p-4 border border-secondary/30 rounded bg-secondary/5">
        <div className="font-mono text-sm text-secondary mb-2 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Task Tracker
        </div>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>See sprint status</li>
          <li>Check who''s blocked</li>
          <li>Review issue details</li>
        </ul>
      </div>
      <div className="p-4 border border-accent/30 rounded bg-accent/5">
        <div className="font-mono text-sm text-accent mb-2 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Meeting Transcription
        </div>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>Import transcripts</li>
          <li>Extract action items</li>
          <li>Find past discussions</li>
        </ul>
      </div>
      <div className="p-4 border border-green-500/30 rounded bg-green-500/5">
        <div className="font-mono text-sm text-green-400 mb-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          Calendar
        </div>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>Check availability</li>
          <li>See upcoming meetings</li>
          <li>Context about your day</li>
        </ul>
      </div>
    </div>
  </div>
);

const DataFlowDiagram = () => (
  <div className="my-8 border border-accent/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-accent mb-4 flex justify-between">
      <span>FIG 4.3 // DATA_FLOW</span>
      <span className="text-xs text-muted-foreground">SECURITY</span>
    </div>
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
        <div className="p-4 border border-primary/40 rounded-lg bg-primary/10 text-center min-w-[120px]">
          <Database className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="font-mono text-xs text-primary">YOUR TOOLS</div>
        </div>
        <ArrowRight className="w-6 h-6 text-white/40 rotate-90 md:rotate-0" />
        <div className="p-4 border border-accent/40 rounded-lg bg-accent/10 text-center min-w-[120px] relative">
          <RefreshCw className="w-8 h-8 text-accent mx-auto mb-2" />
          <div className="font-mono text-xs text-accent">MCP SERVER</div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-green-400 font-mono whitespace-nowrap hidden md:block">
            ↓ Data stays local
          </div>
        </div>
        <ArrowRight className="w-6 h-6 text-white/40 rotate-90 md:rotate-0" />
        <div className="p-4 border border-secondary/40 rounded-lg bg-secondary/10 text-center min-w-[120px]">
          <Brain className="w-8 h-8 text-secondary mx-auto mb-2" />
          <div className="font-mono text-xs text-secondary">CLAUDE</div>
        </div>
      </div>
      <div className="text-xs text-green-400 font-mono mt-4 md:hidden">Data stays local (usually)</div>
    </div>
  </div>
);

const SkillPatternsDiagram = () => (
  <div className="my-8 border border-accent/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-accent mb-4 flex justify-between">
      <span>FIG 5.1 // SKILL_PATTERNS</span>
      <span className="text-xs text-muted-foreground">TYPES</span>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="p-3 border border-primary/40 rounded bg-primary/10 text-center">
        <Search className="w-6 h-6 text-primary mx-auto mb-2" />
        <div className="font-mono text-xs text-primary mb-2">GATHER</div>
        <div className="text-[10px] text-gray-400 space-y-1">
          <div>/catchup</div>
          <div>/status</div>
        </div>
      </div>
      <div className="p-3 border border-secondary/40 rounded bg-secondary/10 text-center">
        <FileText className="w-6 h-6 text-secondary mx-auto mb-2" />
        <div className="font-mono text-xs text-secondary mb-2">GENERATE</div>
        <div className="text-[10px] text-gray-400 space-y-1">
          <div>/standup</div>
          <div>/report</div>
        </div>
      </div>
      <div className="p-3 border border-accent/40 rounded bg-accent/10 text-center">
        <Lightbulb className="w-6 h-6 text-accent mx-auto mb-2" />
        <div className="font-mono text-xs text-accent mb-2">ANALYZE</div>
        <div className="text-[10px] text-gray-400 space-y-1">
          <div>/review</div>
          <div>/audit</div>
        </div>
      </div>
      <div className="p-3 border border-green-500/40 rounded bg-green-500/10 text-center">
        <Zap className="w-6 h-6 text-green-400 mx-auto mb-2" />
        <div className="font-mono text-xs text-green-400 mb-2">AUTOMATE</div>
        <div className="text-[10px] text-gray-400 space-y-1">
          <div>/release</div>
          <div>/deploy</div>
        </div>
      </div>
    </div>
  </div>
);

const WithoutVsWithSkillsDiagram = () => (
  <div className="my-8 border border-white/20 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-white/60 mb-4 flex justify-between">
      <span>FIG 5.2 // EFFICIENCY</span>
      <span className="text-xs text-muted-foreground">COMPARISON</span>
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="p-4 border border-red-500/30 rounded bg-red-500/5">
        <div className="font-mono text-sm text-red-400 mb-3 flex items-center gap-2">
          <XCircle className="w-4 h-4" />
          WITHOUT SKILLS
        </div>
        <div className="text-xs text-gray-400 italic leading-relaxed">
          "Can you summarize the week's activity including team chat, issues closed, and decisions made? Format it like last time..."
        </div>
        <div className="text-xs text-red-400 mt-3 font-mono">~30 seconds typing</div>
      </div>
      <div className="p-4 border border-green-500/30 rounded bg-green-500/5">
        <div className="font-mono text-sm text-green-400 mb-3 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          WITH SKILLS
        </div>
        <div className="text-lg font-mono text-green-400">/recap</div>
        <div className="text-xs text-green-400 mt-3 font-mono">~2 seconds</div>
      </div>
    </div>
  </div>
);

const SkillCandidatesDiagram = () => (
  <div className="my-8 border border-white/20 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-white/60 mb-4 flex justify-between">
      <span>FIG 5.3 // CANDIDATES</span>
      <span className="text-xs text-muted-foreground">SELECTION</span>
    </div>
    <div className="text-xs font-mono text-center text-white/40 mb-4">REPETITIVE + STRUCTURED = GOOD SKILL</div>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-2">
        {['Weekly reporting', 'Meeting preparation', 'Code review checklist', 'Status update generation'].map((item, i) => (
          <div key={i} className="flex items-center gap-2 p-2 border border-green-500/20 rounded bg-green-500/5">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">{item}</span>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {['One-off investigations', 'Creative writing'].map((item, i) => (
          <div key={i} className="flex items-center gap-2 p-2 border border-red-500/20 rounded bg-red-500/5">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-sm text-gray-300">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CapabilitiesTable = () => (
  <div className="my-8 border border-primary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-primary mb-4 flex justify-between">
      <span>FIG 4.2 // CAPABILITIES</span>
      <span className="text-xs text-muted-foreground">QUERIES</span>
    </div>
    <div className="space-y-3">
      <div className="flex items-center gap-4 p-3 border border-white/10 rounded bg-white/5">
        <div className="text-sm text-gray-300 flex-1">"What happened overnight?"</div>
        <div className="text-xs font-mono text-secondary">Team chat</div>
      </div>
      <div className="flex items-center gap-4 p-3 border border-white/10 rounded bg-white/5">
        <div className="text-sm text-gray-300 flex-1">"What''s blocking the sprint?"</div>
        <div className="text-xs font-mono text-accent">Task tracker</div>
      </div>
      <div className="flex items-center gap-4 p-3 border border-white/10 rounded bg-white/5">
        <div className="text-sm text-gray-300 flex-1">"Summarize yesterday''s standup"</div>
        <div className="text-xs font-mono text-primary">Chat + tasks</div>
      </div>
      <div className="flex items-center gap-4 p-3 border border-white/10 rounded bg-white/5">
        <div className="text-sm text-gray-300 flex-1">"What did we decide about X?"</div>
        <div className="text-xs font-mono text-green-400">Chat + decisions</div>
      </div>
    </div>
  </div>
);

const ComparisonTableDiagram = ({ leftTitle, rightTitle, leftItems, rightItems, leftColor = 'primary', rightColor = 'secondary' }: { 
  leftTitle: string; 
  rightTitle: string; 
  leftItems: string[]; 
  rightItems: string[];
  leftColor?: string;
  rightColor?: string;
}) => (
  <div className="my-8 border border-white/20 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-white/60 mb-4 flex justify-between">
      <span>FIG // COMPARISON</span>
      <span className="text-xs text-muted-foreground">MATRIX</span>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className={`p-4 border border-${leftColor}/40 rounded bg-${leftColor}/10`}>
        <div className={`font-mono text-sm text-${leftColor} mb-3 flex items-center gap-2`}>
          <CheckCircle className="w-4 h-4" />
          {leftTitle}
        </div>
        <ul className="space-y-2">
          {leftItems.map((item, i) => (
            <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
              <span className={`text-${leftColor} mt-1`}>+</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className={`p-4 border border-${rightColor}/40 rounded bg-${rightColor}/10`}>
        <div className={`font-mono text-sm text-${rightColor} mb-3 flex items-center gap-2`}>
          <XCircle className="w-4 h-4" />
          {rightTitle}
        </div>
        <ul className="space-y-2">
          {rightItems.map((item, i) => (
            <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
              <span className={`text-${rightColor} mt-1`}>-</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const DocumentVsJustDoItDiagram = () => (
  <div className="my-8 border border-white/20 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-white/60 mb-4 flex justify-between">
      <span>FIG 3.2 // DECISION_MATRIX</span>
      <span className="text-xs text-muted-foreground">WHEN</span>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 border border-green-500/40 rounded bg-green-500/10">
        <div className="font-mono text-sm text-green-400 mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          DOCUMENT
        </div>
        <ul className="space-y-2">
          <li className="text-sm text-gray-300 flex items-start gap-2">
            <span className="text-green-400 mt-0.5">+</span>
            Explained twice
          </li>
          <li className="text-sm text-gray-300 flex items-start gap-2">
            <span className="text-green-400 mt-0.5">+</span>
            Core to the project
          </li>
          <li className="text-sm text-gray-300 flex items-start gap-2">
            <span className="text-green-400 mt-0.5">+</span>
            Others will need this
          </li>
          <li className="text-sm text-gray-300 flex items-start gap-2">
            <span className="text-green-400 mt-0.5">+</span>
            Complex/easy to forget
          </li>
        </ul>
      </div>
      <div className="p-4 border border-orange-500/40 rounded bg-orange-500/10">
        <div className="font-mono text-sm text-orange-400 mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4" />
          JUST DO IT
        </div>
        <ul className="space-y-2">
          <li className="text-sm text-gray-300 flex items-start gap-2">
            <span className="text-orange-400 mt-0.5">-</span>
            One-off tasks
          </li>
          <li className="text-sm text-gray-300 flex items-start gap-2">
            <span className="text-orange-400 mt-0.5">-</span>
            Trivial fixes
          </li>
          <li className="text-sm text-gray-300 flex items-start gap-2">
            <span className="text-orange-400 mt-0.5">-</span>
            Personal preferences
          </li>
          <li className="text-sm text-gray-300 flex items-start gap-2">
            <span className="text-orange-400 mt-0.5">-</span>
            Obvious stuff
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const GoodVsSkipDiagram = () => (
  <div className="my-8 border border-white/20 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-white/60 mb-4 flex justify-between">
      <span>FIG 3.3 // SELECTION_GUIDE</span>
      <span className="text-xs text-muted-foreground">ENTRIES</span>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 border border-green-500/40 rounded bg-green-500/10">
        <div className="font-mono text-sm text-green-400 mb-3 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          GOOD FIRST ENTRIES
        </div>
        <ul className="space-y-2">
          <li className="text-sm text-gray-300 flex items-start gap-2">
            <span className="text-green-400 mt-0.5">+</span>
            Things you explain repeatedly
          </li>
          <li className="text-sm text-gray-300 flex items-start gap-2">
            <span className="text-green-400 mt-0.5">+</span>
            Project setup steps
          </li>
          <li className="text-sm text-gray-300 flex items-start gap-2">
            <span className="text-green-400 mt-0.5">+</span>
            Team conventions
          </li>
          <li className="text-sm text-gray-300 flex items-start gap-2">
            <span className="text-green-400 mt-0.5">+</span>
            Common commands
          </li>
        </ul>
      </div>
      <div className="p-4 border border-red-500/40 rounded bg-red-500/10">
        <div className="font-mono text-sm text-red-400 mb-3 flex items-center gap-2">
          <XCircle className="w-4 h-4" />
          SKIP FOR NOW
        </div>
        <ul className="space-y-2">
          <li className="text-sm text-gray-300 flex items-start gap-2">
            <span className="text-red-400 mt-0.5">-</span>
            Complex architecture docs
          </li>
          <li className="text-sm text-gray-300 flex items-start gap-2">
            <span className="text-red-400 mt-0.5">-</span>
            Comprehensive API reference
          </li>
          <li className="text-sm text-gray-300 flex items-start gap-2">
            <span className="text-red-400 mt-0.5">-</span>
            Everything you know
          </li>
          <li className="text-sm text-gray-300 flex items-start gap-2">
            <span className="text-red-400 mt-0.5">-</span>
            Your life story
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const ChatConversationDiagram = ({ content }: { content: string }) => {
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
                         codeContent.includes('═══') ||
                         codeContent.includes('↓') ||
                         codeContent.includes('▶');

  const copyCode = () => {
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Check for chat conversations first (they may not have ASCII diagram chars)
  const isChatConversation = codeContent.includes('You:') && codeContent.includes('Claude:');
  if (isChatConversation) {
    return <ChatConversationDiagram content={codeContent} />;
  }

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
    const isDocumentVsJustDoIt = codeContent.includes('DOCUMENT') && codeContent.includes('JUST DO IT') && codeContent.includes('Explained twice');
    const isGoodVsSkip = codeContent.includes('GOOD FIRST ENTRIES') && codeContent.includes('SKIP FOR NOW');
    const isMCPFlowDiagram = codeContent.includes('Claude') && codeContent.includes('MCP Server') && codeContent.includes('Service');
    const isConnectionTypesTable = codeContent.includes('CONNECTION TYPE') && codeContent.includes('WHAT CLAUDE CAN DO') && codeContent.includes('Team Chat');
    const isCapabilitiesTable = codeContent.includes('QUESTION') && codeContent.includes('SOURCE') && codeContent.includes('What happened overnight');
    const isDataFlowDiagram = codeContent.includes('YOUR TOOLS') && codeContent.includes('MCP SERVER') && codeContent.includes('CLAUDE') && codeContent.includes('Data stays local');
    const isSkillPatternsDiagram = codeContent.includes('SKILL PATTERNS') && codeContent.includes('GATHER') && codeContent.includes('GENERATE') && codeContent.includes('ANALYZE');
    const isWithoutVsWithSkills = codeContent.includes('WITHOUT SKILLS') && codeContent.includes('WITH SKILLS') && codeContent.includes('/recap');
    const isSkillCandidates = codeContent.includes('REPETITIVE + STRUCTURED') && codeContent.includes('Weekly reporting');
    
    if (isSkillPatternsDiagram) {
      return <SkillPatternsDiagram />;
    }
    
    if (isWithoutVsWithSkills) {
      return <WithoutVsWithSkillsDiagram />;
    }
    
    if (isSkillCandidates) {
      return <SkillCandidatesDiagram />;
    }
    
    if (isDataFlowDiagram) {
      return <DataFlowDiagram />;
    }
    
    if (isMCPFlowDiagram) {
      return <MCPFlowDiagram />;
    }
    
    if (isConnectionTypesTable) {
      return <ConnectionTypesTable />;
    }
    
    if (isCapabilitiesTable) {
      return <CapabilitiesTable />;
    }
    
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
    
    if (isDocumentVsJustDoIt) {
      return <DocumentVsJustDoItDiagram />;
    }
    
    if (isGoodVsSkip) {
      return <GoodVsSkipDiagram />;
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

const CyberH1 = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-4xl font-display font-bold text-white mt-8 mb-6 tracking-wide">
    {children}
  </h1>
);

const CyberH2 = ({ children }: { children: React.ReactNode }) => {
  const text = extractText(children);
  const id = generateSlug(text);
  return (
    <h2 id={id} className="text-3xl font-display font-bold text-white mt-12 mb-6 tracking-wide border-b border-white/10 pb-4 scroll-mt-24">
      {children}
    </h2>
  );
};

const CyberH3 = ({ children }: { children: React.ReactNode }) => {
  const text = extractText(children);
  const id = generateSlug(text);
  return (
    <h3 id={id} className="text-2xl font-display font-semibold text-white mt-8 mb-4 scroll-mt-24">
      {children}
    </h3>
  );
};

const CyberParagraph = ({ children }: { children: React.ReactNode }) => {
  // Filter out reading time/audience metadata lines
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
