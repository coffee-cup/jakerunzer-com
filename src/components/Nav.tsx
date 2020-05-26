/** @jsx jsx */
import { Moon, Sun } from "react-feather";
import {
  Box,
  Button,
  Flex,
  jsx,
  NavLink as TNavLink,
  useColorMode,
} from "theme-ui";
import Link from "./Link";

const ThemeSwitcher: React.FC = () => {
  const [colorMode, setColorMode] = useColorMode();

  const size = 18;

  return (
    <Button
      aria-label="theme switcher"
      onClick={() => setColorMode(colorMode === "default" ? "dark" : "default")}
      sx={{
        display: "flex",
        alignItems: "center",
        color: "text",
        bg: "transparent",
        border: "none",
        p: 2,

        "&:hover,&:focus,&:active": {
          color: "text",
          bg: "accent",
          boxShadow: "none",
        },
      }}
    >
      {colorMode === "default" ? <Moon size={size} /> : <Sun size={size} />}
    </Button>
  );
};

const NavLink: React.FC<{ href: string }> = props => (
  <TNavLink {...props} as={Link} href={props.href}>
    {props.children}
  </TNavLink>
);

const Nav: React.FC = () => {
  return (
    <Box
      as="nav"
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <NavLink href="/writing" sx={{ mr: 2 }}>
        posts
      </NavLink>
      <NavLink href="/projects" sx={{ mr: 2 }}>
        projects
      </NavLink>
      {/* <NavLink href="/snippets" sx={{ mr: 2 }}>
        snippets
      </NavLink> */}

      <ThemeSwitcher />
    </Box>
  );
};

export default Nav;
