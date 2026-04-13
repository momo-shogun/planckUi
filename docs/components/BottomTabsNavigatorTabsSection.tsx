import React from 'react';
import { Tab, Tabs } from 'nextra/components';
import { BottomTabVariantsDocPreview } from './BottomTabVariantsDocPreview';
import { BottomTabsLabSourceExplorer } from './BottomTabsLabSourceExplorer';

const INSTALL_SNIPPET = [
  'pnpm add @react-navigation/native @react-navigation/bottom-tabs',
  'pnpm add @my-ui-lib/core @my-ui-lib/tokens',
  '# icons (RN CLI — same font families as react-native-vector-icons)',
  'pnpm add react-native-vector-icons react-native-svg',
  '# link fonts once: npx react-native-asset',
  '# (see apps/example/react-native.config.js)',
].join('\n');

export function BottomTabsNavigatorTabsSection() {
  return (
    <Tabs items={['Preview', 'Code', 'Install']}>
      <Tab>
        <div>
          <BottomTabVariantsDocPreview />
          <div className="nx-mt-4 nx-text-sm nx-text-gray-600 dark:nx-text-gray-400">
            Compare both Planck bottom-tab variants in one place. Use the code tab to copy the
            shared navigator bridge, preset registry wiring, and both `plankBarV1` and
            `plankBarV2` preset folders.
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
              </code>{' '}
              or{' '}
              <code className="nx-rounded nx-bg-gray-100 nx-px-1 dark:nx-bg-neutral-800">
                build
              </code>{' '}
              (see{' '}
              <code className="nx-rounded nx-bg-gray-100 nx-px-1 dark:nx-bg-neutral-800">
                docs/scripts/sync-bottom-tabs-lab-sources.mjs
              </code>
              ). Copy the code, then adjust import paths for your project layout.
            </div>
            <div>
              Each new bottom-tab preset should be added to the generated source sync so docs keep
              the preview, code explorer, and install flow aligned with the example app.
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
            Pin <strong>react-native-svg</strong> to a version that matches your React Native
            release (see example{' '}
            <code className="nx-rounded nx-bg-gray-100 nx-px-1 dark:nx-bg-neutral-800">
              package.json
            </code>{' '}
            / overrides).
          </div>
        </div>
      </Tab>
    </Tabs>
  );
}
