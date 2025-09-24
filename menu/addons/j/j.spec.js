import {createTest} from '#test';
import * as addon from './j.js';
import {rules} from '../../rules/index.js';
import {initState} from '../../state.js';

const noop = () => {};
const test = createTest(import.meta.url, addon, {
    rules,
    options: {
        menu: {
            View: noop,
            Edit: noop,
        },
    },
    state: initState({
        name: 'menu',
    }),
});

test('aleman: menu: addons: m: no key j', (t) => {
    t.noReportOnRender('m', {
        command: 'm',
    });
    t.end();
});

test('aleman: menu: addons: j', (t) => {
    t.render('j', {
        state: {
            command: 'show',
            index: 1,
        },
        command: 'j',
    });
    t.end();
});

test('aleman: menu: addons: j: -1', (t) => {
    t.render('submenu', {
        state: {
            command: 'show',
            index: -1,
            insideSubmenu: false,
        },
        command: '3j',
    });
    t.end();
});

test('aleman: menu: addons: j: insideSubmenu', (t) => {
    t.render('submenu', {
        state: {
            command: 'show',
            index: 2,
            submenuIndex: -1,
            insideSubmenu: true,
        },
        command: '3j',
    });
    t.end();
});

test('aleman: menu: addons: j: infiniteScroll', (t) => {
    t.render('infinite-scroll', {
        state: {
            command: 'show',
            index: 1,
            submenuIndex: -1,
        },
        options: {
            infiniteScroll: true,
        },
        command: 'j',
    });
    t.end();
});

test('aleman: menu: addons: j: submenu: infiniteScroll', (t) => {
    t.render('submenu-infinite-scroll', {
        state: {
            command: 'show',
            index: 1,
            submenuIndex: 1,
            insideSubmenu: true,
            showSubmenu: true,
        },
        options: {
            infiniteScroll: true,
            menu: {
                A: noop,
                New: {
                    File: noop,
                    Directory: noop,
                },
            },
        },
        command: 'j',
    });
    t.end();
});
