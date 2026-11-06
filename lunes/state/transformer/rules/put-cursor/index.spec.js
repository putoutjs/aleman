import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['put-cursor', plugin],
    ],
});

test('lunes: put-cursor: report: first', (t) => {
    t.reportWithOptions('first', `Put cursor`, {
        operation: 'first',
    });
    t.end();
});

test('lunes: put-cursor: first: closes submenu', (t) => {
    t.transformWithOptions('first', {
        operation: 'first',
    });
    t.end();
});

test('lunes: put-cursor: last: no cursor', (t) => {
    t.transformWithOptions('last', {
        operation: 'last',
    });
    t.end();
});
