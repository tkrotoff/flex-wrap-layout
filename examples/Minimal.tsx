import 'core-js';

import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

import { useDetectRowWrap, wrapChildrenClassName } from 'flex-wrap-layout';
import 'flex-wrap-layout/src/detectRowWrap.scss';

import './Minimal.html';

const boxStyle = {
  border: '1px solid',
  height: 60,
  margin: 5,
  padding: 5
};

function MyComponent() {
  const ref = useRef(null);
  useDetectRowWrap(ref);

  return (
    <div ref={ref} className={wrapChildrenClassName}>
      <div style={boxStyle}>Paris</div>
      <div style={{ ...boxStyle, flex: 'auto' }}>Los Angeles</div>
      <div style={boxStyle}>Phnom Penh</div>
    </div>
  );
}

ReactDOM.render(<MyComponent />, document.getElementById('app'));
