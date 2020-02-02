// @ts-check

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    // /!\ Order matters

    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react'

    // Already done by Airbnb
    //'plugin:react/recommended'
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    es6: true,
    browser: true
  },

  rules: {
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'no-prototype-builtins': 'off',
    'no-plusplus': 'off',
    'spaced-comment': 'off',
    'lines-between-class-members': 'off',
    'no-useless-constructor': 'off',

    // See [no-return-assign should be configurable to ignore arrow-functions](https://github.com/eslint/eslint/issues/9471)
    'no-return-assign': 'off',

    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',

    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/label-has-associated-control': 'off',

    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/class-name-casing': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',

    'react/no-unescaped-entities': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/state-in-constructor': 'off',
    'react/prop-types': 'off',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error'
  }
};
