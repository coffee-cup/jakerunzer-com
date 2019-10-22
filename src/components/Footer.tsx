import * as React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  padding: 1rem 0;
`;

const Footer = () => (
  <StyledFooter>
    <h3>♥</h3>
  </StyledFooter>
);

export default Footer;
