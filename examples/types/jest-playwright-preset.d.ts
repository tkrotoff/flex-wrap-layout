import { Page } from 'playwright';

// FIXME See https://github.com/mmarkelov/jest-playwright/issues/41

declare global {
  // eslint-disable-next-line no-redeclare
  const page: Page;
}
