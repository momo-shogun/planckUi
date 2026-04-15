import React, { useCallback, useMemo, useState } from 'react';
import { TABS_SOURCES, type TabsSourceId } from '../data/tabsSources.generated';

function SourceCopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={onCopy}
      title="Copy code"
      aria-label="Copy code to clipboard"
      className={`${className ?? ''} nx-text-xs nx-font-medium nx-text-gray-600 hover:nx-text-gray-900 dark:nx-text-gray-300 dark:hover:nx-text-white`}
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

type TreeNode =
  | { kind: 'folder'; label: string; defaultOpen?: boolean; children: TreeNode[] }
  | { kind: 'file'; id: TabsSourceId; label: string };

const TABS_TREE: TreeNode[] = [
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

const ZEPTO_TABS_TREE: TreeNode[] = [
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

function FolderRow({
  label,
  open,
  onToggle,
  depth,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  depth: number;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="nx-flex nx-w-full nx-items-center nx-gap-1 nx-rounded nx-py-1 nx-text-left nx-text-sm hover:nx-bg-gray-100 dark:hover:nx-bg-neutral-800/80"
      style={{ paddingLeft: 8 + depth * 16 }}
    >
      <span className="nx-text-gray-500" aria-hidden>
        {open ? '▾' : '▸'}
      </span>
      <span className="nx-font-medium nx-text-gray-800 dark:nx-text-gray-200">{label}</span>
    </button>
  );
}

function FileRow({
  id,
  label,
  depth,
  selected,
  onSelect,
}: {
  id: TabsSourceId;
  label: string;
  depth: number;
  selected: TabsSourceId | null;
  onSelect: (id: TabsSourceId) => void;
}) {
  const active = selected === id;
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={
        active
          ? 'nx-flex nx-w-full nx-items-center nx-rounded nx-py-1 nx-text-left nx-text-sm nx-bg-primary-500/15 nx-text-primary-600 dark:nx-bg-primary-500/20 dark:nx-text-primary-400'
          : 'nx-flex nx-w-full nx-items-center nx-rounded nx-py-1 nx-text-left nx-text-sm hover:nx-bg-gray-100 dark:hover:nx-bg-neutral-800/80 nx-text-gray-700 dark:nx-text-gray-300'
      }
      style={{ paddingLeft: 24 + depth * 16 }}
    >
      {label}
    </button>
  );
}

function Tree({
  nodes,
  depth,
  selected,
  onSelect,
}: {
  nodes: TreeNode[];
  depth: number;
  selected: TabsSourceId | null;
  onSelect: (id: TabsSourceId) => void;
}) {
  return (
    <>
      {nodes.map((node, i) => (
        <TreeBranch
          key={node.kind === 'folder' ? `${node.label}-${i}` : node.id}
          node={node}
          depth={depth}
          selected={selected}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}

function TreeBranch({
  node,
  depth,
  selected,
  onSelect,
}: {
  node: TreeNode;
  depth: number;
  selected: TabsSourceId | null;
  onSelect: (id: TabsSourceId) => void;
}) {
  const [open, setOpen] = useState(node.kind === 'folder' ? node.defaultOpen !== false : true);
  if (node.kind === 'file') {
    return (
      <FileRow id={node.id} label={node.label} depth={depth} selected={selected} onSelect={onSelect} />
    );
  }
  return (
    <div>
      <FolderRow label={node.label} open={open} onToggle={() => setOpen((o) => !o)} depth={depth} />
      {open ? <Tree nodes={node.children} depth={depth + 1} selected={selected} onSelect={onSelect} /> : null}
    </div>
  );
}

const defaultSelection: TabsSourceId = 'Tabs/Tabs.tsx';

function SourceExplorer({
  tree,
  defaultSelected,
}: {
  tree: TreeNode[];
  defaultSelected: TabsSourceId;
}) {
  const [selected, setSelected] = useState<TabsSourceId | null>(defaultSelected);
  const source = useMemo(() => (selected ? TABS_SOURCES[selected] : ''), [selected]);
  const fullPath = selected ? PATHS[selected] : '';

  return (
    <div className="nx-not-prose nx-mt-4 nx-grid nx-gap-4 nx-border nx-border-gray-200 nx-rounded-lg nx-overflow-hidden dark:nx-border-neutral-800 md:nx-grid-cols-[minmax(220px,280px)_1fr]">
      <div
        className="nx-border-b nx-border-gray-200 nx-bg-gray-50 nx-p-3 dark:nx-border-neutral-800 dark:nx-bg-neutral-900/50 md:nx-border-b-0 md:nx-border-r"
        style={{ maxHeight: 'min(70vh, 520px)', overflowY: 'auto' }}
      >
        <div className="nx-mb-2 nx-text-xs nx-font-medium nx-text-gray-500 dark:nx-text-gray-400">
          Click a file to view full source (matches the example app).
        </div>
        <Tree nodes={tree} depth={0} selected={selected} onSelect={setSelected} />
      </div>
      <div className="nx-flex nx-min-h-[280px] nx-flex-col nx-bg-white dark:nx-bg-neutral-950">
        {selected ? (
          <>
            <div className="nx-flex nx-items-center nx-justify-between nx-gap-2 nx-border-b nx-border-gray-200 nx-px-3 nx-py-2 dark:nx-border-neutral-800">
              <code className="nx-truncate nx-text-xs nx-text-gray-600 dark:nx-text-gray-400">
                {fullPath}
              </code>
              <SourceCopyButton
                text={source}
                className="nx-shrink-0 nx-rounded nx-px-2 nx-py-1.5 hover:nx-bg-gray-100 dark:hover:nx-bg-neutral-800"
              />
            </div>
            <pre
              className="nx-m-0 nx-flex-1 nx-overflow-auto nx-p-3 nx-text-xs nx-leading-relaxed"
              style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
            >
              <code className="nx-text-gray-900 dark:nx-text-gray-100">{source}</code>
            </pre>
          </>
        ) : (
          <div className="nx-flex nx-flex-1 nx-items-center nx-justify-center nx-p-6 nx-text-sm nx-text-gray-500">
            Select a file from the tree.
          </div>
        )}
      </div>
    </div>
  );
}

export function TabsCodeExplorer() {
  return <SourceExplorer tree={TABS_TREE} defaultSelected={defaultSelection} />;
}

export function ZeptoTabsCodeExplorer() {
  return <SourceExplorer tree={ZEPTO_TABS_TREE} defaultSelected="ZeptoTabs/ZeptoTabs.tsx" />;
}

