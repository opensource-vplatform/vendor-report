import { defineConfig } from 'vite';

import { babel } from '@rollup/plugin-babel';

export default defineConfig({
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
            name: 'TOONE.JasperReportTransform',
            entry: 'src/index.js',
            fileName: 'integration-jasperreport',
            formats: ['umd'],
        },
    },
    define: {
        'process.env': {},
    },
    plugins:[
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
    ],
});
