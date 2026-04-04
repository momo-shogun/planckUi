import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  BackHandler,
  Modal as RNModal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { Portal } from '@gorhom/portal';
import { getModalTokens } from '@my-ui-lib/tokens';
import { Text } from '../../primitives/Text';
import { useReducedMotionRef } from '../../hooks/useReducedMotion';
import { useTheme } from '../../system/ThemeContext';
import { createModalStyles } from './Modal.styles';
import type {
  ModalBodyProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
} from './Modal.types';

const ENTER_OVERLAY_MS = 220;
const ENTER_DIALOG_MS = 200;
const EXIT_MS = 180;

export function ModalHeader(props: ModalHeaderProps) {
  const { children, unstyled = false, slots = {}, testID } = props;
  if (unstyled) {
    return (
      <View testID={testID}>
        {typeof children === 'string' ? <Text>{children}</Text> : children}
      </View>
    );
  }
  const theme = useTheme();
  const tokens = getModalTokens(theme);
  const styles = createModalStyles(tokens, theme, 'md');
  return (
    <View style={[styles.headerRoot, slots.root]} testID={testID}>
      {typeof children === 'string' ? (
        <Text style={[styles.headerTitle, slots.title]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}

export function ModalBody(props: ModalBodyProps) {
  const { children, unstyled = false, slots = {}, testID } = props;
  if (unstyled) {
    return <View testID={testID}>{children}</View>;
  }
  const theme = useTheme();
  const tokens = getModalTokens(theme);
  const styles = createModalStyles(tokens, theme, 'md');
  return (
    <View style={[styles.bodyRoot, slots.root]} testID={testID}>
      {children}
    </View>
  );
}

export function ModalFooter(props: ModalFooterProps) {
  const { children, unstyled = false, slots = {}, testID } = props;
  if (unstyled) {
    return <View testID={testID}>{children}</View>;
  }
  const theme = useTheme();
  const tokens = getModalTokens(theme);
  const styles = createModalStyles(tokens, theme, 'md');
  return (
    <View style={[styles.footerRoot, slots.root]} testID={testID}>
      {children}
    </View>
  );
}

export function Modal(props: ModalProps) {
  const {
    visible,
    onClose,
    closeOnBackdrop = true,
    closeOnBack = true,
    size = 'md',
    children,
    unstyled = false,
    slots = {},
    testID,
  } = props;
  const handleClose = onClose ?? (() => {});
  const reduceMotion = useReducedMotionRef();

  if (unstyled) {
    return (
      <RNModal
        transparent={false}
        visible={visible}
        onRequestClose={handleClose}
        testID={testID}>
        {children}
      </RNModal>
    );
  }

  const theme = useTheme();
  const tokens = getModalTokens(theme);
  const styles = createModalStyles(tokens, theme, size);

  const [mounted, setMounted] = useState(visible);
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const dialogOpacity = useRef(new Animated.Value(0)).current;
  const dialogScale = useRef(new Animated.Value(0.96)).current;

  useEffect(() => {
    if (visible) {
      setMounted(true);
    }
  }, [visible]);

  useEffect(() => {
    if (!mounted) return;

    const instant = reduceMotion.current;

    if (instant) {
      overlayOpacity.setValue(visible ? 1 : 0);
      dialogOpacity.setValue(visible ? 1 : 0);
      dialogScale.setValue(visible ? 1 : 0.96);
      if (!visible) {
        setMounted(false);
      }
      return;
    }

    if (visible) {
      overlayOpacity.setValue(0);
      dialogOpacity.setValue(0);
      dialogScale.setValue(0.96);
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: ENTER_OVERLAY_MS,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.spring(dialogScale, {
            toValue: 1,
            friction: 9,
            tension: 80,
            useNativeDriver: true,
          }),
          Animated.timing(dialogOpacity, {
            toValue: 1,
            duration: ENTER_DIALOG_MS,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: EXIT_MS,
          useNativeDriver: true,
        }),
        Animated.timing(dialogOpacity, {
          toValue: 0,
          duration: EXIT_MS - 30,
          useNativeDriver: true,
        }),
        Animated.timing(dialogScale, {
          toValue: 0.96,
          duration: EXIT_MS,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) setMounted(false);
      });
    }
  }, [visible, mounted, overlayOpacity, dialogOpacity, dialogScale, reduceMotion]);

  useEffect(() => {
    if (!visible || !closeOnBack) return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      handleClose();
      return true;
    });
    return () => sub.remove();
  }, [visible, closeOnBack, handleClose]);

  if (!mounted) {
    return null;
  }

  const onBackdropPress = () => {
    if (closeOnBackdrop) handleClose();
  };

  return (
    <Portal>
      <View
        style={[styles.portalRoot, slots.overlay]}
        pointerEvents="box-none"
        testID={testID}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss modal"
          onPress={onBackdropPress}
          style={[StyleSheet.absoluteFill, slots.backdrop]}>
          <Animated.View
            style={[styles.backdrop, { opacity: overlayOpacity }]}
          />
        </Pressable>
        <Animated.View
          pointerEvents="box-none"
          style={[
            styles.surface,
            slots.surface,
            {
              opacity: dialogOpacity,
              transform: [{ scale: dialogScale }],
            },
          ]}>
          <View style={[styles.content, slots.content]}>{children}</View>
        </Animated.View>
      </View>
    </Portal>
  );
}
