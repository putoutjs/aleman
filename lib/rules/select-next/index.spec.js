import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['select-next', plugin],
    ],
});

test('lib: select-next: report', (t) => {
    t.report('select-next', `Select next item`);
    t.end();
});

test('lib: select-next: transform', (t) => {
    t.transform('select-next');
    t.end();
});

test('lib: select-next: no report: no-parent', (t) => {
    t.noReport('no-parent');
    t.end();
});

test('lib: select-next: no report: no-data-name', (t) => {
    t.noReport('no-data-name');
    t.end();
});

test('lib: select-next: no report: no-next', (t) => {
    t.noReport('no-next');
    t.end();
});

test('lib: select-next: no report: wrong-data-name', (t) => {
    t.noReport('wrong-data-name');
    t.end();
});
