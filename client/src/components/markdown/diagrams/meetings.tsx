import React from 'react';
import { FileText, ArrowRight, Brain, Mic, CheckCircle, HelpCircle, Users, Calendar, Clock, ListTodo, AlertTriangle } from 'lucide-react';
import type { DiagramEntry } from '../diagramRegistry';

export const MeetingRealityDiagram = () => (
  <div className="my-8 border border-red-500/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-red-400 mb-4 flex justify-between">
      <span>FIG 10.1 // MEETING_KNOWLEDGE_REALITY</span>
      <span className="text-xs text-muted-foreground">PROBLEM</span>
    </div>
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <div className="flex items-center gap-2 px-3 py-2 border border-gray-600 rounded bg-gray-800/50">
          <Mic className="w-4 h-4 text-primary" />
          <span className="text-xs text-gray-300">Meeting happens</span>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-500" />
        <div className="flex items-center gap-2 px-3 py-2 border border-gray-600 rounded bg-gray-800/50">
          <FileText className="w-4 h-4 text-secondary" />
          <span className="text-xs text-gray-300">Transcript exists</span>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-500" />
        <div className="flex items-center gap-2 px-3 py-2 border border-red-500/30 rounded bg-red-500/10">
          <HelpCircle className="w-4 h-4 text-red-400" />
          <span className="text-xs text-red-400">???</span>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-500" />
        <div className="flex items-center gap-2 px-3 py-2 border border-red-500/30 rounded bg-red-500/10">
          <span className="text-xs text-red-400">"What did we decide?"</span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
        <AlertTriangle className="w-3 h-3" />
        <span>Nobody reads the transcript</span>
      </div>
    </div>
  </div>
);

export const MeetingIdealDiagram = () => (
  <div className="my-8 border border-green-500/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-green-400 mb-4 flex justify-between">
      <span>FIG 10.2 // MEETING_KNOWLEDGE_IDEAL</span>
      <span className="text-xs text-muted-foreground">SOLUTION</span>
    </div>
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <div className="text-center">
          <div className="px-3 py-2 border border-primary/40 rounded bg-primary/10 mb-1">
            <span className="text-xs text-primary">Meeting</span>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-500" />
        <div className="text-center">
          <div className="px-3 py-2 border border-secondary/40 rounded bg-secondary/10 mb-1">
            <span className="text-xs text-secondary">Transcript</span>
          </div>
          <span className="text-[10px] text-gray-500">Auto-processed</span>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-500" />
        <div className="text-center">
          <div className="px-3 py-2 border border-accent/40 rounded bg-accent/10 mb-1">
            <span className="text-xs text-accent">Structured Doc</span>
          </div>
          <span className="text-[10px] text-gray-500">With context</span>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-500" />
        <div className="text-center">
          <div className="px-3 py-2 border border-green-500/40 rounded bg-green-500/10 mb-1">
            <span className="text-xs text-green-400">Decisions</span>
          </div>
          <span className="text-[10px] text-gray-500">Linked to ADRs</span>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-500" />
        <div className="text-center">
          <div className="px-3 py-2 border border-green-500/40 rounded bg-green-500/10 mb-1">
            <CheckCircle className="w-4 h-4 text-green-400 mx-auto" />
          </div>
          <span className="text-[10px] text-gray-500">Searchable</span>
        </div>
      </div>
    </div>
  </div>
);

export const TranscriptionPipelineDiagram = () => (
  <div className="my-8 border border-secondary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
      <span>FIG 10.3 // TRANSCRIPTION_PIPELINE</span>
      <span className="text-xs text-muted-foreground">ARCHITECTURE</span>
    </div>
    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
      <div className="text-center">
        <div className="w-24 h-20 border border-primary/40 rounded-lg bg-primary/10 flex flex-col items-center justify-center">
          <Mic className="w-6 h-6 text-primary mb-1" />
          <span className="text-xs text-primary">MEETING</span>
        </div>
        <span className="text-[10px] text-gray-500 mt-1 block">Recording captured</span>
      </div>
      <ArrowRight className="w-5 h-5 text-gray-500" />
      <div className="text-center">
        <div className="w-24 h-20 border border-secondary/40 rounded-lg bg-secondary/10 flex flex-col items-center justify-center">
          <FileText className="w-6 h-6 text-secondary mb-1" />
          <span className="text-xs text-secondary">TRANSCRIPT</span>
        </div>
        <span className="text-[10px] text-gray-500 mt-1 block">Raw text generated</span>
      </div>
      <ArrowRight className="w-5 h-5 text-gray-500" />
      <div className="text-center">
        <div className="w-24 h-20 border border-accent/40 rounded-lg bg-accent/10 flex flex-col items-center justify-center">
          <Brain className="w-6 h-6 text-accent mb-1" />
          <span className="text-xs text-accent">SECOND BRAIN</span>
        </div>
        <span className="text-[10px] text-gray-500 mt-1 block">Structured document</span>
      </div>
    </div>
  </div>
);

export const DocumentStructureDiagram = () => (
  <div className="my-8 border border-accent/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-accent mb-4 flex justify-between">
      <span>FIG 10.4 // DOCUMENT_STRUCTURE</span>
      <span className="text-xs text-muted-foreground">TEMPLATE</span>
    </div>
    <div className="space-y-2">
      {[
        { section: 'FRONTMATTER', purpose: 'Basic metadata, searchable', color: 'text-gray-400' },
        { section: 'CONTEXT', purpose: 'Why this meeting happened', color: 'text-secondary' },
        { section: 'DISCUSSION', purpose: 'What was talked about', color: 'text-primary' },
        { section: 'DECISIONS', purpose: 'What was concluded', color: 'text-green-400' },
        { section: 'ACTION ITEMS', purpose: 'What needs to happen', color: 'text-yellow-400' },
        { section: 'OPEN QUESTIONS', purpose: 'What wasn\'t resolved', color: 'text-accent' },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-4">
          <span className={`text-xs font-mono w-28 ${item.color}`}>{item.section}</span>
          <span className="text-xs text-gray-400">{item.purpose}</span>
        </div>
      ))}
    </div>
  </div>
);

export const meetingsDiagramEntries: DiagramEntry[] = [
  {
    id: 'meeting-reality',
    detect: (content: string) =>
      content.includes('MEETING KNOWLEDGE REALITY') &&
      content.includes('───────────────────────────────────────────────────────────────') &&
      content.includes('Meeting happens') &&
      content.includes('Nobody reads it'),
    component: MeetingRealityDiagram,
  },
  {
    id: 'meeting-ideal',
    detect: (content: string) =>
      content.includes('MEETING KNOWLEDGE IDEAL') &&
      content.includes('───────────────────────────────────────────────────────────────') &&
      content.includes('Meeting') &&
      content.includes('Transcript') &&
      content.includes('Structured Doc') &&
      content.includes('Linked to ADRs'),
    component: MeetingIdealDiagram,
  },
  {
    id: 'transcription-pipeline',
    detect: (content: string) =>
      content.includes('TRANSCRIPTION PIPELINE') &&
      content.includes('────────────────────────────────────────────────────────────') &&
      content.includes('MEETING') &&
      content.includes('TRANSCRIPT') &&
      content.includes('SECOND') &&
      content.includes('BRAIN'),
    component: TranscriptionPipelineDiagram,
  },
  {
    id: 'document-structure',
    detect: (content: string) =>
      content.includes('DISCUSSION DOCUMENT STRUCTURE') &&
      content.includes('─────────────────────────────────────────────────') &&
      content.includes('SECTION') &&
      content.includes('PURPOSE') &&
      content.includes('FRONTMATTER') &&
      content.includes('OPEN QUESTIONS'),
    component: DocumentStructureDiagram,
  },
];
