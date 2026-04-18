import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { Pressable, Text, TextInput, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useControlledState } from '../../../hooks/useControlledState';
import { useReducedMotionRef } from '../../../hooks/useReducedMotion';
import { darkenHex, ZEPTO_TABS_TRACK_DARKEN } from '../../../utils/darkenHex';
import { ZEPTO, zeptoTabsStyles } from './ZeptoTabs.styles';
import type { ZeptoTabsProps } from './ZeptoTabs.types';

type Layout = { x: number; width: number };

function resolveTabColors(
  tabs: ZeptoTabsProps['tabs'],
  tabBackgroundColors: ZeptoTabsProps['tabBackgroundColors'],
  fallback: string
): string[] {
  return tabs.map((t, i) => {
    if (Array.isArray(tabBackgroundColors)) {
      return tabBackgroundColors[i] ?? fallback;
    }
    return tabBackgroundColors[t.id] ?? fallback;
  });
}

export function ZeptoTabs(props: ZeptoTabsProps) {
  const {
    tabs,
    activeIndex: activeIndexProp,
    defaultActiveIndex = 0,
    onChange,
    tabBackgroundColors,
    showSearch = false,
    searchPlaceholder = 'Search for “Iphone”',
    searchValue,
    onSearchChange,
    testID,
    style,
    contentContainerStyle,
  } = props;

  const fallbackTrack = '#E6C8A4';
  const resolvedColors = useMemo(
    () =>
      tabs.length
        ? resolveTabColors(tabs, tabBackgroundColors, fallbackTrack)
        : [fallbackTrack],
    [tabs, tabBackgroundColors, fallbackTrack]
  );
  const resolvedColorsDarker = useMemo(() => {
    // Slightly darker strip behind the tab tiles (like the reference UI)
    return resolvedColors.map((c) => darkenHex(c, ZEPTO_TABS_TRACK_DARKEN));
  }, [resolvedColors]);

  const maxIndex = tabs.length > 0 ? tabs.length - 1 : 0;
  const safeDefault = Math.min(Math.max(0, defaultActiveIndex), maxIndex);

  const handleIndexChange = useCallback(
    (idx: number) => {
      const tab = tabs[idx];
      if (tab) {
        onChange?.(idx, tab);
      }
    },
    [onChange, tabs]
  );

  const [activeIndex, setActiveIndex] = useControlledState(
    activeIndexProp,
    safeDefault,
    handleIndexChange
  );

  const isControlled = activeIndexProp !== undefined;
  const clampedIndex =
    tabs.length > 0
      ? Math.min(Math.max(0, activeIndex), tabs.length - 1)
      : 0;

  useEffect(() => {
    if (!isControlled && tabs.length > 0 && activeIndex !== clampedIndex) {
      setActiveIndex(clampedIndex);
    }
  }, [activeIndex, clampedIndex, isControlled, setActiveIndex, tabs.length]);

  const layoutsRef = useRef<Layout[]>([]);
  const reduceMotion = useReducedMotionRef();
  const everLaidOut = useRef(false);

  const activeProgress = useSharedValue(clampedIndex);
  const pillX = useSharedValue(0);
  const pillW = useSharedValue(0);

  useEffect(() => {
    layoutsRef.current = tabs.map(() => ({ x: 0, width: 0 }));
    everLaidOut.current = false;
  }, [tabs]);

  const colorInputRange = useMemo(() => {
    if (resolvedColors.length <= 1) {
      return [0, 1];
    }
    return resolvedColors.map((_, i) => i);
  }, [resolvedColors]);

  const colorOutputRange = useMemo(() => {
    if (resolvedColors.length <= 1) {
      const c = resolvedColors[0] ?? fallbackTrack;
      return [c, c];
    }
    return resolvedColors;
  }, [resolvedColors, fallbackTrack]);

  const applyPill = useCallback(
    (index: number, instant: boolean) => {
      const L = layoutsRef.current[index];
      if (!L || L.width <= 0) {
        return;
      }
      const dur = instant || reduceMotion.current ? 0 : 260;
      // Match each tab’s laid-out frame so active/inactive keep the same side inset.
      pillX.value = withTiming(L.x, { duration: dur });
      pillW.value = withTiming(L.width, { duration: dur });
    },
    [pillW, pillX, reduceMotion]
  );

  const syncProgress = useCallback(
    (index: number, instant: boolean) => {
      if (resolvedColors.length <= 1) {
        activeProgress.value = 0;
        return;
      }
      activeProgress.value =
        instant || reduceMotion.current
          ? index
          : withTiming(index, { duration: 280 });
    },
    [activeProgress, reduceMotion, resolvedColors.length]
  );

  useEffect(() => {
    if (!tabs.length) {
      return;
    }
    syncProgress(clampedIndex, false);
    applyPill(clampedIndex, false);
  }, [clampedIndex, tabs.length, syncProgress, applyPill]);

  const onTabLayout = useCallback(
    (index: number) => (e: LayoutChangeEvent) => {
      const { x, width } = e.nativeEvent.layout;
      layoutsRef.current[index] = { x, width };
      if (index !== clampedIndex || width <= 0) {
        return;
      }
      if (!everLaidOut.current) {
        everLaidOut.current = true;
        syncProgress(clampedIndex, true);
        applyPill(clampedIndex, true);
        return;
      }
      applyPill(clampedIndex, reduceMotion.current);
    },
    [applyPill, clampedIndex, reduceMotion, syncProgress]
  );

  const selectTab = (index: number) => {
    setActiveIndex(index);
  };

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        activeProgress.value,
        colorInputRange,
        colorOutputRange,
        'RGB'
      ),
    };
  }, [colorInputRange, colorOutputRange]);

  const tabsBgAnimatedStyle = useAnimatedStyle(() => {
    const outRange =
      resolvedColorsDarker.length <= 1
        ? [resolvedColorsDarker[0] ?? fallbackTrack, resolvedColorsDarker[0] ?? fallbackTrack]
        : resolvedColorsDarker;
    return {
      backgroundColor: interpolateColor(
        activeProgress.value,
        colorInputRange,
        outRange,
        'RGB'
      ),
    };
  }, [colorInputRange, resolvedColorsDarker, fallbackTrack]);

  const highlightBgAnimatedStyle = useAnimatedStyle(() => {
    // Active pill uses the same color as the search background (original tab colors).
    return {
      backgroundColor: interpolateColor(
        activeProgress.value,
        colorInputRange,
        colorOutputRange,
        'RGB'
      ),
    };
  }, [colorInputRange, colorOutputRange]);

  const highlightAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: pillW.value,
      transform: [{ translateX: pillX.value }],
    };
  });

  if (!tabs.length) {
    return null;
  }

  const tabRowOuterStyle = [
    zeptoTabsStyles.tabRowOuter,
    contentContainerStyle,
  ];

  const tabRow = (
    <>
      <Animated.View
        pointerEvents="none"
        style={[
          zeptoTabsStyles.highlight,
          highlightAnimatedStyle,
          highlightBgAnimatedStyle,
        ]}
      />
      {tabs.map((tab, index) => {
        const active = index === clampedIndex;
        return (
          <Pressable
            key={tab.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => selectTab(index)}
            onLayout={onTabLayout(index)}
            style={[
              zeptoTabsStyles.pressable,
              index < tabs.length - 1 && { marginRight: ZEPTO.gap },
            ]}
            collapsable={false}>
            <View
              style={[
                zeptoTabsStyles.tabInner,
                active && zeptoTabsStyles.tabInnerActive,
              ]}>
              {tab.icon != null ? (
                <View style={zeptoTabsStyles.iconWrap}>{tab.icon}</View>
              ) : null}
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  zeptoTabsStyles.label,
                  zeptoTabsStyles.labelShrink,
                  active
                    ? zeptoTabsStyles.labelActive
                    : zeptoTabsStyles.labelInactive,
                ]}>
                {tab.label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </>
  );

  return (
    <Animated.View
      style={[zeptoTabsStyles.outer, style]}
      testID={testID}>
      <Animated.View style={[zeptoTabsStyles.tabsBg, tabsBgAnimatedStyle]}>
        <View style={tabRowOuterStyle}>
          <View style={zeptoTabsStyles.tabRowInner}>{tabRow}</View>
        </View>
      </Animated.View>
      {showSearch ? (
        <Animated.View style={[zeptoTabsStyles.searchBg, containerAnimatedStyle]}>
          <View style={zeptoTabsStyles.searchWrap}>
            <View style={zeptoTabsStyles.searchBar}>
              <View style={zeptoTabsStyles.searchIcon}>
                  <View style={zeptoTabsStyles.searchIconCircle} />
                  <View style={zeptoTabsStyles.searchIconHandle} />
              </View>
              <TextInput
                value={searchValue}
                onChangeText={onSearchChange}
                placeholder={searchPlaceholder}
                  placeholderTextColor="rgba(17,24,39,0.55)"
                  style={zeptoTabsStyles.searchInput}
              />
            </View>
          </View>
        </Animated.View>
      ) : null}
    </Animated.View>
  );
}

ZeptoTabs.displayName = 'ZeptoTabs';
