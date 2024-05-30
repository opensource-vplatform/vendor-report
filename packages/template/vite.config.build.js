import {
  defineConfig,
  loadEnv,
} from 'vite';

import { babel } from '@rollup/plugin-babel';

const plugins = [
      babel({
          babelHelpers: 'runtime',
          extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', 'ts'],
          plugins: ['@babel/plugin-transform-runtime'],
          presets: [
              [
                  '@babel/preset-env',
                  {
                      useBuiltIns: false,
                      targets: {
                          browsers: ['chrome > 42', 'not ie <= 11'],
                      },
                  },
              ],
          ],
      }),
  ];
  
  export default defineConfig(({ mode }) => {
      const env = loadEnv(mode, process.cwd(), '');
      return {
          define: {
              'process.env.NODE_ENV': '"'+env['NODE_ENV']+'"',
          },
          build: {
              minify: 'terser',
              terserOptions: {
                  compress: {
                      drop_console: true,
                      drop_debugger: true,
                  },
              },
              target: 'es2015',
          },
          plugins,
      };
  });
  