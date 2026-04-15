import pc from 'picocolors';

const REGISTRY: Record<string, { deps: string[] }> = {
  avatar: { deps: ['@my-ui-lib/core'] },
  badge: { deps: ['@my-ui-lib/core'] },
  'back-button': { deps: ['@my-ui-lib/core'] },
  'bottom-sheet': { deps: ['@my-ui-lib/core', '@gorhom/bottom-sheet'] },
  button: { deps: ['@my-ui-lib/core'] },
  checkbox: { deps: ['@my-ui-lib/core'] },
  'drawer-content': { deps: ['@my-ui-lib/core'] },
  'dropdown-menu': { deps: ['@my-ui-lib/core'] },
  header: { deps: ['@my-ui-lib/core'] },
  input: { deps: ['@my-ui-lib/core'] },
  modal: { deps: ['@my-ui-lib/core', '@gorhom/portal'] },
  multiselect: { deps: ['@my-ui-lib/core'] },
  switch: { deps: ['@my-ui-lib/core'] },
  'tab-bar': { deps: ['@my-ui-lib/core'] },
  tabs: { deps: ['@my-ui-lib/core'] },
  'zepto-tabs': { deps: ['@my-ui-lib/core', 'react-native-reanimated'] },
  toast: { deps: ['@my-ui-lib/core', '@gorhom/portal'] },
};

export function addCommand(component: string, opts: { path?: string }): void {
  const key = component.toLowerCase();
  if (!REGISTRY[key]) {
    console.error(pc.red(`Unknown component: ${component}`));
    process.exitCode = 1;
    return;
  }
  console.log(pc.green(`copying ${component}...`));
  console.log(
    pc.dim(
      `registry deps: ${REGISTRY[key].deps.join(', ')}${opts.path ? ` → ${opts.path}` : ''}`
    )
  );
}
