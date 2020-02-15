// See [jQuery.position() equivalent is wrong](https://github.com/HubSpot/youmightnotneedjquery/issues/172)
function position(el: Element) {
  const { top, left } = el.getBoundingClientRect();
  const { marginTop, marginLeft } = window.getComputedStyle(el);
  return {
    top: top - parseInt(marginTop, 10),
    left: left - parseInt(marginLeft, 10)
  };
}

// See [How to detect CSS flex wrap event](https://stackoverflow.com/q/40012428)
export function detectWrappedElements(
  rootElement: HTMLElement,
  wrapChildrenClassName: string,
  nextIsWrappedClassName: string,
  hasChildWrappedClassName: string
) {
  // For each child of .wrap-children
  //   - find its previous sibling
  //   - check its sibling is not at the same position
  //     - if it's not, add .next-is-wrapped
  //     - if same position, remove .next-is-wrapped

  // [...HTMLCollection] vs Array.from(HTMLCollection): the latter doesn't need downlevelIteration with IE
  const parents = Array.from(rootElement.getElementsByClassName(wrapChildrenClassName));
  if (rootElement.classList.contains(wrapChildrenClassName)) parents.unshift(rootElement);
  parents.forEach(parent => {
    const { children } = parent;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];

      const { top } = position(child);

      const prev = child.previousElementSibling;

      if (prev !== null) {
        const { top: prevTop } = position(prev);

        if (top > prevTop) {
          // There is no way to CSS style an element given a match on its next sibling
          // See [Is there a "previous sibling" CSS selector?](http://stackoverflow.com/q/1817792)
          prev.classList.add(nextIsWrappedClassName);
        } else if (top === prevTop) {
          prev.classList.remove(nextIsWrappedClassName);
        }
      }
    }
  });

  const containsChildNextIsWrapped =
    rootElement.getElementsByClassName(nextIsWrappedClassName).length > 0;

  // IE does not support toggle() second argument
  // See https://developer.mozilla.org/en-US/docs/Web/API/Element/classList#Browser_compatibility
  //rootEl.classList.toggle(hasChildWrappedClassName, containsChildNextIsWrapped);
  rootElement.classList[containsChildNextIsWrapped ? 'add' : 'remove'](hasChildWrappedClassName);
}
