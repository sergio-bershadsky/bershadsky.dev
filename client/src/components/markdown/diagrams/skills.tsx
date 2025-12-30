import React from 'react';
import { Search, FileText, Lightbulb, Zap, ClipboardList, File, RefreshCw, CheckCircle, XCircle, Folder, FolderOpen, ArrowDown } from 'lucide-react';
import { DiagramEntry } from '../diagramRegistry';

export const SkillPatternsDiagram = () => (
  <div className="my-8 border border-accent/30 rounded-lg bg-black/40 p-5 diagram-mobile-scale">
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

export const WithoutVsWithSkillsDiagram = () => (
  <div className="my-8 border border-white/20 rounded-lg bg-black/40 p-5 diagram-mobile-scale">
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

export const SkillCandidatesDiagram = () => (
  <div className="my-8 border border-white/20 rounded-lg bg-black/40 p-5 diagram-mobile-scale">
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

export const SkillCreationWorkflowDiagram = () => (
  <div className="my-8 border border-primary/30 rounded-lg bg-black/40 p-5">
    <div className="text-sm font-mono text-primary mb-4 flex justify-between">
      <span>FIG 5.4 // SKILL_CREATION</span>
      <span className="text-xs text-muted-foreground">WORKFLOW</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      {[
        { num: 1, text: 'Identify a task you do repeatedly', icon: Search },
        { num: 2, text: 'Write out the steps (as if teaching someone)', icon: FileText },
        { num: 3, text: 'Define the expected output format', icon: ClipboardList },
        { num: 4, text: 'Create the skill file', icon: File },
        { num: 5, text: 'Test and refine', icon: RefreshCw },
      ].map((step, i, arr) => (
        <React.Fragment key={i}>
          <div className="flex items-center gap-4 p-3 border border-primary/30 rounded-lg bg-primary/5 w-full max-w-md">
            <div className="w-8 h-8 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-mono font-bold text-sm">{step.num}</span>
            </div>
            <step.icon className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-sm text-gray-300">{step.text}</span>
          </div>
          {i < arr.length - 1 && (
            <ArrowDown className="w-5 h-5 text-primary/50" />
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

export const SkillsFolderStructureDiagram = () => {
  const folders = [
    { name: 'skills/', icon: FolderOpen, color: 'text-primary', children: [
      { name: 'standup/', icon: Folder, color: 'text-cyan-400', comment: 'Daily standup generator', children: [
        { name: 'SKILL.md', icon: File, color: 'text-green-400' }
      ]},
      { name: 'recap/', icon: Folder, color: 'text-secondary', comment: 'Weekly summary', children: [
        { name: 'SKILL.md', icon: File, color: 'text-green-400' }
      ]},
      { name: 'README.md', icon: File, color: 'text-gray-400', comment: 'Skills index' }
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
        <span className="text-xs text-muted-foreground ml-auto">SKILLS STRUCTURE</span>
      </div>
      <div className="space-y-0.5">
        {folders.map(folder => renderNode(folder))}
      </div>
    </div>
  );
};

export const detectSkillPatterns = (content: string) => 
  content.includes('SKILL PATTERNS') && content.includes('GATHER') && content.includes('GENERATE') && content.includes('ANALYZE');

export const detectWithoutVsWithSkills = (content: string) => 
  content.includes('WITHOUT SKILLS') && content.includes('WITH SKILLS') && content.includes('/recap');

export const detectSkillCandidates = (content: string) => 
  content.includes('REPETITIVE + STRUCTURED') && content.includes('Weekly reporting');

export const detectSkillCreationWorkflow = (content: string) => 
  content.includes('Identify a task you do repeatedly') && content.includes('Test and refine');

export const detectSkillsFolderStructure = (content: string) => 
  content.includes('your-second-brain/') && content.includes('skills/') && content.includes('SKILL.md');

export const skillsDiagramEntries: DiagramEntry[] = [
  { id: 'skill-patterns', detect: detectSkillPatterns, component: SkillPatternsDiagram },
  { id: 'without-vs-with-skills', detect: detectWithoutVsWithSkills, component: WithoutVsWithSkillsDiagram },
  { id: 'skill-candidates', detect: detectSkillCandidates, component: SkillCandidatesDiagram },
  { id: 'skill-creation-workflow', detect: detectSkillCreationWorkflow, component: SkillCreationWorkflowDiagram },
  { id: 'skills-folder-structure', detect: detectSkillsFolderStructure, component: SkillsFolderStructureDiagram },
];
