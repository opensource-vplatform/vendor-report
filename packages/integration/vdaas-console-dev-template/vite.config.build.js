import { defineConfig } from 'vite';

import { babel } from '@rollup/plugin-babel';

function md5() {
    const S1 = Math.random().toString(36).slice(2);
    const S2 = Math.random().toString(36).slice(2);
    const S3 = Math.random().toString(36).slice(2);
    const S4 = Date.now().toString(36);
    return S1 + S2 + S3 + S4;
}

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
        return {
            build: {
                minify: 'terser',
                terserOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                    },
                },
                target: 'es2015',
                outDir:'devDist',
                lib: {
                    name: 'Dev_'+md5(),
                    entry: 'src/dev.js',
                    fileName: 'dev-[hash]',
                    formats: ['umd'],
                },
            },
            plugins,
        };
    });
    