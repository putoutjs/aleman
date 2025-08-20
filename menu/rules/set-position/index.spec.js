import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['set-position', plugin],
    ],
});

test('lib: set-position: report', (t) => {
    t.reportWithOptions('set-position', `Set position`, {
        position: {
            top: 22,
        },
    });
    t.end();
});

test('lib: set-position: transform with options', (t) => {
    t.transformWithOptions('set-position', {
        position: {
            left: 33,
        },
    });
    t.end();
});

test('lib: set-position: transform with options: no-style', (t) => {
    t.transformWithOptions('no-style', {
        position: {
            left: 33,
        },
    });
    t.end();
});

test('lib: set-position: no report: not-menu', (t) => {
    t.noReport('not-menu');
    t.end();
});
