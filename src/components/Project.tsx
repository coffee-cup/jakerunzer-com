/** @jsx jsx */
import * as React from "react";
import { Box, jsx, Text } from "theme-ui";
import Link from "./Link";

export interface Props {
  link: string;
  title: string;
}

const Project: React.FC<Props> = props => (
  <Box className="project" sx={{ py: 3 }}>
    <Text variant="heading" sx={{ fontSize: 4, pb: 1 }}>
      <Link href={props.link} sx={{ textDecoration: "none" }}>
        {props.title}
      </Link>
    </Text>
    <Text sx={{ maxWidth: "measure", pt: 2 }}>{props.children}</Text>
  </Box>
);

export default Project;
