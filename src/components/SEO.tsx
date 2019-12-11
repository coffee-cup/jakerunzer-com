import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";
import Helmet from "react-helmet";

export interface Props {
  title?: string;
  description?: string;
}

interface Query {
  site: {
    siteMetadata: {
      title: string;
      shortTitle: string;
      url: string;
      author?: string;
      description?: string;
      image?: string;
      twitter?: string;
    };
  };
}

const SEO: React.FC<Props> = props => {
  const data: Query = useStaticQuery(query);
  const meta = data.site.siteMetadata;

  const title =
    props.title != null ? `${props.title} | ${meta.shortTitle}` : meta.title;
  const description = props.description || meta.description;

  return (
    <Helmet>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=5"
      />

      {/* General tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {meta.image && meta.image !== "" && (
        <meta name="image" content={meta.image} />
      )}

      {/* OpenGraph tags */}
      <meta property="og:url" content={meta.url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {meta.image && <meta property="og:image" content={meta.image} />}

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={meta.twitter ? meta.twitter : ""} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {meta.image && meta.image !== "" && (
        <meta name="twitter:image" content={meta.image} />
      )}
    </Helmet>
  );
};

export default SEO;

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        shortTitle
        description
        author
        url
        image
        twitter
      }
    }
  }
`;
