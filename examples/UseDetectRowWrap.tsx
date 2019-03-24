import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

import { useDetectRowWrap } from '../src/useDetectRowWrap';

import './UseDetectRowWrap.html';
import './detectRowWrap.scss';

function UseDetectRowWrap() {
  const divRef = useRef(null);
  useDetectRowWrap(divRef);

  return (
    <div ref={divRef} data-layout="row" data-hspace data-vspace>
      <div data-layout="row" data-hspace data-vspace>
        <div className="box blue" />
        <div className="box yellow" data-grow />
        <div className="box grey" />
      </div>
      <div data-layout="row" data-grow data-hspace data-vspace>
        <div className="box green" />
        <div className="box green" data-grow />
        <div className="box green" />
      </div>
      <div data-layout="row" data-hspace data-vspace>
        <div className="box green" />
        <div className="box green" data-grow />
        <div className="box green" />
      </div>
    </div>
  );
}

ReactDOM.render(<UseDetectRowWrap />, document.getElementById('app'));
