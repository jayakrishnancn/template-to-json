import { StoredItems } from "./enums";
/* eslint-disable no-template-curly-in-string */
const sampleTemplateData =
  'Hi ${this.str} to JSON template converter.\n\nto print number in the root object, you can use #{num}, \n if root object is an array the template will loop, try changing the root field to "arr" \n\n use #{objA} to print objects, this will apply JSON.stringify behind this scenes.\n\nAlternatively you can use \n${JSON.stringify(this.objA)}';

const sampleJSONData = JSON.stringify({
  str: "welcome",
  num: 2022,
  objA: {
    author: "jayakrishnan",
    bio: "https://jayakrishnancn.github.io",
    github: "https://github.com/jayakrishnancn",
  },
  arr: [
    {
      str: "welcome again",
      num: 2023,
      objA: {
        author: "jayakrishnancn",
        blog: "https://jayakrishnancn.netlify.app/",
      },
    },
  ],
});

const getSampleData = (title: string) => {
  if (title === StoredItems.template) return sampleTemplateData;
  if (title === StoredItems.inputJSON) return sampleJSONData;
  return "";
};

export default getSampleData;
