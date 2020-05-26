export type IEntry = IProject | IPost | ISnippet;

export type ProjectCategory = "web" | "ios" | "language" | "devtool";

export interface IProject {
  name: string;
  description: string;
  link: string;
  category: ProjectCategory;
  date: Date;
  type: "project";
}

export interface IPost {
  title: string;
  link: string;
  excerpt: string;
  description: string;
  date: Date;
  type: "post";
}

export interface ISnippet {
  title: string;
  description: string;
  category: string;
  link: string;
  date: Date;
  type: "snippet";
}
