import * as React from "react";
import styled from "styled-components";
import { sizes } from "../styles";
import { makeAnchor } from "../utils";

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

  @media (min-width: ${sizes.phone}) {
    h1 {
      font-size: 8rem;
    }
  }
`;

interface Props {
  title: string;
  subtitle?: string;
}

export const Heading: React.FC<Props> = props => (
  <StyledHeading>
    <h1>{props.title}</h1>
    {props.subtitle && <h2>{props.subtitle}</h2>}
  </StyledHeading>
);
