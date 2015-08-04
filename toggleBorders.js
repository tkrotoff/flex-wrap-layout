// See Changing CSS Values with Javascript http://stackoverflow.com/questions/566203
function addGlobalCSS(selector, css) {
  // Loop through all styles
  for (var i = 0; i < document.styleSheets.length; i++) {
    document.styleSheets[i].insertRule(
      selector + ' {' + css + '}',
      document.styleSheets[i].cssRules.length
    );
  }
}

function toggleBorders(checkbox) {
  if (checkbox.checked) {
    addGlobalCSS('[layout=row]', 'border: 1px solid');
    addGlobalCSS('[layout=column]', 'border: 1px solid');
  } else {
    addGlobalCSS('[layout=row]', 'border: 0');
    addGlobalCSS('[layout=column]', 'border: 0');
  }
}
