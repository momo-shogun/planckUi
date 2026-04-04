import { useEffect, useRef, type MutableRefObject } from 'react';
import { AccessibilityInfo } from 'react-native';

/**
 * Ref stays true when the user prefers reduced motion (no layout animations).
 */
export function useReducedMotionRef(): MutableRefObject<boolean> {
  const ref = useRef(false);

  useEffect(() => {
    let mounted = true;
    const apply = (v: boolean | undefined) => {
      if (mounted) ref.current = Boolean(v);
    };

    const fn = AccessibilityInfo.isReduceMotionEnabled;
    if (typeof fn !== 'function') {
      return () => {
        mounted = false;
      };
    }

    const result = fn.call(AccessibilityInfo) as unknown;
    if (
      result != null &&
      typeof result === 'object' &&
      'then' in result &&
      typeof (result as Promise<boolean>).then === 'function'
    ) {
      (result as Promise<boolean>).then(apply);
    } else {
      apply(result as boolean | undefined);
    }

    return () => {
      mounted = false;
    };
  }, []);

  return ref;
}
