/** @jsx jsx */
import { MDXProvider } from "@mdx-js/react";
import * as React from "react";
import { Box, Flex, jsx } from "theme-ui";
import BlogTitle from "./BlogTitle";
import Footer from "./Footer";
import Header from "./Header";
import SEO from "./SEO";

export interface FrontMatter {
  title?: string;
  description?: string;
  date?: string;
}

export interface Props extends FrontMatter {
  noHeader?: boolean;
  _frontmatter?: FrontMatter;
  large?: boolean;
}

const Layout: React.FC<Props> = props => {
  const frontmatter = props._frontmatter || {};

  return (
    <MDXProvider>
      <SEO title={frontmatter.title} description={frontmatter.description} />

      <div
        className="wrapper"
        sx={{
          maxWidth: props.large ? "largeContainer" : "container",
          mx: "auto",
          my: 0,
          px: [3, 4],
          py: 0,
        }}
      >
        <Flex sx={{ minHeight: "100vh", flexDirection: "column" }}>
          {!props.noHeader && <Header />}

          <Box sx={{ flexGrow: 1 }}>
            {frontmatter.title != null && (
              <BlogTitle title={frontmatter.title} date={frontmatter.date} />
            )}

            {props.children}
          </Box>
        </Flex>

        <Footer />
      </div>
    </MDXProvider>
  );
};

export default Layout;
