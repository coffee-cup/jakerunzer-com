/** @jsx jsx */
import * as React from "react";
import { Box, jsx, Styled } from "theme-ui";
import { formatDate } from "../utils";

const BlogTitle: React.FC<{
  title: string;
  date?: string;
}> = props => (
  <Box sx={{ mb: 4 }}>
    <Styled.h1 sx={{ mb: 3 }}>{props.title}</Styled.h1>
    {props.date != null && (
      <span sx={{ color: "grey" }}>{formatDate(props.date)}</span>
    )}
  </Box>
);

export default BlogTitle;
