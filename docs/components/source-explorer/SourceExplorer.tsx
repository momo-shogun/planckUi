import React, { useCallback, useMemo, useState } from 'react';

export type SourceTreeNode<Id extends string> =
  | { kind: 'folder'; label: string; defaultOpen?: boolean; children: SourceTreeNode<Id>[] }
  | { kind: 'file'; id: Id; label: string };

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconFile({ active }: { active?: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path
        d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"
        stroke={active ? 'currentColor' : '#6b7280'}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M14 2v5a1 1 0 0 0 1 1h5" stroke={active ? 'currentColor' : '#6b7280'} strokeWidth="1.5" />
    </svg>
  );
}

function IconFolder({ open }: { open: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      {open ? (
        <path
          d="M3 8.5C3 7.67 3.67 7 4.5 7H10l2 2h7.5c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5V8.5Z"
          stroke="#e2a84b"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="#e2a84b18"
        />
      ) : (
        <path
          d="M3 7c0-.83.67-1.5 1.5-1.5H10l2 2h8.5c.83 0 1.5.67 1.5 1.5V19c0 .83-.67 1.5-1.5 1.5h-17A1.5 1.5 0 0 1 3 19V7Z"
          stroke="#e2a84b"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="#e2a84b18"
        />
      )}
    </svg>
  );
}

function IconSearch() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <circle cx="10.5" cy="10.5" r="6.5" stroke="#6b7280" strokeWidth="1.5" />
      <path d="M16 16 21 21" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      style={{ flexShrink: 0, transition: 'transform 150ms', transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
    >
      <path d="M9 6l6 6-6 6" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconWrap({ active }: { active: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 6h18M3 12h13a3 3 0 0 1 0 6H14l2-2m0 4-2-2"
        stroke={active ? '#60a5fa' : 'currentColor'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3 18h5" stroke={active ? '#60a5fa' : 'currentColor'} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconCopy() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function flattenFileIds<Id extends string>(nodes: SourceTreeNode<Id>[]): Id[] {
  const out: Id[] = [];
  const walk = (n: SourceTreeNode<Id>[]) => {
    for (const node of n) {
      if (node.kind === 'file') out.push(node.id);
      else walk(node.children);
    }
  };
  walk(nodes);
  return out;
}

function filterTree<Id extends string>(nodes: SourceTreeNode<Id>[], q: string): SourceTreeNode<Id>[] {
  const query = q.trim().toLowerCase();
  if (!query) return nodes;
  const walk = (n: SourceTreeNode<Id>[]): SourceTreeNode<Id>[] => {
    const out: SourceTreeNode<Id>[] = [];
    for (const node of n) {
      if (node.kind === 'file') {
        if (node.label.toLowerCase().includes(query)) out.push(node);
        continue;
      }
      const children = walk(node.children);
      if (children.length > 0 || node.label.toLowerCase().includes(query)) {
        out.push({ ...node, defaultOpen: true, children });
      }
    }
    return out;
  };
  return walk(nodes);
}

function getFileExtension(label: string): string {
  return label.split('.').pop()?.toLowerCase() ?? '';
}

function getExtensionColor(ext: string): string {
  const map: Record<string, string> = {
    ts: '#60a5fa',
    tsx: '#60a5fa',
    js: '#fbbf24',
    jsx: '#fbbf24',
    css: '#a78bfa',
    scss: '#a78bfa',
    json: '#34d399',
    md: '#94a3b8',
    html: '#f97316',
    py: '#4ade80',
    rs: '#fb923c',
    go: '#22d3ee',
    svg: '#f472b6',
  };
  return map[ext] ?? '#94a3b8';
}

function HighlightedLabel({ label, query }: { label: string; query: string }) {
  if (!query) return <span>{label}</span>;
  const idx = label.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{label}</span>;
  return (
    <span>
      {label.slice(0, idx)}
      <span style={{ background: '#fbbf2430', color: '#fbbf24', borderRadius: 2 }}>
        {label.slice(idx, idx + query.length)}
      </span>
      {label.slice(idx + query.length)}
    </span>
  );
}

// ─── Copy Button ──────────────────────────────────────────────────────────────

function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard failures (unsupported / denied)
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={onCopy}
      title="Copy code"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '4px 10px',
        background: copied ? '#10b98120' : 'transparent',
        border: `1px solid ${copied ? '#10b98140' : '#ffffff14'}`,
        borderRadius: 6,
        color: copied ? '#10b981' : '#9ca3af',
        fontSize: 11,
        fontFamily: 'inherit',
        cursor: 'pointer',
        transition: 'all 150ms',
        whiteSpace: 'nowrap',
      }}
    >
      <IconCopy />
      {copied ? 'Copied!' : label}
    </button>
  );
}

// ─── Tree Components ──────────────────────────────────────────────────────────

function FolderRow({
  label,
  open,
  onToggle,
  depth,
  query,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  depth: number;
  query: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        gap: 6,
        padding: '4px 8px',
        paddingLeft: 8 + depth * 14,
        background: hovered ? '#ffffff08' : 'transparent',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'background 100ms',
        userSelect: 'none',
      }}
    >
      <IconChevron open={open} />
      <IconFolder open={open} />
      <span style={{ fontSize: 12.5, color: '#e5e7eb', fontWeight: 400 }}>
        <HighlightedLabel label={label} query={query} />
      </span>
    </button>
  );
}

function FileRow<Id extends string>({
  id,
  label,
  depth,
  selected,
  onSelect,
  query,
}: {
  id: Id;
  label: string;
  depth: number;
  selected: Id | null;
  onSelect: (id: Id) => void;
  query: string;
}) {
  const active = selected === id;
  const [hovered, setHovered] = useState(false);
  const ext = getFileExtension(label);
  const extColor = getExtensionColor(ext);

  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        gap: 6,
        padding: '4px 8px',
        paddingLeft: 24 + depth * 14,
        background: active ? '#3b82f615' : hovered ? '#ffffff08' : 'transparent',
        borderLeft: `2px solid ${active ? '#3b82f6' : 'transparent'}`,
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 100ms',
        userSelect: 'none',
      }}
    >
      <span style={{ color: extColor }}>
        <IconFile active={active} />
      </span>
      <span
        style={{
          fontSize: 12.5,
          color: active ? '#e2e8f0' : '#9ca3af',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          flex: 1,
        }}
      >
        <HighlightedLabel label={label} query={query} />
      </span>
    </button>
  );
}

function Tree<Id extends string>({
  nodes,
  depth,
  selected,
  onSelect,
  query,
}: {
  nodes: SourceTreeNode<Id>[];
  depth: number;
  selected: Id | null;
  onSelect: (id: Id) => void;
  query: string;
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
          query={query}
        />
      ))}
    </>
  );
}

function TreeBranch<Id extends string>({
  node,
  depth,
  selected,
  onSelect,
  query,
}: {
  node: SourceTreeNode<Id>;
  depth: number;
  selected: Id | null;
  onSelect: (id: Id) => void;
  query: string;
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
        query={query}
      />
    );
  }

  return (
    <div>
      <FolderRow
        label={node.label}
        open={open}
        onToggle={() => setOpen((o) => !o)}
        depth={depth}
        query={query}
      />
      {open && (
        <Tree nodes={node.children} depth={depth + 1} selected={selected} onSelect={onSelect} query={query} />
      )}
    </div>
  );
}

// ─── Tab ──────────────────────────────────────────────────────────────────────

function Tab<Id extends string>({
  id,
  active,
  path,
  onSelect,
  onClose,
  canClose,
}: {
  id: Id;
  active: boolean;
  path: string;
  onSelect: (id: Id) => void;
  onClose: (id: Id) => void;
  canClose: boolean;
}) {
  const label = String(id).split('/').pop() ?? String(id);
  const ext = getFileExtension(label);
  const extColor = getExtensionColor(ext);
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={path}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '0 12px',
        height: 36,
        background: active ? '#111827' : hovered ? '#1f2937' : 'transparent',
        border: 'none',
        borderBottom: `1px solid ${active ? '#111827' : 'transparent'}`,
        borderTop: `1px solid ${active ? '#374151' : 'transparent'}`,
        borderLeft: '1px solid transparent',
        borderRight: '1px solid transparent',
        cursor: 'pointer',
        color: active ? '#e5e7eb' : '#6b7280',
        fontSize: 12,
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        transition: 'all 100ms',
        position: 'relative',
        marginBottom: active ? -1 : 0,
      }}
    >
      <span style={{ color: extColor }}>
        <IconFile active={active} />
      </span>
      <span style={{ maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>
      {canClose && (
        <span
          role="button"
          tabIndex={0}
          aria-label={`Close ${label}`}
          onClick={(e) => {
            e.stopPropagation();
            onClose(id);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              onClose(id);
            }
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 16,
            height: 16,
            borderRadius: 3,
            color: '#4b5563',
            cursor: 'pointer',
            transition: 'all 100ms',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = '#374151';
            (e.currentTarget as HTMLElement).style.color = '#e5e7eb';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'transparent';
            (e.currentTarget as HTMLElement).style.color = '#4b5563';
          }}
        >
          <IconClose />
        </span>
      )}
    </button>
  );
}

// ─── Main SourceExplorer ──────────────────────────────────────────────────────

export function SourceExplorer<Id extends string>({
  tree,
  defaultSelected,
  sources,
  paths,
  title = 'Explorer',
}: {
  tree: SourceTreeNode<Id>[];
  defaultSelected: Id;
  sources: Record<Id, string>;
  paths: Record<Id, string>;
  title?: string;
}) {
  const [selected, setSelected] = useState<Id | null>(defaultSelected);
  const [openTabs, setOpenTabs] = useState<Id[]>([defaultSelected]);
  const [query, setQuery] = useState('');
  const [wrap, setWrap] = useState(false);

  const visibleTree = useMemo(() => filterTree(tree, query), [tree, query]);
  const visibleCount = useMemo(() => flattenFileIds(visibleTree).length, [visibleTree]);
  const allowedIds = useMemo(() => new Set(flattenFileIds(tree)), [tree]);
  const safeSelected = selected && allowedIds.has(selected) ? selected : defaultSelected;

  const selectFile = useCallback((id: Id) => {
    setSelected(id);
    setOpenTabs((prev) => {
      const next = prev.filter((x) => x !== id);
      next.push(id);
      return next;
    });
  }, []);

  const closeTab = useCallback(
    (id: Id) => {
      setOpenTabs((prev) => {
        const next = prev.filter((x) => x !== id);
        if (safeSelected === id) {
          setSelected(next[next.length - 1] ?? defaultSelected);
        }
        return next.length ? next : [defaultSelected];
      });
    },
    [defaultSelected, safeSelected]
  );

  const source = sources[safeSelected] ?? '';
  const fileLabel = String(safeSelected).split('/').pop() ?? String(safeSelected);
  const ext = getFileExtension(fileLabel);
  const extColor = getExtensionColor(ext);
  const lines = useMemo(() => source.split('\n'), [source]);
  const longestLine = useMemo(() => Math.max(0, ...lines.map((l) => l.length)), [lines]);
  const wide = !wrap && longestLine > 100;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(220px, 260px) 1fr',
        background: '#0d1117',
        borderRadius: 10,
        border: '1px solid #21262d',
        overflow: 'hidden',
        fontFamily:
          '"JetBrains Mono", "Fira Code", "Cascadia Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        minHeight: 400,
        height: 'min(80vh, 700px)',
      }}
    >
      {/* ── Sidebar ────────────────────────────────────────────────────────── */}
      <div
        style={{
          background: '#161b22',
          borderRight: '1px solid #21262d',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minHeight: 0,
        }}
      >
        {/* Sidebar header */}
        <div
          style={{
            padding: '10px 12px 8px',
            borderBottom: '1px solid #21262d',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#6b7280',
              }}
            >
              {title}
            </span>
            {query && (
              <span style={{ fontSize: 10, color: '#fbbf24' }}>
                {visibleCount} match{visibleCount !== 1 ? 'es' : ''}
              </span>
            )}
          </div>

          {/* Search input */}
          <div style={{ position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
            >
              <IconSearch />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              style={{
                width: '100%',
                padding: '5px 28px 5px 26px',
                background: '#0d1117',
                border: '1px solid #30363d',
                borderRadius: 6,
                color: '#e5e7eb',
                fontSize: 12,
                fontFamily: 'inherit',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 150ms',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
              onBlur={(e) => (e.target.style.borderColor = '#30363d')}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                style={{
                  position: 'absolute',
                  right: 6,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  padding: 2,
                  cursor: 'pointer',
                  color: '#6b7280',
                  display: 'flex',
                  borderRadius: 3,
                }}
              >
                <IconClose />
              </button>
            )}
          </div>
        </div>

        {/* Tree */}
        <div style={{ overflow: 'auto', flex: 1, padding: '6px 4px' }}>
          {visibleCount > 0 ? (
            <Tree nodes={visibleTree} depth={0} selected={safeSelected} onSelect={selectFile} query={query} />
          ) : (
            <div
              style={{
                margin: 8,
                padding: '10px 12px',
                background: '#0d1117',
                border: '1px dashed #30363d',
                borderRadius: 6,
                fontSize: 12,
                color: '#6b7280',
              }}
            >
              No files match{' '}
              <code style={{ color: '#fbbf24', fontSize: 11 }}>{query.trim()}</code>
            </div>
          )}
        </div>
      </div>

      {/* ── Editor pane ────────────────────────────────────────────────────── */}
      <div
        style={{
          background: '#0d1117',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        {/* Tabs bar */}
        <div
          style={{
            background: '#161b22',
            borderBottom: '1px solid #21262d',
            display: 'flex',
            alignItems: 'flex-end',
            overflowX: 'auto',
            overflowY: 'hidden',
            flexShrink: 0,
            scrollbarWidth: 'none',
            minHeight: 37,
          }}
        >
          {openTabs.map((id) => (
            <Tab
              key={String(id)}
              id={id}
              active={id === safeSelected}
              path={paths[id] ?? ''}
              onSelect={selectFile}
              onClose={closeTab}
              canClose={openTabs.length > 1}
            />
          ))}
        </div>

        {/* File info bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px 14px',
            borderBottom: '1px solid #21262d',
            background: '#0d1117',
            flexShrink: 0,
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
            <span style={{ color: extColor, flexShrink: 0 }}>
              <IconFile />
            </span>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    fontSize: 12.5,
                    fontWeight: 500,
                    color: '#e5e7eb',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {fileLabel}
                </span>
                {ext && (
                  <span
                    style={{
                      fontSize: 10,
                      padding: '1px 6px',
                      background: `${extColor}18`,
                      color: extColor,
                      border: `1px solid ${extColor}30`,
                      borderRadius: 4,
                      flexShrink: 0,
                      letterSpacing: '0.04em',
                    }}
                  >
                    .{ext}
                  </span>
                )}
                {wide && (
                  <span
                    style={{
                      fontSize: 10,
                      padding: '1px 6px',
                      background: '#fbbf2415',
                      color: '#fbbf24',
                      border: '1px solid #fbbf2430',
                      borderRadius: 4,
                      flexShrink: 0,
                    }}
                  >
                    long lines
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <button
              type="button"
              title={wrap ? 'Disable word wrap' : 'Enable word wrap'}
              onClick={() => setWrap((w) => !w)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 28,
                height: 28,
                background: wrap ? '#3b82f615' : 'transparent',
                border: `1px solid ${wrap ? '#3b82f640' : '#ffffff14'}`,
                borderRadius: 6,
                color: wrap ? '#60a5fa' : '#6b7280',
                cursor: 'pointer',
                transition: 'all 150ms',
              }}
            >
              <IconWrap active={wrap} />
            </button>

            <CopyButton text={source} />
          </div>
        </div>

        {/* Code area */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'auto', minHeight: 0 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '44px 1fr',
              minHeight: '100%',
            }}
          >
            {/* Line numbers */}
            <div
              style={{
                position: 'sticky',
                left: 0,
                background: '#0d1117',
                borderRight: '1px solid #21262d',
                padding: '14px 0',
                textAlign: 'right',
                userSelect: 'none',
                zIndex: 1,
              }}
            >
              {lines.map((_, i) => (
                <div
                  key={i}
                  style={{
                    paddingRight: 10,
                    fontSize: 11.5,
                    lineHeight: '1.7',
                    color: '#3f4857',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Code lines */}
            <div style={{ padding: '14px 0' }}>
              {lines.map((line, i) => (
                <div
                  key={i}
                  style={{
                    padding: '0 16px',
                    fontSize: 12.5,
                    lineHeight: '1.7',
                    whiteSpace: wrap ? 'pre-wrap' : 'pre',
                    overflowWrap: wrap ? 'anywhere' : 'normal',
                    cursor: 'text',
                  }}
                  className="code-line"
                >
                  <code style={{ color: '#cdd9e5' }}>{line || '\u00a0'}</code>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '2px 14px',
            background: '#1a7f4b',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 11, color: '#dcfce7', letterSpacing: '0.02em' }}>
            {lines.length} lines
          </span>
          <div style={{ display: 'flex', gap: 16 }}>
            <span style={{ fontSize: 11, color: '#dcfce7' }}>
              {ext.toUpperCase() || 'Plain Text'}
            </span>
            <span style={{ fontSize: 11, color: '#dcfce7' }}>UTF-8</span>
          </div>
        </div>
      </div>

      <style>{`
        .code-line:hover { background: #ffffff06 !important; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #484f58; }
      `}</style>
    </div>
  );
}