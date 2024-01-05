import { defineConfig } from 'vite';

import { babel } from '@rollup/plugin-babel';

import baseConfig from './vite.config.base';

const plugins = [
    ...baseConfig.plugins,
    babel({
        babelHelpers: 'runtime',
        extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', 'ts'],
        plugins: [
            '@babel/plugin-transform-runtime',
        ],
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

export default defineConfig({
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
            name: 'TOONE',
            entry: 'src/Index.jsx',
            fileName: 'index-[hash]',
            formats: ['umd'],
        },
    },
    define: {
        'process.env': {},
    },
    plugins,
});
