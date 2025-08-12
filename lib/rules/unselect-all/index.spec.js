import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['unselect-all', plugin],
    ],
});

test('lib: unselect-all: report', (t) => {
    t.report('unselect-all', `Unselect all`);
    t.end();
});

test('lib: unselect-all: transform', (t) => {
    t.transform('unselect-all');
    t.end();
});
