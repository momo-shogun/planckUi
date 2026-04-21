import React from 'react';
import { Avatar, MPCard, Text, VStack, useTheme } from '@my-ui-lib/core';
import { Preview } from './Preview';

function Glyph({ children, color }: { children: string; color: string }) {
  return (
    <Text style={{ fontSize: 16, color, fontWeight: '600' as const }} accessibilityElementsHidden>
      {children}
    </Text>
  );
}

export function MPCardDocPreview() {
  const theme = useTheme();
  return (
    <Preview minHeight={260} themeSwitcher>
      <VStack gap={theme.spacing[3]} style={{ alignSelf: 'stretch', maxWidth: 400 }}>
        <Text variant="caption" color={theme.colors.textSecondary}>
          Profile-style card: avatar, title, match rate, and icon actions (<code>ButtonIconOnly</code>
          ).
        </Text>
        <MPCard
          avatar={<Avatar fallback="Katy Fuller" size="md" variant="circle" />}
          name="Katy Fuller"
          subtitle="Fullstack Engineer"
          matchRatePct={94}
          backgroundGradientColors={['#ffffff', '#f8f3e4']}
          textColor="#111827"
          mutedTextColor="#6b7280"
          progressColor="#65a30d"
          progressTrackColor="rgba(17,24,39,0.10)"
          topRightIcon={<Glyph color="#111827">↗</Glyph>}
          onPressTopRight={() => {}}
          chatIcon={<Glyph color="#111827">✉</Glyph>}
          onPressChat={() => {}}
          callIcon={<Glyph color="#111827">☎</Glyph>}
          onPressCall={() => {}}
        />
      </VStack>
    </Preview>
  );
}
