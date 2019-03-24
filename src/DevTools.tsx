import React, { useState, useEffect, useRef } from 'react';

import { Borders, DetectRowWrapController } from './index';

// See https://github.com/mobxjs/mobx-react-devtools/blob/6.1.1/src/Panel/styles/index.js
const panel: React.CSSProperties = {
  position: 'fixed',
  height: 26,
  backgroundColor: 'white',
  color: 'rgba(0, 0, 0, 0.8)',
  borderRadius: '2px',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: 'rgba(0, 0, 0, 0.1)',
  zIndex: 65000,
  padding: '0 5px'
};

export interface Props {
  rootRef: React.RefObject<HTMLElement>;
  enableDetectRowWrap: boolean;
  position: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export function DevTools(props: Props) {
  const { rootRef, enableDetectRowWrap, position } = props;

  const [bordersDisplayed, setBordersDisplayed] = useState(Borders.displayed());
  const [detectRowWrapEnabled, setDetectRowWrapEnabled] = useState(enableDetectRowWrap);

  // See [Is there something like instance variables?](https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables)
  const detectRowWrap = useRef<DetectRowWrapController>();
  useEffect(() => {
    detectRowWrap.current = new DetectRowWrapController(rootRef.current!, enableDetectRowWrap);
  }, [rootRef, enableDetectRowWrap]);

  function handleToggleBordersChange() {
    const displayed = Borders.toggle();
    setBordersDisplayed(displayed);
    const enabled = detectRowWrap.current!.run();
    setDetectRowWrapEnabled(enabled);
  }

  function handleToggleDetectRowWrapChange() {
    const enabled = detectRowWrap.current!.toggle();
    setDetectRowWrapEnabled(enabled);
  }

  return (
    <div style={{ ...panel, ...position }}>
      <label title="Dotted line: growing block, solid line: fixed block">
        <input type="checkbox" checked={bordersDisplayed} onChange={handleToggleBordersChange} />{' '}
        Borders
      </label>
      {'  '}
      <label title="Make previous and next blocks grow">
        <input
          type="checkbox"
          checked={detectRowWrapEnabled}
          onChange={handleToggleDetectRowWrapChange}
        />{' '}
        detectRowWrap()
      </label>
    </div>
  );
}

DevTools.defaultProps = {
  position: {
    // See https://github.com/mobxjs/mobx-react-devtools/blob/6.1.1/src/Panel/index.jsx#L40
    top: -2,
    right: 20
  }
};
