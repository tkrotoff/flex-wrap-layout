/* eslint-disable unicorn/no-await-expression-member */

import { nextIsWrappedClassName } from 'flex-wrap-layout';
import path from 'path';

const waitForResize = () => page.waitForTimeout(100);

test('resize', async () => {
  await page.goto(`file:${path.join(__dirname, 'build/Minimal.html')}`);

  const height = 768;

  const parent = (await page.$('.wrap-children'))!;
  const children = await parent.$$('div');
  expect(children.length).toEqual(3);

  {
    await page.setViewportSize({ width: 1024, height });
    await waitForResize();

    const parentClassName = await parent.evaluate(el => el.className);
    const child0BoundingBox = await children[0].boundingBox();
    const child0ClassName = await children[0].evaluate(el => el.className);
    const child1BoundingBox = await children[1].boundingBox();
    const child1ClassName = await children[1].evaluate(el => el.className);
    const child2BoundingBox = await children[2].boundingBox();
    const child2ClassName = await children[2].evaluate(el => el.className);

    expect((await page.$$('.next-is-wrapped')).length).toEqual(0);
    expect(parentClassName).toEqual('wrap-children');
    expect(child0BoundingBox).toEqual({ x: 13, y: 13, width: 48, height: 72 });
    expect(child0ClassName).toEqual('');
    expect(child1BoundingBox).toEqual({ x: 71, y: 13, width: 827, height: 72 });
    expect(child1ClassName).toEqual('');
    expect(child2BoundingBox).toEqual({ x: 908, y: 13, width: 103, height: 72 });
    expect(child2ClassName).toEqual('');

    expect(await page.screenshot()).toMatchImageSnapshot();
  }

  {
    await page.setViewportSize({ width: /*296*/ 294, height });
    await waitForResize();

    const parentClassName = await parent.evaluate(el => el.className);
    const child0BoundingBox = await children[0].boundingBox();
    const child0ClassName = await children[0].evaluate(el => el.className);
    const child1BoundingBox = await children[1].boundingBox();
    const child1ClassName = await children[1].evaluate(el => el.className);
    const child2BoundingBox = await children[2].boundingBox();
    const child2ClassName = await children[2].evaluate(el => el.className);

    expect((await page.$$('.next-is-wrapped')).length).toEqual(1);
    expect(parentClassName).toEqual('wrap-children has-child-wrapped');
    expect(child0BoundingBox).toEqual({ x: 13, y: 13, width: 48, height: 72 });
    expect(child0ClassName).toEqual('');
    expect(child1BoundingBox).toEqual({ x: 71, y: 13, width: 210, height: 72 });
    expect(child1ClassName).toEqual(nextIsWrappedClassName);
    expect(child2BoundingBox).toEqual({ x: 13, y: 95, width: 268, height: 72 });
    expect(child2ClassName).toEqual('');

    expect(await page.screenshot()).toMatchImageSnapshot();
  }

  {
    await page.setViewportSize({ width: /*183*/ 181, height });
    await waitForResize();

    const parentClassName = await parent.evaluate(el => el.className);
    const child0BoundingBox = await children[0].boundingBox();
    const child0ClassName = await children[0].evaluate(el => el.className);
    const child1BoundingBox = await children[1].boundingBox();
    const child1ClassName = await children[1].evaluate(el => el.className);
    const child2BoundingBox = await children[2].boundingBox();
    const child2ClassName = await children[2].evaluate(el => el.className);

    expect((await page.$$('.next-is-wrapped')).length).toEqual(2);
    expect(parentClassName).toEqual('wrap-children has-child-wrapped');
    expect(child0BoundingBox).toEqual({ x: 13, y: 13, width: 155, height: 72 });
    expect(child0ClassName).toEqual(nextIsWrappedClassName);
    expect(child1BoundingBox).toEqual({ x: 13, y: 95, width: 155, height: 72 });
    expect(child1ClassName).toEqual(nextIsWrappedClassName);
    expect(child2BoundingBox).toEqual({ x: 13, y: 177, width: 155, height: 72 });
    expect(child2ClassName).toEqual('');

    expect(await page.screenshot()).toMatchImageSnapshot();
  }
});
