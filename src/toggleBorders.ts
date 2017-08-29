function toggleBorders() {
  const classList = document.body.classList;
  if (classList.contains('showBorders')) {
    classList.remove('showBorders');
  } else {
    classList.add('showBorders');
  }
}
