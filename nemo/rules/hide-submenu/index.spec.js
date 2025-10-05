import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['hide-submenu', plugin],
    ],
});

test('menu: hide-submenu: report', (t) => {
    t.report('hide-submenu', `Hide submenu`);
    t.end();
});

test('menu: hide-submenu: transform', (t) => {
    t.transform('hide-submenu');
    t.end();
});

test('menu: hide-submenu: no report with options: show-submenu', (t) => {
    t.noReportWithOptions('show-submenu', {
        showSubmenu: true,
    });
    t.end();
});

test('menu: hide-submenu: no report: no-menu', (t) => {
    t.noReport('no-menu');
    t.end();
});
