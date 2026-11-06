import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['enter-submenu', plugin],
    ],
});

test('lunes: enter-submenu: report: enter', (t) => {
    t.report('enter', `Enter submenu`);
    t.end();
});

test('lunes: enter-submenu: transform: enter', (t) => {
    t.transform('enter');
    t.end();
});

test('lunes: enter-submenu: no report: leaf', (t) => {
    t.noReport('leaf');
    t.end();
});

test('lunes: enter-submenu: no report with options: enter', (t) => {
    t.noReportWithOptions('enter', {
        cursorPath: 'view',
    });
    t.end();
});
