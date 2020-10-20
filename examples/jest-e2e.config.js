// @ts-check

/** @type import('@jest/types').Config.InitialOptions */
const config = {
  preset: 'jest-playwright-preset',

  setupFilesAfterEnv: ['./jest-e2e.setup.ts'],

  testRegex: '\\.test\\.e2e\\.ts$',
  testEnvironment: '@testim/root-cause-jest/lib/RootCauseJestEnv',
  reporters: ['@testim/root-cause-jest/lib/reporter/default']
};

module.exports = config;
