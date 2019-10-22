import * as React from "react";
import styled from "styled-components";
import Link from "./Link";

const StyledHeader = styled.header``;

const Header: React.FC<{ home?: string }> = props => (
  <StyledHeader>
    <Link to={props.home || "/"} empty>
      <h2>j.</h2>
    </Link>
  </StyledHeader>
);

export default Header;
