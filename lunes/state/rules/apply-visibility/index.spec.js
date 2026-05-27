import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-visibility', plugin],
    ],
});

test('state: apply-visibility: report', (t) => {
    t.report('apply-visibility', `Apply visibility`);
    t.end();
});

test('state: apply-visibility: transform', (t) => {
    t.transform('apply-visibility');
    t.end();
});
