import {createTest} from '#test';
import {createMouseEnter} from './mouse-enter.js';
import {rules} from '../../rules/index.js';
import {initState} from '../../state.js';

const noop = () => {};
const addon = createMouseEnter('menu');

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

test('aleman: menu: addons: mouseenter: wrong event', (t) => {
    t.noReportOnRender('unselect-all', {
        state: {
            index: 0,
            command: 'show',
        },
        event: {
            type: 'keydown',
        },
    });
    t.end();
});

test('aleman: menu: addons: mouseenter: command: hide', (t) => {
    t.render('mouse-enter', {
        state: {
            index: 0,
            command: 'show',
        },
        event: {
            type: 'mouseenter',
        },
    });
    t.end();
});
