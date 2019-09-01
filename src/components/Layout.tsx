import { MDXProvider } from "@mdx-js/react";
import { Location } from "@reach/router";
import * as React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { H1, H2, H3 } from "../components/Header";
import { ExternalLink } from "../components/Link";
import { sizes, theme } from "../styles";

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

const components = {
  p: Text,
  h1: H1,
  h2: H2,
  h3: H3,
  a: ExternalLink,
};

const Layout: React.FC = ({ children }) => {
  return (
    <Location>
      {({}) => (
        <MDXProvider components={components}>
          <ThemeProvider theme={theme}>
            <>
              <GlobalStyle />
              <ContentWrapper>{children}</ContentWrapper>
            </>
          </ThemeProvider>
        </MDXProvider>
      )}
    </Location>
  );
};

export default Layout;
