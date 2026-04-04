import type { NodePlopAPI } from 'plop';

export default function (plop: NodePlopAPI) {
  plop.setGenerator('component', {
    description: 'Scaffold a new UI component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (PascalCase):',
        validate: (v) => /^[A-Z][a-zA-Z]+$/.test(v) || 'Must be PascalCase',
      },
      {
        type: 'list',
        name: 'hasVariants',
        message: 'Does this component have variants?',
        choices: ['yes', 'no'],
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/core/src/components/{{name}}/{{name}}.tsx',
        templateFile: 'plop-templates/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'packages/core/src/components/{{name}}/{{name}}.styles.ts',
        templateFile: 'plop-templates/Component.styles.ts.hbs',
      },
      {
        type: 'add',
        path: 'packages/core/src/components/{{name}}/{{name}}.types.ts',
        templateFile: 'plop-templates/Component.types.ts.hbs',
      },
      {
        type: 'add',
        path: 'packages/core/src/components/{{name}}/index.ts',
        templateFile: 'plop-templates/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'packages/core/src/components/{{name}}/{{name}}.test.tsx',
        templateFile: 'plop-templates/Component.test.tsx.hbs',
      },
      {
        type: 'append',
        path: 'packages/core/src/index.ts',
        template: "export * from './components/{{name}}';",
      },
    ],
  });
}
