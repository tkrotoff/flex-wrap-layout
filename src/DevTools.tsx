import React, { useState } from 'react';

import { useDetectWrappedElements } from './useDetectWrappedElements';

// https://github.com/mobxjs/mobx-react-devtools/blob/6.1.1/src/Panel/styles/index.js
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

  detectWrappedElements: boolean;
  setDetectWrappedElements: React.Dispatch<React.SetStateAction<boolean>>;

  flexFillClassName: string;
  flexFill: boolean;
  setFlexFill: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useDevTools(
  showBordersInit: boolean,
  detectWrappedElementsInit: boolean,
  flexFillInit: boolean
) {
  const [showBorders, setShowBorders] = useState(showBordersInit);
  const [detectWrappedElements, setDetectWrappedElements] = useState(detectWrappedElementsInit);
  const [flexFill, setFlexFill] = useState(flexFillInit);

  const showBordersClassName = showBorders ? 'show-borders' : '';
  const flexFillClassName = flexFill ? 'flex-fill' : '';

  return {
    showBordersClassName,
    showBorders,
    setShowBorders,

    detectWrappedElements,
    setDetectWrappedElements,

    flexFillClassName,
    flexFill,
    setFlexFill
  };
}

// https://inventingwithmonster.io/20190207-break-the-rules-of-react-hooks/
function DetectWrappedElements({
  detectWrappedElementsRef
}: {
  detectWrappedElementsRef: React.RefObject<HTMLElement>;
}) {
  useDetectWrappedElements(detectWrappedElementsRef);
  return null;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  detectWrappedElementsRef: React.RefObject<HTMLElement>;
  context: DevToolsContext;
}

export function DevTools(props: Props) {
  const { detectWrappedElementsRef, context, ...otherProps } = props;

  const {
    showBorders,
    setShowBorders,

    detectWrappedElements,
    setDetectWrappedElements,

    flexFill,
    setFlexFill
  } = context;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div style={{ ...panel }} {...otherProps}>
      {detectWrappedElements && (
        <DetectWrappedElements detectWrappedElementsRef={detectWrappedElementsRef} />
      )}

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
          checked={detectWrappedElements}
          onChange={() => setDetectWrappedElements(!detectWrappedElements)}
        />{' '}
        detectWrappedElements()
      </label>
      {'  '}

      <label>
        <input type="checkbox" checked={flexFill} onChange={() => setFlexFill(!flexFill)} />{' '}
        .flex-fill
      </label>
    </div>
  );
}
