import {createTest} from '@putout/test';
import * as plugin from './index.js';

const showSubmenu = true;

const test = createTest(import.meta.url, {
    plugins: [
        ['select', plugin],
    ],
});

test('lib: select: report', (t) => {
    t.report('select', `Select item`);
    t.end();
});

test('lib: select: transform with options', (t) => {
    t.transformWithOptions('select', {
        showSubmenu: true,
    });
    t.end();
});

test('lib: select: no report: no-parent', (t) => {
    t.noReport('no-parent');
    t.end();
});

test('lib: select: no report: no-data-name', (t) => {
    t.noReport('no-data-name');
    t.end();
});

test('lib: select: no transform: no-next', (t) => {
    t.noTransform('no-next');
    t.end();
});

test('lib: select: no report: wrong-data-name', (t) => {
    t.noReport('wrong-data-name');
    t.end();
});

