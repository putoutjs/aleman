import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['submenu', plugin],
    ],
});

test('menu: submenu: report', (t) => {
    t.reportWithOptions('submenu', `Select right`, {
        submenuIndex: 1,
        insideSubmenu: true,
    });
    t.end();
});

test('menu: submenu: no report with options', (t) => {
    t.noReportWithOptions('submenu', {
        submenuIndex: 1,
        insideSubmenu: false,
    });
    t.end();
});

test('menu: submenu: transform with options', (t) => {
    t.transformWithOptions('submenu', {
        submenuIndex: 1,
        insideSubmenu: true,
    });
    t.end();
});

test('menu: submenu: transform with options: last-selected', (t) => {
    t.transformWithOptions('last-selected', {
        submenuIndex: 1,
        insideSubmenu: false,
    });
    t.end();
});
