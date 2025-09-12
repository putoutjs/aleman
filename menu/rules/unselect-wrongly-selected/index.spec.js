import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['unselect-wrongly-selected', plugin],
    ],
});

test('menu: unselect-wrongly-selected: report', (t) => {
    t.report('unselect-wrongly-selected', `Unselect wrongly selected`);
    t.end();
});

test('menu: unselect-wrongly-selected: transform', (t) => {
    t.transform('unselect-wrongly-selected');
    t.end();
});
