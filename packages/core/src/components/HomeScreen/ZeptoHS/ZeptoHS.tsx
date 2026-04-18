import React from 'react';
import { View } from 'react-native';
import { ZeptoHeaderV1 } from '../../navigation/Header/ZeptoHeaderV1';
import { ZeptoTabC } from '../../Tabs/ZeptoTabC';
import type { ZeptoHSProps } from './ZeptoHS.types';

export function ZeptoHS(props: ZeptoHSProps) {
  const { header, tabStrip, children, testID, style } = props;

  return (
    <View style={[{ flex: 1 }, style]} testID={testID}>
      <ZeptoHeaderV1 {...header} />
      
      <ZeptoTabC {...tabStrip} />

      {children != null ? <View style={{ flex: 1 }}>{children}</View> : null}
    </View>
  );
}

ZeptoHS.displayName = 'ZeptoHS';
