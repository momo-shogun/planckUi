import React from 'react';
import { Modal as RNModal, StyleSheet, View } from 'react-native';
import { getModalTokens } from '@my-ui-lib/tokens';
import { Pressable } from '../../primitives/Pressable';
import { Text } from '../../primitives/Text';
import { useTheme } from '../../system/ThemeContext';
import { createModalStyles } from './Modal.styles';
import type { ModalProps } from './Modal.types';

export function Modal({
  open,
  onRequestClose,
  title,
  children,
  unstyled = false,
  slots = {},
  testID,
  animationType = 'fade',
  presentationStyle,
}: ModalProps) {
  const handleClose = onRequestClose ?? (() => {});

  if (unstyled) {
    return (
      <RNModal
        animationType={animationType}
        presentationStyle={presentationStyle}
        testID={testID}
        transparent={false}
        visible={open}
        onRequestClose={handleClose}>
        {children}
      </RNModal>
    );
  }

  const theme = useTheme();
  const tokens = getModalTokens(theme);
  const styles = createModalStyles(tokens, theme);

  return (
    <RNModal
      animationType={animationType}
      presentationStyle={presentationStyle}
      transparent
      visible={open}
      onRequestClose={handleClose}
      testID={testID}>
      <View style={[styles.overlay, slots.overlay]} pointerEvents="box-none">
        <Pressable
          accessibilityLabel="Dismiss modal"
          accessibilityRole="button"
          onPress={handleClose}
          style={StyleSheet.absoluteFillObject}>
          <View />
        </Pressable>
        <View style={[styles.surface, slots.surface]} pointerEvents="box-none">
          {title ? (
            <Text style={[styles.title, slots.title]} variant="heading">
              {title}
            </Text>
          ) : null}
          <View style={[styles.body, slots.body]}>{children}</View>
        </View>
      </View>
    </RNModal>
  );
}
