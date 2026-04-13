import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { getPlankBarV2Chrome } from '@my-ui-lib/tokens';
import { useTheme } from '../../../system/ThemeContext';
import type { TabBarProps } from './TabBar.types';

// ─── Geometry constants ───────────────────────────────────────────────────────
const BUBBLE_D = 56;
const BUBBLE_R = BUBBLE_D / 2;
/** Background-coloured disc that creates the concave notch on the bar's top edge. */
const NOTCH_D = 72;
const NOTCH_R = NOTCH_D / 2;
/** How many px the bubble centre sits above the bar's top edge. */
const LIFT = 22;
/** Height of the coloured bar strip (without the bubble lift). */
const BAR_HEIGHT = 64;
/** Total component height = bar + lift + bubble radius. */
const WRAPPER_H = BAR_HEIGHT + LIFT + BUBBLE_R;

const SPRING_CFG = { damping: 22, stiffness: 200, mass: 0.8 } as const;

export function PlankBarV2({
  items,
  activeKey,
  onChange,
  slots = {},
  testID,
}: TabBarProps) {
  const theme = useTheme();
  const chrome = getPlankBarV2Chrome(theme);

  const activeIndex = Math.max(
    items.findIndex((i) => i.key === activeKey),
    0
  );

  const [barWidth, setBarWidth] = useState(0);
  const tabWidth = barWidth > 0 ? barWidth / items.length : 0;

  // Shared value: X centre of the currently active tab slot
  const centreX = useSharedValue(0);

  useEffect(() => {
    if (tabWidth === 0) return;
    const target = (activeIndex + 0.5) * tabWidth;
    centreX.value = withSpring(target, SPRING_CFG);
  }, [activeIndex, tabWidth]);

  // Notch disc: `left` is pre-offset by its radius so `translateX = centreX` lands on its visual centre.
  const notchAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: centreX.value - NOTCH_R }],
  }));

  // Bubble: same trick, offset by bubble radius.
  const bubbleAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: centreX.value - BUBBLE_R }],
  }));

  const styles = createStyles(chrome);

  return (
    <View
      testID={testID}
      style={[styles.wrapper, slots.root]}
      onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
    >
      {/* ── White / surface bar ───────────────────────────────────────────── */}
      <View style={styles.bar}>
        <View style={styles.row}>
          {items.map((item) => {
            const active = item.key === activeKey;
            return (
              <Pressable
                key={item.key}
                testID={testID ? `${testID}-${item.key}` : undefined}
                accessibilityRole="tab"
                accessibilityState={{ selected: active }}
                accessibilityLabel={item.label}
                onPress={() => onChange(item.key)}
                style={[styles.tabItem, active ? slots.itemActive : slots.item]}
              >
                {!active && (
                  <View style={[styles.iconWrap, slots.iconWrap]}>
                    {item.icon(false)}
                  </View>
                )}
                <Text
                  numberOfLines={1}
                  style={[
                    styles.label,
                    active && styles.labelActive,
                    slots.label,
                    active && slots.labelActive,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* ── Concave notch disc ────────────────────────────────────────────── */}
      {/*   Same colour as the screen background — visually cuts into the bar */}
      <Animated.View
        pointerEvents="none"
        style={[styles.notch, slots.notch, notchAnimStyle]}
      />

      {/* ── Floating icon bubble ──────────────────────────────────────────── */}
      <Animated.View
        pointerEvents="none"
        style={[styles.bubble, slots.bubble, bubbleAnimStyle]}
      >
        {items.find((i) => i.key === activeKey)?.icon(true)}
      </Animated.View>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

function createStyles(chrome: ReturnType<typeof getPlankBarV2Chrome>) {
  return StyleSheet.create({
    wrapper: {
      height: WRAPPER_H,
    },
    bar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: BAR_HEIGHT,
      backgroundColor: chrome.barBg,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 4,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      height: '100%',
      // Top padding prevents labels from being hidden behind the notch disc
      paddingTop: NOTCH_R,
      paddingBottom: 10,
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      minHeight: 36,
    },
    iconWrap: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 3,
    },
    label: {
      fontSize: 11,
      fontWeight: '500',
      color: chrome.inactiveLabel,
      textAlign: 'center',
    },
    labelActive: {
      color: chrome.activeLabel,
      fontWeight: '600',
    },
    notch: {
      position: 'absolute',
      // Centre the disc on the bar's top edge
      top: WRAPPER_H - BAR_HEIGHT - NOTCH_R,
      left: 0,
      width: NOTCH_D,
      height: NOTCH_D,
      borderRadius: NOTCH_R,
      backgroundColor: chrome.notchBg,
    },
    bubble: {
      position: 'absolute',
      // Float the bubble LIFT px above the bar's top edge
      top: WRAPPER_H - BAR_HEIGHT - LIFT - BUBBLE_R,
      left: 0,
      width: BUBBLE_D,
      height: BUBBLE_D,
      borderRadius: BUBBLE_R,
      backgroundColor: chrome.bubbleBg,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.22,
      shadowRadius: 8,
      elevation: 8,
    },
  });
}
