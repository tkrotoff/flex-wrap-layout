// @ts-check

module.exports = {
  browser: 'chromium',

  /*
  browsers: [
    'chromium',

    // [[BUG] Cannot open file:// URLs with Firefox](https://github.com/microsoft/playwright/issues/822)
    'firefox',

    // Does not work under Ubuntu 19.04 and Playwright 0.11.1
    'webkit'
  ],
  */

  launchBrowserApp: {
    headless: true,

    args: [
      // https://github.com/mmarkelov/jest-playwright/issues/42
      '--no-sandbox',

      // https://github.com/puppeteer/puppeteer/issues/2410
      '--font-render-hinting=none'
    ]
  }
};
