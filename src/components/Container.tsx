import * as React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  max-width: 48ch;
`;

const Container: React.FC = props => (
  <StyledContainer>{props.children}</StyledContainer>
);

export default Container;
