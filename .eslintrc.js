module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.ts', '.tsx'] }],
    'import/extensions': 0,
    'default-param-last': 0,
    'no-restricted-exports': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    radix: 0,
    'import/no-unresolved': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
