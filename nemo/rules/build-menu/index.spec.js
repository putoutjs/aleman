import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['build-menu', plugin],
    ],
});

test('nemo: build-menu: report', (t) => {
    t.report('build-menu', `Build menu`);
    t.end();
});

test('nemo: build-menu: transform', (t) => {
    t.transform('build-menu');
    t.end();
});
