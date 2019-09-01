import * as React from "react";
import { Link as GLink, GatsbyLinkProps } from "gatsby";
import styled from "styled-components";

const StyledGLink = styled(GLink)`
  color: ${props => props.theme.colours.secondary}
  text-decoration: none;
  transition: opacity 150ms ease-in-out;

  &:hover {
    text-decoration: none;
    opacity: 0.6;
  }
`;

const Link: React.FC<GatsbyLinkProps<{}>> = props => (
  <StyledGLink color="secondary" {...(props as any)}>
    <span>{props.children}</span>
  </StyledGLink>
);

export default Link;

export const ExternalLink: React.FC<GatsbyLinkProps<{}>> = props => (
  <Link as="a" {...(props as any)} />
);
