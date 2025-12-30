import React from 'react';

export interface DiagramEntry {
  id: string;
  detect: (content: string) => boolean;
  component: React.ComponentType<any>;
  passContent?: boolean;
}

const registry: DiagramEntry[] = [];

export function registerDiagram(entry: DiagramEntry) {
  registry.push(entry);
}

export function registerDiagrams(entries: DiagramEntry[]) {
  entries.forEach(entry => registry.push(entry));
}

export function findDiagram(content: string): DiagramEntry | undefined {
  return registry.find(entry => entry.detect(content));
}

export function getDiagramRegistry(): DiagramEntry[] {
  return registry;
}

export { coreDiagramEntries } from './diagrams/core';
export { connectionsDiagramEntries } from './diagrams/connections';
export { skillsDiagramEntries } from './diagrams/skills';
export { hooksDiagramEntries } from './diagrams/hooks';
export { pluginsDiagramEntries } from './diagrams/plugins';
