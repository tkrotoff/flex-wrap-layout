import path from 'path';

const waitForResize = () => page.waitFor(100);

test('resize', async () => {
  await page.goto(`file:${path.join(__dirname, 'build/Bootstrap4.html')}`);

  const height = 768;

  const firstPersonChildren = await page.$('.people > .person:first-child > .wrap-children');
  const children = await firstPersonChildren?.$$(':scope > div')!;
  expect(children.length).toEqual(5);

  {
    await page.setViewportSize({ width: /*1054*/ 1138, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 mr-2',
      'floating-label mb-3 mr-2 flex-fill',
      'floating-label mb-3 mr-2 flex-fill',
      'floating-label mb-3 mr-2',
      'floating-label mb-3 mr-2'
    ]);
  }

  {
    await page.setViewportSize({ width: 1038, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 mr-2',
      'floating-label mb-3 mr-2 flex-fill',
      'floating-label mb-3 mr-2 flex-fill',
      'floating-label mb-3 mr-2 next-is-wrapped',
      'floating-label mb-3 mr-2'
    ]);
  }

  {
    await page.setViewportSize({ width: 762 - 15, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 mr-2',
      'floating-label mb-3 mr-2 flex-fill',
      'floating-label mb-3 mr-2 flex-fill next-is-wrapped',
      'floating-label mb-3 mr-2',
      'floating-label mb-3 mr-2'
    ]);
  }

  {
    await page.setViewportSize({ width: 555 - 15, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 mr-2',
      'floating-label mb-3 mr-2 flex-fill next-is-wrapped',
      'floating-label mb-3 mr-2 flex-fill',
      'floating-label mb-3 mr-2 next-is-wrapped',
      'floating-label mb-3 mr-2'
    ]);
  }

  {
    await page.setViewportSize({ width: 444 - 15, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 mr-2',
      'floating-label mb-3 mr-2 flex-fill next-is-wrapped',
      'floating-label mb-3 mr-2 flex-fill next-is-wrapped',
      'floating-label mb-3 mr-2 next-is-wrapped',
      'floating-label mb-3 mr-2'
    ]);
  }

  {
    await page.setViewportSize({ width: 354 - 15, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
      'floating-label mb-3 mr-2 next-is-wrapped',
      'floating-label mb-3 mr-2 flex-fill next-is-wrapped',
      'floating-label mb-3 mr-2 flex-fill next-is-wrapped',
      'floating-label mb-3 mr-2 next-is-wrapped',
      'floating-label mb-3 mr-2'
    ]);
  }
});
