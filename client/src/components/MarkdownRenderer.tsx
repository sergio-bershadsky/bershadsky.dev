export { MarkdownRenderer } from './markdown/MarkdownRenderer';
export { CyberCodeBlock, ChatConversationDiagram, highlightPython } from './markdown/CodeBlock';
export { DiagramBox, DiagramFrame, TwoColumnComparison, StepList, IconRow, FolderTree } from './markdown/primitives';
export { 
  registerDiagram, 
  registerDiagrams, 
  findDiagram, 
  getDiagramRegistry,
  coreDiagramEntries,
  connectionsDiagramEntries,
  skillsDiagramEntries,
  hooksDiagramEntries,
  pluginsDiagramEntries
} from './markdown/diagramRegistry';
export type { DiagramEntry } from './markdown/diagramRegistry';

export {
  SecondBrainArchitectureDiagram,
  AIComparisonDiagram,
  ThreePillarsDiagram,
  DecisionAnatomyDiagram,
  KnowledgeFlowDiagram,
  CurrentKnowledgeDiagram,
  HistoricalRecordDiagram,
  DecisionLifecycleDiagram,
  FolderStructureDiagram,
  SessionFlowDiagram,
  ProcessStepsDiagram,
  DocumentVsJustDoItDiagram,
  GoodVsSkipDiagram,
} from './markdown/diagrams/core';

export {
  MCPFlowDiagram,
  ConnectionTypesTable,
  DataFlowDiagram,
  CapabilitiesTable,
} from './markdown/diagrams/connections';

export {
  SkillPatternsDiagram,
  WithoutVsWithSkillsDiagram,
  SkillCandidatesDiagram,
  SkillCreationWorkflowDiagram,
  SkillsFolderStructureDiagram,
} from './markdown/diagrams/skills';

export {
  SkillsVsHooksDiagram,
  HookEventsTable,
  HookTimelineDiagram,
  HookFlowDiagram,
  GoodFirstHooksDiagram,
  HooksFolderStructureDiagram,
  HookSpectrumDiagram,
} from './markdown/diagrams/hooks';

export {
  PluginEvolutionDiagram,
  PluginFolderStructureDiagram,
  PluginComponentsTable,
  BeforeAfterPluginDiagram,
  DistributionOptionsDiagram,
  PluginHierarchyDiagram,
  PluginPatternsTable,
} from './markdown/diagrams/plugins';
