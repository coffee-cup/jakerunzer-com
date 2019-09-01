import * as React from "react";
import styled from "styled-components";
import { Heading } from "../components/Header";
import Layout from "../components/Layout";
import { ExternalLink } from "../components/Link";
import SEO from "../components/SEO";
import { sizes } from "../styles";

const links = [
  { text: "Github", href: "" },
  { text: "Keybase", href: "" },
  { text: "Twitter", href: "" },
];

const Hero = styled.div`
  padding: 11rem 0;

  @media (min-width: ${sizes.phone}) {
    padding: 18rem 0;
  }
`;

export const StyledHome = styled.div`
  .description {
    max-width: 38ch;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }

  .projects {
    max-width: 48ch;
  }
`;

export interface Props {
  links: Array<{ text: string; href: string }>;
}

const StyledNav = styled.div`
  display: flex;

  a {
    font-weight: bold;
    padding: 0 1.5rem;

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }
  }
`;

const Nav: React.FC<Props> = props => (
  <StyledNav>
    {props.links.map(({ text, href }) => (
      <ExternalLink key={text} href={href}>
        {text}
      </ExternalLink>
    ))}
  </StyledNav>
);

const Home = () => {
  return (
    <Layout>
      <SEO />
      <div className="home">
        <Hero>
          <Heading title="Hello." subtitle="I'm Jake 👋" />
          <p className="description">
            Software engineer{" "}
            <ExternalLink href="https://prodo.dev">@prodo</ExternalLink> in
            London
          </p>

          <Nav links={links} />
        </Hero>
      </div>
    </Layout>
  );
};

export default Home;
