import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src/public', 
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./src/public/*.html'), 
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: '[name].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
      outDir: '../../dist', // Переносим сборку на уровень выше
      emptyOutDir: true,
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/public/**/**.html']), // Следим за изменениями в public
      SortCss({
        sort: 'mobile-first',
      }),
    ],
  };
});
