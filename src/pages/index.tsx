/** @jsx jsx */
import * as React from "react";
import { Box, Heading, jsx, Styled, Text } from "theme-ui";
import { PostEntry, ProjectEntry, SnippetEntry } from "../components/Entry";
import Layout from "../components/Layout";
import Link from "../components/Link";
import { useLatest } from "../hooks/useLatest";

const Section: React.FC = props => <Box {...props} sx={{ py: [4, 4, 3] }} />;

const Home = () => {
  const entries = useLatest();
  return (
    <Layout large>
      <Box sx={{ py: 6 }}>
        <Text variant="display" as="h1" sx={{ mb: 3 }}>
          Jake Runzer
        </Text>
        <Text variant="heading" sx={{ fontSize: 3 }}>
          frontend focused software engineer
        </Text>
      </Box>

      <Box
        sx={{
          display: ["flex", "flex", "grid"],
          flexDirection: "column-reverse",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: [4, 5],
        }}
      >
        <Section>
          <Heading variant="section">Latest</Heading>

          <Box>
            {entries.map(entry => (
              <React.Fragment key={entry.link}>
                {entry.type === "project" ? (
                  <ProjectEntry project={entry} />
                ) : entry.type === "post" ? (
                  <PostEntry post={entry} />
                ) : entry.type === "snippet" ? (
                  <SnippetEntry snippet={entry} />
                ) : null}
              </React.Fragment>
            ))}
          </Box>
        </Section>

        <Section>
          <Heading variant="section">Hello</Heading>

          <Styled.p sx={{ maxWidth: "measure" }}>
            Welcome to my place on the web. I use this space to write about and
            share things I have learned and am working on.
          </Styled.p>

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
            <Link href="https://keybase.io/jakerunzer" sx={{ mr: 3 }}>
              keybase
            </Link>
            <Link href="mailto:jakerunzer.com" sx={{ mr: 3 }}>
              contact
            </Link>
          </Box>
        </Section>
      </Box>
    </Layout>
  );
};

export default Home;
