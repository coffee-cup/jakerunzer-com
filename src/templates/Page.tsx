import { graphql } from "gatsby";
import * as React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Header from "../components/Header";
import { Title } from "../components/Text";

interface Page {
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    category: string;
    index: boolean;
  };
  body: string;
  excerpt: string;
}

interface Props {
  data: {
    mdx: Page;
  };
}

const Page: React.FC<Props> = props => {
  const page = props.data.mdx;

  return (
    <Layout>
      <SEO title={page.frontmatter.title} description={page.excerpt} />

      <Header home={page.frontmatter.category} />

      <Title>{page.frontmatter.title}</Title>
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
      }
      fields {
        slug
      }
      body
      excerpt
    }
  }
`;
