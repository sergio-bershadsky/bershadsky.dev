import React from 'react';
import { MessageSquare, Filter, FileText, CheckCircle, AlertTriangle, HelpCircle, Clock, Users, ArrowRight, Brain, Zap, ListTodo, XCircle } from 'lucide-react';
import type { DiagramEntry } from '../diagramRegistry';

export const FirehoseDiagram = () => (
  <div className="my-8 border border-red-500/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-red-400 mb-4 flex justify-between">
      <span>FIG 9.1 // THE_FIREHOSE</span>
      <span className="text-xs text-muted-foreground">PROBLEM</span>
    </div>
    <div className="space-y-2 font-mono text-xs">
      {[
        { time: '9:00', msg: '"Good morning!"', type: 'noise' },
        { time: '9:15', msg: '"Anyone seen the API docs?"', type: 'noise' },
        { time: '9:30', msg: '"Meeting moved to 2pm"', type: 'noise' },
        { time: '9:45', msg: '"We should use Redis for caching"', type: 'decision' },
        { time: '10:00', msg: '"lol"', type: 'noise' },
        { time: '10:15', msg: '"Can someone review my PR?"', type: 'action' },
        { time: '10:30', msg: '"Decided to postpone mobile app"', type: 'decision' },
        { time: '11:00', msg: '"Coffee anyone?"', type: 'noise' },
      ].map((item, i) => (
        <div key={i} className={`flex items-center gap-3 ${
          item.type === 'decision' ? 'text-green-400' : 
          item.type === 'action' ? 'text-yellow-400' : 'text-gray-500'
        }`}>
          <span className="w-12 text-gray-600">{item.time}</span>
          <span className="flex-1">{item.msg}</span>
          {item.type === 'decision' && (
            <span className="text-[10px] bg-green-500/20 border border-green-500/40 px-2 py-0.5 rounded">DECISION</span>
          )}
          {item.type === 'action' && (
            <span className="text-[10px] bg-yellow-500/20 border border-yellow-500/40 px-2 py-0.5 rounded">ACTION</span>
          )}
        </div>
      ))}
    </div>
  </div>
);

export const SummaryDiagram = () => (
  <div className="my-8 border border-green-500/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-green-400 mb-4 flex justify-between">
      <span>FIG 9.2 // THE_SUMMARY</span>
      <span className="text-xs text-muted-foreground">SOLUTION</span>
    </div>
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-green-400" />
        <div>
          <div className="text-xs text-green-400 font-mono">Decisions: 2</div>
          <div className="text-xs text-gray-400 mt-1">- Use Redis for caching</div>
          <div className="text-xs text-gray-400">- Postpone mobile app</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ListTodo className="w-5 h-5 text-yellow-400" />
        <div>
          <div className="text-xs text-yellow-400 font-mono">Action items: 1</div>
          <div className="text-xs text-gray-400 mt-1">- PR review needed</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Filter className="w-5 h-5 text-gray-500" />
        <div className="text-xs text-gray-500 font-mono">Everything else: Filtered</div>
      </div>
    </div>
  </div>
);

export const CommunicationHubDiagram = () => (
  <div className="my-8 border border-secondary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
      <span>FIG 9.3 // COMMUNICATION_HUB</span>
      <span className="text-xs text-muted-foreground">ARCHITECTURE</span>
    </div>
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="space-y-2">
        <div className="text-xs font-mono text-gray-400 mb-2">SOURCES</div>
        <div className="flex items-center gap-2 text-xs">
          <MessageSquare className="w-4 h-4 text-primary" />
          <span className="text-gray-300">Team Chat</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <MessageSquare className="w-4 h-4 text-primary" />
          <span className="text-gray-300">Direct Msgs</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <MessageSquare className="w-4 h-4 text-primary" />
          <span className="text-gray-300">Channels</span>
        </div>
      </div>
      
      <ArrowRight className="w-5 h-5 text-gray-500 hidden md:block" />
      
      <div className="border border-secondary/40 rounded-lg p-4 bg-secondary/5">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-5 h-5 text-secondary" />
          <span className="text-sm font-mono text-secondary">SECOND BRAIN</span>
        </div>
        <div className="text-xs text-gray-400">SKILLS</div>
      </div>
      
      <ArrowRight className="w-5 h-5 text-gray-500 hidden md:block" />
      
      <div className="space-y-2">
        <div className="text-xs font-mono text-gray-400 mb-2">OUTPUT</div>
        <div className="flex items-center gap-2 text-xs">
          <FileText className="w-4 h-4 text-green-400" />
          <span className="text-gray-300">Summaries</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-gray-300">Decisions</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <ListTodo className="w-4 h-4 text-yellow-400" />
          <span className="text-gray-300">Actions</span>
        </div>
      </div>
    </div>
  </div>
);

export const SignalWordsDiagram = () => (
  <div className="my-8 border border-primary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-primary mb-4 flex justify-between">
      <span>FIG 9.4 // SIGNAL_WORDS</span>
      <span className="text-xs text-muted-foreground">DETECTION</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <div className="text-xs font-mono text-gray-400 mb-2">SIGNAL WORDS</div>
        <div className="space-y-1.5 text-xs font-mono text-secondary">
          <div>"decided to"</div>
          <div>"agreed on"</div>
          <div>"going with"</div>
          <div>"will use"</div>
          <div>"settled on"</div>
        </div>
      </div>
      <div>
        <div className="text-xs font-mono text-gray-400 mb-2">EXAMPLES</div>
        <div className="space-y-1.5 text-xs text-gray-300">
          <div>"We decided to use Redis"</div>
          <div>"Team agreed on the timeline"</div>
          <div>"Going with option B"</div>
          <div>"Will use the new API"</div>
          <div>"Settled on weekly releases"</div>
        </div>
      </div>
    </div>
  </div>
);

export const MessageToRecordDiagram = () => (
  <div className="my-8 border border-accent/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-accent mb-4 flex justify-between">
      <span>FIG 9.5 // MESSAGE_TO_RECORD</span>
      <span className="text-xs text-muted-foreground">EXTRACTION</span>
    </div>
    <div className="space-y-4">
      <div className="border border-gray-600/30 rounded p-3 bg-gray-900/50">
        <div className="text-xs font-mono text-gray-400 mb-2">MESSAGE:</div>
        <div className="text-xs text-gray-300 italic">
          "After discussing the options, we decided to use Redis for the caching layer. @alice will set it up."
        </div>
      </div>
      <div className="flex justify-center">
        <ArrowRight className="w-5 h-5 text-accent rotate-90 md:rotate-0" />
      </div>
      <div className="border border-green-500/30 rounded p-3 bg-green-500/5">
        <div className="text-xs font-mono text-green-400 mb-2">EXTRACTED:</div>
        <div className="space-y-1 text-xs">
          <div><span className="text-secondary">Decision:</span> <span className="text-gray-300">Use Redis for caching layer</span></div>
          <div><span className="text-secondary">Owner:</span> <span className="text-gray-300">Alice</span></div>
          <div><span className="text-secondary">Context:</span> <span className="text-gray-300">Options discussion</span></div>
          <div><span className="text-secondary">Date:</span> <span className="text-gray-300">2024-01-15</span></div>
          <div><span className="text-secondary">Source:</span> <span className="text-gray-300">#engineering</span></div>
        </div>
      </div>
      <div className="text-center">
        <span className="text-xs bg-accent/20 border border-accent/40 px-3 py-1 rounded text-accent">
          "This looks like a decision. Create an ADR? [Y/N]"
        </span>
      </div>
    </div>
  </div>
);

export const CaptureVsSkipDiagram = () => (
  <div className="my-8 border border-secondary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
      <span>FIG 9.6 // CAPTURE_VS_SKIP</span>
      <span className="text-xs text-muted-foreground">PRIVACY</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border border-green-500/30 rounded-lg p-4 bg-green-500/5">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-sm font-mono text-green-400">CAPTURE</span>
        </div>
        <div className="space-y-1.5 text-xs text-gray-300">
          <div>Technical decisions</div>
          <div>Project discussions</div>
          <div>Action items</div>
          <div>Blockers</div>
        </div>
      </div>
      <div className="border border-red-500/30 rounded-lg p-4 bg-red-500/5">
        <div className="flex items-center gap-2 mb-3">
          <XCircle className="w-5 h-5 text-red-400" />
          <span className="text-sm font-mono text-red-400">SKIP</span>
        </div>
        <div className="space-y-1.5 text-xs text-gray-300">
          <div>Personal conversations</div>
          <div>HR topics</div>
          <div>Salary discussions</div>
          <div>Private DMs (usually)</div>
        </div>
      </div>
    </div>
  </div>
);

export const communicationDiagramEntries: DiagramEntry[] = [
  {
    id: 'firehose',
    detect: (content: string) =>
      content.includes('THE FIREHOSE') &&
      content.includes('────────────') &&
      content.includes('"Good morning!"') &&
      content.includes('← DECISION'),
    component: FirehoseDiagram,
  },
  {
    id: 'summary',
    detect: (content: string) =>
      content.includes('THE SUMMARY') &&
      content.includes('───────────') &&
      content.includes('Decisions: 2') &&
      content.includes('Everything else: Filtered'),
    component: SummaryDiagram,
  },
  {
    id: 'communication-hub',
    detect: (content: string) =>
      content.includes('TEAM COMMUNICATION HUB') &&
      content.includes('─────────────────────────────────────────────────────') &&
      content.includes('SOURCES') &&
      content.includes('PROCESSING') &&
      content.includes('OUTPUT') &&
      content.includes('SECOND') &&
      content.includes('BRAIN'),
    component: CommunicationHubDiagram,
  },
  {
    id: 'signal-words',
    detect: (content: string) =>
      content.includes('SIGNAL WORDS') &&
      content.includes('EXAMPLES') &&
      content.includes('────────────') &&
      content.includes('"decided to"') &&
      content.includes('"agreed on"') &&
      content.includes('"settled on"'),
    component: SignalWordsDiagram,
  },
  {
    id: 'message-to-record',
    detect: (content: string) =>
      content.includes('FROM MESSAGE TO RECORD') &&
      content.includes('──────────────────────────────────────────────────────') &&
      content.includes('MESSAGE:') &&
      content.includes('EXTRACTED:') &&
      content.includes('NEXT STEP:'),
    component: MessageToRecordDiagram,
  },
  {
    id: 'capture-vs-skip',
    detect: (content: string) =>
      content.includes('CAPTURE VS SKIP') &&
      content.includes('───────────────────────────────────────────') &&
      content.includes('CAPTURE') &&
      content.includes('SKIP') &&
      content.includes('Technical decisions') &&
      content.includes('Personal conversations'),
    component: CaptureVsSkipDiagram,
  },
];
