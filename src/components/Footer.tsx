import * as React from "react";
import styled from "styled-components";
import Section from "./Section";

const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
`;

const Footer = () => (
  <StyledFooter>
    <Section>
      <h3>♥</h3>
    </Section>
  </StyledFooter>
);

export default Footer;
