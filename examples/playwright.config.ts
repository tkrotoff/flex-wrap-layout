import { devices, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testMatch: /.*\.test\.e2e\.ts$/,

  use: {
    headless: true
  },

  projects: [
    {
      name: 'Desktop Chrome',
      use: devices['Desktop Chrome']
    }
  ]
};

export default config;
