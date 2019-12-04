import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import Link from "./Link";

export interface Props {
  title: string;
  artist: string;
  image: string;
  link: string;
}

const AlbumLink = styled(Link)(
  css({
    display: "inline-block",
    textDecoration: "none",
  }),
);

const StyledAlbum = styled.div(
  css({
    display: "flex",
    alignItems: "center",
    py: 2,

    a: {
      textDecoration: "none",
    },
  }),
);

const AlbumArt = styled.img(
  css({
    maxWidth: ["10rem", "16rem"],
  }),
);

const Info = styled.div(
  css({
    pl: [4, 5],
  }),
);

const Title = styled.h2(
  css({
    mb: 2,
  }),
);

const Artist = styled.span(
  css({
    mt: 0,
    fontSize: 2,
  }),
);

const Album: React.FC<Props> = props => {
  return (
    <AlbumLink to={props.link}>
      <StyledAlbum>
        <AlbumArt src={props.image} alt={`${props.title} album cover`} />
        <Info>
          <Title>{props.title}</Title>
          <Artist>{props.artist}</Artist>
        </Info>
      </StyledAlbum>
    </AlbumLink>
  );
};

export default Album;
