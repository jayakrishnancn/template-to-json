export function save(field: string, value: string) {
  localStorage.setItem(field, value);
}
export function get(field: string): string | null {
  return localStorage.getItem(field);
}

export function fillTemplate(templateString, templateVars) {
  return new Function("return `" + templateString + "`;").call(templateVars);
}

export function exportText(fileName: string, data: string) {
  var a = document.createElement("a");
  var blob = new Blob([data], { type: "text/plain;charset=utf-8" }),
    url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
}

var readFile = function (event, onLoad: (text) => void) {
  var input = event.target;

  var reader = new FileReader();
  reader.onload = function () {
    onLoad(reader.result);
  };
  reader.readAsText(input.files[0]);
};
