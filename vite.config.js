import { defineConfig } from 'vite';
import { glob } from 'glob';
import FullReload from 'vite-plugin-full-reload'; // Оставьте если нужно, чтобы следить за изменениями в HTML
import SortCss from 'postcss-sort-media-queries'; // Это зависит от ваших предпочтений

export default defineConfig(({ command }) => {
  return {
    // Убираем pлагин для инжектирования HTML
    root: 'src/public', // Задаем путь к папке с HTML файлами
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./src/public/*.html'), // Входные HTML файлы
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: '[name].js', // Файлы JS будут иметь имя страницы
          assetFileNames: 'assets/[name]-[hash][extname]', // Статические ресурсы
        },
      },
      outDir: '../../dist', // Выводим билд в папку dist на уровень выше
      emptyOutDir: true, // Очищаем папку перед сборкой
    },
    plugins: [
      FullReload(['./src/public/**/**.html']), // Плагин для перезагрузки при изменениях в HTML
      SortCss({
        sort: 'mobile-first', // Сортировка CSS по принципу мобильной адаптивности
      }),
    ],
  };
});

