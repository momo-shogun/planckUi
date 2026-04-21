import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { PlanckH1V1, ZeptoHeaderV1 } from '@my-ui-lib/core';
import { Preview } from './Preview';

/** Matches `PlanckH1V1HeaderScreen` / `ZeptoHeaderV1Screen` in apps/example (Android lab). */
const HEADER_GRADIENT = ['#5b21b6', '#1e40af'] as const;
const ZEPTO_HEADER_BG = '#D2A679';

/** Approximates status-bar + safe-area inset so web preview aligns with device chrome. */
const SAFE_TOP = 28;

function IconRefresh({ color }: { color: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" accessibilityElementsHidden>
      <Path
        d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
        fill={color}
      />
    </Svg>
  );
}

function IconBellOutline({ color }: { color: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" accessibilityElementsHidden>
      <Path
        d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6V11c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"
        fill={color}
      />
    </Svg>
  );
}

export function PlanckH1V1DocPreview() {
  return (
    <Preview minHeight={168} themeSwitcher>
      <View style={{ alignSelf: 'stretch', width: '100%', maxWidth: 560 }}>
        {/* Status / notch strip + header — same stacking idea as the native screen */}
        <View style={{ backgroundColor: HEADER_GRADIENT[0], paddingTop: SAFE_TOP }}>
          <PlanckH1V1
            title="Qwash"
            backgroundGradientColors={HEADER_GRADIENT}
            logoIcon={
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  borderWidth: 2,
                  borderColor: '#ffffff',
                  opacity: 0.9,
                }}
              />
            }
            notificationDot
            onSearch={() => {}}
            onNotification={() => {}}
            slots={{
              searchIcon: <IconRefresh color="#ffffff" />,
              notificationIcon: <IconBellOutline color="#ffffff" />,
            }}
          />
        </View>
      </View>
    </Preview>
  );
}

export function ZeptoHeaderV1DocPreview() {
  return (
    <Preview minHeight={220} themeSwitcher>
      <View style={{ alignSelf: 'stretch', width: '100%', maxWidth: 560 }}>
        <View style={{ backgroundColor: ZEPTO_HEADER_BG, paddingTop: SAFE_TOP }}>
          <ZeptoHeaderV1
            backgroundColor={ZEPTO_HEADER_BG}
            etaLabel="6 minutes"
            addressLabel="Home - 1/36, 1/32, Krishna Vihar Colon..."
            walletLabel="₹0"
            onAddressPress={() => {}}
            onWalletPress={() => {}}
            onProfilePress={() => {}}
          />
        </View>
      </View>
    </Preview>
  );
}
