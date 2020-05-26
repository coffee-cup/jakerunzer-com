/** @jsx jsx */
import { graphql, useStaticQuery } from "gatsby";
import { useMemo } from "react";

interface QueryResult {
  allMdx: {
    nodes: Page[];
  };
}

export interface Page {
  id: string;
  frontmatter: {
    title: string;
    date: string;
    category?: string;
    description?: string;
  };
  fields: {
    slug: string;
  };
  fileAbsolutePath: string;
  excerpt: string;
}

export const useMdxList = (path: string): Page[] => {
  const data: QueryResult = useStaticQuery(query);
  const pages: Page[] = useMemo(
    () =>
      data.allMdx.nodes.filter(n => n.fileAbsolutePath.includes(`/${path}`)),
    [data],
  );

  return pages;
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
          category
          description
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
