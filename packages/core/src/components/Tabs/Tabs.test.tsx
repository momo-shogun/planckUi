import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '../../system/ThemeProvider';
import { TabPanel, Tabs } from './Tabs';

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

const tabs = [
  { key: 'a', label: 'One' },
  { key: 'b', label: 'Two' },
];

describe('Tabs', () => {
  it('renders without crashing', () => {
    const { getByTestId, getByText } = render(
      <Tabs tabs={tabs} defaultActiveKey="a" testID="tabs-root">
        <TabPanel tabKey="a">
          <Text>Panel A</Text>
        </TabPanel>
        <TabPanel tabKey="b">
          <Text>Panel B</Text>
        </TabPanel>
      </Tabs>,
      { wrapper: ThemeWrapper }
    );
    expect(getByTestId('tabs-root')).toBeTruthy();
    expect(getByText('Panel A')).toBeTruthy();
  });

  it('switches panel on tab press', () => {
    const { getByText, queryByText } = render(
      <Tabs tabs={tabs} defaultActiveKey="a" testID="tabs-root">
        <TabPanel tabKey="a">
          <Text>Panel A</Text>
        </TabPanel>
        <TabPanel tabKey="b">
          <Text>Panel B</Text>
        </TabPanel>
      </Tabs>,
      { wrapper: ThemeWrapper }
    );
    expect(getByText('Panel A')).toBeTruthy();
    fireEvent.press(getByText('Two'));
    expect(queryByText('Panel A')).toBeNull();
    expect(getByText('Panel B')).toBeTruthy();
  });

  it('accepts slots override on root', () => {
    const { getByTestId } = render(
      <Tabs
        tabs={tabs}
        defaultActiveKey="a"
        testID="tabs-root"
        slots={{ root: { opacity: 0.5 } }}>
        <TabPanel tabKey="a">
          <Text>A</Text>
        </TabPanel>
      </Tabs>,
      { wrapper: ThemeWrapper }
    );
    const style = getByTestId('tabs-root').props.style;
    expect(StyleSheet.flatten(style).opacity).toBe(0.5);
  });
});
