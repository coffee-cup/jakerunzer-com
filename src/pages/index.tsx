import * as React from "react";
import styled from "styled-components";
import { projects } from "../../content/projects";
import Layout from "../components/Layout";
import Link from "../components/Link";
import Project from "../components/Project";
import SEO from "../components/SEO";
import { Heading } from "../components/Text";

const links = [
  { text: "Github", href: "https://github.com/coffee-cup" },
  { text: "Keybase", href: "https://keybase.io/jakerunzer" },
  { text: "Twitter", href: "https://twitter.com/jakerunzer" },
];

const Hero = styled.div`
  display: flex;
  min-height: 70vh;
  align-items: center;
`;

const Description = styled.p`
  max-width: 38ch;
  margin: 1rem 0;
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
      <Link key={text} to={href}>
        {text}
      </Link>
    ))}
  </StyledNav>
);

const Home = () => {
  return (
    <Layout>
      <SEO />
      <StyledHome className="home">
        <Hero>
          <div>
            <Heading title="Hello." subtitle="I'm Jake 👋" />
            <Description>
              Software engineer <Link to="https://prodo.dev">@prodo</Link> in
              London
            </Description>

            <Nav links={links} />
          </div>
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
