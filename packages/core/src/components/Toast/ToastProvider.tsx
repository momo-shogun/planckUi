import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Animated, View } from 'react-native';
import { Portal } from '@gorhom/portal';
import { getToastTokens } from '@my-ui-lib/tokens';
import { useReducedMotionRef } from '../../hooks/useReducedMotion';
import { useTheme } from '../../system/ThemeContext';
import { createToastStyles } from './Toast.styles';
import { Toast } from './Toast';
import {
  DEFAULT_TOAST_DURATION_MS,
  TOAST_MAX_VISIBLE,
  type ToastContextValue,
  type ToastProviderProps,
  type ToastShowOptions,
} from './Toast.types';

const ToastContext = createContext<ToastContextValue | null>(null);

type QueuedToast = ToastShowOptions & {
  id: string;
  progress: Animated.Value;
};

function ToastDurationSync({
  duration,
  progress,
  onComplete,
  reduceMotionRef,
}: {
  duration: number;
  progress: Animated.Value;
  onComplete: () => void;
  reduceMotionRef: React.MutableRefObject<boolean>;
}) {
  const doneRef = useRef(false);
  const completeOnce = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onComplete();
  }, [onComplete]);

  React.useEffect(() => {
    if (reduceMotionRef.current) {
      const t = setTimeout(completeOnce, duration);
      return () => clearTimeout(t);
    }
    const anim = Animated.timing(progress, {
      toValue: 0,
      duration,
      useNativeDriver: false,
    });
    anim.start(({ finished }) => {
      if (finished) completeOnce();
    });
    return () => {
      anim.stop();
    };
  }, [completeOnce, duration, progress, reduceMotionRef]);

  return null;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [queue, setQueue] = useState<QueuedToast[]>([]);
  const idCounter = useRef(0);
  const theme = useTheme();
  const reduceMotionRef = useReducedMotionRef();

  const dismissToast = useCallback((id: string) => {
    setQueue((q) => q.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((options: ToastShowOptions) => {
    const id =
      options.id ?? `toast-${Date.now()}-${++idCounter.current}`;
    const duration = options.duration ?? DEFAULT_TOAST_DURATION_MS;
    const progress = new Animated.Value(1);
    setQueue((prev) => {
      const entry: QueuedToast = {
        ...options,
        id,
        duration,
        progress,
      };
      const next = [...prev, entry];
      return next.length > TOAST_MAX_VISIBLE ? next.slice(-TOAST_MAX_VISIBLE) : next;
    });
    return id;
  }, []);

  const ctx = useMemo<ToastContextValue>(
    () => ({ showToast, dismissToast }),
    [dismissToast, showToast]
  );

  const defaultTokens = getToastTokens(theme, 'default');
  const hostStyles = createToastStyles(defaultTokens, theme);

  return (
    <ToastContext.Provider value={ctx}>
      {children}
      <Portal>
        <View style={hostStyles.host} pointerEvents="box-none">
          {queue.map((item) => (
            <React.Fragment key={item.id}>
              <ToastDurationSync
                duration={item.duration ?? DEFAULT_TOAST_DURATION_MS}
                progress={item.progress}
                reduceMotionRef={reduceMotionRef}
                onComplete={() => dismissToast(item.id)}
              />
              <Toast
                title={item.title}
                description={item.description}
                intent={item.intent}
                progress={item.progress}
                testID={`toast-${item.id}`}
              />
            </React.Fragment>
          ))}
        </View>
      </Portal>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
}
