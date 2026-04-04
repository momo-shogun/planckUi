import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  Modal as RNModal,
  Platform,
  Pressable as RNPressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { getDropdownMenuTokens } from '@my-ui-lib/tokens';
import { Pressable } from '../../primitives/Pressable';
import { useControlledState } from '../../hooks/useControlledState';
import { useTheme } from '../../system/ThemeContext';
import {
  createDropdownMenuStyles,
  getDefaultMenuListMaxHeight,
} from '../DropdownMenu/DropdownMenu.styles';
import type { MultiSelectProps } from './MultiSelect.types';

const SEARCH_ROW_HEIGHT = 48;

export function MultiSelect(props: MultiSelectProps) {
  const {
    items,
    value: valueProp,
    defaultValue,
    onValueChange: onValueChangeProp,
    onChange: onChangeProp,
    placeholder = 'Select',
    disabled = false,
    unstyled = false,
    mode = 'anchored',
    dropdownPosition = 'auto',
    maxHeight: maxHeightProp,
    menuMinWidth,
    modalMaxWidth = 360,
    search = false,
    searchPlaceholder = 'Search…',
    onChangeSearchText,
    filterItem,
    renderItem,
    maxSelections,
    showsVerticalScrollIndicator = true,
    onOpen,
    onClose,
    searchInputProps,
    style,
    containerStyle,
    slots = {},
    testID,
    accessibilityLabel,
  } = props;
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorRect, setAnchorRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const triggerRef = useRef<View>(null);

  const emitSelection = useCallback(
    (ids: string[]) => {
      onValueChangeProp?.(ids);
      onChangeProp?.(ids);
    },
    [onValueChangeProp, onChangeProp]
  );

  const [selectedIds, setSelectedIds] = useControlledState(
    valueProp,
    defaultValue ?? [],
    emitSelection
  );

  const close = useCallback(() => {
    setOpen(false);
    setSearchQuery('');
    onClose?.();
  }, [onClose]);

  const openAnchored = useCallback(() => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setAnchorRect({ x, y, width, height });
      setOpen(true);
      onOpen?.();
    });
  }, [onOpen]);

  const toggle = useCallback(() => {
    if (disabled) return;
    if (open) {
      close();
      return;
    }
    if (mode === 'modal') {
      setOpen(true);
      onOpen?.();
      return;
    }
    openAnchored();
  }, [disabled, open, close, mode, openAnchored, onOpen]);

  const selectedLabel = useMemo(() => {
    if (selectedIds.length === 0) return placeholder;
    const labels = selectedIds
      .map((id) => items.find((i) => i.id === id)?.label)
      .filter((x): x is string => Boolean(x));
    return labels.join(', ');
  }, [items, selectedIds, placeholder]);

  const toggleItem = useCallback(
    (id: string) => {
      const item = items.find((i) => i.id === id);
      if (item?.disabled) return;
      const nextSet = new Set(selectedIds);
      if (nextSet.has(id)) {
        nextSet.delete(id);
      } else if (maxSelections == null || nextSet.size < maxSelections) {
        nextSet.add(id);
      } else {
        return;
      }
      setSelectedIds(Array.from(nextSet));
    },
    [items, maxSelections, selectedIds, setSelectedIds]
  );

  const onSearchChange = useCallback(
    (text: string) => {
      setSearchQuery(text);
      onChangeSearchText?.(text);
    },
    [onChangeSearchText]
  );

  const filteredItems = useMemo(() => {
    if (!search) return items;
    const q = searchQuery.trim();
    if (!q) return items;
    if (filterItem) return items.filter((it) => filterItem(q, it));
    const lower = q.toLowerCase();
    return items.filter((it) => it.label.toLowerCase().includes(lower));
  }, [items, search, searchQuery, filterItem]);

  if (unstyled) {
    return (
      <View style={style} testID={testID}>
        <RNPressable
          accessibilityHint={accessibilityLabel}
          accessibilityLabel={accessibilityLabel ?? selectedLabel}
          accessibilityRole="button"
          accessibilityState={{ disabled, expanded: open }}
          disabled={disabled}
          onPress={toggle}>
          <Text>{selectedLabel}</Text>
        </RNPressable>
        <RNModal transparent visible={open} onRequestClose={close}>
          <RNPressable onPress={close} style={StyleSheet.absoluteFillObject}>
            <View />
          </RNPressable>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              padding: 24,
              maxWidth: 400,
              alignSelf: 'center',
              width: '100%',
            }}
            pointerEvents="box-none">
            {search ? (
              <TextInput
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChangeText={onSearchChange}
                testID={testID ? `${testID}-search` : undefined}
              />
            ) : null}
            <ScrollView keyboardShouldPersistTaps="handled">
              {filteredItems.map((item) => {
                const selected = selectedIds.includes(item.id);
                return (
                  <RNPressable
                    key={item.id}
                    disabled={item.disabled}
                    onPress={() => !item.disabled && toggleItem(item.id)}>
                    <Text>
                      {selected ? '☑ ' : '☐ '}
                      {item.label}
                    </Text>
                  </RNPressable>
                );
              })}
            </ScrollView>
          </View>
        </RNModal>
      </View>
    );
  }

  const theme = useTheme();
  const tokens = getDropdownMenuTokens(theme);
  const styles = createDropdownMenuStyles(tokens, theme);
  const listMaxHeight =
    maxHeightProp ?? getDefaultMenuListMaxHeight(theme);

  const win = Dimensions.get('window');
  const screenPad = theme.spacing[2];
  const dropdownGap = 2;

  const menuWidth = Math.max(
    anchorRect.width,
    menuMinWidth ?? anchorRect.width
  );
  let menuLeft = anchorRect.x;
  if (menuLeft + menuWidth > win.width - screenPad) {
    menuLeft = Math.max(screenPad, win.width - menuWidth - screenPad);
  }

  const searchBlock = search ? SEARCH_ROW_HEIGHT : 0;
  const shellMaxHeight = searchBlock + listMaxHeight;

  const spaceBelow =
    win.height - anchorRect.y - anchorRect.height - dropdownGap;
  const spaceAbove = anchorRect.y - dropdownGap;
  const openBelow =
    dropdownPosition === 'bottom' ||
    (dropdownPosition === 'top'
      ? false
      : spaceBelow >= spaceAbove || spaceBelow >= 120);

  const anchoredTop = openBelow
    ? anchorRect.y + anchorRect.height + dropdownGap
    : Math.max(screenPad, anchorRect.y - shellMaxHeight - dropdownGap);

  const triggerSlotRoot = [
    styles.trigger,
    ...(disabled ? [styles.triggerDisabled] : []),
    ...(slots.trigger ? [slots.trigger] : []),
  ];

  const renderRows = () =>
    filteredItems.map((item, index) => {
      const selected = selectedIds.includes(item.id);
      const dis = Boolean(item.disabled);
      const isLast = index === filteredItems.length - 1;
      return (
        <RNPressable
          key={item.id}
          disabled={dis}
          onPress={() => !dis && toggleItem(item.id)}
          style={({ pressed }) => [
            styles.menuItem,
            isLast && styles.menuItemLast,
            selected && styles.menuItemSelected,
            pressed && !dis && styles.menuItemPressed,
            slots.menuItem,
            ...(selected && slots.menuItemSelected
              ? [slots.menuItemSelected]
              : []),
          ]}
          testID={testID ? `${testID}-item-${item.id}` : undefined}>
          {renderItem ? (
            renderItem(item, { selected, disabled: dis })
          ) : (
            <View style={styles.menuItemRow}>
              <View style={[styles.checkbox, selected && styles.checkboxOn]}>
                {selected ? (
                  <Text style={styles.checkboxMark}>✓</Text>
                ) : null}
              </View>
              <Text
                numberOfLines={1}
                style={[
                  styles.menuItemText,
                  dis && styles.menuItemTextDisabled,
                  slots.menuItemText,
                ]}>
                {item.label}
              </Text>
            </View>
          )}
        </RNPressable>
      );
    });

  const listScroll = (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      style={[styles.listScroll, { maxHeight: listMaxHeight }, slots.menu]}>
      {renderRows()}
    </ScrollView>
  );

  const searchField = search ? (
    <TextInput
      {...searchInputProps}
      placeholder={searchPlaceholder}
      placeholderTextColor={tokens.searchPlaceholder}
      style={[styles.searchInput, slots.searchInput]}
      value={searchQuery}
      onChangeText={onSearchChange}
      testID={testID ? `${testID}-search` : undefined}
    />
  ) : null;

  const menuChrome = (
    <>
      {searchField}
      {listScroll}
    </>
  );

  const anchoredMenu =
    mode === 'anchored' ? (
      <View
        pointerEvents="box-none"
        style={[
          styles.menuSurface,
          {
            position: 'absolute',
            top: anchoredTop,
            left: menuLeft,
            width: menuWidth,
            maxHeight: shellMaxHeight,
            zIndex: 2,
          },
          slots.menuContainer,
          containerStyle,
        ]}>
        {menuChrome}
      </View>
    ) : null;

  const modalMenuWidth = Math.min(
    modalMaxWidth,
    win.width - theme.spacing[4] * 2
  );

  const modalMenu =
    mode === 'modal' ? (
      <View style={styles.modalWrap} pointerEvents="box-none">
        <View
          style={[
            styles.modalCard,
            {
              width: modalMenuWidth,
              maxHeight: win.height * 0.8,
            },
            slots.menuContainer,
            containerStyle,
          ]}>
          {menuChrome}
        </View>
      </View>
    ) : null;

  return (
    <View style={[styles.root, slots.root, style]} testID={testID}>
      <View ref={triggerRef} collapsable={false} style={{ alignSelf: 'stretch' }}>
        <Pressable
          accessibilityHint={accessibilityLabel}
          accessibilityLabel={accessibilityLabel ?? selectedLabel}
          accessibilityRole="button"
          accessibilityState={{ disabled, expanded: open }}
          disabled={disabled}
          onPress={toggle}
          slots={{ root: triggerSlotRoot }}
          testID={testID ? `${testID}-trigger` : undefined}>
          <Text
            numberOfLines={2}
            style={[styles.triggerText, slots.triggerText]}>
            {selectedLabel}
          </Text>
          <Text
            style={[
              styles.triggerCaret,
              open ? styles.triggerCaretOpen : null,
            ]}>
            {'\u25BE'}
          </Text>
        </Pressable>
      </View>

      <RNModal
        animationType={mode === 'anchored' ? 'none' : 'fade'}
        presentationStyle={
          Platform.OS === 'ios' ? 'overFullScreen' : undefined
        }
        transparent
        visible={open}
        onRequestClose={close}
        accessibilityViewIsModal={mode === 'modal'}>
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          <Pressable
            accessibilityLabel="Dismiss menu"
            accessibilityRole="button"
            onPress={close}
            slots={{
              root: [
                StyleSheet.absoluteFillObject,
                mode === 'anchored'
                  ? styles.anchoredBackdrop
                  : styles.overlay,
                ...(slots.backdrop ? [slots.backdrop] : []),
              ],
            }}
            testID={testID ? `${testID}-backdrop` : undefined}>
            <View />
          </Pressable>
          {anchoredMenu}
          {modalMenu}
        </View>
      </RNModal>
    </View>
  );
}
