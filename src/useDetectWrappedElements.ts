import React, { useEffect } from 'react';

import { detectWrappedElements } from './detectWrappedElements';

export const wrapChildrenClassName = 'wrap-children';
export const nextIsWrappedClassName = 'next-is-wrapped';
export const hasChildWrappedClassName = 'has-child-wrapped';

export function useDetectWrappedElements(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const rootElement = ref.current!;

    function run() {
      detectWrappedElements(
        rootElement,
        wrapChildrenClassName,
        nextIsWrappedClassName,
        hasChildWrappedClassName
      );
    }

    window.addEventListener('resize', run);

    run();

    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('resize', run);

      const children = rootElement.getElementsByClassName(nextIsWrappedClassName);
      // See https://stackoverflow.com/q/22270664#comment33829207_22270685
      while (children.length > 0) {
        children[0].classList.remove(nextIsWrappedClassName);
      }

      rootElement.classList.remove(hasChildWrappedClassName);
    };
  }, [ref]);
}
