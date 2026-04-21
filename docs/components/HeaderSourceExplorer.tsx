import React from 'react';
import { HEADER_SOURCES, type HeaderSourceId } from '../data/headerSources.generated';
import { SourceExplorer } from './source-explorer/SourceExplorer';
import type { SourceTreeNode } from './source-explorer/types';

type UsageSourceId = 'usage/PlanckH1V1.tsx' | 'usage/ZeptoHeaderV1.tsx';
type CombinedSourceId = HeaderSourceId | UsageSourceId;

const HEADER_USAGE_SOURCES: Record<UsageSourceId, string> = {
  'usage/PlanckH1V1.tsx': `import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { PlanckH1V1 } from '@my-ui-lib/core';

const HEADER_GRADIENT = ['#5b21b6', '#1e40af'] as const;

function IconRefresh({ color }: { color: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" accessibilityElementsHidden>
      <Path
        d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
        fill={color}
      />
    </Svg>
  );
}

function IconBellOutline({ color }: { color: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" accessibilityElementsHidden>
      <Path
        d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6V11c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"
        fill={color}
      />
    </Svg>
  );
}

export function ExamplePlanckH1V1Header() {
  return (
    <PlanckH1V1
      title="Qwash"
      backgroundGradientColors={HEADER_GRADIENT}
      logoIcon={
        <View
          style={{
            width: 22,
            height: 22,
            borderRadius: 11,
            borderWidth: 2,
            borderColor: '#ffffff',
            opacity: 0.9,
          }}
        />
      }
      notificationDot
      onSearch={() => {}}
      onNotification={() => {}}
      slots={{
        searchIcon: <IconRefresh color="#ffffff" />,
        notificationIcon: <IconBellOutline color="#ffffff" />,
      }}
    />
  );
}
`,
  'usage/ZeptoHeaderV1.tsx': `import React from 'react';
import { ZeptoHeaderV1 } from '@my-ui-lib/core';

const ZEPTO_HEADER_BG = '#D2A679';

export function ExampleZeptoHeaderV1() {
  return (
    <ZeptoHeaderV1
      backgroundColor={ZEPTO_HEADER_BG}
      etaLabel="6 minutes"
      addressLabel="Home - 1/36, 1/32, Krishna Vihar Colon..."
      walletLabel="₹0"
      onAddressPress={() => {}}
      onWalletPress={() => {}}
      onProfilePress={() => {}}
    />
  );
}
`,
};

const TREE: SourceTreeNode<CombinedSourceId>[] = [
  {
    kind: 'folder',
    label: 'packages/core/src/components/navigation/Header',
    defaultOpen: true,
    children: [
      {
        kind: 'folder',
        label: 'Header',
        defaultOpen: true,
        children: [
          { kind: 'file', id: 'Header/Header.tsx', label: 'Header.tsx' },
          { kind: 'file', id: 'Header/Header.styles.ts', label: 'Header.styles.ts' },
          { kind: 'file', id: 'Header/Header.types.ts', label: 'Header.types.ts' },
          { kind: 'file', id: 'Header/index.ts', label: 'index.ts' },
        ],
      },
      {
        kind: 'folder',
        label: 'PlanckH1V1',
        defaultOpen: true,
        children: [
          { kind: 'file', id: 'PlanckH1V1/PlanckH1V1.tsx', label: 'PlanckH1V1.tsx' },
          { kind: 'file', id: 'PlanckH1V1/PlanckH1V1.styles.ts', label: 'PlanckH1V1.styles.ts' },
          { kind: 'file', id: 'PlanckH1V1/PlanckH1V1.types.ts', label: 'PlanckH1V1.types.ts' },
          { kind: 'file', id: 'PlanckH1V1/index.ts', label: 'index.ts' },
        ],
      },
      {
        kind: 'folder',
        label: 'ZeptoHeaderV1',
        defaultOpen: true,
        children: [
          { kind: 'file', id: 'ZeptoHeaderV1/ZeptoHeaderV1.tsx', label: 'ZeptoHeaderV1.tsx' },
          { kind: 'file', id: 'ZeptoHeaderV1/ZeptoHeaderV1.styles.ts', label: 'ZeptoHeaderV1.styles.ts' },
          { kind: 'file', id: 'ZeptoHeaderV1/ZeptoHeaderV1.types.ts', label: 'ZeptoHeaderV1.types.ts' },
          { kind: 'file', id: 'ZeptoHeaderV1/ZeptoHeaderV1.icons.tsx', label: 'ZeptoHeaderV1.icons.tsx' },
          { kind: 'file', id: 'ZeptoHeaderV1/index.ts', label: 'index.ts' },
        ],
      },
    ],
  },
  {
    kind: 'folder',
    label: 'Usage (copy/paste)',
    defaultOpen: true,
    children: [
      { kind: 'file', id: 'usage/PlanckH1V1.tsx', label: 'PlanckH1V1.tsx' },
      { kind: 'file', id: 'usage/ZeptoHeaderV1.tsx', label: 'ZeptoHeaderV1.tsx' },
    ],
  },
];

const PATHS: Record<CombinedSourceId, string> = {
  'Header/Header.tsx': 'packages/core/src/components/navigation/Header/Header.tsx',
  'Header/Header.styles.ts': 'packages/core/src/components/navigation/Header/Header.styles.ts',
  'Header/Header.types.ts': 'packages/core/src/components/navigation/Header/Header.types.ts',
  'Header/index.ts': 'packages/core/src/components/navigation/Header/index.ts',

  'PlanckH1V1/PlanckH1V1.tsx':
    'packages/core/src/components/navigation/Header/PlanckH1V1/PlanckH1V1.tsx',
  'PlanckH1V1/PlanckH1V1.styles.ts':
    'packages/core/src/components/navigation/Header/PlanckH1V1/PlanckH1V1.styles.ts',
  'PlanckH1V1/PlanckH1V1.types.ts':
    'packages/core/src/components/navigation/Header/PlanckH1V1/PlanckH1V1.types.ts',
  'PlanckH1V1/index.ts': 'packages/core/src/components/navigation/Header/PlanckH1V1/index.ts',

  'ZeptoHeaderV1/ZeptoHeaderV1.tsx':
    'packages/core/src/components/navigation/Header/ZeptoHeaderV1/ZeptoHeaderV1.tsx',
  'ZeptoHeaderV1/ZeptoHeaderV1.styles.ts':
    'packages/core/src/components/navigation/Header/ZeptoHeaderV1/ZeptoHeaderV1.styles.ts',
  'ZeptoHeaderV1/ZeptoHeaderV1.types.ts':
    'packages/core/src/components/navigation/Header/ZeptoHeaderV1/ZeptoHeaderV1.types.ts',
  'ZeptoHeaderV1/ZeptoHeaderV1.icons.tsx':
    'packages/core/src/components/navigation/Header/ZeptoHeaderV1/ZeptoHeaderV1.icons.tsx',
  'ZeptoHeaderV1/index.ts': 'packages/core/src/components/navigation/Header/ZeptoHeaderV1/index.ts',

  'usage/PlanckH1V1.tsx': 'Usage snippet (PlanckH1V1)',
  'usage/ZeptoHeaderV1.tsx': 'Usage snippet (ZeptoHeaderV1)',
};

const SOURCES: Record<CombinedSourceId, string> = {
  ...(HEADER_SOURCES as Record<HeaderSourceId, string>),
  ...(HEADER_USAGE_SOURCES as Record<UsageSourceId, string>),
};

export function HeaderSourceExplorer() {
  return (
    <SourceExplorer
      title="Explorer"
      tree={TREE}
      defaultSelected="PlanckH1V1/PlanckH1V1.tsx"
      sources={SOURCES}
      paths={PATHS}
    />
  );
}

