/** @jsx jsx */
import * as React from "react";
import { Box, jsx, Text } from "theme-ui";
import { projects } from "../projects";
import Project from "./Project";
import { IProject } from "../types";

export interface Props {
  featured?: boolean;
}

const ProjectList: React.FC<Props> = ({ featured }) => {
  const filtered = featured ? projects.filter(p => p.featured) : projects;

  return (
    <Box>
      {filtered.map(p => (
        <Project project={p} key={p.name} />
      ))}
    </Box>
  );
};

export default ProjectList;
