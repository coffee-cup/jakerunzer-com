import { Link as GLink } from "gatsby";
import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";

const StyledLink = styled(GLink)<{ empty: number }>(props =>
  css({
    color: props.empty ? "inherit" : "primary",
    textDecoration: "none",
    transition: "opacity 250ms ease-in-out",

    "&:hover": {
      textDecoration: "none",
      opacity: 0.6,
    },
  }),
);

export interface Props {
  to: string;
  href?: string;
  empty?: boolean;
  target?: string;
  className?: string;
}

const isExternalLink = (href: string): boolean =>
  href.startsWith("http://") || href.startsWith("https://");

const Link: React.FC<Props> = props => {
  const href = props.href || props.to;
  if (isExternalLink(href)) {
    const StyledLinkAny = StyledLink as any;

    return (
      <StyledLinkAny
        as="a"
        href={href}
        target="_blank"
        rel="noopener"
        {...{ ...props, empty: props.empty ? 1 : 0 }}
      >
        {props.children}
      </StyledLinkAny>
    );
  }

  return (
    <StyledLink to={href} {...{ ...props, empty: props.empty ? 1 : 0 }}>
      {props.children}
    </StyledLink>
  );
};

export default Link;

export const EmptyLink: React.FC<Props> = props => (
  <Link empty={true} {...props} />
);

export const MdxLink: React.FC<any> = props => {
  return <Link {...props} />;
};
