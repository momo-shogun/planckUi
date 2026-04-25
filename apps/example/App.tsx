import React, {useEffect, useMemo, useRef, useState} from 'react';
import type {DrawerContentComponentProps} from '@react-navigation/drawer';
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
  {
    key: 'ButtonLab',
    title: 'Button',
    drawerTitle: 'Button',
    subtitle: 'Variants, icon button, marquee',
    icon: 'gesture-tap-button',
  },
  {
    key: 'CardsLab',
    title: 'Cards (MPCard)',
    drawerTitle: 'Cards',
    subtitle: 'Profile/match card',
    icon: 'card-text-outline',
  },
  {
    key: 'InputLab',
    title: 'Input',
    drawerTitle: 'Input',
    subtitle: 'Input + ComposerInput',
    icon: 'form-textbox',
  },
  {
    key: 'HeaderLab',
    title: 'Header',
    drawerTitle: 'Header',
    subtitle: 'PlanckH1V1 + ZeptoHeaderV1',
    icon: 'page-layout-header',
  },
  {
    key: 'HomeScreenLab',
    title: 'Home screens',
    drawerTitle: 'Home',
    subtitle: 'ZeptoHS presets',
    icon: 'storefront-outline',
  },
  {
    key: 'TabsLab',
    title: 'Tabs',
    drawerTitle: 'Tabs',
    subtitle: 'Tabs + TabBar',
    icon: 'tab',
  },
  {
    key: 'BottomTabsLab',
    title: 'Bottom tabs lab',
    drawerTitle: 'Dock',
    subtitle: 'PlankBar V1/V2 presets',
    icon: 'dock-bottom',
  },
] as const;

const HOME_DRAWER_ITEM = {
  key: 'Home' as const,
  title: 'Home',
  drawerTitle: 'Home',
  subtitle: 'Overview & theme switcher',
  icon: 'home-variant-outline',
};

type HomeLinkKey = (typeof HOME_LINKS)[number]['key'];
type DrawerNavKey = HomeLinkKey | typeof HOME_DRAWER_ITEM.key;

const DRAWER_SECTIONS: Array<{
  title: string;
  items: readonly DrawerNavKey[];
}> = [
  { title: 'Explore', items: ['Home'] as const },
  { title: 'Components', items: ['ButtonLab', 'InputLab', 'CardsLab', 'HeaderLab'] as const },
  { title: 'Labs', items: ['HomeScreenLab', 'TabsLab', 'BottomTabsLab'] as const },
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
      }),
    [theme],
  );

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <VStack gap={theme.spacing[3]}>
        <Text variant="heading">Planck UI</Text>
        <Text variant="caption" color={theme.colors.textSecondary}>
          Theme: {themeName}. Use the palette icon in the header to switch.
        </Text>
      </VStack>
    </ScrollView>
  );
}

function ThemePickerDropdown({
  visible,
  active,
  onClose,
  onSelect,
}: {
  visible: boolean;
  active: ThemeName;
  onClose: () => void;
  onSelect: (t: ThemeName) => void;
}) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        overlay: {
          flex: 1,
          backgroundColor: 'rgba(2,6,23,0.22)',
        },
        card: {
          position: 'absolute',
          top: insets.top + 54,
          right: 12,
          width: 220,
          borderRadius: 16,
          backgroundColor: '#FFFFFF',
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: 'rgba(15,23,42,0.10)',
          overflow: 'hidden',
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.12,
              shadowRadius: 24,
            },
            default: { elevation: 6 },
          }),
        },
        head: {
          paddingHorizontal: 12,
          paddingVertical: 12,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: 'rgba(15,23,42,0.08)',
          flexDirection: 'row',
          alignItems: 'center',
        },
        headText: {
          marginLeft: 8,
          fontSize: 12,
          fontWeight: '800',
          letterSpacing: 1.1,
          color: 'rgba(17,24,39,0.65)',
          textTransform: 'uppercase',
        },
        row: {
          paddingHorizontal: 12,
          paddingVertical: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        rowPressed: { backgroundColor: 'rgba(37,99,235,0.07)' },
        label: {
          fontSize: 14,
          fontWeight: '700',
          color: '#0F172A',
        },
      }),
    [insets.top],
  );

  const keys = Object.keys(themeMap) as ThemeName[];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.card}>
          <View style={styles.head}>
            <MaterialCommunityIcons name="palette-outline" size={16} color="#0F172A" />
            <Text style={styles.headText}>Theme</Text>
          </View>
          {keys.map((k) => (
            <Pressable
              key={k}
              accessibilityRole="button"
              accessibilityLabel={`Select theme ${k}`}
              onPress={() => {
                onSelect(k);
                onClose();
              }}
              style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
            >
              <Text style={styles.label}>{k}</Text>
              {active === k ? (
                <MaterialCommunityIcons name="check" size={18} color={theme.colors.success} />
              ) : (
                <View style={{ width: 18, height: 18 }} />
              )}
            </Pressable>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}

const DRAWER_WIDTH = Math.min(
  Math.round(Dimensions.get('window').width * 0.82),
  304,
);

const PREMIUM_DRAWER = {
  /** Soft neutral canvas behind everything */
  canvas: '#F0F2F5',
  /** Card surface */
  surface: '#FFFFFF',
  /** Dark premium header */
  header: '#0B0B0B',
  headerText: '#FFFFFF',
  /** Controlled accent */
  accent: '#22C55E',
  /** Typography */
  title: '#111827',
  subtitle: 'rgba(17, 24, 39, 0.55)',
  /** Strokes */
  stroke: 'rgba(15, 23, 42, 0.08)',
  edge: 'rgba(0, 0, 0, 0.06)',
  /** States */
  activeTint: 'rgba(34, 197, 94, 0.12)',
  pressTint: 'rgba(37, 99, 235, 0.09)',
  /** Misc */
  chevron: 'rgba(0, 0, 0, 0.22)',
  scrim: 'rgba(8, 10, 16, 0.45)',
} as const;

/** Category-style icon tiles (minutes / aisle cues). */
const ECOMM_ROW_ICON_TINT: {bg: string; fg: string}[] = [
  {bg: '#E3F2FD', fg: '#1565C0'},
  {bg: '#E8F5E9', fg: '#2E7D32'},
  {bg: '#F3E5F5', fg: '#6A1B9A'},
  {bg: '#FFF3E0', fg: '#E65100'},
  {bg: '#E0F7FA', fg: '#00838F'},
  {bg: '#FFF8E1', fg: '#F57F17'},
  {bg: '#ECEFF1', fg: '#37474F'},
];

function getFocusedStackRouteName(props: DrawerContentComponentProps): string {
  const main = props.state.routes.find(r => r.name === 'Main') as any;
  const nested = main?.state;
  if (nested?.routes?.length && typeof nested.index === 'number') {
    return nested.routes[nested.index]?.name ?? 'Home';
  }
  return 'Home';
}

function resolveLinkByKey(key: DrawerNavKey) {
  if (key === 'Home') return HOME_DRAWER_ITEM;
  return HOME_LINKS.find(l => l.key === key)!;
}

function AppDrawerContent(props: DrawerContentComponentProps) {
  const { navigation } = props;
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const focusedRouteName = getFocusedStackRouteName(props);

  const itemsFlat = useMemo(() => {
    const out: Array<
      | { kind: 'section'; id: string; title: string }
      | { kind: 'item'; id: string; routeKey: DrawerNavKey }
    > = [];
    for (const section of DRAWER_SECTIONS) {
      out.push({ kind: 'section', id: `section-${section.title}`, title: section.title });
      for (const k of section.items) {
        out.push({ kind: 'item', id: `item-${k}`, routeKey: k as DrawerNavKey });
      }
    }
    return out;
  }, []);

  const entryAnims = useRef(itemsFlat.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const anims = entryAnims.map((v, i) =>
      Animated.timing(v, {
        toValue: 1,
        duration: 260,
        delay: 40 + i * 18,
        useNativeDriver: true,
      })
    );
    Animated.stagger(16, anims).start();
  }, [entryAnims]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        scrollContent: {
          flexGrow: 1,
          paddingBottom: insets.bottom + theme.spacing[3],
        },
        shell: {
          flex: 1,
          backgroundColor: PREMIUM_DRAWER.canvas,
          borderTopRightRadius: 24,
          borderBottomRightRadius: 24,
          overflow: 'hidden',
          borderRightWidth: StyleSheet.hairlineWidth,
          borderColor: PREMIUM_DRAWER.edge,
          ...Platform.select({
            ios: {
              shadowColor: '#0f172a',
              shadowOffset: {width: 6, height: 0},
              shadowOpacity: 0.07,
              shadowRadius: 18,
            },
            default: {elevation: 4},
          }),
        },
        header: {
          backgroundColor: PREMIUM_DRAWER.header,
          paddingTop: insets.top + theme.spacing[2],
          paddingBottom: theme.spacing[3],
          paddingHorizontal: theme.spacing[4],
          borderTopRightRadius: 24,
        },
        headerRow: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        avatar: {
          width: 44,
          height: 44,
          borderRadius: 16,
          backgroundColor: 'rgba(255,255,255,0.12)',
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: 'rgba(255,255,255,0.18)',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: theme.spacing[3],
        },
        headerTextCol: { flex: 1, minWidth: 0 },
        greeting: {
          fontSize: 13,
          fontWeight: '700',
          color: 'rgba(255,255,255,0.75)',
          marginBottom: 2,
          letterSpacing: 0.2,
        },
        brand: {
          fontSize: 20,
          fontWeight: '900',
          letterSpacing: -0.4,
          color: PREMIUM_DRAWER.headerText,
        },
        headerSub: {
          marginTop: theme.spacing[2],
          flexDirection: 'row',
          alignItems: 'center',
        },
        pill: {
          height: 28,
          paddingHorizontal: 10,
          borderRadius: 14,
          backgroundColor: 'rgba(34, 197, 94, 0.16)',
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: 'rgba(34, 197, 94, 0.25)',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        },
        pillText: {
          fontSize: 12,
          fontWeight: '700',
          color: '#D1FAE5',
          letterSpacing: 0.1,
        },
        fade: {
          height: 14,
          backgroundColor: PREMIUM_DRAWER.canvas,
        },
        list: {
          paddingHorizontal: theme.spacing[3],
          paddingTop: theme.spacing[3],
          paddingBottom: theme.spacing[4],
          gap: theme.spacing[2],
        },
        sectionLabel: {
          marginTop: theme.spacing[1],
          marginBottom: theme.spacing[1],
          paddingHorizontal: theme.spacing[1],
          fontSize: 11,
          fontWeight: '800',
          letterSpacing: 1.1,
          color: 'rgba(17, 24, 39, 0.55)',
          textTransform: 'uppercase',
        },
        tile: {
          borderRadius: 18,
          backgroundColor: PREMIUM_DRAWER.surface,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: PREMIUM_DRAWER.stroke,
          overflow: 'hidden',
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.06,
              shadowRadius: 14,
            },
            default: {elevation: 1},
          }),
        },
        tileActive: {
          borderColor: 'rgba(34, 197, 94, 0.22)',
        },
        tileInner: {
          flexDirection: 'row',
          alignItems: 'center',
          minHeight: 60,
          paddingHorizontal: theme.spacing[3],
          paddingVertical: theme.spacing[2],
        },
        activeBar: {
          position: 'absolute',
          left: 0,
          top: 10,
          bottom: 10,
          width: 4,
          borderRadius: 4,
          backgroundColor: PREMIUM_DRAWER.accent,
        },
        iconWrap: {
          width: 42,
          height: 42,
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: theme.spacing[3],
        },
        textCol: { flex: 1, minWidth: 0 },
        title: {
          fontSize: 15,
          fontWeight: '800',
          letterSpacing: -0.2,
          color: PREMIUM_DRAWER.title,
        },
        subtitle: {
          marginTop: 2,
          fontSize: 12,
          fontWeight: '600',
          color: PREMIUM_DRAWER.subtitle,
        },
        chevron: {
          marginLeft: theme.spacing[2],
        },
        pressed: {
          opacity: 0.96,
        },
      }),
    [insets.bottom, insets.top, theme],
  );

  return (
    <View style={[styles.shell, {width: DRAWER_WIDTH}]}>
      <DrawerContentScrollView
        contentContainerStyle={styles.scrollContent}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View style={styles.avatar}>
              <MaterialCommunityIcons name="account" size={22} color="rgba(255,255,255,0.9)" />
            </View>
            <View style={styles.headerTextCol}>
              <Text style={styles.greeting}>Hey</Text>
              <Text style={styles.brand}>Planck UI</Text>
            </View>
            <MaterialCommunityIcons name="cog-outline" size={20} color="rgba(255,255,255,0.75)" />
          </View>
          <View style={styles.headerSub}>
            <View style={styles.pill}>
              <MaterialCommunityIcons name="lightning-bolt" size={14} color="#86EFAC" />
              <Text style={styles.pillText}>Fast demos</Text>
            </View>
          </View>
        </View>
        <View style={styles.fade} />

        <View style={styles.list}>
          {itemsFlat.map((row, idx) => {
            const a = entryAnims[idx]!;
            if (row.kind === 'section') {
              return (
                <Animated.View
                  key={row.id}
                  style={{
                    opacity: a,
                    transform: [
                      {
                        translateY: a.interpolate({
                          inputRange: [0, 1],
                          outputRange: [6, 0],
                        }),
                      },
                    ],
                  }}
                >
                  <Text style={styles.sectionLabel}>{row.title}</Text>
                </Animated.View>
              );
            }

            const link = resolveLinkByKey(row.routeKey as DrawerNavKey);
            const isActive = focusedRouteName === row.routeKey;
            const tint = ECOMM_ROW_ICON_TINT[idx % ECOMM_ROW_ICON_TINT.length]!;

            return (
              <Animated.View
                key={row.id}
                style={{
                  opacity: a,
                  transform: [
                    {
                      translateY: a.interpolate({
                        inputRange: [0, 1],
                        outputRange: [10, 0],
                      }),
                    },
                  ],
                }}
              >
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Open ${link.title}`}
                  android_ripple={{ color: PREMIUM_DRAWER.pressTint }}
                  onPress={() => {
                    navigation.closeDrawer();
                    navigation.navigate('Main', { screen: row.routeKey });
                  }}
                  style={({ pressed }) => [
                    styles.tile,
                    isActive && styles.tileActive,
                    pressed && styles.pressed,
                    pressed && { transform: [{ scale: 0.985 }] },
                  ]}
                >
                  {isActive ? <View style={styles.activeBar} /> : null}
                  <View
                    style={[
                      styles.tileInner,
                      isActive && { backgroundColor: PREMIUM_DRAWER.activeTint },
                    ]}
                  >
                    <View style={[styles.iconWrap, { backgroundColor: tint.bg }]}>
                      <MaterialCommunityIcons name={link.icon} size={22} color={tint.fg} />
                    </View>
                    <View style={styles.textCol}>
                      <Text style={styles.title}>{link.drawerTitle}</Text>
                      <Text style={styles.subtitle}>{link.subtitle}</Text>
                    </View>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={22}
                      color={PREMIUM_DRAWER.chevron}
                      style={styles.chevron}
                    />
                  </View>
                </Pressable>
              </Animated.View>
            );
          })}
        </View>
      </DrawerContentScrollView>
    </View>
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
      <MaterialCommunityIcons name="menu" size={24} color={color} />
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
  const [themePickerOpen, setThemePickerOpen] = useState(false);
  const statusBarStyle =
    themeName === 'midnight' ? 'light-content' : 'dark-content';

  return (
    <>
      <StatusBar barStyle={statusBarStyle} />
      <ThemePickerDropdown
        visible={themePickerOpen}
        active={themeName}
        onClose={() => setThemePickerOpen(false)}
        onSelect={onTheme}
      />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.background },
          headerTitleStyle: { color: theme.colors.textPrimary },
          headerTintColor: theme.colors.textPrimary,
          contentStyle: { backgroundColor: theme.colors.background },
          headerShadowVisible: false,
          headerRight: () => (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Change theme"
              onPress={() => setThemePickerOpen(true)}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}
            >
              <MaterialCommunityIcons
                name="palette-outline"
                size={22}
                color={theme.colors.textPrimary}
              />
            </Pressable>
          ),
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
            drawerStyle: {
              width: DRAWER_WIDTH,
              backgroundColor: 'transparent',
            },
            overlayColor: PREMIUM_DRAWER.scrim,
            sceneContainerStyle: {backgroundColor: 'transparent'},
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
