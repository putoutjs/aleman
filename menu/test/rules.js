import {createTest} from '@putout/test';
import * as plugin from '../rules/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['build-menu', plugin],
    ],
});

test('aleman: menu: rules: build-menu: report', (t) => {
    t.report('build-menu', `Build menu`);
    t.end();
});

test('aleman: menu: rules: build-menu: transform with options', (t) => {
    t.transformWithOptions('build-menu', {
        menuName: 'xxx',
    });
    t.end();
});
