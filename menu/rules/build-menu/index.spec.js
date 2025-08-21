import {createTest} from '@putout/test';
import * as plugin from './index.js';

const menuName = 'menu';

const test = createTest(import.meta.url, {
    plugins: [
        ['build-menu', plugin],
    ],
});

test('lib: build-menu: report', (t) => {
    t.report('build-menu', `Build menu`);
    t.end();
});

test('lib: build-menu: transform', (t) => {
    t.transform('build-menu', {
        menuName,
    });
    t.end();
});

test('lib: build-menu: no report: built', (t) => {
    t.noReport('built');
    t.end();
});

