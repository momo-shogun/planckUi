/**
 * Darken a `#RRGGBB` hex color by blending toward black.
 * `amount01` in [0, 1]: 0 = unchanged, 1 = black.
 */
export function darkenHex(hex: string, amount01: number): string {
  const m = /^#?([0-9a-fA-F]{6})$/.exec(hex.trim());
  if (!m) return hex;
  const s = m[1];
  const r = parseInt(s.slice(0, 2), 16);
  const g = parseInt(s.slice(2, 4), 16);
  const b = parseInt(s.slice(4, 6), 16);
  const f = Math.max(0, Math.min(1, 1 - amount01));
  const rr = Math.round(r * f);
  const gg = Math.round(g * f);
  const bb = Math.round(b * f);
  const out =
    '#' +
    rr.toString(16).padStart(2, '0') +
    gg.toString(16).padStart(2, '0') +
    bb.toString(16).padStart(2, '0');
  return out.toUpperCase();
}

/** Same factor as `ZeptoTabs` `tabsBg` / `resolvedColorsDarker`. */
export const ZEPTO_TABS_TRACK_DARKEN = 0.08;
