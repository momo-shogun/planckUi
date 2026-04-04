# Skill: Write or update Nextra docs (`docs/pages/`)

## 1. Nextra MDX rules

- Every page starts with **frontmatter** including at least `title:` (string). Nextra uses this for sidebar label and SEO.
- Import shared MDX components from **`nextra/components`**, e.g. `import { Callout } from 'nextra/components'`, `import { Steps, Callout } from 'nextra/components'`.
- Use **fenced code blocks** with a language tag: ` ```tsx `, ` ```bash `, ` ```json `—never bare triple backticks without a language when showing code.
- Internal links use **Next.js routes** as paths from site root: `/components/button`, `/theming/overview` (no `.mdx` suffix).
- Do not rely on HTML that breaks MDX (`<` in text must be escaped or wrapped in code).

## 2. `Preview` component (live RN Web)

- Import: `import { Preview } from '../../components/Preview'` from `docs/pages/components/*.mdx` (adjust `../` depth for nesting).
- Props:
  - `children`: real `@my-ui-lib/core` elements only.
  - `themeSwitcher` (default `true`): set `false` when comparing sizes/states on one theme only.
  - `minHeight` (default `120`): raise for tall examples (inputs, modals).
- `Preview` wraps content in `ThemeProvider`; do not double-wrap unless documenting `ThemeProvider` itself.

## 3. Component docs pages — required sections (order)

1. Frontmatter `title`
2. Imports: `Preview`, component from `@my-ui-lib/core` (never `packages/core/src/...`)
3. Short intro paragraph: what the component does
4. `## Preview` — `<Preview>` showing primary interactive states
5. `## Variants` — `<Preview themeSwitcher={false}>` per variant group
6. `## States` — disabled / loading / error as applicable (`themeSwitcher={false}` optional)
7. `## Props table` — markdown table: Prop | Type | Default | Description (complete)
8. `## Slots` — fenced `tsx` example with `slots={{ ... }}`
9. `## Unstyled` — fenced example with `unstyled`
10. `## Install` — `npx my-ui-lib add {name}` (or accurate CLI name)

## 4. Concept / guide pages (theming, quickstart)

- `##` hierarchy mirrors the outline users need: overview → details → code.
- Include at least one **runnable** or **copy-paste** code block per major idea.
- Link to related component pages with markdown links.
- Use `Callout` for constraints (peer deps, RN version, Expo note).

## 5. Importing real components in MDX

- Always: `import { Button } from '@my-ui-lib/core'`
- For primitives used only in examples: `import { View } from 'react-native'` is allowed in docs (webpack aliases to RN Web).
- For theme values in MDX when hooks are unavailable: `import { defaultTheme } from '@my-ui-lib/tokens'` for color props in previews (avoids arbitrary hex in live previews).

## 6. `_meta.json` updates

- **Root nav:** `docs/pages/_meta.json` — add keys for new top-level routes or set `type: "doc"` for folders (never `type: "folder"` in this repo; it breaks Nextra 2 sidebar).
- **Nested:** `docs/pages/components/_meta.json` — add `"kebab-name": "Display Name"` in desired sidebar order.
- Keys must match the **file name** without extension (`badge` for `badge.mdx`).

## 7. Forbidden patterns

- No relative imports into `packages/` from MDX (e.g. `../../../packages/core/...`).
- No hardcoded hex in **Preview children** except where docs explicitly allow chrome (leave to `Preview.tsx` switcher dots only; use theme tokens in examples).
- Do not replace live previews with static screenshots for interactive components.
- Do not commit `docs/.next/` (already gitignored).

## 8. Checklist

1. [ ] Frontmatter `title` present.
2. [ ] Imports use `nextra/components` and `@my-ui-lib/core` only (plus `react-native` / `@my-ui-lib/tokens` when needed).
3. [ ] Component pages include all **10** sections in order.
4. [ ] At least one `<Preview>` demonstrates real components.
5. [ ] Props table lists **every** public prop.
6. [ ] `_meta.json` updated for new routes.
7. [ ] `pnpm build --filter=@planckui/docs` succeeds after edits.

## 9. Worked example: `theming/overview.mdx` (condensed full page)

```mdx
---
title: Theming overview
---

# Theming overview

planckUi separates **primitive**, **semantic**, and **component** token layers. Only the semantic layer is swapped when you change themes.

## Primitive layer

Raw values live in `packages/tokens/src/tokens.input/`. Components never import these names directly.

## Semantic layer

`SemanticTokens` is the object passed to `ThemeProvider`. It includes `colors`, `spacing`, `radii`, `fontSizes`, and `fontWeights`.

## Component layer

Functions such as `getButtonTokens` in `@my-ui-lib/tokens` map semantic colors to roles (`bg`, `text`, `border`). Components consume those return objects inside `create{Name}Styles`.

## Switching themes

Pass a different `SemanticTokens` preset (e.g. `oceanTheme`) to `ThemeProvider`. All `useTheme()` consumers re-render; component code stays unchanged.

```tsx
import { ThemeProvider } from '@my-ui-lib/core';
import { oceanTheme } from '@my-ui-lib/tokens';

export function App() {
  return (
    <ThemeProvider theme={oceanTheme}>
      {/* app */}
    </ThemeProvider>
  );
}
```
```

This page is **concept-only** (no `Preview` required). For a **component** page, always add the Preview sections from section 3.
