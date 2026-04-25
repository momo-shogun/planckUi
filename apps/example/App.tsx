import React, {useMemo, useState} from 'react';
import {Pressable, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  defaultTheme,
  midnightTheme,
  oceanTheme,
  roseTheme,
} from '@my-ui-lib/tokens';
import {
  Button,
  Input,
  PortalProvider,
  Text,
  ThemeProvider,
  VStack,
  useTheme,
} from '@my-ui-lib/core';
import {
  BottomTabsLabDrawerHeaderLeft,
  bottomTabsLabDrawerTitle,
} from './src/navigation/bottomTabsLab/bottomTabsLabDrawerChrome';
import {BottomTabsLabNavigator} from './src/navigation/bottomTabsLab/BottomTabsLabNavigator';
import {InputLabScreen} from './src/screens/InputLabScreen';
import {TabsLabScreen} from './src/screens/TabsLabScreen';
import {HomeScreenLabNavigator} from './src/navigation/homeLab/HomeScreenLabNavigator';
import {HeaderLabNavigator} from './src/navigation/headerLab/HeaderLabNavigator';
import {ButtonLabNavigator} from './src/navigation/buttonLab/ButtonLabNavigator';
import {CardsLabNavigator} from './src/navigation/cardsLab/CardsLabNavigator';

type ThemeName = 'default' | 'ocean' | 'midnight' | 'rose';

const themeMap = {
  default: defaultTheme,
  ocean: oceanTheme,
  midnight: midnightTheme,
  rose: roseTheme,
} as const;

type RootStackParamList = {
  Home: undefined;
  ButtonLab: undefined;
  CardsLab: undefined;
  InputLab: undefined;
  HeaderLab: undefined;
  HomeScreenLab: undefined;
  TabsLab: undefined;
  BottomTabsLab: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type RootDrawerParamList = {
  Main: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const HOME_LINKS = [
  { key: 'ButtonLab', title: 'Button', subtitle: 'Variants, icon button, marquee' },
  { key: 'CardsLab', title: 'Cards (MPCard)', subtitle: 'Profile/match card' },
  { key: 'InputLab', title: 'Input', subtitle: 'Input + ComposerInput' },
  { key: 'HeaderLab', title: 'Header', subtitle: 'PlanckH1V1 + ZeptoHeaderV1' },
  { key: 'HomeScreenLab', title: 'Home screens', subtitle: 'ZeptoHS presets' },
  { key: 'TabsLab', title: 'Tabs', subtitle: 'Tabs + TabBar' },
  { key: 'BottomTabsLab', title: 'Bottom tabs lab', subtitle: 'PlankBar V1/V2 presets' },
] as const;

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
          onPress={() => onSelect(key)}
          backgroundGradientColors={
            active === key
              ? [theme.colors.textPrimary, theme.colors.textPrimary]
              : [theme.colors.surfaceRaised, theme.colors.surfaceRaised]
          }
          textColor={active === key ? theme.colors.primaryForeground : theme.colors.textPrimary}
          slots={{
            root:
              active === key
                ? {minHeight: 36, paddingHorizontal: theme.spacing[4]}
                : {
                    minHeight: 36,
                    paddingHorizontal: theme.spacing[4],
                    borderWidth: 1,
                    borderColor: theme.colors.border,
                    shadowOpacity: 0,
                    elevation: 0,
                  },
          }}>
          {key}
        </Button>
      ))}
    </View>
  );
}

function HomeScreen({
  themeName,
  onTheme,
  navigation,
}: {
  themeName: ThemeName;
  onTheme: (n: ThemeName) => void;
  navigation: any;
}) {
  const theme = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        scroll: {
          flexGrow: 1,
          backgroundColor: theme.colors.background,
          padding: theme.spacing[4],
        },
        block: {marginBottom: theme.spacing[4]},
        linkCard: {
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radii.lg,
          padding: theme.spacing[4],
        },
        linkTitle: {
          fontSize: theme.fontSizes.lg,
          fontWeight: theme.fontWeights.semibold as '600',
          color: theme.colors.textPrimary,
        },
        linkSubtitle: {
          marginTop: 2,
          fontSize: theme.fontSizes.sm,
          color: theme.colors.textSecondary,
        },
      }),
    [theme],
  );

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <VStack gap={theme.spacing[3]}>
        <Text variant="heading">Planck UI example</Text>
        <ThemeSwitcher active={themeName} onSelect={onTheme} />
        <Text variant="caption" color={theme.colors.textSecondary}>
          Only the components you kept are showcased here.
        </Text>

        {HOME_LINKS.map((l) => (
          <Pressable
            key={l.key}
            accessibilityRole="button"
            accessibilityLabel={`Open ${l.title}`}
            onPress={() => navigation.navigate(l.key)}
            style={({ pressed }) => [
              styles.linkCard,
              pressed && { opacity: 0.75, transform: [{ scale: 0.99 }] },
            ]}
          >
            <Text style={styles.linkTitle}>{l.title}</Text>
            <Text style={styles.linkSubtitle}>{l.subtitle}</Text>
          </Pressable>
        ))}
      </VStack>
    </ScrollView>
  );
}

function AppDrawerContent({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        scroll: {
          flexGrow: 1,
          backgroundColor: theme.colors.background,
          padding: theme.spacing[4],
        },
        linkCard: {
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radii.lg,
          padding: theme.spacing[4],
          marginBottom: theme.spacing[3],
        },
        linkTitle: {
          fontSize: theme.fontSizes.lg,
          fontWeight: theme.fontWeights.semibold as '600',
          color: theme.colors.textPrimary,
        },
        linkSubtitle: {
          marginTop: 2,
          fontSize: theme.fontSizes.sm,
          color: theme.colors.textSecondary,
        },
      }),
    [theme]
  );

  return (
    <DrawerContentScrollView
      contentContainerStyle={styles.scroll}
      alwaysBounceVertical={false}
    >
      <Text variant="heading" style={{ marginBottom: theme.spacing[3] }}>
        Components
      </Text>
      {HOME_LINKS.map((l) => (
        <Pressable
          key={l.key}
          accessibilityRole="button"
          accessibilityLabel={`Open ${l.title}`}
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('Main', { screen: l.key });
          }}
          style={({ pressed }) => [
            styles.linkCard,
            pressed && { opacity: 0.75, transform: [{ scale: 0.99 }] },
          ]}
        >
          <Text style={styles.linkTitle}>{l.title}</Text>
          <Text style={styles.linkSubtitle}>{l.subtitle}</Text>
        </Pressable>
      ))}
    </DrawerContentScrollView>
  );
}

function HeaderHamburger({ onPress, color }: { onPress: () => void; color: string }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Open menu"
      onPress={onPress}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text style={{ color, fontSize: 22, fontWeight: '800' }}>≡</Text>
    </Pressable>
  );
}

function HeaderClose({ onPress, color }: { onPress: () => void; color: string }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Close menu"
      onPress={onPress}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text style={{ color, fontSize: 22, fontWeight: '800' }}>×</Text>
    </Pressable>
  );
}

function RootStack({
  themeName,
  onTheme,
}: {
  themeName: ThemeName;
  onTheme: (n: ThemeName) => void;
}) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const statusBarStyle =
    themeName === 'midnight' ? 'light-content' : 'dark-content';

  return (
    <>
      <StatusBar barStyle={statusBarStyle} />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.background },
          headerTitleStyle: { color: theme.colors.textPrimary },
          headerTintColor: theme.colors.textPrimary,
          contentStyle: { backgroundColor: theme.colors.background },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Home"
          options={({ navigation }: any) => ({
            title: 'Planck UI',
            headerLeft: () => (
              <HeaderHamburger
                onPress={() => navigation.getParent()?.openDrawer()}
                color={theme.colors.textPrimary}
              />
            ),
          })}
        >
          {({ navigation }) => (
            <HomeScreen
              navigation={navigation}
              themeName={themeName}
              onTheme={onTheme}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="ButtonLab" component={ButtonLabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="CardsLab" component={CardsLabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="InputLab" component={InputLabScreen} options={{ title: 'Input' }} />
        <Stack.Screen name="HeaderLab" component={HeaderLabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreenLab" component={HomeScreenLabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="TabsLab" component={TabsLabScreen} options={{ title: 'Tabs' }} />
        <Stack.Screen
          name="BottomTabsLab"
          component={BottomTabsLabNavigator}
          options={({ route, navigation }: any) => ({
            title: bottomTabsLabDrawerTitle(route),
            headerLeft: () => (
              <BottomTabsLabDrawerHeaderLeft
                route={route}
                navigation={navigation}
                barColor={theme.colors.textPrimary}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </>
  );
}

function ThemedAppTree() {
  const [themeName, setThemeName] = useState<ThemeName>('default');

  return (
    <ThemeProvider theme={themeMap[themeName]}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            drawerType: 'front',
            drawerStyle: { backgroundColor: 'transparent' },
          }}
          drawerContent={(props) => <AppDrawerContent {...props} />}
        >
          <Drawer.Screen name="Main">
            {() => <RootStack themeName={themeName} onTheme={setThemeName} />}
          </Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <PortalProvider>
          <ThemedAppTree />
        </PortalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
