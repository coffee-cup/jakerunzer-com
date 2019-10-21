import * as React from "react";
import styled from "styled-components";
import { Heading } from "../components/Header";
import Layout from "../components/Layout";
import { ExternalLink } from "../components/Link";
import SEO from "../components/SEO";
import { sizes } from "../styles";
import Project from "../components/Project";
import { projects } from "../../content/projects";

const links = [
  { text: "Github", href: "https://github.com/coffee-cup" },
  { text: "Keybase", href: "https://keybase.io/jakerunzer" },
  { text: "Twitter", href: "https://twitter.com/jakerunzer" },
];

const Hero = styled.div`
  padding: 11rem 0;

  @media (min-width: ${sizes.phone}) {
    padding: 18rem 0;
  }
`;

const Description = styled.p`
  max-width: 38ch;
  margin-bottom: 1.5rem;
  margin-top: 0;
`;

const Projects = styled.div`
  max-width: 48ch;
`;

const StyledHome = styled.div`
  padding-bottom: 1rem;
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
      <StyledHome className="home">
        <Hero>
          <Heading title="Hello." subtitle="I'm Jake 👋" />
          <Description>
            Software engineer{" "}
            <ExternalLink href="https://prodo.dev">@prodo</ExternalLink> in
            London
          </Description>

          <Nav links={links} />
        </Hero>

        <Projects>
          <h1>Projects</h1>

          {projects.map(p => (
            <Project key={p.name} name={p.name} link={p.link} desc={p.desc} />
          ))}
        </Projects>
      </StyledHome>
    </Layout>
  );
};

export default Home;
