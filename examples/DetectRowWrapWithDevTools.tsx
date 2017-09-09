import * as React from 'react';
import * as ReactDOM from 'react-dom';

import DevTools from '../src/DevTools';

import './DetectRowWrapWithDevTools.html';
import './detectRowWrap.scss';

class DetectRowWrapWithDevTools extends React.Component {
  render() {
    return (
      <div>
        <div data-layout="row" data-hspace data-vspace>
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

        <DevTools />
      </div>
    );
  }
}

ReactDOM.render(<DetectRowWrapWithDevTools />, document.getElementById('app'));
