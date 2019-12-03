import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { Styled } from "theme-ui";
import { projects } from "../../content/projects";
import Layout from "../components/Layout";
import Link from "../components/Link";
import Project from "../components/Project";
import SEO from "../components/SEO";
import Container from "../components/Container";
import Section from "../components/Section";
import { Heading } from "../components/Text";

const links = [
  { text: "Github", href: "https://github.com/coffee-cup" },
  { text: "Keybase", href: "https://keybase.io/jakerunzer" },
  { text: "Twitter", href: "https://twitter.com/jakerunzer" },
];

const Hero = styled(Styled.div)(
  css({
    display: "flex",
    minHeight: "70vh",
    alignItems: "center",
    color: "text",
  }),
);

const Description = styled(Styled.p)(
  css({
    maxWidth: "38ch",
    my: 1,
  }),
);

const StyledHome = styled(Styled.div)(
  css({
    pb: 1,
  }),
);

export interface Props {
  links: Array<{ text: string; href: string }>;
}

const StyledNav = styled.div(
  css({
    display: "flex",
  }),
);

const Nav: React.FC<Props> = props => (
  <StyledNav>
    {props.links.map(({ text, href }) => (
      <Link key={text} to={href}>
        {text}
      </Link>
    ))}
  </StyledNav>
);

const Home = () => (
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
    </StyledHome>
  </Layout>
);

/*
export const Home1 = () => {
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

        <Container>
          <Section>
            <h1>Projects</h1>

            <p>
              At any given moment I have 2-3 ongoing projects. They range from
              iOS or web apps to programming languages and small libraries.
            </p>

            {projects.map(p => (
              <Project key={p.name} name={p.name} link={p.link} desc={p.desc} />
            ))}
          </Section>
        </Container>
      </StyledHome>
    </Layout>
  );
};
*/

export default Home;
