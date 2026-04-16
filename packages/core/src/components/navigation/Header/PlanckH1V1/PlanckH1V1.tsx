import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Rect, Stop } from 'react-native-svg';
import { getHeaderTokens } from '@my-ui-lib/tokens';
import { useTheme } from '../../../../system/ThemeContext';
import { createPlanckH1V1Styles } from './PlanckH1V1.styles';
import type { PlanckH1V1Props } from './PlanckH1V1.types';

const DEFAULT_GRADIENT_COLORS = ['#5b21b6', '#1e40af'] as const;

export function PlanckH1V1(props: PlanckH1V1Props) {
  const {
    title,
    logoIcon,
    onSearch,
    onNotification,
    notificationDot = false,
    backgroundGradientColors = DEFAULT_GRADIENT_COLORS,
    variant = 'default',
    unstyled = false,
    slots = {},
    testID,
  } = props;

  if (unstyled) {
    return (
      <View testID={testID}>
        {logoIcon}
        <Text>{title}</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Search" onPress={onSearch}>
          <View />
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel="Notifications" onPress={onNotification}>
          <View />
        </Pressable>
      </View>
    );
  }

  const theme = useTheme();
  const tokens = getHeaderTokens(theme, variant);
  const styles = createPlanckH1V1Styles(tokens, theme, variant);

  return (
    <View style={[styles.root, slots.root]} testID={testID}>
      {/* Gradient background layer */}
      <View style={styles.gradientContainer}>
        <Svg width="100%" height="100%" style={styles.gradientSvg}>
          <Defs>
            <SvgLinearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor={backgroundGradientColors[0]} stopOpacity="1" />
              <Stop offset="100%" stopColor={backgroundGradientColors[1]} stopOpacity="1" />
            </SvgLinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#headerGradient)" />
        </Svg>
      </View>

      {/* Content layer */}
      <View style={styles.content}>
        {/* Left: logo + brand name */}
        <View style={[styles.left, slots.left]}>
          {logoIcon ? (
            <View style={styles.logoIcon}>{logoIcon}</View>
          ) : null}
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        </View>

        {/* Right: icon buttons */}
        <View style={[styles.right, slots.right]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Search"
            onPress={onSearch}
            style={styles.iconButton}
          >
            <View style={styles.iconButtonInner}>{slots.searchIcon ?? null}</View>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            onPress={onNotification}
            style={styles.iconButton}
          >
            <View style={styles.iconButtonInner}>{slots.notificationIcon ?? null}</View>
            {notificationDot ? <View style={styles.notificationDot} /> : null}
          </Pressable>
        </View>
      </View>
    </View>
  );
}