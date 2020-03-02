import { Link as GLink } from "gatsby";
import * as React from "react";
import { Link as TLink } from "theme-ui";

export interface Props {
  to?: string;
  href?: string;
  target?: string;
  variant?: string;
  className?: string;
}

const isExternalLink = (href: string): boolean =>
  href.startsWith("http://") || href.startsWith("https://");

const Link: React.FC<Props> = props => {
  const href = props.href || props.to;
  if (isExternalLink(href)) {
    return (
      <TLink href={href} target="_blank" rel="noopener" {...props}>
        {props.children}
      </TLink>
    );
  }

  return (
    <TLink as={GLink} to={href} {...props}>
      {props.children}
    </TLink>
  );
};

export default Link;
