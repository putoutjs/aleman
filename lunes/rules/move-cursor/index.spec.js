import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['move-cursor', plugin],
    ],
});

test('lunes: move-cursor: report', (t) => {
    t.report('move-cursor', `Move cursor`);
    t.end();
});

test('lunes: move-cursor: transform', (t) => {
    t.transform('move-cursor');
    t.end();
});
