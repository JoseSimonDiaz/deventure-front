import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const FEATURES = [
  'home',
  'auth',
  'intro',
  'zones',
  'level',
  'progress',
  'gallery',
  'ending',
  'account',
  'admin',
];
const RELATIVE_PARENT_IMPORT = {
  group: ['../*'],
  message: 'Usá el alias @/ en vez de rutas relativas hacia arriba.',
};

const featureBoundary = (featureName) => ({
  files: [`src/features/${featureName}/**/*.{ts,tsx}`],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          RELATIVE_PARENT_IMPORT,
          {
            regex: `^@/features/(?!${featureName}/)`,
            message: 'Una feature no importa de otra: mové lo compartido a src/shared.',
          },
        ],
      },
    ],
  },
});

export default tseslint.config(
  { ignores: ['dist', 'reference', 'coverage', '.superpowers'] },
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      jsxA11y.flatConfigs.recommended,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-console': 'error',
      'no-empty': 'error',
      'no-nested-ternary': 'error',
      'id-length': ['error', { min: 2, properties: 'never', exceptions: ['_'] }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      'no-restricted-imports': ['error', { patterns: [RELATIVE_PARENT_IMPORT] }],
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'JSXAttribute > JSXExpressionContainer > :matches(ArrowFunctionExpression, FunctionExpression)',
          message:
            'Sin funciones inline en el JSX: declarar el handler en el cuerpo del componente.',
        },
        {
          selector: "BinaryExpression[operator=/^[!=]==?$/] > Literal[raw='null']",
          message: 'No comparar contra null: usar truthiness, ?? u Object.hasOwn.',
        },
        {
          selector: "BinaryExpression[operator=/^[!=]==?$/] > Identifier[name='undefined']",
          message: 'No comparar contra undefined: usar truthiness, ?? u Object.hasOwn.',
        },
      ],
    },
  },
  ...FEATURES.map(featureBoundary),
  {
    files: ['src/shared/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            RELATIVE_PARENT_IMPORT,
            { group: ['@/features/*'], message: 'shared no conoce ninguna feature.' },
          ],
        },
      ],
    },
  },
  {
    files: ['*.{js,ts}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: { globals: globals.node },
  },
);
