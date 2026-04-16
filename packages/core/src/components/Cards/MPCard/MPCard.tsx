import React, { useMemo } from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Rect, Stop } from 'react-native-svg';
import { Pressable } from '../../../primitives/Pressable';
import { Text } from '../../../primitives/Text';
import { useTheme } from '../../../system/ThemeContext';
import { ButtonIconOnly } from '../../Button';
import { createMPCardStyles } from './MPCard.styles';
import type { MPCardProps } from './MPCard.types';

const DEFAULT_BG = ['#ffffff', '#f4f1e8'] as const;

function clampPct(v: number) {
  if (Number.isNaN(v)) return 0;
  return Math.max(0, Math.min(100, v));
}

export function MPCard(props: MPCardProps) {
  const {
    avatar,
    name,
    subtitle,
    matchRatePct = 0,
    onPress,
    onPressTopRight,
    topRightIcon,
    onPressChat,
    chatIcon,
    onPressCall,
    callIcon,
    backgroundGradientColors = DEFAULT_BG,
    backgroundColor,
    textColor,
    mutedTextColor,
    progressColor,
    progressTrackColor,
    disabled = false,
    unstyled = false,
    slots = {},
    testID,
    accessibilityLabel,
    ...rest
  } = props;

  if (unstyled) {
    return (
      <Pressable
        disabled={disabled}
        onPress={onPress}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        {...rest}
      >
        {avatar}
        <Text>{name}</Text>
      </Pressable>
    );
  }

  const theme = useTheme();
  const styles = useMemo(() => createMPCardStyles(theme), [theme]);

  const pct = clampPct(matchRatePct);
  const resolvedText = textColor ?? theme.colors.textPrimary;
  const resolvedMuted = mutedTextColor ?? theme.colors.textSecondary;
  const resolvedTrack = progressTrackColor ?? 'rgba(0,0,0,0.10)';
  const resolvedFill = progressColor ?? '#65a30d';

  const bgSolid = backgroundColor ?? backgroundGradientColors[0];
  const mergedIconButtonStyle = slots.iconButton ? { ...styles.iconButton, ...slots.iconButton } : styles.iconButton;

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      slots={{
        root: slots.root
          ? [styles.root, { backgroundColor: bgSolid }, slots.root]
          : [styles.root, { backgroundColor: bgSolid }],
      }}
      {...rest}
    >
      {/* gradient background */}
      <View style={styles.gradientContainer} pointerEvents="none">
        <Svg width="100%" height="100%" style={styles.gradientSvg}>
          <Defs>
            <SvgLinearGradient id="mpCardBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor={backgroundGradientColors[0]} stopOpacity="1" />
              <Stop offset="100%" stopColor={backgroundGradientColors[1]} stopOpacity="1" />
            </SvgLinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#mpCardBg)" />
        </Svg>
      </View>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={styles.identity}>
            {avatar}
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text
                numberOfLines={1}
                style={[styles.name, { color: resolvedText }, slots.name]}
              >
                {name}
              </Text>
              {subtitle ? (
                <Text
                  numberOfLines={1}
                  style={[styles.subtitle, { color: resolvedMuted }, slots.title]}
                >
                  {subtitle}
                </Text>
              ) : null}
            </View>
          </View>

          {topRightIcon ? (
            <ButtonIconOnly
              accessibilityLabel="Open"
              disabled={disabled}
              onPress={onPressTopRight}
              variant="ghost"
              size="sm"
              icon={topRightIcon}
              slots={{ root: mergedIconButtonStyle }}
            />
          ) : (
            <View style={mergedIconButtonStyle} />
          )}
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.progressBlock}>
            <Text style={[styles.progressLabel, { color: resolvedText }, slots.meta]}>
              {pct}% Match Rate
            </Text>
            <View
              style={[
                styles.progressTrack,
                { backgroundColor: resolvedTrack },
                slots.progressTrack,
              ]}
            >
              <View
                style={[
                  styles.progressFill,
                  { width: `${pct}%`, backgroundColor: resolvedFill },
                  slots.progressFill,
                ]}
              />
            </View>
          </View>

          <View style={styles.actions}>
            {chatIcon ? (
              <ButtonIconOnly
                accessibilityLabel="Chat"
                disabled={disabled}
                onPress={onPressChat}
                variant="ghost"
                size="sm"
                icon={chatIcon}
                slots={{ root: mergedIconButtonStyle }}
              />
            ) : (
              <View style={mergedIconButtonStyle} />
            )}

            {callIcon ? (
              <ButtonIconOnly
                accessibilityLabel="Call"
                disabled={disabled}
                onPress={onPressCall}
                variant="ghost"
                size="sm"
                icon={callIcon}
                slots={{ root: mergedIconButtonStyle }}
              />
            ) : (
              <View style={mergedIconButtonStyle} />
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

