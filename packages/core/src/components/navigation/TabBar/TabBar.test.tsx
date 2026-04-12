import React from 'react';
import { Text } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../system/ThemeProvider';
import { TabBar } from './TabBar';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

const items = [
  {
    key: 'a',
    label: 'A',
    icon: () => <Text>i</Text>,
  },
  {
    key: 'b',
    label: 'B',
    icon: () => <Text>i</Text>,
  },
];

describe('TabBar', () => {
  it('calls onChange', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <TabBar items={items} activeKey="a" onChange={onChange} testID="tabbar" />,
      { wrapper }
    );
    fireEvent.press(getByText('B'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('renders unstyled', () => {
    const { getByTestId } = render(
      <TabBar
        items={items}
        activeKey="a"
        onChange={jest.fn()}
        unstyled
        testID="tabbar"
      />,
      { wrapper }
    );
    expect(getByTestId('tabbar')).toBeTruthy();
  });

  it('plankBarV1 calls onChange', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <TabBar
        variant="plankBarV1"
        items={items}
        activeKey="a"
        onChange={onChange}
        testID="plank"
      />,
      { wrapper }
    );
    fireEvent.press(getByTestId('plank-b'));
    expect(onChange).toHaveBeenCalledWith('b');
  });
});
