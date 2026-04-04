import React from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';

export interface StackProps extends ViewProps {
  direction?: 'row' | 'column';
  gap?: number;
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  children?: React.ReactNode;
}

export function Stack({
  direction = 'column',
  gap = 0,
  align,
  justify,
  style,
  children,
  ...rest
}: StackProps) {
  const computed: ViewStyle = {
    flexDirection: direction,
    gap,
    alignItems: align,
    justifyContent: justify,
  };

  return (
    <View style={[computed, style]} {...rest}>
      {children}
    </View>
  );
}

export function HStack(props: Omit<StackProps, 'direction'>) {
  return <Stack direction="row" {...props} />;
}

export function VStack(props: Omit<StackProps, 'direction'>) {
  return <Stack direction="column" {...props} />;
}
