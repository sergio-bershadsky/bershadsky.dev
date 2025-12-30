import React from 'react';
import { Zap, Bot, RefreshCw, BookOpen, ArrowDown, CheckCircle, XCircle, Folder, FolderOpen, File, Package, GitBranch, Layers, Share2, Settings, Users, User, Braces, Hash, Type, List, ToggleLeft, Tag, Plus, Wrench, AlertTriangle } from 'lucide-react';
import { DiagramEntry } from '../diagramRegistry';

export const PluginEvolutionDiagram = () => (
  <div className="my-8 border border-primary/30 rounded-lg bg-black/40 p-5 diagram-mobile-scale">
    <div className="text-sm font-mono text-primary mb-4 flex justify-between">
      <span>FIG 7.0 // PLUGIN_EVOLUTION</span>
      <span className="text-xs text-muted-foreground">JOURNEY</span>
    </div>
    <div className="space-y-3">
      {[
        { stage: 1, label: 'Personal automation', quote: 'I have a /standup skill that works great', color: 'gray' },
        { stage: 2, label: 'Team interest', quote: 'Can I get that standup thing you have?', color: 'secondary' },
        { stage: 3, label: 'Sharing challenge', quote: "Here's 5 files, put them here, rename this...", color: 'yellow' },
        { stage: 4, label: 'Plugin solution', quote: 'Install my-standup-plugin. Done.', color: 'green' }
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm border ${
            item.color === 'green' ? 'border-green-500/50 bg-green-500/20 text-green-400' :
            item.color === 'yellow' ? 'border-yellow-500/50 bg-yellow-500/20 text-yellow-400' :
            item.color === 'secondary' ? 'border-secondary/50 bg-secondary/20 text-secondary' :
            'border-white/20 bg-white/5 text-gray-400'
          }`}>
            {item.stage}
          </div>
          <div className="flex-1">
            <div className={`font-mono text-xs uppercase ${
              item.color === 'green' ? 'text-green-400' :
              item.color === 'yellow' ? 'text-yellow-400' :
              item.color === 'secondary' ? 'text-secondary' :
              'text-gray-400'
            }`}>{item.label}</div>
            <div className="text-xs text-gray-500 italic">"{item.quote}"</div>
          </div>
          {i < 3 && <ArrowDown className="w-4 h-4 text-gray-600" />}
        </div>
      ))}
    </div>
  </div>
);

export const PluginFolderStructureDiagram = () => {
  const folders = [
    { name: 'plugin.json', icon: File, color: 'text-yellow-400', comment: 'Metadata & configuration' },
    { name: 'skills/', icon: FolderOpen, color: 'text-primary', children: [
      { name: 'standup/', icon: Folder, color: 'text-primary', children: [
        { name: 'SKILL.md', icon: File, color: 'text-gray-400' }
      ]},
      { name: 'recap/', icon: Folder, color: 'text-primary', children: [
        { name: 'SKILL.md', icon: File, color: 'text-gray-400' }
      ]}
    ]},
    { name: 'hooks/', icon: FolderOpen, color: 'text-secondary', children: [
      { name: 'freshness.md', icon: File, color: 'text-gray-400' },
      { name: 'sidebar-check.py', icon: File, color: 'text-gray-400' }
    ]},
    { name: 'agents/', icon: FolderOpen, color: 'text-accent', comment: 'Optional: specialized agents', children: [
      { name: 'reviewer/', icon: Folder, color: 'text-accent', children: [
        { name: 'AGENT.md', icon: File, color: 'text-gray-400' }
      ]}
    ]},
    { name: 'README.md', icon: File, color: 'text-gray-400', comment: 'Documentation' }
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
    <div className="my-8 border border-primary/30 rounded-lg bg-black/40 p-5 diagram-mobile-scale">
      <div className="text-sm font-mono text-primary mb-3 flex items-center gap-2">
        <Package className="w-4 h-4 text-primary" />
        <span>my-second-brain-plugin/</span>
        <span className="text-xs text-muted-foreground ml-auto">PLUGIN STRUCTURE</span>
      </div>
      <div className="space-y-0.5">
        {folders.map(folder => renderNode(folder))}
      </div>
    </div>
  );
};

export const PluginComponentsTable = () => (
  <div className="my-8 border border-secondary/30 rounded-lg bg-black/40 p-5 diagram-mobile-scale">
    <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
      <span>FIG 7.1 // KEY_COMPONENTS</span>
      <span className="text-xs text-muted-foreground">REFERENCE</span>
    </div>
    <div className="space-y-2">
      {[
        { component: 'plugin.json', purpose: 'Tells Claude what\'s included', icon: Settings },
        { component: 'skills/', purpose: 'Reusable procedures', icon: Zap },
        { component: 'hooks/', purpose: 'Automatic behaviors', icon: RefreshCw },
        { component: 'agents/', purpose: 'Specialized assistants', icon: Bot },
        { component: 'README.md', purpose: 'How to use this plugin', icon: BookOpen }
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-3 p-2 border border-white/10 rounded bg-white/5">
          <item.icon className="w-4 h-4 text-secondary flex-shrink-0" />
          <span className="font-mono text-sm text-white w-28">{item.component}</span>
          <span className="text-xs text-gray-400">{item.purpose}</span>
        </div>
      ))}
    </div>
  </div>
);

export const BeforeAfterPluginDiagram = () => {
  const beforeFolders = [
    { name: 'skills/', icon: FolderOpen, color: 'text-gray-400', children: [
      { name: 'standup/', icon: Folder, color: 'text-gray-500' }
    ]},
    { name: 'hooks/', icon: FolderOpen, color: 'text-gray-400', children: [
      { name: 'freshness.py', icon: File, color: 'text-gray-500' }
    ]}
  ];

  const afterFolders = [
    { name: 'plugin.json', icon: File, color: 'text-yellow-400', comment: 'NEW' },
    { name: 'skills/', icon: FolderOpen, color: 'text-green-400', children: [
      { name: 'standup/', icon: Folder, color: 'text-green-500' }
    ]},
    { name: 'hooks/', icon: FolderOpen, color: 'text-green-400', children: [
      { name: 'freshness.py', icon: File, color: 'text-green-500' }
    ]},
    { name: 'README.md', icon: File, color: 'text-green-400', comment: 'NEW' }
  ];

  const renderNode = (node: any, depth: number = 0, isGreen: boolean = false) => {
    const Icon = node.icon;
    const isFolder = node.children;
    
    return (
      <div key={node.name} className={depth > 0 ? 'ml-5' : ''}>
        <div className="flex items-center gap-2 py-0.5">
          <Icon className={`w-4 h-4 ${node.color} flex-shrink-0`} />
          <span className={`font-mono text-sm ${isFolder ? (isGreen ? 'text-green-300' : 'text-gray-300') : (isGreen ? 'text-green-400' : 'text-gray-400')}`}>
            {node.name}
          </span>
          {node.comment && (
            <span className="text-xs text-green-400 px-1.5 py-0.5 bg-green-500/20 rounded font-mono">{node.comment}</span>
          )}
        </div>
        {node.children && (
          <div className="border-l border-white/10 ml-2">
            {node.children.map((child: any) => renderNode(child, depth + 1, isGreen))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="my-8 border border-accent/30 rounded-lg bg-black/40 p-5 diagram-mobile-scale">
      <div className="text-sm font-mono text-accent mb-4 flex justify-between">
        <span>FIG 7.2 // BEFORE_AFTER</span>
        <span className="text-xs text-muted-foreground">ORGANIZATION</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border border-white/10 rounded bg-white/5">
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="font-mono text-xs text-red-400 uppercase">Before: Scattered</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <FolderOpen className="w-4 h-4 text-gray-400" />
            <span className="font-mono text-sm text-gray-300">your-second-brain/</span>
          </div>
          <div className="border-l border-white/10 ml-2 space-y-0.5">
            {beforeFolders.map(folder => renderNode(folder, 1, false))}
          </div>
        </div>
        <div className="p-4 border border-green-500/30 rounded bg-green-500/5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="font-mono text-xs text-green-400 uppercase">After: Packaged</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-green-400" />
            <span className="font-mono text-sm text-green-300">team-productivity-plugin/</span>
          </div>
          <div className="border-l border-green-500/20 ml-2 space-y-0.5">
            {afterFolders.map(folder => renderNode(folder, 1, true))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const DistributionOptionsDiagram = () => (
  <div className="my-8 border border-secondary/30 rounded-lg bg-black/40 p-5 diagram-mobile-scale">
    <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
      <span>FIG 7.3 // DISTRIBUTION_OPTIONS</span>
      <span className="text-xs text-muted-foreground">COMPARISON</span>
    </div>
    <div className="text-center mb-4 pb-4 border-b border-white/10">
      <div className="text-lg font-display font-semibold text-white mb-1">How do you want to share your plugin?</div>
      <div className="text-xs text-gray-400">Choose the distribution method that fits your team's workflow</div>
    </div>
    <div className="space-y-3">
      {[
        { 
          option: 'Git repository', 
          label: 'simplest',
          icon: GitBranch,
          pros: ['Version control built-in', 'Easy to update', 'No registry needed'],
          cons: ['Requires repo access', 'Manual versioning'],
          command: 'claude plugin install github.com/org/plugin-name'
        },
        { 
          option: 'Direct sharing', 
          label: 'offline',
          icon: Share2,
          pros: ['Works offline', 'No external dependencies'],
          cons: ['No automatic updates', 'Version confusion'],
          command: 'claude plugin install /path/to/plugin-folder'
        },
        { 
          option: 'Team registry', 
          label: 'advanced',
          icon: Layers,
          pros: ['Central discovery', 'Access control', 'Audit trail'],
          cons: ['Setup overhead', 'Maintenance burden'],
          command: 'claude plugin install @team/plugin-name'
        }
      ].map((item, i) => (
        <div key={i} className="p-3 border border-white/10 rounded bg-white/5">
          <div className="flex items-center gap-2 mb-2">
            <item.icon className="w-4 h-4 text-secondary" />
            <span className="font-mono text-sm text-white">{item.option}</span>
            <span className="text-xs text-gray-500 px-2 py-0.5 bg-white/10 rounded">{item.label}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="text-xs">
              {item.pros.map((pro, j) => (
                <div key={j} className="flex items-center gap-1 text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>{pro}</span>
                </div>
              ))}
            </div>
            <div className="text-xs">
              {item.cons.map((con, j) => (
                <div key={j} className="flex items-center gap-1 text-red-400">
                  <XCircle className="w-3 h-3" />
                  <span>{con}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="font-mono text-xs text-gray-500 bg-black/30 p-1.5 rounded">
            {item.command}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const PluginHierarchyDiagram = () => (
  <div className="my-8 border border-accent/30 rounded-lg bg-black/40 p-5 diagram-mobile-scale">
    <div className="text-sm font-mono text-accent mb-4 flex justify-between">
      <span>FIG 7.4 // PLUGIN_HIERARCHY</span>
      <span className="text-xs text-muted-foreground">PRIORITY</span>
    </div>
    <div className="space-y-2">
      {[
        { level: 'PROJECT PLUGINS', priority: 'highest priority', color: 'primary' },
        { level: 'TEAM PLUGINS', priority: '', color: 'secondary' },
        { level: 'PERSONAL PLUGINS', priority: 'lowest priority', color: 'accent' }
      ].map((item, i) => (
        <div key={i}>
          <div className={`p-3 border rounded text-center ${
            item.color === 'primary' ? 'border-primary/50 bg-primary/10' :
            item.color === 'secondary' ? 'border-secondary/50 bg-secondary/10' :
            'border-accent/50 bg-accent/10'
          }`}>
            <div className={`font-mono text-sm ${
              item.color === 'primary' ? 'text-primary' :
              item.color === 'secondary' ? 'text-secondary' :
              'text-accent'
            }`}>{item.level}</div>
            {item.priority && (
              <div className="text-xs text-gray-500 mt-1">({item.priority})</div>
            )}
          </div>
          {i < 2 && (
            <div className="flex justify-center py-1">
              <ArrowDown className="w-4 h-4 text-gray-600" />
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export const PluginPatternsTable = () => (
  <div className="my-8 border border-primary/30 rounded-lg bg-black/40 p-5 diagram-mobile-scale">
    <div className="text-sm font-mono text-primary mb-4 flex justify-between">
      <span>FIG 7.5 // PLUGIN_PATTERNS</span>
      <span className="text-xs text-muted-foreground">STRATEGIES</span>
    </div>
    <div className="space-y-2">
      {[
        { pattern: 'Team conventions', useCase: 'Standard skills for all projects', icon: Users },
        { pattern: 'Project-specific', useCase: 'Custom workflows for one project', icon: Folder },
        { pattern: 'Personal toolkit', useCase: 'Your own productivity hacks', icon: User }
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-3 p-2 border border-white/10 rounded bg-white/5">
          <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="font-mono text-sm text-white w-36">{item.pattern}</span>
          <span className="text-xs text-gray-400">{item.useCase}</span>
        </div>
      ))}
    </div>
  </div>
);

export const PluginConfigurationDiagram = () => {
  const configTree = [
    { 
      key: 'configuration', 
      icon: Settings, 
      color: 'text-secondary',
      children: [
        {
          key: 'standup_format',
          icon: Type,
          color: 'text-primary',
          children: [
            { key: 'description', value: 'Output format for standups', icon: BookOpen, color: 'text-gray-400' },
            { key: 'options', value: '["brief", "detailed"]', icon: List, color: 'text-green-400' },
            { key: 'default', value: '"brief"', icon: ToggleLeft, color: 'text-yellow-400' }
          ]
        },
        {
          key: 'freshness_days',
          icon: Hash,
          color: 'text-accent',
          children: [
            { key: 'description', value: 'Days before content is considered stale', icon: BookOpen, color: 'text-gray-400' },
            { key: 'type', value: '"number"', icon: Type, color: 'text-secondary' },
            { key: 'default', value: '30', icon: ToggleLeft, color: 'text-orange-400' }
          ]
        }
      ]
    }
  ];

  const renderNode = (node: any, depth: number = 0) => {
    const Icon = node.icon;
    const isObject = node.children;
    
    return (
      <div key={node.key} className={depth > 0 ? 'ml-5' : ''}>
        <div className="flex items-center gap-2 py-1">
          <Icon className={`w-4 h-4 ${node.color} flex-shrink-0`} />
          <span className={`font-mono text-sm ${isObject ? 'text-white' : 'text-secondary'}`}>
            {node.key}
          </span>
          {node.value && (
            <>
              <span className="text-gray-600">:</span>
              <span className={`font-mono text-sm ${
                node.value.startsWith('"') ? 'text-green-400' :
                node.value.startsWith('[') ? 'text-primary' :
                'text-orange-400'
              }`}>
                {node.value}
              </span>
            </>
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
    <div className="my-8 border border-secondary/30 rounded-lg bg-black/40 p-5 diagram-mobile-scale">
      <div className="text-sm font-mono text-secondary mb-3 flex items-center gap-2">
        <Braces className="w-4 h-4 text-secondary" />
        <span>plugin.json</span>
        <span className="text-xs text-muted-foreground ml-auto">CONFIGURATION</span>
      </div>
      <div className="space-y-0.5">
        {configTree.map(node => renderNode(node))}
      </div>
    </div>
  );
};

export const VersionTimelineDiagram = () => {
  const versions = [
    { version: '1.0.0', type: 'initial', description: 'Initial release', icon: Tag, color: 'gray' },
    { version: '1.1.0', type: 'minor', description: 'Added new skill', icon: Plus, color: 'green' },
    { version: '1.2.0', type: 'minor', description: 'New configuration option', icon: Wrench, color: 'secondary' },
    { version: '2.0.0', type: 'major', description: 'Breaking change (different output format)', icon: AlertTriangle, color: 'yellow' }
  ];

  return (
    <div className="my-8 border border-secondary/30 rounded-lg bg-black/40 p-5 diagram-mobile-scale">
      <div className="text-sm font-mono text-secondary mb-4 flex justify-between">
        <span>FIG 7.6 // VERSION_HISTORY</span>
        <span className="text-xs text-muted-foreground">CHANGELOG</span>
      </div>
      <div className="text-center mb-4 pb-3 border-b border-white/10">
        <div className="text-sm font-display font-semibold text-white">Semantic Versioning for Plugins</div>
        <div className="text-xs text-gray-400">MAJOR.MINOR.PATCH</div>
      </div>
      <div className="space-y-3">
          {versions.map((v, i) => {
            const Icon = v.icon;
            const colorClasses = {
              gray: 'border-gray-500/50 bg-gray-500/20 text-gray-400',
              green: 'border-green-500/50 bg-green-500/20 text-green-400',
              secondary: 'border-secondary/50 bg-secondary/20 text-secondary',
              yellow: 'border-yellow-500/50 bg-yellow-500/20 text-yellow-400'
            };
            return (
              <div key={i} className="flex items-start gap-3">
                <div className={`px-2 py-1 rounded font-mono text-sm font-bold ${colorClasses[v.color as keyof typeof colorClasses]}`}>
                  {v.version}
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${v.color === 'gray' ? 'text-gray-400' : v.color === 'green' ? 'text-green-400' : v.color === 'secondary' ? 'text-secondary' : 'text-yellow-400'}`} />
                    <span className="text-sm text-gray-300">{v.description}</span>
                  </div>
                  {v.type === 'major' && (
                    <div className="text-xs text-yellow-400/70 mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Breaking change - update with caution
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
    </div>
  );
};

export const detectVersionTimeline = (content: string) =>
  content.includes('1.0.0') && content.includes('→') && 
  (content.includes('Initial release') || content.includes('Breaking change'));

export const detectPluginEvolution = (content: string) => 
  content.includes('STAGE 1') && content.includes('STAGE 2') && content.includes('Personal automation') && content.includes('Plugin solution');

export const detectPluginFolderStructure = (content: string) => 
  content.includes('my-second-brain-plugin/') && content.includes('plugin.json') && content.includes('skills/');

export const detectPluginComponents = (content: string) => 
  content.includes('COMPONENT') && content.includes('PURPOSE') && content.includes('plugin.json') && content.includes('Tells Claude');

export const detectBeforeAfterPlugin = (content: string) => 
  content.includes('Before:') && content.includes('After:') && content.includes('your-second-brain/') && content.includes('team-productivity-plugin/');

export const detectDistributionOptions = (content: string) => 
  (content.includes('Option 1:') || content.includes('Option 2:') || content.includes('Option 3:')) && 
  (content.includes('Git repository') || content.includes('Direct sharing') || content.includes('Team registry')) &&
  content.includes('Pros:') && content.includes('Cons:');

export const detectPluginHierarchy = (content: string) => 
  content.includes('PROJECT PLUGINS') && content.includes('TEAM PLUGINS') && content.includes('PERSONAL PLUGINS') && content.includes('highest priority');

export const detectPluginPatterns = (content: string) => 
  content.includes('PATTERN') && content.includes('USE CASE') && content.includes('Team conventions') && content.includes('Project-specific');

export const detectPluginConfiguration = (content: string) => 
  content.includes('"configuration"') && content.includes('standup_format') && content.includes('freshness_days');

export const pluginsDiagramEntries: DiagramEntry[] = [
  { id: 'version-timeline', detect: detectVersionTimeline, component: VersionTimelineDiagram },
  { id: 'plugin-evolution', detect: detectPluginEvolution, component: PluginEvolutionDiagram },
  { id: 'plugin-folder-structure', detect: detectPluginFolderStructure, component: PluginFolderStructureDiagram },
  { id: 'plugin-components', detect: detectPluginComponents, component: PluginComponentsTable },
  { id: 'before-after-plugin', detect: detectBeforeAfterPlugin, component: BeforeAfterPluginDiagram },
  { id: 'distribution-options', detect: detectDistributionOptions, component: DistributionOptionsDiagram },
  { id: 'plugin-hierarchy', detect: detectPluginHierarchy, component: PluginHierarchyDiagram },
  { id: 'plugin-patterns', detect: detectPluginPatterns, component: PluginPatternsTable },
  { id: 'plugin-configuration', detect: detectPluginConfiguration, component: PluginConfigurationDiagram },
];
