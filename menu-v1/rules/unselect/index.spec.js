import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['unselect', plugin],
    ],
});

test('lib: unselect: report', (t) => {
    t.report('unselect', `Select next item`);
    t.end();
});

test('lib: unselect: transform', (t) => {
    t.transform('unselect');
    t.end();
});

test('lib: unselect: no report: no-data-name', (t) => {
    t.noReport('no-data-name');
    t.end();
});

test('lib: unselect: no report: no-parent', (t) => {
    t.noReport('no-parent');
    t.end();
});
