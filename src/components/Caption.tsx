/** @jsx jsx */
import * as React from "react";
import { jsx } from "theme-ui";

const Caption: React.FC = props => (
  <div
    sx={{
      width: "100%",
      mt: -3,
      mb: 4,
      textAlign: "center",
      fontSize: 0,
      color: "grey",

      a: {
        color: "grey",
        transition: "color 150ms ease-in-out",

        "&:hover": {
          color: "text",
          bg: "background",
        },
      },
    }}
  >
    {props.children}
  </div>
);

export default Caption;
