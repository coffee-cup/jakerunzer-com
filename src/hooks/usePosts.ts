/** @jsx jsx */
import { graphql, useStaticQuery } from "gatsby";
import { useMemo } from "react";
import { IPost } from "../types";

interface QueryResult {
  allMdx: {
    nodes: Page[];
  };
}

interface Page {
  id: string;
  frontmatter: {
    title: string;
    date: string;
  };
  fields: {
    slug: string;
  };
  fileAbsolutePath: string;
  excerpt: string;
}

export const usePosts = (): IPost[] => {
  const data: QueryResult = useStaticQuery(query);
  const posts: IPost[] = useMemo(
    () =>
      data.allMdx.nodes
        .filter(n => n.fileAbsolutePath.includes(`/writing`))
        .map(node => ({
          title: node.frontmatter.title,
          date: new Date(node.frontmatter.date),
          link: node.fields.slug,
          excerpt: node.excerpt,
          type: "post",
        })),
    [data],
  );

  return posts;
};

const query = graphql`
  {
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      nodes {
        id
        frontmatter {
          title
          date
        }
        fields {
          slug
        }
        fileAbsolutePath
        excerpt
      }
    }
  }
`;
