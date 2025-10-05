import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['show-menu', plugin],
    ],
});

test('lib: show-menu: report', (t) => {
    t.reportWithOptions('hide-menu', `Hide menu`, {
        command: 'hide',
        name: 'menu',
    });
    t.end();
});

test('lib: show-menu: transform with options: show-menu', (t) => {
    t.transformWithOptions('show-menu', {
        command: 'show',
        name: 'menu',
    });
    t.end();
});

test('lib: show-menu: transform with options: hide-menu', (t) => {
    t.transformWithOptions('hide-menu', {
        command: 'hide',
        name: 'menu',
    });
    t.end();
});

test('lib: show-menu: no report: no-menu', (t) => {
    t.noReport('no-menu');
    t.end();
});
