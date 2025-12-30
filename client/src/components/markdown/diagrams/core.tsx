import React from 'react';
import { Brain, MessageSquare, Zap, Bot, RefreshCw, BookOpen, ArrowDown, ArrowRight, FileText, History, Lightbulb, Database, CheckCircle, XCircle, Folder, FolderOpen, File } from 'lucide-react';
import { DiagramEntry } from '../diagramRegistry';

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
    <div className={`my-8 notranslate border ${style.border} rounded-lg bg-black/40 p-5`} translate="no">
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

export const SecondBrainArchitectureDiagram = () => (
  <div className="my-8 notranslate border border-secondary/30 rounded-lg bg-black/40 p-5" translate="no">
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

export const AIComparisonDiagram = () => (
  <div className="my-8 notranslate border border-primary/30 rounded-lg bg-black/40 p-5" translate="no">
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

export const ThreePillarsDiagram = () => (
  <div className="my-8 notranslate border border-secondary/30 rounded-lg bg-black/40 p-5" translate="no">
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

export const DecisionAnatomyDiagram = () => (
  <div className="my-8 notranslate border border-accent/30 rounded-lg bg-black/40 overflow-hidden" translate="no">
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

export const KnowledgeFlowDiagram = () => (
  <div className="my-8 notranslate border border-primary/30 rounded-lg bg-black/40 p-5" translate="no">
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

export const CurrentKnowledgeDiagram = () => (
  <PillarCharacteristicsDiagram
    title="CURRENT KNOWLEDGE"
    variant="primary"
    items={['Changes frequently', 'Reflects latest understanding', 'Answers "how do I...?"', 'Written for reuse']}
    examples={['Setup guides', 'Best practices', 'Reference materials', 'Standard procedures']}
  />
);

export const HistoricalRecordDiagram = () => (
  <PillarCharacteristicsDiagram
    title="HISTORICAL RECORD"
    variant="secondary"
    items={['Rarely changes after creation', 'Captures moment in time', 'Answers "what did we discuss?"', 'Written for context']}
    examples={['Team discussions', 'Meeting notes', 'Planning sessions', 'Troubleshooting sessions']}
  />
);

export const DecisionLifecycleDiagram = () => (
  <div className="my-8 notranslate border border-accent/30 rounded-lg bg-black/40 p-5" translate="no">
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

export const FolderStructureDiagram = () => {
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
    <div className="my-8 notranslate border border-secondary/30 rounded-lg bg-black/40 p-5" translate="no">
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

export const SessionFlowDiagram = () => (
  <div className="my-8 notranslate border border-primary/30 rounded-lg bg-black/40 p-5" translate="no">
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

export const ProcessStepsDiagram = () => (
  <div className="my-8 notranslate border border-secondary/30 rounded-lg bg-black/40 p-5" translate="no">
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

export const DocumentVsJustDoItDiagram = () => (
  <div className="my-8 notranslate border border-white/20 rounded-lg bg-black/40 p-5" translate="no">
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

export const GoodVsSkipDiagram = () => (
  <div className="my-8 notranslate border border-white/20 rounded-lg bg-black/40 p-5" translate="no">
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

export const detectSecondBrainArchitecture = (content: string) => 
  content.includes('AUTOMATED WORKFLOWS') || content.includes('CLAUDE WITH MEMORY');

export const detectAIComparison = (content: string) => 
  content.includes('TRADITIONAL AI') && (content.includes('Session 1:') || content.includes('Session 2:'));

export const detectThreePillars = (content: string) => 
  content.includes('CURRENT') && content.includes('HISTORICAL') && content.includes('DECISIONS');

export const detectDecisionAnatomy = (content: string) => 
  content.includes('DECISION:') && content.includes('OPTIONS CONSIDERED');

export const detectKnowledgeFlow = (content: string) => 
  content.includes('DISCUSSION') && content.includes('▶') && content.includes('KNOWLEDGE');

export const detectCurrentKnowledge = (content: string) => 
  content.includes('CURRENT KNOWLEDGE') && content.includes('Changes frequently');

export const detectHistoricalRecord = (content: string) => 
  content.includes('HISTORICAL RECORD') && content.includes('Rarely changes');

export const detectDecisionLifecycle = (content: string) => 
  content.includes('Proposed') && content.includes('Accepted') && content.includes('Implemented');

export const detectFolderStructure = (content: string) => 
  content.includes('my-second-brain/') && content.includes('├──') && content.includes('docs/');

export const detectSessionFlow = (content: string) => 
  content.includes('SESSION 1') && content.includes('SESSION 2') && content.includes('knowledge base');

export const detectProcessSteps = (content: string) => 
  content.includes('Step 1') && content.includes('Step 2') && content.includes('Step 3') && content.includes('Step 4') && content.includes('Claude');

export const detectDocumentVsJustDoIt = (content: string) => 
  content.includes('DOCUMENT') && content.includes('JUST DO IT') && content.includes('Explained twice');

export const detectGoodVsSkip = (content: string) => 
  content.includes('GOOD FIRST ENTRIES') && content.includes('SKIP FOR NOW');

export const coreDiagramEntries: DiagramEntry[] = [
  { id: 'second-brain-architecture', detect: detectSecondBrainArchitecture, component: SecondBrainArchitectureDiagram },
  { id: 'ai-comparison', detect: detectAIComparison, component: AIComparisonDiagram },
  { id: 'three-pillars', detect: detectThreePillars, component: ThreePillarsDiagram },
  { id: 'decision-anatomy', detect: detectDecisionAnatomy, component: DecisionAnatomyDiagram },
  { id: 'knowledge-flow', detect: detectKnowledgeFlow, component: KnowledgeFlowDiagram },
  { id: 'current-knowledge', detect: detectCurrentKnowledge, component: CurrentKnowledgeDiagram },
  { id: 'historical-record', detect: detectHistoricalRecord, component: HistoricalRecordDiagram },
  { id: 'decision-lifecycle', detect: detectDecisionLifecycle, component: DecisionLifecycleDiagram },
  { id: 'folder-structure', detect: detectFolderStructure, component: FolderStructureDiagram },
  { id: 'session-flow', detect: detectSessionFlow, component: SessionFlowDiagram },
  { id: 'process-steps', detect: detectProcessSteps, component: ProcessStepsDiagram },
  { id: 'document-vs-just-do-it', detect: detectDocumentVsJustDoIt, component: DocumentVsJustDoItDiagram },
  { id: 'good-vs-skip', detect: detectGoodVsSkip, component: GoodVsSkipDiagram },
];
