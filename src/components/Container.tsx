import styled from "@emotion/styled";
import * as React from "react";

const StyledContainer = styled.div`
  max-width: 48ch;
`;

const Container: React.FC = props => (
  <StyledContainer>{props.children}</StyledContainer>
);

export default Container;
