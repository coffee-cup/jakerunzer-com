import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import * as React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Link from "../components/Link";
import SEO from "../components/SEO";
import { Title } from "../components/Text";

interface Page {
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    index: boolean;
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
      nodes: Page[];
    };
  };
}

const getIndexPage = (pages: Page[]): Page =>
  pages.filter(p => p.frontmatter.index)[0];
const getDataPages = (pages: Page[]): Page[] =>
  pages.filter(p => !p.frontmatter.index);

const Pages = styled.ul`
  margin-left: 0;
  list-style: none;
`;

const Page = styled.li`
  padding: 0.5rem 0;
`;

const PageName = styled.h2`
  margin: 0;
`;

const Menu: React.FC<Props> = props => {
  const nodes = props.data.allMdx.nodes;

  const indexPage = getIndexPage(nodes);
  const dataPages = getDataPages(nodes);

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
      filter: { frontmatter: { category: { eq: $category } } }
      sort: { fields: frontmatter___title, order: ASC }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          index
        }
        body
        excerpt
      }
    }
  }
`;
