import { detectRowWrap } from './detectRowWrap';

// Could not be named DetectRowWrap.ts: conflicts with detectRowWrap.ts
export class DetectRowWrapController {
  // Mostly copy-pasted from useDetectRowWrap.ts

  public enabled!: boolean;

  constructor(private rootEl: HTMLElement, enable: boolean) {
    enable ? this.enable() : (this.enabled = false);
  }

  private detectRowWrap = () => {
    detectRowWrap(this.rootEl);
  };

  enable() {
    this.enabled = true;

    // See [Difference between DOMContentLoaded and load events](https://stackoverflow.com/q/2414750)
    window.addEventListener('load', this.detectRowWrap);
    window.addEventListener('resize', this.detectRowWrap);

    this.run();
  }

  disable() {
    this.enabled = false;

    window.removeEventListener('load', this.detectRowWrap);
    window.removeEventListener('resize', this.detectRowWrap);

    // Remove all CSS classes

    // Use getElementsByClassName() instead of querySelectorAll()
    // because it is much faster, see https://stackoverflow.com/a/43967953/990356

    let children = this.rootEl.getElementsByClassName('wrapped');
    for (const el of children) {
      el.classList.remove('wrapped');
    }
    children = this.rootEl.getElementsByClassName('next-is-wrapped');
    for (const el of children) {
      el.classList.remove('next-is-wrapped');
    }
  }

  // Cannot be private
  run() {
    if (this.enabled) {
      this.detectRowWrap();
    }
    return this.enabled;
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.enable();
      this.run();
    } else {
      this.disable();
    }
    return this.enabled;
  }
}
