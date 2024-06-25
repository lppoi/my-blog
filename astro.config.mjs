import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import UnoCSS from 'unocss/astro';
import sitemap from '@astrojs/sitemap';
import vue from "@astrojs/vue";

export default defineConfig({
  site: 'https://Lzyoo.github.io',
  base: 'my-blog',
  integrations: [
    mdx(),
    sitemap(),
    UnoCSS({
      injectReset: true
    }),
    vue()
  ]
});