import { useCallback, useState } from 'react';

export function useFocusRing(): {
  isFocused: boolean;
  focusProps: { onFocus: () => void; onBlur: () => void };
} {
  const [isFocused, setFocused] = useState(false);

  const onFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocused(false);
  }, []);

  return {
    isFocused,
    focusProps: { onFocus, onBlur },
  };
}
