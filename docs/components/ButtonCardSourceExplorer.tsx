import React from 'react';
import { BUTTON_CARD_SOURCES, type ButtonCardSourceId } from '../data/buttonCardSources.generated';
import { SourceExplorer } from './source-explorer/SourceExplorer';
import type { SourceTreeNode } from './source-explorer/types';

const PATHS: Record<ButtonCardSourceId, string> = {
  'Button/Button.tsx': 'packages/core/src/components/Button/Button.tsx',
  'PillButtonV1/PillButtonV1.tsx': 'packages/core/src/components/Button/PillButtonV1/PillButtonV1.tsx',
  'PillButtonV1/PillButtonV1.styles.ts':
    'packages/core/src/components/Button/PillButtonV1/PillButtonV1.styles.ts',
  'PillButtonV1/PillButtonV1.types.ts':
    'packages/core/src/components/Button/PillButtonV1/PillButtonV1.types.ts',
  'PillButtonV1/index.ts': 'packages/core/src/components/Button/PillButtonV1/index.ts',
  'ButtonIconOnly/ButtonIconOnly.tsx':
    'packages/core/src/components/Button/ButtonIconOnly/ButtonIconOnly.tsx',
  'ButtonIconOnly/ButtonIconOnly.styles.ts':
    'packages/core/src/components/Button/ButtonIconOnly/ButtonIconOnly.styles.ts',
  'ButtonIconOnly/ButtonIconOnly.types.ts':
    'packages/core/src/components/Button/ButtonIconOnly/ButtonIconOnly.types.ts',
  'ButtonIconOnly/index.ts': 'packages/core/src/components/Button/ButtonIconOnly/index.ts',
  'MarqueeButton/MarqueeButton.tsx':
    'packages/core/src/components/Button/MarqueeButton/MarqueeButton.tsx',
  'MarqueeButton/MarqueeButton.styles.ts':
    'packages/core/src/components/Button/MarqueeButton/MarqueeButton.styles.ts',
  'MarqueeButton/MarqueeButton.types.ts':
    'packages/core/src/components/Button/MarqueeButton/MarqueeButton.types.ts',
  'MarqueeButton/index.ts': 'packages/core/src/components/Button/MarqueeButton/index.ts',
  'Button/index.ts': 'packages/core/src/components/Button/index.ts',
  'MPCard/MPCard.tsx': 'packages/core/src/components/Cards/MPCard/MPCard.tsx',
  'MPCard/MPCard.styles.ts': 'packages/core/src/components/Cards/MPCard/MPCard.styles.ts',
  'MPCard/MPCard.types.ts': 'packages/core/src/components/Cards/MPCard/MPCard.types.ts',
  'MPCard/index.ts': 'packages/core/src/components/Cards/MPCard/index.ts',
  'Cards/index.ts': 'packages/core/src/components/Cards/index.ts',
  'example/PillButtonV1Screen.tsx': 'apps/example/src/screens/buttonLab/PillButtonV1Screen.tsx',
  'example/ButtonIconOnlyScreen.tsx': 'apps/example/src/screens/buttonLab/ButtonIconOnlyScreen.tsx',
  'example/MarqueeButtonScreen.tsx': 'apps/example/src/screens/buttonLab/MarqueeButtonScreen.tsx',
  'example/MPCardScreen.tsx': 'apps/example/src/screens/cardsLab/MPCardScreen.tsx',
};

const PILL_TREE: SourceTreeNode<ButtonCardSourceId>[] = [
  {
    kind: 'folder',
    label: 'packages/core/src/components/Button',
    defaultOpen: true,
    children: [
      { kind: 'file', id: 'Button/Button.tsx', label: 'Button.tsx (→ PillButtonV1)' },
      { kind: 'file', id: 'Button/index.ts', label: 'index.ts' },
      {
        kind: 'folder',
        label: 'PillButtonV1',
        defaultOpen: true,
        children: [
          { kind: 'file', id: 'PillButtonV1/PillButtonV1.tsx', label: 'PillButtonV1.tsx' },
          { kind: 'file', id: 'PillButtonV1/PillButtonV1.styles.ts', label: 'PillButtonV1.styles.ts' },
          { kind: 'file', id: 'PillButtonV1/PillButtonV1.types.ts', label: 'PillButtonV1.types.ts' },
          { kind: 'file', id: 'PillButtonV1/index.ts', label: 'index.ts' },
        ],
      },
    ],
  },
  {
    kind: 'folder',
    label: 'apps/example/src/screens/buttonLab',
    defaultOpen: true,
    children: [{ kind: 'file', id: 'example/PillButtonV1Screen.tsx', label: 'PillButtonV1Screen.tsx' }],
  },
];

const ICON_ONLY_TREE: SourceTreeNode<ButtonCardSourceId>[] = [
  {
    kind: 'folder',
    label: 'packages/core/src/components/Button',
    defaultOpen: true,
    children: [
      { kind: 'file', id: 'Button/index.ts', label: 'index.ts' },
      {
        kind: 'folder',
        label: 'ButtonIconOnly',
        defaultOpen: true,
        children: [
          { kind: 'file', id: 'ButtonIconOnly/ButtonIconOnly.tsx', label: 'ButtonIconOnly.tsx' },
          {
            kind: 'file',
            id: 'ButtonIconOnly/ButtonIconOnly.styles.ts',
            label: 'ButtonIconOnly.styles.ts',
          },
          {
            kind: 'file',
            id: 'ButtonIconOnly/ButtonIconOnly.types.ts',
            label: 'ButtonIconOnly.types.ts',
          },
          { kind: 'file', id: 'ButtonIconOnly/index.ts', label: 'index.ts' },
        ],
      },
    ],
  },
  {
    kind: 'folder',
    label: 'apps/example/src/screens/buttonLab',
    defaultOpen: true,
    children: [
      { kind: 'file', id: 'example/ButtonIconOnlyScreen.tsx', label: 'ButtonIconOnlyScreen.tsx' },
    ],
  },
];

const MARQUEE_TREE: SourceTreeNode<ButtonCardSourceId>[] = [
  {
    kind: 'folder',
    label: 'packages/core/src/components/Button',
    defaultOpen: true,
    children: [
      { kind: 'file', id: 'Button/index.ts', label: 'index.ts' },
      {
        kind: 'folder',
        label: 'MarqueeButton',
        defaultOpen: true,
        children: [
          { kind: 'file', id: 'MarqueeButton/MarqueeButton.tsx', label: 'MarqueeButton.tsx' },
          {
            kind: 'file',
            id: 'MarqueeButton/MarqueeButton.styles.ts',
            label: 'MarqueeButton.styles.ts',
          },
          {
            kind: 'file',
            id: 'MarqueeButton/MarqueeButton.types.ts',
            label: 'MarqueeButton.types.ts',
          },
          { kind: 'file', id: 'MarqueeButton/index.ts', label: 'index.ts' },
        ],
      },
    ],
  },
  {
    kind: 'folder',
    label: 'apps/example/src/screens/buttonLab',
    defaultOpen: true,
    children: [{ kind: 'file', id: 'example/MarqueeButtonScreen.tsx', label: 'MarqueeButtonScreen.tsx' }],
  },
];

const MPCARD_TREE: SourceTreeNode<ButtonCardSourceId>[] = [
  {
    kind: 'folder',
    label: 'packages/core/src/components/Cards',
    defaultOpen: true,
    children: [
      { kind: 'file', id: 'Cards/index.ts', label: 'index.ts' },
      {
        kind: 'folder',
        label: 'MPCard',
        defaultOpen: true,
        children: [
          { kind: 'file', id: 'MPCard/MPCard.tsx', label: 'MPCard.tsx' },
          { kind: 'file', id: 'MPCard/MPCard.styles.ts', label: 'MPCard.styles.ts' },
          { kind: 'file', id: 'MPCard/MPCard.types.ts', label: 'MPCard.types.ts' },
          { kind: 'file', id: 'MPCard/index.ts', label: 'index.ts' },
        ],
      },
    ],
  },
  {
    kind: 'folder',
    label: 'apps/example/src/screens/cardsLab',
    defaultOpen: true,
    children: [{ kind: 'file', id: 'example/MPCardScreen.tsx', label: 'MPCardScreen.tsx' }],
  },
];

export type ButtonDocVariant = 'pill' | 'iconOnly' | 'marquee';

export function PillButtonSourceExplorer() {
  return (
    <SourceExplorer
      title="Explorer"
      tree={PILL_TREE}
      defaultSelected="PillButtonV1/PillButtonV1.tsx"
      sources={BUTTON_CARD_SOURCES}
      paths={PATHS}
    />
  );
}

export function ButtonIconOnlySourceExplorer() {
  return (
    <SourceExplorer
      title="Explorer"
      tree={ICON_ONLY_TREE}
      defaultSelected="ButtonIconOnly/ButtonIconOnly.tsx"
      sources={BUTTON_CARD_SOURCES}
      paths={PATHS}
    />
  );
}

export function MarqueeButtonSourceExplorer() {
  return (
    <SourceExplorer
      title="Explorer"
      tree={MARQUEE_TREE}
      defaultSelected="MarqueeButton/MarqueeButton.tsx"
      sources={BUTTON_CARD_SOURCES}
      paths={PATHS}
    />
  );
}

export function MPCardSourceExplorer() {
  return (
    <SourceExplorer
      title="Explorer"
      tree={MPCARD_TREE}
      defaultSelected="MPCard/MPCard.tsx"
      sources={BUTTON_CARD_SOURCES}
      paths={PATHS}
    />
  );
}
