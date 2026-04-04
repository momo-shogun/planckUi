import React from 'react';
import { View } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '../../system/ThemeProvider';
import { MultiSelect } from './MultiSelect';

const items = [
  { id: 'a', label: 'Alpha' },
  { id: 'b', label: 'Beta' },
];

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('MultiSelect', () => {
  beforeEach(() => {
    jest.spyOn(View.prototype, 'measureInWindow').mockImplementation((cb) => {
      cb(24, 120, 280, 48);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('toggles selection without closing', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <MultiSelect testID="ms" items={items} onChange={onChange} />,
      { wrapper }
    );
    fireEvent.press(getByTestId('ms-trigger'));
    fireEvent.press(getByTestId('ms-item-a'));
    expect(onChange).toHaveBeenCalledWith(['a']);
    fireEvent.press(getByTestId('ms-item-b'));
    expect(onChange).toHaveBeenLastCalledWith(['a', 'b']);
    expect(getByTestId('ms-item-a')).toBeTruthy();
  });

  it('respects maxSelections', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <MultiSelect
        testID="ms"
        items={items}
        maxSelections={1}
        onChange={onChange}
      />,
      { wrapper }
    );
    fireEvent.press(getByTestId('ms-trigger'));
    fireEvent.press(getByTestId('ms-item-a'));
    expect(onChange).toHaveBeenLastCalledWith(['a']);
    fireEvent.press(getByTestId('ms-item-b'));
    expect(onChange).toHaveBeenLastCalledWith(['a']);
  });
});
