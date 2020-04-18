import { system } from "@theme-ui/presets";
import nightOwl from "@theme-ui/prism/presets/night-owl-light.json";
import { Theme } from "theme-ui";

const heading = {
  fontFamily: "heading",
  lineHeight: "heading",
  fontWeight: "heading",
};

const font = [
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Oxygen-Sans",
  "Ubuntu",
  "Cantarell",
  "Helvetica Neue",
  "sans-serif",
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
].join(",");

const baseLink = {
  color: "text",
  textDecoration: "underline",
  transition: "all 150ms ease-in-out",

  "&:hover": {
    bg: "accent",
  },
};

const theme: Theme = {
  ...system,
  colors: {
    text: "#171717",
    background: "white",
    primary: "#4d3ae2",
    secondary: "#89a6fb",
    accent: "#fbb13c",
    muted: "#eff0f6",
    grey: "#a2a2a2",
  },

  breakpoints: ["40em", "52em", "64em"],

  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },

  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],

  fonts: {
    body: font,
    heading: `"Montserrat", ${font}`,
    monospace: "Consolas, Liberation Mono, Menlo, Courier, monospace",
  },

  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],

  sizes: {
    container: "48em",
    measure: "32em",
    header: "6rem",
  },

  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },

  buttons: {
    primary: {
      color: "white",
      cursor: "pointer",
      py: 2,

      "&:hover": {
        bg: "black",
      },
    },
    secondary: {
      color: "text",
      backgroundColor: "muted",
      cursor: "pointer",

      "&:hover": {
        bg: "black",
        color: "white",
      },
    },
  },

  links: {
    header: {
      ...baseLink,
      textDecoration: "none",

      "&:hover": {
        ...baseLink["&:hover"],
        color: "text",
        bg: "accent",
      },
    },
    mdxItem: {
      ...baseLink,
      textDecoration: "none",

      "&:hover": {
        ...baseLink["&:hover"],
        bg: "accent",
      },
    },
    nav: {
      px: 2,
      py: 1,
      fontSize: 2,
    },
    empty: {
      ...baseLink,
      textDecoration: "none",

      "&:hover": {
        ...baseLink["&:hover"],
      },
    },
  },

  forms: {
    slider: {
      color: "primary",
    },
  },

  text: {
    heading,
    display: {
      variant: "textStyles.heading",
      fontSize: [5, 6],
      fontWeight: "heading",
      letterSpacing: "-0.03em",
      mt: 3,
    },
  },

  styles: {
    ...system.styles,
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    h1: {
      variant: "textStyles.display",
    },
    h2: {
      variant: "textStyles.heading",
      fontSize: 5,
    },
    h3: {
      variant: "textStyles.heading",
      fontSize: 4,
    },
    h4: {
      variant: "textStyles.heading",
      fontSize: 3,
    },
    h5: {
      variant: "textStyles.heading",
      fontSize: 2,
    },
    h6: {
      variant: "textStyles.heading",
      fontSize: 1,
    },
    a: baseLink,
    p: {
      code: {
        color: "text",
        p: "2px",
        borderRadius: "4px",
      },
    },
    ".caption": {
      color: "grey",
      textAlign: "center",
      fontSize: 0,
    },
    img: {
      maxWidth: "100%",
    },
    pre: {
      fontFamily: "monospace",
      fontSize: 1,
      p: 3,
      color: "text",
      bg: "muted",
      overflow: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      ...nightOwl,
      fontFamily: "monospace",
      backgroundColor: "muted",
      p: 2,
      borderRadius: "4px",
      fontSize: 1,
    },
    blockquote: {
      mt: 0,
      mx: 0,
      py: 0,
      pr: 0,
      pl: 3,
      borderLeft: "solid 4px hsla(0,0%,0%,0.13)",
      color: "hsla(0,0%,0%,0.53)",
    },
    ul: {},
    li: {
      pb: 1,
    },
  },
};

export default theme;
