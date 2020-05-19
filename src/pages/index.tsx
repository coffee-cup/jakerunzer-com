/** @jsx jsx */
import * as React from "react";
import { Box, Flex, jsx, NavLink as TNavLink, Styled, Text } from "theme-ui";
import Layout from "../components/Layout";
import Link from "../components/Link";
import ProjectList from "../components/ProjectList";

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
  <Layout noHeader>
    <Box sx={{ py: 6 }}>
      {/* <Text
        variant="display"
        as="h1"
        sx={{ fontSize: [96, 128], ml: "-2px", mb: 2 }}
      >
        Hello.
      </Text> */}
      <Text variant="display" as="h1" sx={{ mb: 3 }}>
        Jake Runzer
      </Text>
      <Text variant="heading" sx={{ fontSize: 3 }}>
        Frontend focused software engineer
      </Text>
    </Box>

    {/* <Box>
      <Styled.p sx={{ maxWidth: "narrow" }}>
        Frontend focused software engineer based. <br /> I like to build things
        for the web and iOS, as well as dig deep into languages and compilers.
      </Styled.p>

      <Nav />
    </Box> */}

    <Box>
      <Text variant="heading" sx={{ pb: 3, fontSize: 4 }}>
        Projects
      </Text>

      <ProjectList />
    </Box>
  </Layout>
);

export default Home;
