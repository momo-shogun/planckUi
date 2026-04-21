import React, { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Pressable } from '../../../primitives/Pressable';
import { HStack, VStack } from '../../../primitives/Stack';
import { Text } from '../../../primitives/Text';
import { useTheme } from '../../../system/ThemeContext';
import { Avatar } from '../../Avatar';
import { createPlankImgBgV1Styles } from './PlankImgBgV1.styles';
import type { PlankImgBgV1Props } from './PlankImgBgV1.types';

const DEFAULT_BG =
  'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=1200&q=80';

const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=160&h=160&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&h=160&q=80',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=160&h=160&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&h=160&q=80',
] as const;

export function PlankImgBgV1(props: PlankImgBgV1Props) {
  const {
    backgroundImageSrc = DEFAULT_BG,
    backgroundOverlayColor,
    backgroundOverlayOpacity,
    tagLeft = { label: 'Global' },
    tagRight = { label: '2d', backgroundColor: 'rgba(239,68,68,0.85)' },
    title,
    subtitle,
    titleColor,
    subtitleColor,
    avatarSrcs,
    avatarsBorderColor = 'rgba(255,255,255,0.85)',
    joinedText,
    joinedTextColor,
    footerIcon,
    footerText = '3 arenas',
    footerBackgroundColor,
    footerTextColor,
    borderColor,
    backgroundColor,
    onPress,
    unstyled = false,
    slots = {},
    testID,
  } = props;

  if (unstyled) {
    return (
      <View style={slots.root} testID={testID}>
        <Text>{title}</Text>
      </View>
    );
  }

  const theme = useTheme();
  const styles = useMemo(
    () =>
      createPlankImgBgV1Styles(theme, {
        borderColor,
        backgroundColor,
        overlayColor: backgroundOverlayColor,
        overlayOpacity: backgroundOverlayOpacity,
        titleColor,
        subtitleColor,
        joinedTextColor,
      }),
    [
      theme,
      borderColor,
      backgroundColor,
      backgroundOverlayColor,
      backgroundOverlayOpacity,
      titleColor,
      subtitleColor,
      joinedTextColor,
    ],
  );

  const rootStyle = StyleSheet.flatten([styles.root, slots.root]);
  const avatars = (avatarSrcs?.filter(Boolean) ?? [...DEFAULT_AVATARS]).slice(0, 5);

  const Tag = (t: { label: string; icon?: React.ReactNode; backgroundColor?: string; textColor?: string }) => {
    return (
      <View
        style={[
          styles.tagPill,
          t.backgroundColor ? { backgroundColor: t.backgroundColor } : undefined,
        ]}
      >
        {t.icon ? t.icon : null}
        <Text style={[styles.tagText, t.textColor ? { color: t.textColor } : undefined]}>
          {t.label}
        </Text>
      </View>
    );
  };

  const FooterIcon = footerIcon ?? (
    <View
      style={{
        width: 26,
        height: 26,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.18)',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: theme.fontWeights.bold as '700' }}>
        ⚡
      </Text>
    </View>
  );

  return (
    <Pressable
      testID={testID}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={title}
      onPress={onPress}
      slots={{ root: rootStyle }}
    >
      <Image
        accessibilityIgnoresInvertColors
        source={{ uri: backgroundImageSrc }}
        resizeMode="cover"
        style={styles.bgImage}
      />
      <View
        style={[
          styles.overlay,
          backgroundOverlayColor ? { backgroundColor: backgroundOverlayColor } : undefined,
          backgroundOverlayOpacity !== undefined ? { opacity: backgroundOverlayOpacity } : undefined,
        ]}
      />

      <View style={styles.content}>
        <VStack>
          <HStack style={styles.tagsRow}>
            <Tag {...tagLeft} />
            <Tag {...tagRight} />
          </HStack>

          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </VStack>

        <VStack gap={theme.spacing[3]}>
          <HStack align="center" style={styles.avatarsRow}>
            <HStack align="center">
              {avatars.map((src, i) => (
                <View key={`${src}-${i}`} style={{ marginLeft: i === 0 ? 0 : -10 }}>
                  <Avatar
                    src={src}
                    fallback="A"
                    size="xs"
                    slots={{
                      root: {
                        borderWidth: 2,
                        borderColor: avatarsBorderColor,
                      },
                    }}
                  />
                </View>
              ))}
            </HStack>
            {joinedText ? <Text style={styles.joinedText}>{joinedText}</Text> : null}
          </HStack>

          <View
            style={[
              styles.footerPill,
              footerBackgroundColor ? { backgroundColor: footerBackgroundColor } : undefined,
            ]}
          >
            {FooterIcon}
            <Text style={[styles.footerText, footerTextColor ? { color: footerTextColor } : undefined]}>
              {footerText}
            </Text>
          </View>
        </VStack>
      </View>
    </Pressable>
  );
}

