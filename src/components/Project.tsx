import * as React from "react";
import styled from "styled-components";
import Link from "./Link";

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
      <Link to={props.link}>{props.name}</Link>
    </ProjectName>
    <ProjectDesc>{props.desc}</ProjectDesc>
  </StyledProject>
);

export default Project;
