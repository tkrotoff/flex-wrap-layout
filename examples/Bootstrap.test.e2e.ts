/* eslint-disable jest/no-standalone-expect */

import { expect, test } from '@playwright/test';
import path from 'node:path';

test('resize', async ({ page }) => {
  await page.goto(`file:${path.join(__dirname, 'build/Bootstrap.html')}`);

  const height = 768;

  const firstBeatlesChildren = page
    .locator('.people > .person:first-child > .wrap-children')
    .first();
  await expect(firstBeatlesChildren).toHaveCount(1);
  const inputs = firstBeatlesChildren.locator('> div');
  await expect(inputs).toHaveCount(5);

  // 1
  await page.setViewportSize({ width: 1068, height });

  //expect(await page.screenshot()).toMatchSnapshot('bootstrap-1.png');

  await expect(inputs).toHaveClass([
    'floating-label mb-3 me-2 flex-fill',
    'floating-label mb-3 me-2 flex-fill',
    'floating-label mb-3 me-2',
    'floating-label mb-3 me-2',
    'floating-label mb-3 me-2'
  ]);

  // 2
  await page.setViewportSize({ width: 1067, height });

  //expect(await page.screenshot()).toMatchSnapshot('bootstrap-2.png');

  await expect(inputs).toHaveClass([
    'floating-label mb-3 me-2 flex-fill',
    'floating-label mb-3 me-2 flex-fill',
    'floating-label mb-3 me-2',
    'floating-label mb-3 me-2 next-is-wrapped',
    'floating-label mb-3 me-2'
  ]);

  // 3
  await page.setViewportSize({ width: 761, height });

  //expect(await page.screenshot()).toMatchSnapshot('bootstrap-3.png');

  await expect(inputs).toHaveClass([
    'floating-label mb-3 me-2 flex-fill',
    'floating-label mb-3 me-2 flex-fill',
    'floating-label mb-3 me-2 next-is-wrapped',
    'floating-label mb-3 me-2',
    'floating-label mb-3 me-2'
  ]);

  // 4
  await page.setViewportSize({ width: 559, height });

  //expect(await page.screenshot()).toMatchSnapshot('bootstrap-4.png');

  await expect(inputs).toHaveClass([
    'floating-label mb-3 me-2 flex-fill',
    'floating-label mb-3 me-2 flex-fill next-is-wrapped',
    'floating-label mb-3 me-2',
    'floating-label mb-3 me-2 next-is-wrapped',
    'floating-label mb-3 me-2'
  ]);

  // 5
  await page.setViewportSize({ width: 433, height });

  //expect(await page.screenshot()).toMatchSnapshot('bootstrap-5.png');

  await expect(inputs).toHaveClass([
    'floating-label mb-3 me-2 flex-fill next-is-wrapped',
    'floating-label mb-3 me-2 flex-fill',
    'floating-label mb-3 me-2 next-is-wrapped',
    'floating-label mb-3 me-2 next-is-wrapped',
    'floating-label mb-3 me-2'
  ]);

  // 6
  await page.setViewportSize({ width: 350, height });

  //expect(await page.screenshot()).toMatchSnapshot('bootstrap-6.png');

  await expect(inputs).toHaveClass([
    'floating-label mb-3 me-2 flex-fill next-is-wrapped',
    'floating-label mb-3 me-2 flex-fill next-is-wrapped',
    'floating-label mb-3 me-2 next-is-wrapped',
    'floating-label mb-3 me-2 next-is-wrapped',
    'floating-label mb-3 me-2'
  ]);

  // 7
  await page.setViewportSize({ width: 343, height });

  //expect(await page.screenshot()).toMatchSnapshot('bootstrap-7.png');

  await expect(inputs).toHaveClass([
    'floating-label mb-3 me-2 flex-fill next-is-wrapped',
    'floating-label mb-3 me-2 flex-fill next-is-wrapped',
    'floating-label mb-3 me-2 next-is-wrapped',
    'floating-label mb-3 me-2 next-is-wrapped',
    'floating-label mb-3 me-2'
  ]);
});
