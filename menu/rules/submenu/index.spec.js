import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['submenu', plugin],
    ],
});

test('menu: submenu: report', (t) => {
    t.reportWithOptions('submenu', `Show submenu`, {
        submenuIndex: 1,
        insideSubmenu: true,
    });
    t.end();
});

test('menu: submenu: no report with options: no-submenu-selected', (t) => {
    t.noReportWithOptions('no-submenu-selected', {
        submenuIndex: 0,
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

test('menu: submenu: no report with options: li', (t) => {
    t.noReportWithOptions('li', {
        submenuIndex: 1,
        insideSubmenu: false,
    });
    t.end();
});

test('menu: submenu: no report with options: not-menu', (t) => {
    t.noReportWithOptions('not-menu', {
        submenuIndex: 1,
        insideSubmenu: false,
    });
    t.end();
});

test('menu: submenu: no report with options: submenu: submenuIndex: no-submenu', (t) => {
    t.noReportWithOptions('no-submenu', {
        submenuIndex: -1,
        insideSubmenu: false,
    });
    t.end();
});

