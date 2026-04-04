import React from 'react';
import { StyleSheet, View } from 'react-native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from '../../system/ThemeProvider';
import { DropdownMenu } from './DropdownMenu';

const items = [
  { id: 'a', label: 'Alpha' },
  { id: 'b', label: 'Beta' },
];

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('DropdownMenu', () => {
  beforeEach(() => {
    jest.spyOn(View.prototype, 'measureInWindow').mockImplementation((cb) => {
      cb(24, 120, 280, 48);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders without crashing', () => {
    const { getByTestId } = render(
      <DropdownMenu testID="DropdownMenu-root" items={items} />,
      { wrapper }
    );
    expect(getByTestId('DropdownMenu-root')).toBeTruthy();
  });

  it('renders unstyled when unstyled=true', () => {
    const { getByTestId } = render(
      <DropdownMenu testID="DropdownMenu-root" items={items} unstyled />,
      { wrapper }
    );
    expect(getByTestId('DropdownMenu-root')).toBeTruthy();
  });

  it('merges slots.root onto the root view', () => {
    const { getByTestId } = render(
      <DropdownMenu
        testID="DropdownMenu-root"
        items={items}
        slots={{ root: { opacity: 0.99 } }}
      />,
      { wrapper }
    );
    const style = getByTestId('DropdownMenu-root').props.style;
    expect(StyleSheet.flatten(style).opacity).toBe(0.99);
  });

  it('opens the menu and selects an item', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(
      <DropdownMenu
        testID="dd"
        items={items}
        onValueChange={onValueChange}
      />,
      { wrapper }
    );
    fireEvent.press(getByTestId('dd-trigger'));
    fireEvent.press(getByTestId('dd-item-b'));
    expect(onValueChange).toHaveBeenCalledWith('b');
  });

  it('filters items when search is enabled', async () => {
    const { getByTestId, queryByTestId } = render(
      <DropdownMenu testID="dd" items={items} search />,
      { wrapper }
    );
    fireEvent.press(getByTestId('dd-trigger'));
    fireEvent.changeText(getByTestId('dd-search'), 'Bet');
    await waitFor(() => {
      expect(queryByTestId('dd-item-a')).toBeNull();
      expect(getByTestId('dd-item-b')).toBeTruthy();
    });
  });

  it('selects from modal mode', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(
      <DropdownMenu
        testID="dd"
        mode="modal"
        items={items}
        onValueChange={onValueChange}
      />,
      { wrapper }
    );
    fireEvent.press(getByTestId('dd-trigger'));
    fireEvent.press(getByTestId('dd-item-a'));
    expect(onValueChange).toHaveBeenCalledWith('a');
  });
});
