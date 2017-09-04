import toggleBorders from '../src/toggleBorders';

import './native.html';
import './native.scss';

declare global {
  interface Window {
    toggleBorders: () => void;
  }
}

// See Calling webpacked code from outside (HTML script tag) https://stackoverflow.com/a/34358513/990356
window.toggleBorders = toggleBorders;
