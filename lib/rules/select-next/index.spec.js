import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['select-next', plugin],
    ],
});

test('lib: select-next: report', (t) => {
    t.report('select-next', `Select next item`);
    t.end();
});

test('lib: select-next: transform', (t) => {
    t.transform('select-next');
    t.end();
});
