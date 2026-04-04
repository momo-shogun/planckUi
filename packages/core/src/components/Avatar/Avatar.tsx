import React, { useMemo, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { getAvatarTokens } from '@my-ui-lib/tokens';
import { useTheme } from '../../system/ThemeContext';
import { createAvatarStyles } from './Avatar.styles';
import type { AvatarProps } from './Avatar.types';

function initialsFrom(fallback?: string): string {
  if (!fallback?.trim()) return '';
  const parts = fallback.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase();
  }
  return fallback.slice(0, 2).toUpperCase();
}

export function Avatar(props: AvatarProps) {
  const {
    src,
    alt,
    fallback,
    size = 'md',
    variant = 'circle',
    badge,
    unstyled = false,
    slots = {},
    testID,
  } = props;
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(src) && !imageFailed;
  const initials = useMemo(() => initialsFrom(fallback), [fallback]);
  const showInitials = Boolean(initials);
  const showPerson = !showImage && !showInitials;

  if (unstyled) {
    return (
      <View
        accessibilityLabel={alt}
        testID={testID}
        style={slots.root}>
        {showImage ? (
          <Image
            accessibilityIgnoresInvertColors
            source={{ uri: src }}
            onError={() => setImageFailed(true)}
          />
        ) : showInitials ? (
          <Text>{initials}</Text>
        ) : (
          <View />
        )}
      </View>
    );
  }

  const theme = useTheme();
  const tokens = getAvatarTokens(theme, variant);
  const styles = createAvatarStyles(tokens, theme, size);

  const badgeBg =
    badge === 'online'
      ? tokens.statusOnline
      : badge === 'busy'
        ? tokens.statusBusy
        : badge === 'offline'
          ? tokens.statusOffline
          : undefined;

  return (
    <View
      accessibilityLabel={alt ?? initials ?? 'User avatar'}
      style={[styles.root, slots.root]}
      testID={testID}>
      {showImage ? (
        <Image
          accessibilityIgnoresInvertColors
          source={{ uri: src as string }}
          style={[styles.image, slots.image]}
          onError={() => setImageFailed(true)}
        />
      ) : null}
      {!showImage && showInitials ? (
        <View style={[styles.fallback, slots.fallback]}>
          <Text style={[styles.fallbackText, slots.fallbackText]}>
            {initials}
          </Text>
        </View>
      ) : null}
      {!showImage && showPerson ? (
        <View style={[styles.fallback, slots.fallback]}>
          <View style={styles.personHead} />
          <View style={styles.personBody} />
        </View>
      ) : null}
      {badge && badgeBg ? (
        <View
          style={[styles.badge, { backgroundColor: badgeBg }, slots.badge]}
        />
      ) : null}
    </View>
  );
}
