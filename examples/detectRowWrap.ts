import toggleBorders from '../src/toggleBorders';
import { enableDetectRowWrap, callDetectRowWrap, toggleDetectRowWrap } from '../src/toggleDetectRowWrap';

import './detectRowWrap.html';
import './detectRowWrap.scss';

declare global {
  interface Window {
    toggleBorders: () => void;
    callDetectRowWrap: () => void;
    toggleDetectRowWrap: () => void;
  }
}

// See Calling webpacked code from outside (HTML script tag) https://stackoverflow.com/a/34358513/990356
window.toggleBorders = toggleBorders;
window.callDetectRowWrap = callDetectRowWrap;
window.toggleDetectRowWrap = toggleDetectRowWrap;

enableDetectRowWrap();
