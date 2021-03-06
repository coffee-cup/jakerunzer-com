const metadata = require("./metadata");
const { getBlogFeed } = require("./feed");

module.exports = {
  siteMetadata: {
    ...metadata,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-fathom",
      options: {
        // Fathom server URL. Defaults to `cdn.usefathom.com`
        trackingUrl: "jackal.jakerunzer.com",
        // Unique site id
        siteId: "DYTMHZIC",
        // Domain whitelist
        whitelistHostnames: ["jakerunzer.com"],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: `writing`,
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages`,
        ignore: [`flycheck_*`],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        plugins: ["gatsby-remark-images"],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1000,
              quality: 100,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },

          {
            resolve: `gatsby-remark-smartypants`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                author
              }
            }
          }
        `,
        feeds: [
          getBlogFeed({
            filePathRegex: `//writing/`,
            site_url: `https://jakerunzer.com`,
            feed_url: `https://jakerunzer.com/rss.xml`,
            output: `/rss.xml`,
            title: `Jake Runzer's Writing`,
            description: "Personal writing by Jake Runzer.",
          }),
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: metadata.title,
        short_name: metadata.shortTitle,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `content/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-simple-analytics`,
      options: {
        domain: "hello.jakerunzer.com",
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: "gatsby-plugin-html-attributes",
      options: {
        lang: "en",
      },
    },
    `gatsby-plugin-emotion`,
    `gatsby-plugin-theme-ui`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Rubik\:700`],
        display: "swap",
      },
    },
    `gatsby-plugin-offline`,
  ],
};
