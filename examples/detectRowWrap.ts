import { Borders, DetectRowWrap } from '../src/index';

import './detectRowWrap.html';
import './detectRowWrap.scss';

declare global {
  interface Window {
    Borders: Borders;
    DetectRowWrap: DetectRowWrap;
  }
}

// See Calling webpacked code from outside (HTML script tag) https://stackoverflow.com/a/34358513/990356
window.Borders = Borders;
window.DetectRowWrap = DetectRowWrap;

DetectRowWrap.enable();
