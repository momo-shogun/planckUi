import { useCallback, useState } from 'react';

export function useControlledState<T>(
  controlled: T | undefined,
  defaultValue: T,
  onChange?: (val: T) => void
): [T, (val: T) => void] {
  const isControlled = controlled !== undefined;
  const [internal, setInternal] = useState<T>(defaultValue);
  const value = isControlled ? controlled : internal;

  const setValue = useCallback(
    (val: T) => {
      if (!isControlled) {
        setInternal(val);
      }
      onChange?.(val);
    },
    [isControlled, onChange]
  );

  return [value, setValue];
}
