import { toJson } from "really-relaxed-json";
import { fillTemplate } from "../utils";

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
    return fillTemplate(template ?? "", inputJS);
  } catch (err) {
    console.error(err);
    return `Error: ${err}`;
  }
}
