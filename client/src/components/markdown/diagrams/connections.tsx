import React from 'react';
import { Brain, MessageSquare, RefreshCw, BookOpen, ArrowRight, FileText, Database, CheckCircle } from 'lucide-react';
import { DiagramEntry } from '../diagramRegistry';

export const MCPFlowDiagram = () => (
  <div className="my-8 notranslate border border-secondary/30 rounded-lg bg-black/40 p-5" translate="no">
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

export const ConnectionTypesTable = () => (
  <div className="my-8 notranslate border border-secondary/30 rounded-lg bg-black/40 p-5" translate="no">
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
          <li>Check who's blocked</li>
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

export const DataFlowDiagram = () => (
  <div className="my-8 notranslate border border-accent/30 rounded-lg bg-black/40 p-5" translate="no">
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

export const CapabilitiesTable = () => (
  <div className="my-8 notranslate border border-primary/30 rounded-lg bg-black/40 p-5" translate="no">
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
        <div className="text-sm text-gray-300 flex-1">"What's blocking the sprint?"</div>
        <div className="text-xs font-mono text-accent">Task tracker</div>
      </div>
      <div className="flex items-center gap-4 p-3 border border-white/10 rounded bg-white/5">
        <div className="text-sm text-gray-300 flex-1">"Summarize yesterday's standup"</div>
        <div className="text-xs font-mono text-primary">Chat + tasks</div>
      </div>
      <div className="flex items-center gap-4 p-3 border border-white/10 rounded bg-white/5">
        <div className="text-sm text-gray-300 flex-1">"What did we decide about X?"</div>
        <div className="text-xs font-mono text-green-400">Chat + decisions</div>
      </div>
    </div>
  </div>
);

export const detectMCPFlow = (content: string) => 
  content.includes('Claude') && content.includes('MCP Server') && content.includes('Service');

export const detectConnectionTypes = (content: string) => 
  content.includes('CONNECTION TYPE') && content.includes('WHAT CLAUDE CAN DO') && content.includes('Team Chat');

export const detectDataFlow = (content: string) => 
  content.includes('YOUR TOOLS') && content.includes('MCP SERVER') && content.includes('CLAUDE') && content.includes('Data stays local');

export const detectCapabilities = (content: string) => 
  content.includes('QUESTION') && content.includes('SOURCE') && content.includes('What happened overnight');

export const connectionsDiagramEntries: DiagramEntry[] = [
  { id: 'mcp-flow', detect: detectMCPFlow, component: MCPFlowDiagram },
  { id: 'connection-types', detect: detectConnectionTypes, component: ConnectionTypesTable },
  { id: 'data-flow', detect: detectDataFlow, component: DataFlowDiagram },
  { id: 'capabilities', detect: detectCapabilities, component: CapabilitiesTable },
];
