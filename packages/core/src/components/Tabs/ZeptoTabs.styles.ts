import { Platform, StyleSheet } from 'react-native';

export const ZEPTO = {
  pillRadius: 22,
  pillHeight: 60,
  /** Horizontal space between adjacent tab pills. */
  gap: 12,
  scrollPadH: 14,
  scrollPadV: 10,
  fontSize: 16,
} as const;

export const zeptoTabsStyles = StyleSheet.create({
  outer: {
    alignSelf: 'stretch',
    borderRadius: ZEPTO.pillRadius + 6,
    overflow: 'hidden',
  },
  tabsBg: {
    alignSelf: 'stretch',
  },
  /**
   * Horizontal inset so tabs and the absolute highlight share the same
   * coordinate space (avoids highlight hugging the screen while tabs are padded).
   */
  tabRowOuter: {
    alignSelf: 'stretch',
    flexGrow: 0,
    paddingHorizontal: ZEPTO.scrollPadH,
    paddingTop: ZEPTO.scrollPadV,
    paddingBottom: 0,
  },
  /** Track for tabs + sliding pill; no horizontal padding here. */
  tabRowInner: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    flexWrap: 'nowrap',
    minHeight: ZEPTO.pillHeight,
  },
  highlight: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: ZEPTO.pillHeight,
    borderTopLeftRadius: ZEPTO.pillRadius,
    borderTopRightRadius: ZEPTO.pillRadius,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        // keep the lift above, no bottom “edge”
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
      },
      default: {
        elevation: 2,
        shadowColor: '#000',
      },
    }),
  },
  pressable: {
    zIndex: 1,
    flex: 1,
    minWidth: 0,
    height: ZEPTO.pillHeight,
    borderRadius: ZEPTO.pillRadius,
    overflow: 'hidden',
  },
  tabInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: ZEPTO.pillHeight,
    paddingHorizontal: 8,
    borderRadius: ZEPTO.pillRadius,
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  tabInnerActive: {
    backgroundColor: 'transparent',
    marginBottom: 0,
  },
  label: {
    fontSize: ZEPTO.fontSize,
    fontWeight: '600',
  },
  labelActive: {
    color: '#141414',
  },
  labelInactive: {
    color: '#6B6B70',
    fontWeight: '500',
  },
  labelShrink: {
    flexShrink: 1,
    minWidth: 0,
  },
  iconWrap: {
    marginRight: 8,
  },
  searchWrap: {
    paddingHorizontal: ZEPTO.scrollPadH,
    paddingVertical: ZEPTO.scrollPadV,
  },
  searchBg: {
    alignSelf: 'stretch',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(17,24,39,0.10)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
      },
      default: {
        elevation: 1,
      },
    }),
  },
  searchIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIconCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#111827',
    opacity: 0.9,
  },
  searchIconHandle: {
    position: 'absolute',
    width: 8,
    height: 2,
    backgroundColor: '#111827',
    borderRadius: 2,
    opacity: 0.9,
    transform: [{ rotate: '45deg' }, { translateX: 7 }, { translateY: 7 }],
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 0,
  },
});
