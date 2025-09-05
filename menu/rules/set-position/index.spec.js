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
            x: 22,
        },
    });
    t.end();
});

test('lib: set-position: transform with options', (t) => {
    t.transformWithOptions('set-position', {
        position: {
            x: 33,
        },
    });
    t.end();
});

test('lib: set-position: transform with options: no-style', (t) => {
    t.transformWithOptions('no-style', {
        position: {
            x: 33,
        },
    });
    t.end();
});

test('lib: set-position: no report: not-menu', (t) => {
    t.noReport('not-menu');
    t.end();
});

test('lib: set-position: no report with options: same-position', (t) => {
    t.noReportWithOptions('same-position', {
        position: {
            x: 0,
            y: 20,
        },
    });
    t.end();
});
