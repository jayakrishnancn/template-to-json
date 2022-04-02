export function disableTabOut(e) {
  if (e.key === "Tab") {
    e.preventDefault();
    const target = e.target;
    // get caret position/selection
    var val = target.value,
      start = target.selectionStart,
      end = target.selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    target.value = val.substring(0, start) + "\t" + val.substring(end);

    // put caret at right position again
    target.selectionStart = target.selectionEnd = start + 1;

    // prevent the focus lose
    return false;
  }
}
