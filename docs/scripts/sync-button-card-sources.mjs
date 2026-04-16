/**
 * Generates docs/data/buttonCardSources.generated.ts from repo source files
 * so the docs SourceExplorer stays aligned with packages/core + example app.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');
const OUT = path.join(__dirname, '../data/buttonCardSources.generated.ts');

/** @type {{ id: string; file: string }[]} */
const FILES = [
  { id: 'Button/Button.tsx', file: 'packages/core/src/components/Button/Button.tsx' },
  { id: 'PillButtonV1/PillButtonV1.tsx', file: 'packages/core/src/components/Button/PillButtonV1/PillButtonV1.tsx' },
  { id: 'PillButtonV1/PillButtonV1.styles.ts', file: 'packages/core/src/components/Button/PillButtonV1/PillButtonV1.styles.ts' },
  { id: 'PillButtonV1/PillButtonV1.types.ts', file: 'packages/core/src/components/Button/PillButtonV1/PillButtonV1.types.ts' },
  { id: 'PillButtonV1/index.ts', file: 'packages/core/src/components/Button/PillButtonV1/index.ts' },
  { id: 'ButtonIconOnly/ButtonIconOnly.tsx', file: 'packages/core/src/components/Button/ButtonIconOnly/ButtonIconOnly.tsx' },
  { id: 'ButtonIconOnly/ButtonIconOnly.styles.ts', file: 'packages/core/src/components/Button/ButtonIconOnly/ButtonIconOnly.styles.ts' },
  { id: 'ButtonIconOnly/ButtonIconOnly.types.ts', file: 'packages/core/src/components/Button/ButtonIconOnly/ButtonIconOnly.types.ts' },
  { id: 'ButtonIconOnly/index.ts', file: 'packages/core/src/components/Button/ButtonIconOnly/index.ts' },
  { id: 'MarqueeButton/MarqueeButton.tsx', file: 'packages/core/src/components/Button/MarqueeButton/MarqueeButton.tsx' },
  { id: 'MarqueeButton/MarqueeButton.styles.ts', file: 'packages/core/src/components/Button/MarqueeButton/MarqueeButton.styles.ts' },
  { id: 'MarqueeButton/MarqueeButton.types.ts', file: 'packages/core/src/components/Button/MarqueeButton/MarqueeButton.types.ts' },
  { id: 'MarqueeButton/index.ts', file: 'packages/core/src/components/Button/MarqueeButton/index.ts' },
  { id: 'Button/index.ts', file: 'packages/core/src/components/Button/index.ts' },
  { id: 'MPCard/MPCard.tsx', file: 'packages/core/src/components/Cards/MPCard/MPCard.tsx' },
  { id: 'MPCard/MPCard.styles.ts', file: 'packages/core/src/components/Cards/MPCard/MPCard.styles.ts' },
  { id: 'MPCard/MPCard.types.ts', file: 'packages/core/src/components/Cards/MPCard/MPCard.types.ts' },
  { id: 'MPCard/index.ts', file: 'packages/core/src/components/Cards/MPCard/index.ts' },
  { id: 'Cards/index.ts', file: 'packages/core/src/components/Cards/index.ts' },
  { id: 'example/PillButtonV1Screen.tsx', file: 'apps/example/src/screens/buttonLab/PillButtonV1Screen.tsx' },
  { id: 'example/ButtonIconOnlyScreen.tsx', file: 'apps/example/src/screens/buttonLab/ButtonIconOnlyScreen.tsx' },
  { id: 'example/MarqueeButtonScreen.tsx', file: 'apps/example/src/screens/buttonLab/MarqueeButtonScreen.tsx' },
  { id: 'example/MPCardScreen.tsx', file: 'apps/example/src/screens/cardsLab/MPCardScreen.tsx' },
];

function main() {
  /** @type {Record<string, string>} */
  const sources = {};
  for (const { id, file } of FILES) {
    const abs = path.join(REPO_ROOT, file);
    if (!fs.existsSync(abs)) {
      console.error(`sync-button-card-sources: missing file ${file}`);
      process.exitCode = 1;
      return;
    }
    sources[id] = fs.readFileSync(abs, 'utf8');
  }

  const body = Object.entries(sources)
    .map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`)
    .join('\n');

  const header = `/* eslint-disable */
/**
 * AUTO-GENERATED — do not edit by hand.
 * Regenerate: \`pnpm --filter @planckui/docs run generate:sources\` (runs before dev/build).
 */
`;

  const out = `${header}export const BUTTON_CARD_SOURCES = {\n${body}\n} as const;\n\nexport type ButtonCardSourceId = keyof typeof BUTTON_CARD_SOURCES;\n`;
  fs.writeFileSync(OUT, out, 'utf8');
  console.log(`wrote ${path.relative(REPO_ROOT, OUT)} (${Object.keys(sources).length} files)`);
}

main();
