import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-button', plugin],
    ],
});

test('html: remove-button: report', (t) => {
    t.reportWithOptions('remove-button', `Remove button`, {
        name: 'start',
    });
    t.end();
});

test('html: remove-button: transform', (t) => {
    t.transform('remove-button');
    t.end();
});
