import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://extrawurst-wetzlar.de',
  base: '/',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'never',
    assets: '_assets'
  },
  output: 'static',
  compressHTML: true,
  scopedStyleStrategy: 'class',
  vite: {
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          assetFileNames: '_assets/[name].[hash][extname]',
          chunkFileNames: '_assets/[name].[hash].js',
          entryFileNames: '_assets/[name].[hash].js'
        }
      }
    }
  }
});
