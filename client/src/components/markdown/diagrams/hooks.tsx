import React from 'react';
import { Zap, RefreshCw, ArrowDown, ArrowRight, FileText, CheckCircle, XCircle, File, FolderOpen, AlertTriangle, Wrench, Play, HelpCircle, MessageSquare, Square } from 'lucide-react';
import { DiagramEntry } from '../diagramRegistry';

export const SkillsVsHooksDiagram = () => (
  <div className="my-8 border border-primary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-primary mb-4 flex justify-between">
      <span>FIG 6.0 // SKILLS_VS_HOOKS</span>
      <span className="text-xs text-muted-foreground">COMPARISON</span>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="p-3 border border-secondary/40 rounded bg-secondary/5">
        <div className="flex items-center gap-2 mb-3">
          <Wrench className="w-4 h-4 text-secondary" />
          <span className="font-mono text-sm text-secondary">SKILLS</span>
        </div>
        <ul className="space-y-2 text-xs text-gray-300">
          <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-secondary" /> You trigger them</li>
          <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-secondary" /> "Do this now"</li>
          <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-secondary" /> On-demand</li>
          <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-secondary" /> Pull</li>
        </ul>
      </div>
      <div className="p-3 border border-primary/40 rounded bg-primary/5">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-primary" />
          <span className="font-mono text-sm text-primary">HOOKS</span>
        </div>
        <ul className="space-y-2 text-xs text-gray-300">
          <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-primary" /> They trigger themselves</li>
          <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-primary" /> "When X happens, do Y"</li>
          <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-primary" /> Automatic</li>
          <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-primary" /> Push</li>
        </ul>
      </div>
    </div>
  </div>
);

export const HookEventsTable = () => (
  <div className="my-8 border border-secondary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
      <span>FIG 6.1 // HOOK_EVENTS</span>
      <span className="text-xs text-muted-foreground">TRIGGERS</span>
    </div>
    <div className="space-y-2">
      {[
        { event: 'Session Start', when: 'You begin a new conversation', icon: RefreshCw },
        { event: 'Before Tool Use', when: 'Before Claude uses a tool', icon: AlertTriangle },
        { event: 'After Tool Use', when: 'After a tool completes', icon: CheckCircle },
        { event: 'Session End', when: "You're about to close", icon: ArrowRight },
        { event: 'File Created', when: 'A new file is written', icon: File },
        { event: 'File Modified', when: 'An existing file changes', icon: FileText },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-3 p-2 border border-white/10 rounded bg-white/5">
          <item.icon className="w-4 h-4 text-secondary flex-shrink-0" />
          <span className="font-mono text-xs text-secondary w-32 flex-shrink-0">{item.event}</span>
          <span className="text-xs text-gray-400">{item.when}</span>
        </div>
      ))}
    </div>
  </div>
);

export const HookTimelineDiagram = () => (
  <div className="my-8 border border-primary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-primary mb-4 flex justify-between">
      <span>FIG 6.2 // HOOK_TIMELINE</span>
      <span className="text-xs text-muted-foreground">SESSION FLOW</span>
    </div>
    <div className="space-y-3">
      {[
        { label: 'SESSION START', message: '"Good morning! You have 3 pending reviews."', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' },
        { label: 'WORKING...', message: '[Normal conversation]', color: 'text-gray-400', bg: 'bg-white/5', border: 'border-white/10' },
        { label: 'BEFORE TOOL USE', message: '"Wait, that command looks destructive..."', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
        { label: 'TOOL EXECUTES', message: '[Action happens]', color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/30' },
        { label: 'AFTER TOOL USE', message: '"That file isn\'t in the sidebar yet."', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/30' },
        { label: 'SESSION END', message: '"You have uncommitted changes."', color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/30' },
      ].map((step, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className={`px-2 py-1 rounded ${step.bg} ${step.border} border font-mono text-xs ${step.color} w-36 flex-shrink-0 text-center`}>
            {step.label}
          </div>
          <ArrowRight className={`w-4 h-4 ${step.color} flex-shrink-0`} />
          <div className="text-xs text-gray-300 italic">{step.message}</div>
        </div>
      ))}
    </div>
  </div>
);

export const HookFlowDiagram = () => (
  <div className="my-8 border border-accent/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-accent mb-4 flex justify-between">
      <span>FIG 6.3 // HOOK_FLOW</span>
      <span className="text-xs text-muted-foreground">LOGIC</span>
    </div>
    <div className="flex flex-col items-center">
      <div className="px-4 py-2 border border-secondary/40 rounded bg-secondary/10 font-mono text-sm text-secondary">
        EVENT HAPPENS
      </div>
      <ArrowDown className="w-4 h-4 text-secondary my-2" />
      <div className="px-4 py-2 border border-accent/40 rounded bg-accent/10 font-mono text-sm text-accent">
        HOOK CHECKS CONDITION
      </div>
      
      <svg width="280" height="40" className="my-1">
        <defs>
          <linearGradient id="branchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9333ea" />
            <stop offset="50%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>
        </defs>
        <line x1="140" y1="0" x2="140" y2="15" stroke="#9333ea" strokeWidth="2" />
        <line x1="70" y1="15" x2="210" y2="15" stroke="#9333ea" strokeWidth="2" />
        <line x1="70" y1="15" x2="70" y2="35" stroke="#9333ea" strokeWidth="2" />
        <line x1="210" y1="15" x2="210" y2="35" stroke="#9333ea" strokeWidth="2" />
        <polygon points="70,40 65,30 75,30" fill="#9333ea" />
        <polygon points="210,40 205,30 215,30" fill="#9333ea" />
      </svg>
      
      <div className="grid grid-cols-2 gap-6 w-full max-w-md">
        <div className="flex flex-col items-center gap-2">
          <div className="px-3 py-1.5 border border-green-500/40 rounded bg-green-500/10 font-mono text-xs text-green-400 text-center">
            CONDITION MET
          </div>
          <ArrowDown className="w-3 h-3 text-green-400" />
          <div className="px-3 py-1.5 border border-green-500/30 rounded bg-green-500/5 text-xs text-green-400 text-center">
            TAKE ACTION<br /><span className="text-gray-500">(warn, block, add)</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="px-3 py-1.5 border border-gray-500/40 rounded bg-gray-500/10 font-mono text-xs text-gray-400 text-center">
            CONDITION NOT MET
          </div>
          <ArrowDown className="w-3 h-3 text-gray-400" />
          <div className="px-3 py-1.5 border border-gray-500/30 rounded bg-gray-500/5 text-xs text-gray-400 text-center">
            DO NOTHING<br /><span className="text-gray-500">(silent continue)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const GoodFirstHooksDiagram = () => (
  <div className="my-8 border border-secondary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
      <span>FIG 6.4 // HOOK_SELECTION</span>
      <span className="text-xs text-muted-foreground">GUIDE</span>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="p-3 border border-green-500/40 rounded bg-green-500/5">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="font-mono text-sm text-green-400">GOOD FIRST HOOKS</span>
        </div>
        <ul className="space-y-1.5 text-xs text-gray-300">
          <li>• Session start reminder</li>
          <li>• Simple file checks</li>
          <li>• Stale content warnings</li>
        </ul>
      </div>
      <div className="p-3 border border-red-500/40 rounded bg-red-500/5">
        <div className="flex items-center gap-2 mb-3">
          <XCircle className="w-4 h-4 text-red-400" />
          <span className="font-mono text-sm text-red-400">NOT YET</span>
        </div>
        <ul className="space-y-1.5 text-xs text-gray-300">
          <li>• Complex multi-step checks</li>
          <li>• Blocking dangerous commands</li>
          <li>• Authentication validation</li>
        </ul>
      </div>
    </div>
  </div>
);

export const HooksFolderStructureDiagram = () => {
  const folders = [
    { name: 'hooks/', icon: FolderOpen, color: 'text-primary', children: [
      { name: 'session-start.md', icon: File, color: 'text-green-400', comment: 'or .py' },
      { name: 'sidebar-check.md', icon: File, color: 'text-secondary' },
      { name: 'README.md', icon: File, color: 'text-gray-400' }
    ]}
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
    <div className="my-8 border border-primary/30 rounded-lg bg-black/40 p-5">
      <div className="text-sm font-mono text-primary mb-3 flex items-center gap-2">
        <FolderOpen className="w-4 h-4 text-primary" />
        <span>your-second-brain/</span>
        <span className="text-xs text-muted-foreground ml-auto">HOOKS STRUCTURE</span>
      </div>
      <div className="space-y-0.5">
        {folders.map(folder => renderNode(folder))}
      </div>
    </div>
  );
};

export const HookSpectrumDiagram = () => (
  <div className="my-8 border border-accent/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-accent mb-4 flex justify-between">
      <span>FIG 6.5 // HOOK_SPECTRUM</span>
      <span className="text-xs text-muted-foreground">INTENSITY</span>
    </div>
    <div className="relative">
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-xs text-green-400">SILENT</span>
        <span className="font-mono text-xs text-red-400">BLOCKING</span>
      </div>
      <div className="h-2 rounded-full bg-gradient-to-r from-green-500/30 via-yellow-500/30 via-orange-500/30 to-red-500/30 border border-white/10 mb-3" />
      <div className="flex justify-between text-xs text-gray-400">
        <span>Inform</span>
        <span>Warn</span>
        <span>Suggest</span>
        <span>Require</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-2 border border-green-500/30 rounded bg-green-500/5 text-center">
          <div className="text-xs text-green-400 italic">"FYI: stale doc"</div>
        </div>
        <div className="p-2 border border-red-500/30 rounded bg-red-500/5 text-center">
          <div className="text-xs text-red-400 italic">"Cannot delete main branch"</div>
        </div>
      </div>
    </div>
  </div>
);

export const HookExecutionFlowDiagram = ({ content }: { content: string }) => {
  const lines = content.split('\n');
  let trigger = '', check = '', action = '', output = '';
  let inOutput = false;
  const outputLines: string[] = [];

  for (const line of lines) {
    if (line.startsWith('TRIGGER:')) {
      trigger = line.replace('TRIGGER:', '').trim();
    } else if (line.startsWith('CHECK:')) {
      check = line.replace('CHECK:', '').trim();
    } else if (line.startsWith('ACTION:')) {
      action = line.replace('ACTION:', '').trim();
    } else if (line.startsWith('Output:')) {
      inOutput = true;
      const inlineOutput = line.replace('Output:', '').trim();
      if (inlineOutput) {
        outputLines.push(inlineOutput.replace(/^["']|["']$/g, ''));
      }
    } else if (inOutput && line.trim()) {
      outputLines.push(line.replace(/^["']|["']$/g, '').trim());
    }
  }
  output = outputLines.join(' ').replace(/^["']|["']$/g, '');

  return (
    <div className="my-8 border border-primary/30 rounded-lg bg-black/40 p-5">
      <div className="text-sm font-mono text-primary mb-4 flex justify-between">
        <span>HOOK_EXECUTION</span>
        <span className="text-xs text-muted-foreground">FLOW</span>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 border border-primary/40 rounded bg-primary/10 flex-shrink-0">
            <Play className="w-4 h-4 text-primary" />
            <span className="font-mono text-xs text-primary">TRIGGER</span>
          </div>
          <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
          <div className="text-sm text-gray-300">{trigger}</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 border border-secondary/40 rounded bg-secondary/10 flex-shrink-0">
            <HelpCircle className="w-4 h-4 text-secondary" />
            <span className="font-mono text-xs text-secondary">CHECK</span>
          </div>
          <ArrowRight className="w-4 h-4 text-secondary flex-shrink-0" />
          <div className="text-sm text-gray-300">{check}</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 border border-accent/40 rounded bg-accent/10 flex-shrink-0">
            <Zap className="w-4 h-4 text-accent" />
            <span className="font-mono text-xs text-accent">ACTION</span>
          </div>
          <ArrowRight className="w-4 h-4 text-accent flex-shrink-0" />
          <div className="text-sm text-gray-300">{action}</div>
        </div>
        {output && (
          <div className="mt-2 p-3 border border-green-500/30 rounded bg-green-500/5">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-green-400" />
              <span className="font-mono text-xs text-green-400">OUTPUT</span>
            </div>
            <div className="text-sm text-green-300 italic pl-6">"{output}"</div>
          </div>
        )}
      </div>
    </div>
  );
};

export const HookDefinitionDiagram = ({ content }: { content: string }) => {
  const lines = content.split('\n');
  let title = '';
  let intro = '';
  const checks: string[] = [];
  const rules: string[] = [];
  let inChecks = false;
  let pastChecks = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ')) {
      title = trimmed.replace('# ', '');
    } else if (trimmed.match(/^When.*check:$/i) || trimmed.match(/^.*starts?, check:$/i)) {
      intro = trimmed;
      inChecks = true;
    } else if (inChecks && trimmed.match(/^\d+\./)) {
      checks.push(trimmed.replace(/^\d+\.\s*/, ''));
    } else if (inChecks && trimmed && !trimmed.match(/^\d+\./)) {
      inChecks = false;
      pastChecks = true;
      rules.push(trimmed);
    } else if (pastChecks && trimmed) {
      rules.push(trimmed);
    }
  }

  return (
    <div className="my-8 border border-secondary/30 rounded-lg bg-black/40 p-5">
      <div className="text-sm font-mono text-secondary mb-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Play className="w-4 h-4 text-secondary" />
          <span>{title.toUpperCase().replace(' HOOK', '')}</span>
        </div>
        <span className="text-xs text-muted-foreground">HOOK</span>
      </div>
      {intro && (
        <div className="text-xs text-gray-400 mb-3 italic">{intro}</div>
      )}
      <div className="space-y-2 mb-4">
        {checks.map((check, i) => (
          <div key={i} className="flex items-start gap-3 p-2 border border-white/10 rounded bg-white/5">
            <Square className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-300">{check}</span>
          </div>
        ))}
      </div>
      {rules.length > 0 && (
        <div className="pt-3 border-t border-white/10">
          <div className="text-xs text-gray-500 space-y-1">
            {rules.map((rule, i) => (
              <div key={i} className="flex items-center gap-2">
                <ArrowRight className="w-3 h-3 text-gray-600" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const detectHookExecutionFlow = (content: string) => 
  content.includes('TRIGGER:') && content.includes('CHECK:') && content.includes('ACTION:') && content.includes('Output:');

export const detectHookDefinition = (content: string) => 
  content.includes('# ') && content.includes('Hook') && content.match(/\d+\.\s+Are\s/) !== null && content.includes('check:');

export const detectSkillsVsHooks = (content: string) => 
  content.includes('SKILLS') && content.includes('HOOKS') && content.includes('You trigger them') && content.includes('They trigger themselves');

export const detectHookEvents = (content: string) => 
  content.includes('EVENT') && content.includes('WHEN IT HAPPENS') && content.includes('Session Start') && content.includes('File Created');

export const detectHookTimeline = (content: string) => 
  content.includes('SESSION START') && content.includes('BEFORE TOOL USE') && content.includes('AFTER TOOL USE') && content.includes('SESSION END');

export const detectHookFlow = (content: string) => 
  content.includes('EVENT HAPPENS') && content.includes('HOOK CHECKS') && content.includes('CONDITION MET') && content.includes('CONDITION NOT MET');

export const detectGoodFirstHooks = (content: string) => 
  content.includes('GOOD FIRST HOOKS') && content.includes('NOT YET') && content.includes('Session start reminder');

export const detectHooksFolderStructure = (content: string) => 
  content.includes('your-second-brain/') && content.includes('hooks/') && content.includes('session-start.md');

export const detectHookSpectrum = (content: string) => 
  content.includes('SILENT') && content.includes('BLOCKING') && content.includes('Inform') && content.includes('Warn') && content.includes('Suggest') && content.includes('Require');

export const hooksDiagramEntries: DiagramEntry[] = [
  { id: 'hook-execution-flow', detect: detectHookExecutionFlow, component: HookExecutionFlowDiagram, passContent: true },
  { id: 'hook-definition', detect: detectHookDefinition, component: HookDefinitionDiagram, passContent: true },
  { id: 'skills-vs-hooks', detect: detectSkillsVsHooks, component: SkillsVsHooksDiagram },
  { id: 'hook-events', detect: detectHookEvents, component: HookEventsTable },
  { id: 'hook-timeline', detect: detectHookTimeline, component: HookTimelineDiagram },
  { id: 'hook-flow', detect: detectHookFlow, component: HookFlowDiagram },
  { id: 'good-first-hooks', detect: detectGoodFirstHooks, component: GoodFirstHooksDiagram },
  { id: 'hooks-folder-structure', detect: detectHooksFolderStructure, component: HooksFolderStructureDiagram },
  { id: 'hook-spectrum', detect: detectHookSpectrum, component: HookSpectrumDiagram },
];
