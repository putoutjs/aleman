import {fileURLToPath} from 'node:url';
import {rspack} from '@rspack/core';

const outputPath = fileURLToPath(new URL('./dist/', import.meta.url));
const createConfig = (filename, entry, external = false) => ({
    mode: 'production',
    target: 'web',
    entry,
    experiments: {outputModule: true},
    output: {
        path: outputPath,
        filename,
        library: {type: 'module'},
    },
    resolve: {
        alias: {putout$: '@putout/bundle'},
    },
    module: {
        rules: [{test: /\.css$/, type: 'asset/source'}],
    },
    plugins: [new rspack.optimize.LimitChunkCountPlugin({maxChunks: 1})],
    externalsType: 'module',
    externals: external ? {
        'putout': 'putout',
        '@putout/processor-html': '@putout/processor-html',
    } : {},
    performance: {hints: false},
});

export default [
    createConfig('menu.bundle.js', './bundle/menu.js'),
    createConfig('menos.bundle.js', './menos/bundle.js'),
    createConfig('menos.js', './menos/bundle.js', true),
];
