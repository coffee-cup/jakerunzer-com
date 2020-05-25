/** @jsx jsx */
import * as React from "react";
import {
  Box,
  Flex,
  Heading,
  jsx,
  NavLink as TNavLink,
  Styled,
  Text,
} from "theme-ui";
import { PostEntry, ProjectEntry } from "../components/Entry";
import Layout from "../components/Layout";
import Link from "../components/Link";
import ProjectList from "../components/ProjectList";
import { useLatest } from "../hooks/useLatest";

const NavLink: React.FC<{ href: string }> = props => (
  <Box>
    <TNavLink as={Link} href={props.href}>
      {props.children}
    </TNavLink>
  </Box>
);

const Section: React.FC = props => <Box {...props} sx={{ py: 3 }} />;

const Home = () => {
  const entries = useLatest();
  console.log(entries);

  return (
    <Layout>
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
          frontend focused software engineer
        </Text>
      </Box>

      {/* <Box>
      <Styled.p sx={{ maxWidth: "narrow" }}>
        Frontend focused software engineer based. <br /> I like to build things
        for the web and iOS, as well as dig deep into languages and compilers.
      </Styled.p>

      <Nav />
    </Box> */}

      <Section>
        <Heading>Latest</Heading>

        <Box>
          {entries.map(entry => (
            <React.Fragment key={entry.link}>
              {entry.type === "project" ? (
                <ProjectEntry project={entry} />
              ) : entry.type === "post" ? (
                <PostEntry post={entry} />
              ) : null}
            </React.Fragment>
          ))}
        </Box>
      </Section>

      <Section>
        <Heading>Social and Stuff</Heading>

        <Box
          sx={{
            display: "flex",
          }}
        >
          <Link href="https://github.com/coffee-cup" sx={{ mr: 3 }}>
            github
          </Link>
          <Link href="https://twitter.com/jakerunzer" sx={{ mr: 3 }}>
            twitter
          </Link>
        </Box>
      </Section>
    </Layout>
  );
};

export default Home;
