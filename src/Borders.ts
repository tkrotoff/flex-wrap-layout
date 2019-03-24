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
