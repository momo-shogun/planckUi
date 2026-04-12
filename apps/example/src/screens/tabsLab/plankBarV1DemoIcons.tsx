import React from 'react';
import {PLANK_BAR_V1} from '@my-ui-lib/core';
import type {PlankTabIconKind} from '../../navigation/bottomTabsLab/presets/plankBarV1/plankBarV1.icons';
import {rnPlankTabBarIcon} from '../../navigation/bottomTabsLab/presets/plankBarV1/plankBarV1.icons';

export function makePlankBarV1DemoIcon(kind: PlankTabIconKind) {
  return (active: boolean) =>
    rnPlankTabBarIcon(kind)({
      focused: active,
      color: active ? PLANK_BAR_V1.activeFg : PLANK_BAR_V1.inactiveIcon,
      size: 24,
    });
}
