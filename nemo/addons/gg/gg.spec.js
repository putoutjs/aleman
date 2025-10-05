import {createTest} from '#test';
import * as addon from './gg.js';
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

test('aleman: menu: addons: gg: command: hide', (t) => {
    t.noReportOnRender('hide', {
        state: {
            command: 'hide',
        },
        command: 'gg',
    });
    t.end();
});

test('aleman: menu: addons: gg: command: show', (t) => {
    t.render('gg', {
        state: {
            command: 'show',
            index: 1,
        },
        command: 'gg',
    });
    t.end();
});

test('aleman: menu: addons: gg: command: insideSubmenu', (t) => {
    t.render('submenu', {
        state: {
            command: 'show',
            index: 1,
            submenuIndex: 1,
            insideSubmenu: true,
            showSubmenu: true,
        },
        command: 'gg',
    });
    t.end();
});

test('aleman: menu: addons: gg: command: ^', (t) => {
    t.render('gg', {
        state: {
            command: 'show',
            index: 0,
        },
        command: '^',
    });
    t.end();
});
