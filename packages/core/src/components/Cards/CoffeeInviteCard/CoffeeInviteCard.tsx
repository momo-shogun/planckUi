import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../../system/ThemeContext';
import { Avatar } from '../../Avatar';
import { Button } from '../../Button';
import { Pressable } from '../../../primitives/Pressable';
import { HStack, VStack } from '../../../primitives/Stack';
import { Text } from '../../../primitives/Text';
import { createCoffeeInviteCardStyles } from './CoffeeInviteCard.styles';
import type { CoffeeInviteCardProps } from './CoffeeInviteCard.types';

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=400&q=80';

const DEFAULT_MUTUALS = [
  'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=160&h=160&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&h=160&q=80',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=160&h=160&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&h=160&q=80',
] as const;

export function CoffeeInviteCard(props: CoffeeInviteCardProps) {
  const {
    avatarSrc = DEFAULT_AVATAR,
    name,
    role,
    handle = '@Asana',
    mutualCount = 4,
    mutualAvatarSrcs,
    primaryLabel = 'Grab a coffee',
    onPressPrimary,
    secondaryLabel = 'Not interested',
    onPressSecondary,
    unstyled = false,
    slots = {},
    testID,
  } = props;

  if (unstyled) {
    return (
      <View style={slots.root} testID={testID}>
        <Avatar src={avatarSrc} fallback={name} />
        <Text>{name}</Text>
        <Text>{role}</Text>
      </View>
    );
  }

  const theme = useTheme();
  const styles = useMemo(() => createCoffeeInviteCardStyles(theme), [theme]);

  const mutuals = (mutualAvatarSrcs?.filter(Boolean) ?? [...DEFAULT_MUTUALS]).slice(0, 4);
  const rootStyle = StyleSheet.flatten([styles.root, slots.root]);
  const avatarWrapStyle = StyleSheet.flatten([styles.avatarWrap, slots.avatarWrap]);
  const mutualsRowStyle = StyleSheet.flatten([styles.mutualsRow, slots.mutualsRow]);
  const primaryButtonRootStyle = StyleSheet.flatten([styles.primaryButton, slots.primaryButton]);
  const secondaryPressableStyle = StyleSheet.flatten([styles.secondaryPressable, slots.secondaryButton]);

  return (
    <View testID={testID} style={rootStyle}>
      <View style={avatarWrapStyle}>
        <Avatar
          src={avatarSrc}
          alt={`${name} profile`}
          fallback={name}
          size="xl"
          slots={{ root: { width: 92, height: 92 } }}
        />
      </View>

      <VStack align="center">
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
        <Text style={styles.handle}>{handle}</Text>
      </VStack>

      <HStack
        align="center"
        style={mutualsRowStyle}
      >
        <View style={styles.mutualsAvatars}>
          {mutuals.map((src, i) => (
            <View key={`${src}-${i}`} style={{ marginLeft: i === 0 ? 0 : -10 }}>
              <Avatar
                src={src}
                fallback="M"
                size="xs"
                slots={{ root: styles.mutualAvatar }}
              />
            </View>
          ))}
        </View>
        <Text style={styles.mutualLabel}>{mutualCount} mutuals</Text>
      </HStack>

      <Button
        variant="outline"
        size="sm"
        onPress={onPressPrimary}
        slots={{
          root: primaryButtonRootStyle,
          text: styles.primaryButtonText,
        }}
        accessibilityLabel={primaryLabel}
      >
        <HStack align="center" gap={8}>
          <Text style={styles.primaryButtonText}>{primaryLabel}</Text>
          <Text style={[styles.primaryButtonText, { fontSize: theme.fontSizes.sm }]}>
            ☕
          </Text>
        </HStack>
      </Button>

      <Pressable
        onPress={onPressSecondary}
        accessibilityLabel={secondaryLabel}
        slots={{
          root: secondaryPressableStyle,
        }}
      >
        <Text style={styles.secondaryText}>{secondaryLabel}</Text>
      </Pressable>
    </View>
  );
}

