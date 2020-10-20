import 'jest-playwright-preset';

import { join } from 'path';

const waitForResize = () => new Promise(res => setTimeout(res, 100));

test('resize', async () => {
  await page.goto(`file:${join(__dirname, 'build/Bootstrap4.html')}`);

  const height = 768;

  const firstPersonChildren = await page.$('.people > .person:first-child > .wrap-children');
  const children = await firstPersonChildren?.$$(':scope > div')!;
  expect(children.length).toEqual(5);

  {
    await page.setViewportSize({ width: 1119, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 mr-2 flex-fill',
      'floating-label mb-3 mr-2 flex-fill',
      'floating-label mb-3 mr-2',
      'floating-label mb-3 mr-2',
      'floating-label mb-3 mr-2'
    ]);
  }

  {
    await page.setViewportSize({ width: /*1103*/ 1038, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 mr-2 flex-fill',
      'floating-label mb-3 mr-2 flex-fill',
      'floating-label mb-3 mr-2',
      'floating-label mb-3 mr-2 next-is-wrapped',
      'floating-label mb-3 mr-2'
    ]);
  }

  {
    await page.setViewportSize({ width: /*827 - 15*/ 762 - 15, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 mr-2 flex-fill',
      'floating-label mb-3 mr-2 flex-fill',
      'floating-label mb-3 mr-2 next-is-wrapped',
      'floating-label mb-3 mr-2',
      'floating-label mb-3 mr-2'
    ]);
  }

  {
    await page.setViewportSize({ width: /*623 - 15*/ 555 - 15, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 mr-2 flex-fill',
      'floating-label mb-3 mr-2 flex-fill next-is-wrapped',
      'floating-label mb-3 mr-2',
      'floating-label mb-3 mr-2 next-is-wrapped',
      'floating-label mb-3 mr-2'
    ]);
  }

  {
    await page.setViewportSize({ width: /*506 - 15*/ 438 - 15, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 mr-2 flex-fill next-is-wrapped',
      'floating-label mb-3 mr-2 flex-fill',
      'floating-label mb-3 mr-2 next-is-wrapped',
      'floating-label mb-3 mr-2 next-is-wrapped',
      'floating-label mb-3 mr-2'
    ]);
  }

  /*
  {
    await page.setViewportSize({ width: 388 - 15, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 mr-2 flex-fill next-is-wrapped',
      'floating-label mb-3 mr-2 flex-fill next-is-wrapped',
      'floating-label mb-3 mr-2',
      'floating-label mb-3 mr-2 next-is-wrapped',
      'floating-label mb-3 mr-2'
    ]);
  }
  */

  {
    await page.setViewportSize({ width: /*357 - 15*/ 354 - 15, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 mr-2 flex-fill next-is-wrapped',
      'floating-label mb-3 mr-2 flex-fill next-is-wrapped',
      'floating-label mb-3 mr-2 next-is-wrapped',
      'floating-label mb-3 mr-2 next-is-wrapped',
      'floating-label mb-3 mr-2'
    ]);
  }
});
