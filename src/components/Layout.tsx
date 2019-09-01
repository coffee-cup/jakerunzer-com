import * as React from "react";
import styled from "styled-components";
import { ExternalLink } from "../components/Link";
import { H1, H2, H3 } from "../components/Header";
import { MDXProvider } from "@mdx-js/react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "../styles";
import { Location } from "@reach/router";

const GlobalStyle = createGlobalStyle`
  body {
    background: ${props => props.theme.colours.bg}
    scroll-behavior: smooth;
  }
`;

const ContentWrapper = styled.div`
  margin: 0;
  padding: 0 2rem;
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
