import React from 'react';
import { TABS_SOURCES, type TabsSourceId } from '../data/tabsSources.generated';
import { SourceExplorer } from './source-explorer/SourceExplorer';
import type { SourceTreeNode } from './source-explorer/types';

const TABS_TREE: SourceTreeNode<TabsSourceId>[] = [
  {
    kind: 'folder',
    label: 'packages/core/src/components/Tabs',
    defaultOpen: true,
    children: [
      {
        kind: 'folder',
        label: 'Tabs',
        defaultOpen: true,
        children: [
          { kind: 'file', id: 'Tabs/Tabs.tsx', label: 'Tabs.tsx' },
          { kind: 'file', id: 'Tabs/Tabs.styles.ts', label: 'Tabs.styles.ts' },
          { kind: 'file', id: 'Tabs/Tabs.types.ts', label: 'Tabs.types.ts' },
        ],
      },
    ],
  },
];

const ZEPTO_TABS_TREE: SourceTreeNode<TabsSourceId>[] = [
  {
    kind: 'folder',
    label: 'packages/core/src/components/Tabs',
    defaultOpen: true,
    children: [
      {
        kind: 'folder',
        label: 'ZeptoTabs',
        defaultOpen: true,
        children: [
          { kind: 'file', id: 'ZeptoTabs/ZeptoTabs.tsx', label: 'ZeptoTabs.tsx' },
          { kind: 'file', id: 'ZeptoTabs/ZeptoTabs.styles.ts', label: 'ZeptoTabs.styles.ts' },
          { kind: 'file', id: 'ZeptoTabs/ZeptoTabs.types.ts', label: 'ZeptoTabs.types.ts' },
        ],
      },
    ],
  },
  {
    kind: 'folder',
    label: 'packages/core/src',
    defaultOpen: true,
    children: [{ kind: 'file', id: 'entry/zepto-tabs.ts', label: 'zepto-tabs.ts' }],
  },
  {
    kind: 'folder',
    label: 'apps/example/src/screens/tabsLab',
    defaultOpen: true,
    children: [{ kind: 'file', id: 'example/ZeptoTabsSection.tsx', label: 'ZeptoTabsSection.tsx' }],
  },
];

const PATHS: Record<TabsSourceId, string> = {
  'Tabs/Tabs.tsx': 'packages/core/src/components/Tabs/Tabs/Tabs.tsx',
  'Tabs/Tabs.styles.ts': 'packages/core/src/components/Tabs/Tabs/Tabs.styles.ts',
  'Tabs/Tabs.types.ts': 'packages/core/src/components/Tabs/Tabs/Tabs.types.ts',
  'ZeptoTabs/ZeptoTabs.tsx': 'packages/core/src/components/Tabs/ZeptoTabs/ZeptoTabs.tsx',
  'ZeptoTabs/ZeptoTabs.styles.ts': 'packages/core/src/components/Tabs/ZeptoTabs/ZeptoTabs.styles.ts',
  'ZeptoTabs/ZeptoTabs.types.ts': 'packages/core/src/components/Tabs/ZeptoTabs/ZeptoTabs.types.ts',
  'entry/zepto-tabs.ts': 'packages/core/src/zepto-tabs.ts',
  'example/ZeptoTabsSection.tsx': 'apps/example/src/screens/tabsLab/ZeptoTabsSection.tsx',
};

export function TabsCodeExplorer() {
  return (
    <SourceExplorer
      title="Explorer"
      tree={TABS_TREE}
      defaultSelected="Tabs/Tabs.tsx"
      sources={TABS_SOURCES}
      paths={PATHS}
    />
  );
}

export function ZeptoTabsCodeExplorer() {
  return (
    <SourceExplorer
      title="Explorer"
      tree={ZEPTO_TABS_TREE}
      defaultSelected="ZeptoTabs/ZeptoTabs.tsx"
      sources={TABS_SOURCES}
      paths={PATHS}
    />
  );
}

