// See jQuery.position() equivalent is wrong https://github.com/HubSpot/youmightnotneedjquery/issues/172
function position(elem: Element) {
  const rect = elem.getBoundingClientRect();

  const style = getComputedStyle(elem);
  const marginTop = style.marginTop !== null ? parseInt(style.marginTop, 10) : 0;
  const marginLeft = style.marginLeft !== null ? parseInt(style.marginLeft, 10) : 0;

  return {
    top: rect.top - marginTop,
    left: rect.left - marginLeft
  };
}

// See How to detect CSS flex wrap event http://stackoverflow.com/questions/40012428
function detectRowWrap() {
  // For each child of [layout=row]
  //   - find its previous sibling
  //   - check its sibling is not at the same position
  //     - if it's not, add classes
  //     - if same position, remove classes

  const rowChilds = document.querySelectorAll('[layout=row] > *');
  for (let i = 0; i < rowChilds.length; i++) {
    const el = rowChilds[i];

    // With jQuery:
    //const top = $(el).position().top;
    const top = position(el).top;

    const prev = el.previousElementSibling;

    if (prev !== null) {
      const prevTop = position(prev).top;

      if (top > prevTop) {
        el.classList.add('wrapped');

        // There is no way to CSS style an element given a match on its next sibling
        // See Is there a "previous sibling" CSS selector? http://stackoverflow.com/questions/1817792
        prev.classList.add('next-is-wrapped');
      }

      else if (top === prevTop) {
        el.classList.remove('wrapped');
        prev.classList.remove('next-is-wrapped');
      }
    }
  }
}
