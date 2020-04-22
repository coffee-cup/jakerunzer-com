import { SystemStyleObject } from "@styled-system/css";

export interface CodeColors {
  codeColor: string;
  codeBackgroundColor: string;
  changed: string;
  deleted: string;
  inserted: string;
  attrName: string;
  comment: string;
  string: string;
  url: string;
  variable: string;
  number: string;
  builtIn: string;
  char: string;
  constant: string;
  function: string;
  punctuation: string;
  selector: string;
  doctype: string;
  class: string;
  tag: string;
  operator: string;
  keyword: string;
  boolean: string;
  property: string;
  namespace: string;
}

export const darkCodeColors: CodeColors = {
  codeColor: "#d6deeb",
  codeBackgroundColor: "#011627",
  changed: "rgb(162, 191, 252)",
  deleted: "rgba(239, 83, 80, 0.56)",
  inserted: "rgb(173, 219, 103)",
  attrName: "rgb(173, 219, 103)",
  comment: "rgb(99, 119, 119)",
  string: "rgb(173, 219, 103)",
  url: "rgb(173, 219, 103)",
  variable: "rgb(214, 222, 235)",
  number: "rgb(247, 140, 108)",
  builtIn: "rgb(130, 170, 255)",
  char: "rgb(130, 170, 255)",
  constant: "rgb(130, 170, 255)",
  function: "rgb(130, 170, 255)",
  punctuation: "rgb(199, 146, 234)",
  selector: "rgb(199, 146, 234)",
  doctype: "rgb(199, 146, 234)",
  class: "rgb(255, 203, 139)",
  tag: "rgb(127, 219, 202)",
  operator: "rgb(127, 219, 202)",
  keyword: "rgb(127, 219, 202)",
  boolean: "rgb(255, 88, 116)",
  property: "rgb(128, 203, 196)",
  namespace: "rgb(178, 204, 214)",
};

export const lightCodeColors: CodeColors = {
  codeColor: "#403f53",
  codeBackgroundColor: "#FBFBFB",
  changed: "rgb(162, 191, 252)",
  deleted: "rgba(239, 83, 80, 0.56)",
  inserted: "rgb(72, 118, 214)",
  attrName: "rgb(72, 118, 214)",
  comment: "rgb(152, 159, 177)",
  string: "rgb(72, 118, 214)",
  url: "rgb(72, 118, 214)",
  variable: "rgb(201, 103, 101)",
  number: "rgb(170, 9, 130)",
  builtIn: "rgb(72, 118, 214)",
  char: "rgb(72, 118, 214)",
  constant: "rgb(72, 118, 214)",
  function: "rgb(153, 76, 195)",
  punctuation: "rgb(153, 76, 195)",
  selector: "rgb(153, 76, 195)",
  doctype: "rgb(153, 76, 195)",
  class: "rgb(17, 17, 17)",
  tag: "rgb(153, 76, 195)",
  operator: "rgb(12, 150, 155)",
  keyword: "rgb(12, 150, 155)",
  boolean: "rgb(188, 84, 84)",
  property: "rgb(12, 150, 155)",
  namespace: "rgb(12, 150, 155)",
};

export const codeStyles: SystemStyleObject = {
  // colors
  color: "codeColor",
  backgroundColor: "codeBackgroundColor",
  ".changed": { color: "changed" },
  ".deleted": { color: "deleted" },
  ".inserted": { color: "inserted" },
  ".attr-name": { color: "attrName" },
  ".comment": {
    fontStyle: "italic",
    color: "comment",
  },
  ".string": { color: "string" },
  ".builtin": { color: "builtin" },
  ".char": { color: "char" },
  ".constant": { color: "constant" },
  ".url": { color: "url" },
  ".variable": { color: "variable" },
  ".number": { color: "number" },
  ".punctuation": { color: "punctuation" },
  ".function": { color: "function" },
  ".selector": { color: "selector" },
  ".doctype": { color: "doctype" },
  ".class-name": { color: "class" },
  ".tag": { color: "tag" },
  ".operator": { color: "operator" },
  ".property": { color: "property" },
  ".keyword": { color: "keyword" },
  ".namespace": { color: "namespace" },
  ".boolean": { color: "boolean" },
};
