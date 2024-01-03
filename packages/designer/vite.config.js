import {
  dirname,
  resolve,
} from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

export default defineConfig({
    build: {
        target: 'es2015',
        lib: {
            name: 'TOONE',
            entry: 'src/Index.jsx',
            fileName: 'index-[hash]',
            formats: ['umd'],
        },
    },
    define: {
        'process.env': {},
    },
    resolve: {
        alias: [
            {
                find: '@components',
                replacement: resolve(__dirname, 'src/component'),
            },
            {
                find: '@assets',
                replacement: resolve(__dirname, 'src/assets'),
            },
            {
                find: '@icons',
                replacement: resolve(__dirname, 'src/icons'),
            },
            {
                find: '@store',
                replacement: resolve(__dirname, 'src/store'),
            },
            {
                find: '@hooks',
                replacement: resolve(__dirname, 'src/hooks'),
            },
            {
                find: '@metadatas',
                replacement: resolve(__dirname, 'src/metadatas'),
            },
            {
                find: '@utils',
                replacement: resolve(__dirname, 'src/utils'),
            },
            {
                find: '@tabs',
                replacement: resolve(__dirname, 'src/tabs'),
            },
        ],
    },
    plugins: [react()],
});
