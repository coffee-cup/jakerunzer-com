/** @jsx jsx */
import { Box, Flex, jsx, Styled, Text } from "theme-ui";
import Layout from "../components/Layout";
import { ThemeSwitcher } from "../components/ThemeSwitcher";

const Projects: React.FC = () => {
  return (
    <Layout title="projects">
      <Flex sx={{ alignItems: "center", justifyContent: "center", py: 6 }}>
        <ThemeSwitcher size={200} />
      </Flex>
    </Layout>
  );
};

export default Projects;
