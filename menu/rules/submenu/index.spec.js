import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['submenu', plugin],
    ],
});

test('menu: submenu: report', (t) => {
    t.report('submenu', `Select right`);
    t.end();
});

test('menu: submenu: transform', (t) => {
    t.transform('submenu');
    t.end();
});
