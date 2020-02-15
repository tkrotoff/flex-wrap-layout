import React, { useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';

import {
  useDetectWrappedElements,
  wrapChildrenClassName,
  nextIsWrappedClassName,
  hasChildWrappedClassName
} from './useDetectWrappedElements';

// ["jsdom doesn't do any rendering, so getBoundingClientRect() always returns 0,0,0,0"](https://github.com/jsdom/jsdom/issues/1590#issuecomment-243228840)
// See also [Implement a layout engine](https://github.com/jsdom/jsdom/issues/1322)

const mockWindowGetComputedStyle = (style: { marginTop: string; marginLeft: string }) =>
  (window.getComputedStyle = () => style as CSSStyleDeclaration);

const mockGetBoundingClientRect = (el: HTMLElement, rect: { top: number; left: number }) =>
  // eslint-disable-next-line no-param-reassign
  (el.getBoundingClientRect = () => rect as DOMRect);

function MinimalExample() {
  const ref = useRef(null);
  useDetectWrappedElements(ref);

  return (
    <div data-testid="parent" ref={ref} className={wrapChildrenClassName}>
      <div data-testid="child0">Paris</div>
      <div data-testid="child1" style={{ flex: 'auto' }}>
        Los Angeles
      </div>
      <div data-testid="child2">Phnom Penh</div>
    </div>
  );
}

test('resize 1024px => 274px => 171px', () => {
  const { getByTestId, container } = render(<MinimalExample />);

  expect(window.innerWidth).toEqual(1024);
  expect(window.innerHeight).toEqual(768);

  mockWindowGetComputedStyle({ marginTop: '15px', marginLeft: '15px' });
  const parent = getByTestId('parent');
  const child0 = getByTestId('child0');
  const child1 = getByTestId('child1');
  const child2 = getByTestId('child2');

  ///

  // Values for window width 1024px
  mockGetBoundingClientRect(child0, { top: 13, left: 13 });
  mockGetBoundingClientRect(child1, { top: 13, left: 67 });
  mockGetBoundingClientRect(child2, { top: 13, left: 917 });

  fireEvent(window, new Event('resize'));

  expect(container.getElementsByClassName(hasChildWrappedClassName).length).toEqual(0);
  expect(parent.className).toEqual('wrap-children');
  expect(container.getElementsByClassName(nextIsWrappedClassName).length).toEqual(0);
  expect(child0.className).toEqual('');
  expect(child1.className).toEqual('');
  expect(child2.className).toEqual('');

  ///

  // Values for window width 274px
  mockGetBoundingClientRect(child0, { top: 13, left: 13 });
  mockGetBoundingClientRect(child1, { top: 13, left: 67 });
  mockGetBoundingClientRect(child2, { top: 95, left: 13 });

  fireEvent(window, new Event('resize'));

  expect(container.getElementsByClassName(hasChildWrappedClassName).length).toEqual(1);
  expect(parent.className).toEqual('wrap-children has-child-wrapped');
  expect(container.getElementsByClassName(nextIsWrappedClassName).length).toEqual(1);
  expect(child0.className).toEqual('');
  expect(child1.className).toEqual(nextIsWrappedClassName);
  expect(child2.className).toEqual('');

  ///

  // Values for window width 171px
  mockGetBoundingClientRect(child0, { top: 13, left: 13 });
  mockGetBoundingClientRect(child1, { top: 95, left: 13 });
  mockGetBoundingClientRect(child2, { top: 177, left: 13 });

  fireEvent(window, new Event('resize'));

  expect(container.getElementsByClassName(hasChildWrappedClassName).length).toEqual(1);
  expect(parent.className).toEqual('wrap-children has-child-wrapped');
  expect(container.getElementsByClassName(nextIsWrappedClassName).length).toEqual(2);
  expect(child0.className).toEqual(nextIsWrappedClassName);
  expect(child1.className).toEqual(nextIsWrappedClassName);
  expect(child2.className).toEqual('');
});
