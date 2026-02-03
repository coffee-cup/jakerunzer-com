import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

const bookmarkCollection = defineCollection({
  type: "data",
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
