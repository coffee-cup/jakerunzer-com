import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import React from "react";

const query = graphql`
  query MyQuery {
    allFile(filter: { childImageSharp: { id: { ne: null } } }) {
      nodes {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
        relativePath
      }
    }
  }
`;

export interface Result {
  allFile: {
    nodes: Array<{
      relativePath: string;
      childImageSharp: { fluid: any };
    }>;
  };
}

const Image: React.FC<{
  src: string;
  alt: string;
}> = props => {
  const data = useStaticQuery(query) as Result;
  const image = data.allFile.nodes.find(i => i.relativePath === props.src);

  if (image == null) {
    if (process.env.NODE_ENV === "development") {
      console.log("Cannot find image", props.src);
    }
    return null;
  }

  return <Img fluid={image.childImageSharp.fluid} alt={props.alt} />;
};

export default Image;
