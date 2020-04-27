/** @jsx jsx */
import { Box, jsx, Text } from "theme-ui";

const Footer = () => (
  <Box
    as="footer"
    sx={{
      py: 4,
      fontSize: 4,
    }}
  >
    <span sx={{ color: "crimson" }}>&hearts;</span>
  </Box>
);

export default Footer;
