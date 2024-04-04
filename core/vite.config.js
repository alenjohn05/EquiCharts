// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'equicharts',
      formats: ['esm', 'cjs', 'umd'],
      fileName: (format) => {
        if (format === 'cjs') {
          return `equicharts.${format}`;
        } else {
          return `equicharts.${format}.js`;
        }
      },
    },
    rollupOptions: {
      output: { format: ['umd', 'esm', 'cjs'] },
    },
    target: 'esnext',
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      outputDir: 'dist/types',
      tsConfigFilePath: './tsconfig.json',
      rollupTypes: true,
    }),
  ],
});
