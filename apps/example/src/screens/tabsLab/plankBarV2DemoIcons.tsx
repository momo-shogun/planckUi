import React from 'react';
import {getPlankBarV2Chrome} from '@my-ui-lib/tokens';
import type {SemanticTokens} from '@my-ui-lib/tokens';
import type {PlankV2TabIconKind} from '../../navigation/bottomTabsLab/presets/plankBarV2/plankBarV2.icons';
import {rnPlankBarV2TabBarIcon} from '../../navigation/bottomTabsLab/presets/plankBarV2/plankBarV2.icons';

export function makePlankBarV2DemoIcon(kind: PlankV2TabIconKind, theme: SemanticTokens) {
  const chrome = getPlankBarV2Chrome(theme);
  return (active: boolean) =>
    rnPlankBarV2TabBarIcon(kind)({
      focused: active,
      color: active ? chrome.activeFg : chrome.inactiveIcon,
      size: 24,
    });
}
