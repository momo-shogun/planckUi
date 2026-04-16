import React from 'react';
import { Tab, Tabs } from 'nextra/components';
import { MPCardSourceExplorer } from './ButtonCardSourceExplorer';
import { MPCardDocPreview } from './MPCardDocPreview';

const INSTALL_CARD = [
  'pnpm add @my-ui-lib/core @my-ui-lib/tokens',
  '# MPCard uses react-native-svg for the background gradient',
  'pnpm add react-native-svg',
  '',
  'npx my-ui-lib add mpcard',
].join('\n');

export function CardDocsTabsSection() {
  return (
    <Tabs items={['Preview', 'Code', 'Install']}>
      <Tab>
        <div>
          <MPCardDocPreview />
          <div className="nx-mt-4 nx-text-sm nx-text-gray-600 dark:nx-text-gray-400">
            Uses <code>ButtonIconOnly</code> for corner actions. Override colors and gradient stops to
            match your brand.
          </div>
        </div>
      </Tab>
      <Tab>
        <div>
          <MPCardSourceExplorer />
          <div className="nx-mt-4 nx-text-sm nx-text-gray-600 dark:nx-text-gray-400">
            Regenerate sources with{' '}
            <code className="nx-rounded nx-bg-gray-100 nx-px-1 dark:nx-bg-neutral-800">
              pnpm --filter @planckui/docs dev
            </code>{' '}
            / <code className="nx-rounded nx-bg-gray-100 nx-px-1 dark:nx-bg-neutral-800">build</code>{' '}
            (<code className="nx-rounded nx-bg-gray-100 nx-px-1 dark:nx-bg-neutral-800">
              sync-button-card-sources.mjs
            </code>
            ).
          </div>
        </div>
      </Tab>
      <Tab>
        <div>
          <pre className="nx-mb-4 nx-overflow-x-auto nx-rounded-md nx-border nx-border-gray-200 nx-bg-gray-50 nx-p-3 nx-text-xs dark:nx-border-neutral-800 dark:nx-bg-neutral-900">
            <code>{INSTALL_CARD}</code>
          </pre>
        </div>
      </Tab>
    </Tabs>
  );
}
