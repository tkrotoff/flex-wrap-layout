import React, { useRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import {
  hasChildWrappedClassName,
  nextIsWrappedClassName,
  useDetectWrappedElements,
  wrapChildrenClassName
} from './useDetectWrappedElements';

// ["jsdom doesn't do any rendering, so getBoundingClientRect() always returns 0,0,0,0"](https://github.com/jsdom/jsdom/issues/1590#issuecomment-243228840)
// [Implement a layout engine](https://github.com/jsdom/jsdom/issues/1322)

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

test('resize 1024px => 296px => 183px', () => {
  const { container } = render(<MinimalExample />);

  expect(window.innerWidth).toEqual(1024);
  expect(window.innerHeight).toEqual(768);

  mockWindowGetComputedStyle({ marginTop: '15px', marginLeft: '15px' });
  const parent = screen.getByTestId('parent');
  const child0 = screen.getByTestId('child0');
  const child1 = screen.getByTestId('child1');
  const child2 = screen.getByTestId('child2');

  ///

  // Values for window width 1024px
  mockGetBoundingClientRect(child0, { top: 13, left: 13 });
  mockGetBoundingClientRect(child1, { top: 13, left: 71.265625 });
  mockGetBoundingClientRect(child2, { top: 13, left: 909.046875 });

  fireEvent(window, new Event('resize'));

  expect(container.getElementsByClassName(hasChildWrappedClassName).length).toEqual(0);
  expect(parent.className).toEqual('wrap-children');
  expect(container.getElementsByClassName(nextIsWrappedClassName).length).toEqual(0);
  expect(child0.className).toEqual('');
  expect(child1.className).toEqual('');
  expect(child2.className).toEqual('');

  ///

  // Values for window width 296px
  mockGetBoundingClientRect(child0, { top: 13, left: 13 });
  mockGetBoundingClientRect(child1, { top: 13, left: 71.265625 });
  mockGetBoundingClientRect(child2, { top: 95, left: 13 });

  fireEvent(window, new Event('resize'));

  expect(container.getElementsByClassName(hasChildWrappedClassName).length).toEqual(1);
  expect(parent.className).toEqual('wrap-children has-child-wrapped');
  expect(container.getElementsByClassName(nextIsWrappedClassName).length).toEqual(1);
  expect(child0.className).toEqual('');
  expect(child1.className).toEqual(nextIsWrappedClassName);
  expect(child2.className).toEqual('');

  ///

  // Values for window width 183px
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
