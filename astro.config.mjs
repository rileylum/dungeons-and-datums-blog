// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import rehypeClassNames from 'rehype-class-names';

// https://astro.build/config
export default defineConfig({
  site: 'https://dungeonsanddatums.com',
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [
      [
        rehypeClassNames,
        {
          table: 'table table-pin-rows table-sm',
          th: 'border-b border-base-300',
          td: 'border-b border-base-300',
        },
      ],
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
