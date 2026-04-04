import React from 'react';
import {
  Pressable as RNPressable,
  type PressableProps as RNPressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

export interface PressableProps extends RNPressableProps {
  slots?: { root?: ViewStyle | ViewStyle[] };
  disabled?: boolean;
}

function asStyleArray(slot: ViewStyle | ViewStyle[] | undefined): StyleProp<ViewStyle>[] {
  if (slot === undefined) return [];
  return Array.isArray(slot) ? slot : [slot];
}

export function Pressable({ slots, disabled, style, children, ...rest }: PressableProps) {
  return (
    <RNPressable
      accessibilityState={disabled ? { disabled: true } : undefined}
      disabled={disabled}
      style={(state) => {
        const opacityStyle: ViewStyle = {
          opacity: disabled ? 0.5 : state.pressed ? 0.85 : 1,
        };
        let userResolved: StyleProp<ViewStyle> | undefined;
        if (typeof style === 'function') {
          userResolved = style(state);
        } else {
          userResolved = style;
        }
        const tail =
          userResolved === undefined
            ? []
            : Array.isArray(userResolved)
              ? Array.from(userResolved)
              : [userResolved];
        return [
          ...asStyleArray(slots?.root),
          opacityStyle,
          ...tail,
        ] as StyleProp<ViewStyle>;
      }}
      {...rest}
    >
      {children}
    </RNPressable>
  );
}
