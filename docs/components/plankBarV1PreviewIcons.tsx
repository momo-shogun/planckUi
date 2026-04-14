import React from 'react';
import { Image } from 'react-native-web';

/**
 * Lightweight SVG-as-data-URI icons for the docs site (react-native-web + Next).
 * Avoids `lucide-react-native` / `react-native-svg` in webpack — those pull RN Fabric
 * sources that Next cannot compile. The native app uses **react-native-vector-icons** instead.
 */
function svgDataUri(svgInner: string, stroke: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svgInner}</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const inner = {
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  menu: '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
} as const;

export type PlankPreviewIconKind = keyof typeof inner;

export function PlankBarV1PreviewIcon({ kind, stroke }: { kind: PlankPreviewIconKind; stroke: string }) {
  const uri = svgDataUri(inner[kind], stroke);
  return <Image source={{ uri }} style={{ width: 22, height: 22 }} resizeMode="contain" accessibilityIgnoresInvertColors />;
}
