import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { Text, View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { getBottomSheetTokens } from '@my-ui-lib/tokens';
import { useTheme } from '../../system/ThemeContext';
import { createBottomSheetStyles } from './BottomSheet.styles';
import type { BottomSheetProps } from './BottomSheet.types';

const DEFAULT_SNAPS: Array<string | number> = ['45%', '80%'];

export type BottomSheetModalRef = React.ElementRef<typeof BottomSheetModal>;

const BottomSheetInner = forwardRef<BottomSheetModalRef, BottomSheetProps>(
  function BottomSheet(props, forwardedRef) {
    const {
      visible,
      onClose,
      snapPoints = DEFAULT_SNAPS,
      title,
      children,
      unstyled = false,
      slots = {},
      testID,
      modalProps,
    } = props;
    const theme = useTheme();
    const tokens = getBottomSheetTokens(theme);
    const styles = useMemo(
      () => createBottomSheetStyles(tokens, theme),
      [tokens, theme]
    );

    const ref = useRef<BottomSheetModalRef>(null);
    useImperativeHandle(forwardedRef, () => ref.current as BottomSheetModalRef);

    useEffect(() => {
      if (visible) {
        requestAnimationFrame(() => ref.current?.present());
      } else {
        ref.current?.dismiss();
      }
    }, [visible]);

    const handleDismiss = useCallback(() => {
      onClose?.();
    }, [onClose]);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.45}
        />
      ),
      []
    );

    const backgroundStyle = useMemo(
      () => [styles.sheet, slots.sheet],
      [styles.sheet, slots.sheet]
    );

    const handleIndicatorStyle = useMemo(
      () => styles.handleIndicator,
      [styles.handleIndicator]
    );

    if (unstyled) {
      return (
        <BottomSheetModal
          ref={ref}
          snapPoints={snapPoints}
          onDismiss={handleDismiss}
          backdropComponent={renderBackdrop}
          {...modalProps}>
          <BottomSheetView testID={testID}>{children}</BottomSheetView>
        </BottomSheetModal>
      );
    }

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        onDismiss={handleDismiss}
        backdropComponent={renderBackdrop}
        backgroundStyle={backgroundStyle}
        handleIndicatorStyle={handleIndicatorStyle}
        {...modalProps}>
        <BottomSheetView testID={testID}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          <View style={[styles.content, slots.content]}>{children}</View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

BottomSheetInner.displayName = 'BottomSheet';

/** Explicit typing so declaration emit keeps full JSX props (incl. children). */
export const BottomSheet =
  BottomSheetInner as React.ForwardRefExoticComponent<
    BottomSheetProps & React.RefAttributes<BottomSheetModalRef>
  >;
