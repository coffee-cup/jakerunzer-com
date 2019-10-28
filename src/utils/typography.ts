import gray from "gray-percentage";
import Typography from "typography";
import CodePlugin from "typography-plugin-code";

const fontFamilies = [
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
];

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.625,
  scaleRatio: 2,
  bodyColor: "hsla(0,0%,0%,0.8)",
  headerWeight: 600,
  bodyWeight: "normal",
  boldWeight: 600,
  blockMarginBottom: 1 / 2,
  headerFontFamily: ["Montserrat", ...fontFamilies],
  bodyFontFamily: [...fontFamilies],
  googleFonts: [
    {
      name: "Montserrat",
      styles: ["700"],
    },
  ],
  overrideStyles: ({ rhythm }) => ({
    h1: {
      paddingBottom: `calc(${rhythm(1 / 4)} - 1px)`,
      marginBottom: rhythm(3 / 4),
      marginTop: rhythm(1.5),
    },
    h2: {
      paddingBottom: `calc(${rhythm(1 / 4)} - 1px)`,
      marginBottom: rhythm(1 / 4),
      marginTop: rhythm(1),
    },
    h6: {
      color: gray(47),
    },
    "h3,h4,h5,h6": {
      marginBottom: rhythm(1 / 2),
      marginTop: rhythm(1),
    },
    "ol,ul": {
      marginLeft: rhythm(1.25),
    },
    // children ol, ul
    "li>ol,li>ul": {
      marginLeft: rhythm(1.25),
    },
    "a:hover,a:active": {
      textDecoration: "underline",
    },
    blockquote: {
      borderLeft: `4px solid ${gray(87)}`,
      color: gray(47),
      marginTop: 0,
      marginRight: 0,
      marginLeft: 0,
      paddingLeft: `calc(${rhythm(1 / 2)} - 1px)`,
    },
  }),
  plugins: [new CodePlugin()],
});

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
