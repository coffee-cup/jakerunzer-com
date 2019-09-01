import { css } from "styled-components";

export type Colour = string;

export interface Theme {
  colours: {
    text: Colour;
    bg: Colour;
    primary: Colour;
    secondary: Colour;
  };
}

export const theme: Theme = {
  colours: {
    text: "#333",
    bg: "white",
    primary: "#ebebeb",
    secondary: "#4d3ae2",
  },
};

export const NarrowScreenWidth = "40em";

export const forNarrowScreen = (first, ...interpolations) => css`
  @media only screen ${NarrowScreenWidth != null &&
      css` and (max-width: ${NarrowScreenWidth})`} {
    ${css(first, ...interpolations)}
  }
`;

export const forWideScreen = (first, ...interpolations) => css`
  @media only screen ${NarrowScreenWidth != null &&
      css` and (min-width: ${NarrowScreenWidth})`} {
    ${css(first, ...interpolations)}
  }
`;
