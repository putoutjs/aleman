import {createTest} from '#test';
import * as addon from './shift-g.js';
import {rules} from '../../rules/index.js';
import {createState} from '../../state/state.js';

const noop = () => {};
const menu = {
    View: noop,
    Edit: noop,
};

const test = createTest(import.meta.url, addon, {
    rules,
    options: {
        menu,
    },
    state: createState({
        name: 'menu',
        menu,
    }),
});

test('aleman: menu: addons: shift+g: command: hide', (t) => {
    t.noReportOnRender('hide', {
        state: {
            command: 'hide',
        },
        command: 'G',
    });
    t.end();
});

test('aleman: menu: addons: shift+g: command: show', (t) => {
    t.render('shift-g', {
        state: {
            command: 'show',
            index: 1,
        },
        command: 'G',
    });
    t.end();
});

test('aleman: menu: addons: shift+g: command: insideSubmenu', (t) => {
    t.render('shift-g', {
        state: {
            command: 'show',
            index: 1,
            insideSubmenu: true,
        },
        command: 'G',
    });
    t.end();
});

test('aleman: menu: addons: shift+g: command: $', (t) => {
    t.render('shift-g', {
        state: {
            command: 'show',
            index: 0,
            insideSubmenu: false,
        },
        command: '$',
    });
    t.end();
});
