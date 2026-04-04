/**
 * Lightweight View-based icon set for the example app's sidebar.
 * No icon library dependency — renders via React Native primitives only.
 * Each icon accepts a `color` prop so the parent can tint active vs inactive.
 */
import React from 'react';
import {View} from 'react-native';

type IconProps = {color: string; size?: number};

/** 2×2 grid — represents "Showcase / Overview" */
export function GridIcon({color, size = 16}: IconProps) {
  const cell = (size - 2) / 2;
  return (
    <View
      style={{width: size, height: size, flexDirection: 'row', flexWrap: 'wrap', gap: 2}}>
      {[0, 1, 2, 3].map(i => (
        <View
          key={i}
          style={{width: cell, height: cell, borderRadius: 2, backgroundColor: color}}
        />
      ))}
    </View>
  );
}

/** Dialog box with title bar — represents "Modal" */
export function ModalIcon({color, size = 16}: IconProps) {
  return (
    <View
      style={{
        width: size,
        height: size * 0.75,
        borderWidth: 1.5,
        borderColor: color,
        borderRadius: 3,
        overflow: 'hidden',
      }}>
      <View style={{height: 4, backgroundColor: color}} />
    </View>
  );
}

/** Panel rising from the bottom — represents "Bottom sheet" */
export function SheetIcon({color, size = 16}: IconProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderWidth: 1.5,
        borderColor: color,
        borderRadius: 3,
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}>
      <View
        style={{
          height: size * 0.45,
          backgroundColor: color,
          opacity: 0.35,
          borderTopWidth: 1.5,
          borderTopColor: color,
        }}
      />
    </View>
  );
}

/** Notification card stack — represents "Toasts" */
export function ToastIcon({color, size = 16}: IconProps) {
  const barW = size * 0.7;
  return (
    <View style={{width: size, height: size, justifyContent: 'center', gap: 3}}>
      <View
        style={{
          width: size,
          height: size * 0.55,
          borderWidth: 1.5,
          borderColor: color,
          borderRadius: 3,
          paddingHorizontal: 3,
          paddingTop: 3,
        }}>
        <View style={{height: 2, width: barW, backgroundColor: color, borderRadius: 1}} />
      </View>
      <View
        style={{
          width: size * 0.8,
          height: size * 0.35,
          borderWidth: 1.5,
          borderColor: color,
          borderRadius: 3,
          opacity: 0.45,
        }}
      />
    </View>
  );
}

/** Tab strip with raised active tab — represents "Tabs" */
export function TabsIcon({color, size = 16}: IconProps) {
  const tabW = (size - 2) / 3;
  return (
    <View style={{width: size, height: size, justifyContent: 'flex-end'}}>
      {/* Tab strip */}
      <View style={{flexDirection: 'row', gap: 1, marginBottom: 0}}>
        <View
          style={{
            width: tabW,
            height: 5,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
            backgroundColor: color,
          }}
        />
        <View
          style={{
            width: tabW,
            height: 4,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
            backgroundColor: color,
            opacity: 0.35,
          }}
        />
        <View
          style={{
            width: tabW,
            height: 4,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
            backgroundColor: color,
            opacity: 0.35,
          }}
        />
      </View>
      {/* Content area */}
      <View
        style={{
          width: size,
          height: size * 0.5,
          borderWidth: 1.5,
          borderColor: color,
          borderRadius: 2,
          borderTopLeftRadius: 0,
        }}
      />
    </View>
  );
}
