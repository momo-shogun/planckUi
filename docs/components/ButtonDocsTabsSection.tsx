import React from 'react';
import dynamic from 'next/dynamic';
import { Tab, Tabs } from 'nextra/components';
import {
  ButtonIconOnlySourceExplorer,
  MarqueeButtonSourceExplorer,
  PillButtonSourceExplorer,
} from './ButtonCardSourceExplorer';
import { ButtonIconOnlyDocPreview, PillButtonDocPreview } from './PillAndIconButtonDocPreview';

const MarqueeButtonDocPreview = dynamic(
  () => import('./MarqueeButtonDocPreview').then((m) => m.MarqueeButtonDocPreview),
  {
    ssr: false,
    loading: () => (
      <div className="nx-text-sm nx-text-gray-600 dark:nx-text-gray-400">Loading preview…</div>
    ),
  }
);

const INSTALL_PILL = [
  'pnpm add @my-ui-lib/core @my-ui-lib/tokens',
  '',
  'npx my-ui-lib add button',
].join('\n');

const INSTALL_ICON = [
  'pnpm add @my-ui-lib/core @my-ui-lib/tokens',
  '',
  'npx my-ui-lib add button',
].join('\n');

const INSTALL_MARQUEE = [
  'pnpm add @my-ui-lib/core @my-ui-lib/tokens',
  'pnpm add react-native-reanimated',
  '',
  '# Babel: reanimated plugin must be last',
  '',
  'npx my-ui-lib add button',
].join('\n');

function InstallBlock({ snippet }: { snippet: string }) {
  return (
    <div>
      <pre className="nx-mb-4 nx-overflow-x-auto nx-rounded-md nx-border nx-border-gray-200 nx-bg-gray-50 nx-p-3 nx-text-xs dark:nx-border-neutral-800 dark:nx-bg-neutral-900">
        <code>{snippet}</code>
      </pre>
      <div className="nx-text-sm nx-text-gray-600 dark:nx-text-gray-400">
        Sources in the <strong>Code</strong> tab are generated from the repo when you run{' '}
        <code className="nx-rounded nx-bg-gray-100 nx-px-1 dark:nx-bg-neutral-800">
          pnpm --filter @planckui/docs dev
        </code>{' '}
        or <code className="nx-rounded nx-bg-gray-100 nx-px-1 dark:nx-bg-neutral-800">build</code>{' '}
        (<code className="nx-rounded nx-bg-gray-100 nx-px-1 dark:nx-bg-neutral-800">
          docs/scripts/sync-button-card-sources.mjs
        </code>
        ).
      </div>
    </div>
  );
}

function PillTriple() {
  return (
    <Tabs items={['Preview', 'Code', 'Install']}>
      <Tab>
        <div>
          <PillButtonDocPreview />
          <div className="nx-mt-4 nx-text-sm nx-text-gray-600 dark:nx-text-gray-400">
            Gradient pill (<code>default</code>), solid/outline/ghost, sizes, loading, and the{' '}
            <code>Button</code> alias.
          </div>
        </div>
      </Tab>
      <Tab>
        <PillButtonSourceExplorer />
      </Tab>
      <Tab>
        <InstallBlock snippet={INSTALL_PILL} />
      </Tab>
    </Tabs>
  );
}

function IconTriple() {
  return (
    <Tabs items={['Preview', 'Code', 'Install']}>
      <Tab>
        <div>
          <ButtonIconOnlyDocPreview />
          <div className="nx-mt-4 nx-text-sm nx-text-gray-600 dark:nx-text-gray-400">
            Pass any <code>ReactNode</code> as <code>icon</code>; pair with your icon set (e.g. vector
            icons) in the app.
          </div>
        </div>
      </Tab>
      <Tab>
        <ButtonIconOnlySourceExplorer />
      </Tab>
      <Tab>
        <InstallBlock snippet={INSTALL_ICON} />
      </Tab>
    </Tabs>
  );
}

function MarqueeTriple() {
  return (
    <Tabs items={['Preview', 'Code', 'Install']}>
      <Tab>
        <div>
          <MarqueeButtonDocPreview />
          <div className="nx-mt-4 nx-text-sm nx-text-gray-600 dark:nx-text-gray-400">
            Infinite horizontal text with <code>useFrameCallback</code> on native; docs use a
            Reanimated mock on web.
          </div>
        </div>
      </Tab>
      <Tab>
        <MarqueeButtonSourceExplorer />
      </Tab>
      <Tab>
        <InstallBlock snippet={INSTALL_MARQUEE} />
      </Tab>
    </Tabs>
  );
}

export function ButtonDocsTabsSection() {
  return (
    <Tabs items={['PillButtonV1 (`Button`)', 'ButtonIconOnly', 'MarqueeButton']}>
      <Tab>
        <PillTriple />
      </Tab>
      <Tab>
        <IconTriple />
      </Tab>
      <Tab>
        <MarqueeTriple />
      </Tab>
    </Tabs>
  );
}
