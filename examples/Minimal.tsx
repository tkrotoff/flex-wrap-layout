import 'core-js';

import { useRef } from 'react';
import { useDetectWrappedElements, wrapChildrenClassName } from 'flex-wrap-layout';
import { createRoot } from 'react-dom/client';

import './Minimal.html';
import './Minimal.scss';

const boxStyle = {
  border: '1px solid',
  height: 60,
  margin: 5,
  padding: 5
};

function MyComponent() {
  const ref = useRef(null);
  useDetectWrappedElements(ref);

  return (
    <div ref={ref} className={wrapChildrenClassName}>
      <div style={boxStyle}>Paris</div>
      <div style={{ ...boxStyle, flex: 'auto' }}>Los Angeles</div>
      <div style={boxStyle}>Phnom Penh</div>
    </div>
  );
}

const root = createRoot(document.getElementById('app')!);
root.render(<MyComponent />);
