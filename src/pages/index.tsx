import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { Styled, jsx } from "theme-ui";
import { projects } from "../../content/projects";
import Layout from "../components/Layout";
import Link from "../components/Link";
import Project from "../components/Project";
import SEO from "../components/SEO";
import Container from "../components/Container";
import Section from "../components/Section";
import { Heading } from "../components/Text";
import Menu from "../components/Menu";

const Hero = styled(Styled.div)(
  css({
    display: "flex",
    alignItems: "center",
    color: "text",
  }),
);

const Description = styled(Styled.p)(
  css({
    maxWidth: "38ch",
    fontSize: 3,
    my: 3,
  }),
);

const StyledHome = styled(Styled.div)(
  css({
    display: "flex",
    alignItems: "center",
    minHeight: "100vh",
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
            Software engineer working at{" "}
            <Link to="https://prodo.dev">@prodo</Link> in London. I like to
            build web and iOS apps, as well as dig deep into compilers and
            functional programming.
          </Description>

          <Menu />
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
