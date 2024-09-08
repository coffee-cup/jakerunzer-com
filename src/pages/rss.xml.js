import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

const posts = (await getCollection("blog")).filter((post) => !post.data.draft);
const bookmarks = await getCollection("bookmarks");

const sortedItems = [...posts, ...bookmarks].sort((a, b) => {
  return new Date(b.data.date) - new Date(a.data.date);
});

export function GET(context) {
  return rss({
    title: "jrs posts and bookmarks",
    description:
      "Some things I've written and links I've found interesting enough to share.",
    site: context.site,
    customData: `<language>en-us</language>`,
    stylesheet: "pretty-feed-v3.xsl",

    items: sortedItems.map((item) => ({
      title: item.data.title,
      pubDate: item.data.date,
      description: item.data.description,
      link:
        item.collection === "blog"
          ? `https://jakerunzer.com/posts/${item.slug}`
          : item.data.url,
      author: "Jake Runzer",
      content:
        item.collection === "blog"
          ? sanitizeHtml(parser.render(item.body), {
              allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
            })
          : undefined,
    })),
  });
}
