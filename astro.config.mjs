import { defineConfig } from "astro/config";
import tailwind from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  // Keep HTML whitespace behavior unchanged from Astro 5.
  compressHTML: true,
  vite: {
    plugins: [tailwind()],
  },
  site: "https://jakerunzer.com",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: "rose-pine-dawn",
        dark: "rose-pine-moon",
      },
    },
  },
});
