import React from 'react';
import { FileText, Database, Folder, FolderOpen, FileCode, CheckCircle, XCircle, GitBranch, Search, Zap, HelpCircle, ClipboardList, MessageSquare, BarChart3, ArrowRight, User } from 'lucide-react';
import type { DiagramEntry } from '../diagramRegistry';

export const MarkdownVsStructuredDiagram = () => (
  <div className="my-8 border border-secondary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
      <span>FIG 8.1 // MARKDOWN_VS_STRUCTURED</span>
      <span className="text-xs text-muted-foreground">COMPARISON</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border border-red-500/30 rounded-lg p-4 bg-red-500/5">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-red-400" />
          <span className="text-sm font-mono text-red-400">MARKDOWN FILES</span>
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2 text-gray-400">
            <Search className="w-3 h-3" />
            <span>Read 50 files</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <FileText className="w-3 h-3" />
            <span>Parse each one</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <HelpCircle className="w-3 h-3" />
            <span>Hope for consistency</span>
          </div>
          <div className="flex items-center gap-2 text-red-400 font-mono">
            <Zap className="w-3 h-3" />
            <span>5 seconds</span>
          </div>
        </div>
      </div>
      <div className="border border-green-500/30 rounded-lg p-4 bg-green-500/5">
        <div className="flex items-center gap-2 mb-3">
          <Database className="w-5 h-5 text-green-400" />
          <span className="text-sm font-mono text-green-400">STRUCTURED DATA</span>
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2 text-gray-400">
            <FileCode className="w-3 h-3" />
            <span>Read 1 file</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Search className="w-3 h-3" />
            <span>Filter instantly</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <CheckCircle className="w-3 h-3" />
            <span>Know the format</span>
          </div>
          <div className="flex items-center gap-2 text-green-400 font-mono">
            <Zap className="w-3 h-3" />
            <span>0.1 seconds</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const YamlVsJsonDiagram = () => (
  <div className="my-8 border border-secondary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
      <span>FIG 8.2 // YAML_VS_JSON</span>
      <span className="text-xs text-muted-foreground">FORMAT CHOICE</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div className="border border-primary/30 rounded-lg p-4 bg-primary/5">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-primary" />
          <span className="text-sm font-mono text-primary">YAML</span>
        </div>
        <div className="space-y-1.5 text-xs text-gray-300">
          <div>Human-friendly format</div>
          <div>Easy to edit manually</div>
          <div>Comments allowed</div>
        </div>
      </div>
      <div className="border border-secondary/30 rounded-lg p-4 bg-secondary/5">
        <div className="flex items-center gap-2 mb-3">
          <FileCode className="w-5 h-5 text-secondary" />
          <span className="text-sm font-mono text-secondary">JSON</span>
        </div>
        <div className="space-y-1.5 text-xs text-gray-300">
          <div>Strict validation</div>
          <div>Perfect for schemas</div>
          <div>Claude knows it well</div>
        </div>
      </div>
    </div>
    <div className="border-t border-white/10 pt-4">
      <div className="text-xs font-mono text-accent mb-2">USE BOTH TOGETHER:</div>
      <div className="flex flex-col gap-2 text-xs">
        <div className="flex items-center gap-2 text-gray-300">
          <Folder className="w-3 h-3 text-primary" />
          <span className="text-primary">config.yaml</span>
          <span className="text-gray-500">(your settings)</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <Folder className="w-3 h-3 text-primary" />
          <span className="text-primary">records.yaml</span>
          <span className="text-gray-500">(your actual data)</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <Folder className="w-3 h-3 text-secondary" />
          <span className="text-secondary">schema.json</span>
          <span className="text-gray-500">(validation rules)</span>
        </div>
      </div>
    </div>
  </div>
);

export const MinimalSchemaDiagram = () => (
  <div className="my-8 border border-secondary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
      <span>FIG 8.3 // MINIMAL_SCHEMA</span>
      <span className="text-xs text-muted-foreground">PRINCIPLE 1</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border border-red-500/30 rounded-lg p-4 bg-red-500/5">
        <div className="flex items-center gap-2 mb-3">
          <XCircle className="w-5 h-5 text-red-400" />
          <span className="text-sm font-mono text-red-400">BAD: OVERENGINEERED</span>
        </div>
        <div className="font-mono text-xs space-y-1 text-gray-400">
          <div>id: "decision-uuid-123-abc"</div>
          <div>created_at: "2024-01-15T14:30:00Z"</div>
          <div>updated_at: "2024-01-15T14:35:00Z"</div>
          <div>created_by: "user-uuid-456"</div>
          <div>status_history: [...]</div>
        </div>
      </div>
      <div className="border border-green-500/30 rounded-lg p-4 bg-green-500/5">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-sm font-mono text-green-400">GOOD: JUST WHAT YOU NEED</span>
        </div>
        <div className="font-mono text-xs space-y-1 text-gray-300">
          <div><span className="text-secondary">number:</span> 1</div>
          <div><span className="text-secondary">title:</span> "Use Redis for caching"</div>
          <div><span className="text-secondary">status:</span> proposed</div>
          <div><span className="text-secondary">created:</span> 2024-01-15</div>
        </div>
      </div>
    </div>
  </div>
);

export const FieldQuestionsDiagram = () => (
  <div className="my-8 border border-primary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-primary mb-4 flex justify-between">
      <span>FIG 8.4 // FIELD_QUESTIONS</span>
      <span className="text-xs text-muted-foreground">PRINCIPLE 2</span>
    </div>
    <div className="text-xs font-mono text-accent mb-3">DECISION RECORD</div>
    <div className="space-y-2">
      {[
        { field: 'number: 1', question: 'Which decision?' },
        { field: 'title: "..."', question: 'What was decided?' },
        { field: 'status: proposed', question: 'Where in the process?' },
        { field: 'created: 2024-01-15', question: 'When did this start?' },
        { field: 'file: "path/to.md"', question: 'Where\'s the detail?' },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="text-secondary font-mono text-xs w-40 flex-shrink-0">{item.field}</div>
          <ArrowRight className="w-3 h-3 text-gray-500 flex-shrink-0" />
          <div className="text-gray-300 text-xs">"{item.question}"</div>
        </div>
      ))}
    </div>
  </div>
);

export const NormalizedVsDenormalizedDiagram = () => (
  <div className="my-8 border border-secondary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
      <span>FIG 8.5 // NORMALIZATION</span>
      <span className="text-xs text-muted-foreground">PRINCIPLE 3</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border border-yellow-500/30 rounded-lg p-4 bg-yellow-500/5">
        <div className="flex items-center gap-2 mb-3">
          <GitBranch className="w-5 h-5 text-yellow-400" />
          <span className="text-sm font-mono text-yellow-400">NORMALIZED</span>
        </div>
        <div className="text-xs text-gray-500 mb-2">(requires lookups)</div>
        <div className="font-mono text-xs space-y-1 text-gray-400">
          <div>discussion:</div>
          <div className="pl-3">id: 1</div>
          <div className="pl-3">participant_ids: [101, 102]</div>
          <div className="mt-2">participants:</div>
          <div className="pl-3">- id: 101, name: "Alice"</div>
          <div className="pl-3">- id: 102, name: "Bob"</div>
        </div>
      </div>
      <div className="border border-green-500/30 rounded-lg p-4 bg-green-500/5">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-sm font-mono text-green-400">DENORMALIZED</span>
        </div>
        <div className="text-xs text-gray-500 mb-2">(self-contained)</div>
        <div className="font-mono text-xs space-y-1 text-gray-300">
          <div>discussion:</div>
          <div className="pl-3"><span className="text-secondary">participants:</span></div>
          <div className="pl-6">- Alice</div>
          <div className="pl-6">- Bob</div>
        </div>
        <div className="mt-3 text-xs text-green-400">Each record stands alone</div>
      </div>
    </div>
  </div>
);

export const AbbreviationsDiagram = () => (
  <div className="my-8 border border-secondary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
      <span>FIG 8.6 // OBVIOUS_NAMES</span>
      <span className="text-xs text-muted-foreground">PRINCIPLE 4</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border border-red-500/30 rounded-lg p-4 bg-red-500/5">
        <div className="flex items-center gap-2 mb-3">
          <XCircle className="w-5 h-5 text-red-400" />
          <span className="text-sm font-mono text-red-400">BAD</span>
        </div>
        <div className="font-mono text-xs space-y-1 text-gray-400">
          <div>n: 1</div>
          <div>t: "Thing"</div>
          <div>s: "p"</div>
          <div>d: "2024-01-15"</div>
        </div>
      </div>
      <div className="border border-green-500/30 rounded-lg p-4 bg-green-500/5">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-sm font-mono text-green-400">GOOD</span>
        </div>
        <div className="font-mono text-xs space-y-1 text-gray-300">
          <div><span className="text-secondary">number:</span> 1</div>
          <div><span className="text-secondary">title:</span> "Thing"</div>
          <div><span className="text-secondary">status:</span> proposed</div>
          <div><span className="text-secondary">created:</span> 2024-01-15</div>
        </div>
      </div>
    </div>
  </div>
);

export const CoreEntitiesDiagram = () => (
  <div className="my-8 border border-accent/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-accent mb-4 flex justify-between">
      <span>FIG 8.7 // CORE_ENTITIES</span>
      <span className="text-xs text-muted-foreground">DATA MODEL</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="border border-primary/30 rounded-lg p-4 bg-primary/5">
        <div className="flex items-center gap-2 mb-3">
          <ClipboardList className="w-5 h-5 text-primary" />
          <span className="text-sm font-mono text-primary">DECISIONS</span>
        </div>
        <div className="space-y-1 text-xs text-gray-300 font-mono">
          <div>number</div>
          <div>title</div>
          <div>status</div>
          <div>created</div>
          <div>file</div>
          <div>author</div>
        </div>
      </div>
      <div className="border border-secondary/30 rounded-lg p-4 bg-secondary/5">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-5 h-5 text-secondary" />
          <span className="text-sm font-mono text-secondary">DISCUSSIONS</span>
        </div>
        <div className="space-y-1 text-xs text-gray-300 font-mono">
          <div>date</div>
          <div>topic</div>
          <div>participants</div>
          <div>file</div>
          <div>source</div>
        </div>
      </div>
      <div className="border border-accent/30 rounded-lg p-4 bg-accent/5">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-5 h-5 text-accent" />
          <span className="text-sm font-mono text-accent">REPORTS</span>
        </div>
        <div className="space-y-1 text-xs text-gray-300 font-mono">
          <div>period</div>
          <div>type</div>
          <div>file</div>
          <div>generated</div>
        </div>
      </div>
    </div>
  </div>
);

export const TrackingFolderStructureDiagram = () => (
  <div className="my-8 border border-secondary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
      <span>FIG 8.8 // FOLDER_STRUCTURE</span>
      <span className="text-xs text-muted-foreground">FILE SYSTEM</span>
    </div>
    <div className="font-mono text-xs space-y-1">
      <div className="flex items-center gap-2">
        <FolderOpen className="w-4 h-4 text-secondary" />
        <span className="text-secondary">.claude/data/</span>
      </div>
      <div className="flex items-center gap-2 pl-4">
        <FileCode className="w-4 h-4 text-primary" />
        <span className="text-gray-300">config.yaml</span>
        <span className="text-gray-500 text-xs"># Static settings</span>
      </div>
      <div className="flex items-center gap-2 pl-4">
        <FolderOpen className="w-4 h-4 text-primary" />
        <span className="text-primary">decisions/</span>
      </div>
      <div className="flex items-center gap-2 pl-8">
        <FileCode className="w-4 h-4 text-secondary" />
        <span className="text-gray-300">schema.json</span>
        <span className="text-gray-500 text-xs"># Validation rules</span>
      </div>
      <div className="flex items-center gap-2 pl-8">
        <FileCode className="w-4 h-4 text-primary" />
        <span className="text-gray-300">records.yaml</span>
        <span className="text-gray-500 text-xs"># All decisions</span>
      </div>
      <div className="flex items-center gap-2 pl-4">
        <FolderOpen className="w-4 h-4 text-secondary" />
        <span className="text-secondary">discussions/</span>
      </div>
      <div className="flex items-center gap-2 pl-8">
        <FileCode className="w-4 h-4 text-secondary" />
        <span className="text-gray-300">schema.json</span>
      </div>
      <div className="flex items-center gap-2 pl-8">
        <FileCode className="w-4 h-4 text-primary" />
        <span className="text-gray-300">2024-01.yaml</span>
        <span className="text-gray-500 text-xs"># Monthly partitions</span>
      </div>
      <div className="flex items-center gap-2 pl-8">
        <FileCode className="w-4 h-4 text-primary" />
        <span className="text-gray-300">2024-02.yaml</span>
      </div>
      <div className="flex items-center gap-2 pl-4">
        <FolderOpen className="w-4 h-4 text-accent" />
        <span className="text-accent">reports/</span>
      </div>
      <div className="flex items-center gap-2 pl-8">
        <FileCode className="w-4 h-4 text-primary" />
        <span className="text-gray-300">tracking.yaml</span>
      </div>
    </div>
  </div>
);

export const ValidationFlowDiagram = () => (
  <div className="my-8 border border-primary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-primary mb-4 flex justify-between">
      <span>FIG 8.9 // VALIDATION_FLOW</span>
      <span className="text-xs text-muted-foreground">PROCESS</span>
    </div>
    <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
      {[
        { label: 'Load data', icon: Database },
        { label: 'Make changes', icon: FileText },
        { label: 'Validate', icon: CheckCircle },
        { label: 'Save', icon: Folder },
      ].map((step, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-2 p-3 border border-secondary/30 rounded-lg bg-secondary/5">
            <step.icon className="w-5 h-5 text-secondary" />
            <span className="text-xs font-mono text-gray-300">{step.label}</span>
          </div>
          {i < 3 && <ArrowRight className="w-4 h-4 text-gray-500 hidden md:block" />}
        </React.Fragment>
      ))}
    </div>
    <div className="mt-4 text-center">
      <div className="inline-block border border-red-500/30 rounded-lg p-3 bg-red-500/5">
        <div className="flex items-center gap-2 text-xs">
          <XCircle className="w-4 h-4 text-red-400" />
          <span className="text-red-400 font-mono">If invalid: Show error, don't save, fix and retry</span>
        </div>
      </div>
    </div>
  </div>
);

export const BeforeAfterTrackingDiagram = () => (
  <div className="my-8 border border-accent/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-accent mb-4 flex justify-between">
      <span>FIG 8.10 // BEFORE_AFTER</span>
      <span className="text-xs text-muted-foreground">TRANSFORMATION</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border border-red-500/30 rounded-lg p-4 bg-red-500/5">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-red-400" />
          <span className="text-sm font-mono text-red-400">BEFORE TRACKING</span>
        </div>
        <div className="space-y-2 text-xs text-gray-400">
          <div className="flex items-start gap-2">
            <Search className="w-3 h-3 mt-0.5" />
            <span>"Find all decisions" → scan 50 files</span>
          </div>
          <div className="flex items-start gap-2">
            <HelpCircle className="w-3 h-3 mt-0.5" />
            <span>"What's pending?" → grep and hope</span>
          </div>
          <div className="flex items-start gap-2">
            <XCircle className="w-3 h-3 mt-0.5" />
            <span>"Stats this month?" → impossible</span>
          </div>
        </div>
      </div>
      <div className="border border-green-500/30 rounded-lg p-4 bg-green-500/5">
        <div className="flex items-center gap-2 mb-3">
          <Database className="w-5 h-5 text-green-400" />
          <span className="text-sm font-mono text-green-400">AFTER TRACKING</span>
        </div>
        <div className="space-y-2 text-xs text-gray-300">
          <div className="flex items-start gap-2">
            <FileCode className="w-3 h-3 mt-0.5 text-green-400" />
            <span>"decisions.yaml" → one file read</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-3 h-3 mt-0.5 text-green-400" />
            <span>"status: proposed" → instant filter</span>
          </div>
          <div className="flex items-start gap-2">
            <BarChart3 className="w-3 h-3 mt-0.5 text-green-400" />
            <span>"group by date" → simple query</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const trackingDiagramEntries: DiagramEntry[] = [
  {
    id: 'markdown-vs-structured',
    detect: (content: string) => 
      content.includes('MARKDOWN FILES') && 
      content.includes('STRUCTURED DATA') && 
      content.includes('Read 50 files') &&
      content.includes('Read 1 file'),
    component: MarkdownVsStructuredDiagram,
  },
  {
    id: 'yaml-vs-json',
    detect: (content: string) =>
      content.includes('YAML') &&
      content.includes('JSON') &&
      content.includes('Human-friendly') &&
      content.includes('Strict validation') &&
      content.includes('USE BOTH TOGETHER'),
    component: YamlVsJsonDiagram,
  },
  {
    id: 'minimal-schema',
    detect: (content: string) =>
      content.includes('BAD: Overengineered') &&
      content.includes('GOOD: Just what you need') &&
      content.includes('decision-uuid'),
    component: MinimalSchemaDiagram,
  },
  {
    id: 'field-questions',
    detect: (content: string) =>
      content.includes('DECISION RECORD') &&
      content.includes('Which decision?') &&
      content.includes('What was decided?'),
    component: FieldQuestionsDiagram,
  },
  {
    id: 'normalized-vs-denormalized',
    detect: (content: string) =>
      content.includes('NORMALIZED') &&
      content.includes('DENORMALIZED') &&
      content.includes('participant_ids') &&
      content.includes('self-contained'),
    component: NormalizedVsDenormalizedDiagram,
  },
  {
    id: 'abbreviations',
    detect: (content: string) =>
      content.includes('BAD') &&
      content.includes('GOOD') &&
      content.includes('n: 1') &&
      content.includes('t: "Thing"') &&
      content.includes('s: "p"'),
    component: AbbreviationsDiagram,
  },
  {
    id: 'core-entities',
    detect: (content: string) =>
      content.includes('CORE ENTITIES') &&
      content.includes('DECISIONS') &&
      content.includes('DISCUSSIONS') &&
      content.includes('REPORTS'),
    component: CoreEntitiesDiagram,
  },
  {
    id: 'tracking-folder-structure',
    detect: (content: string) =>
      content.includes('.claude/data/') &&
      content.includes('decisions/') &&
      content.includes('discussions/') &&
      content.includes('schema.json'),
    component: TrackingFolderStructureDiagram,
  },
  {
    id: 'validation-flow',
    detect: (content: string) =>
      content.includes('VALIDATION FLOW') &&
      content.includes('Load data') &&
      content.includes('Make changes') &&
      content.includes('Validate') &&
      content.includes('Save'),
    component: ValidationFlowDiagram,
  },
  {
    id: 'before-after-tracking',
    detect: (content: string) =>
      content.includes('BEFORE TRACKING') &&
      content.includes('AFTER TRACKING') &&
      content.includes('scan 50 files') &&
      content.includes('one file read'),
    component: BeforeAfterTrackingDiagram,
  },
];
