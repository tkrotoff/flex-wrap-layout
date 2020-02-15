import React, { useEffect } from 'react';

import { detectRowWrap } from './detectRowWrap';

export const wrapChildrenClassName = 'wrap-children';
export const nextIsWrappedClassName = 'next-is-wrapped';
export const hasChildWrappedClassName = 'has-child-wrapped';

export function useDetectRowWrap(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const rootEl = ref.current!;

    function run() {
      detectRowWrap(
        rootEl,
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

      const children = rootEl.getElementsByClassName(nextIsWrappedClassName);
      // See https://stackoverflow.com/q/22270664#comment33829207_22270685
      while (children.length > 0) {
        children[0].classList.remove(nextIsWrappedClassName);
      }

      rootEl.classList.remove(hasChildWrappedClassName);
    };
  }, [ref]);
}
