import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import * as React from "react";
import styled from "@emotion/styled";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Link from "../components/Link";
import SEO from "../components/SEO";
import { Title } from "../components/Text";
import { formatDate } from "../utils";
import css from "@styled-system/css";

interface IPage {
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    index: boolean;
    date?: string;
  };
  body: string;
  excerpt: string;
}

interface Props {
  pathContext: {
    category: string;
  };
  data: {
    allMdx: {
      nodes: IPage[];
    };
  };
}

const getIndexPage = (pages: IPage[]): IPage =>
  pages.filter(p => p.frontmatter.index)[0];
const getDataPages = (pages: IPage[]): IPage[] =>
  pages.filter(p => !p.frontmatter.index);

const Pages = styled.ul(
  css({
    listStyle: "none",
    pl: 0,
  }),
);

const Page = styled.li(
  css({
    py: 1,
  }),
);

const PageName = styled.h2(
  css({
    m: 0,
    pb: 0,
  }),
);

const PageDate = styled.span(
  css({
    m: 0,
    color: "muted",
    fontSize: 1,
  }),
);

const Menu: React.FC<Props> = props => {
  const nodes = props.data.allMdx.nodes;

  const indexPage = getIndexPage(nodes);
  const dataPages = getDataPages(nodes).sort((a, b) =>
    a.frontmatter.date && b.frontmatter.date
      ? new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      : 0,
  );

  return (
    <Layout>
      <SEO
        title={indexPage.frontmatter.title}
        description={indexPage.excerpt}
      />

      <Header />

      <Title>{indexPage.frontmatter.title}</Title>
      <MDXRenderer>{indexPage.body}</MDXRenderer>

      <div>
        <Pages>
          {dataPages.map(n => (
            <Page key={n.fields.slug}>
              <Link to={n.fields.slug} empty>
                <PageName>{n.frontmatter.title}</PageName>
                {n.frontmatter.date && (
                  <PageDate>{formatDate(n.frontmatter.date)}</PageDate>
                )}
              </Link>
            </Page>
          ))}
        </Pages>
      </div>
    </Layout>
  );
};

export default Menu;

export const query = graphql`
  query($category: String!) {
    allMdx(
      filter: {
        frontmatter: { category: { eq: $category }, draft: { ne: true } }
      }
      sort: { fields: frontmatter___title, order: ASC }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          index
          date
        }
        body
        excerpt
      }
    }
  }
`;
