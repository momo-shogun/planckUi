import pc from 'picocolors';

const REGISTRY: Record<string, { deps: string[] }> = {
  button: { deps: ['@my-ui-lib/core'] },
  'dropdown-menu': { deps: ['@my-ui-lib/core'] },
  multiselect: { deps: ['@my-ui-lib/core'] },
  input: { deps: ['@my-ui-lib/core'] },
  modal: { deps: ['@my-ui-lib/core'] },
  checkbox: { deps: ['@my-ui-lib/core'] },
  switch: { deps: ['@my-ui-lib/core'] },
  toast: { deps: ['@my-ui-lib/core'] },
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
