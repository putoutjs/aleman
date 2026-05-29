import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['get-cursor', plugin],
    ],
});

test('state: get-cursor: report', (t) => {
    t.report('get-cursor', `edit`);
    t.end();
});

test('state: get-cursor: transform', (t) => {
    t.transform('get-cursor');
    t.end();
});
