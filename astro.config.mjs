import { defineConfig, squooshImageService } from "astro/config";
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
  image: {
    service: squooshImageService(),
  },
  markdown: {
    shikiConfig: {
      experimentalThemes: {
        light: "rose-pine-dawn",
        dark: "rose-pine-moon",
      },
    },
  },
});
