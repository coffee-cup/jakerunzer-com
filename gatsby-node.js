const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

const categories = ["blog", "recipes"];

const createIndexPage = async (page, { createPage }) => {
  const menu = path.resolve("./src/templates/Menu.tsx");
  createPage({
    path: page.fields.slug,
    component: menu,
    context: {
      category: page.frontmatter.category,
    },
  });
};

const createCategory = async (category, { graphql, createPage }) => {
  const catStr = JSON.stringify(category);
  const result = await graphql(
    `
      {
        allMdx(filter: { frontmatter: { category: { eq: ${catStr} } } }) {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              title
              category
              index
            }
          }
        }
      }
    `,
  );

  const nodes = result.data.allMdx.nodes;

  // index page
  const indexPages = nodes.filter(page => page.frontmatter.index);
  if (indexPages.length > 1) {
    throw new Error(`More than 1 index page for category ${category} found`);
  } else if (indexPages.length === 0) {
    throw new Error(`Index page for category ${category} not found`);
  }

  createIndexPage(indexPages[0], { createPage });

  // data pages
  const dataPages = nodes.filter(page => !page.frontmatter.index);

  const pageTemplate = path.resolve("./src/templates/Page.tsx");
  dataPages.forEach(page => {
    createPage({
      path: page.fields.slug,
      component: pageTemplate,
      context: {
        slug: page.fields.slug,
      },
    });
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  for (const category of categories) {
    await createCategory(category, { graphql, createPage });
  }
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
