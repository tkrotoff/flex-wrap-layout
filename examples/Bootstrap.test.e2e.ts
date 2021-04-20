import 'jest-playwright-preset';

import path from 'path';

const waitForResize = () => page.waitForTimeout(100);

test('resize', async () => {
  await page.goto(`file:${path.join(__dirname, 'build/Bootstrap.html')}`);

  const height = 768;

  const firstPersonChildren = (await page.$('.people > .person:first-child > .wrap-children'))!;
  const children = await firstPersonChildren.$$(':scope > div');
  expect(children.length).toEqual(5);

  {
    await page.setViewportSize({ width: /*1114*/ 1111, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 me-2 flex-fill',
      'floating-label mb-3 me-2 flex-fill',
      'floating-label mb-3 me-2',
      'floating-label mb-3 me-2',
      'floating-label mb-3 me-2'
    ]);

    expect(await page.screenshot()).toMatchImageSnapshot();
  }

  {
    await page.setViewportSize({ width: /*1113*/ 1110, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 me-2 flex-fill',
      'floating-label mb-3 me-2 flex-fill',
      'floating-label mb-3 me-2',
      'floating-label mb-3 me-2 next-is-wrapped',
      'floating-label mb-3 me-2'
    ]);

    expect(await page.screenshot()).toMatchImageSnapshot();
  }

  {
    await page.setViewportSize({ width: /*814*/ 813, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 me-2 flex-fill',
      'floating-label mb-3 me-2 flex-fill',
      'floating-label mb-3 me-2 next-is-wrapped',
      'floating-label mb-3 me-2',
      'floating-label mb-3 me-2'
    ]);

    expect(await page.screenshot()).toMatchImageSnapshot();
  }

  {
    await page.setViewportSize({ width: /*610*/ 609, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 me-2 flex-fill',
      'floating-label mb-3 me-2 flex-fill next-is-wrapped',
      'floating-label mb-3 me-2',
      'floating-label mb-3 me-2 next-is-wrapped',
      'floating-label mb-3 me-2'
    ]);

    expect(await page.screenshot()).toMatchImageSnapshot();
  }

  {
    await page.setViewportSize({ width: /*485*/ 485, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 me-2 flex-fill next-is-wrapped',
      'floating-label mb-3 me-2 flex-fill',
      'floating-label mb-3 me-2 next-is-wrapped',
      'floating-label mb-3 me-2 next-is-wrapped',
      'floating-label mb-3 me-2'
    ]);

    expect(await page.screenshot()).toMatchImageSnapshot();
  }

  {
    await page.setViewportSize({ width: /*375*/ 374, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 me-2 flex-fill next-is-wrapped',
      'floating-label mb-3 me-2 flex-fill next-is-wrapped',
      'floating-label mb-3 me-2',
      'floating-label mb-3 me-2 next-is-wrapped',
      'floating-label mb-3 me-2'
    ]);

    expect(await page.screenshot()).toMatchImageSnapshot();
  }

  {
    await page.setViewportSize({ width: /*344*/ 341, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 me-2 flex-fill next-is-wrapped',
      'floating-label mb-3 me-2 flex-fill next-is-wrapped',
      'floating-label mb-3 me-2 next-is-wrapped',
      'floating-label mb-3 me-2 next-is-wrapped',
      'floating-label mb-3 me-2'
    ]);

    expect(await page.screenshot()).toMatchImageSnapshot();
  }
});
