import React from 'react';
import {getPlankBarV1Chrome} from '@my-ui-lib/tokens';
import type {SemanticTokens} from '@my-ui-lib/tokens';
import type {PlankTabIconKind} from '../../navigation/bottomTabsLab/presets/plankBarV1/plankBarV1.icons';
import {rnPlankTabBarIcon} from '../../navigation/bottomTabsLab/presets/plankBarV1/plankBarV1.icons';

export function makePlankBarV1DemoIcon(kind: PlankTabIconKind, theme: SemanticTokens) {
  const chrome = getPlankBarV1Chrome(theme);
  return (active: boolean) =>
    rnPlankTabBarIcon(kind)({
      focused: active,
      color: active ? chrome.activeFg : chrome.inactiveIcon,
      size: 24,
    });
}
