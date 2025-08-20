import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['unselect-all', plugin],
    ],
});

test('aleman: unselect-all: report', (t) => {
    t.report('unselect-all', `Unselect all`);
    t.end();
});

test('aleman: unselect-all: transform', (t) => {
    t.transform('unselect-all');
    t.end();
});

test('aleman: unselect-all: no report: no-data-name', (t) => {
    t.noReport('no-data-name');
    t.end();
});

test('aleman: unselect-all: no report: no-parent', (t) => {
    t.noReport('no-parent');
    t.end();
});
