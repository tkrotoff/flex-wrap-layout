import toggleBorders from '../src/toggleBorders';

import './demo.html';
import './bootstrap3.scss';

declare global {
  interface Window {
    toggleBorders: () => void;
  }
}

// See Calling webpacked code from outside (HTML script tag) https://stackoverflow.com/a/34358513/990356
window.toggleBorders = toggleBorders;
