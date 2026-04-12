import React, { useCallback, useMemo, useState } from 'react';
import {
  BOTTOM_TABS_LAB_SOURCES,
  type BottomTabsLabSourceId,
} from '../data/bottomTabsLabSources.generated';

/**
 * Local copy control — avoid `import { X } from 'nextra/components'` here, because that
 * barrel also exports `Mermaid` and can pull a broken `vendor-chunks/mermaid` chunk in dev SSR.
 */
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
  | { kind: 'file'; id: BottomTabsLabSourceId; label: string };

const TREE: TreeNode[] = [
  {
    kind: 'folder',
    label: 'navigation/bottomTabsLab',
    defaultOpen: true,
    children: [
      {
        kind: 'folder',
        label: 'shared',
        defaultOpen: true,
        children: [
          {
            kind: 'file',
            id: 'shared/PlanckBridgedTabBar.tsx',
            label: 'PlanckBridgedTabBar.tsx',
          },
        ],
      },
      {
        kind: 'folder',
        label: 'presets',
        defaultOpen: true,
        children: [
          { kind: 'file', id: 'presets/presetKeys.ts', label: 'presetKeys.ts' },
          { kind: 'file', id: 'presets/registry.ts', label: 'registry.ts' },
          {
            kind: 'folder',
            label: 'plankBarV1',
            defaultOpen: true,
            children: [
              {
                kind: 'file',
                id: 'presets/plankBarV1/PlankBarV1TabNavigator.tsx',
                label: 'PlankBarV1TabNavigator.tsx',
              },
              {
                kind: 'file',
                id: 'presets/plankBarV1/plankBarV1.types.ts',
                label: 'plankBarV1.types.ts',
              },
              {
                kind: 'file',
                id: 'presets/plankBarV1/plankBarV1.icons.tsx',
                label: 'plankBarV1.icons.tsx',
              },
              {
                kind: 'file',
                id: 'presets/plankBarV1/plankBarV1.styles.ts',
                label: 'plankBarV1.styles.ts',
              },
            ],
          },
        ],
      },
      {
        kind: 'file',
        id: 'BottomTabsLabNavigator.tsx',
        label: 'BottomTabsLabNavigator.tsx',
      },
      { kind: 'file', id: 'types.ts', label: 'types.ts' },
      {
        kind: 'file',
        id: 'bottomTabsLabDrawerChrome.tsx',
        label: 'bottomTabsLabDrawerChrome.tsx',
      },
    ],
  },
];

const ROOT_PREFIX = 'apps/example/src/navigation/bottomTabsLab';

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
  id: BottomTabsLabSourceId;
  label: string;
  depth: number;
  selected: BottomTabsLabSourceId | null;
  onSelect: (id: BottomTabsLabSourceId) => void;
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
  selected: BottomTabsLabSourceId | null;
  onSelect: (id: BottomTabsLabSourceId) => void;
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
  selected: BottomTabsLabSourceId | null;
  onSelect: (id: BottomTabsLabSourceId) => void;
}) {
  const [open, setOpen] = useState(node.kind === 'folder' ? node.defaultOpen !== false : true);
  if (node.kind === 'file') {
    return (
      <FileRow
        id={node.id}
        label={node.label}
        depth={depth}
        selected={selected}
        onSelect={onSelect}
      />
    );
  }
  return (
    <div>
      <FolderRow
        label={node.label}
        open={open}
        onToggle={() => setOpen(o => !o)}
        depth={depth}
      />
      {open ? (
        <Tree nodes={node.children} depth={depth + 1} selected={selected} onSelect={onSelect} />
      ) : null}
    </div>
  );
}

const defaultSelection: BottomTabsLabSourceId = 'shared/PlanckBridgedTabBar.tsx';

/**
 * Clickable file tree + source panel synced from the example app (`pnpm generate:sources` in docs).
 */
export function BottomTabsLabSourceExplorer() {
  const [selected, setSelected] = useState<BottomTabsLabSourceId | null>(defaultSelection);
  const source = useMemo(
    () => (selected ? BOTTOM_TABS_LAB_SOURCES[selected] : ''),
    [selected],
  );
  const fullPath = selected ? `${ROOT_PREFIX}/${selected}` : '';

  return (
    <div className="nx-not-prose nx-mt-4 nx-grid nx-gap-4 nx-border nx-border-gray-200 nx-rounded-lg nx-overflow-hidden dark:nx-border-neutral-800 md:nx-grid-cols-[minmax(220px,280px)_1fr]">
      <div
        className="nx-border-b nx-border-gray-200 nx-bg-gray-50 nx-p-3 dark:nx-border-neutral-800 dark:nx-bg-neutral-900/50 md:nx-border-b-0 md:nx-border-r"
        style={{ maxHeight: 'min(70vh, 520px)', overflowY: 'auto' }}
      >
        <div className="nx-mb-2 nx-text-xs nx-font-medium nx-text-gray-500 dark:nx-text-gray-400">
          Click a file to view full source (matches the example app).
        </div>
        <Tree nodes={TREE} depth={0} selected={selected} onSelect={setSelected} />
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
