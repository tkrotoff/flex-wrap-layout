import React from 'react';

import { Borders, DetectRowWrap } from './index';

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
  position?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}

interface State {
  bordersDisplayed: boolean;
  detectRowWrapEnabled: boolean;
}

export class DevTools extends React.Component<Props, State> {
  static defaultProps: Props = {
    position: {
      // See https://github.com/mobxjs/mobx-react-devtools/blob/6.1.1/src/Panel/index.jsx#L40
      top: -2,
      right: 20
    }
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      bordersDisplayed: Borders.displayed(),
      detectRowWrapEnabled: DetectRowWrap.enabled
    };
  }

  handleToggleBordersChange() {
    const bordersDisplayed = Borders.toggle();
    const detectRowWrapEnabled = DetectRowWrap.run();
    this.setState({
      bordersDisplayed,
      detectRowWrapEnabled
    });
  }

  handleToggleDetectRowWrapChange() {
    const detectRowWrapEnabled = DetectRowWrap.toggle();
    this.setState({
      detectRowWrapEnabled
    });
  }

  render() {
    const { position } = this.props;

    return (
      <div style={{ ...panel, ...position }}>
        <label title="Dotted line: growing block, solid line: fixed block">
          <input
            type="checkbox"
            checked={this.state.bordersDisplayed}
            onChange={this.handleToggleBordersChange.bind(this)}
          />{' '}
          Borders
        </label>
        {'  '}
        <label title="Make previous and next blocks grow">
          <input
            type="checkbox"
            checked={this.state.detectRowWrapEnabled}
            onChange={this.handleToggleDetectRowWrapChange.bind(this)}
          />{' '}
          detectRowWrap()
        </label>
      </div>
    );
  }
}
