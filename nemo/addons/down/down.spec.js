import {createTest} from '#test';
import * as addon from './down.js';
import {rules} from '../../rules/index.js';
import {createState} from '../../state/state.js';

const noop = () => {};

const test = createTest(import.meta.url, addon, {
    rules,
    options: {
        menu: {
            Upload: noop,
            New: {
                File: noop,
                Directory: noop,
            },
        },
    },
    state: createState({
        name: 'menu',
    }),
});

test('aleman: menu: down: infiniteScroll', (t) => {
    t.render('infinite-scroll', {
        state: {
            command: 'show',
            index: 1,
            submenuIndex: 1,
            insideSubmenu: true,
        },
        key: 'ArrowDown',
        options: {
            infiniteScroll: true,
        },
    });
    t.end();
});

test('aleman: menu: down', (t) => {
    t.render('down', {
        state: {
            command: 'show',
            index: 1,
            submenuIndex: 0,
            insideSubmenu: true,
        },
        key: 'ArrowDown',
    });
    t.end();
});
