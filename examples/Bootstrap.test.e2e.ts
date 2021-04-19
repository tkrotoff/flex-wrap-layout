import 'jest-playwright-preset';

import { join } from 'path';

const waitForResize = () => page.waitForTimeout(100);

test('resize', async () => {
  await page.goto(`file:${join(__dirname, 'build/Bootstrap.html')}`);

  const height = 768;

  const firstPersonChildren = await page.$('.people > .person:first-child > .wrap-children');
  const children = await firstPersonChildren?.$$(':scope > div')!;
  expect(children.length).toEqual(5);

  {
    await page.setViewportSize({ width: /*1119*/ 1101, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 mr-2 flex-fill',
      'floating-label mb-3 mr-2 flex-fill',
      'floating-label mb-3 mr-2',
      'floating-label mb-3 mr-2',
      'floating-label mb-3 mr-2'
    ]);

    expect(await page.screenshot()).toMatchImageSnapshot();
  }

  {
    await page.setViewportSize({ width: /*1118*/ 1100, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 mr-2 flex-fill',
      'floating-label mb-3 mr-2 flex-fill',
      'floating-label mb-3 mr-2',
      'floating-label mb-3 mr-2 next-is-wrapped',
      'floating-label mb-3 mr-2'
    ]);

    expect(await page.screenshot()).toMatchImageSnapshot();
  }

  {
    await page.setViewportSize({ width: /*827*/ 811, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 mr-2 flex-fill',
      'floating-label mb-3 mr-2 flex-fill',
      'floating-label mb-3 mr-2 next-is-wrapped',
      'floating-label mb-3 mr-2',
      'floating-label mb-3 mr-2'
    ]);

    expect(await page.screenshot()).toMatchImageSnapshot();
  }

  {
    await page.setViewportSize({ width: /*623*/ 607, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 mr-2 flex-fill',
      'floating-label mb-3 mr-2 flex-fill next-is-wrapped',
      'floating-label mb-3 mr-2',
      'floating-label mb-3 mr-2 next-is-wrapped',
      'floating-label mb-3 mr-2'
    ]);

    expect(await page.screenshot()).toMatchImageSnapshot();
  }

  {
    await page.setViewportSize({ width: /*506*/ 491, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 mr-2 flex-fill next-is-wrapped',
      'floating-label mb-3 mr-2 flex-fill',
      'floating-label mb-3 mr-2 next-is-wrapped',
      'floating-label mb-3 mr-2 next-is-wrapped',
      'floating-label mb-3 mr-2'
    ]);

    expect(await page.screenshot()).toMatchImageSnapshot();
  }

  {
    await page.setViewportSize({ width: /*388*/ 372, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 mr-2 flex-fill next-is-wrapped',
      'floating-label mb-3 mr-2 flex-fill next-is-wrapped',
      'floating-label mb-3 mr-2',
      'floating-label mb-3 mr-2 next-is-wrapped',
      'floating-label mb-3 mr-2'
    ]);

    expect(await page.screenshot()).toMatchImageSnapshot();
  }

  {
    await page.setViewportSize({ width: /*357*/ 341, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 mr-2 flex-fill next-is-wrapped',
      'floating-label mb-3 mr-2 flex-fill next-is-wrapped',
      'floating-label mb-3 mr-2 next-is-wrapped',
      'floating-label mb-3 mr-2 next-is-wrapped',
      'floating-label mb-3 mr-2'
    ]);

    expect(await page.screenshot()).toMatchImageSnapshot();
  }
});
