/** @jsx jsx */
import dayjs from "dayjs";
import * as React from "react";
import { Box, Flex, jsx, Text } from "theme-ui";
import { IPost, IProject } from "../types";
import Link from "./Link";

const getShortLink = (href: string): string =>
  href.replace("https://", "").replace("http://", "");

const formatDate = (date: Date | string): string =>
  dayjs(date).format("MMM DD, YYYY");

const Container: React.FC<any> = props => <Box {...props} sx={{ py: 3 }} />;

const Title: React.FC = props => (
  <Text {...props} variant="heading" sx={{ fontSize: 3, pb: 0 }} />
);

const Info: React.FC = props => (
  <Text {...props} sx={{ color: "grey.400", fontSize: 0, pb: 2 }} />
);

const Desc: React.FC = props => (
  <Text {...props} sx={{ fontSize: 2, maxWidth: "measure", pb: 2 }} />
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
    <Container className="project">
      <Link href={project.link} variant="dim" sx={{}}>
        <Title>{project.name}</Title>
        <Info>project -- {formatDate(project.date)}</Info>
        <Desc>{project.description}</Desc>
        <LinkText>{shortLink}</LinkText>
      </Link>
    </Container>
  );
};

export const PostEntry: React.FC<{ post: IPost }> = ({ post }) => {
  return (
    <Container className="post">
      <Link href={post.link} variant="dim" sx={{ display: "flex" }}>
        <Box>
          <Title>{post.title}</Title>
          <Info>post</Info>
          <Desc>{post.excerpt}</Desc>
        </Box>
      </Link>
    </Container>
  );
};
