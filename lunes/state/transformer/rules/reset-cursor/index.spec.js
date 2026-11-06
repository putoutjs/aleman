import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['reset-cursor', plugin],
    ],
});

test('lunes: reset-cursor: report: reset', (t) => {
    t.report('reset', `Reset cursor`);
    t.end();
});

test('lunes: reset-cursor: transform: reset', (t) => {
    t.transform('reset');
    t.end();
});
