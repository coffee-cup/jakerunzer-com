import { MDXProvider } from "@mdx-js/react";
import { Location } from "@reach/router";
import * as React from "react";
import { Styled } from "theme-ui";
import styled from "@emotion/styled";
import css from "@styled-system/css";
/* import Code from "./Code"; */
import Footer from "./Footer";

/* const GlobalStyle = createGlobalStyle` */
/* body { */
/* background: ${props => props.theme.colours.bg} */
/* scroll-behavior: smooth; */
/* } */
/* `; */

const ContentWrapper = styled(Styled.div)(
  css({
    fontFamily: "body",
    my: 0,
    mx: "auto",
    py: 0,
    px: 2,
  }),
);

const Content = styled.main(css({}));

/* const components = { */
/* h1: Styled.h1, */
/* h2: Styled.h2, */
/* h3: Styled.h3, */
/* h4: Styled.h4, */
/* a: MdxLink, */
/* }; */

/* const components = { */
/* h1: H1, */
/* h2: H2, */
/* h3: H3, */
/* a: MdxLink, */
/* pre: Code, */
/* }; */

const Layout: React.FC = ({ children }) => {
  return (
    <Location>
      {({}) => (
        <MDXProvider>
          <ContentWrapper>
            <Content>{children}</Content>

            <Footer />
          </ContentWrapper>
        </MDXProvider>
      )}
    </Location>
  );
};

export default Layout;
