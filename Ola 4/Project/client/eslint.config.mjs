import { defineConfig } from 'eslint-define-config';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';

export default defineConfig([
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: './tsconfig.json', // Path to your tsconfig file
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
    },
    rules: {
      semi: ['warn', 'always'],
      'no-mixed-spaces-and-tabs': 'error',
      'brace-style': ['error', '1tbs'],
      'no-constant-condition': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }, ],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-var': 'error',
      'prefer-const': 'error',
    },
  },
]);
