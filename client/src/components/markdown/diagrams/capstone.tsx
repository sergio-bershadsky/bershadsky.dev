import React from 'react';
import { ArrowRight, Clock, MessageSquare, FileText, Zap, Brain, CheckCircle, Calendar, Users, Layers } from 'lucide-react';
import type { DiagramEntry } from '../diagramRegistry';

export const BeforeAfterComparisonDiagram = () => (
  <div className="my-8 notranslate border border-green-500/30 rounded-lg bg-black/40 p-5" translate="no">
    <div className="text-sm font-mono text-green-400 mb-4 flex justify-between">
      <span>FIG 12.1 // BEFORE_AND_AFTER_COMPARISON</span>
      <span className="text-xs text-muted-foreground">TRANSFORMATION</span>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <div className="text-xs font-mono text-red-400 mb-2">BEFORE</div>
        {[
          'Wake up',
          'Check Slack (20 min)',
          'Check tasks (10 min)',
          'Write standup (15 min)',
          'Find yesterday\'s context',
          'Remember decisions',
        ].map((item, i) => (
          <div key={i} className="text-xs text-gray-400">{item}</div>
        ))}
      </div>
      <div className="space-y-2">
        <div className="text-xs font-mono text-green-400 mb-2">AFTER</div>
        {[
          'Wake up',
          'Ask Claude: "Brief me"',
          'Get summary (1 min)',
          '/standup (instant)',
          'Context loaded',
          'Auto-tracked',
        ].map((item, i) => (
          <div key={i} className="text-xs text-green-400">{item}</div>
        ))}
      </div>
    </div>
  </div>
);

export const AutonomousDefinitionDiagram = () => (
  <div className="my-8 notranslate border border-secondary/30 rounded-lg bg-black/40 p-5" translate="no">
    <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
      <span>FIG 12.2 // AUTONOMOUS_DEFINITION</span>
      <span className="text-xs text-muted-foreground">CLARITY</span>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <div className="text-xs font-mono text-red-400 mb-2">NOT THIS</div>
        {[
          'AI replacing your job',
          'Magic automation',
          'Zero involvement',
        ].map((item, i) => (
          <div key={i} className="text-xs text-gray-400 flex items-center gap-2">
            <span className="text-red-400">✕</span>
            {item}
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <div className="text-xs font-mono text-green-400 mb-2">THIS</div>
        {[
          'AI handling boring parts',
          'Configured intelligence',
          'Minimal involvement',
        ].map((item, i) => (
          <div key={i} className="text-xs text-green-400 flex items-center gap-2">
            <CheckCircle className="w-3 h-3" />
            {item}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const AutonomousWorkflowDiagram = () => (
  <div className="my-8 notranslate border border-accent/30 rounded-lg bg-black/40 p-5" translate="no">
    <div className="text-sm font-mono text-accent mb-4 flex justify-between">
      <span>FIG 12.3 // AUTONOMOUS_WORKFLOW</span>
      <span className="text-xs text-muted-foreground">DAILY FLOW</span>
    </div>
    <div className="space-y-4">
      {[
        { time: '6:00 AM', label: 'Session Start Hook', items: ['Check overnight messages', 'Review pending decisions', 'Load context'], icon: Clock, color: 'text-primary' },
        { time: '9:00 AM', label: '/standup Skill', items: ['Gather yesterday\'s activity', 'Pull sprint items', 'Generate update'], icon: MessageSquare, color: 'text-secondary' },
        { time: 'ANYTIME', label: 'Meeting Ends', items: ['Process transcript', 'Extract decisions', 'Update tracking'], icon: FileText, color: 'text-accent' },
        { time: 'END DAY', label: 'Session End Hook', items: ['Uncommitted changes', 'Incomplete action items'], icon: Zap, color: 'text-yellow-400' },
      ].map((block, i) => (
        <div key={i} className="flex items-start gap-4">
          <div className="w-20 flex-shrink-0">
            <span className={`text-xs font-mono ${block.color}`}>{block.time}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <block.icon className={`w-4 h-4 ${block.color}`} />
              <span className={`text-xs font-medium ${block.color}`}>{block.label}</span>
            </div>
            <div className="ml-6 space-y-0.5">
              {block.items.map((item, j) => (
                <div key={j} className="text-[10px] text-gray-500">• {item}</div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const ComponentIntegrationDiagram = () => (
  <div className="my-8 notranslate border border-secondary/30 rounded-lg bg-black/40 p-5" translate="no">
    <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
      <span>FIG 12.4 // COMPONENT_INTEGRATION_TABLE</span>
      <span className="text-xs text-muted-foreground">SYSTEM</span>
    </div>
    <div className="overflow-x-auto">
      <table className="text-xs w-full">
        <thead>
          <tr className="border-b border-secondary/40">
            <th className="text-left px-2 py-1.5 text-secondary">COMPONENT</th>
            <th className="text-left px-2 py-1.5 text-secondary">PART</th>
            <th className="text-left px-2 py-1.5 text-secondary">PURPOSE</th>
          </tr>
        </thead>
        <tbody>
          {[
            { component: 'MCP Connections', part: '4', purpose: 'Data sources' },
            { component: 'Skills', part: '5', purpose: 'Triggered procedures' },
            { component: 'Hooks', part: '6', purpose: 'Automatic checks' },
            { component: 'Plugins', part: '7', purpose: 'Shareable configuration' },
            { component: 'Tracking', part: '8', purpose: 'Memory persistence' },
            { component: 'Communication', part: '9', purpose: 'Team context' },
            { component: 'Meetings', part: '10', purpose: 'Discussion memory' },
            { component: 'Decisions', part: '11', purpose: 'Choice intelligence' },
          ].map((row, i) => (
            <tr key={i} className="border-b border-gray-700/30">
              <td className="px-2 py-1.5 text-primary">{row.component}</td>
              <td className="px-2 py-1.5 text-gray-400">{row.part}</td>
              <td className="px-2 py-1.5 text-gray-300">{row.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const FeedbackLoopDiagram = () => (
  <div className="my-8 notranslate border border-primary/30 rounded-lg bg-black/40 p-5" translate="no">
    <div className="text-sm font-mono text-primary mb-4 flex justify-between">
      <span>FIG 12.5 // FEEDBACK_LOOP</span>
      <span className="text-xs text-muted-foreground">IMPROVEMENT</span>
    </div>
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {[
        { label: 'USE IT', sub: 'Run /standup', color: 'border-primary text-primary' },
        { label: 'NOTICE GAPS', sub: '"Missing PR info"', color: 'border-yellow-500 text-yellow-400' },
        { label: 'ADJUST', sub: 'Add PR check', color: 'border-green-500 text-green-400' },
      ].map((item, i, arr) => (
        <React.Fragment key={i}>
          <div className={`px-4 py-2 border ${item.color} rounded bg-black/40 text-center`}>
            <div className="text-xs font-medium">{item.label}</div>
            <div className="text-[10px] text-gray-500 mt-1">{item.sub}</div>
          </div>
          {i < arr.length - 1 && <ArrowRight className="w-5 h-5 text-gray-500" />}
        </React.Fragment>
      ))}
    </div>
  </div>
);

export const ExpansionPossibilitiesDiagram = () => (
  <div className="my-8 notranslate border border-accent/30 rounded-lg bg-black/40 p-5" translate="no">
    <div className="text-sm font-mono text-accent mb-4 flex justify-between">
      <span>FIG 12.6 // EXPANSION_POSSIBILITIES</span>
      <span className="text-xs text-muted-foreground">FUTURE</span>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <div className="text-xs font-mono text-gray-400 mb-2">TODAY</div>
        {['Team chat', 'Meetings', 'Decisions', 'Sprint planning'].map((item, i) => (
          <div key={i} className="text-xs text-gray-400">{item}</div>
        ))}
      </div>
      <div className="space-y-2">
        <div className="text-xs font-mono text-accent mb-2">FUTURE</div>
        {['Customer feedback', 'Support tickets', 'Incident reports', 'Quarterly reviews'].map((item, i) => (
          <div key={i} className="text-xs text-accent">{item}</div>
        ))}
      </div>
    </div>
  </div>
);

export const SprintPlanningComparisonDiagram = () => (
  <div className="my-8 notranslate border border-secondary/30 rounded-lg bg-black/40 p-5" translate="no">
    <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
      <span>FIG 12.7 // SPRINT_PLANNING_COMPARISON</span>
      <span className="text-xs text-muted-foreground">CONTEXT</span>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <div className="text-xs font-mono text-red-400 mb-2">WITHOUT SECOND BRAIN</div>
        {[
          '"How long did this take?"',
          '"Did we try this before?"',
          '"Why is this complex?"',
          '"Who knows about this?"',
        ].map((item, i) => (
          <div key={i} className="text-xs text-gray-400">{item}</div>
        ))}
      </div>
      <div className="space-y-2">
        <div className="text-xs font-mono text-green-400 mb-2">WITH SECOND BRAIN</div>
        {[
          'Historical velocity data',
          'Decision search',
          'Related discussions',
          'Contributor history',
        ].map((item, i) => (
          <div key={i} className="text-xs text-green-400">{item}</div>
        ))}
      </div>
    </div>
  </div>
);

export const capstoneDiagramEntries: DiagramEntry[] = [
  {
    id: 'before-after-comparison',
    detect: (content: string) =>
      content.includes('BEFORE AND AFTER COMPARISON') &&
      content.includes('─────────────────────────────────────────────────────────') &&
      content.includes('BEFORE') &&
      content.includes('AFTER') &&
      content.includes('Check Slack'),
    component: BeforeAfterComparisonDiagram,
  },
  {
    id: 'autonomous-definition',
    detect: (content: string) =>
      content.includes('AUTONOMOUS DEFINITION') &&
      content.includes('─────────────────────────────────────────────────────────') &&
      content.includes('NOT THIS') &&
      content.includes('THIS') &&
      content.includes('AI replacing your job'),
    component: AutonomousDefinitionDiagram,
  },
  {
    id: 'autonomous-workflow',
    detect: (content: string) =>
      content.includes('AUTONOMOUS WORKFLOW') &&
      content.includes('─────────────────────────────────────────────────────────') &&
      content.includes('6:00 AM') &&
      content.includes('Session Start Hook') &&
      content.includes('END DAY'),
    component: AutonomousWorkflowDiagram,
  },
  {
    id: 'component-integration',
    detect: (content: string) =>
      content.includes('COMPONENT INTEGRATION TABLE') &&
      content.includes('─────────────────────────────────────────────────────────') &&
      content.includes('COMPONENT') &&
      content.includes('PART') &&
      content.includes('PURPOSE') &&
      content.includes('MCP Connections'),
    component: ComponentIntegrationDiagram,
  },
  {
    id: 'feedback-loop',
    detect: (content: string) =>
      content.includes('FEEDBACK LOOP') &&
      content.includes('─────────────────────────────────────────────────────────') &&
      content.includes('USE IT') &&
      content.includes('NOTICE GAPS') &&
      content.includes('ADJUST'),
    component: FeedbackLoopDiagram,
  },
  {
    id: 'expansion-possibilities',
    detect: (content: string) =>
      content.includes('EXPANSION POSSIBILITIES') &&
      content.includes('─────────────────────────────────────────────────────────') &&
      content.includes('TODAY') &&
      content.includes('FUTURE') &&
      content.includes('Team chat') &&
      content.includes('Customer feedback'),
    component: ExpansionPossibilitiesDiagram,
  },
  {
    id: 'sprint-planning-comparison',
    detect: (content: string) =>
      content.includes('SPRINT PLANNING COMPARISON') &&
      content.includes('─────────────────────────────────────────────────────────') &&
      content.includes('WITHOUT SECOND BRAIN') &&
      content.includes('WITH SECOND BRAIN') &&
      content.includes('Historical velocity'),
    component: SprintPlanningComparisonDiagram,
  },
];
