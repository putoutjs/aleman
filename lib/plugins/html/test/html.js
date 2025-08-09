import {createTest} from '@putout/test';
import * as tape from '@putout/plugin-tape';
import * as putout from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout', putout],
    ],
});

test('plugin-putout: transform: no-transform-code', (t) => {
    t.transform('no-transform-code');
    t.end();
});

