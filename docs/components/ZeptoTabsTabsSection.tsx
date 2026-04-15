import React from 'react';
import dynamic from 'next/dynamic';
import { Tab, Tabs } from 'nextra/components';
import { ZeptoTabsCodeExplorer } from './TabsSourceExplorer';

// ZeptoTabs pulls `react-native` + Reanimated. Even with webpack aliases, importing
// it during SSR can trip Node on Flow syntax. Render preview client-only.
const ZeptoTabsDocPreview = dynamic(
  () => import('./ZeptoTabsDocPreview').then((m) => m.ZeptoTabsDocPreview),
  {
    ssr: false,
    loading: () => (
      <div className="nx-text-sm nx-text-gray-600 dark:nx-text-gray-400">
        Loading preview…
      </div>
    ),
  }
);

const INSTALL_SNIPPET = [
  'pnpm add @my-ui-lib/core @my-ui-lib/tokens',
  '# ZeptoTabs depends on Reanimated',
  'pnpm add react-native-reanimated',
  '',
  '# then (copies the component into your app)',
  'npx my-ui-lib add zepto-tabs',
].join('\n');

/**
 * Nextra Tabs wrapper for `ZeptoTabs` to match the bottom-tabs-navigator page:
 * Preview + copyable code + install snippet.
 */
export function ZeptoTabsTabsSection() {
  return (
    <Tabs items={['Preview', 'Code', 'Install']}>
      <Tab>
        <div>
          <ZeptoTabsDocPreview />
          <div className="nx-mt-4 nx-text-sm nx-text-gray-600 dark:nx-text-gray-400">
            ZeptoTabs uses <strong>react-native-reanimated</strong> for color interpolation and the
            sliding pill. This docs preview runs with a web-safe Reanimated mock; your app should
            install and configure Reanimated normally.
          </div>
        </div>
      </Tab>
      <Tab>
        <div>
          <ZeptoTabsCodeExplorer />
          <div className="nx-text-sm nx-text-gray-600 dark:nx-text-gray-400">
            Import from <code>@my-ui-lib/core/zepto-tabs</code> so apps that don’t use ZeptoTabs
            don’t pull Reanimated from the main <code>@my-ui-lib/core</code> entry.
          </div>
        </div>
      </Tab>
      <Tab>
        <div>
          <pre className="nx-mb-4 nx-overflow-x-auto nx-rounded-md nx-border nx-border-gray-200 nx-bg-gray-50 nx-p-3 nx-text-xs dark:nx-border-neutral-800 dark:nx-bg-neutral-900">
            <code>{INSTALL_SNIPPET}</code>
          </pre>
          <div className="nx-text-sm nx-text-gray-600 dark:nx-text-gray-400">
            Reanimated requires the Babel plugin (must be last) in your React Native app’s{' '}
            <code className="nx-rounded nx-bg-gray-100 nx-px-1 dark:nx-bg-neutral-800">
              babel.config.js
            </code>
            .
          </div>
        </div>
      </Tab>
    </Tabs>
  );
}

