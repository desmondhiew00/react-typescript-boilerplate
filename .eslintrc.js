const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  extends: ['airbnb-typescript', 'prettier', 'prettier/react', 'prettier/@typescript-eslint'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: { jsx: true },
    project: './tsconfig.json'
  },
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'react/jsx-key': 'error',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'react/prop-types': 'off',
    'import/named': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off'
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: {
        'prettier/prettier': ['warn', prettierOptions]
      }
    }
  ]
};
