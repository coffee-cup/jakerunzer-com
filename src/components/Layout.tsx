/** @jsx jsx */
import styled from "@emotion/styled";
import { MDXProvider } from "@mdx-js/react";
import css from "@styled-system/css";
import * as React from "react";
import Footer from "./Footer";
import Header from "./Header";
import SEO from "./SEO";
import { BlogTitle } from "./Text";
import { jsx } from "theme-ui";

export interface FrontMatter {
  title?: string;
  description?: string;
  date?: string;
}

export interface Props extends FrontMatter {
  noHeader?: boolean;
  _frontmatter?: FrontMatter;
}

const Content = styled.main(
  css({
    minHeight: props => `calc(100vh - ${props.sizes.header})`,
  }),
);

const Layout: React.FC<Props> = ({ children, ...rest }) => {
  const frontmatter = rest._frontmatter || rest || {};

  return (
    <MDXProvider>
      <SEO title={frontmatter.title} description={frontmatter.description} />

      <div
        className="wrapper"
        sx={{
          maxWidth: "container",
          mx: "auto",
          my: 0,
          px: [3, 4],
          py: 0,
        }}
      >
        {!rest.noHeader && <Header />}

        <Content>
          {frontmatter.title != null && (
            <BlogTitle title={frontmatter.title} date={frontmatter.date} />
          )}
          {children}
        </Content>

        <Footer />
      </div>
    </MDXProvider>
  );
};

export default Layout;
