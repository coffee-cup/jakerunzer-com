/** @jsx jsx */
import { useMemo } from "react";
import { ISnippet } from "../types";
import { useMdxList } from "./useMdxList";

export const useSnippets = (): ISnippet[] => {
  const pages = useMdxList("snippet");
  const snippets: ISnippet[] = useMemo(
    () =>
      pages.map(node => ({
        title: node.frontmatter.title,
        date: new Date(node.frontmatter.date),
        link: node.fields.slug,
        description: node.frontmatter.description,
        category: node.frontmatter.category,
        type: "snippet",
      })),
    [pages],
  );

  return snippets;
};
