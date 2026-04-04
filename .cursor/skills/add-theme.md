# Skill: Add a named theme to the token system

Dense reference for adding a new preset theme (e.g. `forestTheme`) that compiles through Style Dictionary into `SemanticTokens` and surfaces in docs + example app.

## 1. Where theme files live

- Per-theme **partial overrides** live in: `packages/tokens/src/tokens.input/themes/`
- One JSON file per theme, e.g. `forest.json`
- **Primitives** (ramps) live under `packages/tokens/src/tokens.input/` (e.g. `primitive.json`); only extend those if the new theme needs colors not already referenced by semantic mappings.

## 2. JSON structure a theme override must follow

- File is a **partial semantic override** matching existing keys used by the pipeline (same shape as `ocean.json`, `midnight.json`, `rose.json`).
- Top level: `{ "semantic": { "color": { ... } } }`
- Each color entry: `{ "value": "#RRGGBB", "$type": "color" }` (Style Dictionary v4 JSON format used by this repo).
- Override only keys that should differ from the default theme; unspecified keys inherit from the base build.
- Do **not** invent new semantic key names unless `semantic.ts` / generated contract already includes them—otherwise TypeScript and consumers break.

## 3. Rebuild tokens

From repo root:

```bash
pnpm build --filter=@my-ui-lib/tokens
```

Or from `packages/tokens`: `pnpm build` (runs `generate:tokens` + `tsup`). Confirm `packages/tokens/src/generated/tokens.ts` updates and is not hand-edited.

## 4. Export the new theme from `packages/tokens/src/index.ts`

- Import the generated raw tree for the new theme from `./generated/tokens` (after build adds e.g. `forestTokens`).
- Add a `toSemanticTokens(forestTokens)` call pattern **identical** to `defaultTheme`, `oceanTheme`, etc.: `export const forestTheme: SemanticTokens = toSemanticTokens(forestTokens);`
- Ensure `src/build.ts` / Style Dictionary config includes the new theme file so `forestTokens` exists in generated output (follow how `oceanTokens` is wired).

## 5. Add to docs `Preview.tsx`

- File: `docs/components/Preview.tsx`
- Import `forestTheme` from `@my-ui-lib/tokens`.
- Add to the `THEMES` record and to `THEME_ORDER` / label maps.
- Add a **dot color** for the switcher UI in `PRIMARY_DOT` (allowed hardcoded chrome per docs rules—must be a single swatch matching the theme’s primary feel).

## 6. Add to example app `apps/example/App.tsx`

- Import `forestTheme` from `@my-ui-lib/tokens`.
- Extend `ThemeName` union and `themeMap` with `forest: forestTheme`.
- Update `ThemeSwitcher` (or equivalent) so users can select the new preset if UI is driven by that record.

## 7. Checklist (all must be true)

1. [ ] New file exists under `packages/tokens/src/tokens.input/themes/` with valid partial `semantic.color` overrides.
2. [ ] `pnpm build --filter=@my-ui-lib/tokens` succeeds; generated JS includes the new token tree export.
3. [ ] `packages/tokens/src/index.ts` exports `forestTheme` (or your name) as `SemanticTokens`.
4. [ ] `docs/components/Preview.tsx` lists the theme in `THEMES` + switcher order + dot map.
5. [ ] `apps/example/App.tsx` includes the theme in `themeMap` / picker types.
6. [ ] `pnpm typecheck` and `pnpm lint` pass for touched packages.

## 8. Worked example: **forest** theme (green primary)

**`packages/tokens/src/tokens.input/themes/forest.json`**

```json
{
  "semantic": {
    "color": {
      "primary": { "value": "#15803d", "$type": "color" },
      "primaryHover": { "value": "#166534", "$type": "color" },
      "primaryForeground": { "value": "#ffffff", "$type": "color" },
      "borderFocus": { "value": "#22c55e", "$type": "color" }
    }
  }
}
```

**Build config (conceptual):** Register `forest.json` in the same way `ocean.json` is registered in `packages/tokens/src/build.ts` so output exports `forestTokens`.

**`packages/tokens/src/index.ts` (pattern):**

```ts
import { forestTokens } from './generated/tokens';
export const forestTheme: SemanticTokens = toSemanticTokens(forestTokens);
```

**Preview dot:** e.g. `#15803d` in `PRIMARY_DOT.forest`.

**Example app:** `ThemeName` includes `'forest'`; `themeMap.forest = forestTheme`.

After integration, run `pnpm build` at root to refresh Turbo outputs.
