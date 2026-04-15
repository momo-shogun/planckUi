import React from 'react';
import { Text } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import { ZeptoTabs } from './ZeptoTabs';

const tabs = [
  { id: 'a', label: 'One' },
  { id: 'b', label: 'Two' },
];

const colors = ['#EDE7FF', '#E7F4FF'];

describe('ZeptoTabs', () => {
  it('renders tabs', () => {
    const { getByTestId, getByText } = render(
      <ZeptoTabs
        tabs={tabs}
        tabBackgroundColors={colors}
        defaultActiveIndex={0}
        testID="zepto-tabs"
      />
    );
    expect(getByTestId('zepto-tabs')).toBeTruthy();
    expect(getByText('One')).toBeTruthy();
    expect(getByText('Two')).toBeTruthy();
  });

  it('calls onChange when a tab is pressed', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <ZeptoTabs
        tabs={tabs}
        tabBackgroundColors={colors}
        defaultActiveIndex={0}
        onChange={onChange}
      />
    );
    fireEvent.press(getByText('Two'));
    expect(onChange).toHaveBeenCalledWith(1, tabs[1]);
  });

  it('renders optional icons', () => {
    const { getByText } = render(
      <ZeptoTabs
        tabs={[
          { id: 'x', label: 'Home', icon: <Text>ico</Text> },
          { id: 'y', label: 'Away' },
        ]}
        tabBackgroundColors={{ x: '#EEE', y: '#DDD' }}
        defaultActiveIndex={0}
      />
    );
    expect(getByText('ico')).toBeTruthy();
    expect(getByText('Home')).toBeTruthy();
  });
});
