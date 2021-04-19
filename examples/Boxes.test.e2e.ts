import { join } from 'path';

const waitForResize = () => page.waitForTimeout(100);

test('resize', async () => {
  await page.goto(`file:${join(__dirname, 'build/Boxes.html')}`);

  const height = 768;

  const children = await page.$$('.wrap-children, .box');
  expect(children.length).toEqual(13);

  {
    await page.setViewportSize({ width: /*1037*/ 1033, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
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

    expect(await page.screenshot()).toMatchImageSnapshot();
  }

  {
    await page.setViewportSize({ width: /*1036*/ 1032, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
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

    expect(await page.screenshot()).toMatchImageSnapshot();
  }

  {
    await page.setViewportSize({ width: /*696*/ 693, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
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

    expect(await page.screenshot()).toMatchImageSnapshot();
  }

  {
    await page.setViewportSize({ width: /*356*/ 354, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
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

    expect(await page.screenshot()).toMatchImageSnapshot();
  }

  {
    await page.setViewportSize({ width: /*242*/ 241, height });
    await waitForResize();

    const classNames = await Promise.all(children.map(div => div.evaluate(el => el.className)));
    expect(classNames).toEqual([
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

    expect(await page.screenshot()).toMatchImageSnapshot();
  }
});
