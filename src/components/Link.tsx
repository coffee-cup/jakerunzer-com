import { Link as GLink } from "gatsby";
import * as React from "react";
import styled from "styled-components";

const StyledGLink = styled(GLink)`
  color: ${props => props.theme.colours.accent};
  text-decoration: none;
  transition: opacity 150ms ease-in-out;

  &:hover {
    text-decoration: none;
    opacity: 0.6;
  }
`;

const Link = (props: any) => (
  <StyledGLink {...(props as any)}>
    <span>{props.children}</span>
  </StyledGLink>
);

export default Link;

export const ExternalLink = styled.a`
  color: ${props => props.theme.colours.accent};
  text-decoration: none;
  transition: opacity 150ms ease-in-out;

  &:hover {
    text-decoration: none;
    opacity: 0.6;
  }
`;
