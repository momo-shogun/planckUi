import React, { useCallback } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { getComposerInputTokens } from '@my-ui-lib/tokens';
import { useControlledState } from '../../../hooks/useControlledState';
import { useFocusRing } from '../../../hooks/useFocusRing';
import { Text } from '../../../primitives/Text';
import { useTheme } from '../../../system/ThemeContext';
import { createComposerInputStyles } from './ComposerInput.styles';
import type { ComposerChip, ComposerInputProps } from './ComposerInput.types';

function PlusGlyph({ color }: { color: string }) {
  return (
    <View style={{ width: 14, height: 14 }}>
      <View
        style={{
          position: 'absolute',
          left: 6,
          top: 1,
          width: 2,
          height: 12,
          backgroundColor: color,
          borderRadius: 1,
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: 1,
          top: 6,
          width: 12,
          height: 2,
          backgroundColor: color,
          borderRadius: 1,
        }}
      />
    </View>
  );
}

function MicGlyph({ color }: { color: string }) {
  return (
    <View style={{ width: 16, height: 16, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: 8,
          height: 10,
          borderRadius: 4,
          borderWidth: 2,
          borderColor: color,
        }}
      />
      <View style={{ width: 2, height: 4, backgroundColor: color, marginTop: 1, borderRadius: 1 }} />
      <View style={{ width: 8, height: 2, backgroundColor: color, borderRadius: 1 }} />
    </View>
  );
}

function SendGlyph({ color }: { color: string }) {
  return (
    <View style={{ width: 16, height: 16, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: 0,
          height: 0,
          borderLeftWidth: 6,
          borderRightWidth: 6,
          borderBottomWidth: 10,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: color,
          transform: [{ translateY: -1 }],
        }}
      />
      <View style={{ width: 2, height: 4, backgroundColor: color, borderRadius: 1, marginTop: -1 }} />
    </View>
  );
}

function Chip({
  chip,
  onPress,
  styles,
  slots,
}: {
  chip: ComposerChip;
  onPress?: (id: string) => void;
  styles: ReturnType<typeof createComposerInputStyles>;
  slots?: ComposerInputProps['slots'];
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress?.(chip.id)}
      style={({ pressed }) => [
        styles.chip,
        pressed && { transform: [{ scale: 0.98 }] },
        slots?.chip,
      ]}
    >
      <Text numberOfLines={1} style={[styles.chipText, slots?.chipText]} variant="body">
        {chip.label}
      </Text>
      {chip.count != null ? (
        <Text style={[styles.chipCount, slots?.chipCountText]} variant="body">
          +{chip.count}
        </Text>
      ) : null}
    </Pressable>
  );
}

export function ComposerInput(props: ComposerInputProps) {
  const {
    value: valueProp,
    defaultValue = '',
    onChangeText,
    placeholder = 'Assign a task or ask anything',
    disabled = false,
    chips = [],
    onPressAdd,
    onPressChip,
    onPressMic,
    onPressSend,
    hideMic = false,
    sendEnabled: sendEnabledProp,
    testID,
    accessibilityLabel,
    keyboardType,
    returnKeyType = 'send',
    slots,
  } = props;

  const theme = useTheme();
  const tokens = getComposerInputTokens(theme);
  const [value, setValue] = useControlledState(valueProp, defaultValue, onChangeText);
  const { isFocused, focusProps } = useFocusRing();
  const styles = createComposerInputStyles(tokens, theme, isFocused, disabled);

  const sendEnabled = sendEnabledProp ?? value.trim().length > 0;

  const handleSend = useCallback(() => {
    if (!sendEnabled || disabled) return;
    onPressSend?.(value);
  }, [disabled, onPressSend, sendEnabled, value]);

  return (
    <View style={[styles.root, slots?.root]} testID={testID} accessibilityLabel={accessibilityLabel}>
      <View style={styles.leftActions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add"
          disabled={disabled}
          onPress={onPressAdd}
          style={({ pressed }) => [
            styles.actionCircle,
            pressed && styles.actionCirclePressed,
          ]}
        >
          <PlusGlyph color={tokens.iconFg} />
        </Pressable>
      </View>

      <View style={styles.center}>
        {chips.length ? (
          <View style={styles.chipsRow}>
            {chips.map((chip) => (
              <Chip key={chip.id} chip={chip} onPress={onPressChip} styles={styles} slots={slots} />
            ))}
          </View>
        ) : null}
        <TextInput
          {...focusProps}
          editable={!disabled}
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          placeholderTextColor={tokens.placeholder}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={handleSend}
          style={[styles.input, slots?.input]}
        />
      </View>

      <View style={styles.rightActions}>
        {!hideMic ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Voice input"
            disabled={disabled}
            onPress={onPressMic}
            style={({ pressed }) => [
              styles.actionCircle,
              pressed && styles.actionCirclePressed,
            ]}
          >
            <MicGlyph color={tokens.iconFg} />
          </Pressable>
        ) : null}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Send"
          disabled={!sendEnabled || disabled}
          onPress={handleSend}
          style={({ pressed }) => [
            styles.sendCircle,
            (!sendEnabled || disabled) && styles.sendCircleDisabled,
            pressed && sendEnabled && !disabled && { transform: [{ scale: 0.98 }] },
          ]}
        >
          <SendGlyph color={!sendEnabled || disabled ? tokens.sendFgDisabled : tokens.sendFg} />
        </Pressable>
      </View>
    </View>
  );
}

