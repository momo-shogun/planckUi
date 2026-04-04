import { Command } from 'commander';
import { addCommand } from './commands/add';
import { initCommand } from './commands/init';

const program = new Command();

program.name('my-ui-lib').description('my-ui-lib CLI').version('0.1.0');

program
  .command('add')
  .argument('<component>', 'component name')
  .option('--path [destination]', 'destination path')
  .action((component: string, opts: { path?: string }) => {
    addCommand(component, opts);
  });

program.command('init').action(() => {
  initCommand();
});

program.parse();
