import { Borders, DetectRowWrapController } from '../src/index';

import './detectRowWrap.html';
import './detectRowWrap.scss';

declare global {
  interface Window {
    Borders: Borders;

    // FIXME ESLint is incorrect here
    /* eslint-disable no-undef */

    DetectRowWrapController: typeof DetectRowWrapController;
  }
}

// See [Calling webpacked code from outside (HTML script tag)](https://stackoverflow.com/a/34358513/990356)
window.Borders = Borders;
window.DetectRowWrapController = DetectRowWrapController;
