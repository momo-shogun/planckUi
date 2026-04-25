import React, { useMemo, useState } from 'react';
import { Button, Text, useTheme } from '@my-ui-lib/core';
import { ButtonDocsTabsSection } from '../ButtonDocsTabsSection';
import { CardDocsTabsSection } from '../CardDocsTabsSection';
import { HeaderDocsTabsSection } from '../HeaderDocsTabsSection';

type GalleryKey = 'button' | 'cards' | 'header';

const TABS: Array<{ key: GalleryKey; label: string }> = [
  { key: 'button', label: 'Button' },
  { key: 'cards', label: 'Cards' },
  { key: 'header', label: 'Header' },
];

export function LandingComponentGallery() {
  const theme = useTheme();
  const [active, setActive] = useState<GalleryKey>('button');

  const panel = useMemo(() => {
    switch (active) {
      case 'cards':
        return <CardDocsTabsSection />;
      case 'header':
        return <HeaderDocsTabsSection />;
      case 'button':
      default:
        return <ButtonDocsTabsSection />;
    }
  }, [active]);

  const outlineRoot = useMemo(
    () => ({
      paddingHorizontal: 12,
      minHeight: 34,
      backgroundColor: 'rgba(148,163,184,0.06)',
      borderWidth: 1,
      borderColor: 'rgba(148,163,184,0.18)',
      shadowOpacity: 0,
      elevation: 0,
    }),
    []
  );

  return (
    <section style={{ paddingTop: 22, paddingBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: theme.colors.textPrimary,
            }}
          >
            Component highlights
          </h2>
          <p style={{ marginTop: 6, marginBottom: 0, fontSize: 13, color: theme.colors.textSecondary }}>
            Live previews — copy what you need.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {TABS.map((t) => (
            <Button
              key={t.key}
              size="sm"
              variant={active === t.key ? 'default' : 'outline'}
              onPress={() => setActive(t.key)}
              slots={{
                root:
                  active === t.key
                    ? { paddingHorizontal: 12, minHeight: 34 }
                    : outlineRoot,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: '800' }}>{t.label}</Text>
            </Button>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: 14,
          borderRadius: 18,
          border: '1px solid rgba(148,163,184,0.16)',
          background: 'rgba(2,6,23,0.35)',
          padding: 14,
          overflow: 'hidden',
        }}
      >
        {panel}
      </div>
    </section>
  );
}

