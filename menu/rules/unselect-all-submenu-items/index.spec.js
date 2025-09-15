import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['unselect-all-submenu-items', plugin],
    ],
});

test('menu: unselect-all-submenu-items: report', (t) => {
    t.report('unselect-all-submenu-items', `Unselect all submenu items`);
    t.end();
});

test('menu: unselect-all-submenu-items: transform with options', (t) => {
    t.transformWithOptions('unselect-all-submenu-items', {
        showSubmenu: false,
    });
    t.end();
});

test('menu: unselect-all-submenu-items: transform with options: show-submenu', (t) => {
    t.transformWithOptions('show-submenu', {
        showSubmenu: true,
    });
    t.end();
});
