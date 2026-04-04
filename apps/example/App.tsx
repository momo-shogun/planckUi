import React, {useMemo, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  defaultTheme,
  midnightTheme,
  oceanTheme,
  roseTheme,
} from '@my-ui-lib/tokens';
import {
  Button,
  DropdownMenu,
  Input,
  Modal,
  Text,
  ThemeProvider,
  VStack,
  useTheme,
} from '@my-ui-lib/core';

type ThemeName = 'default' | 'ocean' | 'midnight' | 'rose';

const themeMap = {
  default: defaultTheme,
  ocean: oceanTheme,
  midnight: midnightTheme,
  rose: roseTheme,
} as const;

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
          onPress={() => {
            onSelect(key);
          }}>
          {key}
        </Button>
      ))}
    </View>
  );
}

function ModalStory() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const styles = useMemo(
    () =>
      StyleSheet.create({
        section: {
          marginBottom: theme.spacing[4],
        },
      }),
    [theme],
  );

  return (
    <View style={styles.section}>
      <Text variant="label" style={{marginBottom: theme.spacing[2]}}>
        Modal
      </Text>
      <Button onPress={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        title="Themed dialog"
        onRequestClose={() => setOpen(false)}>
        <Text variant="body" color={theme.colors.textPrimary}>
          Overlay and surface use getModalTokens from the active theme.
        </Text>
        <Button onPress={() => setOpen(false)}>Close</Button>
      </Modal>
    </View>
  );
}

const dropdownItems = [
  {id: 'one', label: 'First option'},
  {id: 'two', label: 'Second option'},
  {id: 'three', label: 'Third (disabled)', disabled: true},
];

function DropdownMenuStory() {
  const theme = useTheme();
  const [value, setValue] = useState<string | undefined>();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        section: {
          marginBottom: theme.spacing[4],
        },
        row: {
          gap: theme.spacing[3],
        },
      }),
    [theme],
  );

  return (
    <View style={styles.section}>
      <Text variant="label" style={{marginBottom: theme.spacing[2]}}>
        Dropdown menu
      </Text>
      <VStack gap={theme.spacing[3]} style={styles.row}>
        <Text variant="caption" color={theme.colors.textSecondary}>
          Anchored to trigger (default). Selected: {value ?? 'none'}
        </Text>
        <DropdownMenu
          items={dropdownItems}
          value={value}
          onValueChange={setValue}
          placeholder="Choose an option"
          search
          searchPlaceholder="Filter…"
          testID="example-dropdown-anchored"
        />
        <Text variant="caption" color={theme.colors.textSecondary}>
          Modal presentation
        </Text>
        <DropdownMenu
          mode="modal"
          items={dropdownItems}
          placeholder="Modal dropdown"
          testID="example-dropdown-modal"
        />
      </VStack>
    </View>
  );
}

function ThemedDemo() {
  const theme = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        scroll: {
          flexGrow: 1,
          backgroundColor: theme.colors.background,
          padding: theme.spacing[4],
        },
        swatch: {
          width: theme.spacing[12],
          height: theme.spacing[12],
          borderRadius: theme.radii.lg,
          backgroundColor: theme.colors.primary,
          marginBottom: theme.spacing[4],
        },
        block: {
          marginBottom: theme.spacing[4],
        },
      }),
    [theme],
  );

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <VStack gap={theme.spacing[3]}>
        <View style={styles.swatch} accessibilityLabel="primary swatch" />
        <Text variant="heading" style={styles.block}>
          Themed surface
        </Text>
        <Text variant="body" color={theme.colors.textPrimary}>
          Background and swatch track the active theme.
        </Text>
        <View style={styles.block}>
          <Button onPress={() => {}}>Themed button</Button>
        </View>
        <ModalStory />
        <DropdownMenuStory />
        <Input label="Themed input" placeholder="Focus for border token" />
      </VStack>
    </ScrollView>
  );
}

function AppContent({
  themeName,
  onSelect,
}: {
  themeName: ThemeName;
  onSelect: (name: ThemeName) => void;
}) {
  const theme = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        safe: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        headerPad: {
          paddingHorizontal: theme.spacing[4],
          paddingTop: theme.spacing[2],
        },
      }),
    [theme],
  );
  const statusBarStyle =
    themeName === 'midnight' ? 'light-content' : 'dark-content';

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle={statusBarStyle} />
      <View style={styles.headerPad}>
        <ThemeSwitcher active={themeName} onSelect={onSelect} />
      </View>
      <ThemedDemo />
    </SafeAreaView>
  );
}

export default function App() {
  const [themeName, setThemeName] = useState<ThemeName>('default');

  return (
    <ThemeProvider theme={themeMap[themeName]}>
      <AppContent themeName={themeName} onSelect={setThemeName} />
    </ThemeProvider>
  );
}
