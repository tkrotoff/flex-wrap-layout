import detectRowWrap from './detectRowWrap';

let detectRowWrapEnabled = true;

export function enableDetectRowWrap() {
  // See Difference between DOMContentLoaded and load events https://stackoverflow.com/q/2414750
  window.addEventListener('load', detectRowWrap);
  window.addEventListener('resize', detectRowWrap);
}

function disableDetectRowWrap() {
  document.removeEventListener('load', detectRowWrap);
  window.removeEventListener('resize', detectRowWrap);
  document.querySelectorAll('.wrapped').forEach(el => el.classList.remove('wrapped'));
  document.querySelectorAll('.next-is-wrapped').forEach(el => el.classList.remove('next-is-wrapped'));
}

export function callDetectRowWrap() {
  if (detectRowWrapEnabled) {
    detectRowWrap();
  }
}

export function toggleDetectRowWrap() {
  detectRowWrapEnabled = !detectRowWrapEnabled;
  if (detectRowWrapEnabled) {
    enableDetectRowWrap();
    callDetectRowWrap();
  } else {
    disableDetectRowWrap();
  }
}
