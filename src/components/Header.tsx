/** @jsx jsx */
import * as React from "react";
import { Box, Flex, jsx } from "theme-ui";
import Link from "./Link";
import Nav from "./Nav";

const Header: React.FC<{ home?: string; noHome?: boolean }> = props => (
  <Flex
    sx={{
      py: 3,
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <Box sx={{ fontSize: 24, fontWeight: "bold", fontFamily: "heading" }}>
      <Link to={props.home || "/"} variant="header">
        {!props.noHome && "j."}
      </Link>
    </Box>

    <Nav />
  </Flex>
);

export default Header;
