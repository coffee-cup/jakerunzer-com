import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

const bookmarkCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/bookmarks" }),
  schema: z.object({
    title: z.string(),
    url: z.string(),
    date: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
  bookmarks: bookmarkCollection,
};
