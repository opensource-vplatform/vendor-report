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
            },{
                find: '@metadatas',
                replacement: resolve(__dirname, 'src/metadatas'),
            },
        ],
    },
    plugins: [react()],
});
