// [jQuery.position() equivalent is wrong](https://github.com/HubSpot/youmightnotneedjquery/issues/172)
function getTopPosition(el: Element) {
  const { top } = el.getBoundingClientRect();
  const { marginTop } = getComputedStyle(el);
  return top - parseInt(marginTop, 10);
}

// [How to detect CSS flex wrap event](https://stackoverflow.com/q/40012428)
export function detectWrappedElements(
  rootElement: HTMLElement,
  wrapChildrenClassName: string,
  nextIsWrappedClassName: string,
  hasChildWrappedClassName: string
) {
  // For each child of .wrap-children
  //   - find its previous sibling
  //   - check if its previous sibling is at the same top position
  //     - if not, add .next-is-wrapped
  //     - if same position, remove .next-is-wrapped

  // [...HTMLCollection] vs Array.from(HTMLCollection): the latter doesn't need downlevelIteration with IE
  const parents = Array.from(rootElement.getElementsByClassName(wrapChildrenClassName));
  if (rootElement.classList.contains(wrapChildrenClassName)) parents.unshift(rootElement);
  parents.forEach(parent => {
    const { children } = parent;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];

      const prev = child.previousElementSibling;
      if (prev !== null) {
        const top = getTopPosition(child);
        const prevTop = getTopPosition(prev);

        if (top > prevTop) {
          // There is no way to CSS style an element given a match on its next sibling
          // [Is there a "previous sibling" CSS selector?](https://stackoverflow.com/q/1817792)
          prev.classList.add(nextIsWrappedClassName);
        } else if (top === prevTop) {
          prev.classList.remove(nextIsWrappedClassName);
        }
      }

      // If the next sibling has been removed since the last run,
      // .next-is-wrapped may be present and we need to remove it
      if (child.nextElementSibling === null) {
        child.classList.remove(nextIsWrappedClassName);
      }
    }
  });

  const containsChildNextIsWrapped =
    rootElement.getElementsByClassName(nextIsWrappedClassName).length > 0;

  rootElement.classList.toggle(hasChildWrappedClassName, containsChildNextIsWrapped);
}
