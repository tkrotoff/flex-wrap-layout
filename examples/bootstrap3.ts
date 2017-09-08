import { toggleBorders } from '../src/index';

import './bootstrap3.html';
import './bootstrap3.scss';

declare global {
  interface Window {
    toggleBorders: () => void;
  }
}

// See Calling webpacked code from outside (HTML script tag) https://stackoverflow.com/a/34358513/990356
window.toggleBorders = toggleBorders;
