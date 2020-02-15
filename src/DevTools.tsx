import React, { useState } from 'react';

import { useDetectRowWrap } from './useDetectRowWrap';

// See https://github.com/mobxjs/mobx-react-devtools/blob/6.1.1/src/Panel/styles/index.js
const panel: React.CSSProperties = {
  display: 'inline-block',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '2px',
  padding: '0 5px'
};

interface DevToolsContext {
  showBordersClassName: string;
  showBorders: boolean;
  setShowBorders: React.Dispatch<React.SetStateAction<boolean>>;

  detectRowWrap: boolean;
  setDetectRowWrap: React.Dispatch<React.SetStateAction<boolean>>;

  flexFillClassName: string;
  flexFill: boolean;
  setFlexFill: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useDevTools(
  showBordersInit: boolean,
  detectRowWrapInit: boolean,
  flexFillInit: boolean
) {
  const [showBorders, setShowBorders] = useState(showBordersInit);
  const [detectRowWrap, setDetectRowWrap] = useState(detectRowWrapInit);
  const [flexFill, setFlexFill] = useState(flexFillInit);

  const showBordersClassName = showBorders ? 'showBorders' : '';
  const flexFillClassName = flexFill ? 'flex-fill' : '';

  return {
    showBordersClassName,
    showBorders,
    setShowBorders,

    detectRowWrap,
    setDetectRowWrap,

    flexFillClassName,
    flexFill,
    setFlexFill
  };
}

// https://inventingwithmonster.io/20190207-break-the-rules-of-react-hooks/
function DetectRowWrap({ detectRowWrapRef }: { detectRowWrapRef: React.RefObject<HTMLElement> }) {
  useDetectRowWrap(detectRowWrapRef);
  return null;
}

interface Props {
  detectRowWrapRef: React.RefObject<HTMLElement>;
  context: DevToolsContext;
}

export function DevTools(props: Props) {
  const { detectRowWrapRef, context } = props;

  const {
    showBorders,
    setShowBorders,

    detectRowWrap,
    setDetectRowWrap,

    flexFill,
    setFlexFill
  } = context;

  return (
    <div style={{ ...panel }}>
      {detectRowWrap && <DetectRowWrap detectRowWrapRef={detectRowWrapRef} />}

      <label title="Dotted line: growing block, solid line: fixed block">
        <input
          type="checkbox"
          checked={showBorders}
          onChange={() => setShowBorders(!showBorders)}
        />{' '}
        Borders
      </label>
      {'  '}

      <label title="Make previous and next blocks grow">
        <input
          type="checkbox"
          checked={detectRowWrap}
          onChange={() => setDetectRowWrap(!detectRowWrap)}
        />{' '}
        detectRowWrap()
      </label>
      {'  '}

      <label>
        <input type="checkbox" checked={flexFill} onChange={() => setFlexFill(!flexFill)} />{' '}
        .flex-fill
      </label>
    </div>
  );
}
