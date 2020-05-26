/** @jsx jsx */
import { Box, jsx, Styled, Text } from "theme-ui";
import { ProjectEntry } from "../components/Entry";
import Layout from "../components/Layout";
import Link from "../components/Link";
import { useProjects } from "../hooks/useProjects";

const Section: React.FC = props => <Box {...props} sx={{ pb: 4 }} />;

const SectionHeading: React.FC = props => (
  <Text {...props} sx={{ pb: 3 }}>
    <span
      sx={{
        bg: "muted",
        p: 1,
        fontSize: 2,
        fontWeight: "bold",
        textTransform: "lowercase",
      }}
    >
      {props.children}
    </span>
  </Text>
);

const Projects: React.FC = () => {
  const projects = useProjects();

  return (
    <Layout title="projects">
      <Box>
        <Box sx={{ pb: 4 }}>
          <Styled.h1>Projects</Styled.h1>

          <Styled.p sx={{ maxWidth: "measure" }}>
            I love taking ideas and turning them into finished products. They
            range from iOS and web apps, to programming languages and devtools.
            Their source can be found on{" "}
            <Link href="https://github.com/coffee-cup">Github</Link>.
          </Styled.p>
        </Box>

        <Box>
          {projects.map(entry => (
            <ProjectEntry project={entry} categoryTag key={entry.link} />
          ))}
        </Box>
      </Box>
    </Layout>
  );

  // return (
  //   <Layout title="Projects">
  //     <Box>
  //       <Box sx={{ pb: 3 }}>
  //         <Styled.h1 sx={{ mb: 2 }}>Projects</Styled.h1>

  //         <Styled.p sx={{ maxWidth: "measure" }}>
  //           I love taking ideas and turning them into finished products. They
  //           range from iOS and web apps, to programming languages and devtools.
  //           Their source can be found on{" "}
  //           <Link href="https://github.com/coffee-cup">Github</Link>.
  //         </Styled.p>
  //       </Box>

  //       <Section>
  //         <SectionHeading>Apps</SectionHeading>
  //         <Project title="Chronicle" link="https://chronicle.ink">
  //           Lightweight journaling app where you record highlights of your day.
  //         </Project>

  //         <Project title="Tag Tester" link="https://tagtester.dev">
  //           Test and edit your websites HTML, open graph, and twitter metadata
  //           tags.
  //         </Project>

  //         <Project title="Solis" link="https://solisapp.xyz">
  //           iOS app that shows you the times of sunrise, sunset, twilight's, and
  //           golden hour.
  //         </Project>

  //         <Project title="Quiztastic" link="https://quiztastic.app">
  //           Web based trivia game for friends and family. Create games that can
  //           be joined by multiple people.
  //         </Project>

  //         <Project
  //           title="LastFM Leaderboards"
  //           link="https://lastfm.jakerunzer.com/"
  //         >
  //           Music leaderboards powered by Elm and last.fm.
  //         </Project>

  //         <Project title="Bowtie" link="https://bowtie.jakerunzer.com">
  //           Score keeping iOS app. Save paper when playing card or board games.
  //         </Project>
  //       </Section>

  //       <Section>
  //         <SectionHeading>Languages</SectionHeading>

  //         <Project title="Stck" link="https://stck.jakerunzer.com/">
  //           Minimal stack based esoteric programming language. Implemented in
  //           TypeScript. <Link href="/writing/stck">Associated blog post</Link>.
  //         </Project>

  //         <Project title="Krill" link="https://krill.jakerunzer.com/">
  //           Dynamic, curried, and minimal programming language. Implemented in
  //           Haskell. <Link href="/writing/krill">Associated blog post</Link>.
  //         </Project>

  //         <Project title="VRaw" link="https://vraw.surge.sh/">
  //           Programming language for drawing SVGs. You can create complex shapes
  //           by composing together simple ones.
  //         </Project>

  //         <Project title="Unnamed" link="https://github.com/coffee-cup/ul">
  //           Compiler written in Java for an imperative programming language
  //           targeting the JVM.
  //         </Project>
  //       </Section>

  //       <Section>
  //         <SectionHeading>Devtools</SectionHeading>

  //         <Project title="Favocon" link="https://crates.io/crates/favocon">
  //           Command line utility for creating favicons from an image.{" "}
  //           <Link href="/writing/favocon">Associated blog post</Link>.
  //         </Project>

  //         <Project title="cda" link="https://github.com/coffee-cup/cda">
  //           Create and manage cd aliases.
  //         </Project>
  //       </Section>

  //       <Section>
  //         <SectionHeading>Other</SectionHeading>

  //         <Project
  //           title="Currently Playing"
  //           link="https://currently-playing.now.sh/"
  //         >
  //           Experiement with the Spotify API and{" "}
  //           <Link href="https://github.com/Vibrant-Colors/node-vibrant">
  //             node vibrant
  //           </Link>
  //           . Your current playing song on Spotify is displayed with adynamic
  //           animated gradient.
  //         </Project>

  //         <Project title="Maze Generator" link="https://maze.jakerunzer.com/">
  //           Experimental maze generator based of the book{" "}
  //           <Link href="http://www.mazesforprogrammers.com/">
  //             <i>Mazes for Programmers</i>
  //           </Link>
  //           .
  //         </Project>

  //         <Project
  //           title="LastFM Albums"
  //           link="https://lastfm-albums.jakerunzer.com/"
  //         >
  //           View artwork grid of your top albums.
  //         </Project>

  //         <Project
  //           title="MBTI Predictor"
  //           link="https://github.com/coffee-cup/mbti"
  //         >
  //           LSTM neural network trained to predict a Myers Brigg personality
  //           type based on some text.
  //         </Project>

  //         <Project title="Soundz" link="https://soundz.jakerunzer.com/">
  //           Music identification using spectrogram based peak-pair hashing.
  //         </Project>

  //         <Project
  //           title="RTOS"
  //           link="https://uvic-csc460-group7.surge.sh/project2/index.html"
  //         >
  //           Real time operating system for the ATmega2560 AVR microcontroller.
  //         </Project>
  //       </Section>
  //     </Box>
  //   </Layout>
  // );
};

export default Projects;
