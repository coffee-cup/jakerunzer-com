/** @jsx jsx */
import * as React from "react";
import { Box, Flex, jsx } from "theme-ui";
import Link from "./Link";
import Nav from "./Nav";

const Logo: React.FC = () => (
  <Box sx={{ width: 28, height: 28, bg: "accent", borderRadius: 150 }} />
);

const Header: React.FC<{ home?: string }> = props => (
  <Flex
    sx={{
      alignItems: "center",
      justifyContent: "space-between",
      py: 3,
    }}
  >
    <Box sx={{ fontSize: 24, fontWeight: "bold", fontFamily: "heading" }}>
      <Link to={props.home || "/"} variant="empty">
        <Logo />
      </Link>
    </Box>

    <Nav />
  </Flex>
);

export default Header;
