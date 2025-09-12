import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['select', plugin],
    ],
});

test('menu: select: report', (t) => {
    t.report('select', `Select item`);
    t.end();
});

test('menu: select: transform', (t) => {
    t.transform('select');
    t.end();
});

test('menu: select: transform with options: submenu', (t) => {
    t.transformWithOptions('submenu', {
        showSubmenu: true,
    });
    t.end();
});

test('menu: select: no report: no-parent', (t) => {
    t.noReport('no-parent');
    t.end();
});

test('menu: select: no report: no-data-name', (t) => {
    t.noReport('no-data-name');
    t.end();
});

test('menu: select: no transform: no-next', (t) => {
    t.noTransform('no-next');
    t.end();
});

test('menu: select: no report: wrong-data-name', (t) => {
    t.noReport('wrong-data-name');
    t.end();
});
