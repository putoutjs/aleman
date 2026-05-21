import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-cursor', plugin],
    ],
});

test('lunes: add-cursor: no report', (t) => {
    t.noReport('add-cursor');
    t.end();
});

test('lunes: add-cursor: report', (t) => {
    t.reportWithOptions('add-cursor', `Add cursor`, {
        operation: 'last',
    });
    t.end();
});

test('lunes: add-cursor: transform with options: down', (t) => {
    t.transformWithOptions('down', {
        operation: 'first',
    });
    t.end();
});

test('lunes: add-cursor: transform with options: up', (t) => {
    t.transformWithOptions('up', {
        operation: 'last',
    });
    t.end();
});
