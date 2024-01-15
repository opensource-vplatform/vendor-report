import {
  dirname,
  resolve,
} from 'path';
import { fileURLToPath } from 'url';

import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
  
const __dirname = dirname(__filename);
  
export default {
    resolve: {
        alias: [            {
            find: '@utils',
            replacement: resolve(__dirname, 'src/utils'),
        },],
    },
    plugins: [
        react()
    ],
};
