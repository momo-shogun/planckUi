import React, { useCallback, useMemo } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { getComposerInputTokens } from '@my-ui-lib/tokens';
import { useControlledState } from '../../../hooks/useControlledState';
import { useFocusRing } from '../../../hooks/useFocusRing';
import { Text } from '../../../primitives/Text';
import { useTheme } from '../../../system/ThemeContext';
import { createComposerInputStyles } from './ComposerInput.styles';
import type { ComposerChip, ComposerInputProps } from './ComposerInput.types';

// ─── Glyphs ───────────────────────────────────────────────────────────────────
// All glyphs use pure View primitives — no SVG dependency.

function PlusGlyph({ color }: { color: string }) {
  const bar: object = { position: 'absolute', backgroundColor: color, borderRadius: 1 };
  return (
    <View style={{ width: 12, height: 12 }}>
      <View style={[bar, { left: 5, top: 0, width: 2, height: 12 }]} />
      <View style={[bar, { left: 0, top: 5, width: 12, height: 2 }]} />
    </View>
  );
}

function MicGlyph({ color }: { color: string }) {
  return (
    <View style={{ width: 16, height: 16, alignItems: 'center' }}>
      <View
        style={{
          width: 8,
          height: 9,
          borderRadius: 4,
          borderWidth: 1.4,
          borderColor: color,
        }}
      />
      <View
        style={{
          marginTop: 1,
          width: 1.4,
          height: 2.5,
          backgroundColor: color,
          borderRadius: 1,
        }}
      />
      <View
        style={{
          width: 9,
          height: 1.4,
          backgroundColor: color,
          borderRadius: 1,
        }}
      />
      <View
        style={{
          marginTop: 0.5,
          width: 12,
          height: 6,
          borderTopWidth: 1.4,
          borderTopColor: color,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
      />
    </View>
  );
}

function GmailGlyph({
  red,
  yellow,
  green,
  blue,
}: {
  red: string;
  yellow: string;
  green: string;
  blue: string;
}) {
  return (
    <View style={{ width: 14, height: 14, position: 'relative' }}>
      <View
        style={{
          position: 'absolute',
          left: 1,
          top: 2,
          width: 2,
          height: 10,
          borderRadius: 1,
          backgroundColor: red,
        }}
      />
      <View
        style={{
          position: 'absolute',
          right: 1,
          top: 2,
          width: 2,
          height: 10,
          borderRadius: 1,
          backgroundColor: red,
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: 2.5,
          top: 2.2,
          width: 4.7,
          height: 2,
          borderRadius: 1,
          backgroundColor: red,
          transform: [{ rotate: '35deg' }],
        }}
      />
      <View
        style={{
          position: 'absolute',
          right: 2.5,
          top: 2.2,
          width: 4.7,
          height: 2,
          borderRadius: 1,
          backgroundColor: red,
          transform: [{ rotate: '-35deg' }],
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: 2.2,
          bottom: 2,
          width: 4,
          height: 2,
          borderRadius: 1,
          backgroundColor: blue,
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: 6.1,
          bottom: 2,
          width: 2.4,
          height: 2,
          borderRadius: 1,
          backgroundColor: green,
        }}
      />
      <View
        style={{
          position: 'absolute',
          right: 2.2,
          bottom: 2,
          width: 3.2,
          height: 2,
          borderRadius: 1,
          backgroundColor: yellow,
        }}
      />
    </View>
  );
}

function ArrowUpGlyph({ color }: { color: string }) {
  return (
    <View style={{ width: 14, height: 14, alignItems: 'center', justifyContent: 'center' }}>
      {/* Arrow head — two angled bars */}
      <View
        style={{
          position: 'absolute',
          top: 1,
          left: 2,
          width: 7,
          height: 1.5,
          backgroundColor: color,
          borderRadius: 1,
          transform: [{ rotate: '-45deg' }, { translateX: 1 }],
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 1,
          right: 2,
          width: 7,
          height: 1.5,
          backgroundColor: color,
          borderRadius: 1,
          transform: [{ rotate: '45deg' }, { translateX: -1 }],
        }}
      />
      {/* Shaft */}
      <View
        style={{
          position: 'absolute',
          top: 3,
          width: 1.5,
          height: 9,
          backgroundColor: color,
          borderRadius: 1,
        }}
      />
    </View>
  );
}

// ─── Chip ─────────────────────────────────────────────────────────────────────

function Chip({
  chip,
  onPress,
  styles,
  slots,
  gmailColors,
}: {
  chip: ComposerChip;
  onPress?: (id: string) => void;
  styles: ReturnType<typeof createComposerInputStyles>;
  slots?: ComposerInputProps['slots'];
  gmailColors: {
    red: string;
    yellow: string;
    green: string;
    blue: string;
  };
}) {
  const isGmailChip =
    chip.id.toLowerCase().includes('gmail') || chip.label.toLowerCase().includes('gmail');
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={chip.label}
      onPress={() => onPress?.(chip.id)}
      style={({ pressed }) => [
        styles.chip,
        pressed && { opacity: 0.72, transform: [{ scale: 0.97 }] },
        slots?.chip,
      ]}
    >
      {isGmailChip ? (
        <View style={styles.chipIconWrap}>
          <GmailGlyph
            red={gmailColors.red}
            yellow={gmailColors.yellow}
            green={gmailColors.green}
            blue={gmailColors.blue}
          />
        </View>
      ) : null}
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

// ─── ComposerInput ────────────────────────────────────────────────────────────

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
  const gmailColors = useMemo(
    () => ({
      red: theme.colors.destructive,
      yellow: theme.colors.warning,
      green: theme.colors.success,
      blue: theme.colors.primary,
    }),
    [theme.colors.destructive, theme.colors.warning, theme.colors.success, theme.colors.primary]
  );
  const [value, setValue] = useControlledState(valueProp, defaultValue, onChangeText);
  const { isFocused, focusProps } = useFocusRing();
  const styles = createComposerInputStyles(tokens, theme, isFocused, disabled);

  const sendEnabled = sendEnabledProp ?? value.trim().length > 0;

  const handleSend = useCallback(() => {
    if (!sendEnabled || disabled) return;
    onPressSend?.(value);
  }, [disabled, onPressSend, sendEnabled, value]);

  const hasChips = chips.length > 0;

  return (
    <View
      style={[styles.root, slots?.root]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      {/* ── Top row: chips (if any) + text input ─────────────────────────── */}
      <View style={styles.topRow}>

        <View style={styles.center}>
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
            multiline={false}
          />
        </View>
      </View>

      {/* ── Bottom row: left actions · · · right actions ──────────────────── */}
      <View style={styles.bottomRow}>

        {/* Left — add button */}
        <View style={styles.leftActions}>
          {hasChips && (
            <View style={styles.chipsRow}>
              {chips.map((chip) => (
                <Chip
                  key={chip.id}
                  chip={chip}
                  onPress={onPressChip}
                  styles={styles}
                  slots={slots}
                  gmailColors={gmailColors}
                />
              ))}
            </View>
          )}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Add attachment"
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

        {/* Right — mic + send */}
        <View style={styles.rightActions}>
          {!hideMic && (
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
          )}

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Send message"
            disabled={!sendEnabled || disabled}
            onPress={handleSend}
            style={({ pressed }) => [
              styles.sendCircle,
              (!sendEnabled || disabled) && styles.sendCircleDisabled,
              pressed && sendEnabled && !disabled && {
                opacity: 0.82,
                transform: [{ scale: 0.96 }],
              },
            ]}
          >
            <ArrowUpGlyph
              color={!sendEnabled || disabled ? tokens.sendFgDisabled : tokens.sendFg}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}