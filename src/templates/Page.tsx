import { graphql } from "gatsby";
import styled from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";
import * as React from "react";
import Header from "../components/Header";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { formatDate } from "../utils";

interface Page {
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    category: string;
    index: boolean;
    date?: string;
  };
  body: string;
  excerpt: string;
}

interface Props {
  data: {
    mdx: Page;
  };
}

const DateTitle = styled.div`
  margin-bottom: 1.5rem;

  h1 {
    font-size: 3em;
    margin-bottom: 0.5rem;
  }

  span {
    display: block;
    font-size: 0.95em;
    color: grey;
  }
`;

const Page: React.FC<Props> = props => {
  const page = props.data.mdx;

  return (
    <Layout>
      <SEO title={page.frontmatter.title} description={page.excerpt} />

      <Header home={page.frontmatter.category} />

      <DateTitle>
        <h1>{page.frontmatter.title}</h1>
        {page.frontmatter.date && (
          <span>{formatDate(page.frontmatter.date)}</span>
        )}
      </DateTitle>
      <MDXRenderer>{page.body}</MDXRenderer>
    </Layout>
  );
};

export default Page;

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        category
        index
        date
      }
      fields {
        slug
      }
      body
      excerpt
    }
  }
`;
