import { MDXProvider } from "@mdx-js/react";
import { Location } from "@reach/router";
import * as React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Footer from "./Footer";
import { H1, H2, H3 } from "../components/Text";
import { MdxLink } from "../components/Link";
import { sizes, theme } from "../styles";
import Code from "./Code";

const GlobalStyle = createGlobalStyle`
  body {
    background: ${props => props.theme.colours.bg}
    scroll-behavior: smooth;
  }
`;

const ContentWrapper = styled.div`
  margin: 0;
  padding: 0 2rem;
  max-width: 800px;
  margin: 0 auto;

  @media (min-width: ${sizes.phone}) {
    padding: 0 2rem;
  }
`;

const Content = styled.main`
  min-height: 100vh;
`;

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  a: MdxLink,
  pre: Code,
};

const Layout: React.FC = ({ children }) => {
  return (
    <Location>
      {({}) => (
        <MDXProvider components={components}>
          <ThemeProvider theme={theme}>
            <>
              <GlobalStyle />
              <ContentWrapper>
                <Content>{children}</Content>

                <Footer />
              </ContentWrapper>
            </>
          </ThemeProvider>
        </MDXProvider>
      )}
    </Location>
  );
};

export default Layout;
