import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['move-cursor', plugin],
    ],
});

test('lunes: move-cursor: report', (t) => {
    t.reportWithOptions('move-cursor', `Move cursor`, {
        cursor: 'view',
    });
    t.end();
});

test('lunes: move-cursor: transform with options', (t) => {
    t.transformWithOptions('move-cursor', {
        cursor: 'view',
    });
    t.end();
});
