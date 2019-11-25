function getBlogFeed({ filePathRegex, blogUrl, ...overrides }) {
  return {
    serialize: ({ query: { site, allMdx } }) => {
      const stripSlash = slug => (slug.startsWith("/") ? slug.slice(1) : slug);
      return allMdx.edges.map(edge => {
        const siteUrl = site.siteMetadata.siteUrl;
        const url = `${siteUrl}/${stripSlash(edge.node.fields.slug)}`;

        const postText = `<div style="margin-top=55px; font-style: italic;">(This article was posted to my blog at <a href="${blogUrl}">${blogUrl}</a>. You can <a href="${url}">read it online by clicking here</a>.)</div>`;

        // Hacky workaround for https://github.com/gaearon/overreacted.io/issues/65
        const html = (edge.node.html || ``)
          .replace(/href="\//g, `href="${siteUrl}/`)
          .replace(/src="\//g, `src="${siteUrl}/`)
          .replace(/"\/static\//g, `"${siteUrl}/static/`)
          .replace(/,\s*\/static\//g, `,${siteUrl}/static/`);

        return {
          ...edge.node.frontmatter,
          description: edge.node.excerpt,
          date: edge.node.fields.date,
          url,
          guid: url,
          custom_elements: [{ "content:encoded": html + postText }],
        };
      });
    },
    query: `
     {
       site {
         siteMetadata {
           siteTitle
           description
           author
           siteUrl: url
         }
       }
       allMdx(
         limit: 1000,
         filter: {
           frontmatter: {draft: {ne: true}}
           fileAbsolutePath: {regex: "${filePathRegex}"}
         }
         sort: { order: DESC, fields: [frontmatter___date] }
       ) {
         edges {
           node {
             excerpt(pruneLength: 250)
             html
             fields {
               slug
             }
             frontmatter {
               title
               date
             }
           }
         }
       }
     }
   `,
    ...overrides,
  };
}

module.exports.getBlogFeed = getBlogFeed;
