/** @jsx jsx */
import dayjs from "dayjs";
import * as React from "react";
import { Box, Card, Flex, jsx, Text } from "theme-ui";
import { projects } from "../projects";
import { IPost, IProject, ISnippet } from "../types";
import Link from "./Link";

const getShortLink = (href: string): string =>
  href.replace("https://", "").replace("http://", "");

const formatDate = (date: Date | string): string =>
  dayjs(date).format("MMM DD, YYYY");

const Title: React.FC = props => (
  <Text
    {...props}
    className="title"
    variant="heading"
    sx={{
      fontSize: 3,
      pb: 2,
      transition: "all 150ms ease-in-out",
    }}
  />
);

const Info: React.FC = props => (
  <Text {...props} sx={{ color: "grey.400", fontSize: 0, pb: 2 }} />
);

const Desc: React.FC = props => (
  <Text {...props} sx={{ fontSize: 2, maxWidth: "measure", pb: 2 }} />
);

const EntryCard: React.FC<{ type: string; href: string }> = ({
  type,
  href,
  children,
  ...props
}) => (
  <Link variant="dim" href={href}>
    <Card
      {...props}
      sx={{
        mb: 4,

        "&:hover": {
          ".title": {
            color: "accent",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          px: 1,
          borderBottomLeftRadius: 2,
          fontSize: 1,
        }}
      >
        <span
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            bg: "accent",
            opacity: 0.6,
            borderBottomLeftRadius: 2,
            borderTopRightRadius: 4,
          }}
        />
        <span sx={{ position: "relative" }}>{type}</span>
      </Box>
      <Box>{children}</Box>
    </Card>
  </Link>
);

const LinkText: React.FC = props => (
  <Text
    {...props}
    sx={{
      maxWidth: "measure",
      fontSize: 1,
      textDecoration: "underline",
    }}
  />
);

export const ProjectEntry: React.FC<{ project: IProject }> = ({ project }) => {
  const shortLink = getShortLink(project.link);

  return (
    <EntryCard type={project.type} href={project.link}>
      <Title>{project.name}</Title>
      <Desc>{project.description}</Desc>
      <LinkText>{shortLink}</LinkText>
    </EntryCard>
  );
};

export const PostEntry: React.FC<{ post: IPost }> = ({ post }) => {
  return (
    <EntryCard type={post.type} href={post.link}>
      <Title>{post.title}</Title>
      <Desc>{post.excerpt}</Desc>
    </EntryCard>
  );
};

export const SnippetEntry: React.FC<{ snippet: ISnippet }> = ({ snippet }) => {
  return (
    <EntryCard type={snippet.type} href={snippet.link}>
      <Title>{snippet.title}</Title>
      <Desc>{snippet.description}</Desc>
    </EntryCard>
  );
};
