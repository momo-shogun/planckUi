import React, { useMemo } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
} from 'react-native-reanimated';
import { Pressable } from '../../../primitives/Pressable';
import { Text } from '../../../primitives/Text';
import { useTheme } from '../../../system/ThemeContext';
import { createMarqueeButtonStyles } from './MarqueeButton.styles';
import type { MarqueeButtonProps } from './MarqueeButton.types';

export function MarqueeButton(props: MarqueeButtonProps) {
  const {
    text,
    onPress,
    disabled = false,
    unstyled = false,
    size = 'md',
    direction = 'left',
    alwaysMarquee = true,
    speedPxPerSec = 60,
    gapPx = 32,
    backgroundColor,
    textColor,
    left,
    right,
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
        <Text>{text}</Text>
      </Pressable>
    );
  }

  const theme = useTheme();
  const styles = useMemo(() => createMarqueeButtonStyles(theme, size), [size, theme]);

  const resolvedBg = backgroundColor ?? theme.colors.textPrimary;
  const resolvedText = textColor ?? '#ffffff';
  const reverse = direction === 'right';

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      slots={{
        root: slots.root
          ? [styles.root, { backgroundColor: resolvedBg }, slots.root]
          : [styles.root, { backgroundColor: resolvedBg }],
      }}
      {...rest}
    >
      {left ? <View style={styles.left}>{left}</View> : null}

      <Marquee
        styles={styles}
        alwaysMarquee={alwaysMarquee}
        durationFromSpeedPxPerSec={speedPxPerSec}
        reverse={reverse}
        gapPx={gapPx}
      >
        <Text numberOfLines={1} style={[styles.text, { color: resolvedText }, slots.text]}>
          {text}
        </Text>
      </Marquee>

      {right ? <View style={styles.right}>{right}</View> : null}
    </Pressable>
  );
}

function MeasureElement({
  styles,
  onLayout,
  children,
}: {
  styles: ReturnType<typeof createMarqueeButtonStyles>;
  onLayout: (w: number) => void;
  children: React.ReactNode;
}) {
  return (
    <Animated.ScrollView
      horizontal
      style={styles.hidden}
      pointerEvents="box-none"
    >
      <View onLayout={(ev) => onLayout(ev.nativeEvent.layout.width)}>{children}</View>
    </Animated.ScrollView>
  );
}

function TranslatedElement({
  styles,
  index,
  offset,
  childrenWidth,
  children,
}: {
  styles: ReturnType<typeof createMarqueeButtonStyles>;
  index: number;
  offset: Animated.SharedValue<number>;
  childrenWidth: number;
  children: React.ReactNode;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: (index - 1) * childrenWidth,
      transform: [{ translateX: -offset.value }],
    };
  });
  return <Animated.View style={[styles.translated, animatedStyle]}>{children}</Animated.View>;
}

function ChildrenScroller({
  duration,
  childrenWidth,
  parentWidth,
  reverse,
  styles,
  children,
}: {
  duration: number;
  childrenWidth: number;
  parentWidth: number;
  reverse: boolean;
  styles: ReturnType<typeof createMarqueeButtonStyles>;
  children: React.ReactNode;
}) {
  const offset = useSharedValue(0);
  const coeff = useSharedValue(reverse ? 1 : -1);

  React.useEffect(() => {
    coeff.value = reverse ? 1 : -1;
  }, [reverse, coeff]);

  useFrameCallback((i) => {
    // same as SWMansion example, but with duration derived from speed
    offset.value +=
      (coeff.value * ((i.timeSincePreviousFrame ?? 1) * childrenWidth)) / duration;
    offset.value = offset.value % childrenWidth;
  }, true);

  const count = Math.round(parentWidth / childrenWidth) + 2;

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <TranslatedElement
          key={`clone-${index}`}
          styles={styles}
          index={index}
          offset={offset}
          childrenWidth={childrenWidth}
        >
          {children}
        </TranslatedElement>
      ))}
    </>
  );
}

function Marquee({
  styles,
  alwaysMarquee,
  durationFromSpeedPxPerSec,
  reverse,
  gapPx,
  children,
}: {
  styles: ReturnType<typeof createMarqueeButtonStyles>;
  alwaysMarquee: boolean;
  durationFromSpeedPxPerSec: number;
  reverse: boolean;
  gapPx: number;
  children: React.ReactNode;
}) {
  const [parentWidth, setParentWidth] = React.useState(0);
  const [childrenWidth, setChildrenWidth] = React.useState(0);

  const speed = Math.max(10, durationFromSpeedPxPerSec);
  const duration = childrenWidth > 0 ? Math.round((childrenWidth / speed) * 1000) : 2000;

  const shouldRenderScroller =
    childrenWidth > 0 &&
    parentWidth > 0 &&
    (alwaysMarquee || childrenWidth > parentWidth);

  return (
    <View
      style={styles.marqueeClip}
      onLayout={(ev) => setParentWidth(ev.nativeEvent.layout.width)}
      pointerEvents="box-none"
    >
      <View style={styles.marqueeRow} pointerEvents="box-none">
        {/* ensure the gap is part of the measured width */}
        <MeasureElement styles={styles} onLayout={setChildrenWidth}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {children}
            <View style={{ width: gapPx }} />
          </View>
        </MeasureElement>

        {shouldRenderScroller ? (
          <ChildrenScroller
            duration={duration}
            parentWidth={parentWidth}
            childrenWidth={childrenWidth}
            reverse={reverse}
            styles={styles}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {children}
              <View style={{ width: gapPx }} />
            </View>
          </ChildrenScroller>
        ) : (
          children
        )}
      </View>
    </View>
  );
}

