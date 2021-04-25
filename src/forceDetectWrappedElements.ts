export function forceDetectWrappedElements() {
  try {
    // https://stackoverflow.com/q/1818474
    window.dispatchEvent(new Event('resize'));
  } catch {
    // FIXME Event constructor is not supported by IE
    // https://github.com/zloirock/core-js/issues/354
    // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#polyfill
    // https://github.com/lifaon74/events-polyfill/blob/bc989dc00fb90a42ae9c012c309d48710dec2589/event-constructor-polyfill.js#L11-L28
    // https://github.com/kumarharsh/custom-event-polyfill/blob/v1.0.7/polyfill.js
    // http://youmightnotneedjquery.com/#trigger_native
    const event = document.createEvent('Event');
    const bubbles = false; // Default is false for new Event()
    const cancelable = false; // Default is false for new Event()
    event.initEvent('resize', bubbles, cancelable);
    window.dispatchEvent(event);
  }
}
