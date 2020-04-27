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

const darkColor = "#171717";
const lightColor = "white";

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

const theme: Theme = {
  ...system,
  colors: {
    text: darkColor,
    background: lightColor,
    primary: darkColor,
    secondary: lightColor,
    accent: "#fbba72",
    muted: "#eff0f6",
    grey: "#777",
    ...lightCodeColors,

    modes: {
      dark: {
        ...darkCodeColors,
        text: lightColor,
        background: darkColor,
        primary: lightColor,
        secondary: darkColor,
        muted: "#313030",
        accent: "#c37620",
        grey: "#999",
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
    heading: `"Montserrat", ${font}`,
    monospace: "Consolas, Liberation Mono, Menlo, Courier, monospace",
  },

  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],

  sizes: {
    container: "48em",
    largeContainer: "64em",
    measure: "32em",
    narrow: "26em",
  },

  lineHeights: {
    body: 1.6,
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
    nav: {
      px: 2,
      py: 1,
      fontSize: 2,
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
      fontSize: 6,
    },
    h2: {
      variant: "textStyles.heading",
      fontSize: 5,
    },
    h3: {
      variant: "textStyles.heading",
      fontSize: 4,
      mb: 3,
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
    ".caption": {
      color: "grey",
      textAlign: "center",
      fontSize: 0,
    },
    img: {
      maxWidth: "100%",
    },
    p: {
      code: {
        color: "text",
        fontFamily: "monospace",
        p: "2px",
        borderRadius: "4px",
      },
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
    ul: {
      code: {
        color: "text",
        fontFamily: "monospace",
        p: "2px",
        borderRadius: "4px",
      },
    },
    li: {
      pb: 1,
    },
  },
};

export default theme;
