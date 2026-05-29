import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['build-menu', plugin],
    ],
});

test('lunes: build-menu: report', (t) => {
    t.report('build-menu', `Build menu`);
    t.end();
});

test('lunes: build-menu: transform with options: selected', (t) => {
    t.transformWithOptions('selected', {
        position: {
            left: 100,
            top: 20,
        },
    });
    t.end();
});

test('lunes: build-menu: transform with options', (t) => {
    t.transformWithOptions('build-menu', {
        position: {
            left: 100,
            top: 20,
        },
    });
    t.end();
});

