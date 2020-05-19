/** @jsx jsx */
import * as React from "react";
import { Box, jsx, Text } from "theme-ui";
import { IProject } from "../types";
import Link from "./Link";

export interface Props {
  project?: IProject;
}

const Project: React.FC<Props> = ({ project }) => {
  const shortLink = project.link.replace("https://", "").replace("http://", "");

  return (
    <Box className="project" sx={{ py: 3 }}>
      <Link href={project.link} variant="dim" sx={{ display: "flex" }}>
        <Box
          className="project-image"
          sx={{
            backgroundColor: "violet",
            minWidth: 80,
            width: 80,
            height: 80,
            borderRadius: 4,
            mr: 4,
          }}
        />
        <Box className="project-desc">
          <Text variant="heading" sx={{ fontSize: 3 }}>
            {project.name}
          </Text>
          <Text sx={{ maxWidth: "measure", pt: 1 }}>{project.desc}</Text>
          <Text
            sx={{
              maxWidth: "measure",
              pt: 2,
              fontSize: 1,
              textDecoration: "underline",
            }}
          >
            {shortLink}
          </Text>
        </Box>
      </Link>
    </Box>
  );
};

export default Project;
