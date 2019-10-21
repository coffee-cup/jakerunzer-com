import * as React from "react";
import styled from "styled-components";
import { ExternalLink } from "./Link";

const StyledProject = styled.div``;

const ProjectName = styled.h3``;

const ProjectDesc = styled.p``;

const Project: React.FC<{
  name: string;
  link: string;
  desc: string;
}> = props => (
  <StyledProject>
    <ProjectName>
      <ExternalLink href={props.link} target="_blank">
        {props.name}
      </ExternalLink>
    </ProjectName>
    <ProjectDesc>{props.desc}</ProjectDesc>
  </StyledProject>
);

export default Project;
