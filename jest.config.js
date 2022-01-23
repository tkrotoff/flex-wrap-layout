// @ts-check

/* eslint-disable @typescript-eslint/no-var-requires */

const { defaults } = require('jest-config');

/** @type import('@jest/types').Config.InitialOptions */
const config = {
  testEnvironment: 'jsdom',

  preset: 'ts-jest',

  // https://github.com/kulshekhar/ts-jest/blob/v25.2.0/docs/user/config/isolatedModules.md
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  },

  setupFilesAfterEnv: ['./jest.setup.ts'],
  coveragePathIgnorePatterns: [...defaults.coveragePathIgnorePatterns, './jest.setup.ts'],

  // By default Jest allows for __tests__/*.js, *.spec.js and *.test.js
  // https://jestjs.io/docs/en/configuration#testregex-string-array-string
  // Let's be strict and use *.test.js only
  testRegex: '\\.test\\.tsx?$'
};

module.exports = config;
