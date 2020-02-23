// @ts-check

/** @type import('@jest/types').Config.InitialOptions */
const config = {
  preset: 'jest-playwright-preset',

  setupFiles: ['./jest-e2e.setup.ts'],

  testRegex: '\\.test\\.e2e\\.ts$'
};

module.exports = config;
