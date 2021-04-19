// @ts-check

module.exports = {
  '*.{js,ts,tsx}': 'eslint --cache',

  // FIXME https://github.com/microsoft/TypeScript/issues/27379
  '*.{ts,tsx}': () => 'tsc',

  '*.scss': 'stylelint --cache'
};
