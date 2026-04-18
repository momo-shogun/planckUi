import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

export interface ZeptoHeaderV1Slots {
  root?: ViewStyle;
  left?: ViewStyle;
  right?: ViewStyle;
  /** Replaces the default lightning icon in the ETA row. */
  etaIcon?: ReactNode;
  /** Replaces the default chevron on the address row. */
  addressTrailingIcon?: ReactNode;
  /** Replaces the default wallet glyph inside the pill. */
  walletIcon?: ReactNode;
  /** Replaces the default profile glyph. */
  profileIcon?: ReactNode;
}

export interface ZeptoHeaderV1Props {
  /**
   * Header background (Zepto-style solid bar).
   * @example '#D2A679'
   */
  backgroundColor: string;
  /** Bold ETA label, e.g. "6 minutes". */
  etaLabel: string;
  /** Single-line address; truncates with ellipsis. */
  addressLabel: string;
  /** Wallet amount label, e.g. "₹0". */
  walletLabel: string;
  onAddressPress?: () => void;
  onWalletPress?: () => void;
  onProfilePress?: () => void;
  /**
   * Text and icon color for the left column (ETA + address).
   * @default '#0A0A0A'
   */
  foregroundColor?: string;
  /**
   * Purple accent for wallet pill content (icon + amount).
   * @default '#6B21A8'
   */
  walletAccentColor?: string;
  /** Background for the wallet pill. @default '#FFFFFF' */
  walletPillBackgroundColor?: string;
  unstyled?: boolean;
  slots?: ZeptoHeaderV1Slots;
  testID?: string;
}
