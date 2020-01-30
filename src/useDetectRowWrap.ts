import React, { useEffect } from 'react';
import { detectRowWrap } from './detectRowWrap';

export function useDetectRowWrap(rootRef: React.RefObject<HTMLElement>) {
  // Mostly copy-pasted from DetectRowWrapController.ts

  useEffect(() => {
    const rootEl = rootRef.current!;

    function run() {
      if (rootEl) detectRowWrap(rootEl);
    }

    // See [Difference between DOMContentLoaded and load events](https://stackoverflow.com/q/2414750)
    window.addEventListener('load', run);
    window.addEventListener('resize', run);

    // FIXME We should not have to do this since enable() listen to the 'load' event
    // Problem is that with React, the 'load' event happens before we can catch it
    run();

    return function cleanup() {
      window.removeEventListener('load', run);
      window.removeEventListener('resize', run);

      // Remove all CSS classes

      if (rootEl) {
        // Use getElementsByClassName() instead of querySelectorAll()
        // because it is much faster, see https://stackoverflow.com/a/43967953/990356
        const children = rootEl.getElementsByClassName('next-is-wrapped');
        for (let i = 0; i < children.length; i++) {
          children[i].classList.remove('next-is-wrapped');
        }
      }
    };
  }, [rootRef]);
  // FIXME Should it be [], [rootEl] or [rootEl.current]?
  // See [useEffect(effect, [ref.current]) is prematurely re-running](https://github.com/facebook/react/issues/14387)
  // See https://usehooks.com/useHover/
  // See https://usehooks.com/useOnClickOutside/
  // See https://github.com/Andarist/use-onclickoutside/blob/v0.3.0/src/index.ts#L47-L53
  // See https://github.com/streamich/react-use/blob/v5.13.0/src/useHoverDirty.ts#L28
  //
  // See https://github.com/sandiiarov/use-events/commit/56ef38e557c75d6648a9557229cbba81ed8e0eec
  // See https://github.com/sandiiarov/use-events/blob/9338187f1077e7beba5bf65166d7dee7d0e11447/src/useClickOutside/index.tsx#L34
  // See https://github.com/sandiiarov/use-events/blob/9338187f1077e7beba5bf65166d7dee7d0e11447/src/useResizeObserver/index.tsx#L27
}
