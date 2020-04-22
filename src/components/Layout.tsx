/** @jsx jsx */
import { MDXProvider } from "@mdx-js/react";
import * as React from "react";
import { Box, Flex, jsx } from "theme-ui";
import Footer from "./Footer";
import Header from "./Header";
import SEO from "./SEO";
import { BlogTitle } from "./Text";

export interface FrontMatter {
  title?: string;
  description?: string;
  date?: string;
}

export interface Props extends FrontMatter {
  noHeader?: boolean;
  _frontmatter?: FrontMatter;
}

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
        <Flex sx={{ minHeight: "100vh", flexDirection: "column" }}>
          {!rest.noHeader && <Header />}

          <Box sx={{ flexGrow: 1 }}>
            {frontmatter.title != null && (
              <BlogTitle title={frontmatter.title} date={frontmatter.date} />
            )}

            {children}
          </Box>
        </Flex>

        <Footer />
      </div>
    </MDXProvider>
  );
};

export default Layout;
