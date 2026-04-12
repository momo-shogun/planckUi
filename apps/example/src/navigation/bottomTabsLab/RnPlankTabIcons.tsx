import React from 'react';
import {View} from 'react-native';

type P = {color: string; size: number};

function PlankHomeIcon({color, size}: P) {
  const w = size * 0.55;
  return (
    <View style={{width: size, height: size, alignItems: 'center', justifyContent: 'flex-end'}}>
      <View style={{flexDirection: 'row', marginBottom: 2, alignItems: 'flex-end'}}>
        <View style={{width: size * 0.12, height: size * 0.18, backgroundColor: color, borderRadius: 1, marginRight: 2}} />
        <View style={{width: size * 0.14, height: size * 0.22, backgroundColor: color, borderRadius: 1, marginRight: 2}} />
        <View style={{width: size * 0.12, height: size * 0.18, backgroundColor: color, borderRadius: 1}} />
      </View>
      <View style={{width: w, height: size * 0.28, borderWidth: 2, borderColor: color, borderRadius: 2}} />
    </View>
  );
}

function PlankSearchIcon({color, size}: P) {
  const r = size * 0.32;
  return (
    <View style={{width: size, height: size, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{marginBottom: size * 0.12, marginRight: size * 0.12}}>
        <View
          style={{
            width: r * 2,
            height: r * 2,
            borderRadius: r,
            borderWidth: 2,
            borderColor: color,
          }}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          width: size * 0.2,
          height: 2,
          backgroundColor: color,
          borderRadius: 1,
          bottom: size * 0.2,
          right: size * 0.16,
          transform: [{rotate: '45deg'}],
        }}
      />
    </View>
  );
}

function PlankChatIcon({color, size}: P) {
  return (
    <View style={{width: size, height: size, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          width: size * 0.42,
          height: size * 0.32,
          borderRadius: 6,
          borderWidth: 2,
          borderColor: color,
          marginLeft: size * 0.12,
          marginBottom: size * 0.08,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: size * 0.38,
          height: size * 0.28,
          borderRadius: 6,
          borderWidth: 2,
          borderColor: color,
          marginRight: size * 0.14,
          marginTop: size * 0.06,
        }}
      />
    </View>
  );
}

function PlankMenuIcon({color, size}: P) {
  const w = size * 0.55;
  return (
    <View style={{width: size, height: size, justifyContent: 'center', alignItems: 'flex-end', paddingRight: size * 0.12}}>
      <View style={{width: w, height: 2, backgroundColor: color, borderRadius: 1}} />
      <View style={{width: w * 0.72, height: 2, backgroundColor: color, borderRadius: 1, marginTop: 5}} />
      <View style={{width: w * 0.5, height: 2, backgroundColor: color, borderRadius: 1, marginTop: 5}} />
    </View>
  );
}

export type PlankTabIconKind = 'home' | 'search' | 'chat' | 'menu';

export function rnPlankTabBarIcon(kind: PlankTabIconKind) {
  return ({color, size}: {focused: boolean; color: string; size: number}) => {
    switch (kind) {
      case 'home':
        return <PlankHomeIcon color={color} size={size} />;
      case 'search':
        return <PlankSearchIcon color={color} size={size} />;
      case 'chat':
        return <PlankChatIcon color={color} size={size} />;
      case 'menu':
        return <PlankMenuIcon color={color} size={size} />;
    }
  };
}
