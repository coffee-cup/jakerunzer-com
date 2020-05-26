import { SystemStyleObject } from "@styled-system/css";
import system from "@theme-ui/preset-system";
import { Theme } from "theme-ui";
import { codeStyles, darkCodeColors, lightCodeColors } from "./code";

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

const baseLink: SystemStyleObject = {
  color: "text",
  textDecoration: "underline",
  transition: "all 150ms ease-in-out",
  cursor: "pointer",

  "&:hover,&:focus,&:active": {
    color: "text",
    bg: "accent",
  },
};

const baseInput: SystemStyleObject = {
  borderRadius: 0,
  borderWidth: 1,

  "&:focus": {
    borderColor: "accent",
    outline: "none",
  },

  "&.error": {
    borderColor: "error",
  },
};

const baseButton: SystemStyleObject = {
  color: "secondary",
  bg: "primary",
  cursor: "pointer",
  py: 1,
  borderRadius: 0,
  border: "solid 2px",
  borderColor: "currentColor",
  transition: "all 150ms ease-in-out",

  "&:hover,&:focus,&:active": {
    color: "primary",
    bg: "secondary",
  },
};

const inlineCodeStyles: SystemStyleObject = {
  color: "text",
  fontFamily: "monospace",
  p: "2px",
  borderRadius: "4px",
};

const baseColors = {
  black: "#171717",
  white: "#ffffff",
  darkPink: "#F74F57",
  lightPink: "#F4989C",
};

const theme: Theme = {
  ...system,
  colors: {
    ...lightCodeColors,
    text: baseColors.black,
    background: baseColors.white,
    primary: baseColors.black,
    secondary: baseColors.white,
    accent: baseColors.lightPink,
    muted: "#eff0f6",
    grey: {
      50: "#f5f5f5",
      100: "#eeeeee",
      200: "#e0e0e0",
      300: "#bdbdbd",
      400: "#9e9e9e",
      500: "#757575",
      600: "#616161",
      700: "#424242",
      800: "#212121",
    },

    modes: {
      dark: {
        ...darkCodeColors,
        text: baseColors.white,
        background: baseColors.black,
        primary: baseColors.white,
        secondary: baseColors.black,
        accent: baseColors.darkPink,
        muted: "#313030",
        grey: {
          50: "#c2c2c2",
          100: "#bcbcbc",
          200: "#aeaeae",
          300: "#8d8d8d",
          400: "#707070",
          500: "#494949",
          600: "#373737",
          700: "#1b1b1b",
          800: "#000000",
        },
      },
    },
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
    heading: `"Rubik", serif, ${font}`,
    monospace: "Consolas, Liberation Mono, Menlo, Courier, monospace",
  },

  fontSizes: [9, 12, 16, 22, 28, 38, 50, 68],

  sizes: {
    container: "48em",
    largeContainer: "64em",
    measure: "32em",
    narrow: "26em",
  },

  lineHeights: {
    body: 1.65,
    heading: 1.125,
  },

  buttons: {
    primary: baseButton,
    icon: {
      ...baseButton,
      display: "flex",
      alignItems: "center",
      borderRadius: 0,
      cursor: "pointer",
    },
  },

  links: {
    button: {
      ...baseButton,
      px: 3,
      textDecoration: "none",
      display: "inline-block",
    },
    contact: {},
    nav: {
      px: 2,
      py: 1,
      fontSize: 2,
      fontFamily: "heading",
    },
    mdxItem: {
      ...baseLink,
      textDecoration: "none",
    },
    header: {
      ...baseLink,
      textDecoration: "none",
      px: 3,
      py: 2,

      "&:hover,&:focus,&:active": {
        color: "text",
        bg: "accent",
      },
    },
    dim: {
      ...baseLink,
      textDecoration: "none",

      "&:hover,&:focus,&:active": {
        opacity: 0.8,
      },
    },
    empty: {
      ...baseLink,
      textDecoration: "none",
    },
  },

  forms: {
    input: baseInput,
    logInput: {
      ...baseInput,
    },
    slider: {
      color: "primary",
    },
    textarea: {
      borderRadius: 0,
      borderColor: "grey",
      resize: "vertical",
      maxHeight: "200px",
      fontSize: 2,
      fontFamily: "body",

      "&:focus": {
        outline: "none",
        borderColor: "accent",
      },
    },
  },

  text: {
    heading: {
      ...heading,
    },
    display: {
      ...heading,
      fontSize: [5, 6],
      fontWeight: "heading",
      letterSpacing: "-0.03em",
      mt: 3,
    },
    section: {
      ...heading,
      mb: 3,
      fontSize: 2,
      fontWeight: "heading",
      color: "accent",
      textTransform: "uppercase",
    },
  },

  cards: {
    primary: {
      position: "relative",
      px: [3, 4],
      py: 4,
      borderRadius: 4,
      // boxShadow: "0 0 40px rgba(0, 0, 0, 0.125)",
      backgroundColor: "muted",
      maxWidth: 512,
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
      fontSize: 6,
      mt: 0,
      lineHeight: 1.15,
    },
    h2: {
      variant: "textStyles.heading",
      fontSize: 5,
      margin: "2.75rem 0 1.05rem",
      lineHeight: 1.15,
    },
    h3: {
      variant: "textStyles.heading",
      fontSize: 4,
      margin: "2.75rem 0 1.05rem",
      lineHeight: 1.15,
    },
    h4: {
      variant: "textStyles.heading",
      fontSize: 3,
      margin: "2.75rem 0 1.05rem",
      lineHeight: 1.15,
    },
    h5: {
      variant: "textStyles.heading",
      fontSize: 2,
      margin: "2.75rem 0 1.05rem",
      lineHeight: 1.15,
    },
    h6: {
      variant: "textStyles.heading",
      fontSize: 1,
    },
    p: {
      code: inlineCodeStyles,
      fontSize: 2,
      lineHeight: 1.65,
      mb: "1.15rem",
    },
    a: baseLink,
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
      ...codeStyles,
      color: "text",
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
      borderLeft: "solid 4px",
      borderColor: "grey",
      color: "grey",
    },
    ol: {
      code: inlineCodeStyles,
    },
    ul: {
      code: inlineCodeStyles,
    },
    li: {
      pb: 1,
    },
  },
};

export default theme;
