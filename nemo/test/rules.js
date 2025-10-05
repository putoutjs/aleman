import {createTest} from '@putout/test';
import * as plugin from '../rules/index.js';

const rules = createTest(import.meta.url, {
    plugins: [
        ['build-menu', plugin],
    ],
});

rules('aleman: nemo: rules: build-menu: report', (t) => {
    t.report('build-menu', `Build menu`);
    t.end();
});

rules('aleman: nemo: rules: build-menu: transform with options', (t) => {
    t.transformWithOptions('build-menu', {
        menuName: 'xxx',
    });
    t.end();
});
