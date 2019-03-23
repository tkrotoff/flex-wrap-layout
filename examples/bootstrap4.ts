import { Borders } from '../src/index';

import './bootstrap4.html';
import './bootstrap4.scss';

declare global {
  interface Window {
    Borders: Borders;
  }
}

// See [Calling webpacked code from outside (HTML script tag)](https://stackoverflow.com/a/34358513/990356)
window.Borders = Borders;
