import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['leave-submenu', plugin],
    ],
});

test('lunes: leave-submenu: report: leave', (t) => {
    t.report('leave', `Leave submenu`);
    t.end();
});

test('lunes: leave-submenu: transform: leave', (t) => {
    t.transform('leave');
    t.end();
});

test('lunes: leave-submenu: no report: top-level', (t) => {
    t.noReport('top-level');
    t.end();
});
