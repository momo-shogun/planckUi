import React, {useMemo, useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, useWindowDimensions, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  defaultTheme,
  midnightTheme,
  oceanTheme,
  roseTheme,
} from '@my-ui-lib/tokens';
import {
  Avatar,
  Badge,
  BottomSheet,
  BottomSheetProvider,
  Button,
  Checkbox,
  Dropdown,
  DropdownMenu,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  MultiSelect,
  PortalProvider,
  Switch,
  TabBar,
  TabPanel,
  Tabs,
  Text,
  ThemeProvider,
  ToastProvider,
  VStack,
  useTheme,
  useToast,
} from '@my-ui-lib/core';
import {createRootDrawerScreenOptions} from './src/navigation/createRootDrawerScreenOptions';
import type {RootDrawerParamList} from './src/navigation/drawerConstants';
import {PlanckDrawerContent} from './src/navigation/PlanckDrawerContent';

type ThemeName = 'default' | 'ocean' | 'midnight' | 'rose';

const themeMap = {
  default: defaultTheme,
  ocean: oceanTheme,
  midnight: midnightTheme,
  rose: roseTheme,
} as const;

const dropdownItems = [
  {id: 'one', label: 'First option'},
  {id: 'two', label: 'Second option'},
  {id: 'three', label: 'Third option'},
];

function ThemeSwitcher({
  active,
  onSelect,
}: {
  active: ThemeName;
  onSelect: (name: ThemeName) => void;
}) {
  const theme = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: theme.spacing[2],
          marginBottom: theme.spacing[4],
        },
      }),
    [theme],
  );

  const keys = Object.keys(themeMap) as ThemeName[];

  return (
    <View style={styles.row}>
      {keys.map(key => (
        <Button
          key={key}
          size="sm"
          variant={active === key ? 'primary' : 'outline'}
          onPress={() => onSelect(key)}>
          {key}
        </Button>
      ))}
    </View>
  );
}

function ShowcaseScreen({
  themeName,
  onTheme,
}: {
  themeName: ThemeName;
  onTheme: (n: ThemeName) => void;
}) {
  const theme = useTheme();
  const [checked, setChecked] = useState(false);
  const [sw, setSw] = useState(false);
  const [multi, setMulti] = useState<string[]>([]);
  const styles = useMemo(
    () =>
      StyleSheet.create({
        scroll: {
          flexGrow: 1,
          backgroundColor: theme.colors.background,
          padding: theme.spacing[4],
        },
        block: {marginBottom: theme.spacing[4]},
      }),
    [theme],
  );

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <VStack gap={theme.spacing[3]}>
        <Text variant="heading">Showcase</Text>
        <ThemeSwitcher active={themeName} onSelect={onTheme} />
        <View style={styles.block}>
          <Text variant="label">Badge</Text>
          <View style={{flexDirection: 'row', gap: 8, flexWrap: 'wrap'}}>
            <Badge label="Default" />
            <Badge label="OK" intent="success" />
            <Badge dot intent="error" />
          </View>
        </View>
        <View style={styles.block}>
          <Text variant="label">Avatar</Text>
          <View style={{flexDirection: 'row', gap: 12}}>
            <Avatar fallback="Ada Lovelace" size="md" />
            <Avatar fallback="X" size="sm" badge="online" />
          </View>
        </View>
        <Checkbox
          checked={checked}
          onChange={setChecked}
          label="Checkbox"
        />
        <Switch checked={sw} onChange={setSw} label="Switch" />
        <Input label="Input" placeholder="Themed field" />
        <Dropdown
          items={dropdownItems}
          placeholder="Dropdown"
          testID="showcase-dd"
        />
        <DropdownMenu items={dropdownItems} placeholder="DropdownMenu" />
        <MultiSelect
          items={dropdownItems}
          value={multi}
          onValueChange={setMulti}
          placeholder="MultiSelect"
        />
      </VStack>
    </ScrollView>
  );
}

function ModalLabScreen() {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  return (
    <ScrollView
      contentContainerStyle={{
        padding: theme.spacing[4],
        backgroundColor: theme.colors.background,
      }}>
      <Text variant="heading" style={{marginBottom: theme.spacing[3]}}>
        Modal (portal)
      </Text>
      <Button onPress={() => setVisible(true)}>Open modal</Button>
      <Modal visible={visible} onClose={() => setVisible(false)} size="md">
        <ModalHeader>Example</ModalHeader>
        <ModalBody>
          <Text variant="body" color={theme.colors.textSecondary}>
            Uses visible, onClose, and optional header slots.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onPress={() => setVisible(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </ScrollView>
  );
}

function SheetLabScreen() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <ScrollView
      contentContainerStyle={{
        padding: theme.spacing[4],
        backgroundColor: theme.colors.background,
      }}>
      <Text variant="heading" style={{marginBottom: theme.spacing[3]}}>
        Bottom sheet
      </Text>
      <Button onPress={() => setOpen(true)}>Open sheet</Button>
      <BottomSheet
        visible={open}
        onClose={() => setOpen(false)}
        title="Sheet title"
        snapPoints={['40%', '70%']}>
        <Text color={theme.colors.textSecondary}>
          Host apps need Reanimated + Gesture Handler (see docs).
        </Text>
      </BottomSheet>
    </ScrollView>
  );
}

function ToastLabScreen() {
  const theme = useTheme();
  const {showToast} = useToast();
  return (
    <ScrollView
      contentContainerStyle={{
        padding: theme.spacing[4],
        backgroundColor: theme.colors.background,
        gap: theme.spacing[2],
      }}>
      <Text variant="heading" style={{marginBottom: theme.spacing[3]}}>
        Toasts (max 3)
      </Text>
      <Button
        onPress={() =>
          showToast({title: 'Saved', description: 'Default intent', intent: 'default'})
        }>
        Default
      </Button>
      <Button
        onPress={() =>
          showToast({title: 'Done', description: 'Success', intent: 'success'})
        }>
        Success
      </Button>
      <Button
        onPress={() =>
          showToast({title: 'Heads up', description: 'Warning', intent: 'warning'})
        }>
        Warning
      </Button>
      <Button
        onPress={() =>
          showToast({title: 'Error', description: 'Something failed', intent: 'error'})
        }>
        Error
      </Button>
    </ScrollView>
  );
}

function TabsLabScreen() {
  const theme = useTheme();
  const [barKey, setBarKey] = useState('home');
  return (
    <ScrollView
      contentContainerStyle={{
        padding: theme.spacing[4],
        backgroundColor: theme.colors.background,
        paddingBottom: theme.spacing[12],
      }}>
      <Text variant="heading" style={{marginBottom: theme.spacing[3]}}>
        Tabs
      </Text>
      <Tabs
        tabs={[
          {key: 'a', label: 'Alpha'},
          {key: 'b', label: 'Beta', badge: 3},
        ]}
        defaultActiveKey="a"
        variant="pill">
        <TabPanel tabKey="a">
          <Text>Panel A</Text>
        </TabPanel>
        <TabPanel tabKey="b">
          <Text>Panel B</Text>
        </TabPanel>
      </Tabs>
      <Text variant="label" style={{marginTop: theme.spacing[4]}}>
        TabBar (floating)
      </Text>
      <TabBar
        variant="floating"
        items={[
          {
            key: 'home',
            label: 'Home',
            icon: (isActive: boolean) => (
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  backgroundColor: isActive
                    ? theme.colors.primary
                    : theme.colors.border,
                }}
              />
            ),
          },
          {
            key: 'star',
            label: 'Star',
            icon: (isActive: boolean) => (
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 4,
                  backgroundColor: isActive
                    ? theme.colors.primary
                    : theme.colors.border,
                }}
              />
            ),
          },
        ]}
        activeKey={barKey}
        onChange={setBarKey}
      />
      <Text variant="caption" color={theme.colors.textSecondary} style={{marginTop: 8}}>
        Active tab: {barKey}
      </Text>
    </ScrollView>
  );
}

const Drawer = createDrawerNavigator<RootDrawerParamList>();

function RootDrawer({
  themeName,
  onTheme,
}: {
  themeName: ThemeName;
  onTheme: (n: ThemeName) => void;
}) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const {width: windowWidth} = useWindowDimensions();
  const statusBarStyle =
    themeName === 'midnight' ? 'light-content' : 'dark-content';
  const drawerWidth = Math.min(320, Math.round(windowWidth * 0.86));

  const drawerScreenOptions = useMemo(
    () =>
      createRootDrawerScreenOptions({
        theme,
        insets,
        drawerWidth,
      }),
    [drawerWidth, insets, theme],
  );

  return (
    <>
      <StatusBar barStyle={statusBarStyle} />
      <Drawer.Navigator
        screenOptions={drawerScreenOptions}
        drawerContent={PlanckDrawerContent}>
        <Drawer.Screen name="Showcase">
          {() => <ShowcaseScreen themeName={themeName} onTheme={onTheme} />}
        </Drawer.Screen>
        <Drawer.Screen name="ModalLab" component={ModalLabScreen} />
        <Drawer.Screen name="SheetLab" component={SheetLabScreen} />
        <Drawer.Screen name="ToastLab" component={ToastLabScreen} />
        <Drawer.Screen name="TabsLab" component={TabsLabScreen} />
      </Drawer.Navigator>
    </>
  );
}

function ThemedAppTree() {
  const [themeName, setThemeName] = useState<ThemeName>('default');

  return (
    <ThemeProvider theme={themeMap[themeName]}>
      <ToastProvider>
        <NavigationContainer>
          <RootDrawer themeName={themeName} onTheme={setThemeName} />
        </NavigationContainer>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <BottomSheetProvider>
          <PortalProvider>
            <ThemedAppTree />
          </PortalProvider>
        </BottomSheetProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
