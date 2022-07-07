/* eslint-disable jest/no-standalone-expect */

import { expect, test } from '@playwright/test';
import path from 'node:path';

test('resize', async ({ page }) => {
  await page.goto(`file:${path.join(__dirname, 'build/Minimal.html')}`);

  const height = 768;

  const parent = page.locator('.wrap-children');

  const countries = parent.locator('> div');
  await expect(countries).toHaveCount(3);

  // 1
  await page.setViewportSize({ width: 1024, height });

  expect(await page.screenshot()).toMatchSnapshot('minimal-1.png');

  await expect(parent.locator('.next-is-wrapped')).toHaveCount(0);
  await expect(parent).toHaveClass(['wrap-children']);

  expect(await countries.nth(0).boundingBox()).toEqual({
    x: 13,
    y: 13,
    width: 44,
    height: 72
  });
  await expect(countries.nth(0)).toHaveClass(['']);

  expect(await countries.nth(1).boundingBox()).toEqual({
    x: 67,
    y: 13,
    width: 840.656_25,
    height: 72
  });
  await expect(countries.nth(1)).toHaveClass(['']);

  expect(await countries.nth(2).boundingBox()).toEqual({
    x: 917.656_25,
    y: 13,
    width: 93.343_75,
    height: 72
  });
  await expect(countries.nth(2)).toHaveClass(['']);

  // 2
  await page.setViewportSize({ width: 274, height });

  expect(await page.screenshot()).toMatchSnapshot('minimal-2.png');

  await expect(parent.locator('.next-is-wrapped')).toHaveCount(1);
  await expect(parent).toHaveClass('wrap-children has-child-wrapped');

  expect(await countries.nth(0).boundingBox()).toEqual({
    x: 13,
    y: 13,
    width: 44,
    height: 72
  });
  await expect(countries.nth(0)).toHaveClass(['']);

  expect(await countries.nth(1).boundingBox()).toEqual({
    x: 67,
    y: 13,
    width: 194,
    height: 72
  });
  await expect(countries.nth(1)).toHaveClass(['next-is-wrapped']);

  expect(await countries.nth(2).boundingBox()).toEqual({ x: 13, y: 95, width: 248, height: 72 });
  await expect(countries.nth(2)).toHaveClass(['']);

  // 3
  await page.setViewportSize({ width: 171, height });

  expect(await page.screenshot()).toMatchSnapshot('minimal-3.png');

  await expect(parent.locator('.next-is-wrapped')).toHaveCount(2);
  await expect(parent).toHaveClass('wrap-children has-child-wrapped');

  expect(await countries.nth(0).boundingBox()).toEqual({ x: 13, y: 13, width: 145, height: 72 });
  await expect(countries.nth(0)).toHaveClass(['next-is-wrapped']);

  expect(await countries.nth(1).boundingBox()).toEqual({ x: 13, y: 95, width: 145, height: 72 });
  await expect(countries.nth(1)).toHaveClass(['next-is-wrapped']);

  expect(await countries.nth(2).boundingBox()).toEqual({ x: 13, y: 177, width: 145, height: 72 });
  await expect(countries.nth(2)).toHaveClass(['']);
});
