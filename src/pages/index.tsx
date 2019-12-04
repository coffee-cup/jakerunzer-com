import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { Styled } from "theme-ui";
import Layout from "../components/Layout";
import Link from "../components/Link";
import { Heading } from "../components/Text";
import Menu from "../components/Menu";

const Hero = styled(Styled.div)(
  css({
    display: "flex",
    alignItems: "center",
    color: "text",
  }),
);

const Description = styled(Styled.p)(
  css({
    maxWidth: "38ch",
    my: 3,

    a: {
      color: "primary",
      textDecoration: "none",
    },
  }),
);

const StyledHome = styled(Styled.div)(
  css({
    display: "flex",
    alignItems: "center",
    minHeight: "100vh",
    pb: 1,
  }),
);

const Home = () => (
  <Layout noHeader>
    <StyledHome className="home">
      <Hero>
        <div>
          <Heading title="Hello." subtitle="I'm Jake 👋" />
          <Description>
            Software engineer working at{" "}
            <Link to="https://prodo.dev">@prodo</Link> in London. I like to
            build web and iOS apps, as well as dig deep into React, compilers,
            and functional programming.
          </Description>

          <Menu />
        </div>
      </Hero>
    </StyledHome>
  </Layout>
);

export default Home;
