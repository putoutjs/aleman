import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['set-value', plugin],
    ],
});

test('aleman: set-value: report', (t) => {
    t.reportWithOptions('set-value', `Use 'if condition' instead of 'ternary expression'`, {
        name: 'x',
    });
    t.end();
});

test('aleman: set-value: transform with options', (t) => {
    t.transformWithOptions('set-value', {
        name: 'x',
    });
    t.end();
});

test('aleman: set-value: no transform with options: data-name', (t) => {
    t.noTransformWithOptions('data-name', {
        name: 'x',
    });
    t.end();
});

