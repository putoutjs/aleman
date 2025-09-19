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
        event: {
            key: 'm',
        },
    });
    t.end();
});

test('aleman: menu: addons: j', (t) => {
    t.render('j', {
        state: {
            command: 'show',
            index: 1,
        },
        event: {
            key: 'j',
        },
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
        event: [{
            key: '3',
        }, {
            key: 'j',
        }],
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
        event: [{
            key: '3',
        }, {
            key: 'j',
        }],
    });
    t.end();
});
