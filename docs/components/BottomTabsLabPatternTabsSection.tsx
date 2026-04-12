import React from 'react';
import { Tab, Tabs } from 'nextra/components';
import { BottomTabsLabPatternPreview } from './BottomTabsLabPatternPreview';
import { BottomTabsLabSourceExplorer } from './BottomTabsLabSourceExplorer';

const INSTALL_SNIPPET = [
  'pnpm add @react-navigation/native @react-navigation/bottom-tabs',
  'pnpm add @my-ui-lib/core @my-ui-lib/tokens',
  '# icons (example app)',
  'pnpm add lucide-react-native react-native-svg',
].join('\n');

/**
 * Nextra Tabs for the bottom-tabs lab doc page. Kept in .tsx so MDX does not wrap `<Tab>`
 * children in markdown `<p>` tags (invalid nesting + hydration errors).
 */
export function BottomTabsLabPatternTabsSection() {
  return (
    <Tabs items={['Preview', 'Code', 'Install']}>
      <Tab>
        <div>
          <BottomTabsLabPatternPreview />
          <div className="nx-mt-4 nx-text-sm nx-text-gray-600 dark:nx-text-gray-400">
            Tap tabs to change selection — same plankBarV1 variant as the example preset. Open{' '}
            <strong>Bottom tabs lab</strong> in the RN example app for the full stack (drawer + registry).
          </div>
        </div>
      </Tab>
      <Tab>
        <div>
          <BottomTabsLabSourceExplorer />
          <div className="nx-mt-4 nx-space-y-3 nx-text-sm nx-text-gray-600 dark:nx-text-gray-400">
            <div>
              Sources are <strong>generated from the example app</strong> when you run{' '}
              <code className="nx-rounded nx-bg-gray-100 nx-px-1 dark:nx-bg-neutral-800">
                pnpm --filter @planckui/docs dev
              </code>
              {' '}or{' '}
              <code className="nx-rounded nx-bg-gray-100 nx-px-1 dark:nx-bg-neutral-800">build</code>
              {' '}(see{' '}
              <code className="nx-rounded nx-bg-gray-100 nx-px-1 dark:nx-bg-neutral-800">
                docs/scripts/sync-bottom-tabs-lab-sources.mjs
              </code>
              ). Copy the code, then adjust import paths for your project layout.
            </div>
            <div>
              Tab <strong>screens</strong> stay under{' '}
              <code className="nx-rounded nx-bg-gray-100 nx-px-1 dark:nx-bg-neutral-800">
                apps/example/src/screens/bottomTabs/
              </code>
              {' '}so presets can share demo bodies, or add{' '}
              <code className="nx-rounded nx-bg-gray-100 nx-px-1 dark:nx-bg-neutral-800">
                presets/&lt;id&gt;/screens/
              </code>
              {' '}for custom content.
            </div>
          </div>
        </div>
      </Tab>
      <Tab>
        <div>
          <pre className="nx-mb-4 nx-overflow-x-auto nx-rounded-md nx-border nx-border-gray-200 nx-bg-gray-50 nx-p-3 nx-text-xs dark:nx-border-neutral-800 dark:nx-bg-neutral-900">
            <code>{INSTALL_SNIPPET}</code>
          </pre>
          <div className="nx-text-sm nx-text-gray-600 dark:nx-text-gray-400">
            Pin <strong>react-native-svg</strong> to a version that matches your React Native release (see
            example{' '}
            <code className="nx-rounded nx-bg-gray-100 nx-px-1 dark:nx-bg-neutral-800">package.json</code>
            {' '}/ overrides).
          </div>
        </div>
      </Tab>
    </Tabs>
  );
}
