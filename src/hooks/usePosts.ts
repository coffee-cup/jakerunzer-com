/** @jsx jsx */
import { useMemo } from "react";
import { IPost } from "../types";
import { useMdxList } from "./useMdxList";

export const usePosts = (): IPost[] => {
  const pages = useMdxList("writing");
  const posts: IPost[] = useMemo(
    () =>
      pages.map(node => ({
        title: node.frontmatter.title,
        date: new Date(node.frontmatter.date),
        link: node.fields.slug,
        excerpt: node.excerpt,
        description: node.frontmatter.description,
        type: "post",
      })),
    [pages],
  );

  return posts;
};
