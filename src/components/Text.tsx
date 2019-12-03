import * as React from "react";
import styled from "@emotion/styled";
import { makeAnchor } from "../utils";
import { Styled } from "theme-ui";

export const H1: React.FC = props => (
  <h1 id={makeAnchor(props.children)} {...props} />
);
export const H2: React.FC = props => (
  <h2 id={makeAnchor(props.children)} {...props} />
);
export const H3: React.FC = props => <h3 {...props} />;

export const Title = styled.h1`
  font-size: 3em;
`;

export const Detail = styled.span`
  display: block;
  font-size: 0.9em;
  color: grey;
`;

const StyledHeading = styled.div`
  margin: 0;
  padding: 0;

  h1 {
    font-size: 6rem;
    margin: 0;
    padding-bottom: 0;
    margin-left: -8px;
  }

  h2 {
    font-size: 2.5rem;
    margin: 0;
    padding: 0;
  }
`;

interface Props {
  title: string;
  subtitle?: string;
}

export const Heading: React.FC<Props> = props => (
  <StyledHeading>
    <Styled.h1>{props.title}</Styled.h1>
    {props.subtitle && <Styled.h2>{props.subtitle}</Styled.h2>}
  </StyledHeading>
);
