/** @jsx jsx */
import * as React from "react";
import { Box, Flex, jsx, NavLink as TNavLink, Styled, Text } from "theme-ui";
import Layout from "../components/Layout";
import Link from "../components/Link";

const NavLink: React.FC<{ href: string }> = props => (
  <Box>
    <TNavLink as={Link} href={props.href}>
      {props.children}
    </TNavLink>
  </Box>
);

const Nav: React.FC = () => (
  <Box as="nav">
    <NavLink href="https://github.com/coffee-cup">github</NavLink>
    <NavLink href="https://twitter.com/jakerunzer">twitter</NavLink>
    <NavLink href="/writing">writing</NavLink>
    <NavLink href="/projects">projects</NavLink>
  </Box>
);

const Home = () => (
  <Layout noHome>
    <Box sx={{ pt: [5, 6], pb: 2 }}>
      <Text variant="display" as="h1" sx={{ fontSize: [96, 128], ml: "-8px" }}>
        Hello.
      </Text>
      <Text variant="heading" as="h2" sx={{ fontSize: 5 }}>
        I'm Jake 👋
      </Text>
    </Box>

    <Box>
      <Styled.p sx={{ maxWidth: "narrow" }}>
        Frontend focused software engineer based out of London. I like to build
        things for the web and iOS, as well as dig deep into languages and
        compilers.
      </Styled.p>

      <Nav />
    </Box>
  </Layout>
);

export default Home;
