import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Button, ButtonIconOnly } from '../../../Button';
import { HStack, VStack } from '../../../../primitives/Stack';
import { useTheme } from '../../../../system/ThemeContext';
import {
  ZeptoChevronDownIcon,
  ZeptoLightningIcon,
  ZeptoMenuIcon,
  ZeptoProfileIcon,
  ZeptoWalletIcon,
} from './ZeptoHeaderV1.icons';
import { createZeptoHeaderV1Styles } from './ZeptoHeaderV1.styles';
import type { ZeptoHeaderV1Props } from './ZeptoHeaderV1.types';

const DEFAULT_FG = '#0A0A0A';
const DEFAULT_WALLET_ACCENT = '#6B21A8';
const DEFAULT_WALLET_PILL_BG = '#FFFFFF';

export function ZeptoHeaderV1(props: ZeptoHeaderV1Props) {
  const {
    backgroundColor,
    etaLabel,
    addressLabel,
    walletLabel,
    onMenuPress,
    onAddressPress,
    onWalletPress,
    onProfilePress,
    foregroundColor = DEFAULT_FG,
    walletAccentColor = DEFAULT_WALLET_ACCENT,
    walletPillBackgroundColor = DEFAULT_WALLET_PILL_BG,
    unstyled = false,
    slots = {},
    testID,
  } = props;

  if (unstyled) {
    return (
      <View testID={testID} accessibilityLabel="Zepto style header">
        {onMenuPress ? (
          <Pressable accessibilityRole="button" accessibilityLabel="Menu" onPress={onMenuPress}>
            <Text>Menu</Text>
          </Pressable>
        ) : null}
        <Text>{etaLabel}</Text>
        <Text>{addressLabel}</Text>
        <Pressable accessibilityRole="button" onPress={onWalletPress}>
          <Text>{walletLabel}</Text>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={onProfilePress}>
          <View />
        </Pressable>
      </View>
    );
  }

  const theme = useTheme();
  const styles = createZeptoHeaderV1Styles(theme);

  const menuGlyph = slots.menuIcon ?? <ZeptoMenuIcon color={foregroundColor} size={22} />;
  const etaIcon = slots.etaIcon ?? <ZeptoLightningIcon color={foregroundColor} size={18} />;
  const addressTrail =
    slots.addressTrailingIcon ?? <ZeptoChevronDownIcon color={foregroundColor} size={14} />;
  const walletGlyph = slots.walletIcon ?? <ZeptoWalletIcon color={walletAccentColor} size={18} />;
  const profileGlyph = slots.profileIcon ?? <ZeptoProfileIcon color={foregroundColor} size={26} />;

  return (
    <View style={[styles.root, { backgroundColor }, slots.root]} testID={testID}>
      <View style={[styles.row]}>
        {onMenuPress ? (
          <ButtonIconOnly
            variant="ghost"
            size="sm"
            onPress={onMenuPress}
            accessibilityLabel="Menu"
            icon={menuGlyph}
            slots={{
              root: {
                width: 36,
                height: 36,
              },
            }}
          />
        ) : null}
        <VStack style={[styles.left, slots.left]}>
          <HStack style={styles.etaRow} align="center">
            {etaIcon}
            <Text style={[styles.etaText, { color: foregroundColor }]} numberOfLines={1}>
              {etaLabel}
            </Text>
          </HStack>
          {onAddressPress ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Delivery address"
              onPress={onAddressPress}
              style={styles.addressRow}
            >
              <Text
                style={[styles.addressText, { color: foregroundColor }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {addressLabel}
              </Text>
              {addressTrail}
            </Pressable>
          ) : (
            <View style={styles.addressRow}>
              <Text
                style={[styles.addressText, { color: foregroundColor }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {addressLabel}
              </Text>
              {addressTrail}
            </View>
          )}
        </VStack>

        <HStack style={[styles.right, slots.right]} align="center">
          <Button
            variant="secondary"
            size="sm"
            onPress={onWalletPress}
            accessibilityLabel={`Wallet ${walletLabel}`}
            slots={{
              root: {
                backgroundColor: walletPillBackgroundColor,
                minHeight: 36,
                paddingHorizontal: theme.spacing[3],
                paddingVertical: theme.spacing[1],
              },
            }}
          >
            <HStack style={styles.walletRow} align="center">
              {walletGlyph}
              <Text style={[styles.walletAmount, { color: walletAccentColor }]}>{walletLabel}</Text>
            </HStack>
          </Button>

          <ButtonIconOnly
            variant="ghost"
            size="sm"
            onPress={onProfilePress}
            accessibilityLabel="Profile"
            icon={profileGlyph}
            slots={{
              root: {
                width: 36,
                height: 36,
              },
            }}
          />
        </HStack>
      </View>
    </View>
  );
}
