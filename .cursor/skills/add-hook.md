# Skill: Add a custom hook to `packages/core`

## 1. Location and naming

- Path: `packages/core/src/hooks/use{Name}.ts`
- Filename **must** be camelCase with `use` prefix: `useDisclosure.ts`, `useDebouncedValue.ts`
- Single hook per file (exception: tightly coupled private helpers in same file if not exported)

## 2. Rules

- **Pure logic only**: no JSX, no `StyleSheet.create`, no `react-native` `View`/`Text` imports.
- Allowed imports: `react`, small utilities, types from `react` / `@my-ui-lib/tokens` if needed for typing only.
- Hook name must match filename base (`useDisclosure` in `useDisclosure.ts`).
- Return shape should be an object or tuple; document it with an explicit TypeScript type or interface exported from the same file.

## 3. Required exports

- Default export **not** used; use **named export**: `export function useDisclosure(...)`
- Export the return type explicitly when non-obvious, e.g. `export interface UseDisclosureReturn { ... }`

## 4. Tests

- File: `packages/core/src/hooks/useDisclosure.test.ts` (mirror name)
- Use Jest + `@testing-library/react-native`’s **`renderHook`** (or equivalent) to assert:
  - Initial state matches arguments
  - Actions (`open`, `close`, `toggle`) mutate state as expected
- No snapshot of React trees unless testing a tiny wrapper component (prefer not to add wrappers for hooks)

## 5. Barrel and public API

- This repo currently re-exports hooks from `packages/core/src/index.ts` **directly** (no `hooks/index.ts` barrel). Add:
  - `export { useDisclosure } from './hooks/useDisclosure';`
  - `export type { UseDisclosureReturn } from './hooks/useDisclosure';` (if type exported)
- Keep exports **alphabetically grouped** with existing hooks in `index.ts` when practical.

## 6. Checklist

1. [ ] `use{Name}.ts` created under `packages/core/src/hooks/` with `use` prefix and no JSX/RN views.
2. [ ] Return type is explicit and exported if non-trivial.
3. [ ] `use{Name}.test.ts` exists; `renderHook` covers initial state + all actions.
4. [ ] `packages/core/src/index.ts` exports the hook (and types).
5. [ ] `pnpm --filter @my-ui-lib/core test` and `pnpm --filter @my-ui-lib/core lint` pass.

## 7. Worked example: `useDisclosure`

**`packages/core/src/hooks/useDisclosure.ts`**

```ts
import { useCallback, useState } from 'react';

export interface UseDisclosureReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export function useDisclosure(initialOpen = false): UseDisclosureReturn {
  const [isOpen, setOpen] = useState(initialOpen);

  const open = useCallback(() => {
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setOpen((o) => !o);
  }, []);

  return { isOpen, open, close, toggle };
}
```

**`packages/core/src/hooks/useDisclosure.test.ts`**

```ts
import { renderHook, act } from '@testing-library/react-native';
import { useDisclosure } from './useDisclosure';

describe('useDisclosure', () => {
  it('starts closed by default', () => {
    const { result } = renderHook(() => useDisclosure());
    expect(result.current.isOpen).toBe(false);
  });

  it('opens and closes', () => {
    const { result } = renderHook(() => useDisclosure(false));
    act(() => {
      result.current.open();
    });
    expect(result.current.isOpen).toBe(true);
    act(() => {
      result.current.close();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('toggles', () => {
    const { result } = renderHook(() => useDisclosure(false));
    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(true);
    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(false);
  });
});
```

**`packages/core/src/index.ts` additions:**

```ts
export { useDisclosure } from './hooks/useDisclosure';
export type { UseDisclosureReturn } from './hooks/useDisclosure';
```
