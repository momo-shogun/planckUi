import type { Rule } from 'eslint';

const HEX = /^#[0-9a-fA-F]{3,8}$/;

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow hardcoded hex colors in UI components',
    },
    schema: [],
    messages: {
      noHex:
        'Hardcoded color "{{value}}" not allowed in components. Use useTheme() with component-token helpers instead.',
    },
  },
  create(context) {
    const filename = context.getFilename().replace(/\\/g, '/');
    if (!filename.includes('/packages/core/src/components/')) {
      return {};
    }

    return {
      Literal(node: Rule.Node & { value?: unknown }) {
        if (typeof node.value === 'string' && HEX.test(node.value)) {
          context.report({
            node,
            messageId: 'noHex',
            data: { value: node.value },
          });
        }
      },
    };
  },
};

export default rule;
