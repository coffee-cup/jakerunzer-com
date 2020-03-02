import styled from "@emotion/styled";
import css from "@styled-system/css";
import * as React from "react";
import { Styled } from "theme-ui";
import Layout from "../components/Layout";
import Link from "../components/Link";
import { Heading } from "../components/Text";

const links = [
  { text: "Github", href: "https://github.com/coffee-cup" },
  { text: "Keybase", href: "https://keybase.io/jakerunzer" },
  { text: "Twitter", href: "https://twitter.com/jakerunzer" },
  { text: "Writing", href: "/writing" },
  { text: "Projects", href: "/projects" },
];

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

const StyledMenu = styled.ul(
  css({
    listStyle: "none",
    pl: 0,
  }),
);

const MenuItem = styled.li(
  css({
    pl: 0,
    py: 1,
    fontWeight: "bold",
    fontSize: 2,
    textDecoration: "underline",
  }),
);

const Menu = () => (
  <StyledMenu>
    {links.map(l => (
      <MenuItem key={l.href}>
        <Link empty to={l.href}>
          {l.text}
        </Link>
      </MenuItem>
    ))}
  </StyledMenu>
);

const Home = () => (
  <Layout noHeader>
    <StyledHome className="home">
      <Hero>
        <div>
          <Heading title="Hello." subtitle="I'm Jake 👋" />
          <Description>
            Software engineer working at{" "}
            <Link to="https://prodo.dev">prodo</Link> in London. I like to
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
