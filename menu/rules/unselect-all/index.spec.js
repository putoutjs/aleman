import {createTest} from '@putout/test';
import * as plugin from './index.js';

const index = -1;

const test = createTest(import.meta.url, {
    plugins: [
        ['unselect-all', plugin],
    ],
});

test('aleman: unselect-all: report', (t) => {
    t.reportWithOptions('unselect-all', `Unselect all`, {
        index: -1,
    });
    t.end();
});

test('aleman: unselect-all: transform with options', (t) => {
    t.transformWithOptions('unselect-all', {
        index,
    });
    t.end();
});

test('aleman: unselect-all: transform with options: nested', (t) => {
    t.transformWithOptions('nested', {
        index,
    });
    t.end();
});

test('aleman: unselect-all: no report with options: no-data-name', (t) => {
    t.noReportWithOptions('no-data-name', {
        index: -1,
    });
    t.end();
});

test('aleman: unselect-all: no report with options: no-parent: index: -1', (t) => {
    t.noReportWithOptions('no-parent', {
        index: -1,
    });
    t.end();
});

test('aleman: unselect-all: no report: no-parent', (t) => {
    t.noReport('no-parent');
    t.end();
});
