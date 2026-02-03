import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx()],
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
