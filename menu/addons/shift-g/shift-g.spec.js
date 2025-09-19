import {createTest} from '#test';
import * as addon from './shift-g.js';
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
