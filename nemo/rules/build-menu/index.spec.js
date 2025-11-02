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

test('nemo: build-menu: transform with options', (t) => {
    const options = {
        show: true,
        position: {
            x: 0,
            y: 20,
        },
        items: [{
            name: 'Upload',
            path: 'Upload',
            selected: true,
        }, {
            name: 'New',
            path: 'New',
            selected: false,
            submenu: {
                show: false,
                items: [{
                    name: 'File',
                    path: 'New.File',
                    selected: false,
                }, {
                    name: 'Directory',
                    path: 'New.Directory',
                    selected: false,
                }],
            },
        }],
    };
    
    t.transformWithOptions('build-menu', options);
    t.end();
});
