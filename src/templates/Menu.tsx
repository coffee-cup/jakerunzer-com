import { graphql } from "gatsby";
import * as React from "react";
import styled from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "../components/Layout";
import Link from "../components/Link";
import SEO from "../components/SEO";
import Header from "../components/Header";
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
  padding: 1rem 0;
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
      <SEO />

      <Header />

      <Title>{indexPage.frontmatter.title}</Title>
      <MDXRenderer>{indexPage.body}</MDXRenderer>

      <div>
        <Pages>
          {dataPages.map(n => (
            <Page key={n.fields.slug}>
              <Link to={n.fields.slug}>
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
    allMdx(filter: { frontmatter: { category: { eq: $category } } }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          index
        }
        body
      }
    }
  }
`;
