export function forceDetectWrappedElements() {
  // https://stackoverflow.com/q/1818474
  dispatchEvent(new Event('resize'));
}
