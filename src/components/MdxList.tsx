/** @jsx jsx */
import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { jsx, Box, Styled } from "theme-ui";
import Link from "./Link";
import dayjs from "dayjs";

export interface Props {
  path: string;
}

const Item: React.FC<{ page: Page }> = ({ page }) => (
  <Box>
    <Styled.h4
      sx={{
        ...(page.frontmatter.date != null
          ? {
              mb: page.frontmatter.date != null ? 1 : "initial",
            }
          : {}),
      }}
    >
      <Link to={page.fields.slug} variant="mdxItem">
        {page.frontmatter.title}
      </Link>
    </Styled.h4>

    {page.frontmatter.date != null && (
      <span sx={{ color: "grey" }}>
        {dayjs(page.frontmatter.date).format("MMM DD, YYYY")}
      </span>
    )}
  </Box>
);

const MdxList: React.FC<Props> = props => {
  const data: QueryResult = useStaticQuery(query);
  const filtered = React.useMemo(
    () =>
      data.allMdx.nodes.filter(n =>
        n.fileAbsolutePath.includes(`/${props.path}/`),
      ),
    [],
  );

  console.log(filtered);

  return (
    <Box>
      {filtered.map(page => (
        <Item key={page.id} page={page} />
      ))}
    </Box>
  );
};

export default MdxList;

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
}

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
      }
    }
  }
`;
