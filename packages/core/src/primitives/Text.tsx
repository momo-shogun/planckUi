import React, { useMemo } from 'react';
import {
  Text as RNText,
  type TextProps as RNTextProps,
  type TextStyle,
  Platform,
} from 'react-native';
import { useTheme } from '../system/ThemeContext';

const FONT = {
  montserrat: Platform.select({
    ios: {
      regular: 'Montserrat-Regular',
      medium: 'Montserrat-Medium',
      semibold: 'Montserrat-SemiBold',
    },
    android: {
      regular: 'Montserrat-Regular',
      medium: 'Montserrat-Medium',
      semibold: 'Montserrat-SemiBold',
    },
    default: {
      regular: undefined,
      medium: undefined,
      semibold: undefined,
    },
  })!,
  fraunces: Platform.select({
    ios: {
      semibold: 'Fraunces-SemiBold',
    },
    android: {
      semibold: 'Fraunces-SemiBold',
    },
    default: {
      semibold: undefined,
    },
  })!,
} as const;

export interface TextProps extends RNTextProps {
  variant?: 'heading' | 'body' | 'label' | 'caption';
  color?: string;
  weight?: TextStyle['fontWeight'];
}

export function Text(props: TextProps) {
  const {
    variant = 'body',
    color,
    weight,
    style,
    children,
    ...rest
  } = props;
  const theme = useTheme();

  const variantStyle = useMemo((): TextStyle => {
    const { fontSizes, fontWeights, colors } = theme;
    switch (variant) {
      case 'heading':
        return {
          fontSize: fontSizes.xl,
          fontWeight: fontWeights.bold as TextStyle['fontWeight'],
          fontFamily: FONT.fraunces.semibold ?? FONT.montserrat.semibold,
          color: colors.textPrimary,
        };
      case 'body':
        return {
          fontSize: fontSizes.md,
          fontWeight: fontWeights.regular as TextStyle['fontWeight'],
          fontFamily: FONT.montserrat.regular,
          color: colors.textPrimary,
        };
      case 'label':
        return {
          fontSize: fontSizes.sm,
          fontWeight: fontWeights.medium as TextStyle['fontWeight'],
          fontFamily: FONT.montserrat.medium,
          color: colors.textSecondary,
        };
      case 'caption':
        return {
          fontSize: fontSizes.xs,
          fontWeight: fontWeights.regular as TextStyle['fontWeight'],
          fontFamily: FONT.montserrat.regular,
          color: colors.textDisabled,
        };
      default: {
        const _exhaustive: never = variant;
        return _exhaustive;
      }
    }
  }, [theme, variant]);

  const overrideStyle = useMemo((): TextStyle => {
    const o: TextStyle = {};
    if (color !== undefined) o.color = color;
    if (weight !== undefined) o.fontWeight = weight;
    return o;
  }, [color, weight]);

  return (
    <RNText style={[variantStyle, overrideStyle, style]} {...rest}>
      {children}
    </RNText>
  );
}
