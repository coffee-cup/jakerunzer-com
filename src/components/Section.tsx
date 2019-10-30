import * as React from "react";
import styled from "styled-components";

const StyledSection = styled.div`
  padding: 3rem 0;
`;

const Section: React.FC = props => (
  <StyledSection>{props.children}</StyledSection>
);

export default Section;
