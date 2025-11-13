/**
 * Astro Configuration - memobaut.com
 * Production-ready, performance-optimized, security-hardened
 */

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://memobaut.com',
  base: '/',
  trailingSlash: 'always',

  output: 'static',
  adapter: netlify(),

  integrations: [
    tailwind({
      applyBaseStyles: false, // We control base styles
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'de',
        locales: {
          de: 'de-DE',
        },
      },
    }),
  ],

  build: {
    format: 'directory',
    inlineStylesheets: 'never', // Security: No inline styles
    assets: '_assets',
  },

  compressHTML: true,

  vite: {
    build: {
      cssMinify: true,
      rollupOptions: {
        output: {
          // Ensure predictable chunk names for SRI
          chunkFileNames: '_assets/[name]-[hash].js',
          assetFileNames: '_assets/[name]-[hash][extname]',
        },
      },
    },
  },

  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },

  experimental: {
    contentCollectionCache: true,
  },
});
