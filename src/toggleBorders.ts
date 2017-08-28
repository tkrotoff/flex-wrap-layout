// See Changing CSS Values with Javascript http://stackoverflow.com/questions/566203
function addGlobalCSS(selector: string, css: string) {
  // Loop through all styles
  for (var i = 0; i < document.styleSheets.length; i++) {
    const styleSheet = document.styleSheets[i] as CSSStyleSheet;
    styleSheet.insertRule(
      selector + ' {' + css + '}',
      styleSheet.cssRules.length
    );
  }
}

function toggleBorders(checkbox: HTMLInputElement) {
  if (checkbox.checked) {
    addGlobalCSS('[layout=row]', 'border: 1px solid');
    addGlobalCSS('[layout=column]', 'border: 1px solid');
  } else {
    addGlobalCSS('[layout=row]', 'border: 0');
    addGlobalCSS('[layout=column]', 'border: 0');
  }
}
