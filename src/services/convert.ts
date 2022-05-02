import { toJson } from "really-relaxed-json";
import { fillTemplate } from "../utils";

function stringifyTemplateObjectsAndAddThis(template: string | null): string {
  if (!template) return "";

  // eslint-disable-next-line no-template-curly-in-string
  return template.replace(/#{([^}]*)}/g, "${JSON.stringify(this.$1)}");
}

export function convert(
  template: string | null,
  input: string | null,
  rootKey: string = ""
): string {
  try {
    const inputStr = toJson(input ?? "{}");
    let inputJS = JSON.parse(inputStr);
    if (rootKey?.length) {
      const rootPath = rootKey.split(".");
      for (let key of rootPath) {
        inputJS = inputJS[key];
      }
    }
    template = stringifyTemplateObjectsAndAddThis(template);
    if (Array.isArray(inputJS)) {
      return inputJS
        .map((input) => fillTemplate(template ?? "", input))
        .join("");
    }
    return fillTemplate(template ?? "", inputJS);
  } catch (err) {
    console.error(err);
    return `Error: ${err}`;
  }
}
