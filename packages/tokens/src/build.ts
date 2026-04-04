import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';
import { formats, transforms } from 'style-dictionary/enums';
import type { DesignTokens } from 'style-dictionary/types';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, 'generated');
const inputDir = join(__dirname, 'tokens.input');

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

function deepMerge(
  base: Record<string, unknown>,
  override: Record<string, unknown>
): Record<string, unknown> {
  const result: Record<string, unknown> = { ...base };
  for (const key of Object.keys(override)) {
    const bv = base[key];
    const ov = override[key];
    const ovIsLeaf = isPlainObject(ov) && 'value' in ov;
    if (
      !ovIsLeaf &&
      isPlainObject(bv) &&
      isPlainObject(ov)
    ) {
      result[key] = deepMerge(bv, ov);
    } else {
      result[key] = ov;
    }
  }
  return result;
}

function readJson<T>(relativePath: string): T {
  const full = join(inputDir, relativePath);
  return JSON.parse(readFileSync(full, 'utf8')) as T;
}

/**
 * Style Dictionary v4 leaves a nested tree under dictionary.tokens; unwrap leaf `{ value }` nodes.
 */
function unwrapTokenTree(node: unknown): unknown {
  if (node === null || typeof node !== 'object') {
    return node;
  }
  const obj = node as Record<string, unknown>;
  if ('value' in obj) {
    return unwrapTokenTree(obj.value);
  }
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith('$')) continue;
    out[k] = unwrapTokenTree(v);
  }
  return out;
}

function coerceNumericDimensions(data: Record<string, unknown>): void {
  for (const root of ['spacing', 'radii', 'fontSize'] as const) {
    const block = data[root];
    if (!isPlainObject(block)) continue;
    for (const key of Object.keys(block)) {
      const v = block[key];
      if (typeof v === 'string' && /^-?\d+(\.\d+)?$/.test(v)) {
        block[key] = Number(v);
      }
    }
  }
}

async function buildDictionary(
  merged: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const sd = new StyleDictionary({
    tokens: merged as DesignTokens,
    platforms: {
      rn: {
        transforms: [transforms.attributeCti, transforms.namePascal, transforms.colorHex],
      },
    },
  });

  const dict = await sd.getPlatformTokens('rn');
  const plain = unwrapTokenTree(dict.tokens);
  if (!isPlainObject(plain)) {
    throw new Error('Expected object token tree from Style Dictionary');
  }
  coerceNumericDimensions(plain);
  return plain;
}

async function main(): Promise<void> {
  mkdirSync(outDir, { recursive: true });

  const primitive = readJson<Record<string, unknown>>('primitive.json');
  const semanticFile = readJson<{ semantic: Record<string, unknown> }>('semantic.json');

  const oceanTheme = readJson<{ semantic: Record<string, unknown> }>('themes/ocean.json');
  const midnightTheme = readJson<{ semantic: Record<string, unknown> }>('themes/midnight.json');
  const roseTheme = readJson<{ semantic: Record<string, unknown> }>('themes/rose.json');

  const defaultMerged = {
    ...primitive,
    semantic: semanticFile.semantic,
  };

  const defaultTokens = await buildDictionary(defaultMerged);
  const oceanTokens = await buildDictionary({
    ...primitive,
    semantic: deepMerge(
      JSON.parse(JSON.stringify(semanticFile.semantic)) as Record<string, unknown>,
      oceanTheme.semantic
    ),
  });
  const midnightTokens = await buildDictionary({
    ...primitive,
    semantic: deepMerge(
      JSON.parse(JSON.stringify(semanticFile.semantic)) as Record<string, unknown>,
      midnightTheme.semantic
    ),
  });
  const roseTokens = await buildDictionary({
    ...primitive,
    semantic: deepMerge(
      JSON.parse(JSON.stringify(semanticFile.semantic)) as Record<string, unknown>,
      roseTheme.semantic
    ),
  });

  const tokensFile = `/* eslint-disable */
/**
 * AUTO-GENERATED — do not edit by hand.
 * Platform: ${formats.javascriptEs6} (values resolved for React Native).
 */
export const defaultTokens = ${JSON.stringify(defaultTokens, null, 2)} as const;

export const oceanTokens = ${JSON.stringify(oceanTokens, null, 2)} as const;

export const midnightTokens = ${JSON.stringify(midnightTokens, null, 2)} as const;

export const roseTokens = ${JSON.stringify(roseTokens, null, 2)} as const;

/** Alias for the default resolved token map */
export const tokens = defaultTokens;
`;

  writeFileSync(join(outDir, 'tokens.ts'), tokensFile, 'utf8');

  const typesFile = `/**
 * AUTO-GENERATED — do not edit by hand.
 */
import type { tokens } from './tokens';

export type GeneratedTokens = typeof tokens;
`;

  writeFileSync(join(outDir, 'types.ts'), typesFile, 'utf8');

  void formats;
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
