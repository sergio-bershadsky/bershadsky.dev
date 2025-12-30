import React from 'react';
import { FileText, ArrowRight, Check, X, Clock, AlertTriangle, Brain, Layers, GitBranch } from 'lucide-react';
import type { DiagramEntry } from '../diagramRegistry';

export const DecisionDecayDiagram = () => (
  <div className="my-8 border border-red-500/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-red-400 mb-4 flex justify-between">
      <span>FIG 11.1 // DECISION_DECAY_TIMELINE</span>
      <span className="text-xs text-muted-foreground">PROBLEM</span>
    </div>
    <div className="space-y-4">
      {[
        { time: 'WEEK 1', text: '"We decided to use Redis because it handles our read patterns better..."', color: 'text-green-400', opacity: 'opacity-100' },
        { time: 'MONTH 3', text: '"We use Redis. It was decided at some point."', color: 'text-yellow-400', opacity: 'opacity-70' },
        { time: 'YEAR 1', text: '"Why Redis? I don\'t know. That\'s just what we use."', color: 'text-red-400', opacity: 'opacity-50' },
      ].map((item, i) => (
        <div key={i} className={`flex items-start gap-4 ${item.opacity}`}>
          <span className={`text-xs font-mono w-16 ${item.color}`}>{item.time}</span>
          <span className="text-xs text-gray-300 italic">{item.text}</span>
        </div>
      ))}
    </div>
  </div>
);

export const ADRAnatomyDiagram = () => (
  <div className="my-8 border border-accent/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-accent mb-4 flex justify-between">
      <span>FIG 11.2 // DECISION_RECORD_ANATOMY</span>
      <span className="text-xs text-muted-foreground">STRUCTURE</span>
    </div>
    <div className="border border-gray-600 rounded-lg overflow-hidden">
      <div className="bg-accent/20 px-4 py-2 border-b border-gray-600">
        <span className="text-sm font-semibold text-accent">DECISION: Use Redis for Caching</span>
      </div>
      <div className="p-4 space-y-3 text-xs">
        <div className="flex gap-4">
          <span className="text-gray-500 w-16">NUMBER:</span>
          <span className="text-gray-300">ADR-0015</span>
        </div>
        <div className="flex gap-4">
          <span className="text-gray-500 w-16">STATUS:</span>
          <span className="text-green-400">Implemented</span>
        </div>
        <div className="border-t border-gray-700 pt-3">
          <span className="text-secondary font-medium">CONTEXT</span>
          <p className="text-gray-400 mt-1">API response times were too slow for expected Q2 volume.</p>
        </div>
        <div className="border-t border-gray-700 pt-3">
          <span className="text-primary font-medium">OPTIONS CONSIDERED</span>
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2">
              <Check className="w-3 h-3 text-green-400" />
              <span className="text-green-400">Redis (CHOSEN)</span>
            </div>
            <div className="flex items-center gap-2">
              <X className="w-3 h-3 text-red-400" />
              <span className="text-red-400">Memcached (rejected)</span>
            </div>
            <div className="flex items-center gap-2">
              <X className="w-3 h-3 text-red-400" />
              <span className="text-red-400">In-memory (rejected)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const ADRSectionPurposeDiagram = () => (
  <div className="my-8 border border-secondary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
      <span>FIG 11.3 // ADR_SECTION_PURPOSE</span>
      <span className="text-xs text-muted-foreground">TEMPLATE</span>
    </div>
    <div className="space-y-2">
      {[
        { section: 'CONTEXT', purpose: 'Why did we need to decide anything?', color: 'text-secondary' },
        { section: 'OPTIONS', purpose: 'What did we actually consider?', color: 'text-primary' },
        { section: 'CHOSEN', purpose: 'What did we pick and why?', color: 'text-green-400' },
        { section: 'REJECTED', purpose: 'Why NOT the alternatives?', color: 'text-red-400' },
        { section: 'CONSEQUENCES', purpose: 'What does this mean going forward?', color: 'text-yellow-400' },
        { section: 'RELATED', purpose: 'Where\'s the deeper context?', color: 'text-accent' },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-4">
          <span className={`text-xs font-mono w-24 ${item.color}`}>{item.section}</span>
          <span className="text-xs text-gray-400">{item.purpose}</span>
        </div>
      ))}
    </div>
  </div>
);

export const DecisionSignalsDiagram = () => (
  <div className="my-8 border border-primary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-primary mb-4 flex justify-between">
      <span>FIG 11.4 // DECISION_SIGNAL_PATTERNS</span>
      <span className="text-xs text-muted-foreground">DETECTION</span>
    </div>
    <div className="space-y-2">
      {[
        { pattern: '"Let\'s go with..."', meaning: 'Decision made', icon: Check, color: 'text-green-400' },
        { pattern: '"We\'re choosing..."', meaning: 'Decision made', icon: Check, color: 'text-green-400' },
        { pattern: '"I think we should..."', meaning: 'Proposal (not yet)', icon: Clock, color: 'text-yellow-400' },
        { pattern: '"What about..."', meaning: 'Exploration', icon: AlertTriangle, color: 'text-gray-400' },
        { pattern: '"Agreed, we\'ll use..."', meaning: 'Decision confirmed', icon: Check, color: 'text-green-400' },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-4">
          <item.icon className={`w-4 h-4 ${item.color}`} />
          <span className="text-xs font-mono text-gray-300 w-40">{item.pattern}</span>
          <span className={`text-xs ${item.color}`}>{item.meaning}</span>
        </div>
      ))}
    </div>
  </div>
);

export const DecisionFlowDiagram = () => (
  <div className="my-8 border border-accent/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-accent mb-4 flex justify-between">
      <span>FIG 11.5 // DECISION_FLOW</span>
      <span className="text-xs text-muted-foreground">PROCESS</span>
    </div>
    <div className="overflow-x-auto">
      <div className="flex items-start gap-2 min-w-max justify-center">
        {[
          { stage: 'EXPLORATION', quote: '"What options do we have?"', color: 'border-gray-500', textColor: 'text-gray-400' },
          { stage: 'PROPOSAL', quote: '"I propose Redis"', color: 'border-yellow-500', textColor: 'text-yellow-400' },
          { stage: 'DISCUSSION', quote: '"Concerns? Trade-offs?"', color: 'border-secondary', textColor: 'text-secondary' },
          { stage: 'DECISION', quote: '"Agreed. Redis it is"', color: 'border-green-500', textColor: 'text-green-400' },
        ].map((item, i, arr) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center w-28">
              <div className={`px-3 py-2 border ${item.color} rounded bg-black/40 w-full text-center`}>
                <span className={`text-xs ${item.textColor}`}>{item.stage}</span>
              </div>
              <span className="text-[10px] text-gray-500 mt-1 text-center">{item.quote}</span>
            </div>
            {i < arr.length - 1 && (
              <div className="flex items-center h-10 px-1">
                <ArrowRight className="w-4 h-4 text-gray-500" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);

export const DecisionNumberingDiagram = () => (
  <div className="my-8 border border-secondary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
      <span>FIG 11.6 // DECISION_NUMBERING_SCHEME</span>
      <span className="text-xs text-muted-foreground">ORGANIZATION</span>
    </div>
    <div className="space-y-2">
      {[
        { range: '0001-0999', category: 'Architecture & Infrastructure', color: 'text-primary' },
        { range: '1000-1999', category: 'Fork & Upstream', color: 'text-secondary' },
        { range: '2000-2999', category: 'Feature & Product', color: 'text-accent' },
        { range: '3000-3999', category: 'Process & Workflow', color: 'text-green-400' },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-4">
          <span className="text-xs font-mono text-gray-400 w-24">{item.range}</span>
          <span className={`text-xs ${item.color}`}>{item.category}</span>
        </div>
      ))}
    </div>
  </div>
);

export const DecisionStatesDiagram = () => (
  <div className="my-8 border border-green-500/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-green-400 mb-4 flex justify-between">
      <span>FIG 11.7 // DECISION_STATES</span>
      <span className="text-xs text-muted-foreground">LIFECYCLE</span>
    </div>
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {['DRAFT', 'PROPOSED', 'ACCEPTED', 'IMPLEMENTED'].map((state, i, arr) => (
          <React.Fragment key={i}>
            <div className={`px-3 py-1.5 border rounded text-xs ${
              state === 'IMPLEMENTED' ? 'border-green-500/50 text-green-400 bg-green-500/10' :
              state === 'ACCEPTED' ? 'border-secondary/50 text-secondary bg-secondary/10' :
              'border-gray-600 text-gray-400'
            }`}>
              {state}
            </div>
            {i < arr.length - 1 && <ArrowRight className="w-4 h-4 text-gray-500" />}
          </React.Fragment>
        ))}
      </div>
      <div className="flex items-center gap-2 justify-center text-xs">
        <span className="text-gray-500">PROPOSED</span>
        <ArrowRight className="w-3 h-3 text-gray-500" />
        <span className="text-red-400 border border-red-500/50 px-2 py-1 rounded bg-red-500/10">REJECTED</span>
      </div>
      <div className="flex items-center gap-2 justify-center text-xs">
        <span className="text-gray-500">ACCEPTED</span>
        <ArrowRight className="w-3 h-3 text-gray-500" />
        <span className="text-yellow-400 border border-yellow-500/50 px-2 py-1 rounded bg-yellow-500/10">SUPERSEDED</span>
      </div>
    </div>
  </div>
);

export const decisionsDiagramEntries: DiagramEntry[] = [
  {
    id: 'decision-decay',
    detect: (content: string) =>
      content.includes('DECISION DECAY TIMELINE') &&
      content.includes('─────────────────────────────────────────────────────────') &&
      content.includes('WEEK 1') &&
      content.includes('MONTH 3') &&
      content.includes('YEAR 1'),
    component: DecisionDecayDiagram,
  },
  {
    id: 'adr-anatomy',
    detect: (content: string) =>
      content.includes('DECISION RECORD ANATOMY') &&
      content.includes('─────────────────────────────────────────────────────────') &&
      content.includes('DECISION:') &&
      content.includes('NUMBER:') &&
      content.includes('OPTIONS CONSIDERED'),
    component: ADRAnatomyDiagram,
  },
  {
    id: 'adr-section-purpose',
    detect: (content: string) =>
      content.includes('ADR SECTION PURPOSE') &&
      content.includes('─────────────────────────────────────────────────────────') &&
      content.includes('CONTEXT') &&
      content.includes('Why did we need to decide anything?'),
    component: ADRSectionPurposeDiagram,
  },
  {
    id: 'decision-signals',
    detect: (content: string) =>
      content.includes('DECISION SIGNAL PATTERNS') &&
      content.includes('─────────────────────────────────────────────────────────') &&
      content.includes('PATTERN') &&
      content.includes('MEANING') &&
      content.includes('"Let\'s go with..."'),
    component: DecisionSignalsDiagram,
  },
  {
    id: 'decision-flow',
    detect: (content: string) =>
      content.includes('DECISION FLOW') &&
      content.includes('─────────────────────────────────────────────────────────') &&
      content.includes('EXPLORATION') &&
      content.includes('PROPOSAL') &&
      content.includes('DISCUSSION') &&
      content.includes('DECISION'),
    component: DecisionFlowDiagram,
  },
  {
    id: 'decision-numbering',
    detect: (content: string) =>
      content.includes('DECISION NUMBERING SCHEME') &&
      content.includes('─────────────────────────────────────────────────────────') &&
      content.includes('0001-0999') &&
      content.includes('Architecture & Infrastructure'),
    component: DecisionNumberingDiagram,
  },
  {
    id: 'decision-states',
    detect: (content: string) =>
      content.includes('DECISION STATES') &&
      content.includes('─────────────────────────────────────────────────────────') &&
      content.includes('DRAFT') &&
      content.includes('PROPOSED') &&
      content.includes('ACCEPTED') &&
      content.includes('IMPLEMENTED'),
    component: DecisionStatesDiagram,
  },
];
