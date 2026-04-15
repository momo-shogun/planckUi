import type { SemanticTokens } from './semantic';
import { colorWithOpacity } from './utils';

export type TabsVariant = 'underline' | 'pill' | 'bordered';
export type BadgeIntent = 'default' | 'success' | 'warning' | 'error' | 'info';
export type AvatarVariant = 'circle' | 'rounded' | 'square';
export type ToastIntent = 'default' | 'success' | 'warning' | 'error' | 'info';
export type TabBarVariant = 'default' | 'floating' | 'minimal' | 'plankBarV1' | 'plankBarV2';
export type HeaderVariant = 'default' | 'transparent' | 'blurred';

/** Rough sRGB luminance (0 = black, 1 = white) for picking light vs dark chrome. */
function srgbLuminance01(hex: string): number {
  const raw = hex.trim().replace(/^#/, '');
  let r: number;
  let g: number;
  let b: number;
  if (raw.length === 3) {
    r = parseInt(raw[0] + raw[0], 16);
    g = parseInt(raw[1] + raw[1], 16);
    b = parseInt(raw[2] + raw[2], 16);
  } else if (raw.length === 6) {
    r = parseInt(raw.slice(0, 2), 16);
    g = parseInt(raw.slice(2, 4), 16);
    b = parseInt(raw.slice(4, 6), 16);
  } else {
    return 1;
  }
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
    return 1;
  }
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

/**
 * Theme-aware colors for **TabBar** `plankBarV1`: saturated rail on light pages,
 * elevated slate rail on dark pages (e.g. midnight), so previews follow `ThemeProvider`.
 */
export function getPlankBarV1Chrome(theme: SemanticTokens): {
  barBg: string;
  pillBg: string;
  inactiveIcon: string;
  activeFg: string;
} {
  const { colors } = theme;
  const darkPage = srgbLuminance01(colors.background) < 0.45;
  if (darkPage) {
    return {
      barBg: colors.surface,
      pillBg: colors.textPrimary,
      inactiveIcon: colors.textSecondary,
      activeFg: colors.background,
    };
  }
  return {
    barBg: colors.primaryHover,
    pillBg: colors.background,
    inactiveIcon: colorWithOpacity('#ffffff', 0.72),
    activeFg: colors.textPrimary,
  };
}

/**
 * Theme-aware colors for **TabBar** `plankBarV2`: floating bubble tab bar
 * with an animated SVG notch and a raised icon circle.
 */
export function getPlankBarV2Chrome(theme: SemanticTokens): {
  barBg: string;
  bubbleBg: string;
  /** Colour of the concave notch — should match the screen background. */
  notchBg: string;
  inactiveIcon: string;
  activeFg: string;
  activeLabel: string;
  inactiveLabel: string;
} {
  const { colors } = theme;
  const darkPage = srgbLuminance01(colors.background) < 0.45;
  if (darkPage) {
    return {
      barBg: colors.surface,
      bubbleBg: colors.primary,
      notchBg: colors.background,
      inactiveIcon: colors.textSecondary,
      activeFg: colors.primaryForeground,
      activeLabel: colors.primary,
      inactiveLabel: colors.textSecondary,
    };
  }
  return {
    barBg: colors.background,
    bubbleBg: colors.primary,
    notchBg: colors.background,
    inactiveIcon: colors.textSecondary,
    activeFg: colors.primaryForeground,
    activeLabel: colors.primary,
    inactiveLabel: colors.textSecondary,
  };
}

export function getButtonTokens(
  theme: SemanticTokens,
  variant: 'primary' | 'outline' | 'ghost'
): { bg: string; bgPress: string; text: string; border: string } {
  const { colors } = theme;
  switch (variant) {
    case 'primary':
      return {
        bg: colors.primary,
        bgPress: colors.primaryHover,
        text: colors.primaryForeground,
        border: colors.primary,
      };
    case 'outline':
      return {
        bg: 'transparent',
        bgPress: colors.surfaceRaised,
        text: colors.primary,
        border: colors.border,
      };
    case 'ghost':
      return {
        bg: 'transparent',
        bgPress: colors.surfaceRaised,
        text: colors.primary,
        border: 'transparent',
      };
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

export function getInputTokens(theme: SemanticTokens): {
  bg: string;
  border: string;
  borderFocus: string;
  borderError: string;
  text: string;
  placeholder: string;
  label: string;
} {
  const { colors } = theme;
  return {
    bg: colors.surface,
    border: colors.border,
    borderFocus: colors.borderFocus,
    borderError: colors.destructive,
    text: colors.textPrimary,
    placeholder: colors.textDisabled,
    label: colors.textSecondary,
  };
}

export function getComposerInputTokens(theme: SemanticTokens): {
  shellBg: string;
  shellBorder: string;
  shellBorderFocus: string;
  text: string;
  placeholder: string;
  iconFg: string;
  iconBg: string;
  iconBgHover: string;
  chipBg: string;
  chipBorder: string;
  chipText: string;
  chipCountText: string;
  sendBg: string;
  sendFg: string;
  sendBgDisabled: string;
  sendFgDisabled: string;
} {
  const { colors } = theme;
  return {
    shellBg: colors.surface,
    shellBorder: colors.border,
    shellBorderFocus: colors.borderFocus,
    text: colors.textPrimary,
    placeholder: colors.textDisabled,
    iconFg: colors.textPrimary,
    iconBg: colorWithOpacity(colors.textPrimary, 0.06),
    iconBgHover: colorWithOpacity(colors.textPrimary, 0.10),
    chipBg: colors.surfaceRaised,
    chipBorder: colors.border,
    chipText: colors.textPrimary,
    chipCountText: colors.textSecondary,
    sendBg: colors.surfaceRaised,
    sendFg: colors.textPrimary,
    sendBgDisabled: colorWithOpacity(colors.textPrimary, 0.06),
    sendFgDisabled: colors.textDisabled,
  };
}

export function getDropdownMenuTokens(theme: SemanticTokens): {
  overlay: string;
  /** Light scrim for anchored dropdown (non-modal); keeps focus on the list. */
  anchoredBackdrop: string;
  triggerBg: string;
  triggerText: string;
  triggerBorder: string;
  menuBg: string;
  menuBorder: string;
  itemText: string;
  itemDisabledText: string;
  itemPressedBg: string;
  itemSelectedBg: string;
  checkmark: string;
  searchText: string;
  searchPlaceholder: string;
  searchSeparator: string;
} {
  const { colors } = theme;
  return {
    overlay: colors.overlay,
    anchoredBackdrop: 'rgba(0,0,0,0.12)',
    triggerBg: colors.surface,
    triggerText: colors.textPrimary,
    triggerBorder: colors.border,
    menuBg: colors.surfaceRaised,
    menuBorder: colors.border,
    itemText: colors.textPrimary,
    itemDisabledText: colors.textDisabled,
    itemPressedBg: colors.surface,
    itemSelectedBg: colors.surface,
    checkmark: colors.primary,
    searchText: colors.textPrimary,
    searchPlaceholder: colors.textDisabled,
    searchSeparator: colors.border,
  };
}

export function getModalTokens(theme: SemanticTokens): {
  overlay: string;
  surface: string;
  border: string;
  titleColor: string;
  bodyColor: string;
} {
  const { colors } = theme;
  return {
    overlay: colors.overlay,
    surface: colors.surfaceRaised,
    border: colors.border,
    titleColor: colors.textPrimary,
    bodyColor: colors.textSecondary,
  };
}

export function getToastTokens(
  theme: SemanticTokens,
  intent: ToastIntent
): {
  bg: string;
  titleColor: string;
  descriptionColor: string;
  accentBorder: string;
  border: string;
  progressTrack: string;
} {
  const { colors } = theme;
  const base = {
    descriptionColor: colors.textSecondary,
    border: colors.border,
    progressTrack: colorWithOpacity(colors.textPrimary, 0.12),
  };
  switch (intent) {
    case 'default':
      return {
        ...base,
        bg: colors.surfaceRaised,
        titleColor: colors.textPrimary,
        accentBorder: colors.border,
      };
    case 'info':
      return {
        ...base,
        bg: colorWithOpacity(colors.primary, 0.12),
        titleColor: colors.textPrimary,
        accentBorder: colors.primary,
      };
    case 'success':
      return {
        ...base,
        bg: colorWithOpacity(colors.success, 0.12),
        titleColor: colors.textPrimary,
        accentBorder: colors.success,
      };
    case 'error':
      return {
        ...base,
        bg: colorWithOpacity(colors.destructive, 0.12),
        titleColor: colors.textPrimary,
        accentBorder: colors.destructive,
      };
    case 'warning':
      return {
        ...base,
        bg: colorWithOpacity(colors.warning, 0.12),
        titleColor: colors.textPrimary,
        accentBorder: colors.warning,
      };
    default: {
      const _exhaustive: never = intent;
      return _exhaustive;
    }
  }
}

export function getTabsTokens(
  theme: SemanticTokens,
  variant: TabsVariant
): {
  tabBarBg: string;
  tabBg: string;
  tabBgActive: string;
  tabText: string;
  tabTextActive: string;
  indicatorColor: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
} {
  const { colors } = theme;
  const common = {
    tabText: colors.textSecondary,
    tabTextActive: colors.textPrimary,
    indicatorColor: colors.primary,
    borderColor: colors.border,
    badgeBg: colors.primary,
    badgeText: colors.primaryForeground,
  };
  switch (variant) {
    case 'underline':
      return {
        ...common,
        tabBarBg: 'transparent',
        tabBg: 'transparent',
        tabBgActive: 'transparent',
      };
    case 'pill':
      return {
        ...common,
        tabBarBg: 'transparent',
        tabBg: 'transparent',
        tabBgActive: colorWithOpacity(colors.primary, 0.15),
      };
    case 'bordered':
      return {
        ...common,
        tabBarBg: colors.surface,
        tabBg: 'transparent',
        tabBgActive: colorWithOpacity(colors.primary, 0.12),
      };
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

export function getBadgeTokens(
  theme: SemanticTokens,
  intent: BadgeIntent
): { bg: string; text: string; border: string; dotColor: string } {
  const { colors } = theme;
  const map = {
    default: {
      bg: colors.surface,
      text: colors.textSecondary,
      border: colors.border,
      dotColor: colors.textSecondary,
    },
    success: {
      bg: colorWithOpacity(colors.success, 0.12),
      text: colors.success,
      border: colors.success,
      dotColor: colors.success,
    },
    warning: {
      bg: colorWithOpacity(colors.warning, 0.12),
      text: colors.warning,
      border: colors.warning,
      dotColor: colors.warning,
    },
    error: {
      bg: colorWithOpacity(colors.destructive, 0.12),
      text: colors.destructive,
      border: colors.destructive,
      dotColor: colors.destructive,
    },
    info: {
      bg: colorWithOpacity(colors.primary, 0.12),
      text: colors.primary,
      border: colors.primary,
      dotColor: colors.primary,
    },
  } as const;
  return map[intent];
}

export function getAvatarTokens(
  theme: SemanticTokens,
  variant: AvatarVariant
): {
  bg: string;
  text: string;
  borderColor: string;
  borderRadius: number;
  statusOnline: string;
  statusOffline: string;
  statusBusy: string;
} {
  const { colors, radii } = theme;
  const br =
    variant === 'circle'
      ? radii.full
      : variant === 'rounded'
        ? radii.md
        : radii.sm;
  return {
    bg: colors.surfaceRaised,
    text: colors.textSecondary,
    borderColor: colors.border,
    borderRadius: br,
    statusOnline: colors.success,
    statusOffline: colors.textDisabled,
    statusBusy: colors.destructive,
  };
}

export function getBottomSheetTokens(theme: SemanticTokens): {
  bg: string;
  handle: string;
  handleIndicator: string;
  border: string;
  titleColor: string;
} {
  const { colors } = theme;
  return {
    bg: colors.surfaceRaised,
    handle: 'transparent',
    handleIndicator: colors.textDisabled,
    border: colors.border,
    titleColor: colors.textPrimary,
  };
}

export function getCheckboxTokens(theme: SemanticTokens): {
  boxBg: string;
  boxBgChecked: string;
  boxBorder: string;
  boxBorderChecked: string;
  checkmark: string;
  labelColor: string;
  descriptionColor: string;
  disabledOpacity: number;
} {
  const { colors } = theme;
  return {
    boxBg: colors.surface,
    boxBgChecked: colors.primary,
    boxBorder: colors.border,
    boxBorderChecked: colors.primary,
    checkmark: colors.primaryForeground,
    labelColor: colors.textPrimary,
    descriptionColor: colors.textSecondary,
    disabledOpacity: 0.5,
  };
}

export function getSwitchTokens(theme: SemanticTokens): {
  trackBg: string;
  trackBgChecked: string;
  thumbBg: string;
  thumbBgChecked: string;
  borderColor: string;
  labelColor: string;
} {
  const { colors } = theme;
  return {
    trackBg: colors.border,
    trackBgChecked: colors.primary,
    thumbBg: colors.surfaceRaised,
    thumbBgChecked: colors.primaryForeground,
    borderColor: colors.border,
    labelColor: colors.textPrimary,
  };
}

export function getDrawerContentTokens(theme: SemanticTokens): {
  bg: string;
  border: string;
  itemBg: string;
  itemBgActive: string;
  itemLabel: string;
  itemLabelActive: string;
  itemIcon: string;
  itemIconActive: string;
  activeBar: string;
  badgeBg: string;
  badgeText: string;
} {
  const { colors } = theme;
  return {
    bg: colors.surface,
    border: colors.border,
    itemBg: 'transparent',
    itemBgActive: colorWithOpacity(colors.primary, 0.08),
    itemLabel: colors.textSecondary,
    itemLabelActive: colors.primary,
    itemIcon: colors.textSecondary,
    itemIconActive: colors.primary,
    activeBar: colors.primary,
    badgeBg: colors.primary,
    badgeText: colors.primaryForeground,
  };
}

export function getTabBarTokens(
  theme: SemanticTokens,
  variant: TabBarVariant
): {
  bg: string;
  border: string;
  itemLabel: string;
  itemLabelActive: string;
  badgeBg: string;
  badgeText: string;
  indicator: string;
  shadow: string;
} {
  const { colors } = theme;
  const base = {
    itemLabel: colors.textSecondary,
    itemLabelActive: colors.primary,
    badgeBg: colors.destructive,
    badgeText: colors.destructiveForeground,
    indicator: colors.primary,
    shadow: colors.textPrimary,
  };
  switch (variant) {
    case 'default':
      return {
        ...base,
        bg: colors.surface,
        border: colors.border,
      };
    case 'floating':
      return {
        ...base,
        bg: colors.surfaceRaised,
        border: colors.border,
      };
    case 'minimal':
      return {
        ...base,
        bg: 'transparent',
        border: 'transparent',
      };
    case 'plankBarV1': {
      const plank = getPlankBarV1Chrome(theme);
      return {
        ...base,
        bg: plank.barBg,
        border: 'transparent',
        itemLabel: plank.inactiveIcon,
        itemLabelActive: plank.activeFg,
        indicator: 'transparent',
      };
    }
    case 'plankBarV2': {
      const v2 = getPlankBarV2Chrome(theme);
      return {
        ...base,
        bg: v2.barBg,
        border: 'transparent',
        itemLabel: v2.inactiveLabel,
        itemLabelActive: v2.activeLabel,
        indicator: 'transparent',
      };
    }
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

export function getHeaderTokens(
  theme: SemanticTokens,
  variant: HeaderVariant
): {
  bg: string;
  border: string;
  titleColor: string;
  subtitleColor: string;
  iconColor: string;
} {
  const { colors } = theme;
  switch (variant) {
    case 'default':
      return {
        bg: colors.surface,
        border: colors.border,
        titleColor: colors.textPrimary,
        subtitleColor: colors.textSecondary,
        iconColor: colors.textPrimary,
      };
    case 'transparent':
      return {
        bg: 'transparent',
        border: 'transparent',
        titleColor: colors.textPrimary,
        subtitleColor: colors.textSecondary,
        iconColor: colors.textPrimary,
      };
    case 'blurred':
      return {
        bg: colorWithOpacity(colors.surface, 0.85),
        border: colors.border,
        titleColor: colors.textPrimary,
        subtitleColor: colors.textSecondary,
        iconColor: colors.textPrimary,
      };
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}
