import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../system/ThemeProvider';
import { DrawerContent } from './DrawerContent';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

const items = [
  { key: 'a', label: 'Home' },
  { key: 'b', label: 'Settings' },
];

describe('DrawerContent', () => {
  it('renders and notifies on press', () => {
    const onItemPress = jest.fn();
    const { getByText } = render(
      <DrawerContent
        items={items}
        activeKey="a"
        onItemPress={onItemPress}
        testID="drawer"
      />,
      { wrapper }
    );
    expect(getByText('Home')).toBeTruthy();
    fireEvent.press(getByText('Settings'));
    expect(onItemPress).toHaveBeenCalledWith('b');
  });

  it('renders unstyled', () => {
    const { getByTestId } = render(
      <DrawerContent
        items={items}
        activeKey="a"
        onItemPress={jest.fn()}
        unstyled
        testID="drawer"
      />,
      { wrapper }
    );
    expect(getByTestId('drawer')).toBeTruthy();
  });
});
