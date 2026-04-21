import React from 'react';
import { Tab, Tabs } from 'nextra/components';
import { PlanckH1V1DocPreview, ZeptoHeaderV1DocPreview } from './HeaderComponentsDocPreview';
import { HeaderSourceExplorer } from './HeaderSourceExplorer';

const INSTALL_SNIPPET = [
  'pnpm add @my-ui-lib/core @my-ui-lib/tokens',
  '',
  'npx my-ui-lib add header',
].join('\n');

/**
 * Kept in .tsx so MDX does not wrap `<Tab>` children in markdown `<p>` tags.
 */
export function HeaderDocsTabsSection() {
  return (
    <Tabs items={['Preview', 'Code', 'Install']}>
      <Tab>
        <div>
          <div className="nx-space-y-8">
            <div>
              <div className="nx-text-sm nx-font-semibold nx-text-gray-900 dark:nx-text-gray-100">
                PlanckH1V1
              </div>
              <div className="nx-mt-1 nx-text-sm nx-text-gray-600 dark:nx-text-gray-400">
                Gradient bar with logo ring, <strong>Qwash</strong> title, refresh + bell actions — mirrors{' '}
                <code className="nx-rounded nx-bg-gray-100 nx-px-1 dark:nx-bg-neutral-800">
                  PlanckH1V1HeaderScreen
                </code>
                .
              </div>
              <PlanckH1V1DocPreview />
            </div>

            <div>
              <div className="nx-text-sm nx-font-semibold nx-text-gray-900 dark:nx-text-gray-100">
                ZeptoHeaderV1
              </div>
              <div className="nx-mt-1 nx-text-sm nx-text-gray-600 dark:nx-text-gray-400">
                Zepto-style delivery header (ETA, address, wallet pill, profile) — mirrors{' '}
                <code className="nx-rounded nx-bg-gray-100 nx-px-1 dark:nx-bg-neutral-800">
                  ZeptoHeaderV1Screen
                </code>
                .
              </div>
              <ZeptoHeaderV1DocPreview />
            </div>
          </div>
        </div>
      </Tab>
      <Tab>
        <div>
          <HeaderSourceExplorer />
          <div className="nx-mt-4 nx-text-sm nx-text-gray-600 dark:nx-text-gray-400">
            Use the <strong>Copy</strong> button in the explorer header to copy the snippet.
          </div>
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

