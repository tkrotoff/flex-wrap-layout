/* eslint-disable jest/no-done-callback, playwright/missing-playwright-await */

import { expect, test } from '@playwright/test';
import path from 'node:path';

test('resize', async ({ page }) => {
  await page.goto(`file:${path.join(__dirname, 'build/Boxes.html')}`);

  const height = 768;

  const children = page.locator('.wrap-children, .box');
  await expect(children).toHaveCount(13);

  // 1
  await page.setViewportSize({ width: 968, height });

  expect(await page.screenshot()).toMatchSnapshot('boxes-1.png');

  await expect(children).toHaveClass([
    'wrap-children',
    'wrap-children',
    'box blue',
    'box grey flex-fill',
    'box blue',
    'wrap-children flex-fill',
    'box green',
    'box grey flex-fill',
    'box green',
    'wrap-children',
    'box yellow',
    'box grey flex-fill',
    'box yellow'
  ]);

  // 2
  await page.setViewportSize({ width: 967, height });

  expect(await page.screenshot()).toMatchSnapshot('boxes-2.png');

  await expect(children).toHaveClass([
    'wrap-children has-child-wrapped',
    'wrap-children',
    'box blue',
    'box grey flex-fill',
    'box blue',
    'wrap-children flex-fill next-is-wrapped',
    'box green',
    'box grey flex-fill',
    'box green',
    'wrap-children',
    'box yellow',
    'box grey flex-fill',
    'box yellow'
  ]);

  // 3
  await page.setViewportSize({ width: 650, height });

  expect(await page.screenshot()).toMatchSnapshot('boxes-3.png');

  await expect(children).toHaveClass([
    'wrap-children has-child-wrapped',
    'wrap-children next-is-wrapped',
    'box blue',
    'box grey flex-fill',
    'box blue',
    'wrap-children flex-fill next-is-wrapped',
    'box green',
    'box grey flex-fill',
    'box green',
    'wrap-children',
    'box yellow',
    'box grey flex-fill',
    'box yellow'
  ]);

  // 4
  await page.setViewportSize({ width: 333, height });

  expect(await page.screenshot()).toMatchSnapshot('boxes-4.png');

  await expect(children).toHaveClass([
    'wrap-children has-child-wrapped',
    'wrap-children next-is-wrapped',
    'box blue',
    'box grey flex-fill next-is-wrapped',
    'box blue',
    'wrap-children flex-fill next-is-wrapped',
    'box green',
    'box grey flex-fill next-is-wrapped',
    'box green',
    'wrap-children',
    'box yellow',
    'box grey flex-fill next-is-wrapped',
    'box yellow'
  ]);

  // 5
  await page.setViewportSize({ width: 227, height });

  expect(await page.screenshot()).toMatchSnapshot('boxes-5.png');

  await expect(children).toHaveClass([
    'wrap-children has-child-wrapped',
    'wrap-children next-is-wrapped',
    'box blue next-is-wrapped',
    'box grey flex-fill next-is-wrapped',
    'box blue',
    'wrap-children flex-fill next-is-wrapped',
    'box green next-is-wrapped',
    'box grey flex-fill next-is-wrapped',
    'box green',
    'wrap-children',
    'box yellow next-is-wrapped',
    'box grey flex-fill next-is-wrapped',
    'box yellow'
  ]);
});
