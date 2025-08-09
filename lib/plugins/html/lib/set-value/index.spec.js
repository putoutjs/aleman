import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['set-value', plugin],
    ],
});

test('html: set-value: report', (t) => {
    t.report('set-value', `Use 'if condition' instead of 'ternary expression'`);
    t.end();
});

test('html: set-value: transform', (t) => {
    t.transform('set-value');
    t.end();
});
