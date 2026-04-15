import React from 'react';
import { Tab, Tabs } from 'nextra/components';
import { TabsVariantsDocPreview } from './TabsVariantsDocPreview';
import { TabsCodeExplorer } from './TabsSourceExplorer';

const INSTALL_SNIPPET = [
  'pnpm add @my-ui-lib/core @my-ui-lib/tokens',
  '',
  '# then (copies the component into your app)',
  'npx my-ui-lib add tabs',
].join('\n');

export function TabsTabsSection() {
  return (
    <Tabs items={['Preview', 'Code', 'Install']}>
      <Tab>
        <div>
          <TabsVariantsDocPreview />
          <div className="nx-mt-4 nx-text-sm nx-text-gray-600 dark:nx-text-gray-400">
            Switch between underline / pill / bordered plus the scrollable row. Use the code tab to
            copy the exact source used by the library.
          </div>
        </div>
      </Tab>
      <Tab>
        <div>
          <TabsCodeExplorer />
        </div>
      </Tab>
      <Tab>
        <div>
          <pre className="nx-mb-4 nx-overflow-x-auto nx-rounded-md nx-border nx-border-gray-200 nx-bg-gray-50 nx-p-3 nx-text-xs dark:nx-border-neutral-800 dark:nx-bg-neutral-900">
            <code>{INSTALL_SNIPPET}</code>
          </pre>
        </div>
      </Tab>
    </Tabs>
  );
}

