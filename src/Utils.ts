import { detectRowWrap } from './detectRowWrap';

// Dotted line: growing block, solid line: fixed block
export class Borders {
  private constructor() {}

  static displayed() {
    return document.body.classList.contains('showBorders');
  }

  static toggle() {
    let show: boolean;
    const classList = document.body.classList;
    if (classList.contains('showBorders')) {
      show = false;
      classList.remove('showBorders');
    } else {
      show = true;
      classList.add('showBorders');
    }
    return show;
  }
}

export class DetectRowWrap {
  private constructor() {}

  static enabled = false;

  static enable() {
    DetectRowWrap.enabled = true;

    // See [Difference between DOMContentLoaded and load events](https://stackoverflow.com/q/2414750)
    window.addEventListener('load', detectRowWrap);
    window.addEventListener('resize', detectRowWrap);
  }

  static disable() {
    DetectRowWrap.enabled = false;

    window.removeEventListener('load', detectRowWrap);
    window.removeEventListener('resize', detectRowWrap);
    document.querySelectorAll('.wrapped').forEach(el => el.classList.remove('wrapped'));
    document
      .querySelectorAll('.next-is-wrapped')
      .forEach(el => el.classList.remove('next-is-wrapped'));
  }

  static run() {
    if (DetectRowWrap.enabled) {
      detectRowWrap();
    }
    return DetectRowWrap.enabled;
  }

  static toggle() {
    DetectRowWrap.enabled = !DetectRowWrap.enabled;
    if (DetectRowWrap.enabled) {
      DetectRowWrap.enable();
      DetectRowWrap.run();
    } else {
      DetectRowWrap.disable();
    }
    return DetectRowWrap.enabled;
  }
}
