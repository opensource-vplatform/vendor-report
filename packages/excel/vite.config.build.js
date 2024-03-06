import {
  defineConfig,
  loadEnv,
} from 'vite';

import { babel } from '@rollup/plugin-babel';

import baseConfig from './vite.config.base';

const plugins = [
      ...baseConfig.plugins,
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
  
  const cherryPickedKeys = ['NODE_ENV'];
  
  export default defineConfig(({ mode }) => {
      const env = loadEnv(mode, process.cwd(), '');
      const processEnv = {};
      cherryPickedKeys.forEach((key) => (processEnv[key] = env[key]));
      return {
          define: {
              'process.env': processEnv,
          },
          ...baseConfig,
          build: {
              minify: 'terser',
              terserOptions: {
                  compress: {
                      drop_console: true,
                      drop_debugger: true,
                  },
              },
              target: 'es2015',
              lib: {
                  name: 'TOONE.Report',
                  entry: 'src/Report.jsx',
                  fileName: 'report-[hash]',
                  formats: ['umd'],
              },
              rollupOptions: {
                  external: ['react', 'react-dom/client'],
                  output: {
                      globals: {
                          react: 'React',
                          'react-dom/client': 'ReactDOM',
                      },
                  },
              },
          },
          plugins,
      };
  });
  