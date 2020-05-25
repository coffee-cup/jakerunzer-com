export type IEntry = IProject | IPost | ISnippet;

export type ProjectCategory = "app" | "language" | "devtool";

export interface IProject {
  name: string;
  description: string;
  link: string;
  date: Date;
  type: "project";
}

export interface IPost {
  title: string;
  link: string;
  excerpt: string;
  date: Date;
  type: "post";
}

export interface ISnippet {
  name: string;
  description: string;
  category: string;
  link: string;
  date: Date;
  type: "snippet";
}
